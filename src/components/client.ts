import definition from "./localneedsapi/openapi-runtime.json";
import OpenAPIClientAxios from "openapi-client-axios";
import type { Client as LocalNeedsAPIClient, Components } from '../types/localneedsapi'

export const client = new OpenAPIClientAxios({
    definition: definition,
    withServer: { url: "https://local-needs.kanedata.co.uk/" },
    axiosConfigDefaults: {
        paramsSerializer: {
            indexes: null
        },
    },
});
const api = client.getClient<LocalNeedsAPIClient>();

export default api;
export type { LocalNeedsAPIClient, Components };