<script setup lang="ts">
const route = useRoute();
const lessonStore = useLessonStore();

const lesson = computed(() => lessonStore.getLessonById(route.params.id as string));

</script>

<template>
    <div>
        <h1>Lessons Page</h1>
        <NuxtLink :href="`/lessons/${lesson?.id}/edit`">Edit Lesson</NuxtLink>
        {{ lesson }}
    </div>
</template>
