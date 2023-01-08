<template>
    <div>
        <h1>Home</h1>
        {{ userStore.userData?.email }}

    </div>
</template>

<script setup>
import { onAuthStateChanged } from '@firebase/auth';
import { auth } from '../firebaseConfig';
import { useUserStore } from '../stores/user';

const userStore = useUserStore()

onAuthStateChanged( auth, (user) => {
    console.log(user)  // muestra el usuario activo
})

</script>