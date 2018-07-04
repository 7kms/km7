const isProduction = process.env.NODE_ENV === 'production'

const base = {}

const dev = {
    port: 6802
}

const prod = {
    port: 6902
}


const finallyConfig = isProduction ? Object.assign({},base,prod) : Object.assign({},base,dev)
console.log(finallyConfig)
export default finallyConfig