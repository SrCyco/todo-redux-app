import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../../app.reducer';
import * as actions from 'src/app/filter/filter.actions';
import { onClear } from '../todo.actions';

@Component({
  selector: 'app-todo-footer',
  templateUrl: './todo-footer.component.html',
  styleUrls: ['./todo-footer.component.css']
})
export class TodoFooterComponent implements OnInit {

  currentFilter: actions.filtrosValidos = 'todos';
  filters: actions.filtrosValidos[] = ['todos', 'completados', 'pendientes'];
  pending: number = 0;

  constructor(private store: Store<AppState>) { }

  ngOnInit(): void {
    // this.store.select('filter').subscribe(filter => this.currentFilter = filter);
    this.store.subscribe(state => {
      this.currentFilter = state.filter;
      this.pending = state.todos.filter(todo => !todo.complete).length;
    });
  }

  setFilter(filter: actions.filtrosValidos) {
    this.store.dispatch(actions.setFilter({filter}));
  }

  onClearCompleted() {
    this.store.dispatch(onClear());
  }

}
