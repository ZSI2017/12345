require('../build/build.js')
module.exports = {
  NODE_ENV: '"production"',
  URL:'"http://sendexmng-sit.alipay-eco.com"',
  PRO:process.env&&process.env.PLAT == "PRO"
}
