 const mongoose = require("mongoose")
 const Schema = mongoose.Schema
   const userSchema= new Schema({
       name:{
           type: String
       },
       designation:{
           type:String
       },
       email:{
           type:String
       },
       phone:{
           typr : String
       },
       age:{
           type:Number
       },
       image:{
           type: String
       }
   },{timestamps:true})

   const Employee = mongoose.model("Employee",userSchema)
    module.exports= Employee;