const app = require("../../app");
const request = require("supertest");

describe('GET /user는', () => {
    it('....', (done) => {
        request(app)
            .get('/userss')
            .end((err, res) => {
                console.log(res.body)
                done();
            })
    })
});