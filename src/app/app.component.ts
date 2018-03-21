import { Component, OnInit } from '@angular/core';
import { ITodo } from '../core/models/ITodo';
import { TodoService } from '../core/services/todo.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  todo: string;
  todos: ITodo[] = [];
  selected: ITodo[] = [];
  constructor(private todoService: TodoService) {
  }

  ngOnInit() {
    this.todoService.todos.subscribe((todos) => {
      this.todos = todos;
      this.selected = this.todos.filter(t => t.completed);
    });
  }

  addTodo(todo: string) {
    if (todo) {
      this.todoService.pushTodo({ completed: false, title: todo });
      this.todo = '';
    }

  }

  updateTodo(todo: ITodo) {
    todo.completed = !todo.completed;
    this.selected = this.todos.filter(t => t.completed);
    this.todoService.updateTodo(todo);
  }

  removeTodo(todo: ITodo) {
    this.todoService.removeTodo(todo);
  }

  removeCompleted() {
    this.todoService.removeCompleted();
  }

  clearAll() {
    const value = prompt('Mày là ai mà đòi clear?');
    if (value === 'Quỳnh Đẹp Trai') {
      this.todoService.clearAll();
    }
  }
}
