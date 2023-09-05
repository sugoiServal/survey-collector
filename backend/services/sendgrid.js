const sgMail = require('@sendgrid/mail')
sgMail.setApiKey(process.env.SENDGRID_API_KEY)
const sendSurvey = async ({title, body, subject, recipient, _id}) => {
    const msg = {
        from: 'aa@aa.com',    // replace with a Sender Identity (email) verified in send grid 
        to: recipient.map(recipient => recipient.email),
        templateId: 'd-a5f0c45cfcce47aab24779a51b7dd90b',
        dynamic_template_data: {
            subject: subject,   //Sending with SendGrid is Fun
            text: body,         //'We want to hear from you!'
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

module.exports = {sendSurvey}