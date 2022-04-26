const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = require('twilio')(accountSid, authToken);


const TwilioMessenger = (body, to)=>{
    client.messages
    .create({
        body,
        from: '+14454466327',
        to
    })
    .then(message => console.log('sent'));
}
    
module.exports = TwilioMessenger