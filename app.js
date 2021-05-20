if (process.env.NODE_ENV !== "production") {
    require('dotenv').config();
}

const express = require('express');
const mongoose = require('mongoose');
const passport = require('passport');
const session = require('express-session');
const methodOverride = require('method-override')

const app = express();


require('./config/passport')(passport);

mongoose.connect('mongodb://localhost:27017/oxenUser', {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database connected");
});



app.set('view engine', 'ejs');


app.use(express.urlencoded({ extended: true }));


app.use(
    session({
        secret: 'secret',
        resave: true,
        saveUninitialized: false
    })
);

app.use(passport.initialize());
app.use(passport.session());

app.use(methodOverride('_method'))



app.use('/', require('./routes/index.js'));
app.use('/users', require('./routes/users.js'));
app.use('/users/images', require('./routes/image.js'));



app.listen(3050, console.log(`Server running on  3050`));
