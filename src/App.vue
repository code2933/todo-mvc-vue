<template>
  <div id="todo-mvc">
    <h1>TODOS</h1>
    <input
      v-model="input"
      placeholder="What needs to be done?"
      class="create-input"
      autofocus
      @keyup.enter="onCreateTodo"
    />
    <div class="type-switcher">
      <button
        v-for="type in FILTER_TYPES"
        :key="type"
        :class="{ active: type === filteredType }"
        @click="() => onSwitchFilterType(type)"
      >
        {{ type }}
      </button>
    </div>
    <div>
      <input type="checkbox" :checked="isAllChecked" @change="onToggleAll" />
      <label> Toggle All </label>
    </div>
    <div>
      <todo
        v-for="todo in filteredTodos"
        :key="todo.id"
        :is-completed="todo.isCompleted"
        :text="todo.text"
        @toggle="isCompleted => onUpdateTodo(todo.id, { isCompleted })"
        @update-text="text => onUpdateTodo(todo.id, { text })"
        @remove="() => onRemoveTodo(todo.id)"
      />
    </div>
  </div>
</template>

<script>
import { computed, reactive, ref } from 'vue'
import { generateId, getTodos, setTodos } from './utils/storage'
import { FILTER_TYPES, FILTERS } from './utils/todoFilter'
import Todo from './components/Todo.vue'

export default {
  name: 'App',
  components: {
    Todo,
  },
  setup() {
    const input = ref('')

    // operate todos
    const todos = reactive(getTodos())
    function findTodoIndex(id) {
      return todos.findIndex(todo => todo.id === id)
    }
    function onCreateTodo() {
      const todo = {
        id: generateId(),
        text: input.value,
        isCompleted: false,
      }
      input.value = ''
      todos.push(todo)
      setTodos(todos)
    }
    function onUpdateTodo(id, todo) {
      const index = findTodoIndex(id)
      if (index > -1) {
        todos[index] = {
          ...todos[index],
          ...todo,
          id,
        }
        setTodos(todos)
      }
    }
    function onRemoveTodo(id) {
      const index = findTodoIndex(id)
      if (index > -1) {
        todos.splice(index, 1)
      }
      setTodos(todos)
    }

    // filter todos
    const filteredType = ref(FILTER_TYPES.ALL)
    const filteredTodos = computed(() => FILTERS[filteredType.value](todos))
    function onSwitchFilterType(type) {
      filteredType.value = type
    }

    // toggle all
    const isAllChecked = computed(
      () =>
        filteredTodos.value.length &&
        filteredTodos.value.every(todo => todo.isCompleted)
    )
    function onToggleAll(ev) {
      filteredTodos.value.forEach(todo => {
        todo.isCompleted = ev.target.checked
      })
    }

    return {
      input,
      onUpdateTodo,
      onRemoveTodo,
      onCreateTodo,
      filteredType,
      filteredTodos,
      onSwitchFilterType,
      isAllChecked,
      onToggleAll,
      FILTER_TYPES,
    }
  },
}
</script>

<style scoped>
#todo-mvc {
  width: 320px;
  margin: auto;
}
.create-input {
  box-sizing: border-box;
  width: 100%;
}
.type-switcher {
  margin: 10px 0;
}
.type-switcher button {
  margin: 0 10px;
  cursor: pointer;
}
.type-switcher button.active {
  background-color: rgb(122, 167, 226);
}
</style>
