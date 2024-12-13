// router for serving themes
import express from 'express';
import db from '../utils/db.js';

// Create a router for themes
const router = express.Router()

// Create endpoint to serve themes request

router.get('/', (req, res) => {
    try {
        const statement = db.prepare('SELECT * FROM themes');
        const result = statement.all();
        res.send(result);
    } catch(err) {
        console.log(err);
        res.status(500).send({
            Error: "An error occured. Can't connect to the service at this time. Try again later."
        });
    }
});

export default router;
