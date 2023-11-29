import app from '../src/app';
import { ITodoWithId, TodoModel } from '../src/models/todo.model';
import connectToMongoDB from '../src/database/connect';
// import request = require('supertest');
import * as request from 'supertest';
import { ObjectId } from 'mongodb';
import mongoose from 'mongoose';

type ErrorObject = {
  fieldName: string;
  errorMessage: string;
};
type ErrorResponse = {
  message: Array<ErrorObject>;
  stack: string;
};

// const db = await connectToMongoDB();
let db: typeof mongoose;
beforeAll(async () => {
  try {
    db = await connectToMongoDB();
    await TodoModel.deleteMany({});
  } catch (error) {}
});

// afterAll(async () => {
//   try {
//     // const db = await connectToMongoDB();
//     await db.disconnect();
//   } catch (error) {
//     console.log(error);
//   }
// });

describe('GET /api/v1/todos', () => {
  it('should return todos with 200 response', async () =>
    request(app)
      .get('/api/v1/todos')
      .set('Content-type', 'Application/json')
      .expect('Content-type', /json/)
      .expect(200)
      .then((response: { body: Array<ITodoWithId> }) => {
        expect(response.body).toHaveProperty('length');
        expect(response.body.length).toEqual(0);
      }));
});

let id: ObjectId;
describe('POST api/v1/todos', () => {
  describe('when todo is valid', () => {
    it('then it should create a valid todo and send the response', async () =>
      request(app)
        .post('/api/v1/todos')
        .send({
          title: 'First Todo ever',
          description: 'This is a valid test todo',
          user: 'Isuru Maldeniya',
        })
        .set('Content-type', 'Application/json')
        .expect('Content-type', /json/)
        .expect(200)
        .then((response: { body: Record<string, ITodoWithId> }) => {
          id = response.body.payload._id;
          expect(response.body).toMatchObject({
            payload: {
              title: 'First Todo ever',
              description: 'This is a valid test todo',
              user: 'Isuru Maldeniya',
            },
          });
        }));
  });

  describe('when todo is invalid', () => {
    it('then it should not create a valid todo and send the error response', async () =>
      request(app)
        .post('/api/v1/todos')
        .send({
          title: 11,
          description: 'This is a valid test todo',
          user: 'Isuru Maldeniya',
        })
        .set('Content-type', 'Application/json')
        .expect('Content-type', /json/)
        .expect(422)
        .then((response: { body: ErrorResponse }) => {
          expect(response.body).toHaveProperty('message');
          expect(response.body.message[0].fieldName).toBe('title');
        }));
  });

  describe('GET /api/v1/todos/:id', () => {
    describe('when the id is valid', () => {
      it('it should get the todo with 200', () => {
        request(app)
          .get(`/api/v1/todos/${id}`)
          .set('Accept', 'Application-json')
          .expect('Content-type', /json/)
          // .expect(200)
          .then((response: { body: ITodoWithId }) => {
            expect(response.body).toMatchObject({
              title: 'First Todo ever',
              description: 'This is a valid test todo',
              user: 'Isuru Maldeniya',
              done: false,
              __v: 0,
            });
          });
      });
    });
  });
});
