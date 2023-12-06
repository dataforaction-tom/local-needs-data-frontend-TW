<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'DatasetPropertyListItem',
  props: ['name', 'column', 'defaultValue'],
  emits: ['update:defaultValue']
})
</script>

<template>
  <li class="mb3">
    <strong class="property-text">{{ name }}</strong
    >:<br />
    <template v-if="column">
      Use column <span class="property-text">{{ column.name }}</span>
    </template>
    <template v-else>
      Use default value
      <input
        type="text"
        class=""
        :value="defaultValue"
        @input="$emit('update:defaultValue', ($event.target as HTMLInputElement).value)"
        autocomplete="off"
      />
    </template>
  </li>
</template>
