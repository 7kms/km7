const isProduction = process.env.NODE_ENV === 'production'

const base = {
    mongo: {
        port: 27017,
        host: '127.0.0.1'
    }
}

const dev = {
    port: 6802,
    mysql: {
        host     : 'localhost',
        user     : 'root',
        password : '111111',
        database : 'km7test'
    },
    redis:{
        host: 'localhost',
        port: 6379
    },
    redis_key_prefix: 'km7test_'
}

const prod = {
    port: 6902,
    mysql: {
        host     : 'localhost',
        user     : 'root',
        password : '111111',
        database : 'km7'
    },
    redis:{
        host: 'localhost',
        port: 6380
    },
    redis_key_prefix: 'km7_'
}

const finallyConfig = isProduction ? Object.assign({},base,prod) : Object.assign({},base,dev)
// console.log(finallyConfig)
export default finallyConfig