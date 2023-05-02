import moment from 'moment-timezone';
import frLocal from 'moment/locale/fr.js';

export const limit = (ar, max) => {
    let db = ar.slice(0, max);
    return db;
}

export const ifCheck = (a, b) => {
    if (a == b) {
        return true;
    } else {
        return false;
    }
}

export const formDate = (datetime, format) => {
    if (moment) {
        moment.updateLocale('fr', frLocal);
        let time1 = moment(datetime).tz("Europe/Paris").format(format)
        return time1
    } else {
        return datetime;
    }
}

export const formDateFromNow = (datetime) => {
    if (moment) {
        moment.updateLocale('fr', frLocal);
        let time2 = moment(datetime).fromNow()
        return time2
    } else {
        return datetime;
    }
}