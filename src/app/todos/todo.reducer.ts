import { createReducer, on } from '@ngrx/store';
import * as actions from './todo.actions';
import { Todo } from './models/todo.models';
 
export const initialState: Todo[] = [
    new Todo('Salvar el mundo'),
    new Todo('Vencer a Thanos'),
    new Todo('Comprar traje de Iron Man'),
    new Todo('Robar escudo del Cap. America'),
];
 
const _todoReducer = createReducer(initialState,
  on(actions.create, (state, {text}) => [...state, new Todo(text)]),
  on(actions.toggle, (state, {id}) => {
    return state.map(todo => {
      if (todo.id == id) {
        /**
         * No se debe hacer de esta manera porque se esta modificando
         * el mismo objeto del state ya que viene como referencia (Mismo espacio en memoria).
         * Por esto hay que crear un nuevo objeto, para romper esa referencia.
         */
        
        // todo.complete = !todo.complete;
        // return todo;
        return {
          ...todo,
          complete: !todo.complete
        } 
      } else {
        return todo;
      }
    })
  }),
  on(actions.edit, (state, {id, text}) => {
    return state.map(todo => {
      if (todo.id == id) {
        return {...todo, text} 
      } else {
        return todo;
      }
    })
  }),

  on(actions.onDelete, (state, {id}) => {
    return state.filter(todo => todo.id !== id) 
  }),

  on(actions.selectAll, (state, {complete}) => state.map(todo => ({...todo, complete}))),
  on(actions.onClear, (state) => state.filter(todo => !todo.complete)),
);
 
export function todoReducer(state, action) {
  return _todoReducer(state, action);
}