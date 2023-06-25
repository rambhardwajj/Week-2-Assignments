/**
  You need to create an express HTTP server in Node.js which will handle the logic of a todo list app.
  - Don't use any database, just store all the data in an array to store the todo list data (in-memory)
  - Hard todo: Try to save responses in files, so that even if u exit the app and run it again, the data remains (similar to databases)

  Each todo has a title and a description. The title is a string and the description is a string.
  Each todo should also get an unique autogenerated id every time it is created
  The expected API endpoints are defined below,
  1.GET /todos - Retrieve all todo items
    Description: Returns a list of all todo items.
    Response: 200 OK with an array of todo items in JSON format.
    Example: GET http://localhost:3000/todos
    
  2.GET /todos/:id - Retrieve a specific todo item by ID
    Description: Returns a specific todo item identified by its ID.
    Response: 200 OK with the todo item in JSON format if found, or 404 Not Found if not found.
    Example: GET http://localhost:3000/todos/123
    
  3. POST /todos - Create a new todo item
    Description: Creates a new todo item.
    Request Body: JSON object representing the todo item.
    Response: 201 Created with the ID of the created todo item in JSON format. eg: {id: 1}
    Example: POST http://localhost:3000/todos
    Request Body: { "title": "Buy groceries", "completed": false, description: "I should buy groceries" }
    
  4. PUT /todos/:id - Update an existing todo item by ID
    Description: Updates an existing todo item identified by its ID.
    Request Body: JSON object representing the updated todo item.
    Response: 200 OK if the todo item was found and updated, or 404 Not Found if not found.
    Example: PUT http://localhost:3000/todos/123
    Request Body: { "title": "Buy groceries", "completed": true }
    
  5. DELETE /todos/:id - Delete a todo item by ID
    Description: Deletes a todo item identified by its ID.
    Response: 200 OK if the todo item was found and deleted, or 404 Not Found if not found.
    Example: DELETE http://localhost:3000/todos/123

    - For any other route not defined in the server return 404

  Testing the server - run `npm run test-todoServer` command in terminal
 */

  
const express = require('express');
const bodyParser = require('body-parser');
const port = 8000;
const app = express();

var todoList = [];

let it = 0;
todoList[0] = {
  id: it + 1,
  title: "Buy groceries",
  completed: false,
  description: "I should buy groceries"
}; // Adding an initial item to the todoList array

app.use(bodyParser.json());


function printTodos(req, res) {
  const ans = JSON.stringify(todoList);
  console.log(ans);
  res.send(ans);
}
app.get('/todos', printTodos);

function getTodoItem(req, res) {
  var idd = req.params.id;
  if (todoList[idd]) {
    const ans = todoList[idd].title;
    console.log(ans);
    res.send(ans);
  } else {
    res.sendStatus(404);
  }
}
app.get('/todos/:id', getTodoItem);

function addTodoItem(req, res) {
  const newTodo = req.body;
  const newTodoId = todoList.length + 1;
  newTodo.id = newTodoId;
  todoList.push(newTodo);
  console.log(JSON.stringify(newTodo));
  res.status(201).json({ id: newTodoId });
}
app.post('/todos', addTodoItem);

function updateTodo( req, res){
  const idd = req.params.id;
  const { title , completed } = req.body;
  const todoIndex = todoList.findIndex( item => item.id === parseInt(idd));
  if( todoIndex!=-1){
    todoList[todoIndex].title = title || todoList[todoIndex].title;
    todoList[todoIndex].completed = completed || todoList[todoIndex].completed;
    res.send(202);
  }else{
    res.sendStatus(404);
  }
}
app.put('/todos/:id', updateTodo);

function deleteTodo(req, res) {
  const idd = req.params.id;
  if (idd >= 1 && idd <=todoList.length) {
    todoList.splice(idd-1, 1);
    res.sendStatus(202);
  } else {
    res.sendStatus(404);
  }
}
app.delete('/todos/:id', deleteTodo);

app.listen(port, started);

function started() {
  console.log(`Example app running on port ${port}`);
}


module.exports = app;
