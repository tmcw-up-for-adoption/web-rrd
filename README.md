## web-rrd

[![Greenkeeper badge](https://badges.greenkeeper.io/tmcw/web-rrd.svg)](https://greenkeeper.io/)

A round-robin database for browsers. Backed up by localStorage via store.
Configurable for fixed-size or interval expiration.

### install

with browserify

    npm install web-rrd

otherwise

    wget https://raw.github.com/tmcw/web-rrd/master/web-rrd.js

### api

```js
// get a certain named database
var callDb = rrd('my-key-name');

// list all databases
rrd.list();
// ['my-key-name']

// add a new data point at now
callDb.add(5);

// add a new data point one minute ago
callDb.add(5, (new Date()) - (1000 * 60));

// get all data points in that db
callDb.all();

// tell the db to remove any values after 100
callDb.size(100);
callDb.all();

// config what key the values are saved in db, default to 'value'
callDb.key('y');
callDb.all();

// tell the db to remove any values older than 1 minute
callDb.interval(1000 * 60);
```
