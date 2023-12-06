<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'DatasetValues',
  props: ['valueColumns']
})
</script>

<template>
  <h2>Values</h2>
  <p class="measure">
    As well as the three properties you must specify at least one column containing
    <span class="value-text">values</span>.
  </p>
  <p class="measure">Currently there are {{ valueColumns.length }} columns containing values:</p>

  <ul>
    <li class="mb2" v-for="(column, index) in valueColumns" :key="index">
      <strong class="value-text">{{ column.name }}</strong>
    </li>
  </ul>
</template>
