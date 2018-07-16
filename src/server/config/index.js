const isProduction = process.env.NODE_ENV === 'production'

const base = {
    db: {
        host     : 'localhost',
        user     : 'root',
        password : '111111',
        database : 'km7'
    },
    redis:{
        host: 'localhost',
        port: 6379
    }
}

const dev = {
    port: 6802,
    db: {
        host     : 'localhost',
        user     : 'root',
        password : '111111',
        database : 'km7test'
    },
    redis:{
        host: 'localhost',
        port: 6379
    }
}

const prod = {
    port: 6902
}

const finallyConfig = isProduction ? Object.assign({},base,prod) : Object.assign({},base,dev)
// console.log(finallyConfig)
export default finallyConfig