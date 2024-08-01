import { getDataFromToken } from '@/helpers/getDataFromToken'
import {connect} from '@/lib/dbconnect'
import User from '@/models/userModel'
import {NextRequest,NextResponse} from 'next/server'


connect()

export async function GET(request:NextRequest){
    //extract data from token

   const userId=await getDataFromToken(request)
  const user= await User.findOne({_id:userId}).select("-password")

  //check if there is no user
  if(!user)
  {
    return NextResponse.json({error:" No user already exists"},{status:400})
  }
return NextResponse.json({
    message:"User Found",
    data:user
})

}