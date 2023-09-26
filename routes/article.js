const express=require('express');
 
const router=express.Router();
const articleController=require('../controllers/article');





router.post('/insert',articleController.add);
router.get('/getArticles',articleController.get);
router.delete('/deleteArticle/:id',articleController.delete);
router.put('/updateArticle/:id',articleController.update);
router.get('/search/:text',articleController.search);






module.exports=router;