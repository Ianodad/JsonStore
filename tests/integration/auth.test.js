const request = require('supertest');
const {User} = require('../../models/user')
const {Category} = require('../../models/category');

describe('auth middlware', () => {

    beforeEach(() => {
        server = require('../..');
    })
    afterEach(async () => {
        server.close();
        await Category.remove({})
    });

    let token;

    const exec = () => {
        return request(server)
            .post('/api/category')
            .set('x-auth-token', token)
            .send({
                name: 'category'
            });

    }

    beforeEach(() => {
        token = new User().generateAuthToken();

    })

    it('should return 401 if no token is provided', async () => {

        token = '';

        const res = await exec();

        expect(res.status).toBe(401);
    })
    it('should return 400 if no token is invalid', async () => {

        token = 'a';

        const res = await exec();

        expect(res.status).toBe(400);
    })

    // it('should return 200 if token is valid', async () => {
    //     const res = await exec();

    //     expect(res.status).toBe(200);
    // })
})