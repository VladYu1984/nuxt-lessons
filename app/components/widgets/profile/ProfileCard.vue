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
    <div class="profile-card__actions">
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

    <div v-if="!isEditing && user" class="profile-card">
        <div class="profile-card__head">
            <div class="profile-card__avatar-wrapper" @click="onAvatarClick">
                <NuxtImg
                    v-if="user.profile?.avatarUrl"
                    :src="user.profile.avatarUrl"
                    width="64"
                    height="64"
                    alt="User avatar"
                    class="profile-card__avatar"
                />
                <div
                    v-else
                    class="profile-card__avatar profile-card__avatar--placeholder"
                >
                    {{ user.name.charAt(0).toUpperCase() }}
                </div>
                <div v-if="uploading" class="profile-card__avatar-spinner" />
            </div>

            <input
                ref="fileInput"
                type="file"
                accept="image/*"
                class="profile-card__file-input"
                @change="onFileChange"
            >

            <div class="profile-card__meta">
                <div>
                    <h3>Name:</h3>
                    <p class="profile-card__text">{{ user.name }}</p>
                </div>
                <div>
                    <h3>Email:</h3>
                    <p class="profile-card__text">{{ user.email }}</p>
                </div>
                <div>
                    <h3>About me</h3>
                    <p class="profile-card__text">{{ user.profile?.about }}</p>
                </div>
                <div>
                    <h3>Role:</h3>
                    <p class="profile-card__role">{{ user.role }}</p>
                </div>
            </div>
        </div>
    </div>
    <div v-else class="profile-card profile-card--edit">
        <h2 class="profile-card__edit-title">
            Tell us about yourself
        </h2>

        <textarea
            v-model="about"
            class="profile-card__textarea"
            rows="5"
            placeholder="Write something about yourself"
        />
    </div>
</template>

<style lang="scss" scoped>
.profile-card {
    background-color: #ffffff;
    border-radius: 0.75rem;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);

    &__actions {
        display: flex;
        gap: 0.75rem;
        margin-bottom: 1rem;
    }

    &__head {
        display: flex;
        gap: 1.5rem;
        padding: 1.5rem;
    }

    &__avatar-wrapper {
        position: relative;
        width: 64px;
        height: 64px;
        cursor: pointer;
    }

    &__avatar {
        width: 64px;
        height: 64px;
        border-radius: 50%;
        object-fit: cover;

        &--placeholder {
            display: flex;
            align-items: center;
            justify-content: center;
            background-color: #e5e7eb;
            color: #374151;
            font-weight: 600;
            font-size: 1.25rem;
        }
    }

    &__avatar-spinner {
        position: absolute;
        inset: 0;
        background: rgba(255, 255, 255, 0.7);
        border-radius: 50%;
    }

    &__file-input {
        display: none;
    }

    &__meta {
        display: flex;
        flex-direction: column;
        gap: 1.25rem;
        flex: 1;
    }

    h3 {
        font-size: 0.75rem;
        font-weight: 600;
        text-transform: uppercase;
        letter-spacing: 0.05em;
        color: #6b7280;
        margin-bottom: 0.25rem;
    }

    &__text {
        font-size: 0.875rem;
        color: #111827;
    }

    &__role {
        display: inline-block;
        padding: 0.25rem 0.625rem;
        font-size: 0.75rem;
        font-weight: 500;
        color: #1f2937;
        background-color: #e5e7eb;
        border-radius: 9999px;
        width: fit-content;
    }

    &--edit {
        padding: 1.5rem;
    }

    &__edit-title {
        font-size: 1rem;
        font-weight: 600;
        margin-bottom: 0.75rem;
    }

    &__textarea {
        width: 100%;
        min-height: 120px;
        padding: 0.75rem;
        font-size: 0.875rem;
        border: 1px solid #d1d5db;
        border-radius: 0.5rem;
        resize: vertical;

        &:focus {
            outline: none;
            border-color: #6366f1;
        }
    }
}
</style>
