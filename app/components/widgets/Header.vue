<script setup lang="ts">
import Button from '../shared/ui/Button.vue';

const auth = useAuthStore();
const userStore = useUserStore();
const isLoggedIn = computed(() => !!userStore.user);

const navItems = ref([
    { title: 'Профиль', path: '/profile' },
    { title: 'Уроки', path: '/lessons' },
]);

async function onLogout() {
    await auth.logout();
    navigateTo('/auth/login');
}
</script>

<template>
    <header class="main-header">
        <nav class="main-header__nav">
            <div class="main-header__brand">
                <NuxtImg
                    src="/images/logo.avif"
                    width="40"
                    height="40"
                    alt="Lessons App logo"
                    @click="navigateTo('/')"
                />
                <h4 class="main-header__title">Lessons App</h4>
            </div>
            <ul class="main-header__links">
                <li
                    v-for="item in navItems"
                    :key="item.path"
                    class="main-header__link-item"
                >
                    <NuxtLink
                        :to="item.path"
                        class="main-header__link"
                        active-class="is-active"
                    >
                        {{ item.title }}
                    </NuxtLink>
                </li>
            </ul>
            <div class="main-header__actions">
                <Button
                    v-if="isLoggedIn"
                    class="main-header__logout-button"
                    :disabled="auth.isLoading"
                    @click="onLogout"
                >
                    Logout
                </Button>
            </div>
        </nav>
    </header>
</template>

<style lang="scss" scoped>
@use '~/assets/scss/variables' as *;

.main-header {
    background-color: $color-primary;
    color: $color-white;
    padding: 1rem 2rem;
    display: flex;
    align-items: center;
    width: 100%;

    &__nav {
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: space-between;
    }

    &__brand {
        display: flex;
        align-items: center;
        gap: 0.75rem;

        & > img {
            cursor: pointer;
        }
    }

    &__title {
        color: $color-white;
    }

    &__links {
        display: flex;
        align-items: center;
        gap: 1.25rem;
        list-style: none;
        padding: 0;
        margin: 0;
    }

    &__link {
        color: $color-white;
        text-decoration: none;
        font-weight: 500;
        transition: opacity 0.2s ease;

        &:hover {
            opacity: 0.8;
        }

        &.is-active {
            text-decoration: underline;
        }
    }
}

</style>
