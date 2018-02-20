const http = require('http');
const express = require('express');
const path = require('path');
const logger = require('morgan');
const bodyParser = require('body-parser');
const cors = require('cors')
const app = express();
const server = http.createServer(app);

const nodeEnv = (process.env.NODE_ENV)?process.env.NODE_ENV:'development'
if(nodeEnv !== 'production') {
    console.log('Dev stuff');
}
const hostName = '127.0.0.1';
const port = '8080';

/*================================================*/
// Middleware
/*================================================*/
app.use(express.static(path.join(__dirname, 'client/build')));
app.use(logger('dev'));
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

/*================================================*/
// Routes
/*================================================*/
app.get('/', (req, resp) => {
    resp.send('Hello world!')
})

app.get('/hello', (req, resp) => {
    resp.json({
        "message": "Hello world!"
    })
})

app.get('/students', (req, resp) => {
    resp.json([
        {
            "name": "Billy",
            "lastname": "Billyson",
        },
        {
            "name": "Andy",
            "lastname": "Anderson",
        },
    ])
})

app.get('/students/:studentId', (req, resp) => {
    resp.json([
        {
            "name": "Billy",
            "lastname": "Billyson",
        },
    ])
})

app.get('/posts', (req, resp) => {
    resp.json([
        {
            "title": "Whut",
            "desc": "Hello world",
        },
        {
            "title": "Yeah",
            "desc": "Lolwut",
        },
    ])
})

app.get('/posts/:postId', (req, resp) => {
    resp.json([
        {
            "title": "Whut",
            "desc": "Lolwut",
        },
    ])
})

// app.use((req, resp, next) => {
//     const err = new Error('Not found!');
//     err.status = 400;
//     next(err);
// })

// app.use((err, req, resp) => {
//     resp.locals.message = err.message;
//     resp.status(err.status || 500);
//     resp.send('Error');
// })

server.listen(port, hostName, () => {
    console.log(`Node server running at http://${hostName}:${port}/!`)
})