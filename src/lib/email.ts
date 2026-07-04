import emailjs from '@emailjs/browser';

export const sendRegistrationMail = async (

data:any

)=>{

return emailjs.send(

'service_afhc8iq',

'template_w3w2t69',

data,

'bDwzrtcWehhf3_HHU'

);

}