import express from 'express';
import { getSongs } from "./songs";
import { getArtist } from "./artists";

const api = express.Router();

api.get("/songs/:artistId", getSongs);
api.get("/artists", getArtist);

export default api;
