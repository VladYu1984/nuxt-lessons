<script setup lang="ts">
import { reactive } from 'vue';
import { useAuthStore } from '~/stores/authStore';
import Input from '~/components/shared/ui/Input.vue';
import Button from '~/components/shared/ui/Button.vue';

const authStore = useAuthStore();

const form = reactive({
    email: '',
    password: '',
});

async function onSubmit() {
    try {
        await authStore.login({
            email: form.email,
            password: form.password,
        });
        navigateTo('/profile');
    } catch (err) {
        console.error('Login error', err);
    }
}
</script>

<template>
    <form class="login-form" @submit.prevent="onSubmit">
        <Input
            v-model="form.email"
            label="Email"
            type="email"
            placeholder="you@example.com"
            required
        />
        <Input
            v-model="form.password"
            label="Password"
            type="password"
            placeholder="Password"
            required
        />

        <p v-if="authStore.error" class="login-form__error">
            {{ authStore.error }}
        </p>

        <Button
            type="submit"
            :loading="authStore.isLoading"
            class="login-form__button"
        >
            Login
        </Button>
    </form>
</template>

<style lang="scss" scoped>
@use '~/assets/scss/variables' as *;
.login-form {
    max-width: 400px;
    margin: 2rem auto;
    padding: 2rem;
    background: $color-white;
    border-radius: 12px;
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
    display: flex;
    flex-direction: column;
    gap: 1.5rem;

    &__error {
        color: $color-error;
        font-size: 0.875rem;
        text-align: center;
    }
}
</style>
