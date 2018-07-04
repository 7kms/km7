// const styleLoaderRule = require.resolve('style-loader')
const cssHotLoader = require.resolve('css-hot-loader')
const lessLoaderRule = require.resolve('less-loader')
// const isomorphicStyleLoader = require.resolve('isomorphic-style-loader')
const MiniCssExtractPlugin = require("mini-css-extract-plugin")

const cssLoaderRule = {
    loader: require.resolve('css-loader'),
    options: {
      modules: true,
      importLoader: true,
      localIdentName: '[local]-[hash:base64:6]'
    }
}

const postcssLoaderRule = {
    loader: require.resolve('postcss-loader'),
    options: {
      ident: 'postcss',
      plugins: () => [
        require('autoprefixer')({
          browsers: [
            '>10%',
            'last 99 versions',
            'Firefox ESR',
            'not ie < 9', // React doesn't support IE8 anyway
          ]
        })
      ]
    }
}

const getRegularExpressionByType = (type)=>{
    let reg = ''
    switch (type){
        case 'css':
            reg = /\.css$/;
            break;
        case 'less':
            reg=/\.less$/;
            break;
        default: 
            reg = /\.css$/
    }
    return reg;
}


const getLoaderRulesByType = (type)=>{
    const useArr = [cssHotLoader,MiniCssExtractPlugin.loader,cssLoaderRule,postcssLoaderRule]
    switch (type){
        case 'css':
            break;
        case 'less':
            useArr.push(lessLoaderRule)
            break;
    }
    return useArr;
}


const generateRuleModule = (type, isServerSide) => {
    const obj = {
        test: getRegularExpressionByType(type),
        use : getLoaderRulesByType(type)
    }
    // if(isServerSide){
    //     obj.use.splice(0,1)
    // }
    
    return obj;
}

module.exports = (isServerSide) => {
    let bassArr = ['css','less']


    return bassArr.map(item => {
        return generateRuleModule(item,isServerSide)
    })
}
