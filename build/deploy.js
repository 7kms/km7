const {spawnSync} = require('child_process');
const pathConfig  = require('./pathConfig');

const source_path = pathConfig.clientOutput;

const dest_path = '/data/7km/static'
spawnSync('mkdir',['-p', dest_path])
spawnSync('cp',['-r', source_path, dest_path])
