import { defineStore } from 'pinia';
import { useApi } from '~/composables/useApi';
import type { Lesson } from '~/shared/types/lesson';

export const useLessonStore = defineStore('lesson', () => {
    const api = useApi();

    const lessons = ref<Lesson[]>([]);
    const studentLessons = ref<Lesson[]>([]);
    const isLoading = ref(false);
    const error = ref<string | null>(null);

    const lessonCount = computed(() => lessons.value.length);

    async function getLessons() {
        isLoading.value = true;
        error.value = null;

        try {
            const res = await api.request<Lesson[]>('/lessons/my-lessons', {
                method: 'GET',
            });

            lessons.value = res;
            return res;
        } catch (err: any) {
            error.value = err?.data?.message ?? 'Failed to load lessons';
            throw err;
        } finally {
            isLoading.value = false;
        }
    }

    async function getStudentsLessons() {
        isLoading.value = true;
        error.value = null;

        try {
            const res = await api.request<Lesson[]>(
                '/lessons/students-lessons',
                {
                    method: 'GET',
                },
            );

            studentLessons.value = res;
            return res;
        } catch (err: any) {
            error.value = err?.data?.message ?? 'Failed to load lessons';
            throw err;
        } finally {
            isLoading.value = false;
        }
    }

    async function joinToLesson(lessonId: string) {
        isLoading.value = true;
        error.value = null;

        try {
            await api.request(`/lessons/${lessonId}/join`, {
                method: 'POST',
            });

            await getStudentsLessons();
        } catch (err: any) {
            error.value = err?.data?.message ?? 'Failed to sign to lesson';
            throw err;
        } finally {
            isLoading.value = false;
        }
    }

    function getLessonById(id: string) {
        return lessons.value.find((lesson) => lesson.id === id);
    }

    return {
        lessons,
        isLoading,
        error,
        lessonCount,
        getLessons,
        getLessonById,
        getStudentsLessons,
        studentLessons,
        joinToLesson,
    };
});
