const express = require('express');
const app=express();
const mongoose = require('mongoose');
const morgan = require('morgan');
const databaseUrl = 'mongodb://localhost:27017/geo';
const errorHandler=require('./utilities/errorHandlers');
const shopsRouter=require('./routes/shopsRouter');

mongoose.set('useCreateIndex', true);
app.use(express.json());
app.use(express.urlencoded({extended:false}));
app.use(morgan('dev'));
app.use(express.static('browser'));
app.use(errorHandler)
app.use('/shops', shopsRouter);


const connectToMongo = async ()=>{
  try{
    await mongoose.connect(databaseUrl, {useNewUrlParser:true});
  }
  catch (error){
    console.log(error);
  }
}
connectToMongo();
app.listen(4000);
console.log('Server is listening on 4000');
