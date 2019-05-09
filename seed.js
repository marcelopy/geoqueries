const mongoose = require('mongoose');
const shopModel = require('./models/shopModel');
const databaseUrl = 'mongodb://localhost:27017/geo';
const faker = require('faker');

mongoose.set('useCreateIndex', true);
const args = process.argv.slice(2)
const createRandomShops =()=>{

  const allShops=[];
  for(let i=1; i<=args[0]; i++){
    fakeShop={
      name:faker.company.companyName(),
      cheapestDish:faker.commerce.price(),
      location:{type:'Point',coordinates:[parseFloat(faker.address.longitude()),parseFloat(faker.address.latitude())]}}

    allShops.push(fakeShop);
  }
    return allShops;
  }

const connectToMongo = async ()=>{
  try{
    console.log('Attempt to connect');
    await mongoose.connect(databaseUrl, {useNewUrlParser:true});
    console.log('Connected. Attempt to seed...');
    const allShops = createRandomShops()
    await shopModel.create(allShops);
    console.log('Document was created');
    await mongoose.disconnect(databaseUrl);
    console.log('Disconnected');
  }catch(error){
    console.log(error);
  }
}

connectToMongo();
