<script lang="ts">
import { defineComponent } from 'vue'
import type { Column } from '../types/types'
import { ColumnType } from '../types/types'

export default defineComponent({
  name: 'DatasetPreview',
  components: {},
  props: ['columns', 'sampleData'],
  emits: ['update:columns'],
  methods: {
    isProperty(column: Column): boolean {
      if(!column.type) return false
      return [ColumnType.Date, ColumnType.Period, ColumnType.Place].includes(column.type)
    },
    isValue(column: Column): boolean {
      return column.type == ColumnType.Value
    }
  }
})
</script>

<template>
  <h2>Data Preview</h2>
  <div class="w-100 overflow-x-auto" style="max-width: 90vw;">
    <table class="table collapse">
      <thead>
        <tr>
          <th class="pa2 ba b--gray tl v-top">Column name</th>
          <th
            v-for="(column, index) in columns"
            :key="index"
            class="pa2 ba b--gray tl v-top"
            :class="{ 'property-bg': isProperty(column), 'value-bg': isValue(column) }"
          >
            {{ column.name }}
          </th>
        </tr>
        <tr>
          <th class="pa2 ba b--gray tl v-top">Column type</th>
          <th
            v-for="(column, index) in columns"
            :key="index"
            class="pa2 ba b--gray tl v-top"
            :class="{ 'property-bg': isProperty(column), 'value-bg': isValue(column) }"
          >
            <select
              :value="column.type"
              @input="column.type = ($event.target as HTMLInputElement)?.value"
              class="w-100"
            >
              <option value="ignore">Ignore</option>
              <option value="value">Value</option>
              <optgroup label="Properties">
                <option value="date">Date</option>
                <option value="period">Period</option>
                <option value="place">Place</option>
              </optgroup>
            </select>
          </th>
        </tr>
        <tr>
          <th class="pa2 ba b--gray tl v-top">Column description</th>
          <th
            v-for="(column, index) in columns"
            :key="index"
            class="pa2 ba b--gray tl v-top"
            :class="{ 'property-bg': isProperty(column), 'value-bg': isValue(column) }"
          >
            <textarea
              class="bn br3 pa2 f6"
              :value="column.description"
              @input="column.description = ($event.target as HTMLInputElement).value"
            ></textarea>
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(row, index) in sampleData" :key="index">
          <th class="pa2 ba b--gray tl v-top" v-if="index == 0" :rowspan="sampleData.length">
            Sample data
          </th>
          <td
            v-for="(column, index) in columns"
            :key="index"
            class="pa2 ba b--gray v-top"
            :class="{ 'property-bg': isProperty(column), 'value-bg tr': isValue(column), 'tl': !isValue(column) }"
          >
            <span v-if="row[column.name] == ''" class="gray">-- empty --</span>
            <span v-else>{{ row[column.name] }}</span>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
