const request = require('supertest');
const {
    Category
} = require('../../models/category');
const {
    User
} = require('../../models/user')
const mongoose = require('mongoose');

let server;

describe('/api/category', () => {
    beforeEach(() => {
        server = require('../../index');
    })
    afterEach(async () => {
        server.close();
        await Category.remove({});
    });

    describe('GET /', () => {
        it('should return all category', async () => {
            Category.collection.insertMany([{
                    categoryName: 'category1'
                },
                {
                    categoryName: 'category2'
                },
            ]);
            const res = await request(server).get('/api/category');
            expect(res.status).toBe(200);
            expect(res.body.length).toBe(2);
            expect(res.body.some(g => g.categoryName === 'category1')).toBeTruthy();
            expect(res.body.some(g => g.categoryName === 'category2')).toBeTruthy();

        })

    });

    describe('GET /:id', () => {
        it('should return a category if valid is passed', async () => {
            const category = new Category({
                categoryName: 'category1'
            });
            await category.save();

            const res = await request(server).get('/api/category/' + category._id);

            expect(res.status).toBe(200);
            expect(res.body).toHaveProperty('categoryName', category.categoryName);
        });

        it('should return 404 if invalid id is passed', async () => {

            const res = await request(server).get('/api/category/1');

            expect(res.status).toBe(404);
        })
        it('should return 404 if no category with given id exists', async () => {

            const id = mongoose.Types.ObjectId();
            const res = await request(server).get('/api/category/' + id);

            expect(res.status).toBe(404);
        })
    })

    describe('POST /', () => {

    // One parameter clearly signs wih the name
    let token;
    let categoryName;

        const exec =async () => {
            return await request(server)
                .post('/api/category')
                .set('x-auth-token', token)
                .send({categoryName});
        }

        beforeEach(()=> {
            token = new User().generateAuthToken();
            categoryName = 'category1'
        })

        it('should return 401 if client is not logged in', async () => {
            
            token =''
            const res = await exec();


            expect(res.status).toBe(401);

        })

        it('should return 400 if category is less than 5', async () => {
            categoryName = '1234';

            const res = await exec();

            expect(res.status).toBe(400);

        })
        it('should return 400 if category is more 50 characters', async () => {

            categoryName = new Array(52).join('a')

            const res = await exec();


            expect(res.status).toBe(400);

        })
        it('should save the category if it is valid', async () => {

             await exec();

            const category = await Category.find({categoryName:"category1"})

            expect(category).not.toBeNull();

        })
        it('should return the category if it is valid', async () => {
            const token = new User().generateAuthToken();

            const res = await exec();


            expect(res.body).toHaveProperty('_id');
            expect(res.body).toHaveProperty('categoryName', 'category1');
        })
    })
});