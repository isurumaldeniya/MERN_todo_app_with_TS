import app from '../src/app';
import { ITodoWithId, TodoModel } from '../src/models/todo.model';
import connectToMongoDB from '../src/database/connect';
// import request = require('supertest');
import * as request from 'supertest';
import { ObjectId } from 'mongodb';

type ErrorObject = {
  fieldName: string;
  errorMessage: string;
};
type ErrorResponse = {
  message: Array<ErrorObject>;
  stack: string;
};

beforeAll(async () => {
  try {
    await connectToMongoDB();
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
});

describe('GET /api/v1/todos/:id', () => {
  describe('when the id is valid', () => {
    it('it should get the todo with 200', () => {
      request(app)
        .get(`/api/v1/todos/${id}`)
        .set('Accept', 'Application-json')
        .expect('Content-type', /json/)
        .expect(200)
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

  describe('when the id is in invalid format', () => {
    it('it should get an error response', () => {
      request(app)
        .get(`/api/v1/todos/123`)
        .set('Accept', 'Application-json')
        .expect('Content-type', /json/)
        .expect(422)
        .then((response: { body: object }) => {
          expect(response.body).toHaveProperty('message');
        });
    });
  });
  describe('when the id is not found', () => {
    it('it should get the error response with not found message', (done) => {
      request(app)
        .get(`/api/v1/todos/6566d20000e6eb32c9678027`)
        .set('Accept', 'Application-json')
        .expect('Content-type', /json/)
        .expect(404, done);
    });
  });
});

describe('DELETE /api/v1/todos', () => {
  describe('when delete todo is called with invalid id', () => {
    it('it should get an error response', (done) => {
      request(app)
        .delete(`/api/v1/todos/123`)
        .set('Accept', 'Application-json')
        .expect('Content-type', /json/)
        .expect(422, done);
    });
  });

  describe('when delete todo is called with wrong id', () => {
    it('it should get the error response with not found message', (done) => {
      request(app)
        .delete(`/api/v1/todos/6566d20000e6eb32c9678027`)
        .set('Accept', 'Application-json')
        .expect('Content-type', /json/)
        .expect(404, done);
    });
  });

  describe('when delete todo is called with valid id', () => {
    it('it should delete the todo and give the todo', (done) => {
      console.log(id)
      request(app)
        .delete(`/api/v1/todos/${id}`)
        .set('Accept', 'Application-json')
        .expect('Content-type', /json/)
        .expect(200, done)
        // .then((response: { body: ITodoWithId }) => {
        //   expect(response.body).toBe({});
        // });
    });
  });
});
