import express from "express";
import {
    getUsers, 
    getUserById,
    createUser,
    updateUser,
    deleteUser
} from "../controllers/UserController.js";
import {
    getAccounts,
    verifyAccount,
    createAccount,
    innerJoinTest,
    innerJoinTest2
}from "../controllers/AccountController.js";

const router = express.Router();

//User Routes
router.get('/users', getUsers);
router.get('/users/:id', getUserById);
router.post('/users', createUser);
router.patch('/users/:id', updateUser);
router.delete('/users/:id', deleteUser);

//Account Routes
router.get('/listAccount',getAccounts);
router.post('/verifyAccount', verifyAccount);
router.post('/createAccount', createAccount);
router.post('/testInnerJoin', innerJoinTest)
router.post('/testInnerJoin2', innerJoinTest2)
export default router;