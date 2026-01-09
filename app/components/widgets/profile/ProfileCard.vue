<script setup lang="ts">
import { ref, computed } from 'vue';
import { useUserStore } from '~/stores/userStore';
import { useApi } from '~/composables/useApi';
import Button from '~/components/shared/ui/Button.vue';

const userStore = useUserStore();
const { request } = useApi();

const fileInput = ref<HTMLInputElement | null>(null);
const uploading = ref(false);

const isEditing = ref(false);
const about = ref('');
const saving = ref(false);

const user = computed(() => userStore.user);

const meta = computed(() => [
    { label: 'Name', value: user.value?.name },
    { label: 'Email', value: user.value?.email },
    { label: 'About me', value: user.value?.profile?.about },
    { label: 'Role', value: user.value?.role },
])

function onAvatarClick() {
    fileInput.value?.click();
}

function startEditing() {
    about.value = userStore.user?.profile?.about || '';
    isEditing.value = true;
}

function cancelEditing() {
    isEditing.value = false;
    about.value = '';
}

async function onFileChange(event: Event) {
    const target = event.target as HTMLInputElement;
    const file = target.files?.[0];
    if (!file) return;

    const formData = new FormData();
    formData.append('avatar', file);

    try {
        uploading.value = true;

        const res = await request<{ avatarUrl: string }>('profile/avatar', {
            method: 'PATCH',
            body: formData as any,
        });

        if (res?.avatarUrl && userStore.user?.profile) {
            userStore.user.profile.avatarUrl = res.avatarUrl;
        }
    } catch (err) {
        console.error('Failed to upload avatar', err);
    } finally {
        uploading.value = false;
    }
}

async function saveProfile() {
    if (!about.value.trim()) return;

    try {
        saving.value = true;

        const updatedUser = await userStore.updateProfile({ about: about.value });

        if (updatedUser?.profile) {
            about.value = updatedUser.profile.about ?? '';
        }

        isEditing.value = false;
    } catch (err) {
        console.error('Failed to update profile', err);
    } finally {
        saving.value = false;
    }
}

onMounted(() => {
    if (!userStore.user) userStore.fetchProfile();
});
</script>

<template>
    <div :class="$style.actions">
        <Button v-if="!isEditing" @click="startEditing">
            Edit Profile
        </Button>

        <template v-else>
            <Button
                :disabled="saving"
                @click="saveProfile"
            >
                Save
            </Button>
            <Button
                variant="secondary"
                @click="cancelEditing"
            >
                Cancel
            </Button>
        </template>
    </div>

    <div v-if="!isEditing && user" :class="$style.card">
        <div :class="$style.head">
            <div :class="$style.avatarWrapper" @click="onAvatarClick">
                <div v-if="!uploading" :class="$style.avatar">
                    <NuxtImg
                        v-if="user.profile?.avatarUrl"
                        :src="user.profile.avatarUrl"
                        width="64"
                        height="64"
                        alt="User avatar"
                    />
                    <div
                        v-else
                        :class="$style.avatarPlaceholder"
                    >
                        {{ user.name.charAt(0).toUpperCase() }}
                    </div>
                </div>
                <div v-else :class="$style.avatarLoading"/>
            </div>

            <input
                ref="fileInput"
                type="file"
                accept="image/*"
                :class="$style.fileInput"
                @change="onFileChange"
            >

            <ul :class="$style.meta">
                <li v-for="bio in meta" :key="bio.label">
                    <h3>{{ bio.label }}:</h3>
                    <p >{{ bio.value }}</p>
                </li>
            </ul>
        </div>
    </div>
    <div v-else >
        <h2 >
            Tell us about yourself
        </h2>

        <textarea
            v-model="about"
            :class="$style.textarea"
            rows="5"
            placeholder="Write something about yourself"
        />
    </div>
</template>

<style module lang="scss">
@use '~/assets/scss/variables' as *;
.actions {
    display: flex;
    gap: 0.75rem;
    margin-bottom: 1rem;
}

.card {
    background-color: #ffffff;
    border-radius: 0.75rem;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
    padding: 1.5rem;
}

.head {
    display: flex;
    gap: 1.5rem;
}

.avatarWrapper {
    position: relative;
    width: 64px;
    height: 64px;
    cursor: pointer;
}

.avatarPlaceholder {
    width: 64px;
    height: 64px;
    border-radius: 50%;
    background-color: #e5e7eb;
    color: #374151;
    font-weight: 600;
    font-size: 1.25rem;
    display: flex;
    align-items: center;
    justify-content: center;
}

.fileInput {
    display: none;
}

.avatarLoading {
  position: absolute;
  inset: 0;
  border-radius: 50%;
  border: 0.5px solid rgba(0, 0, 0, 0.1);

  display: flex;
  align-items: center;
  justify-content: center;

  &::after {
    content: "";
    width: 24px;
    height: 24px;
    border: 3px solid #ccc;
    border-top-color: #007bff;
    border-radius: 50%;
    animation: spin 1s linear infinite;
  }
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

.avatar {
    object-fit: cover;
}

.textarea {
    width: 100%;
    min-height: 120px;
    padding: 0.75rem;
    font-size: 0.875rem;
    border: 1px solid #d1d5db;
    border-radius: 0.5rem;
    resize: vertical;

    &:focus {
        outline: none;
        border-color: $color-primary;
    }
}
</style>

