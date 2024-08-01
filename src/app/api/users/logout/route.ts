import {connect} from '@/lib/dbconnect'
import User from '@/models/userModel'
import { error } from 'console'
import {NextRequest,NextResponse} from 'next/server'


connect()

// User logout
export async function GET(request:NextRequest){
    try {
      const response= NextResponse.json({
        message:"Logout Successfully",
        success:true
       })   
     
       response.cookies.set("token","",{
        httpOnly:true,
        expires:new Date(0)
       },)


       return response
    } catch (error:any) {
        return NextResponse.json({error:error.message},{status:500})
    }
}
