import { addDoc, collection, deleteDoc, doc, getDoc, getDocs, query, updateDoc, where } from "firebase/firestore/lite";
import { defineStore } from "pinia";
import { auth, db } from "../firebaseConfig";
import { nanoid } from "nanoid";
import router from "../router";

export const useDataBaseStore = defineStore('database', {
    state: () => ({
        documents: [],
        loadingDoc: false
    }),

    actions: {
        async getUrls(){
            if (this.documents.length !==0) {
                return
            }
            this.loadingDoc = true
            try {
                const q = query(collection(db, 'urls'), where("user", "==", auth.currentUser.uid))
                const querySnapshot = await getDocs(q)
                querySnapshot.forEach(doc => {
                    console.log(doc.id, doc.data())
                    this.documents.push({
                        id: doc.id,
                        ...doc.data()           // destructuración de la data para traer sus propiedades y valores
                    })
                })
            } catch (error) {
                console.log(error)
            } finally {
                this.loadingDoc = false
            }
        },

        async addUrl(name){
            try {
                const objectDoc = {
                    name: name,
                    short: nanoid(6),
                    user: auth.currentUser.uid      // uid de usuario activo
                }
                const docRef = await addDoc(collection(db, "urls"), objectDoc)      //se agrega documento a la base de datos
                console.log(docRef.id)      // única información relevante que entrega al agregar el registro
                
                this.documents.push({
                    ...objectDoc,
                    id: docRef.id
                })

            } catch (error) {
                console.log(error)

            } finally{
            }
        },

        async leerUrl(id){
            try {
                // sacamos una referencia del elemento
                const docRef = doc(db, "urls", id)
                const docSnap = await getDoc(docRef)

                // comprueba que exista esa referencia del registro
                if (!docSnap.exists()){
                    throw new Error("no existe el doc")  // hace que salte al catch con este mensaje de error
                }
                // ahora comprueba que le pertenezca el documento
                if (docSnap.data().user !== auth.currentUser.uid){
                    throw new Error("no le pertenece este documento")
                }                
               
                return  docSnap.data().name    // recuperamos la url larga
                
            } catch (error) {
                console.log(error.message)
            } finally {

            }
        },

        async deleteUrl(id) {
            try {
                const docRef = doc(db, "urls", id)

                // comprueba que exista esa referencia del registro
                const docSnap = await getDoc(docRef)
                if (!docSnap.exists()){
                    throw new Error("no existe el doc")  // hace que salte al catch con este mensaje de error
                }
                // ahora comprueba que le pertenezca el documento
                if (docSnap.data().user !== auth.currentUser.uid){
                    throw new Error("no le pertenece este documento")
                }

                await deleteDoc(docRef)
                // eliminar documento del almacen
                this.documents = this.documents.filter(
                    (item) => item.id !=id              // devuelve un array con los elementos que no sean igual al id
                )
                
            } catch (error) {
                console.log(error.message)
            } finally {
    
            }
        },

        async updateUrl(id, name) {
            try {
                const docRef = doc(db, "urls", id)

                // comprueba que exista esa referencia del registro
                const docSnap = await getDoc(docRef)
                if (!docSnap.exists()){
                    throw new Error("no existe el doc")  // hace que salte al catch con este mensaje de error
                }
                // ahora comprueba que le pertenezca el documento
                if (docSnap.data().user !== auth.currentUser.uid){
                    throw new Error("no le pertenece este documento")
                }

                // actualizamos el campo en cuestion
                await updateDoc(docRef, {
                    name: name
                })

                // actualizamos el almacen
                // nota: al utilizar map debemos devolver la totalizadad de sus componente, no así filter
                this.documents = this.documents.map(
                    item => item.id === id  ? ({...item, name:name}) 
                                            : item
                )
                
                router.push('/')
                
            } catch (error) {
                console.log(error.message)
            } finally {
    
            }
        }
    },
})