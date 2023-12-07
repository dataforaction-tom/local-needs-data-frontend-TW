<script lang="ts">
import { defineComponent } from 'vue'
import type { ChecklistItem } from '../types/types'
import type { PropType } from 'vue'

export default defineComponent({
  name: 'DatasetChecklist',
  props: {
    checklist: {
      type: Array as PropType<ChecklistItem[]>,
      required: true
    }
  }
})
</script>

<template>
  <ul class="pl1">
    <li
      v-for="(checklistItem, index) in checklist.filter((checklistItem) => checklistItem.valid)"
      class="gray"
      style="list-style: none"
      :key="index"
    >
      <span class="mr1 green f3">✔</span>
      {{ checklistItem.name }}
    </li>
    <li
      v-for="(checklistItem, index) in checklist.filter((checklistItem) => !checklistItem.valid)"
      class="b dark-red"
      style="list-style: none"
      :key="index"
    >
      <span class="mr1 red f3">✖</span>
      {{ checklistItem.name }}
    </li>
  </ul>
</template>
