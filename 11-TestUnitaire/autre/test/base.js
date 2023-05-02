const assert = require('assert');
const { addition, limitStr } = require('../utils')

const test = {
    name: "bruno",
    users: ['André', 'Philippe']
}

describe('Base', function () {

    describe('Test Base', function () {

        it('test', function () {
            assert.equal(2 + 2, 4);
        });

        it('concaténation', function () {
            assert.equal("2" + 2 , "22");
        });

        it('should return -1 when the value is not present', function () {
            assert.equal([1, 2, 3].indexOf(4), -1);
        });

        it('test.name est un string', function () {
            assert.equal(typeof test.name, typeof "");
        });

        it('test.users est un array', function () {
            assert.equal(typeof test.users, typeof []);
        });

        it('Addition', function () {
            assert.deepEqual(addition(4, 4), 4 + 4);
        });

        it('limit string', function () {
            assert(limitStr(test.name, 4).length <= 4  );
        });

    });
});
