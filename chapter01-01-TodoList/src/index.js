const express = require('express');
const cors = require('cors');

const { v4: uuidv4 } = require('uuid');

const app = express();

app.use(cors());
app.use(express.json());

const users = [];

function checksExistsUserAccount(request, response, next) {
  const { username } = request.headers;

  const user = users.find((user) => username === user.username);

  if (!user) {
    return response.status(404).json({ error: "User not found!" });
  }

  request.user = user;

  return next();
}

app.post('/users', (request, response) => {
  const {name, username} = request.body;
  const userAlreadyExist = users.find(user => user.username == username);
  
  if(userAlreadyExist){
    return response.status(400).json({ error: "User already exist !" }); 
  }

  const id = uuidv4();
  const newUser = { 
    id, 
    name, 
    username, 
    todos: []
  }
  users.push(newUser);
  return response.status(201).json(newUser);
});

app.get('/todos', checksExistsUserAccount, (request, response) => {
  const {user} = request;
  
  return response.status(201).json(user.todos);
});

app.post('/todos', checksExistsUserAccount, (request, response) => {
  const {user} = request;
  const { title, deadline} = request.body;

  const newTodo = {
    id: uuidv4(),
    title,
    done: false,
    deadline: new Date(deadline),
    created_at: new Date()
  }

  user.todos.push(newTodo);

  return response.status(201).json(newTodo);

});

app.put('/todos/:id', checksExistsUserAccount, (request, response) => {
  const {user} = request;
  const {title, deadline} = request.body;
  
  const {id} = request.params;
  console.log("this is our " + id);
  const todo = user.todos.find(todo => id === todo.id);
  if(!todo){
    return response.status(404).json({ error: "Todo not found!" });
  }

  todo.title = title;
  todo.deadline = new Date(deadline);

  return response.status(201).json(todo);
});

app.patch('/todos/:id/done', checksExistsUserAccount, (request, response) => {
  const {id} = request.params;
  const {user} = request;
  console.log(id);
  const todo = user.todos.find(todo=>todo.id == id);
  
  if(!todo){
    return response.status(404).json({ error: "Todo not found!" });
  }

  todo.done = true;
  console.log(todo);
  return response.status(201).json(todo);

});

app.delete('/todos/:id', checksExistsUserAccount, (request, response) => {
  const {id} = request.params;
  const {user} = request;
  const todo = user.todos.find(todo=>todo.id == id);

  if(!todo){
    return response.status(404).json({ error: "Todo not found!" });
  }

  user.todos.splice(todo.id, 1);

  return response.status(204).json(user.todos);
});

module.exports = app;