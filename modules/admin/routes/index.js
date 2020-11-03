const router = require('express').Router();
const UMService = require('../services/UserManagmentService');
const UMCommonService = require('../../common/services/AuthService');
const validateUserFormRegister = require('../middlewares/validateRegisterUserForm');

router.route('/').get(async (req, res) => {
    try {
        const users = await UMService.getAllUsers();
        return res.status(200).json(users);
    } catch (e) {
        return res.status(500).json(e);
    }
});

router.route('/create/user')
    .post(validateUserFormRegister, async (req, res) => {
            const [user] = await UMCommonService.getUserByUsername(req.body.value.username); // [{id: 1, username: 'fy'}, {id: 52}]
            if (user) {
                return res.status(200).send('Username already in used !');
            }
            await UMService.createUser(req.body.value);
            return res.status(200).send('User created successfully !');
        });

module.exports = router;