const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');
// const mongoose = require('mongoose');
// const multer = require('multer');

const igRoutes = require('./routes/instagram');

const app = express();
// const morgan = require('morgan');
// app.use(morgan('dev'));

// const fileStorage = multer.diskStorage({
//     destination: (req, file, cb) => {
//         cb(null, 'images');
//     },
//     filename: (req, file, cb) => {
//         cb(null, new Date().toISOString() + '-' + file.originalname);
//     }
// });

// const fileFilter = (req, file, cb) => {
//     if (
//         file.mimetype === 'image/png' ||
//         file.mimetype === 'image/jpg' ||
//         file.mimetype === 'image/jpeg'
//     ) {
//         cb(null, true);
//     } else {
//         cb(null, false);
//     }
// };

// app.use(bodyParser.urlencoded()); // x-www-form-urlencoded <form>
app.use(bodyParser.json()); // application/json
// app.use(
//     multer({ storage: fileStorage, fileFilter: fileFilter }).single('image')
// );
// app.use('/images', express.static(path.join(__dirname, 'images')));

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader(
        'Access-Control-Allow-Methods',
        'OPTIONS, GET, POST, PUT, PATCH, DELETE'
    );
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
});

app.use('/instagram', igRoutes);

app.use((error, req, res, next) => {
    console.error(error);
    // console.log(error);
    const status = error.statusCode || 500;
    const message = error.message;
    const data = error.data;
    res.status(status).json({ message: message, data: data });
});

const port = 8080 || process.env.PORT;
app.listen(port);