
var cl = require("chrome-launch");

cl("http://localhost:3000",[
    '--user-data-dir=C:\\TempChrome',
    '--disable-web-security',
    '--remote-debugging-port=9222',
    '--test-type',
    '--incognito'
]);
