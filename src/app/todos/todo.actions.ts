import { createAction, props } from '@ngrx/store';

export const create = createAction('[TODO] Create',
    props<{text: string}>()
);

export const toggle = createAction('[TODO] Toggle',
    props<{id: number}>()
);

export const edit = createAction('[TODO] Edit',
    props<{id: number, text: string}>()
);

export const onDelete = createAction('[TODO] Delete',
    props<{id: number}>()
);

export const selectAll = createAction('[TODO] Select All',
    props<{complete: boolean}>()
);

export const onClear = createAction('[TODO] Clear');
