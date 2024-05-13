import express from 'express';
import moviesController from '../controllers/moviesController.js'
const router = express.Router();

router.get('/onLoad', moviesController.loadAll);
router.get('/getSearch', moviesController.searching);
router.post('/addMovie', moviesController.addMovie);
router.delete('/deleteMovie', moviesController.deleteMovie);
router.get('/getEdit', moviesController.getEditMovie);
router.put('/editingMovie/:id', moviesController.editing)


export default router;