import axios from "axios"


export const sendSMS = async (to, msg) =>{
    await axios.get(`http://bulksmsbd.net/api/smsapi?api_key=W09A7g5uDyolm6l2ks6S&type=text&number=${to}&senderid=Random&message=${msg}`)
}
