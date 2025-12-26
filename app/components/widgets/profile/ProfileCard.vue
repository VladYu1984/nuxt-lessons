<script setup lang="ts">
import { ref, computed } from 'vue';
import { useUserStore } from '~/stores/userStore';
import { useApi } from '~/composables/useApi';

const userStore = useUserStore();
const user = computed(() => userStore.user);

const { request } = useApi();

const fileInput = ref<HTMLInputElement | null>(null);
const uploading = ref(false);

const emit = defineEmits<{ (e: 'edit'): void }>();

function onEdit() {
    emit('edit');
}

function onAvatarClick() {
    fileInput.value?.click();
}

async function onFileChange(event: Event) {
    const target = event.target as HTMLInputElement;
    const file = target.files?.[0];
    if (!file) return;

    const formData = new FormData();
    formData.append('avatar', file);

    try {
        uploading.value = true;

        interface UpdateAvatarResponse {
            avatarUrl: string;
        }

        const res = await request<UpdateAvatarResponse>('profile/avatar', {
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
</script>

<template>
    <div v-if="user" class="profile-card">
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
            />

            <div class="profile-card__meta">
                <h3 class="profile-card__name">{{ user.name }}</h3>
                <p class="profile-card__email">{{ user.email }}</p>
            </div>
        </div>

        <p class="profile-card__role"><strong>Role:</strong> {{ user.role }}</p>

        <div class="profile-card__actions">
            <button class="btn" :disabled="uploading" @click="onEdit">
                {{ uploading ? 'Uploading...' : 'Edit' }}
            </button>
        </div>
    </div>

    <div v-else class="profile-card profile-card--empty">
        <p>No profile available</p>
    </div>
</template>

<style lang="scss" scoped>
.profile-card {
    max-width: 400px;
    margin: 2rem auto;
    padding: 1.5rem;
    background: #fff;
    border-radius: 12px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
    display: flex;
    flex-direction: column;
    gap: 1rem;

    &__head {
        display: flex;
        align-items: center;
        gap: 1rem;
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
        background-color: #d1d5db;
        display: flex;
        align-items: center;
        justify-content: center;
        font-weight: bold;
        font-size: 1.25rem;
        color: #fff;

        &--placeholder {
            text-transform: uppercase;
        }
    }

    &__avatar-spinner {
        position: absolute;
        inset: 0;
        border: 3px solid rgba(255, 255, 255, 0.6);
        border-top: 3px solid #3490dc;
        border-radius: 50%;
        animation: spin 1s linear infinite;
    }

    @keyframes spin {
        0% {
            transform: rotate(0deg);
        }
        100% {
            transform: rotate(360deg);
        }
    }

    &__file-input {
        display: none;
    }

    &__meta {
        display: flex;
        flex-direction: column;

        & > .profile-card__name {
            font-weight: 600;
            font-size: 1.125rem;
        }

        & > .profile-card__email {
            font-size: 0.875rem;
            color: #6b7280;
        }
    }

    &__role {
        font-size: 0.875rem;
        color: #374151;
    }

    &__actions {
        margin-top: 1rem;

        .btn {
            background-color: #3490dc;
            color: #fff;
            padding: 0.5rem 1rem;
            border-radius: 8px;
            font-weight: 500;
            cursor: pointer;
            transition: background-color 0.2s;

            &:hover {
                background-color: #2779bd;
            }

            &:disabled {
                opacity: 0.6;
                cursor: not-allowed;
            }
        }
    }

    &--empty {
        text-align: center;
        color: #6b7280;
    }
}
</style>
