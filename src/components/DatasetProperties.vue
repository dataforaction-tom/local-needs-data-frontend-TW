<script lang="ts">
import { defineComponent } from 'vue'

import DatasetPropertyListItem from './DatasetPropertyListItem.vue'
import SelectWithOther from './SelectWithOther.vue'

export default defineComponent({
  name: 'DatasetProperties',
  components: {
    DatasetPropertyListItem,
    SelectWithOther
  },
  props: [
    'dateColumn',
    'periodColumn',
    'placeColumn',
    'defaultDate',
    'defaultPeriod',
    'defaultPlace'
  ],
  emits: ['update:defaultDate', 'update:defaultPeriod', 'update:defaultPlace']
})
</script>

<template>
  <h2>Properties</h2>

  <p class="measure">
    Your dataset needs at least 3 <span class="property-text">properties</span>.
    <span class="property-text">Properties</span> help understand the context of the data.
  </p>
  <p class="measure">
    These <span class="property-text">properties</span> can either be given in columns or you can
    provide a value for the whole dataset.
  </p>
  <ul>
    <DatasetPropertyListItem name="Date" :column="dateColumn">
      <input
        type="date"
        class=""
        autocomplete="off"
        :defaultValue="defaultDate"
        @input="$emit('update:defaultDate', ($event.target as HTMLInputElement)?.value)"
      />
    </DatasetPropertyListItem>
    <DatasetPropertyListItem name="Period" :column="periodColumn">
      <SelectWithOther
        :modelValue="defaultPeriod"
        @update:modelValue="(value) => $emit('update:defaultPeriod', value)"
        pattern="^P(\d+Y)?(\d+M)?(\d+W)?(\d+D)?(T(\d+H)?(\d+M)?(\d+S)?)?$"
      >
        <option value="P1D">On this day</option>
        <option value="P1M">Monthly</option>
        <option value="P3M">Three months</option>
        <option value="P6M">Six months</option>
        <option value="P1Y">One year</option>
      </SelectWithOther>
    </DatasetPropertyListItem>
    <DatasetPropertyListItem name="Place" :column="placeColumn">
      <input
        type="text"
        class=""
        autocomplete="off"
        :defaultValue="defaultPlace"
        @input="$emit('update:defaultPlace', ($event.target as HTMLInputElement)?.value)"
      />
    </DatasetPropertyListItem>
  </ul>
</template>
