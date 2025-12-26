import { useUserStore } from '~/stores/userStore';

export default defineNuxtPlugin(async () => {
    const userStore = useUserStore();

    if (userStore.isLoaded || userStore.isLoading) {
        return;
    }

    try {
        await userStore.fetchProfile();
    } catch (err: any) {
        console.log(
            err?.data?.message ?? 'Failed to fetch user profile during init',
        );
    }
});
