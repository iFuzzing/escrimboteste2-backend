const {logAllRequests} = require('./Middleware/Logs/reqLogs.js');
const router = require('./Routes/root.js');
const express = require('express');
const cors = require('cors');

const app = express();

app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(logAllRequests);
app.use(cors({credentials: true, origin: [`${process.env.FRONTEND_URL}` ,'http://localhost', 'http://127.0.0.1']}));

app.use((err, req, res, next) => {
    if (err instanceof SyntaxError && err.status === 400 && 'body' in err) {
        return res.status(400).send({"mensagem": err.message }); // Bad request
    }
    next();
});

app.use('/', router);

module.exports = app;