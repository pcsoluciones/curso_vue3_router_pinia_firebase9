<template>
  <h1>App</h1>
  <nav v-if="!userStore.loadingSession">
    <router-link to="/" v-if="userStore.userData">Home</router-link> |
    <router-link to="/login" v-if="!userStore.userData">Login</router-link> |  
    <router-link to="/register" v-if="!userStore.userData">Register</router-link> 
    <button @click="userStore.logoutUser" 
            :disabled="userStore.loadingUser" 
            v-if="userStore.userData">
      Logout
    </button>
  </nav>
  <div v-else>
    Loading user...
  </div>
  <router-view></router-view>
</template>

<script setup>
import { useUserStore } from './stores/user';
const userStore = useUserStore()


</script>