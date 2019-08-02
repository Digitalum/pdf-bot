var fs = require('fs');

var formData = require('form-data');

function createHtmlPostStorage(options = {}) {
  if (!options.url) {
   	throw new Error('url is missing')
  }

  return function postPdfToEndpoint (localPath, job) {
    return new Promise((resolve, reject) => {
	    console.log("Upload PDF on location '" + localPath + "' to '" + options.url + "'");
      var headerOptions =  job.meta || {}

      var form = new formData();
      form.append('file', fs.createReadStream(localPath));
      for(var i in headerOptions) {
          form.append(i, headerOptions[i])
      }

      form.submit(options.url, function(err, res) {
          res.resume();
          resolve(res);
      });
    })
  }
}

module.exports = createHtmlPostStorage
