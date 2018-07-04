function requireFromString(src, filename='test.js') {
    var Module = module.constructor;
    var m = new Module();
    m._compile(src,filename);
    return m.exports;
}
console.log(requireFromString('module.exports = { test: 1}','test.js'));