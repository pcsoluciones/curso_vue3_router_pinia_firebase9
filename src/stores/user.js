import { defineStore } from "pinia";
import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { auth } from "../firebaseConfig";
import router from "../router";
import { useDataBaseStore } from "./database";


export const useUserStore = defineStore('userStore', {
    state: () => ({
        userData: null,
        loadingUser : false,
        loadingSession : false
    }),

    actions: {
        async registerUser(email, password) {
            this.loadingUser = true
            try {
                //usamos la destructuración de la respuesta
                const { user } = await createUserWithEmailAndPassword(auth, email, password)    
                console.log(user)
                this.userData = { email: user.email, uid: user.uid}
                router.push('/')

            } catch (error) {
                console.log(error)
            } finally {
                this.loadingUser = false
            }
        },

        async loginUser( email, password) {
            this.loadingUser = true
            try {
                const { user } = await signInWithEmailAndPassword( auth, email, password )
                this.userData = { email: user.email, uid: user.uid}
                router.push('/')

            } catch (error) {
                console.log("error al logearse")
            } finally {
                this.loadingUser = false
            }
        },

        async logoutUser() {
            const databaseStore = useDataBaseStore()
            databaseStore.$reset()
            try {
                await signOut(auth)
                this.userData = null
                console.log("Cierre de sesión")
                router.push('/login')

            } catch (error) {
                console.log(error)
            }
        },

        currentUser() {
            return new Promise( (resolve, reject) => {      // se crea esta promisa para esperar la respuesta antes de pintar la vista
                const unsuscribe = onAuthStateChanged(auth, user => {
                    if (user) {
                        this.userData = { email: user.email, uid: user.uid}
                    } else {
                        this.userData = null
                        const databaseStore = useDataBaseStore()
                        databaseStore.$reset()
                    }
                    resolve(user)       // devuelve el user
                }, e => reject(e))      // en caso que falle devuelve reject
                unsuscribe()
            })
        }
    }
})