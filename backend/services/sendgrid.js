const sgMail = require('@sendgrid/mail')
sgMail.setApiKey(process.env.SENDGRID_API_KEY)
const sendSurvey = async ({title, body, subject, recipient, _id}) => {
    const msg = {
        from: 'fun.rry@gmail.com', 
        to: recipient.map(recipient => recipient.email),
        templateId: 'd-a5f0c45cfcce47aab24779a51b7dd90b',
        dynamic_template_data: {
            subject: subject, //Sending with SendGrid is Fun
            text: body,  //'We want to hear from you!'
            surveyID: _id
        },
    }
    sgMail
    .send(msg)
    .then((response) => {
        console.log(response[0].statusCode)
        console.log(response[0].headers)
    })
    .catch((error) => {
        throw error
    })
}

const testSend = () => {
    const msg = {
        to: 'fun.rry@gmail.com', // Change to your recipient
        from: 'fun.rry@gmail.com', // Change to your verified sender
        subject: 'Sending with SendGrid is Fun',
        text: 'and easy to do anywhere, even with Node.js',
        html: '<strong>and easy to do anywhere, even with Node.js</strong>',
      }
      
    sgMail
    .send(msg)
    .then((response) => {
        console.log(response[0].statusCode)
        console.log(response[0].headers)
    })
    .catch((error) => {
        console.error(error)
    })
}



module.exports = {sendSurvey, testSend}