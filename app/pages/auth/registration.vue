<script setup lang="ts">
import RegistrationForm from '~/components/widgets/auth/RegistrationForm.vue';
definePageMeta({ layout: 'auth' });
</script>

<template>
    <div>
        <h2>Registration</h2>
        <RegistrationForm />
        <p class="auth-page__hint">
            Есть аккаунт?
            <NuxtLink to="/auth/login" class="auth-page__link">
                Войти
            </NuxtLink>
        </p>
    </div>
</template>

<style lang="scss" scoped>
.auth-page {
    max-width: 400px;
    margin: 4rem auto;
    padding: 2rem;
    border: 1px solid #ddd;
    border-radius: 8px;
    background-color: #fff;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
}
</style>
