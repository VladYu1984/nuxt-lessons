<script setup lang="ts">
import Footer from '~/components/widgets/Footer.vue';
import Header from '~/components/widgets/Header.vue';
</script>

<template>
    <div class="main-layout">
        <Header />

        <main class="main-layout__content">
            <div class="container">
                <slot />
            </div>
        </main>

        <Footer />
    </div>
</template>

<style lang="scss" scoped>
@use '~/assets/scss/variables' as *;

.main-layout {
    display: flex;
    flex-direction: column;
    min-height: 100vh;
    background: $color-bg;

    &__content {
        flex: 1;
        padding: $spacing-lg;
        min-height: calc(100vh - 140px);
    }

    .container {
        max-width: 1200px;
        width: 100%;
        margin: 0 auto;
    }

    @media (min-width: 768px) {
        &__content {
            padding: $spacing-xl;
        }
    }
}
</style>
