console.time('startup');

require('dotenv').config();

const express = require('express');
const cors = require('cors');

const {testRouter} = require('./testController');

const app = express();


app.use(cors());
app.use(express.json());

//Route

app.use('/test', testRouter);

const port = Number(process.env.SERVER_PORT);

app.listen(port, () => {
    console.log(`Server listen on ${port}`);
    console.timeEnd('startup');
});
