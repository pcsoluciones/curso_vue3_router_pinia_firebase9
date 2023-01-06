import { defineStore } from "pinia";

export const useUserStore = defineStore('userStore', {
    state: () => ({
        userData: 'bluuweb@test.com',
        saludo: "Hola Mundo"
    }),
    getters: {
        minuscula(state) {
            return state.saludo.toLowerCase()
        }
    },
    actions: {
       registerUser(name) {
        this.userData = name
       } 
    }
})