const request = require("supertest");
const should = require("should");

const app = require("../../app");
const db = require("../../Models");

//only를 사용 해서 해당 케이스만 실행 시킬 수도 있다.
describe('GET /user는', () => {

    describe('성공시', () => {
        const users = [{name:"Jin"},{name:"Kelly"},{name:"Holy"}]
        before(() => db.sequelize.sync({force:true}))
        before(()=>db.user.bulkCreate(users));

        it('유저 객체를 담은 배열로 응답한다.', (done) => {
            request(app)
                .get('/user')
                .end((err, res) => {
                    res.body.should.be.instanceOf(Array);
                    done();
                })
        });

        it('최대 limit갯 수 만큼 응답한다', (done) => {
            request(app)
                .get('/user?limit=2')
                .end((err, res) => {
                    res.body.should.have.lengthOf(2)
                    done();
                })
        });
    });

    describe('실패시', () => {
        it('limit이 숫자형이 아닐경우 400을 응답한다.', (done) => {
            request(app)
                .get('/user?limit=two')
                .expect(400)
                .end(done)
        })
    })

});
describe('GET /user/:id 는', () => {
    const users = [{name:"Jin"},{name:"Kelly"},{name:"Holy"}]
    before(() => db.sequelize.sync({force:true}))
    before(()=>db.user.bulkCreate(users));
    describe('성공시', () => {
        it('id가 1인 유저 정보객체를 반환한다.', (done) => {
            request(app)
                .get('/user/1')
                .end((err, res) => {
                    res.body.should.have.property('id', 1);
                    done();
                });
        })
    });


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
        });
    });
});

describe('DELETE /user/:id 는', () => {
    const users = [{name:"Jin"},{name:"Kelly"},{name:"Holy"}]
    before(() => db.sequelize.sync({force:true}))
    before(()=>db.user.bulkCreate(users));

    describe('성공시', () => {
        it('204를 응답한다. ', (done) => {
            request(app)
                .delete('/user/1')
                .expect(204)
                .end(done)
        });
    });
    describe('실패시', () => {
        it('id가 숫자가 아닌경우 400으로 응답한다.', (done) => {
            request(app)
                .delete('/user/one')
                .expect(400)
                .end(done)
        })
    })
});
describe('POST /user는', ()=>{
    const users = [{name:"Jin"},{name:"Kelly"},{name:"Holy"}];
    before(() => db.sequelize.sync({force:true}));
    before(()=>db.user.bulkCreate(users));

    describe('성공시', ()=>{
        let body,
            name="GeonilJang";
        before(done=>{
            request(app)
                .post('/user')
                .send({name})
                .expect(201)
                .end((error, res)=>{
                    body=res.body;
                    done();
                })
        });

       it('생성된 유저 객체를 반환한다.', ()=>{ //done은 비동기 테스트 일 경우에만 넣어 준다.
          body.should.have.property('id');
       });
       it('입력한 name을 반환한다.', ()=>{
           body.should.have.property('name',name)
       })

    });
    describe('실패시', ()=>{
        it("name 파라미터 누락시 400을 반환 한다.", (done)=>{
            request(app)
                .post("/user")
                .send({})
                .expect(400)
                .end(done)
        });
        it("name이 중복일 경우 409를 반환한다.", (done)=>{
            request(app)
                .post("/user")
                .send({name:"Jin"})
                .expect(409)
                .end(done)
        });
    });
});

describe('PUT /user/1', () => {
    const users = [{name:"Jin"},{name:"Kelly"},{name:"Holy"}];
    before(() => db.sequelize.sync({force:true}));
    before(()=>db.user.bulkCreate(users));

    describe("성공시...", ()=>{

        it('사용자 정보를 업데이트 합니다...', done => {
            const name = "GeonilJang";
           request(app)
               .put('/user/2')
               .send({name})
               .expect(200)
               .end((err, res) => {
                   res.body.should.have.property('name',name);
                   done();
               })
        });
    });


    describe("실패시...", ()=>{
        it("정수가 아닌 id일 경우 400을 응답한다.", done=>{
            request(app)
                .put("/user/one")
                .expect(400)
                .end(done)
        });
        it('name이 없을 경우 400을 응답한다.', done=>{
            request(app)
                .put("/user/3")
                .send({})
                .expect(400)
                .end(done)
        });
        it('없는 유저일 경우 404를 응답한다.', done=>{
            request(app)
                .put("/user/5")
                .send({name:"dummy"})
                .expect(404)
                .end(done);
        });
        it('이름이 중복을 영우 409를 응답한다.', done=>{
            request(app)
                .put("/user/1")
                .send({name:"Holy"})
                .expect(409)
                .end(done)
        })

    })

});









