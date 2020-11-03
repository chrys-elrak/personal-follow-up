const router = require('express').Router();
const adminRoute = require('../../admin/routes/index');
const personalRoute = require('../../personal/routes/index');

router.use('/admin', adminRoute);
router.use('/personal', personalRoute);

module.exports = router;