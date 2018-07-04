const logger = require('tracer').colorConsole({
    format : " <>  (in :)",
    dateformat : "HH:MM:ss.L"
})
module.exports = logger
// module.exports = (() =>{
//     if(typeof logger !== 'undefined'){
//         let master
//         if(typeof window !== 'undefined'){
//             master =window
//         }else{
//             master = global
//         }
//         master._console = master.console
//         delete master.console
//         master.console = logger
//     }
//     return logger
// })()
