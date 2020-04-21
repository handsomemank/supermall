var path = require('path')
function resolve (dir) {
  console.log(__dirname)
  return path.join(__dirname, dir)
}

module.exports={
  chainWebpack:(config)=>{
      config.resolve.alias
        .set('@',resolve('./src'))
        .set('assets',resolve('./src/assets'))
        .set('components',resolve('./src/components'))
        .set('views',resolve('./src/views'))
        .set('network',resolve('./src/network'))
        .set('common',resolve('./src/common'))
        .set('store',resolve('./src/store'))　
  }
}