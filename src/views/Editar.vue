<template>
    <div>
        <h1>Editar id: {{route.params.id}}</h1>
        <form @submit.prevent="handleSubmit">
            <input type="text" placeholder="Ingrese URL" v-model="url" >
            <button type="submit">Editar</button>
        </form>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';          // useRoute sirve para pasar params  id
import { useDataBaseStore } from '../stores/database';

const databaseStore =useDataBaseStore()

const route = useRoute()       
console.log(route.params)

const handleSubmit = async () => {
    //se debería hacer validaciones del input, que sea una url válida
    // llamamos a la funcíon pasandole los parámetros 
    databaseStore.updateUrl(route.params.id, url.value)
}

const url = ref('')

onMounted(async() => {
    url.value = await databaseStore.leerUrl(route.params.id)
    console.log("Editar")
    console.log(url.value)
})

</script>