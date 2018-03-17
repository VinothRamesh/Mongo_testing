var {Todo}=require('./Todo');
var {mongoose}=require('./mongoose')

var id='5aad1d87a2e4711bcce69ba5';

Todo.find({
  _id:id
}).then((todos)=>{
  console.log('todo',todos);
});

Todo.findById(id).then((todo)=>{
if(!todo){
  return console.log('No todo found');
}
console.log('Todo Found',todo);
});
