const express= require ("express")
const app = express()
const port = 3232
app.use(express.json())
const mongoose = require ("mongoose")

//conect to database
mongoose.connect("mongodb+srv://oyin1239:HP07seno5GITMAxL@clusterthemb.grjqqdx.mongodb.net/").then
(()=>{
    console.log(`connection to database is established`);
}).catch((error)=>{
    console.log(`unable to connect to the database because ${error}`);
})

// create a schema 
const userModel = new mongoose.Schema({
    name:String,
    email:String,
    stack:String,
    age:Number,
    sex:String,
    
},{timestamps:true})

const mymodel = mongoose.model("firstClass",userModel) 
 
app.post("/createuser",async(req,res)=>{
    try {
        const createUser = await mymodel.create(req.body)
        res.status(200).json({message:`new user created`,
            data:createUser
        })
        
    } catch (error) {
    res.status(200).json(error.message)
    }
})

//get all student
app.get("/getallstudents",async(req,res)=>{
    try {
        const allstudents = await mymodel.find()
        res.status(200).json({message:`kindly find below ${allstudents.length} student`,allstudents})
        
    } catch (error) {
        res.status(500).json(error.message)
        
    }
})
//get one student
app.get("/getone/:id",async(req,res)=>{
    try {
        let id=req.params.id
    
    let foundUser=await mymodel.findById(id)
    
    res.status(200).json({info:`kindly find below the requested user`,foundUser})
    } catch (error) {
      res.status(500).json(error.message)  
    }
    
    })
    //  get one by other details
    app.get("/getones/:email",async(req,res)=>{
    
      try {
            let email=req.params.email
        console.log(email)
        let foundUser=await mymodel.findOne({email})
        
        res.status(200).json({info:`kindly find below the requested user`,foundUser})
        } catch (error) {
          res.status(500).json(error.message)  
        }
        
        })

//update user
app.put("/updateuser/:id",async(req,res)=>{
    try {
        let id = req.params.id
let update = await mymodel.findByIdAndUpdate(id,req.body,{new:true})
res.status(200).json({message:`user successfully updated`, update})
        
    } catch (error) {
        res.status(500).json(error.message)
        
    }
})
//delete student
app.delete("/deleteastudent/:deleteid", async(req,res)=>{
    try {
        let deleteid = req.params.deleteid
        const deleteastudent = await mymodel.findByIdAndDelete(deleteid,req.body)
        res.status(200).json({message:`kindly delete student with ${deleteid} deleted successfully`, deleteastudent})
    } catch (error) {
        res.status(500).json(error.message)
        
    }
})

app.get("/",(req,res)=>{
    res.status(200).json({message:"THEMBZ WORLD"})
})

app.listen(port,()=>{
    console.log(`my app is listening to ${port}`);
})