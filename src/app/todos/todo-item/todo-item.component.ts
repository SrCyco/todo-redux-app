import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';
import { Todo } from '../models/todo.models';
import { FormControl, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { AppState } from '../../app.reducer';
import * as actions from '../todo.actions';

@Component({
  selector: 'app-todo-item',
  templateUrl: './todo-item.component.html',
  styleUrls: ['./todo-item.component.css']
})
export class TodoItemComponent implements OnInit {
  @Input() todo: Todo;
  @ViewChild('input') inputElem: ElementRef;
  chkComplete: FormControl;
  txtInput: FormControl;
  editing = false;

  constructor(
    private store: Store<AppState>
  ) { }

  ngOnInit(): void {
    this.chkComplete = new FormControl(this.todo.complete);
    this.txtInput = new FormControl(this.todo.text, Validators.required);
    this.chkComplete.valueChanges.subscribe( val => {
      this.store.dispatch(actions.toggle({id: this.todo.id}))
    })
  }

  edit() {
    this.editing = true;
    this.txtInput.setValue(this.todo.text);
    setTimeout(() => {
      this.inputElem.nativeElement.select();
    }, 0);
  }

  finishEditing() {
    this.editing = false;
    if (this.txtInput.invalid) { return }
    if (this.txtInput.value === this.todo.text) { return }
    this.store.dispatch(actions.edit({
      id: this.todo.id,
      text: this.txtInput.value
    }))
  }

  delete() {
    this.store.dispatch(actions.onDelete({id: this.todo.id}))
  }

}
