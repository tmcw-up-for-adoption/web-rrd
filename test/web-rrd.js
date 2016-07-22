if (typeof require !== 'undefined') {
    expect = require('expect.js');
    happen = require('../');
}

describe('web-rrd', function() {
    describe('initialization', function() {
        it('is present', function() {
            expect(rrd).to.be.ok();
        });

        it('.clear', function() {
            expect(rrd.clear()).to.be.ok();
        });

        it('.list', function() {
            expect(rrd.clear()).to.be.ok();
            expect(rrd.list()).to.eql([]);
        });

        it('construct()', function() {
            expect(rrd('foo')).to.be.ok();
            expect(rrd.list()).to.eql(['foo']);
        });
    });

    describe('size', function() {
        it('.size()', function() {
            var bar = rrd('bar');
            expect(bar.size()).to.eql(Infinity);
            expect(bar.size(10)).to.eql(bar);
            expect(bar.size()).to.eql(10);
        });
    });

    describe('adding values', function() {
        it('.all', function() {
            rrd.clear();
            var foo = rrd('foo');
            foo.add(10);
            expect(foo.all()[0].value).to.eql(10);
        });

        it('limited by size', function() {
            rrd.clear();
            var foo = rrd('foo').size(10);
            var x = 1000;
            while (--x) foo.add(x);
            expect(foo.all().length).to.eql(10);
        });

        it('limited by time', function() {
            rrd.clear();
            var foo = rrd('foo').interval(60 * 60 * 1000);
            foo.add(1, new Date());
            foo.add(1, (+new Date()) - (60 * 60 * 1000 * 2));
            expect(foo.all().length).to.eql(1);
        });
    });

    describe('key', function() {
        it('.key()', function() {
            var bar = rrd('bar');
            expect(bar.key()).to.eql('value');
            expect(bar.key('y')).to.eql(bar);
            expect(bar.size()).to.eql('y');
        });
    });

});
