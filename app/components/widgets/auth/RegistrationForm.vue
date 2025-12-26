<script setup lang="ts">
import { reactive, ref, computed } from 'vue';
import type { UserRole } from '~/shared/types/user';
import { useAuthStore } from '~/stores/authStore';
import Input from '~/components/shared/ui/Input.vue';
import Button from '~/components/shared/ui/Button.vue';

const authStore = useAuthStore();

const form = reactive({
    name: '',
    email: '',
    password: '',
});

const role = ref<UserRole>('USER');

const isTeacher = computed({
    get: () => role.value === 'TEACHER',
    set: (val: boolean) => (role.value = val ? 'TEACHER' : 'USER'),
});

function toggleRole() {
    role.value = role.value === 'USER' ? 'TEACHER' : 'USER';
}

async function onSubmit() {
    try {
        await authStore.register({
            name: form.name,
            email: form.email,
            password: form.password,
            role: role.value,
        });
        navigateTo('/profile');
        console.log('User registered:', authStore.user);
    } catch (err) {
        console.error('Registration error', err);
    }
}
</script>

<template>
    <form class="register-form" @submit.prevent="onSubmit">
        <Input
            v-model="form.name"
            label="Name"
            placeholder="Your name"
            required
        />
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

        <label class="role-toggle">
            <div
                class="role-toggle__track"
                :class="{ teacher: isTeacher }"
                @click="toggleRole"
            >
                <div
                    class="role-toggle__thumb"
                    :class="{ teacher: isTeacher }"
                />
                <div class="role-toggle__labels">
                    <span>USER</span>
                    <span>TEACHER</span>
                </div>
            </div>
        </label>

        <p v-if="authStore.error" class="register-form__error">
            {{ authStore.error }}
        </p>

        <Button
            type="submit"
            :loading="authStore.isLoading"
            class="register-form__button"
        >
            Register
        </Button>
    </form>
</template>

<style lang="scss" scoped>
@use '~/assets/scss/variables' as *;
.register-form {
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

.role-toggle {
    display: flex;
    justify-content: center;
    margin-top: 1rem;
    user-select: none;

    &__track {
        position: relative;
        width: 200px;
        height: 40px;
        border-radius: 9999px;
        background-color: $color-muted;
        cursor: pointer;
        transition: background-color 0.3s;

        &.teacher {
            background-color: $color-primary;
        }
    }

    &__track.teacher {
        background-color: $color-primary;
    }

    &__thumb {
        position: absolute;
        top: 2px;
        left: 2px;
        width: 80px;
        height: 34px;
        background-color: $color-white;
        border-radius: 9999px;
        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.2);
        transition: transform 0.3s;
        will-change: transform;
        border: 0.5px solid black;
    }

    &__thumb.teacher {
        transform: translateX(115px);
    }

    &__labels {
        position: absolute;
        inset: 0;
        display: flex;
        justify-content: space-between;
        padding: 10px 14px 0 22px;
        font-size: 0.75rem;
        font-weight: 500;
        color: $color-text;
        pointer-events: none;
    }
}
</style>
