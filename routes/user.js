import express from 'express'
import {getAllUsers, getUserByID, register, login, getData}  from '../controllers/functions.js';
import {isAuthenticated} from '../middlewares/auth.js'

const router = express.Router();

router.get('/all', getAllUsers);
router.get('/userid/:id', getUserByID);
router.post("/register", register);
router.post("/login", login);
router.get("/me",isAuthenticated, getData);


export default router;
