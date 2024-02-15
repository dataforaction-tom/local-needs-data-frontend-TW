import type {
  OpenAPIClient,
  Parameters,
  UnknownParamsObject,
  OperationResponse,
  AxiosRequestConfig,
} from 'openapi-client-axios';

declare namespace Components {
    namespace Schemas {
        /**
         * Area
         */
        export interface Area {
            /**
             * Code
             */
            code: string;
            /**
             * Name
             */
            name: /* Name */ string | null;
            /**
             * Type
             */
            type: string;
        }
        /**
         * AreaFilter
         */
        export interface AreaFilter {
            /**
             * Type
             */
            type?: string[];
            /**
             * Name
             */
            name?: string;
        }
        /**
         * ChartData
         */
        export interface ChartData {
            /**
             * Labels
             */
            labels: string[];
            /**
             * Datasets
             */
            datasets: /* ChartDataset */ ChartDataset[];
        }
        /**
         * ChartDataset
         */
        export interface ChartDataset {
            /**
             * Label
             */
            label: string;
            /**
             * Data
             */
            data: (number | number | null)[];
        }
        /**
         * Column
         */
        export interface Column {
            default_place?: /* Place */ Place | null;
            /**
             * ID
             */
            id?: /* ID */ number | null;
            /**
             * Dataset
             */
            dataset: number;
            /**
             * Title
             */
            title?: /* Title */ string | null;
            /**
             * Description
             */
            description?: /* Description */ string | null;
            /**
             * Datatype
             */
            datatype?: /* Datatype */ string | null;
            /**
             * Column Type
             */
            column_type?: /* Column Type */ string | null;
            /**
             * Default Date
             */
            default_date?: /* Default Date */ string /* date-time */ | null;
            /**
             * Default Period
             */
            default_period?: /* Default Period */ string | null;
        }
        /**
         * ColumnStandard
         */
        export interface ColumnStandard {
            /**
             * Titles
             */
            titles?: string;
            datatype: /* Datatype */ Datatype | null;
            propertyUrl?: /* PropertyUrl */ PropertyUrl | null;
            valueUrl?: /* ValueUrl */ ValueUrl | null;
            /**
             * Default
             */
            default?: /* Default */ string | number | number | boolean | /* PlaceStandard */ PlaceStandard | null;
            /**
             * Virtual
             */
            virtual?: boolean;
        }
        /**
         * DashboardFilter
         */
        export interface DashboardFilter {
            /**
             * Columns
             */
            columns?: string[];
            /**
             * Areas
             */
            areas?: string[];
            /**
             * Times
             */
            times?: string[];
            /**
             * DashboardType
             */
            dashboard_type?: "measure_over_time" | "area_over_time" | "measure_over_area";
        }
        /**
         * DashboardResult
         */
        export interface DashboardResult {
            /**
             * Possible Columns
             */
            possible_columns?: /* PotentialColumn */ PotentialColumn[];
            /**
             * Possible Areas
             */
            possible_areas?: /* PotentialFilter */ PotentialFilter[];
            /**
             * Possible Times
             */
            possible_times?: /* PotentialFilter */ PotentialFilter[];
            /**
             * Dashboard Types
             */
            dashboard_types?: /* DashboardType */ DashboardType[];
            data?: /* ChartData */ ChartData | null;
        }
        /**
         * DashboardType
         */
        export type DashboardType = "measure_over_time" | "area_over_time" | "measure_over_area";
        /**
         * Dataset
         */
        export interface Dataset {
            /**
             * Publisher
             */
            publisher: {
                /**
                 * ID
                 */
                id?: /* ID */ number | null;
                /**
                 * Name
                 */
                name: string;
                /**
                 * Description
                 */
                description?: /* Description */ string | null;
                /**
                 * Identifier
                 */
                identifier?: /* Identifier */ string | null;
                /**
                 * Data
                 */
                data?: /* Data */ {
                    [key: string]: any;
                } | null;
                /**
                 * Slug
                 */
                slug: string;
            };
            /**
             * Columns
             */
            columns?: /* Column */ Column[];
            default_place?: /* Place */ Place | null;
            /**
             * ID
             */
            id?: /* ID */ number | null;
            /**
             * Name
             */
            name: string;
            /**
             * Description
             */
            description?: /* Description */ string | null;
            /**
             * File
             */
            file?: /* File */ string | null;
            /**
             * Url
             */
            url?: /* Url */ string | null;
            /**
             * Sample Data
             */
            sample_data?: /* Sample Data */ {
                [key: string]: any;
            } | null;
            /**
             * Slug
             */
            slug: string;
            /**
             * Default Date
             */
            default_date?: /* Default Date */ string /* date-time */ | null;
            /**
             * Default Period
             */
            default_period?: /* Default Period */ string | null;
        }
        /**
         * DatasetContext
         */
        export type DatasetContext = "http://www.w3.org/ns/csvw";
        /**
         * DatasetFilter
         */
        export interface DatasetFilter {
            /**
             * Publisher
             */
            publisher?: string;
            /**
             * Search
             */
            search?: string;
            /**
             * Url
             */
            url?: string;
        }
        /**
         * DatasetResult
         */
        export interface DatasetResult {
            /**
             * Success
             */
            success: boolean;
            /**
             * DatasetSimple
             */
            dataset?: {
                /**
                 * PublisherSimple
                 */
                publisher: {
                    /**
                     * Slug
                     */
                    slug: string;
                    /**
                     * Name
                     */
                    name: string;
                    /**
                     * Description
                     */
                    description?: /* Description */ string | null;
                    /**
                     * Identifier
                     */
                    identifier?: /* Identifier */ string | null;
                };
                /**
                 * Name
                 */
                name: string;
                /**
                 * Description
                 */
                description?: /* Description */ string | null;
                /**
                 * File
                 */
                file?: /* File */ string | null;
                /**
                 * Url
                 */
                url?: /* Url */ string | null;
                /**
                 * Slug
                 */
                slug: string;
            };
            /**
             * Errors
             */
            errors?: string[];
        }
        /**
         * DatasetSimple
         */
        export interface DatasetSimple {
            /**
             * PublisherSimple
             */
            publisher: {
                /**
                 * Slug
                 */
                slug: string;
                /**
                 * Name
                 */
                name: string;
                /**
                 * Description
                 */
                description?: /* Description */ string | null;
                /**
                 * Identifier
                 */
                identifier?: /* Identifier */ string | null;
            };
            /**
             * Name
             */
            name: string;
            /**
             * Description
             */
            description?: /* Description */ string | null;
            /**
             * File
             */
            file?: /* File */ string | null;
            /**
             * Url
             */
            url?: /* Url */ string | null;
            /**
             * Slug
             */
            slug: string;
        }
        /**
         * DatasetStandard
         */
        export interface DatasetStandard {
            /**
             * DatasetContext
             */
            "@context"?: "http://www.w3.org/ns/csvw";
            /**
             * Url
             */
            url: string;
            /**
             * Schema:Name
             */
            "schema:name": string;
            /**
             * Schema:Description
             */
            "schema:description": string;
            /**
             * Schema:Creator
             */
            "schema:creator": string;
            tableSchema: /* TableSchemaStandard */ TableSchemaStandard;
        }
        /**
         * Datatype
         */
        export type Datatype = "number" | "string" | "dateTime" | "date" | "duration";
        /**
         * Input
         */
        export interface Input {
            /**
             * Limit
             */
            limit?: number;
            /**
             * Offset
             */
            offset?: number;
        }
        /**
         * ObservationContext
         */
        export type ObservationContext = "https://schema.org/";
        /**
         * ObservationFilter
         */
        export interface ObservationFilter {
            /**
             * Dataset
             */
            dataset?: number[];
            /**
             * Name Search
             */
            name_search?: string;
            /**
             * Observationdate Gte
             */
            observationDate_gte?: string;
            /**
             * Observationdate Lte
             */
            observationDate_lte?: string;
            /**
             * Observationperiod
             */
            observationPeriod?: string;
            /**
             * Observationabout
             */
            observationAbout?: string;
        }
        /**
         * ObservationStandard
         */
        export interface ObservationStandard {
            /**
             * ObservationContext
             */
            "@context"?: "https://schema.org/";
            /**
             * SchemaType
             */
            "@type"?: "Place" | "Observation";
            /**
             * Name
             */
            name: string;
            /**
             * Value
             */
            value?: /* Value */ number | number | null;
            observationAbout?: /* PlaceStandard */ PlaceStandard | null;
            /**
             * Observationdate
             */
            observationDate?: string;
            /**
             * Observationperiod
             */
            observationPeriod?: string;
        }
        /**
         * PagedArea
         */
        export interface PagedArea {
            /**
             * Items
             */
            items: /* Area */ Area[];
            /**
             * Count
             */
            count: number;
        }
        /**
         * PagedDatasetStandard
         */
        export interface PagedDatasetStandard {
            /**
             * Items
             */
            items: /* DatasetStandard */ DatasetStandard[];
            /**
             * Count
             */
            count: number;
        }
        /**
         * PagedObservationStandard
         */
        export interface PagedObservationStandard {
            /**
             * Items
             */
            items: /* ObservationStandard */ ObservationStandard[];
            /**
             * Count
             */
            count: number;
        }
        /**
         * PagedPublisherWithDataset
         */
        export interface PagedPublisherWithDataset {
            /**
             * Items
             */
            items: /* PublisherWithDataset */ PublisherWithDataset[];
            /**
             * Count
             */
            count: number;
        }
        /**
         * Place
         */
        export interface Place {
            /**
             * ID
             */
            id?: /* ID */ number | null;
            /**
             * Schema Type
             */
            schema_type: string;
            /**
             * Identifier
             */
            identifier: string;
            /**
             * Name
             */
            name: string;
            /**
             * Area Type
             */
            area_type: string;
            /**
             * Parent
             */
            parent?: /* Parent */ number | null;
        }
        /**
         * PlaceStandard
         */
        export interface PlaceStandard {
            /**
             * SchemaType
             */
            "@type"?: "Place" | "Observation";
            /**
             * Name
             */
            name: string;
            /**
             * Identifier
             */
            identifier?: string;
            /**
             * Additionaltype
             */
            additionalType?: string;
        }
        /**
         * PotentialColumn
         */
        export interface PotentialColumn {
            /**
             * Id
             */
            id: number;
            /**
             * Name
             */
            name: string;
            /**
             * Dataset Id
             */
            dataset_id: number;
            /**
             * Dataset Name
             */
            dataset_name: string;
        }
        /**
         * PotentialFilter
         */
        export interface PotentialFilter {
            /**
             * Id
             */
            id: string;
            /**
             * Name
             */
            name: string;
        }
        /**
         * PropertyUrl
         */
        export type PropertyUrl = "rdf:type" | "schema:observationDate" | "schema:observationPeriod" | "schema:observationAbout";
        /**
         * Publisher
         */
        export interface Publisher {
            /**
             * ID
             */
            id?: /* ID */ number | null;
            /**
             * Name
             */
            name: string;
            /**
             * Description
             */
            description?: /* Description */ string | null;
            /**
             * Identifier
             */
            identifier?: /* Identifier */ string | null;
            /**
             * Data
             */
            data?: /* Data */ {
                [key: string]: any;
            } | null;
            /**
             * Slug
             */
            slug: string;
        }
        /**
         * PublisherFilter
         */
        export interface PublisherFilter {
            /**
             * Name Search
             */
            name_search?: string;
        }
        /**
         * PublisherSimple
         */
        export interface PublisherSimple {
            /**
             * Slug
             */
            slug: string;
            /**
             * Name
             */
            name: string;
            /**
             * Description
             */
            description?: /* Description */ string | null;
            /**
             * Identifier
             */
            identifier?: /* Identifier */ string | null;
        }
        /**
         * PublisherWithDataset
         */
        export interface PublisherWithDataset {
            /**
             * Datasets
             */
            datasets: /* Dataset */ Dataset[];
            /**
             * ID
             */
            id?: /* ID */ number | null;
            /**
             * Name
             */
            name: string;
            /**
             * Description
             */
            description?: /* Description */ string | null;
            /**
             * Identifier
             */
            identifier?: /* Identifier */ string | null;
            /**
             * Data
             */
            data?: /* Data */ {
                [key: string]: any;
            } | null;
            /**
             * Slug
             */
            slug: string;
        }
        /**
         * SchemaType
         */
        export type SchemaType = "Place" | "Observation";
        /**
         * TableSchemaStandard
         */
        export interface TableSchemaStandard {
            /**
             * Columns
             */
            columns: /* ColumnStandard */ ColumnStandard[];
        }
        /**
         * ValueUrl
         */
        export type ValueUrl = "schema:Observation";
    }
}
declare namespace Paths {
    namespace LocalneedsApiAreaAreaFilterList {
        namespace Parameters {
            /**
             * Limit
             */
            export type Limit = number;
            /**
             * Name
             */
            export type Name = string;
            /**
             * Offset
             */
            export type Offset = number;
            /**
             * Type
             */
            export type Type = string[];
        }
        export interface QueryParameters {
            type?: /* Type */ Parameters.Type;
            name?: /* Name */ Parameters.Name;
            limit?: /* Limit */ Parameters.Limit;
            offset?: /* Offset */ Parameters.Offset;
        }
        namespace Responses {
            export type $200 = /* PagedArea */ Components.Schemas.PagedArea;
        }
    }
    namespace LocalneedsApiAreaAreaGet {
        namespace Parameters {
            /**
             * Area Code
             */
            export type AreaCode = string;
            /**
             * Schema Type
             */
            export type SchemaType = string;
        }
        export interface PathParameters {
            schema_type: /* Schema Type */ Parameters.SchemaType;
            area_code: /* Area Code */ Parameters.AreaCode;
        }
        namespace Responses {
            export type $200 = /* Area */ Components.Schemas.Area;
        }
    }
    namespace LocalneedsApiDashboardDashboardPrepare {
        namespace Parameters {
            /**
             * Areas
             */
            export type Areas = string[];
            /**
             * Columns
             */
            export type Columns = string[];
            /**
             * DashboardType
             */
            export type DashboardType = "measure_over_time" | "area_over_time" | "measure_over_area";
            /**
             * Times
             */
            export type Times = string[];
        }
        export interface QueryParameters {
            columns?: /* Columns */ Parameters.Columns;
            areas?: /* Areas */ Parameters.Areas;
            times?: /* Times */ Parameters.Times;
            dashboard_type?: /* DashboardType */ Parameters.DashboardType;
        }
        namespace Responses {
            export type $200 = /* DashboardResult */ Components.Schemas.DashboardResult;
        }
    }
    namespace LocalneedsApiDatasetDatasetCreate {
        export type RequestBody = /* DatasetStandard */ Components.Schemas.DatasetStandard;
        namespace Responses {
            export type $200 = /* DatasetResult */ Components.Schemas.DatasetResult;
        }
    }
    namespace LocalneedsApiDatasetDatasetCsv {
        namespace Parameters {
            /**
             * Dataset Slug
             */
            export type DatasetSlug = string;
        }
        export interface PathParameters {
            dataset_slug: /* Dataset Slug */ Parameters.DatasetSlug;
        }
    }
    namespace LocalneedsApiDatasetDatasetFilterList {
        namespace Parameters {
            /**
             * Limit
             */
            export type Limit = number;
            /**
             * Offset
             */
            export type Offset = number;
            /**
             * Publisher
             */
            export type Publisher = string;
            /**
             * Search
             */
            export type Search = string;
            /**
             * Url
             */
            export type Url = string;
        }
        export interface QueryParameters {
            publisher?: /* Publisher */ Parameters.Publisher;
            search?: /* Search */ Parameters.Search;
            url?: /* Url */ Parameters.Url;
            limit?: /* Limit */ Parameters.Limit;
            offset?: /* Offset */ Parameters.Offset;
        }
        namespace Responses {
            export type $200 = /* PagedDatasetStandard */ Components.Schemas.PagedDatasetStandard;
        }
    }
    namespace LocalneedsApiDatasetDatasetFilterObservations {
        namespace Parameters {
            /**
             * Dataset Slug
             */
            export type DatasetSlug = string;
            /**
             * Limit
             */
            export type Limit = number;
            /**
             * Name Search
             */
            export type NameSearch = string;
            /**
             * Observationabout
             */
            export type ObservationAbout = string;
            /**
             * Observationdate Gte
             */
            export type ObservationDateGte = string;
            /**
             * Observationdate Lte
             */
            export type ObservationDateLte = string;
            /**
             * Observationperiod
             */
            export type ObservationPeriod = string;
            /**
             * Offset
             */
            export type Offset = number;
        }
        export interface PathParameters {
            dataset_slug: /* Dataset Slug */ Parameters.DatasetSlug;
        }
        export interface QueryParameters {
            name_search?: /* Name Search */ Parameters.NameSearch;
            observationDate_gte?: /* Observationdate Gte */ Parameters.ObservationDateGte;
            observationDate_lte?: /* Observationdate Lte */ Parameters.ObservationDateLte;
            observationPeriod?: /* Observationperiod */ Parameters.ObservationPeriod;
            observationAbout?: /* Observationabout */ Parameters.ObservationAbout;
            limit?: /* Limit */ Parameters.Limit;
            offset?: /* Offset */ Parameters.Offset;
        }
        namespace Responses {
            export type $200 = /* PagedObservationStandard */ Components.Schemas.PagedObservationStandard;
        }
    }
    namespace LocalneedsApiDatasetDatasetGet {
        namespace Parameters {
            /**
             * Dataset Slug
             */
            export type DatasetSlug = string;
        }
        export interface PathParameters {
            dataset_slug: /* Dataset Slug */ Parameters.DatasetSlug;
        }
        namespace Responses {
            export type $200 = /* DatasetStandard */ Components.Schemas.DatasetStandard;
        }
    }
    namespace LocalneedsApiDatasetDatasetGetMetadata {
        namespace Parameters {
            /**
             * Dataset Slug
             */
            export type DatasetSlug = string;
        }
        export interface PathParameters {
            dataset_slug: /* Dataset Slug */ Parameters.DatasetSlug;
        }
        namespace Responses {
            export type $200 = /* DatasetStandard */ Components.Schemas.DatasetStandard;
        }
    }
    namespace LocalneedsApiDatasetDatasetPostCsv {
        namespace Parameters {
            /**
             * Dataset Slug
             */
            export type DatasetSlug = string;
        }
        export interface PathParameters {
            dataset_slug: /* Dataset Slug */ Parameters.DatasetSlug;
        }
        /**
         * FileParams
         */
        export interface RequestBody {
            /**
             * File
             */
            file: string; // binary
        }
        namespace Responses {
            export type $200 = /* DatasetResult */ Components.Schemas.DatasetResult;
        }
    }
    namespace LocalneedsApiObservationObservationFilterList {
        namespace Parameters {
            /**
             * Dataset
             */
            export type Dataset = number[];
            /**
             * Limit
             */
            export type Limit = number;
            /**
             * Name Search
             */
            export type NameSearch = string;
            /**
             * Observationabout
             */
            export type ObservationAbout = string;
            /**
             * Observationdate Gte
             */
            export type ObservationDateGte = string;
            /**
             * Observationdate Lte
             */
            export type ObservationDateLte = string;
            /**
             * Observationperiod
             */
            export type ObservationPeriod = string;
            /**
             * Offset
             */
            export type Offset = number;
        }
        export interface QueryParameters {
            dataset?: /* Dataset */ Parameters.Dataset;
            name_search?: /* Name Search */ Parameters.NameSearch;
            observationDate_gte?: /* Observationdate Gte */ Parameters.ObservationDateGte;
            observationDate_lte?: /* Observationdate Lte */ Parameters.ObservationDateLte;
            observationPeriod?: /* Observationperiod */ Parameters.ObservationPeriod;
            observationAbout?: /* Observationabout */ Parameters.ObservationAbout;
            limit?: /* Limit */ Parameters.Limit;
            offset?: /* Offset */ Parameters.Offset;
        }
        namespace Responses {
            export type $200 = /* PagedObservationStandard */ Components.Schemas.PagedObservationStandard;
        }
    }
    namespace LocalneedsApiObservationObservationFilterListCsv {
        namespace Parameters {
            /**
             * Dataset
             */
            export type Dataset = number[];
            /**
             * Name Search
             */
            export type NameSearch = string;
            /**
             * Observationabout
             */
            export type ObservationAbout = string;
            /**
             * Observationdate Gte
             */
            export type ObservationDateGte = string;
            /**
             * Observationdate Lte
             */
            export type ObservationDateLte = string;
            /**
             * Observationperiod
             */
            export type ObservationPeriod = string;
        }
        export interface QueryParameters {
            dataset?: /* Dataset */ Parameters.Dataset;
            name_search?: /* Name Search */ Parameters.NameSearch;
            observationDate_gte?: /* Observationdate Gte */ Parameters.ObservationDateGte;
            observationDate_lte?: /* Observationdate Lte */ Parameters.ObservationDateLte;
            observationPeriod?: /* Observationperiod */ Parameters.ObservationPeriod;
            observationAbout?: /* Observationabout */ Parameters.ObservationAbout;
        }
    }
    namespace LocalneedsApiObservationObservationGet {
        namespace Parameters {
            /**
             * Observation Id
             */
            export type ObservationId = number;
        }
        export interface PathParameters {
            observation_id: /* Observation Id */ Parameters.ObservationId;
        }
        namespace Responses {
            export type $200 = /* ObservationStandard */ Components.Schemas.ObservationStandard;
        }
    }
    namespace LocalneedsApiPublisherPublisherFilterList {
        namespace Parameters {
            /**
             * Limit
             */
            export type Limit = number;
            /**
             * Name Search
             */
            export type NameSearch = string;
            /**
             * Offset
             */
            export type Offset = number;
        }
        export interface QueryParameters {
            name_search?: /* Name Search */ Parameters.NameSearch;
            limit?: /* Limit */ Parameters.Limit;
            offset?: /* Offset */ Parameters.Offset;
        }
        namespace Responses {
            export type $200 = /* PagedPublisherWithDataset */ Components.Schemas.PagedPublisherWithDataset;
        }
    }
    namespace LocalneedsApiPublisherPublisherGet {
        namespace Parameters {
            /**
             * Publisher Slug
             */
            export type PublisherSlug = string;
        }
        export interface PathParameters {
            publisher_slug: /* Publisher Slug */ Parameters.PublisherSlug;
        }
        namespace Responses {
            export type $200 = /* PublisherWithDataset */ Components.Schemas.PublisherWithDataset;
        }
    }
}

