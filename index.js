var store = require('store');

module.exports = rrd;

function ensureListed(db_name) {
    var list = rrd.list();
    if (list.indexOf(db_name) === -1) {
        store.set('__rrd__', list.concat([db_name]));
    }
}

function cullInterval(existing, interval) {
    var ago = +new Date() - interval;
    return existing.filter(function(e) {
        return e.time > ago;
    });
}

function rrd(db_name) {
    var existing = store.get(db_name) || [],
        db = {},
        size = Infinity,
        interval = Infinity;

    ensureListed(db_name);

    db.add = function(value, when) {
        value = value || 0;
        when = +when || +new Date();
        existing.push({
            time: when,
            value: value
        });
        if (existing.length > size) existing.pop();
        existing = cullInterval(existing, interval);
        store.set(db_name, existing);
        return db;
    };

    db.size = function() {
        if (!arguments.length) return size;
        size = arguments[0];
        return db;
    };

    db.interval = function() {
        if (!arguments.length) return interval;
        interval = arguments[0];
        return db;
    };

    db.all = function() {
        return store.get(db_name);
    };

    return db;
}

rrd.clear = function() {
    var existing = store.get('__rrd__');
    if (existing) existing.forEach(function(e) {
        store.remove(e);
    });
    store.set('__rrd__', []);
    return rrd;
};

rrd.list = function() {
    return store.get('__rrd__') || [];
};
