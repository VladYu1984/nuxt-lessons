<script setup lang="ts">
import { useLessonStore } from '~/stores/lessonStore';

definePageMeta({ middleware: 'check-role' });

const lessonStore = useLessonStore();

onMounted(() => {
    if (!lessonStore.lessons.length) {
        lessonStore.getLessons();
    }
});
</script>

<template>
    <ul :class="$style.list">
        <li
            v-for="lesson in lessonStore.lessons"
            :key="lesson.id"
            :class="$style.lessonContainer"
        >
            <NuxtLink :to="`/lessons/${lesson.id}`" :class="$style.lessonLink">
                <h3>{{ lesson.title }}</h3>
                <p>{{ lesson.description }}</p>
                <div>
                    <span>Date: {{ lesson.date }}</span>
                    <span
                        >At:
                        <h4>{{ lesson.time }}</h4></span
                    >
                </div>
            </NuxtLink>
        </li>
    </ul>
</template>

<style lang="scss" module>
@use '~/assets/scss/_variables' as *;

.list {
    list-style: none;
    padding: 0;
    margin: 0;
}

.lessonContainer {
    margin-bottom: 16px;
    border: 1px solid #ddd;
    border-radius: 8px;
    overflow: hidden;
}

.lessonLink {
    display: block;
    padding: 12px;
    text-decoration: none;
    color: inherit;

    &:hover {
        background-color: #f5f5f5;
    }
}
</style>
