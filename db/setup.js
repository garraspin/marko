// Code from Marklogic University

var Promise = require('bluebird');
var path = require('path');
var request = Promise.promisify(require("request"));

var baseURL = 'http://localhost:8002';

var restConfig = {
    "rest-api": {
        "name": "marko-api",
        "group": "Default",
        "database": "marko-db",
        "modules-database": "marko-db-modules",
        "port": "6000",
        "forests-per-host": 1
    }
};

function getAuth() {
    return {
        user: 'admin',
        password: 'admin',
        sendImmediately: false
    };
}

function applyConfig(path, method, config) {
    return request(
        {
            url: baseURL + path,
            method: method,
            auth: getAuth(),
            headers: {'Content-type': 'application/json'},
            json: config
        });
}

function checkForAppServer(restConfig) {
    return request({
        url: baseURL + '/v1/rest-apis/' + restConfig['rest-api'].name,
        auth: getAuth()
    });
}

function bootstrap() {
    checkForAppServer(restConfig)
        .then((response) => {
            if (response.statusCode === 404) {
                console.log('Creating App server.');
                return applyConfig('/v1/rest-apis', 'POST', restConfig);
            } else if (response.statusCode === 200) {
                console.log('App server already setup; skipping');
            } else {
                throw { errorResponse: { statusCode: response.statusCode, message: response.message } };
            }
        }).catch((error) => {
                if (typeof error.errorResponse !== 'undefined') {
                    console.log('Setup failed: ' + error.errorResponse.statusCode + '; ' + error.errorResponse.message);
                } else {
                    console.log('Setup failed: ' + error);
                }
            })
        .done(() => console.log('Bootstrap complete.'));
}

function wipe() {
    console.log('Removing application server and the databases.');
    applyConfig('/v1/rest-apis/' + restConfig['rest-api'].name + '?include=content&include=modules', 'DELETE', null)
        .catch((error) =>
            console.log('Wipe failed: ' + error.errorResponse.statusCode + '; ' + error.errorResponse.message)
        );
}

switch (process.argv[2]) {
    case 'bootstrap':
        bootstrap();
        break;
    case 'wipe':
        wipe();
        break;
    default:
        console.log('Usage: ' + process.argv[0] + ' ' + path.relative('.', process.argv[1]) + ' [bootstrap|wipe]');
}
