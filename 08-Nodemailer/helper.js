module.exports = {
    limit: function (ar, max) {
        let db = ar.slice(0, max);
        return db;
    },
    ifCheck: function (a, b, opts) {
        if (a == b) {
            return true;
        } else {
            return false;
        }
    },
}