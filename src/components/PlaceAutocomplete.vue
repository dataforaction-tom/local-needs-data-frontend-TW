<template>
  <div class="mb5">
    <VueMultiselect
      v-model="value"
      id="ajax"
      label="name"
      track-by="code"
      placeholder="Type to search"
      open-direction="bottom"
      :custom-label="nameWithType"
      :options="places"
      :multiple="false"
      :searchable="true"
      :loading="isLoading"
      :internal-search="false"
      :clear-on-select="false"
      :close-on-select="false"
      :options-limit="300"
      :max-height="600"
      :show-no-results="false"
      :hide-selected="true"
      @search-change="asyncFind"
    ></VueMultiselect>
  </div>
</template>

<script lang="ts">
import type { Components } from '../types/localneedsapi'
import api from './client'
import VueMultiselect from 'vue-multiselect'
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'PlaceAutocomplete',
  components: {
    VueMultiselect
  },
  props: ['modelValue'],
  emits: ['update:modelValue'],
  data() {
    return {
      // value is a place object or null
      value: null as Components.Schemas.Area | null,

      // places is an array of place objects
      places: [] as Components.Schemas.Area[],

      // isLoading is a boolean
      isLoading: false
    }
  },
  watch: {
    value() {
      this.$emit('update:modelValue', this.value)
    }
  },
  methods: {
    asyncFind(query: string) {
      this.isLoading = true
      api
        .then((client) => client.localneeds_api_area_area_filter_list({ name: query }))
        .then((response) => {
          this.places = response.data.items
          this.isLoading = false
        })
    },
    clearAll() {
      this.places = []
    },
    nameWithType(place: Components.Schemas.Area) {
      return `${place.name} — [${place.type}]`
    }
  }
})
</script>

<style src="vue-multiselect/dist/vue-multiselect.css"></style>
./client
