const Article=require('../models/article').articleModel;


exports.get= async (req,res)=>{
    try{
       
        const articles=await Article.find();
        console.log(articles);
        res.send({data:articles});

    }
    catch(err){
        console.log(err);
    }
   
}


exports.add=(req,res)=>{
    

        const title=req.body.Title;
        const description=req.body.Description;
        const category=req.body.Category;
        const date=req.body.Date;
        

        const article=new Article({Title:title,Category:category,Description:description,Date:date,Slug:req.url});
        console.log('article created'+article);
        article
        .save()
        .then(result=>{console.log('Article created');res.status(201).send({data:article})} )
 
        .catch(err=>console.log(err));
         



    
    
}

exports.update= (req,res)=>{
    const Id=req.params.id;
    const dataToUpdate=req.body;
    const slug=`/article/${Id}`;

    Article.findById(Id).then(article=>{
        article.Title=dataToUpdate.Title;
        article.Description=dataToUpdate.Description;
        article.Category=dataToUpdate.Category;
        article.Slug=slug;
        return article.save();
    })
    .then(result=>{
        console.log('article updated');
        res.send({message:'updated'});
    })
    .catch(err=>console.log(err));
}
    




exports.delete=async(req,res)=>{
    try{
        const idTodelete=req.params.id;
        const result=await Article.findByIdAndRemove(idTodelete);
        console.log(result);
        res.send({message:"sucessfull deleted"});

    }
    catch(err){
        console.log(err);
    }
   

}
exports.search=async(req,res)=>{
    try{

        const text=req.params.text;
        const articles=await Article.find({Title:text}).sort({Date:1});
        console.log(articles);
        
        res.send({data:articles});

    }
    catch(err){
        console.log(err);


    }
}