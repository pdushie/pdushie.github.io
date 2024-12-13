import Joi from 'joi';

// Define general schema for artist
const artistsFields = {
  Name: Joi.string().max(120)
}

const artistsPostSchema = Joi.object({
  Name: Joi.string().max(120).required()
});

const artistsPatchSchema = Joi.object({
  ...artistsFields
});

//Define general schema for albums
const albumsFields = {
  Title: Joi.string().max(20),
  ArtistId: Joi.number().integer(),
  AlbumArt: Joi.string().max(255),
  ReleaseYear: Joi.number()
    .integer()
    .min(1800) // earliest date an album can be released set to 1800
    .max(2024) // Done to get the current year as the maximum release year for an album
};

// Schema for posting albums
const albumsPostSchema = Joi.object({
  ... albumsFields,
  Title: Joi.string().max(20).required(),
  ArtistId: Joi.number().integer().required()
});

// Schema for updating/ patching albums
const albumsPatchSchema = Joi.object({
  ... albumsFields
});

//Define general schema for tracks
// Schema for tracks
const tracksFields = {
  Name: Joi.string().max(200),
  AlbumId: Joi.number().integer(),
  MediaTypeId: Joi.number().integer(),
  Milliseconds: Joi.number().integer()

}

// Schema for posting tracks
const tracksPostSchema = Joi.object({
  ...tracksFields,
  Name: Joi.string().max(200).required,
  AlbumId: Joi.number().integer().required,
  MediaTypeId: Joi.number().integer().required,
  Milliseconds: Joi.number().integer().required
}
);

//Define schema for updating tracks
const tracksPatchSchema = Joi.object({
  ...tracksFields
}
);

export const validateArtistsPost = payload => {
  return artistsPostSchema.validate(payload);
}

export const validateArtistsPatch = payload => {
  return artistsPatchSchema.validate(payload);
}

export const validateAlbumsPost = payload => {
  return albumsPostSchema.validate(payload);
}

export const validateAlbumsPatch = payload => {
  return albumsPatchSchema.validate(payload);
}

export const validateTracksPost = payload => {
  return tracksPostSchema.validate(payload);
}

export const validateTracksPatch = payload => {
  return tracksPatchSchema.validate(payload);
}

