//const MongoClient=require('mongodb').MongoClient;
const{MongoClient,objectID}=require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp',(err,db)=>{
  if(err){
    return console.log('unable to connect to db');
  }
  console.log('connection established');
    db.collection('users').find({name:'subash'}).toArray().then((docs)=>{
      console.log(JSON.stringify(docs,undefined,2));
    },(err)=>{
       console.log('unable to fetch');
    });
  // db.close();
});
