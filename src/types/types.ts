export enum ColumnType {
  Value = 'value',
  Date = 'date',
  Period = 'period',
  Place = 'place',
  Ignore = 'ignore'
}

export interface Column {
  name: string;
  type?: ColumnType;
  description?: string;
}

export interface ChecklistItem {
  name: string;
  valid: boolean;
}


export interface ExtendedColumn extends Column {
  id: number;
  dataset_id: number;
  dataset_name: string;
}

export interface Dataset {
  dataset: string;
  columns: ExtendedColumn[];
  id?: number; 
}
