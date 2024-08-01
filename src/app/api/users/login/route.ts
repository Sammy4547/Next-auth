import {connect} from '@/lib/dbconnect'
import User from '@/models/userModel'
import { error } from 'console'
import {NextRequest,NextResponse} from 'next/server'
import bcryptjs from 'bcryptjs'
import jwt from 'jsonwebtoken'


connect()


export async function POST(request:NextRequest){
    try {
        const reqBody= await request.json()
       const{email,password}=reqBody
     //validation
     console.log(reqBody);

       const user=await User.findOne({email})
       if(!user)
       {
        return NextResponse.json({message:"User does not exist"},{status:400})
       }
       console.log("User exists");

     const validPassword= await bcryptjs.compare(password,user.password)
  // validation of password
     if(!validPassword)
     {
        return NextResponse.json({error:"Check your credentials"},{status:400})
     }
       // jwt 

       const tokenData={
        id:user._id,
        username:user.username,
        email:user.email
       }

     const token=  await jwt.sign(tokenData,process.env.TOKEN_SECRET!,{expiresIn:'1h'})

    const response= NextResponse.json({
        mesage:"Logged in Success",
        success:true
     })
      
     //cookies
     response.cookies.set("token",token,{
        httpOnly:true
     })

     // Finally user jake login hua hai
     return response
    } catch (error:any) {
        return NextResponse.json({error:error.message},{status:500})
    }
}