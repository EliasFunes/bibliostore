import {createStore, combineReducers, compose} from "redux";
import {reactReduxFirebase, firebaseReducer} from "react-redux-firebase";
import {reduxFirestore, firestoreReducer} from "redux-firestore";
import firebase from "firebase/app";
import 'firebase/firestore';

// configurar firestore.

const firebaseConfig = {
    apiKey: "AIzaSyCMmow26UYplasMamsFn-J-c2qQc3BdW1Y",
    authDomain: "bibliostore-15e8b.firebaseapp.com",
    databaseURL: "https://bibliostore-15e8b.firebaseio.com",
    projectId: "bibliostore-15e8b",
    storageBucket: "bibliostore-15e8b.appspot.com",
    messagingSenderId: "337440963191",
    appId: "1:337440963191:web:fed738b15f738edb9be472",
    measurementId: "G-GHN9C2R15D"
}

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

//Configuracion de react redux
const rrfConfig = {
    userProfile : 'users',
    useFirestoreForProfile: true
}

//crear el enhancer(potenciador) con compose de redux y firestore
const createStoreWithFirebase = compose(
    reactReduxFirebase(firebase, rrfConfig),
    reduxFirestore(firebase)
)(createStore);

//reducers

const rootReducer = combineReducers({
    firebase: firebaseReducer,
    firestore: firestoreReducer
});

//state inicial
const initialState = {

}

//crear el store
const store = createStoreWithFirebase(rootReducer, initialState, compose(
    reactReduxFirebase(firebase),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
));

export default store;