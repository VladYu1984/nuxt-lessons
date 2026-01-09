<script setup lang="ts">

// onMounted(() => {});

// mock data
const lessons = ref([{text: 'Lesson 1'}, {text: 'Lesson 2'}, {text: 'Lesson 3'}]);
</script>

<template>
    <ul :class="$style.list">
        <li v-for="lesson in lessons" :key="lesson.text">
            {{ lesson.text }}
            Lesson {{ lesson }}
        </li>
</ul></template>

<style lang="scss" module>
@use '~/assets/scss/_variables' as *;

.list {
    margin-top: 20px;
    border: 1px solid $border-color;
}
</style>