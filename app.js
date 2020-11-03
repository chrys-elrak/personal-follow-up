require('dotenv').config();
const DB = require('./modules/common/services/DatabaseService');
DB.connect();

const express = require('express');
const app = express();
const PORT = process.env.PORT || 5000;

require('./modules/common/services/PassportService');

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use('/api/v1', require('./modules/common/routes/index'));


// 404 Not found
app.all('*', (req, res) => {
    return res.status(404).send();
});

// Run server
app.listen(PORT, () => {
    console.log(`Server running on ${PORT}`);
});

process.on('SIGINT', function () {
    console.log("Caught interrupt signal");
    DB.close();
    process.exit();
});
