import { defineStore } from 'pinia';
import { ref, computed } from 'vue';
import { useApi } from '~/composables/useApi';

export type UserRole = 'USER' | 'TEACHER';

export interface User {
    id: number;
    name: string;
    email: string;
    role: UserRole;
}

export const useAuthStore = defineStore('auth', () => {
    const api = useApi();

    const user = ref<User | null>(null);
    const isLoading = ref(false);
    const error = ref<string | null>(null);

    const isAuthenticated = computed(() => !!user.value);

    const role = computed<UserRole | null>(() => user.value?.role ?? null);

    async function login(credentials: { email: string; password: string }) {
        isLoading.value = true;
        error.value = null;
        try {
            const res = await api.request<{ user: User }>('/auth/login', {
                method: 'POST',
                body: credentials,
            });
            user.value = res.user ?? null;
            return res;
        } catch (err: any) {
            error.value = err?.message ?? 'Login failed';
            throw err;
        } finally {
            isLoading.value = false;
        }
    }

    async function register(payload: {
        email: string;
        password: string;
        name?: string;
        role?: UserRole;
    }) {
        isLoading.value = true;
        error.value = null;
        try {
            const res = await api.request<{ user: User }>('/auth/register', {
                method: 'POST',
                body: payload,
            });
            user.value = res.user ?? null;
            return res;
        } catch (err: any) {
            error.value = err?.message ?? 'Registration failed';
            throw err;
        } finally {
            isLoading.value = false;
        }
    }

    function logout() {
        user.value = null;
    }

    function setRole(newRole: UserRole) {
        if (user.value) {
            user.value.role = newRole;
            console.log('User ROLE is', user.value.role);
        }
    }

    return {
        user,
        isLoading,
        error,
        isAuthenticated,
        role,
        login,
        register,
        logout,
        setRole,
    };
});
