import type { ApiOptions } from '~/shared/types/api';

export function useApi() {
    const config = useRuntimeConfig();

    const request = async <T>(
        endpoint: string,
        options: ApiOptions = {},
    ): Promise<T> => {
        try {
            const isFormData = options.body instanceof FormData;

            const headers: Record<string, string> = {
                ...(options.headers ?? {}),
                ...(isFormData ? {} : { 'Content-Type': 'application/json' }),
            };
            return await $fetch<T>(endpoint, {
                baseURL: config.public.apiBaseUrl as string,
                method: options.method ?? 'GET',
                body: options.body as any,
                params: options.params,
                headers,
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
