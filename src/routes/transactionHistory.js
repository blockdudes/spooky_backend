const express = require('express');
const router = express.Router();
const { firebaseApp, db } = require('../firebase/firebase.config');
const { collection, doc, getDoc, setDoc, updateDoc, arrayUnion } = require("firebase/firestore");


router.post('/txHistory', async(req, res) => {
    try {

        console.log("first")
        const { signer, type, from, to, amount } = req.body;

        console.log(signer, type, from, to, amount)

        const newStruct = { type, from, to, amount };
        const docRef = doc(collection(db, 'txHistory'), signer);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
            await updateDoc(docRef, { values: arrayUnion(newStruct) });
        } else {
            await setDoc(docRef, { values: [newStruct] });
        }

        res.json({ message: "Document successfully written!" });
    } catch (error) {
        console.error("Error writing document: ", error);
        res.status(500).json({ error: "An error occurred while writing the document" });
    }
})

router.get('/txHistory/:signer', async(req, res) => {
    try {
        const { signer } = req.params;

        const docRef = doc(collection(db, 'txHistory'), signer);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
            res.json({ data: docSnap.data() });
        } else {
            res.status(404).json({ error: "No document found for the provided signer" });
        }
    } catch (error) {
        console.error("Error reading document: ", error);
        res.status(500).json({ error: "An error occurred while reading the document" });
    }
});
module.exports = router;