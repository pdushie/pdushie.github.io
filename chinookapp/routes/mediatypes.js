import express from 'express';
import db from '../utils/db.js';

const router = express.Router()

//Endpoint to get all media types
router.get('/', (req, res) => {
  try {
    const statement = db.prepare('SELECT * FROM media_types;')
    const result = statement.all();
    res.send(result);
  } catch (err) {
    console.log(err);
    res.status(500).send({
      Error: "An error occured. Can't access the service at this time try again later"
    });
  }
});
export default router;