import express from 'express';
import themesRouter from './routes/themes.js';
import artistsRouter from './routes/artists.js';
import albumsRouter from './routes/albums.js';
import mediatypesRouter from './routes/mediatypes.js'
import tracksRouter from './routes/tracks.js';
const port = 3000;
const app = new express();

//Middleware goes here
app.use(express.json());
app.use(express.urlencoded());
app.use('/api/themes', themesRouter);
app.use('/api/artists', artistsRouter);
app.use('/api/albums', albumsRouter);
app.use('/api/mediatypes', mediatypesRouter);
app.use('/api/tracks/', tracksRouter);

//Serve front end files
app.use(express.static('./_FrontendStarterFiles'));

// Configure express to listen on port 3000
app.listen(port, () => {
    console.log("Listening on port "+ port);
});

// Remember to do a try catch for all db operations
//delete endpoint, update enpoint, insert endpoint, upload album art endpoint