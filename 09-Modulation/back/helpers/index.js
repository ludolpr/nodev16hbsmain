const moment = require('moment-timezone');
const frLocal = require('moment/locale/fr');

exports.limit = function (ar, max) {
    let db = ar.slice(0, max);
    return db;
}

exports.ifCheck = function (a, b, opts) {
    if (a == b) {
        return true;
    } else {
        return false;
    }
}

exports.formDate = function (datetime, format) {
    if (moment) {
        moment.updateLocale('fr', frLocal);
        let time1 = moment(datetime).tz("Europe/Paris").format(format)
        return time1
    } else {
        return datetime;
    }
}

exports.formDateFromNow = function (datetime, format) {
    if (moment) {
        moment.updateLocale('fr', frLocal);
        let time2 = moment(datetime).fromNow()
        return time2
    } else {
        return datetime;
    }
}
