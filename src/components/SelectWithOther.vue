<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'SelectWithOther',
  props: ['modelValue', 'pattern'],
  emits: ['update:modelValue'],
  data() {
    return {
      mainValue: this.modelValue,
      otherValue: ''
    }
  },
  computed: {
    value() {
      if (this.mainValue === 'other') {
        return this.otherValue
      } else {
        return this.mainValue
      }
    }
  },
  watch: {
    value() {
      this.$emit('update:modelValue', this.value)
    }
  }
})
</script>

<template>
  <select autocomplete="off" v-model="mainValue">
    <slot></slot>
    <option value="other">Other</option>
  </select>
  <input
    v-if="mainValue === 'other'"
    v-model="otherValue"
    type="text"
    class="w5 validate pa1 ba b--mid-gray ml2 br2"
    placeholder="Enter a value"
    :pattern="pattern"
  />
</template>
