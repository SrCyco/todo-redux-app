import { Pipe, PipeTransform } from '@angular/core';
import { Todo } from './models/todo.models';
import { filtrosValidos } from '../filter/filter.actions';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  transform(todos: Todo[], filter: filtrosValidos): Todo[] {
    switch(filter) {
      case 'completados':
        return todos.filter( todo => todo.complete);
      case 'pendientes':
        return todos.filter( todo => !todo.complete);
      default: 
        return todos;
    }
  }

}
