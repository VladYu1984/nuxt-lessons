<template>
    <div class="auth-layout">
        <div class="auth-container">
            <slot />
        </div>
    </div>
</template>

<style scoped lang="scss">
.auth-layout {
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 100vh;
    background-color: #f0f2f5;
}

.auth-container {
    background-color: #fff;
    padding: 2rem;
    border-radius: 8px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
    width: 100%;
    max-width: 400px;
}
</style>
