<script setup lang="ts">
const lessonStore = useLessonStore();

onMounted(async () => {
    await lessonStore.getLessons();
});
</script>

<template>
    <div>
        <h1>Lessons Page</h1>
        <pre>{{ lessonStore.lessons }}</pre>
        <div :class="$style.lessonsSettings">
            <NuxtLink href="/lessons/create">Create Lesson</NuxtLink>
            <NuxtLink href="/lessons/myLessons">All my lessons Lesson</NuxtLink>
        </div>
    </div>
</template>

<style lang="scss" module>
@use '~/assets/scss/_variables' as *;
.lessonsSettings {
    display: flex;
    justify-content: space-between;
    margin-top: 20px;
    border: 1px solid $border-color;
}
</style>
