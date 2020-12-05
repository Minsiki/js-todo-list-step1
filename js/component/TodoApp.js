import TodoInput from "./TodoInput.js";
import TodoList from "./TodoList.js";

export default class TodoApp {
  $target = null;
  $todoInput = null;
  $todoList = null;
  $todoItems = null;
  $todoCount = null;
  todoInput = null;
  todoList = null;
  todoItems = [];

  constructor() {
    this.$todoInput = document.querySelector("#new-todo-title");
    this.$todoList = document.querySelector("#todo-list");
    this.$todoItems = document.querySelectorAll("#todo-list li");
    this.$todoCount = document.querySelector(".todo-count");
    
    if(localStorage.getItem("todoData") !== null && localStorage.getItem("todoData") !== undefined) {
      this.todoItems = JSON.parse(localStorage.getItem("todoData"));
    }    
    this.todoInput = new TodoInput({
      target: this.$todoInput,
      onAdd: (value => {
        let data = {
          code: this.getUUID(),
          title: value,
          isComplete: false
        }

        console.log(data);
        this.onItemAdd(data);
        localStorage.setItem("todoData", JSON.stringify(this.todoItems));
      })
    });

    this.todoList = new TodoList({
      data: this.todoItems,
      todoList: this.$todoList,
      todoItems: this.$todoItems,
    })   
  }

  onItemAdd(event) {
    this.todoList.onAdd(event);
  }

  getUUID() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
      let r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);

      return v.toString(16);
    });
  }
}