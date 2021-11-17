const {Router} = require('express');
const os = require('os');

const testRouter = Router();

testRouter.get('/', (req, res) => {
    res.json({
        version: version(),
        hostname: hostname(),
        configEnv1: configEnv1(),
        secretEnv1: secretEnv1(),
    });
});

testRouter.get('/version', (req, res) => {
    res.send();
});

testRouter.get('/hostname', (req, res) => {
    res.send(hostname());
});

testRouter.get('/configEnv1', (req, res) => {
    res.send(configEnv1());
});

testRouter.get('/secretEnv1', (req, res) => {
    res.send(secretEnv1());
});

const version = () => 'v0.0.1';
const hostname = () => os.hostname();
const configEnv1 = () => process.env.CONFIG_ENV1;
const secretEnv1 = () => process.env.SECRET_ENV1;


module.exports = {
    testRouter
}
