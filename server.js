const express = require('express');
const mongoose = require('mongoose');
const app = express();
app.use(express.json())

let db = mongoose.connect('mongodb+srv://nareshsuthardev:1234567890@cluster0.nszkz.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0').then(app.listen(3000, () => console.log("Server is running on PORT 3000")))
    .catch((err) => console.log("Error", err));

const usersSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
    },
    lastName:{
        type: String,
        required: true,
    },
    address: {
        type: String,
        required: false
    },
    mobileNo:{
        type: Number,
        required: true
    }
},{timestamps: true});

const user = mongoose.model('user',usersSchema);

app.get('/',async(req,res)=>{
    try{
        const userList = await user.find({});
        res.status(201).json(userList);
    }catch(err){
        res.status(400).json({Msg: `Error occured ${err}`});
    }
});

app.post('/',async(req,res)=>{
    try{
        const {firstName,lastName,mobileNo,address} = req.body;
        if(firstName && lastName && mobileNo && address){
            const newUser = new user({firstName,lastName,mobileNo,address});
            await newUser.save();
            res.status(200).json({Msg: `User created Successfully ${firstName}`});
        }else{
            res.status(400).json({Msg: "All field are required"});
        }
    }catch(err){
        res.status(400).json({Msg: `Error while creating user ${err}`})
    }
});

app.patch('/',async(req,res)=>{
    try{
        const {firstName,lastName,address,mobileNo,id} = req.body;
        await user.findByIdAndUpdate(id,{firstName,lastName,address,mobileNo});
        res.status(201).json({Msg: `User updated Successfully`});
    }catch(err){
        res.status(400).json({Msg : `Error ${err}`});
    }
});

app.delete('/',async(req,res)=>{
    try{
        const {id} = req.body;
        console.log(id);
        await user.findByIdAndDelete(id);
        res.status(201).json({Msg : "User deleted successfully"});
    }catch(err){
        res.status(400).json({Msg : `Error ${err}`});
    }
});


