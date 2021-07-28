//sanity check
console.log("-----------------------------------------");
console.log(" controller > app.js");
console.log("-----------------------------------------");

//------------------------------------------------------------
// imports
//------------------------------------------------------------

const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const app = express();
const game = require('../game');



//------------------------------------------------------------
// Middleware
//------------------------------------------------------------
var printDebugInfo = function (req, res, next) {
    console.log();
    console.log("-----------[ Debug Info ]-------------");

    console.log("> req.params: " + JSON.stringify(req.params));
    console.log("> req.body: " + JSON.stringify(req.body));

    console.log("-----------[ Debug Info ]-------------");
    console.log();

    next();
};
app.use(express.urlencoded({ extended: true }));
app.use(express.json())

//------------------------------------------------------------
// MF Configurations
//------------------------------------------------------------
app.options("*", cors());
app.use(cors());

//------------------------------------------------------------
// End points
//------------------------------------------------------------

app.get('/', function (req, res, next) {
    return res.json({
        Hello: "Game_FPS",
        APIs: {
            'Login': {
                description: 'Logs user in',
                method: 'GET',
                path: '/',
                queries: {
                    email:
                        'Email already registered',
                    password: 'password already registered',
                },
            },
            'Register': {
                method: 'POST',
                path: '/:sessionId',
            },

        },
    });
});

app.post('/init', function (req, res, next) {
    return game.init()
        .then(function () {
            return res.sendStatus(200);
        })
        .catch(next);
});

app.post('/register', function (req, res, next) {
    const email = req.body.email;
    const password = req.body.password;

    return game.createUser(email, password)
        .then(function () {
            return res.json({ email: email });
        })
        .catch(next);
});

app.post('/login', function (req, res, next) {
    const email = req.body.email;
    const password = req.body.password;
    console.log(game);
    return game.getUser(email, password)
        .then(function () {
            console.log("hi")
            return res.json({
                email: email,
                password: password
            });
            
        }) .then(function () {
            
            var message = {
                "email":email,
                "password":password
            };
            res.status(200).send(message)
            console.log(message);
            
        })
        .catch(next);
});


app.use((req, res, next) => next(createHttpError(404, `Unknown resource ${req.method} ${req.originalUrl}`)));

app.use(function (err, req, res, next) {
    console.error(err);
    const status = err.status || 500;
    const message = err.message || 'Unknown Error!';
    return res.status(status).json({
        error: message,
    });
});

const port = process.env.PORT || 3000;
app.listen(port, function () {
    console.log('App is listening to port ' + port);
});

//postgres://bzrwsdluzcppgl:c1f5702744c7cda0e957ae62c042b9a8b4bbbf34d64b64a261bc2a83657d3112@ec2-52-45-183-77.compute-1.amazonaws.com:5432/dccqmku3jnbbf5