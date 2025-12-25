<script setup lang="ts"></script>

<template>
    <footer class="main-footer">
        <p class="main-footer__text">&copy; 2025 Lessons App</p>
    </footer>
</template>

<style lang="scss" scoped>
@use '~/assets/scss/variables' as *;
.main-footer {
    background-color: $color-primary;
    color: $color-white;
    padding: 1rem 2rem;
    display: flex;
    align-items: center;
    justify-content: center;

    &__text {
        font-size: 0.875rem;
        margin: 0;
    }
}
</style>