<script lang="ts">
definePageMeta({
    middleware: 'check-role',
});
</script>

<template>
    <div :class="$style.container">
        <h3>Create New Lesson</h3>
        <p>Choose params</p>
    </div>
</template>

<style module lang="scss">
@use '~/assets/scss/variables' as *;
.container {
    padding: 20px;
    border: 1px solid $border-color;
}
</style>
