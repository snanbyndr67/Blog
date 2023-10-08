const moment = require('moment')
const momentr = require('../node_modules/moment/locale/tr')



  module.exports = {
    generateDate : (date, format) => {
        moment.locale('tr');
        return moment(date).format(format)
        
    }
  }

  ///./node_modules/moment/locale/tr