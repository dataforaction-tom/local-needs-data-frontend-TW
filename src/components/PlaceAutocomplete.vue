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
import VueMultiselect from 'vue-multiselect'
import { defineComponent } from 'vue'

const AREA_API_URL = 'https://local-needs.kanedata.co.uk/api/v1/area/'

// define place object with name, code and type
export interface Place {
  name: string
  code: string
  type: string
}

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
      value: null as Place | null,

      // places is an array of place objects
      places: [] as Place[],

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
      var url = new URL(AREA_API_URL)
      var params = { name: query }
      url.search = new URLSearchParams(params).toString()

      fetch(url)
        .then((response) => response.json())
        .then((data) => {
          this.places = data.items
          this.isLoading = false
        })
    },
    clearAll() {
      this.places = []
    },
    nameWithType(place: Place) {
      return `${place.name} — [${place.type}]`
    }
  }
})
</script>

<style src="vue-multiselect/dist/vue-multiselect.css"></style>
