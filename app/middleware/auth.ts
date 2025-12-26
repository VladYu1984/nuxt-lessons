import { useUserStore } from '~/stores/userStore';

export default defineNuxtRouteMiddleware(async () => {
    const userStore = useUserStore();

    if (!userStore.user) {
        try {
            await userStore.fetchProfile();
        } catch {
            return navigateTo('/auth/login');
        }
    }
});
