const registeredUsers=require('../models/registeredusers')
const User=require('../models/User')
const Contest=require('../models/Contest')
const getUsers=async (req,res,next)=>{
    try{
        const allusers=await registeredUsers.find();
        return res.status(200).json(allusers);
        }
        catch(error)
        {
            return res.status(404).json(error);
        }
    
}
const registerforcontest=async (req,res,next)=>{
    try
    {
        const { Name } = req.body
        const { email } = req.body
        const { PhoneNo } = req.body
        const { branch }=req.body
        const { College } = req.body
        const { year }=req.body
        const { ContestId }=req.body
        const currentEntry=await User.findOne({email});
        console.log(currentEntry);
        if(!currentEntry)
        {
            return res.status(404).json({"error":"Please login or Sign up to continue"});
        }
        else if(currentEntry.isLogin===false)
        {
            return res.status(404).json({"error":"Please Login or Sign up to continue"});
        }
         else if(currentEntry.isLogin===true)
         {   let validFrom
              let validTo
             const slot=Math.ceil(Math.random()*4);
             const _id=ContestId
             console.log(ContestId)
             const targetContest=await Contest.findOne({ _id })
             console.log(targetContest);
             if(slot===1)
             {
             validFrom=Date.parse(targetContest.startdate);
             validTo=validFrom+5400000;
             }
             else if(slot===2)
             {
                validFrom=Date.parse(targetContest.startdate)+5401000;
                validTo=Date.parse(targetContest.startdate)+10800000;
             }
             else if(slot===3)
             {
                validFrom=Date.parse(targetContest.startdate)+10801000;
                validTo=Date.parse(targetContest.startdate)+16200000;
             }
             else if(slot===4)
             {
                validFrom=Date.parse(targetContest.startdate)+16201000;
                validTo=Date.parse(targetContest.startdate)+21600000;
             }
             console.log(slot)
             console.log(validFrom)
             console.log(validTo)
             async function createUser()
             {
                const registereduser = await registeredUsers.create({
                    Name,
                    email,
                    PhoneNo,
                    branch,
                    College,
                    year,
                    slot,
                    ContestId,
                    validFrom,
                    validTo
                })
                
                console.log(registereduser);
                 return res.status(200).json(registereduser);
                return res.status(201).json({"Success":"You have been successfully registered for the Upcoming Contest"});
             }
             createUser();
            // const registereduser = await registeredUsers.create({
            //     Name,
            //     email,
            //     PhoneNo,
            //     branch,
            //     College,
            //     year,
            //     slot,
            //     ContestId,
            //     validFrom,
            //     validTo
            // })
            
            // console.log(registereduser);
            //  return res.status(200).json(registereduser);
            // return res.status(201).json({"Success":"You have been successfully registered for the Upcoming Contest"});
         }
    }
    catch(error)
    {  console.log(error)
       return res.status(404).json({"error":"Something went wrong,please try again later"});
    }
}
const updatedetails=async (req,res,next)=>{
    try {
        const _id = req.params.id 
        const { Name, email ,PhoneNo,branch,College,year } = req.body

        let registereduser = await registeredUsers.findOne({_id})
            if(registereduser)
            {
            registereduser.Name = Name
            registereduser.email = email
            registereduser.PhoneNo = PhoneNo
            registereduser.branch = branch
            registereduser.College = College
            registereduser.year = year
            await registereduser.save()
            return res.status(201).json({"Success":"Update Successfull"});
            }
            else
            {
                return res.status(201).json({"Failure":"Please try again later"});  
            }
    } catch (error) {
        return res.status(500).json({"error":error})
    }
}
const deleteuser=async (req,res,next)=>{
    try {
        const _id = req.params.id 

        const deleteduser = await registeredUsers.deleteOne({_id})

        if(deleteduser.deletedCount === 0){
            return res.status(404).json()
        }else{
            return res.status(204).json()
        }
    } catch (error) {
        return res.status(500).json({"error":error})
    }
}
module.exports={
    getUsers,
    registerforcontest,
    updatedetails,
    deleteuser
}