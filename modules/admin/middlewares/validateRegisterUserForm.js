const userSchema = require('../../common/schema/user');

module.exports = (req, res, next) => {
    const valid = userSchema.validate(req.body);
    if (valid.error) {
        return res.status(400).send(valid.error.details[0].message);
    }
    req.body.value = valid.value;
    next();
};