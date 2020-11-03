const router = require('express').Router();
const UMCommonService = require('../../common/services/AuthService');

router.route('/login').post(async (req, res) => {
    const token = await UMCommonService.login(req.body);
    if (!token) {
        return res.status(400).send('UNABLE TO LOGIN');
    }
    return res.status(200).json({token});
});

router.route('/forget_password').post((req, res) => {
    return res.status(200).send('DO FORGET HERE !');
});

module.exports = router;