const FestEvent=require('../models/FestEvents')
const createFestevent=async (req,res,next)=>{
const {EventName,starttime,endtime,Eventduration,prize,Eventdetail,rules,EventType}=req.body
let event
try {
event=await FestEvent.find({EventName})
}catch(err){
return res.status(500).json(err)
}
if(event){
    return res.status().json({message:"An event with that name already exists,please try again later"})
}
event=new FestEvent({
EventName,
starttime,
endtime,
Eventduration,
prize,
Eventdetail,
rules,
EventType
})
await event.save()
return res.status(201).json({message:'Event created successfully'})
}
const deleteEvent=async (req,res,next)=>{
const eventid=req.params.eid
let event
try{
event=await FestEvent.findById(eventid)
}catch(err){
    return res.status(500).json({err})
}
if(!event){
    return res.status(404).json({message:"Could not find an event with that id"})
}
await event.remove();
return res.status(201).json({message:"Event deleted successfully"})
}
const getevents=async (req,res,next)=>{
let allevents;
try{
allevents=await FestEvent.find({})
}catch(err){
return res.status(500).json(err)
}
if(!allevents){
    return res.status(404).json({message:"There are no events currently available"});
}
return res.status(200).json({allevents})
}
const geteventbyid=async (req,res,next)=>{
   const eventid=req.params.eid
    let event;
try{
    event=await FestEvent.findById(eventid)
}catch(err){
   return res.status(500).json(err)
}
if(!event){
    return res.status(404).json({message:"Could not find an event with that id"})
}
return res.status(200).json(event)
}
module.exports={
    createFestevent,
    deleteEvent,
    getevents,
    geteventbyid
}