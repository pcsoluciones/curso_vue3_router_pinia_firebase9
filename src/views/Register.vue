<template>
    <div>
        <h1>Register</h1>
        <form @submit.prevent="handleSubmit">
            <input type="email" placeholder="Ingrese Email" v-model.trim="email">
            <input type="password" placeholder="Ingrese password" v-model.trim="password">
            <button type="submit">Crear Usuario</button>
        </form>
    </div>
</template>

<script setup>
import { ref } from 'vue';
import { useUserStore } from '../stores/user';
// import { useRouter } from 'vue-router';

    const userStore = useUserStore()
    // const router = useRouter()


    const email = ref('sandro@pcsoluciones.cl')
    const password = ref('123456')

    const handleSubmit = async () => {
        if ( !email.value || password.value.length < 6 ) {
            return alert('Llenar campos')
        }
        
        console.log('Procesando Formulario ...')
        await userStore.registerUser(email.value, password.value)
        // if ( userStore.userData) {   // solo si se crea el usuario se almacena en userData
        //     router.push('/')
        // }
    }
</script>