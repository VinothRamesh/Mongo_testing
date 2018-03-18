var express=require('express');
var bodyParser=require('body-Parser');
const {ObjectId}=require('mongodb');

var {Todo}=require('./Todo');
var {mongoose}=require('./mongoose')

var app=express();
const port=process.env.port || 3000;

app.use(bodyParser.json());

app.post('/todos',(req,res)=>{
  var text=JSON.stringify(req.body.text);
  var todo=new Todo({
    text: text,
    completed:req.body.completed,
    completedAt:req.body.completedAt
  });
  todo.save().then((doc)=>{
  res.send(doc);
  },(e)=>{
  res.send(e);
  });
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

app.listen(port,()=>{
  console.log(`started port ${port}`);
});

module.exports={app};
