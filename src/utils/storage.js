let _id = Number(localStorage.getItem('id') || 0)

export function generateId() {
  _id++
  localStorage.setItem('id', _id)
  return _id
}

export function getTodos() {
  return JSON.parse(localStorage.getItem('todos') || '[]')
}

export function setTodos(todos = []) {
  localStorage.setItem('todos', JSON.stringify(todos))
}
