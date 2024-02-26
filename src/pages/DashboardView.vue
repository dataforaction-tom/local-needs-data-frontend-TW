<script lang="ts">
import Multiselect from 'vue-multiselect'
import api from '../components/client'
import { defineComponent } from 'vue'
import type { Components, Paths } from '../types/localneedsapi'
import { Line } from 'vue-chartjs'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js'

interface PossibleColumn {
  dataset: string
  columns: Components.Schemas.PotentialColumn[]
}

interface BaseComponentData {
  possible_columns: PossibleColumn[] | undefined
  possible_areas: Components.Schemas.PotentialFilter[] | undefined
  possible_times: Components.Schemas.PotentialFilter[] | undefined
  selected_columns: PossibleColumn[]
  selected_areas: Components.Schemas.PotentialFilter[]
  selected_times: Components.Schemas.PotentialFilter[]
  data: Components.Schemas.ChartData | null
  chart_type: Components.Schemas.DashboardType | null
}

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend)

export default defineComponent({
  name: 'DashboardView',
  components: {
    Multiselect,
    LineChart: Line
  },
  data() {
    return {
      possible_columns: [],
      possible_areas: [],
      possible_times: [],
      selected_columns: [],
      selected_areas: [],
      selected_times: [],
      data: null,
      chart_type: null
    } as BaseComponentData
  },
  methods: {
    fetchData() {
      api
        .then((client) => client.localneeds_api_dashboard_dashboard_prepare(this.queryParameters))
        .then((response) => {
          if (!response) {
            throw new Error('No response')
          }
          const data = response.data
          if (data.possible_areas) {
            this.possible_areas = data.possible_areas
          }
          if (data.possible_times) {
            this.possible_times = data.possible_times
          }
          if (data.possible_columns) {
            var possible_columns = new Map<number, PossibleColumn>()
            data.possible_columns.forEach((item) => {
              if (!possible_columns.has(item.dataset_id)) {
                possible_columns.set(item.dataset_id, {
                  dataset: item.dataset_name,
                  columns: []
                })
              }
              possible_columns.get(item.dataset_id)?.columns.push(item)
            })
            this.possible_columns = Array.from(possible_columns.values())
          }
          if (data.data) {
            this.data = data.data
          }
        })
    }
  },
  computed: {
    queryParameters() {
      var params = {
        areas: this.selected_areas.map((item) => item.id),
        times: this.selected_times.map((item) => item.id),
        columns: this.selected_columns.map((item) => item.id)
      } as Paths.LocalneedsApiDashboardDashboardPrepare.QueryParameters
      if (this.chart_type) {
        params.dashboard_type = this.chart_type
      }
      return params
    },
    chartOptions() {
      return {
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    }
  },
  watch: {
    selected_columns: function (newVal, oldVal) {
      this.fetchData()
    },
    selected_areas: function (newVal, oldVal) {
      this.fetchData()
    },
    selected_times: function (newVal, oldVal) {
      this.fetchData()
    },
    chart_type: function (newVal, oldVal) {
      this.fetchData()
    }
  },
  mounted() {
    this.fetchData()
  }
})
</script>

<template>
  <div class="">
    <div class="mb3">
      <h3>Chart type</h3>
      <label class="db mb1"
        ><input
          type="radio"
          id="line"
          name="chart_type"
          value="measure_over_time"
          v-model="chart_type"
        />
        Compare measures over time</label
      >
      <label class="db mb1"
        ><input
          type="radio"
          id="line"
          name="chart_type"
          value="area_over_time"
          v-model="chart_type"
        />
        Compare areas over time</label
      >
      <label class="db mb1"
        ><input
          type="radio"
          id="line"
          name="chart_type"
          value="measure_over_area"
          v-model="chart_type"
        />
        Compare measures by area</label
      >
    </div>
    <div class="mb3" v-if="chart_type">
      <Multiselect
        v-model="selected_columns"
        placeholder="Select columns"
        label="name"
        track-by="id"
        :options="possible_columns"
        :multiple="true"
        group-values="columns"
        group-label="dataset"
        :group-select="false"
      >
      </Multiselect>
    </div>
    <div class="mb3" v-if="possible_areas && possible_areas.length">
      <Multiselect
        v-model="selected_areas"
        placeholder="Select areas"
        label="name"
        track-by="id"
        :options="possible_areas"
        :multiple="true"
      >
      </Multiselect>
    </div>
    <div class="mb3" v-if="possible_times && possible_times.length">
      <Multiselect
        v-model="selected_times"
        placeholder="Select times"
        label="name"
        track-by="id"
        :options="possible_times"
        :multiple="true"
      >
      </Multiselect>
    </div>
  </div>
  <div class="">
    <div v-if="!data">
      <p>Select data values to display a chart</p>
    </div>
    <div v-else>
      <line-chart :data="data" :options="chartOptions" />
    </div>
  </div>
</template>
