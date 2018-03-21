import { Injectable } from '@angular/core';
import { ITodo } from '../models/ITodo';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';
@Injectable()
export class TodoService {
  todosCollection: AngularFirestoreCollection<ITodo>;
  constructor(private db: AngularFirestore) {
    this.todosCollection = db.collection<ITodo>('todos');
    this.todosCollection.snapshotChanges().subscribe(actions => {
      const items = actions.map(a => {
        const data = a.payload.doc.data() as ITodo;
        const id = a.payload.doc.id;
        return { id, ...data };
      });
      this._todos.next(items);
    });
  }
  _todos: BehaviorSubject<Array<ITodo>> = new BehaviorSubject(new Array());
  get todos() {
    return this._todos.asObservable();
  }
  pushTodo(todo: ITodo) {
    const todos = this._todos.getValue();
    todos.push(todo);
    this._todos.next(todos);
    this.todosCollection.add(todo);
  }

  removeTodo(todo: ITodo) {
    this.todosCollection.doc(todo.id).delete();
  }

  removeCompleted() {
    this.db.collection('todos', ref => ref.where('completed', '==', true)).valueChanges().subscribe(items => {
      items.map((item: ITodo) => {
        this.removeTodo(item);
      });
    });
  }
  updateTodo(todo: ITodo) {
    this.todosCollection.doc(todo.id).update(todo);
  }

  clearAll() {
    this._todos.getValue().map((item: ITodo) => {
      this.removeTodo(item);
    });
  }
}
