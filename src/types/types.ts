export enum ColumnType {
  Value = 'value',
  Date = 'date',
  Period = 'period',
  Place = 'place',
  Ignore = 'ignore'
}

export interface Column {
  name: string
  type?: ColumnType
  description?: string
}

export interface ChecklistItem {
  name: string
  valid: boolean
}
