// Endpoint for serving album related requests
import express from 'express';
import db from '../utils/db.js';
import { validateAlbumsPost, validateAlbumsPatch } from '../utils/validation.js';
import { generateInsertStatement, generateUpdateStatement, generateDeleteStatement } from '../utils/generateSql.js';
import { uploadFile } from '../utils/upload.js';

const router = express.Router();

// Endpoint to return all tracks for a specific artist
router.get('/:id/tracks', (req, res) => {
    // Validate the album ID
    try {
        if (isNaN(req.params.id)) {
            return res.status(404).send({
                Error: "Invalid album ID. Alum ID must be an integer"
            });
        }
        const statement = db.prepare('SELECT * FROM tracks WHERE AlbumId = ?;');
        const result = statement.all(req.params.id);

        // Check to see if data was found
        if (!result) {
            return res.status(400).send({
                Error: `No data found for artist with ID ${req.params.id}`
            });
        }

        res.send(result);
    } catch (err) {
        console.log(err);
        return res.status(500).send({
            Error: "An error occured. Can't connect to the service at this time try again later."
        })
    }

});

// Endpoint to get album for a specific artist
router.get('/:id', (req, res) => {
    try{
        // Validate album ID
        if(isNaN(req.params.id)) {
            return res.status(400).send({
                Error: "Invalid album ID. Album ID must be an integer"
            });
        }
        
        const statement = db.prepare(`SELECT * FROM albums WHERE AlbumId = ?;`);
        const result = statement.get(req.params.id);
        //Check to see if record was found
        if(!result) {
            return res.status(404).send({
                Error: `No record was found for the album with ID ${req.params.id}`
            });
        }
        res.send(result);
    } catch(err) {
        console.log(err);
        res.status(500).send({
            Error: "An error occured. Can't connect to the service at this time try again later."
        })
    }
});

// Endpoint to create/ add a new album
router.post('/', (req, res) => {
    try {
      // Validate request body
      const validationResult = validateAlbumsPost(req.body);
      if (validationResult.error) {
        return res.status(422).send({
          Error: "Validation Error",
          Details: validationResult.error
        })
      }
  
      const { sql, values } = generateInsertStatement('albums', req.body);
      const statement = db.prepare(sql);
      const result = statement.run(values);
      res.status(201).send(result);
    } catch (err) {
      console.log(err);
      res.status(500).send({
        Error: "An error occured. Can't connect to the service at this time try again later."
      });
    }
  });

// Endpoint to update an album
router.patch('/:id', (req, res) => {
    try {
        // Validate album ID
        if(isNaN(req.params.id)) {
            return res.status(400).send({
                Error: "Invalid album ID. Album ID must be an integer"
            });
        }
      // Validate request body
      const validationResult = validateAlbumsPatch(req.body);
      if (validationResult.error) {
        return res.status(422).send({
          Error: "A validation error occurred",
          Details: "validationResult.error"
        });
      }
      const { sql, values } = generateUpdateStatement('albums', req.body, 'AlbumId', req.params.id)
      const statement = db.prepare(sql);
      const result = statement.run(values);
      // Check to see if any result was returned
      if (!result) {
        return res.status(404).send({
          Error: `No record found for album with album ID ${req.params.id}`
        });
      }
      res.send(result);
    } catch (err) {
      console.log(err);
      res.status(500).send({
        Error: "An error occured. Can't connect to the service at this time try again later."
      })
    }
  });


// Endpoint to delete an album
router.delete('/:id', (req, res) => {
    try {
      // Validate album id
      if (isNaN(req.params.id)) {
        return res.status(400).send({
          Error: "Invalid album ID. Album Id must be an integer"
        });
      }
      const {sql} = generateDeleteStatement('albums', 'AlbumId');
      const statement = db.prepare(sql);
      const result = statement.run(req.params.id);
      if(!result.changes) { // changes being 0 indicates that the specified album ID was not found. Zero is falsy
        return res.status(404).send({
          Error: `No record found for the album with ID ${req.params.id}`
        });
      }
      res.send(result);
  
    } catch (err) {
      console.log(err);
      res.status(500).send({
        Error: "An error occured. Can't connect to the service at this time try again later"
      })
    }
  });

// Endpoint to upload album art
router.post('/:id/albumart', uploadFile.single('albumart'), (req, res) => {
    try {
        // Validate album ID
        if(isNaN(req.params.id)) {
            return res.status(400).send({
                Error: "Invalid album ID. Album ID must be an integer."
            });
        }

        const statement = db.prepare(`UPDATE albums SET AlbumArt = ? WHERE AlbumId = ${req.params.id};`);
        const result = statement.run(req.file.filename);
        res.status(201).send(result);
    } catch(err) {
        console.log(err);
        res.status(500).send({
            Error: "An error occured. Can't connect to the service at this time try again later."
        })
    }
});

export default router