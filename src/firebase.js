import { initializeApp } from 'firebase/app'
import { getStorage } from 'firebase/storage'

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: 'AIzaSyCMEyUokBxITQ1_Xy2POtHoxU_2uveTKQA',
    authDomain: 'fileupload-190c5.firebaseapp.com',
    projectId: 'fileupload-190c5',
    storageBucket: 'fileupload-190c5.appspot.com',
    messagingSenderId: '592532847013',
    appId: '1:592532847013:web:a203a61e02fee29bb4904c'
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)
export const storage = getStorage(app)
