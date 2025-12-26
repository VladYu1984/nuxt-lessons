<script setup lang="ts">
import { onMounted } from 'vue';
import { useUserStore } from '~/stores/userStore';

definePageMeta({
    layout: 'main',
    middleware: 'auth',
});

const userStore = useUserStore();

onMounted(async () => {
    if (!userStore.user) {
        navigateTo('/auth/login');
    }
});
</script>

<template>
  <div class="profile-page">
    <h3 class="profile-page__title">Profile</h3>

    <div v-if="userStore.isLoading">Loading...</div>

    <div v-else-if="userStore.user" class="profile-card">
        <p><strong>Name:</strong> {{ userStore.user.name }}</p>
        <p><strong>Email:</strong> {{ userStore.user.email }}</p>
        <p><strong>Role:</strong> {{ userStore.user.role }}</p>
    </div>

    <p v-else class="profile-page__error">
        {{ userStore.error }}
    </p>
  </div>
</template>

<style scoped lang="scss">
@use '~/assets/scss/variables' as *;
.profile-page {
    max-width: 600px;
    margin: 2rem auto;

    &__title {
        margin-bottom: 1.5rem;
    }
}

.profile-card {
    background: $color-white;
    padding: 1.5rem;
    border-radius: 12px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);

    p {
        margin-bottom: 0.75rem;
    }
}

.profile-page__error {
    color: $color-error;
}
</style>
