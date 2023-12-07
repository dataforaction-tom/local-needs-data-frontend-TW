<script lang="ts">
import Papa from 'papaparse'
import type { ParseConfig, ParseResult } from 'papaparse'
import { defineComponent } from 'vue'
import DatasetValues from './DatasetValues.vue'
import DatasetProperties from './DatasetProperties.vue'
import DatasetPreview from './DatasetPreview.vue'
import DatasetChecklist from './DatasetChecklist.vue'
import type { Column, ChecklistItem } from '../types/types'
import { ColumnType } from '../types/types'
import DropZone from './DropZone.vue'

interface BaseComponentData {
  file: File | null
  csv: ParseResult<Record<string, string>> | null
  name: string | null | undefined
  description: string
  creator: string
  sample_data: Record<string, string>[] | null
  columns: Column[]
  defaultDate: any
  defaultPeriod: any
  defaultPlace: any
  papaparseConfig: ParseConfig
}

interface SchemaColumn {
  titles?: string
  datatype: string
  propertyUrl?: string
  valueUrl?: string
  default?: any
  virtual?: boolean
}

interface SchemaDataset {
  '@context': string
  '@type': string
  url: string
  'schema:name': string
  'schema:description': string
  'schema:creator': string
  tableSchema: {
    columns: SchemaColumn[]
  }
}

interface Observation {
  '@context': string
  '@type': string
  name: string
  value: number
  observationAbout: {
    '@type': string
    name: string
  }
  observationDate: string
  observationPeriod: string
}

const formatNumber = (value: number) => {
  return value.toLocaleString('en-GB', { maximumFractionDigits: 2 })
}

