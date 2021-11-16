const {Router} = require('express');

const testRouter = Router();

testRouter.get('/version', (req, res) => {
    res.send('v0.0.1');
});

testRouter.get('/hostname', (req, res) => {
    const os = require('os');
    res.send(os.hostname());
});

testRouter.get('/configEnv1', (req, res) => {
    res.send(process.env.CONFIG_ENV1);
});

testRouter.get('/secretEnv1', (req, res) => {
    res.send(process.env.SECRET_ENV1);
});


module.exports = {
    testRouter
}
