<script setup lang="ts">
import { ref } from 'vue';
import ProfileCard from '~/components/widgets/profile/ProfileCard.vue';
definePageMeta({
    name: 'main',
});

const showEditor = ref(false);
</script>

<template>
    <ProfileCard @edit="showEditor = true" />
</template>
