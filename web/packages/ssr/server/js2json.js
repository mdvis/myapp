'use strict'

/**
 * js2json
 *
 * @returns {undefined}
 */
module.exports = function js2json(){
  const tmp = []
  return function jsonC(j){
    return JSON.stringify(j, function(k,v){
      if(typeof v === 'object'){
        if(tmp.includes(v)){
          return null
        }
        tmp.push(v)
        return v
      }
      return v
    })
  }
}

