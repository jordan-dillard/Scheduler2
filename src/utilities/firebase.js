import { initializeApp } from 'firebase/app';
import { getDatabase, onValue, ref} from 'firebase/database';
import { useState, useEffect } from 'react';

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBDzzhrysD3JFcbXKy8xr2RpdTZ50zuA6Y",
    authDomain: "cs394-scheduler2.firebaseapp.com",
    databaseURL: "https://cs394-scheduler2-default-rtdb.firebaseio.com",
    projectId: "cs394-scheduler2",
    storageBucket: "cs394-scheduler2.appspot.com",
    messagingSenderId: "1046216268406",
    appId: "1:1046216268406:web:ddb14e9af3dcceea7add57"
};

export const useData = (path, transform) => {
    const [data, setData] = useState();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState();

    useEffect(() => {
        const dbRef = ref(database, path);
        const devMode = !process.env.NODE_ENV || process.env.NODE_ENV === 'development';
        if (devMode) { console.log(`loading ${path}`); }
        return onValue(dbRef, (snapshot) => {
            const val = snapshot.val();
            if (devMode) { console.log(val); }
            setData(transform ? transform(val) : val);
            setLoading(false);
            setError(null);
        }, (error) => {
            setData(null);
            setLoading(false);
            setError(error);
        });
    }, [path, transform]);

    return [data, loading, error];
};

const firebase = initializeApp(firebaseConfig);
const database = getDatabase(firebase);