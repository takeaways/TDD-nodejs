const request = require("supertest");
const should = require("should");
const app = require("../../app");

describe('GET /user는', () => {

    describe('성공시', () => {

        it('유저 객체를 담은 배열로 응답한다.', (done) => {
            request(app)
                .get('/user')
                .end((err, res) => {
                    res.body.should.be.instanceOf(Array)
                    done();
                })
        })

        it('최대 limit갯 수 만큼 응답한다', (done) => {
            request(app)
                .get('/user?limit=2')
                .end((err, res) => {
                    res.body.should.have.lengthOf(2)
                    done();
                })
        })

    })

    describe('실패시', () => {
        it('limit이 숫자형이 아닐경우 400을 응답한다.', (done) => {
            request(app)
                .get('/user?limit=two')
                .expect(400)
                .end(done)
        })
    })

});


describe('GET /user/1은', () => {

    describe('성공시', () => {

        it('id가 1인 유저 정보객체를 반환한다.', (done) => {
            request(app)
                .get('/user/1')
                .end((err, res) => {
                    res.body.should.have.property('id', 1);
                    done();
                })
        })

    })


    describe('실패시', () => {

        it('id가 숫자가 아닌경우', (done) => {
            request(app)
                .get('/user/one')
                .expect(400)
                .end(done)
        });

        it('id로 유저를 찾을 수 없을 경우', (done) => {
            request(app)
                .get('/user/99')
                .expect(404)
                .end(done)
        })

    })
});


describe('DELETE /user/1은', () => {
    describe('성공시', ()=>{
        it('204를 응답한다. ', (done)=>{
            request(app)
                .delete('/user/1')
                .expect(204)
                .end(done)
        });
    });

    describe('실패시', ()=>{
        it('id가 숫자가 아닌경우 400으로 응답한다.', (done) => {
            request(app)
                .delete('/user/one')
                .expect(400)
                .end(done)
        })
    })


});













