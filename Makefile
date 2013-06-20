all: web-rrd.js

web-rrd.js: index.js package.json
	browserify -s rrd index.js > web-rrd.js
