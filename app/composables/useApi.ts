import type { ApiOptions } from '~/shared/types';

export function useApi() {
    const config = useRuntimeConfig();

    const request = async <T>(
        endpoint: string,
        options: ApiOptions = {},
    ): Promise<T> => {
        try {
            return await $fetch<T>(endpoint, {
                baseURL: config.public.apiBaseUrl as string,
                method: options.method ?? 'GET',
                body: options.body,
                params: options.params,
                headers: {
                    'Content-Type': 'application/json',
                    ...options.headers,
                },
                credentials: 'include',
            });
        } catch (error) {
            console.error('[API ERROR]', error);
            throw error;
        }
    };

    return {
        request,
    };
}
