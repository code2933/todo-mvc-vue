export const FILTER_TYPES = {
  ALL: 'All',
  ACTIVE: 'Active',
  COMPUTED: 'Computed',
}

export const FILTERS = {
  [FILTER_TYPES.ALL]: todos => todos,
  [FILTER_TYPES.ACTIVE]: todos =>
    todos.filter(todo => todo.isCompleted === false),
  [FILTER_TYPES.COMPUTED]: todos =>
    todos.filter(todo => todo.isCompleted === true),
}
