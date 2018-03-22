const express=require('express');
const bodyParser=require('body-Parser');
const {ObjectId}=require('mongodb');
const _=require('lodash');

var {User}=require('./user');
var {mongoose}=require('./mongoose')

var app=express();
const port=process.env.port || 3000;

app.use(bodyParser.json());

app.post('/user',(req,res)=>{
  var body=_.pick(req.body,['email','password']);
  var user=new User(body);

  user.save().then(()=>{
    return user.generateAuthToken();
  }).then((token)=>{
    res.header('x-auth',token).send(user);
  }).catch((e)=>{
    res.status(400).send(e);
  })
});
  app.get('/todos',(req,res)=>{
    Todo.find().then((todos)=>{
      res.send({todos});
    },(e)=>
    {
      res.send(400).send(e);
    })
  });

  app.get('/todos/:id',(req,res)=>{
    var id=req.params.id;
    if(!ObjectId.isValid(id)){
      res.status(404).send();
    }
    else{
    Todo.findById(id).then((todo)=>{
    if(!todo){
      res.status(404).send();
    }
    else{
      res.status(200).send(todo);
    }
  }).catch((e)=>{
    res.status(400).send();
  })
}
  });

  app.delete('/todos/:id',(req,res)=>{
    var id=req.params.id;
    if(!ObjectId.isValid(id)){
      res.status(404).send();
    }
    else{
    Todo.findByIdAndRemove(id).then((todo)=>{
    if(!todo){
      res.status(404).send();
    }
    else{
      res.status(200).send(todo);
    }
  }).catch((e)=>{
    res.status(400).send();
  });
}
});

app.patch('/todos/:id',(req,res)=>{
  var id=req.params.id;
  var body=_.pick(req.body,['text','completed']);
  if(!ObjectId.isValid(id)){
    return res.status(404).send();
  }
    if(_.isBoolean(body.completed) && body.completed){
      body.completedAt=new Date().getTime();
    }else{
      body.completed=false;
      body.completedAt=null;
    }
    Todo.findByIdAndUpdate(id,{$set:body},{new:true}).then((todo)=>{
      if(!todo){
        return res.status(404).send();
      }
        res.status(200).send({todo});
    }).catch((e)=>{
      res.status(400).send();
    });
  });

app.listen(port,()=>{
  console.log(`started port ${port}`);
});

module.exports={app};
