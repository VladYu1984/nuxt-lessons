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
    </div>
</template>
