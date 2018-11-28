"use strict";

// Model
class Todo {
  constructor(title, date) {
    Todo.nextId++;
    this.id = Todo.nextId; // auto_increment
    this.title = title;
    this.completed = false;
    this.date = date;
  }
}
Todo.nextId = 0;
// Service
class TodosService {
  /**
   * Constructor
   */
  constructor() {
    this.todoList = [];
  }
  /**
   * this is used to add a new ToDo Item
   * @param {*} title title of the ToDo item
   */
  addTodo(title) {
    if (!title) console.log("~~ ERROR: Please add a Title");
    else this.todoList.push(new Todo(title, null));
    console.log(this.todoList);
  }

  /**
   * this is used to modify the todo item title
   * @param {*} id identifier of the item to modify
   * @param {*} newTitle new title
   */
  editTodo(id, newTitle) {
    if (!id || id <= 0 || !newTitle) {
      console.log("~~ ERROR: Please supply the ID and newTitle to edit");
    } else {
      this.todoList.find(x => x.id === id).title = newTitle;
      console.log(this.todoList);
    }
  }

  /**
   * method to Mark a specified todo Item as COMPLETED.
   * @param {*} id identifier of  the todo item to mark as COmplete.
   * This will set the completed flag and set the date attribute to system date
   */
  completeTodo(id) {
    if (!id || id <= 0) {
      console.log("~~ ERROR: Please supply the ID");
    } else {
      let item = this.todoList.find(x => x.id === id);
      item.completed = true;
      item.date = new Date().toDateString();

      console.log(this.todoList);
    }
  }

  /**
   * this is used to Mark ALL Todo Items as COMPLETE.
   */
  completeAll() {
    this.todoList.forEach(item => {
      item.completed = true;
      item.date = new Date().toDateString();
    });
    console.log(this.todoList);
  }
  deleteTodo(id) {
    if (!id || id <= 0) {
      console.log("~~ ERROR: Please supply the ID");
    } else {
      let index = this.todoList.findIndex(p => p.id === id);
      this.todoList.splice(index, 1, undefined);
      console.log(this.todoList);
    }
  }

  /**
   * this is used to reset the COMPLETED Flag for ALL Items
   */
  clearCompleted() {
    this.todoList.forEach(item => {
      item.completed = false;
      item.date = null;
    });
    console.log(this.todoList);
  }

  /**
   * this is used to filter the todo items on basis of 'completed' flag 
   * @param {*} filter if true, return only completed items, else non-completed items 
   */
  viewTodos(filter) {
    /** filter can be true or false */
    console.log(this.todoList.filter(p => p.completed == filter));
  }
}

/**
 * INstantiate the Service API
 */
const service = new TodosService();
