var express=require('express');
var bodyParser=require('body-Parser');

var {Todo}=require('./Todo');
var {mongoose}=require('./mongoose')

var app=express();

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

app.listen(3000,()=>{
  console.log('Started port 3000');
});

module.exports={app};
