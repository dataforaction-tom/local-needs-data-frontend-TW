<script lang="ts">
import Papa from 'papaparse'
import { defineComponent } from 'vue'
import DatasetValues from './DatasetValues.vue'
import DatasetProperties from './DatasetProperties.vue'
import DatasetPreview from './DatasetPreview.vue'
import type { Column } from '../types/types'
import { ColumnType } from '../types/types'

interface BaseComponentData {
  file: File | null
  csv: any
  name: string | null | undefined
  description: string
  creator: string
  sample_data: [Record<string, string>] | null
  columns: Column[]
  defaultDate: any
  defaultPeriod: any
  defaultPlace: any
}

interface SchemaColumn {
  titles?: string
  datatype: string
  propertyUrl: string
  valueUrl?: string
  default?: any
  virtual?: boolean
}

export default defineComponent({
  name: 'DatasetView',
  components: {
    DatasetPreview,
    DatasetValues,
    DatasetProperties,
  },
  props: [],
  data() {
    return {
      file: null as  File | null,
      csv: null as any,
      sample_data: null,
      name: null,
      description: '',
      creator: '',
      columns: [],
      defaultDate: null,
      defaultPeriod: null,
      defaultPlace: null
    } as BaseComponentData
  },
  computed: {
    dateColumn(): Column | undefined {
      return this.columns.find((column: Column) => column.type == ColumnType.Date)
    },
    periodColumn(): Column | undefined {
      return this.columns.find((column: Column) => column.type == ColumnType.Period)
    },
    placeColumn(): Column | undefined {
      return this.columns.find((column: Column) => column.type == ColumnType.Place)
    },
    valueColumns(): Column[] {
      return this.columns.filter((column: Column) => column.type == ColumnType.Value)
    },
    schemaOutput(): string {
      var columns: SchemaColumn[] = [];
      
      this.columns.forEach((column: Column) => {
        if (column.type == ColumnType.Value) {
          columns.push({
            titles: column.name,
            datatype: "number",
            propertyUrl: "rdf:type",
            valueUrl: "schema:Observation",
          })
        } else if (column.type == ColumnType.Date) {
          columns.push({
            titles: column.name,
            datatype: "date",
            propertyUrl: "schema:observationDate",
          })
        } else if (column.type == ColumnType.Period) {
          columns.push({
            titles: column.name,
            datatype: "duration",
            propertyUrl: "schema:observationPeriod",
          })
        } else if (column.type == ColumnType.Place) {
          columns.push({
            titles: column.name,
            datatype: "string",
            propertyUrl: "schema:observationPeriod",
          })
        }
      });

      if(!this.dateColumn) {
        columns.push({
          virtual: true,
          datatype: "date",
          propertyUrl: "schema:observationDate",
          default: this.defaultDate,
        })
      }
      if(!this.periodColumn) {
        columns.push({
          virtual: true,
          datatype: "duration",
          propertyUrl: "schema:observationPeriod",
          default: this.defaultPeriod,
        })
      }
      if(!this.placeColumn) {
        columns.push({
          virtual: true,
          datatype: "duration",
          propertyUrl: "schema:observationAbout",
          default: {
            "@type": "Place",
            "name": this.defaultPlace,
          },
        })
      }

      return JSON.stringify({
        "@context": "http://www.w3.org/ns/csvw",
        "url": this.file?.name,
        "schema:name": this.name,
        "schema:description": this.description,
        "schema:creator": this.creator,
        "tableSchema": {
          "columns": columns
        }
      }, null, 2)
    },
    observationOutput(): string {
      var observations: Record<string, string>[] = [];

      this.csv.data.forEach((row: Record<string, string>) => {
        this.valueColumns.forEach((column: Column) => {

          var place = this.placeColumn ? row[this.placeColumn.name] : this.defaultPlace
          var date = this.dateColumn ? row[this.dateColumn.name] : this.defaultDate
          var period = this.periodColumn ? row[this.periodColumn.name] : this.defaultPeriod

          var observation: Record<string, any> = {
            "@context": "https://schema.org/",
            "@type": "Observation",
            "name": column.name,
            "value": row[column.name],
            "observationAbout": {
              "@type": "Place",
              "name": place
            },
            "observationDate": date,
            "observationPeriod": period
          };
          observations.push(observation)
        });
      });

      return JSON.stringify(observations, null, 2)
    }
  },
  methods: {
    handleFileUpload($event: Event) {
      const target = $event.target as HTMLInputElement
      if (target && target.files) {
        this.file = target.files[0]
        this.file.text().then((data: String) => {
          var csv = Papa.parse(data, { header: true, skipEmptyLines: true })
          this.csv = csv
          this.sample_data = csv.data.slice(0, 10)
          this.name = this.file?.name
          this.columns = csv.meta.fields.map((name: string) => {
            return { name: name, type: ColumnType.Value }
          })
        })
      }
    },
    isProperty(column: Column) {
      return column.type != ColumnType.Value
    },
    isValue(column: Column) {
      return column.type == ColumnType.Value
    }
  }
})
</script>

