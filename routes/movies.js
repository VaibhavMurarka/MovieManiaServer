import express from 'express'
import {deleteMovie, fetchWatched, fetchWatchlist, postMovie, putMovie}  from '../controllers/functions.js';
import { isAuthenticated } from '../middlewares/auth.js';

const router = express.Router();

router.get('/watched',isAuthenticated, fetchWatched);
router.get('/watchlist',isAuthenticated, fetchWatchlist);
router.post('/addmovie',isAuthenticated, postMovie);
router.put('/changetype',isAuthenticated, putMovie);
router.delete('/deletemovie',isAuthenticated, deleteMovie);


export default router;