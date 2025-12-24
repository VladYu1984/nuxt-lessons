<template>
  <div class="main-layout">
    <header class="main-header">
      <nav>
        <h1>Lessons App</h1>
      </nav>
    </header>

    <main>
      <slot />
    </main>

    <footer class="main-footer">
      <p>&copy; 2025 Lessons App</p>
    </footer>
  </div>
</template>

<style lang="scss" scoped>
    .main-header, .main-footer {
        background-color: #333;
        color: #fff;
        padding: 1rem 2rem;
    }

    main {
        padding: 2rem;
        min-height: calc(100vh - 140px);
    }
</style>