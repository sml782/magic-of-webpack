const qiniu = require('qiniu');
const path = require('path');
// https://developer.qiniu.com/kodo/sdk/1289/nodejs
require('dotenv').config();

const defaultAccessKey = process.env.accessKey;
const defaultSecretKey = process.env.secretKey;
class UploadPlugin {
  constructor(options) {
    this.options = options || {};
  }

  apply(compiler) {
    // 在webpack把产出的文件写入硬盘后
    compiler.hooks.afterEmit.tap('UploadPlugin', (compilation) => {
      // 把本次编译产出的文件上传到七牛上
      const { assets } = compilation;
      // html不需要强缓存的,是需要放在自己的服务器上,不需要缓存,
      const promises = Object.keys(assets).filter(item => !item.includes('.html')).map(this.upload.bind(this));
      Promise.all(promises).then((err, data) => console.log(err, data));
    });
  }

  upload(filename) {
    return new Promise((resolve, reject) => {
      const {
        bucket = 'cnpmjs',
        accessKey = defaultAccessKey,
        secretKey = defaultSecretKey,
      } = this.options;
      const mac = new qiniu.auth.digest.Mac(accessKey, secretKey);
      const options = {
        scope: bucket,
      };

      const putPolicy = new qiniu.rs.PutPolicy(options);
      const uploadToken = putPolicy.uploadToken(mac);
      const config = new qiniu.conf.Config();

      const localFile = path.resolve(__dirname, '../dist', filename);
      const formUploader = new qiniu.form_up.FormUploader(config);
      const putExtra = new qiniu.form_up.PutExtra();
      formUploader.putFile(
        uploadToken,
        filename,
        localFile,
        putExtra,
        (err, body, info) => {
          err ? reject(err) : resolve(body);
        },
      );
    });
  }
}

module.exports = UploadPlugin;
