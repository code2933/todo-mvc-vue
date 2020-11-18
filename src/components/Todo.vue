<template>
  <div :class="`todo ${isCompleted ? 'completed' : 'active'}`">
    <input
      v-if="isEditing"
      v-focus
      v-model="input"
      @blur="onEditDone"
      @keyup.enter="onEditDone"
    />
    <div v-else @dblclick="onEdit">
      <input type="checkbox" :checked="isCompleted" @change="onToggle" />
      <label class="text"> {{ text }} </label>
      <button class="remove-button" @click="onRemove">x</button>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue'

export default {
  name: 'todo',
  props: {
    isCompleted: {
      type: Boolean,
      required: true,
    },
    text: {
      type: String,
      required: true,
    },
  },
  directives: {
    focus(el) {
      el.focus()
    },
  },
  setup(props, context) {
    const input = ref(props.text)

    // edit text
    const isEditing = ref(false)
    function onEdit() {
      isEditing.value = true
    }
    function onEditDone() {
      isEditing.value = false
      if (input) {
        context.emit('update-text', input)
      }
    }

    // toggle todo
    function onToggle(ev) {
      context.emit('toggle', ev.target.checked)
    }

    // reomve todo
    function onRemove() {
      context.emit('remove')
    }
    return {
      input,
      isEditing,
      onEdit,
      onEditDone,
      onToggle,
      onRemove,
    }
  },
}
</script>

<style scoped>
.todo {
  text-align: left;
}
.todo.completed .text {
  text-decoration: line-through;
}
.todo .remove-button {
  float: right;
  display: none;
}
.todo:hover {
  background-color: #eee;
}
.todo:hover .remove-button {
  display: inline-block;
  cursor: pointer;
}
</style>
