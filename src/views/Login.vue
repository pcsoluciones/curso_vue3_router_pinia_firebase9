<template>
    <div>
        <h1>Login</h1>
        <p>{{ userMayuscula }}</p>
        <p>{{ userStore.minuscula }}</p>
    </div>
</template>

<script setup>
import { computed } from 'vue';
import { useUserStore } from '../stores/user';

const userStore = useUserStore()

const userMayuscula = computed( () => userStore.userData.toUpperCase())

</script>