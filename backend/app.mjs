import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import database from './myDatabase/database.js';
import router from './Routes/moviesRouter.js';
import fetch from 'node-fetch';

const app = express();
app.use(express.json());
app.use(cors());

const port = process.env.PORT || 3003;

database.fight();

app.use('/movies/api',router);

// search : 'https://api.themoviedb.org/3/search/movie?query=Jack+Reacher&api_key=404e6e5185b680aad4b9021a88de3b27'


app.listen(port, () => console.log("Submit Totally: ", port))