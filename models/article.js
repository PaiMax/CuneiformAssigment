const mongoose = require('mongoose');

connect().then(()=>console.log('connected')).catch(err => console.log(err));

async function connect() {
  return await mongoose.connect('mongodb://127.0.0.1:27017/blog_app_project');
}
const artilceSchema = new mongoose.Schema({
     Title:{
        type:String,
        required:true
     },
     Category:{
        type:String,
        required:true,
     },
     Description:{
         type:String,
         required:true
     },
Date:{
        type:String,
        required:true
     },
     Slug:{
        type:String,
        required:true
     }
}) 
const articleModel = mongoose.model('Blog',artilceSchema);
module.exports = {articleModel};
