const http = require('http');
const express = require('express');
const path = require('path');
const app = express();
const server = http.createServer(app);

const nodeEnv = (process.env.NODE_ENV)?process.env.NODE_ENV:'development'
if(nodeEnv !== 'production') {
    console.log('Dev stuff');
}
const hostName = '127.0.0.1';
const port = '8080';


app.use(express.static(path.join(__dirname, 'client/build')))

app.get('/', (req, resp) => {
    resp.send('Hello world!')
})

app.use((req, resp, next) => {
    const err = new Error('Not found!');
    err.status = 400;
    next(err);
})

app.use((err, req, resp) => {
    resp.locals.message = err.message;
    resp.status(err.status || 500);
    resp.send('Error');
})

server.listen(port, hostName, () => {
    console.log(`Node server running at http://${hostName}:${port}/!`)
})