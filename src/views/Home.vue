<template>
    <div>
        <h1>Home</h1>
        {{ userStore.userData?.email }}

        <form @submit.prevent="handleSubmit">
            <input type="text" placeholder="Ingrese URL" v-model="url">
            <button type="submit">Agregar</button>
        </form>

        <p v-if="databaseStore.loadingDoc">Loading docs...</p>
        <ul v-else>
            <li v-for="item of databaseStore.documents" :key="item.id">
                {{ item.id }}
                <br>
                {{ item.name }}
                <br>
                {{ item.short }}
                <br>
                {{ item.user }}
                <br>
                <button @click="databaseStore.deleteUrl(item.id)">Eliminar</button>
                <button @click="router.push(`/editar/${item.id}`)">Editar</button>
            </li>
        </ul>

    </div>
</template>

<script setup>
import { onAuthStateChanged } from '@firebase/auth';
import { auth } from '../firebaseConfig';
import { useUserStore } from '../stores/user';
import { useDataBaseStore } from '../stores/database';
import { ref } from 'vue';
import { useRouter } from 'vue-router';         // useRouter sirve para empujar a una página

const userStore = useUserStore()
const databaseStore = useDataBaseStore()
const router = useRouter()      // tiene la acción de empujar atraves del push

databaseStore.getUrls()

onAuthStateChanged( auth, (user) => {
    console.log(user)  // muestra el usuario activo
})

const url = ref('')
const handleSubmit = () => {
    // validar url...
    databaseStore.addUrl(url.value)

}

</script>