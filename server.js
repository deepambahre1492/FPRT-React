
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const path = require('path');
const cloudinary = require('cloudinary').v2;
const dotenv = require('dotenv');
dotenv.config({path: './.env'});
require("./config/database");
const authRouter = require('./routes/auth');

//CLOUDINARY CONFIG
cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUD_API_KEY,
    api_secret: process.env.CLOUD_API_SECRET
})


const app = express();



//MIDDLEWARES
app.use(cors());
if (process.env.NODE_ENV === 'development'){
    app.use(morgan('dev'));
}
app.use(bodyParser.urlencoded({
    extended:false
}));
app.use(bodyParser.json());


//Serve Static File
app.use('/images' , express.static(path.join(__dirname, 'public', 'images')));
app.use('/profile-pic' , express.static(path.join(__dirname, 'public', 'profilePic')));



//ROUTES
app.use('/auth', authRouter);




if (process.env.NODE_ENV === 'production'){
    app.use(express.static('client/build'));

    app.get('*', (req, res) => {
        res.sendFile(path.join(__dirname, 'client', 'build', 'index.html'));
    })

}


const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log('server listening on port ', PORT);
});