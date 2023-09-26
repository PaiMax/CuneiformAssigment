
const express=require('express');
const bodyParser=require('body-parser');
const app=express();
const cors=require('cors');


const articleRoute=require('./routes/article');



app.use(cors());
app.use(bodyParser.json({extended:false}));
app.use('/article',articleRoute);

app.listen(3001);

