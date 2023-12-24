import nodemailer from "nodemailer"

export const AccountactivationEmail = async (email, data) => {
    //send email
    const transport = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 587,
        auth: {
          user: "reactdemo98@gmail.com",
          pass: "zmdevyzxgkltxuvu"
        },

    })

    await transport.sendMail({
        from :"Messenger <reactdemo98@gmail.com>",
        subject : "Activate",
        to : email,
        html : `<body bgcolor="#0f3462" style="margin-top:20px;margin-bottom:20px">

        <table border="0" align="center" cellspacing="0" cellpadding="0" bgcolor="white" width="650">
          <tr>
            <td>
             
              <table border="0" cellspacing="0" cellpadding="0" style="color:#0f3462; font-family: sans-serif;">
                <tr>
                  <td>
                    <h2 style="text-align:center; margin: 0px; padding-bottom: 25px; margin-top: 25px;"> Messenger</h2>
                  </td>
                </tr>
                <tr>
                <td><img src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/be/Facebook_Messenger_logo_2020.svg/2048px-Facebook_Messenger_logo_2020.svg.png" alt="" height="100px" style="display:block; margin:auto;padding-bottom: 25px; "/>
         </td>
               
                </tr>
                <tr>
                  <td style="text-align: center;">
                    <p style=" margin: 0px 40px;padding-bottom: 25px;line-height: 2; font-size: 15px;"> Hi, ${data.name} your Resenly Registrered for facebook Messenger code, complate your facebook messenger registration, please Confirm you account
        
                    </p>
                    
                    <h2 style="margin: 0px; padding-bottom: 25px;">Activation code : ${data.activationCode}</h2>
                  </td>
                </tr>
                <tr>
                  <td>
                     <button type="button" style="background-color:#36b445; color:white; padding:15px 97px; outline: none; display: block; margin: auto; border-radius: 31px;
                                   font-weight: bold; margin-top: 25px; margin-bottom: 25px; border: none; text-transform:uppercase; "><a  href="${data.link}">Activation</a></button>
                  </td>
                </tr>
                <tr>
                 
                </tr>
              </table>
              
            </td>
          </tr>
        </table>
        
        </body>`
        
       
  })
} 


























// import nodemailer from 'nodemailer'


// //create email
// export const SendEmail = async (to, subject, text) =>{
//   try {
//     let transport = nodemailer.createTransport({
//       host: "smtp.gmail.com",
//       port: 587,
//       auth: {
//         user: "reactdemo98@gmail.com",
//         pass: "zmdevyzxgkltxuvu"
//       }
//     });

//   await transport.sendMail({
//       from : 'delouar1998@gmail.com',
//       to : to,
//       subject : subject,
//       text : text
//     })

//   } catch (error) {
//     console.log(error);
//   }

// }



