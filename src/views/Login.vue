<template>
    <div>
        <h1>Login</h1>
        <form @submit.prevent="handleSubmit">
            <input type="email" placeholder="Ingrese Email" v-model.trim="email">
            <input type="password" placeholder="Ingrese password" v-model.trim="password">
            <button type="submit">Acceso</button>
        </form>
    </div>
</template>

<script setup>
import { ref } from 'vue';
import { useUserStore } from '../stores/user';

    const userStore = useUserStore()

    const email = ref('sandro@pcsoluciones.cl')
    const password = ref('123456')

    const handleSubmit = async () => {
        if ( !email.value || password.value.length < 6 ) {
            return alert('Llenar campos')
        }
        
        await userStore.loginUser(email.value, password.value)
    }
</script>