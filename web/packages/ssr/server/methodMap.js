'use strict'

const fs = require('fs');
const path = require('path');

/**
 * method map
 *
 * @returns {Object}
 */
module.exports = {
  'GET':function get(reqUrl){
    return new Promise(function(resolve, reject){
      const filePath = path.join(__dirname, '../src', reqUrl);
      fs.access(filePath, function(err){
          if(err){
            defaultFile(resolve, reject)
          }else{
            fs.stat(filePath, function(statErr, stat){
              const isDir = stat.isDirectory()
              try {
                if (isDir) {
                  defaultFile(resolve, reject)
                }else{
                  rdf(filePath, resolve)
                }
              } catch (e) {
                reject()
              }
            })
          }
      })
    })
  },
};

function defaultFile(resolve, reject){
    try {
      rdf(path.resolve(__dirname, '../src/index.html'), resolve)
    } catch (e) {
      reject()
    }
}

function errFn(fn, err){
  fn.call(null, err)
}

function rdf(ph, cb){
  fs.readFile(ph, function(err, data){
    /* eslint-disable */
    if(err){
      errFn(cb, err)
    }else{
      cb(data)
    }
  });
}