export default defineComponent({
  name: 'DatasetView',
  components: {
    DatasetPreview,
    DatasetValues,
    DatasetProperties,
    DropZone,
    DatasetChecklist
  },
  props: [],
  data() {
    return {
      file: null as File | null,
      csv: null as ParseResult<Record<string, string>> | null,
      sample_data: null,
      name: null,
      description: '',
      creator: '',
      columns: [],
      defaultDate: null,
      defaultPeriod: 'P1D',
      defaultPlace: null,
      papaparseConfig: { header: true, skipEmptyLines: true } as ParseConfig
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
    schemaOutput(): SchemaDataset {
      var columns: SchemaColumn[] = []

      this.columns.forEach((column: Column) => {
        if (column.type == ColumnType.Value) {
          columns.push({
            titles: column.name,
            datatype: 'number',
            propertyUrl: 'rdf:type',
            valueUrl: 'schema:Observation'
          })
        } else if (column.type == ColumnType.Date) {
          columns.push({
            titles: column.name,
            datatype: 'date',
            propertyUrl: 'schema:observationDate'
          })
        } else if (column.type == ColumnType.Period) {
          columns.push({
            titles: column.name,
            datatype: 'duration',
            propertyUrl: 'schema:observationPeriod'
          })
        } else if (column.type == ColumnType.Place) {
          columns.push({
            titles: column.name,
            datatype: 'string',
            propertyUrl: 'schema:observationPeriod'
          })
        } else {
          columns.push({
            titles: column.name,
            datatype: 'string'
          })
        }
      })

      if (!this.dateColumn) {
        columns.push({
          virtual: true,
          datatype: 'date',
          propertyUrl: 'schema:observationDate',
          default: this.defaultDate
        })
      }
      if (!this.periodColumn) {
        columns.push({
          virtual: true,
          datatype: 'duration',
          propertyUrl: 'schema:observationPeriod',
          default: this.defaultPeriod
        })
      }
      if (!this.placeColumn) {
        columns.push({
          virtual: true,
          datatype: 'duration',
          propertyUrl: 'schema:observationAbout',
          default: {
            '@type': 'Place',
            name: this.defaultPlace
          }
        })
      }

      return {
        '@context': 'http://www.w3.org/ns/csvw',
        url: this.file?.name,
        'schema:name': this.name,
        'schema:description': this.description,
        'schema:creator': this.creator,
        tableSchema: {
          columns: columns
        }
      } as SchemaDataset
    },
    observationOutput(): Observation[] {
      var observations: Observation[] = []

      if (!this.csv) return observations

      this.csv.data.forEach((row: Record<string, string>) => {
        this.valueColumns.forEach((column: Column) => {
          var place = this.placeColumn ? row[this.placeColumn.name] : this.defaultPlace
          var date = this.dateColumn ? row[this.dateColumn.name] : this.defaultDate
          var period = this.periodColumn ? row[this.periodColumn.name] : this.defaultPeriod

          if (row[column.name] == '') return

          var observation: Observation = {
            '@context': 'https://schema.org/',
            '@type': 'Observation',
            name: column.name,
            value: parseFloat(row[column.name]),
            observationAbout: {
              '@type': 'Place',
              name: place
            },
            observationDate: date,
            observationPeriod: period
          }
          observations.push(observation)
        })
      })

      return observations
    },
    checklist(): ChecklistItem[] {
      return [
        {
          name: 'File loaded',
          valid: this.csv
        },
        {
          name: 'No errors in CSV file',
          valid: this.csv?.errors.length == 0
        },
        {
          name: 'Dataset name and description',
          valid: this.name && this.description
        },
        {
          name: 'Dataset creator identified',
          valid: this.creator
        },
        {
          name: 'One or more values columns',
          valid: this.valueColumns.length > 0
        },
        {
          name: 'Date property column or value',
          valid: this.dateColumn || this.defaultDate
        },
        {
          name: 'Period property column or value',
          valid: this.periodColumn || this.defaultPeriod
        },
        {
          name: 'Place property column or value',
          valid: this.placeColumn || this.defaultPlace
        }
      ]
    },
    datasetValid(): boolean {
      return this.checklist.every((checklistItem) => checklistItem.valid)
    }
  },
  methods: {
    handleFileUpload($event: Event): void {
      const target = $event.target as HTMLInputElement
      if (target && target.files) {
        this.file = target.files[0]
        this.parseFile()
      }
    },
    handleFilesDropped(files: File[]): void {
      this.file = files[0]
      this.parseFile()
    },
    parseFile(): void {
      if (!this.file) return
      this.file.text().then((csvString: String) => {
        var config = {
          ...this.papaparseConfig,
          complete: (results: ParseResult<Record<string, string>>) => {
            this.csv = results
            this.sample_data = results.data.slice(0, 10)
            this.name = this.file?.name.replace('.csv', '')
            if (results.meta.fields) {
              this.columns = results.meta.fields.map((name: string) => {
                return { name: name, type: ColumnType.Value }
              })
            }
          }
        } as ParseConfig
        // @ts-ignore
        Papa.parse(csvString, config)
      })
    },
    formatNumber
  }
})
</script>

<template>
  <header>
    <h1 class="lh-solid">Create metadata for dataset</h1>
    <DropZone
      @files-dropped="handleFilesDropped"
      class="bg-washed-red br3 pa3 mb3 w-100 cf po b--red b-hover pointer"
    >
      <div v-if="file">
        <p class="mt0">
          Selected file: <strong>{{ file.name }}</strong>
        </p>
        <table class="table collapse w-100">
          <thead>
            <tr>
              <th class="tc w-third normal" v-if="csv?.data">Rows</th>
              <th class="tc w-third normal" v-if="columns">Columns</th>
              <th class="tc w-third normal" v-if="observationOutput">Observations</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td class="tc w-third b f2" v-if="csv?.data">{{ csv?.data.length }}</td>
              <td class="tc w-third b f2" v-if="columns">{{ columns.length }}</td>
              <td class="tc w-third b f2" v-if="observationOutput">
                {{ formatNumber(observationOutput.length) }}
              </td>
            </tr>
          </tbody>
        </table>
        <p class="mb0">Click or drag a new CSV file to change the file</p>
      </div>
      <div v-else class="">
        Click or drag a CSV file here to get started. Your file won't leave your computer.
      </div>
    </DropZone>
    <div v-if="file">
      <label class="db mb3 w-100">
        <strong>Dataset name</strong><br />
        <input
          class="w-100 br2 ba bw1 b--mid-gray pa2"
          type="text"
          v-model="name"
          placeholder="Name"
        />
      </label>
      <label class="db mb3 w-100">
        <strong>Dataset description</strong><br />
        <textarea
          class="w-100 br2 ba bw1 b--mid-gray pa2"
          v-model="description"
          placeholder="Description"
          rows="6"
        ></textarea>
      </label>
      <label class="db mb3 w-100">
        <strong>Publisher of the dataset</strong><br />
        <input
          class="w-100 br2 ba bw1 b--mid-gray pa2"
          type="text"
          v-model="creator"
          placeholder="Organisation"
        />
      </label>
    </div>
  </header>
  <section v-if="file">
    <h2>Results</h2>
    <h3>Checklist</h3>
    <DatasetChecklist :checklist="checklist" />
    <div v-if="datasetValid">
      <h3>Download results</h3>
      <a
        class="link dim br2 ph4 pv3 f4 bg-blue white"
        :href="
          'data:text/json;charset=utf-8,' +
          encodeURIComponent(JSON.stringify(schemaOutput, null, 2))
        "
        :download="file.name + '-metadata.json'"
        >Download CSV metadata</a
      >
    </div>
    <details class="f6 mt4">
      <summary class="pointer">Debug info</summary>
      <div class="pl2">
        <details>
          <summary class="pointer">CSV parse config</summary>
          <pre class="bg-light-gray code pa2 br3 f6">{{ papaparseConfig }}</pre>
        </details>
        <details>
          <summary class="pointer">CSV errors</summary>
          <pre class="bg-light-gray code pa2 br3 f6">{{ csv?.errors }}</pre>
        </details>
        <details>
          <summary class="pointer">CSV meta</summary>
          <pre class="bg-light-gray code pa2 br3 f6">{{ csv?.meta }}</pre>
        </details>
        <details>
          <summary class="pointer">JSON metadata</summary>
          <pre class="bg-light-gray code pa2 br3 f6">{{ schemaOutput }}</pre>
        </details>
        <details v-if="datasetValid">
          <summary class="pointer">JSON Observation Data</summary>
          <pre class="bg-light-gray code pa2 br3 f6">{{ observationOutput.slice(0, 15) }}</pre>
        </details>
      </div>
    </details>
  </section>
  <section class="column-span-2" id="content" v-if="sample_data">
    <DatasetPreview v-model:columns="columns" :sampleData="sample_data" />
  </section>
  <section v-if="file && columns">
    <DatasetProperties
      :dateColumn="dateColumn"
      :periodColumn="periodColumn"
      :placeColumn="placeColumn"
      v-model:default-date="defaultDate"
      v-model:default-period="defaultPeriod"
      v-model:default-place="defaultPlace"
    />
  </section>
  <section v-if="file && columns">
    <DatasetValues :valueColumns="valueColumns" />
  </section>
</template>
