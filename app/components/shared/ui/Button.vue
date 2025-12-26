<script setup lang="ts">
const props = defineProps<{
    type?: 'button' | 'submit' | 'reset';
    loading?: boolean;
    disabled?: boolean;
}>();
</script>

<template>
    <button
        :type="props.type || 'button'"
        :disabled="props.disabled || props.loading"
        class="btn"
    >
        <span v-if="props.loading" class="spinner" />
        <slot />
    </button>
</template>

<style lang="scss" scoped>
@use '~/assets/scss/variables' as *;
.btn {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    background-color: $color-primary;
    color: #fff;
    font-weight: 600;
    padding: 0.5rem 1rem;
    border-radius: 4px;
    border: none;
    cursor: pointer;
    transition: background-color 0.2s;

    &:hover:not(:disabled) {
        background-color: $color-secondary;
    }

    &:disabled {
        background-color: #ccc;
        cursor: not-allowed;
    }

    .spinner {
        width: 1rem;
        height: 1rem;
        margin-right: 0.5rem;
        border: 2px solid #fff;
        border-top-color: transparent;
        border-radius: 50%;
        animation: spin 1s linear infinite;
    }
}

@keyframes spin {
    to {
        transform: rotate(360deg);
    }
}
</style>
