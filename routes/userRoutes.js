
const express = require('express');
const router = express.Router();

const { getAllAccounts, getOneAccount, createNewAccount, deleteAccount } = require('../controllers/userController')

//Controllers for application
router.route('/').get(getAllAccounts).post(createNewAccount)
router.route('/:id').get(getOneAccount).delete(deleteAccount);

module.exports = router;
