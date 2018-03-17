const expect=require('expect');
const request=require('supertest');

const{app}=require('./server.js');
const {Todo}=require('./Todo.js');

beforeEach((done)=>{
  Todo.remove({}).then(()=>done());
});

describe('Post/Todo',()=>{
  it('should create a new Todo',(done)=>{
    var text='Hi this is vinoth';

    request(app)
    .post('/todos')
    .send(text)
    .expect(200)
    .expect((res)=>{
      expect(res.body.text).toBe(text);
    })
    .end((err,res)=>{
      if(err){
        return done(err);
      }
      Todo.find().then((todos)=>{
        expect(todos.length).toBe(1);
        expect(todo[0].text.toBe(text));
        done();
      }).catch((e)=>done(e));
    });
  });
});
