const express = require('express')
const router = express.Router()
const requireAuth = require('../middleware/requireAuth')
const UserModel = require('../models/userModel')
const SurveyModel = require('../models/surveyModel')
const {sendSurvey} = require('../services/sendgrid')
const { Path } = require('path-parser');
const _ = require('lodash');


// return list of surveys created by the current user
router.get('/', [express.json(), requireAuth],
   async (req, res) => {
        // query user's surveys from DB
        const _id = req.user._id
        const userSurvey = await SurveyModel.find({_user:_id})
        res.json({"status": 'ok', userSurvey})
    }
)
// create a new survey
router.post('/', [express.json(), requireAuth], async (req, res) => {
        const {title, subject, body, recipients} = req.body.message
        const creditDeduction = recipients.length
        const _id = req.user._id

        // credit check
        try {
            const _id = req.user._id
            const user = await UserModel.findOne({ _id })
            if (user.credits < creditDeduction) {
              throw 'Credits not enough, please top up!'
            }   
          } catch (error) {
            console.log(error)
            res.status(401).json({'error': error})
            return
          }
        
        // deduct credit
        const user = await UserModel.findOneAndUpdate(
            {_id :_id},
            {$inc : {'credits' : creditDeduction*-1}})
    
        // initiate survey
        const newSurvey =  await SurveyModel.create({
            title,
            body,
            subject,
            recipient: recipients.map(email => ({'email':email})),
            _user: _id,
            dateSent: new Date(),
        })

        try {
            sendSurvey(newSurvey)
        } catch (error) {
            res.status(422).send(error)
        }

        res.status(202).json({"message": 'Congrat! Email successfully sent.'}) 
    }  
)

// res for email receiver submit response to the survey
router.get("/:surveyId/:choice", (req, res) => {
    res.send('Thanks for voting!');
});

// record feedback from a user through sendgrid
router.post('/webhook', express.json(),
    (req, res) => {
        const path = new Path('/api/surveys/:surveyId/:choice');
        _.chain(req.body)
        .map(({ email, url}) => {
            if (!email || !url) {
                return false
            }
            else {
                const match = path.test(new URL(url).pathname);
                if (match) {
                    return { email, surveyId: match.surveyId, choice: match.choice };
                } else {
                    return false
                }
            } 
        })
        .compact()   // Creates an array with all falsey values removed.      
        .uniqBy('email', 'surveyId')  // Creates a duplicate-free version of an array, in which only the first occurrence of each element is kept
        .each(({ surveyId, email, choice }) => {  // (forEach), Iterates over elements of collection
            try {
                SurveyModel.updateOne(
                    {
                        _id: surveyId,
                        recipient: {
                            $elemMatch: { email: email, responded: false },
                        },
                    },
                    {
                        $inc: { [choice]: 1 },
                        $set: { 'recipient.$.responded': true }, 
                        lastResponded: new Date(),
                    }
                ).exec();
            } catch (error) {
                console.log(error);
            }
        })
        .value();
        res.json({"aa": '/surveys/webhook post'}) 
    }
);




module.exports = router