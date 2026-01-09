<script setup lang="ts">
import Button from '~/components/shared/ui/Button.vue';
import Input from '~/components/shared/ui/Input.vue';
import { useLessonStore } from '~/stores/lessonStore';

const lessonStore = useLessonStore();

await lessonStore.getStudentsLessons();

const lessonId = ref('');

async function handleJoinToLesson() {
    await lessonStore.joinToLesson(lessonId.value);
    lessonId.value = '';
}
</script>

<template>
    <div>
        <ul :class="$style.list">
            <li
                v-for="lesson in lessonStore.studentLessons"
                :key="lesson.id"
                :class="$style.lessonContainer"
            >
                <h3>{{ lesson.title }}</h3>
                <p>{{ lesson.description }}</p>
                <div>
                    <span>Date: {{ lesson.date }}</span>
                    <span
                        >At:
                        <h4>{{ lesson.time }}</h4></span
                    >
                </div>
            </li>
        </ul>

        <div>
            <p>Sign to lesson</p>
            <Input v-model="lessonId" placeholder="Lesson ID" />
            <Button @click="handleJoinToLesson">Sign</Button>
        </div>
    </div>
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
    padding: 12px;
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
