const express = require ("express")
const dotenv = require ("dotenv").config()
const port = process.env.port

const app = express()
const mongoose = require ("mongoose")
app.use(express.json())

mongoose.connect().then(()=>{
    console.log('DB is established');
}).catch((error)=>{
    console.log(`unable to connect to DB because ${error}`); 
})
const date = new Date
//const name = userModel
const userModel= new mongoose.Schema({
    name:{type:String, required:[true, 'kindly provide your name']},
    stack:{type:String},
    DateOfBirth:{type:Number, required:[true, `kindly provide year of birth`]},
    age:{type: Number},
    email:{type:String,unique:true, required:[true, 'kindly provide your email'],lowercase:true}, 
    sex:{type:String, required:true, enum: ["male", "female"], required:true, lowercase:true}  
},{timestamps:true})

const mymodel = mongoose.model("firstClass3",userModel) 
//create a User
app.post("/createuser",async (req,res)=>{
    try {
        const {name,stack,DateOfBirth,email,sex,}=req.body
        const data = {name, stack , email, sex, DateOfBirth, age:date.getFullYear()-DateOfBirth}
        const createUser = await mymodel.create(data)
        res.status(201).json({message:`user created successfully`, data:createUser})
        
    } catch (error) {
        res.status(500).json(error.message)
        
    }
}) 

//get all students

app.get("/getallstudent", async (req,res)=>{
    try {
        const allstudents = await mymodel.find()
        res.status(200).json({message:`below is all the ${allstudents} in the database`, allstudents

        })
        
    } catch (error) {
        res.status(500).json(error.message)
        
    }
})

// update student 

app.put("/updateuser/:id", async (req,res)=>{
   try {
    let id = req.params.id
    const updateUser = await mymodel.findByIdAndUpdate(id,req.body,{new:true})
    res.status(201).json({message:`kindly update student with ${id} given`, updateUser})
    
   } catch (error) {
    res.status(500).json(error.message)
    
   } 
})

//delete a student
    
app.delete("/deletestudent/:deleteID", async (req,res)=>{
    try {
        let deleteID = req.params.deleteID
        const deletestudent = await mymodel.findByIdAndDelete(deleteID,req.body)
        res.status(200).json({message:`kindly find by ${deleteID} and delete asap`, deletestudent})
 
        
    } catch (error) {
        res.status(500).json(error.message)
        
    } 
})  


app.get("/", (req,res)=>{
    res.status(200).json({message:"WAHLAY WORLD"})
})

app.listen(port,()=>{
    console.log(`server listening to ${port}`); 
})