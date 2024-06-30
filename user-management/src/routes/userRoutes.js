const express = require('express');
const { register, login, updateRole, getAllUsers } = require('../controllers/userController');
const auth = require('../middleware/authMiddleware');
const roleMiddleware = require('../middleware/roleMiddleware');

const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.put('/role', auth, roleMiddleware(['admin']), updateRole);
router.get('/users', auth, roleMiddleware(['admin']), getAllUsers);

module.exports = router;
