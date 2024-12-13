// Route for serving artist related requests
import express from 'express';
import db from '../utils/db.js';
import { validateArtistsPost, validateArtistsPatch, validateTracksPatch } from '../utils/validation.js';
import { generateInsertStatement, generateUpdateStatement, generateDeleteStatement } from '../utils/generateSql.js';

const router = express.Router();

// Endpoint to return a list of all artists
router.get('/', (req, res) => {
    try {
        const statement = db.prepare('SELECT * FROM artists;');
        const result = statement.all();

        res.send(result);
    } catch (err) {
        console.log(err);
        return res.status(500).send({
            Error: "An error occured. Can't connect to the service at this time try again later."
        });
    }
});

// Endpoint to get a specific artist
router.get('/:id', (req, res) => {
    try{
        // Validate artist ID
        if(isNaN(req.params.id)) {
            return res.status(400).send({
                Error: "Invalid artist ID. Artist ID must be an integer"
            });
        }
        
        const statement = db.prepare(`SELECT * FROM artists WHERE ArtistId = ?;`);
        const result = statement.get(req.params.id);
        //Check to see if record was found
        if(!result) {
            return res.status(404).send({
                Error: `No record was found for the artist with ID ${req.params.id}`
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

// Endpoint to return albums for a specific artist
router.get('/:id/albums', (req, res) => {
    //Validate artist ID
    if (isNaN(req.params.id)) {
        return res.status(400).send({
            Error: "Invalid artist ID. Artist ID must be an integer"
        });
    }
    try {
        const statement = db.prepare('SELECT * FROM albums WHERE ArtistId = ?;');
        const result = statement.all(req.params.id);
        // Check if data was dound (check if result is falsy)
        if (!result) {
            return req.status(404).send({
                Error: `No data found for the specified artist with ID ${req.params.id}`
            });
        }

        res.send(result);
    } catch (err) {
        console.log(err);
        return res.status(500).send({
            Error: "An error occured. Can't connect to the service at this time try again later."
        });
    }});

    // Endpoint to return search term to frontend
    router.get('/search/:searchTerm', (req, res) => {

        try {
            // Query database for search term
            const statement = db.prepare(`SELECT * FROM artists WHERE Name LIKE ?;`);
            const result = statement.all(req.params.searchTerm + "%");
            // Check if records were found
            if (!result) {
                return res.status(404).send({
                    Error: `No record found for artist with name begining with ${req.params.searchTerm}`
                });
            }
            res.send(result);

        } catch (err) {
            console.log(err);
            return res.status(500).send({
                Error: "An error occured. Can't connect to the service at this time try again later."
            });
        }
    });

    // Endpoint to create/ add a new artist
    router.post('/', (req, res) => {
        try {
          // Validate request body
          const validationResult = validateArtistsPost(req.body);
          if (validationResult.error) {
            return res.status(422).send({
              Error: "Validation Error",
              Details: validationResult.error
            })
          }
      
          const { sql, values } = generateInsertStatement('artists', req.body);
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

    // Endpoint to update an artist
    router.patch('/:id', (req, res) => {
        try {
            // Validate artist ID
            if(isNaN(req.params.id)) {
                return restart.status(400).send({
                    Error: "Invalid artist ID. Artist ID must be an integer"
                });
            }
          // Validate request body
          const validationResult = validateTracksPatch(req.body);
          if (validationResult.error) {
            return res.status(422).send({
              Error: "A validation error occurred",
              Details: "validationResult.error"
            });
          }
          const { sql, values } = generateUpdateStatement('artists', req.body, 'ArtistId', req.params.id)
          const statement = db.prepare(sql);
          const result = statement.run(values);
          // Check to see if any result was returned
          if (!result) {
            return res.status(404).send({
              Error: `No record found for artist with artist ID ${req.params.id}`
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

    // Endpoint to delete an artist
    router.delete('/:id', (req, res) => {
        try {
          // Validate artist id
          if (isNaN(req.params.id)) {
            return res.status(400).send({
              Error: "Invalid artist ID. Artist Id must be an integer"
            });
          }
          const {sql}= generateDeleteStatement('artists', 'ArtistId');
          const statement = db.prepare(sql);
          const result = statement.run(req.params.id);
          if(!result.changes) { // changes being 0 indicates that the specified artist ID was not found. Zero is falsy
            return res.status(404).send({
              Error: `No record found for the artist with ID ${req.params.id}`
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
    export default router;