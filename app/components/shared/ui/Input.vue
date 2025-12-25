<script setup lang="ts">
import { ref, watch } from 'vue'

const props = defineProps<{
  modelValue: string
  type?: string
  label?: string
  placeholder?: string
  required?: boolean
}>()

const emit = defineEmits<{
  (e: 'update:modelValue', value: string): void
}>()

const inputValue = ref(props.modelValue)

watch(() => props.modelValue, (newVal) => (inputValue.value = newVal))
watch(inputValue, (newVal) => emit('update:modelValue', newVal))
</script>

<template>
  <div class="input-wrapper">
    <label v-if="props.label" class="input-label">{{ props.label }}</label>
    <input
        v-model="inputValue"
        :type="props.type || 'text'"
        :placeholder="props.placeholder"
        :required="props.required"
        class="input-field"
    >
  </div>
</template>

<style lang="scss" scoped>
.input-wrapper {
  display: flex;
  flex-direction: column;
  margin-bottom: 1rem;

  .input-label {
    margin-bottom: 0.25rem;
    font-weight: 500;
  }

  .input-field {
    border: 1px solid #ccc;
    border-radius: 4px;
    padding: 0.5rem 0.75rem;
    font-size: 1rem;
    outline: none;
    transition: border-color 0.2s, box-shadow 0.2s;

    &:focus {
      border-color: #3490dc;
      box-shadow: 0 0 0 2px rgba(52, 144, 220, 0.3);
    }
  }
}
</style>
