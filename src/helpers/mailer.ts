import User from '@/models/userModel';
import nodemailer from 'nodemailer'
import bcryptjs from 'bcryptjs'

export const sendEmail=async({email,emailType,userId}:any)=>
{
    try {

      const hashedToken= await bcryptjs.hash(userId.toString(),10)
      if (emailType==="VERIFY") {
       const updatedUser= await User.findByIdAndUpdate(userId,
          {
            $set:{
            verifyToken:hashedToken
            ,verifyTokenExpiry:new Date(Date.now()+3600000)
          }
          }  
        )
        console.log("Updated User for VERIFY",updatedUser);
        
      }
      else if (emailType==="RESET") {
        await User.findByIdAndUpdate(userId,
          {
            $set:{
            forgotPasswordToken:hashedToken,forgotPasswordTokenExpiry: new Date(Date.now()+3600000)}
          }  
        )   
      }


      var transport = nodemailer.createTransport({
        host: "sandbox.smtp.mailtrap.io",
        port: 2525,
        auth: {
          user: "d9cdbf92fd55fe",  //😊
          pass: "ee3dacf092fbd7"  //😊😊😊
        }
      });
          
          const mailOptions = {
            from: 'sammy@sammy.ai', // sender address
            to: email, // list of receivers
            subject: emailType ==='VERIFY' ?  "Verify your email":"Reset your password", // Subject line
            html: `<p>Click <a href="${process.env.DOMAIN}/verifyemail?token=${hashedToken}">here</a> to ${emailType==="VERIFY" ? "verify your email":"reset your password"} or copy and paste the link below
            <br> ${process.env.DOMAIN}/ verifyemail?token=${hashedToken}
             </p>`, // html body
          }


        const mailResponse=  await transport.sendMail(mailOptions)

        return mailResponse
    } catch (error:any) {
        throw new Error(error.message)
    }
}