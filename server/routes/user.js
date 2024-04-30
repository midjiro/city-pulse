const { Router } = require('express');
const multer = require('multer');
const { getUser, getUserById, deleteUser, updateUser } = require('../services');
const { isLoggedIn } = require('../utils/index');

const upload = multer({ storage: multer.memoryStorage() });
const router = Router();

router.get('/', isLoggedIn, getUser);
router.get('/:userID', getUserById);

router.delete('/', isLoggedIn, deleteUser);

router.put('/', isLoggedIn, upload.single('picture'), updateUser);

module.exports = { userRouter: router };
