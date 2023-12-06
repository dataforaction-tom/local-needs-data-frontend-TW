<script lang="ts">
import { defineComponent } from 'vue'

import DatasetPropertyListItem from './DatasetPropertyListItem.vue'

export default defineComponent({
  name: 'DatasetProperties',
  components: {
    DatasetPropertyListItem
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
    <DatasetPropertyListItem
      name="Date"
      :column="dateColumn"
      :defaultValue="defaultDate"
      @input="$emit('update:defaultDate', $event.target.value)"
    />
    <DatasetPropertyListItem
      name="Period"
      :column="periodColumn"
      :defaultValue="defaultPeriod"
      @input="$emit('update:defaultPeriod', $event.target.value)"
    />
    <DatasetPropertyListItem
      name="Place"
      :column="placeColumn"
      :defaultValue="defaultPlace"
      @input="$emit('update:defaultPlace', $event.target.value)"
    />
  </ul>
</template>