<template>
  <div class="fl w-100 ph3 ph5-ns lh-copy f4">
    <header class="fl w-50 pr2">
      <h1 class="lh-solid">Create metadata for dataset</h1>
      <p>Select a CSV file to create metadata. Your file won't leave your computer.</p>
      <input type="file" @change="handleFileUpload($event)" accept="text/csv" capture />
      <div v-if="file">
        <p>Selected file: <strong>{{ file.name }}</strong></p>
        <label class="db mb3 w-100">
          <strong>Dataset name</strong><br>
          <input class="w-100 br2 ba bw1 b--mid-gray pa2" type="text" v-model="name" placeholder="Name" />
        </label>
        <label class="db mb3 w-100">
          <strong>Dataset description</strong><br>
          <textarea class="w-100 br2 ba bw1 b--mid-gray pa2" v-model="description" placeholder="Description" rows="6"></textarea>
        </label>
        <label class="db mb3 w-100">
          <strong>Publisher of the dataset</strong><br>
          <input class="w-100 br2 ba bw1 b--mid-gray pa2" type="text" v-model="creator" placeholder="Organisation" />
        </label>
      </div>
    </header>
    <div class="w-50 fl pl2" v-if="file">
      <h2>Results</h2>
      <h3>Checklist</h3>
      <ul>
        <li>
            <span class="mr1 green" v-if="name && description">✔</span>
            <span class="mr1 red" v-else>✖</span> 
            Dataset name and description
        </li>
        <li>
            <span class="mr1 green" v-if="creator">✔</span>
            <span class="mr1 red" v-else>✖</span> 
            Dataset creator identified
        </li>
        <li>
            <span class="mr1 green" v-if="valueColumns.length > 0">✔</span>
            <span class="mr1 red" v-else>✖</span> 
            One or more <span class="value-text">values</span> columns
        </li>
        <li>
            <span class="mr1 green" v-if="dateColumn || defaultDate">✔</span>
            <span class="mr1 red" v-else>✖</span> 
            <span class="ml2 property-text">Date</span> property column or value
        </li>
        <li>
            <span class="mr1 green" v-if="periodColumn || defaultPeriod">✔</span>
            <span class="mr1 red" v-else>✖</span> 
            <span class="ml2 property-text">Period</span> property column or value
        </li>
        <li>
            <span class="mr1 green" v-if="placeColumn || defaultPlace">✔</span>
            <span class="mr1 red" v-else>✖</span> 
            <span class="ml2 property-text">Place</span> property column or value
        </li>
      </ul>
      <details>
        <summary class="pointer">JSON metadata</summary>
        <pre class="bg-light-gray code pa2 br3 f6">{{ schemaOutput }}</pre>
      </details>
      <details>
        <summary class="pointer">JSON Observation Data</summary>
        <pre class="bg-light-gray code pa2 br3 f6">{{ observationOutput }}</pre>
      </details>
    </div>
  </div>
  <section id="content" class="fl w-100 ph3 pv2 ph5-ns lh-copy f4" v-if="sample_data">
    <DatasetPreview v-model:columns="columns" :sampleData="sample_data" />
  </section>
  <section class="fl w-100 ph3 pv2 ph5-ns lh-copy f4" v-if="file && columns">
    <DatasetProperties :dateColumn="dateColumn" :periodColumn="periodColumn" :placeColumn="placeColumn"
      v-model:default-date="defaultDate" v-model:default-period="defaultPeriod" v-model:default-place="defaultPlace" />
  </section>
  <section class="fl w-100 ph3 pv2 ph5-ns lh-copy f4" v-if="file && columns">
    <DatasetValues :valueColumns="valueColumns" />
  </section>
</template>
