export type HttpMethod = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';

export interface ApiOptions {
    method?: HttpMethod;
    body?: Record<string, unknown>;
    params?: Record<string, string | number | boolean>;
    headers?: Record<string, string>;
}
