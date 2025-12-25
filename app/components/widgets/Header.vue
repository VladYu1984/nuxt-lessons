<script setup lang="ts"></script>

<template>
    <header class="main-header">
        <nav class="main-header__nav">
            <div class="main-header__brand">
				<NuxtImg
					src="/images/logo.avif"
					width="40"
					height="40"
					alt="Lessons App logo"
					class="main-header__logo"
				/>
				<h1 class="main-header__title">Lessons App</h1>
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

	&__logo {
		display: block;
		width: 40px;
		height: 40px;
		object-fit: contain;
	}

	&__title {
		font-size: 1.25rem;
		font-weight: 600;
		color: $color-white;
	}
}
</style>