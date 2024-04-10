const { Router } = require('express');
const multer = require('multer');
const { UserRequests } = require('../requests/user');
const { isLoggedIn } = require('../utils/index');

const upload = multer({ storage: multer.memoryStorage() });
const router = Router();

router.get('/', isLoggedIn, UserRequests.getUser);

router.delete('/', isLoggedIn, UserRequests.deleteUser);

router.put('/', isLoggedIn, upload.single('picture'), UserRequests.putUser);

module.exports = { userRouter: router };
