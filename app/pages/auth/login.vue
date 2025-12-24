<script setup lang="ts">
definePageMeta({ layout: 'auth' });
</script>

<template>
  <div>
    <h2>Login</h2>
    <form>
        <div>
            <label for="email">Email:</label>
            <input id="email" type="email" name="email" required >
        </div>
        <div>
            <label for="password">Password:</label>
            <input id="password" type="password" name="password" required >
        </div>
        <button type="submit">Login</button>
    </form>
  </div>
</template>