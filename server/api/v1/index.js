import express from 'express';
import { getSongs } from "./songs";
import { getArtistId } from "./artists";

const api = express.Router();

api.get("/songs/:artistId", getSongs);
api.get("/artists", getArtistId);

export default api;
