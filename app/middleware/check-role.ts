import { useUserStore } from '~/stores/userStore';

export default defineNuxtRouteMiddleware(async () => {
    const userStore = useUserStore();

    if (!userStore.user) {
        await userStore.fetchProfile();
    }

    const user = userStore.user;

    if (!user || user.role !== 'TEACHER') {
        return navigateTo('/lessons');
    }
});
