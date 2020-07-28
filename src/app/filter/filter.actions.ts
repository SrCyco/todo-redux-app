import {createAction, props} from '@ngrx/store';

export type filtrosValidos = 'todos' | 'completados' | 'pendientes';

export const setFilter = createAction(
    '[Filter] Set filter',
    props<{filter: filtrosValidos}>()
);
