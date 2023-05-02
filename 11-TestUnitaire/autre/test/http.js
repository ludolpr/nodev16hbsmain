// https://www.coingecko.com/fr/api/documentation

const assert = require('assert');
const axios = require('axios')

// URL
const baseURL = "https://api.coingecko.com/api/v3"
// route
const coinsInfo = (id) => "/coins/" + id 
const searchInfo = (params) => "/search?query=" + params

describe('API', function () {

    describe('Test API', function () {

        it('ping', async function () {
            const res = await axios.get(baseURL + '/ping');
            assert.equal(typeof res.data, typeof {});
        });

        it('coins/:id', async function () {
            let params = "bitcoin";
            const res = await axios.get(baseURL + coinsInfo(params));
            assert.equal(res.data.id, params);
            assert.equal(typeof res.data, typeof {});
        });

        it('search?query=params', async function () {
            this.timeout(3500);
            let params = "arrr";
            const res = await axios.get(baseURL + searchInfo(params));
            // console.log('search', res.data)
            assert.equal(typeof res.data, typeof {});
        });

    });
});
