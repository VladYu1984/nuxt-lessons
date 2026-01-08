import { defineStore } from 'pinia';
import { ref, computed } from 'vue';
import { useApi } from '~/composables/useApi';
import type { Profile, User } from '~/shared/types/user';

export const useUserStore = defineStore('user', () => {
    const api = useApi();

    const user = ref<User | null>(null);
    const isLoading = ref(false);
    const error = ref<string | null>(null);

    const isLoaded = computed(() => !!user.value);
    const role = computed(() => user.value?.role ?? null);

    async function fetchProfile() {
        isLoading.value = true;
        error.value = null;

        const headers = import.meta.server
            ? useRequestHeaders(['cookie'])
            : undefined;

        try {
            const res = await api.request<User>('/user/me', {
                method: 'GET',
                headers,
            });

            user.value = res;
            return res;
        } catch (err: any) {
            if (err?.status === 401) {
                user.value = null;
                error.value = null;
                return null;
            }
            user.value = null;
            error.value = err?.data?.message ?? 'Failed to load user';
            throw err;
        } finally {
            isLoading.value = false;
        }
    }

    async function updateProfile(payload: Partial<Profile>) {
        isLoading.value = true;
        error.value = null;

        try {
            const updatedUser = await api.request<User>('/profile', {
                method: 'PATCH',
                body: payload,
            });

            user.value = updatedUser;
            return updatedUser;
        } catch (err: unknown) {
            console.error('Update profile failed', err);
        } finally {
            isLoading.value = false;
        }
    }

    return {
        user,
        role,
        isLoaded,
        isLoading,
        error,
        fetchProfile,
        updateProfile,
    };
});