export interface OperationMethods {
  /**
   * localneeds_api_dataset_dataset_filter_list - Filter a list of datasets
   */
  'localneeds_api_dataset_dataset_filter_list'(
    parameters?: Parameters<Paths.LocalneedsApiDatasetDatasetFilterList.QueryParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.LocalneedsApiDatasetDatasetFilterList.Responses.$200>
  /**
   * localneeds_api_dataset_dataset_create - Create a dataset
   */
  'localneeds_api_dataset_dataset_create'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: Paths.LocalneedsApiDatasetDatasetCreate.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.LocalneedsApiDatasetDatasetCreate.Responses.$200>
  /**
   * localneeds_api_dataset_dataset_get - Lookup a dataset
   */
  'localneeds_api_dataset_dataset_get'(
    parameters?: Parameters<Paths.LocalneedsApiDatasetDatasetGet.PathParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.LocalneedsApiDatasetDatasetGet.Responses.$200>
  /**
   * localneeds_api_dataset_dataset_post_csv - Upload a CSV to a dataset
   */
  'localneeds_api_dataset_dataset_post_csv'(
    parameters?: Parameters<Paths.LocalneedsApiDatasetDatasetPostCsv.PathParameters> | null,
    data?: Paths.LocalneedsApiDatasetDatasetPostCsv.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.LocalneedsApiDatasetDatasetPostCsv.Responses.$200>
  /**
   * localneeds_api_dataset_dataset_get_metadata - Lookup dataset metadata
   */
  'localneeds_api_dataset_dataset_get_metadata'(
    parameters?: Parameters<Paths.LocalneedsApiDatasetDatasetGetMetadata.PathParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.LocalneedsApiDatasetDatasetGetMetadata.Responses.$200>
  /**
   * localneeds_api_dataset_dataset_csv - Output a dataset as CSV
   */
  'localneeds_api_dataset_dataset_csv'(
    parameters?: Parameters<Paths.LocalneedsApiDatasetDatasetCsv.PathParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<any>
  /**
   * localneeds_api_dataset_dataset_filter_observations - Lookup a dataset
   */
  'localneeds_api_dataset_dataset_filter_observations'(
    parameters?: Parameters<Paths.LocalneedsApiDatasetDatasetFilterObservations.QueryParameters & Paths.LocalneedsApiDatasetDatasetFilterObservations.PathParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.LocalneedsApiDatasetDatasetFilterObservations.Responses.$200>
  /**
   * localneeds_api_publisher_publisher_filter_list - Filter a list of publishers
   */
  'localneeds_api_publisher_publisher_filter_list'(
    parameters?: Parameters<Paths.LocalneedsApiPublisherPublisherFilterList.QueryParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.LocalneedsApiPublisherPublisherFilterList.Responses.$200>
  /**
   * localneeds_api_publisher_publisher_get - Lookup a publisher
   */
  'localneeds_api_publisher_publisher_get'(
    parameters?: Parameters<Paths.LocalneedsApiPublisherPublisherGet.PathParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.LocalneedsApiPublisherPublisherGet.Responses.$200>
  /**
   * localneeds_api_observation_observation_filter_list - Filter a list of Observations
   */
  'localneeds_api_observation_observation_filter_list'(
    parameters?: Parameters<Paths.LocalneedsApiObservationObservationFilterList.QueryParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.LocalneedsApiObservationObservationFilterList.Responses.$200>
  /**
   * localneeds_api_observation_observation_filter_list_csv - Filter a list of Observations
   */
  'localneeds_api_observation_observation_filter_list_csv'(
    parameters?: Parameters<Paths.LocalneedsApiObservationObservationFilterListCsv.QueryParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<any>
  /**
   * localneeds_api_observation_observation_get - Lookup an Observation
   */
  'localneeds_api_observation_observation_get'(
    parameters?: Parameters<Paths.LocalneedsApiObservationObservationGet.PathParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.LocalneedsApiObservationObservationGet.Responses.$200>
  /**
   * localneeds_api_dashboard_dashboard_prepare - Prepare a dashboard
   */
  'localneeds_api_dashboard_dashboard_prepare'(
    parameters?: Parameters<Paths.LocalneedsApiDashboardDashboardPrepare.QueryParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.LocalneedsApiDashboardDashboardPrepare.Responses.$200>
  /**
   * localneeds_api_area_area_filter_list - Filter a list of areas
   */
  'localneeds_api_area_area_filter_list'(
    parameters?: Parameters<Paths.LocalneedsApiAreaAreaFilterList.QueryParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.LocalneedsApiAreaAreaFilterList.Responses.$200>
  /**
   * localneeds_api_area_area_get - Lookup a single area
   */
  'localneeds_api_area_area_get'(
    parameters?: Parameters<Paths.LocalneedsApiAreaAreaGet.PathParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.LocalneedsApiAreaAreaGet.Responses.$200>
}

export interface PathsDictionary {
  ['/api/v1/dataset/']: {
    /**
     * localneeds_api_dataset_dataset_filter_list - Filter a list of datasets
     */
    'get'(
      parameters?: Parameters<Paths.LocalneedsApiDatasetDatasetFilterList.QueryParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.LocalneedsApiDatasetDatasetFilterList.Responses.$200>
    /**
     * localneeds_api_dataset_dataset_create - Create a dataset
     */
    'post'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: Paths.LocalneedsApiDatasetDatasetCreate.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.LocalneedsApiDatasetDatasetCreate.Responses.$200>
  }
  ['/api/v1/dataset/{dataset_slug}']: {
    /**
     * localneeds_api_dataset_dataset_get - Lookup a dataset
     */
    'get'(
      parameters?: Parameters<Paths.LocalneedsApiDatasetDatasetGet.PathParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.LocalneedsApiDatasetDatasetGet.Responses.$200>
    /**
     * localneeds_api_dataset_dataset_post_csv - Upload a CSV to a dataset
     */
    'post'(
      parameters?: Parameters<Paths.LocalneedsApiDatasetDatasetPostCsv.PathParameters> | null,
      data?: Paths.LocalneedsApiDatasetDatasetPostCsv.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.LocalneedsApiDatasetDatasetPostCsv.Responses.$200>
  }
  ['/api/v1/dataset/{dataset_slug}.csv-metadata.json']: {
    /**
     * localneeds_api_dataset_dataset_get_metadata - Lookup dataset metadata
     */
    'get'(
      parameters?: Parameters<Paths.LocalneedsApiDatasetDatasetGetMetadata.PathParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.LocalneedsApiDatasetDatasetGetMetadata.Responses.$200>
  }
  ['/api/v1/dataset/{dataset_slug}.csv']: {
    /**
     * localneeds_api_dataset_dataset_csv - Output a dataset as CSV
     */
    'get'(
      parameters?: Parameters<Paths.LocalneedsApiDatasetDatasetCsv.PathParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<any>
  }
  ['/api/v1/dataset/{dataset_slug}/observations']: {
    /**
     * localneeds_api_dataset_dataset_filter_observations - Lookup a dataset
     */
    'get'(
      parameters?: Parameters<Paths.LocalneedsApiDatasetDatasetFilterObservations.QueryParameters & Paths.LocalneedsApiDatasetDatasetFilterObservations.PathParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.LocalneedsApiDatasetDatasetFilterObservations.Responses.$200>
  }
  ['/api/v1/publisher/']: {
    /**
     * localneeds_api_publisher_publisher_filter_list - Filter a list of publishers
     */
    'get'(
      parameters?: Parameters<Paths.LocalneedsApiPublisherPublisherFilterList.QueryParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.LocalneedsApiPublisherPublisherFilterList.Responses.$200>
  }
  ['/api/v1/publisher/{publisher_slug}']: {
    /**
     * localneeds_api_publisher_publisher_get - Lookup a publisher
     */
    'get'(
      parameters?: Parameters<Paths.LocalneedsApiPublisherPublisherGet.PathParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.LocalneedsApiPublisherPublisherGet.Responses.$200>
  }
  ['/api/v1/observation/']: {
    /**
     * localneeds_api_observation_observation_filter_list - Filter a list of Observations
     */
    'get'(
      parameters?: Parameters<Paths.LocalneedsApiObservationObservationFilterList.QueryParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.LocalneedsApiObservationObservationFilterList.Responses.$200>
  }
  ['/api/v1/observation/list.csv']: {
    /**
     * localneeds_api_observation_observation_filter_list_csv - Filter a list of Observations
     */
    'get'(
      parameters?: Parameters<Paths.LocalneedsApiObservationObservationFilterListCsv.QueryParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<any>
  }
  ['/api/v1/observation/{observation_id}']: {
    /**
     * localneeds_api_observation_observation_get - Lookup an Observation
     */
    'get'(
      parameters?: Parameters<Paths.LocalneedsApiObservationObservationGet.PathParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.LocalneedsApiObservationObservationGet.Responses.$200>
  }
  ['/api/v1/dashboard/prepare']: {
    /**
     * localneeds_api_dashboard_dashboard_prepare - Prepare a dashboard
     */
    'get'(
      parameters?: Parameters<Paths.LocalneedsApiDashboardDashboardPrepare.QueryParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.LocalneedsApiDashboardDashboardPrepare.Responses.$200>
  }
  ['/api/v1/area/']: {
    /**
     * localneeds_api_area_area_filter_list - Filter a list of areas
     */
    'get'(
      parameters?: Parameters<Paths.LocalneedsApiAreaAreaFilterList.QueryParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.LocalneedsApiAreaAreaFilterList.Responses.$200>
  }
  ['/api/v1/area/{schema_type}/{area_code}']: {
    /**
     * localneeds_api_area_area_get - Lookup a single area
     */
    'get'(
      parameters?: Parameters<Paths.LocalneedsApiAreaAreaGet.PathParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.LocalneedsApiAreaAreaGet.Responses.$200>
  }
}

export type Client = OpenAPIClient<OperationMethods, PathsDictionary>
