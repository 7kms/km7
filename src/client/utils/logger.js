export default (() =>{
    if(typeof logger !== 'undefined'){
        if(typeof window !== 'undefined'){
            window.console = logger
        }else{
            global.console = logger
        }
    }
})()