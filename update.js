const{MongoClient,ObjectID}=require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp',(err,db)=>{
  if(err){
    return console.log('unable to connect to db');
  }
  console.log('connection established');
    db.collection('users').findOneAndUpdate(
      {_id:new ObjectID('5aa36e0d249df02be4c490b2')},
    {
      $set: { name:"vinoth"}
    },{
  returnOriginal: false
}).then((result)=>{
  console.log(result);
});
  // db.close();
});
