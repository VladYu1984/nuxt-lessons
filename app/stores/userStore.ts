import { defineStore } from 'pinia';
import { ref, computed } from 'vue';
import { useApi } from '~/composables/useApi';
import type { UserRole } from '~/stores/authStore';

interface User {
    id: number;
    name: string;
    email: string;
    role: UserRole;
    profile: Profile;
}

interface Profile {
    id: string;
    about: string;
    avatarUrl: string;
}

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

    async function updateProfile(payload: Partial<User>) {
        isLoading.value = true;
        error.value = null;

        try {
            const res = await api.request<User>('/user/me', {
                method: 'PUT',
                body: payload,
            });

            user.value = res;
            return res;
        } finally {
            isLoading.value = false;
        }
    }

    return {
        user,
        useRequestHeader,
        role,
        isLoaded,
        isLoading,
        error,
        fetchProfile,
        updateProfile,
    };
});
