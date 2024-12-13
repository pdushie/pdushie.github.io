import express from 'express';
import db from '../utils/db.js';
import { validateTracksPost, validateTracksPatch } from '../utils/validation.js';
import { generateInsertStatement, generateUpdateStatement, generateDeleteStatement } from '../utils/generateSql.js';

const router = express.Router();

// Endpoint to get specific track
router.get('/:id', (req, res) => {
  try {
    //Validate track ID
    if (isNaN(req.params.id)) {
      return res.status(400).send({
        Error: "Invalid track ID. Track ID must be an integer."
      });
    }
    const statement = db.prepare('SELECT * FROM tracks WHERE TrackId = ?;');
    const result = statement.get(req.params.id);

    // Check if record was found
    if (!result) {
      return res.status(404).send({
        Error: `No record was found for the track with ID ${req.params.id}`
      });
    }

    res.send(result);
  } catch (err) {
    console.log(err);
    res.status(500).send({
      Error: "An error occured. Can't connect to the service at this time try again later."
    });
  }
});

// Endpoint for adding new tracks
router.post('/', (req, res) => {
  try {
    // Validate request body
    const validationResult = validateTracksPatch(req.body);
    if (validationResult.error) {
      return res.status(422).send({
        Error: "Validation Error",
        Details: validationResult.error
      })
    }

    const { sql, values } = generateInsertStatement('tracks', req.body);
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

// Endpoint for updating a specific track (Edits)
router.patch('/:id', (req, res) => {
  try {
    // Validate track id
    if (isNaN(req.params.id)) {
      return res.status(400).send({
        Error: "Invalid track ID. Track Id must be an integer"
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
      const { sql, values } = generateUpdateStatement('tracks', req.body, 'TrackId', req.params.id)
      const statement = db.prepare(sql);
      const result = statement.run(values);
      // Check to see if any result was returned
      if (!result) {
        return res.status(404).send({
          Error: `No record found for track with track ID ${req.params.id}`
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

// Endpoint for deleting a specific track
router.delete('/:id', (req, res) => {
  try {
    // Validate track id
    if (isNaN(req.params.id)) {
      return res.status(400).send({
        Error: "Invalid track ID. Track Id must be an integer"
      });
    }
    const { sql} = generateDeleteStatement('tracks', 'TrackId');
    const statement = db.prepare(sql);
    const result = statement.run(req.params.id);
    if (!result.changes) { // changes being 0 indicates that the specified track ID was not found. Zero is falsy
      return res.status(404).send({
        Error: `No record found for the track with ID ${req.params.id}`
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