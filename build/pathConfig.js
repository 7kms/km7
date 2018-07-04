const path = require('path')

const resolve = (url)=>{
    return path.resolve(__dirname,url)
}
module.exports = {
    appSrc: resolve('../src'),
    staticPublicPath: '/static',
    clientOutput: resolve('../__build__client__output__'),
    clientEntry: resolve('../src/client/client-entry.js'),
    serverOutput: resolve('../__build__server__output__'),
    serverEntry: resolve('../src/client/server-entry.js'),
    htmlTemplate: resolve('../src/client/template/index.html')
}