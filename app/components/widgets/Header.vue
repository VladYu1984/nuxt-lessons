<script setup lang="ts">
import Button from '../shared/ui/Button.vue';

const auth = useAuthStore();
const userStore = useUserStore();
const isLoggedIn = computed(() => !!userStore.user);

async function onLogout() {
  await auth.logout();
  navigateTo('/');
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
				/>
				<h4 class="main-header__title">Lessons App</h4>
            </div>
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
    }

	&__title {
		color: $color-white;
	}
}
</style>