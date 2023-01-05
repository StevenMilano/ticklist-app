import request from 'supertest';

import app from '../../app';
import { ClimbEntries } from './climbEntry.model';

beforeAll(async () => {
  try {
    await ClimbEntries.drop();
  } catch (error) {}
});

describe('GET /api/v1/climb-entry', () => {
  it('responds with a array of climbs', async () => 
    request(app)
      .get('/api/v1/climb-entry')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200)
      .then((response) => {
        expect(response.body).toHaveProperty('length');
        expect(response.body.length).toBe(0);
      }),
  );
});

let id = '';
describe('POST /api/v1/climb-entry', () => {
  it('responds with an error if the entry is invalid', async () =>
    request(app)
      .post('/api/v1/climb-entry')
      .set('Accept', 'application/json')
      .send({
        content: '',
      })
      .expect('Content-Type', /json/)
      .expect(422)
      .then((response) => {
        expect(response.body).toHaveProperty('message');
      }),
  );
  it('responds with an inserted object', async () =>
    request(app)
      .post('/api/v1/climb-entry')
      .set('Accept', 'application/json')
      .send({
        indoorOutdoor: 'Outdoor',
        discipline: 'Boulder',
        climbStyle: {
          crimp: true,
          pinch: true,
          sloper: false,
          jug: true,
          slab: false,
          overhang: false,
          vert: true,
          compStyle: false,
          dynamic: true,
          static: true,
          complex: true,
          power: true,
          endurance: false,
          technical: false,
          compression: true,
          heady: false,
          faceClimbing: false,
          arete: false,
          dihedral: false,
          balance: false,
          layback: false,
          undercling: false,
          directional: false,
        },
        vScale: 'V4',
        attempts: 10,
        send: true,
        date: '2022-10-05T00:00:00.000Z',
        description: 'Really classic boulder at mt gretna, start on large pinch rail with a heel hook, and bump off very bad crimp to a larger hold. Then big moves to good holds to the top.',
        rating: 5,
        image: 'https://cdn2.apstatic.com/photos/climb/119274765_large_1595717656_topo.jpg',
      })
      .expect('Content-Type', /json/)
      .expect(201)
      .then((response) => {
        expect(response.body).toHaveProperty('_id');
        id = response.body._id;
        expect(response.body).toHaveProperty('indoorOutdoor');
        expect(response.body).toHaveProperty('discipline');
        expect(response.body).toHaveProperty('climbStyle');
        expect(response.body).toHaveProperty('vScale');
        expect(response.body).toHaveProperty('attempts');
        expect(response.body).toHaveProperty('send');
        expect(response.body).toHaveProperty('date');
        expect(response.body).toHaveProperty('description');
        expect(response.body).toHaveProperty('rating');
        expect(response.body).toHaveProperty('image');
      }),
  );
});

describe('GET /api/v1/climb-entry:id', () => {
  it('responds with a single climb entry', async () =>
    request(app)
      .get(`/api/v1/climb-entry/${id}`)
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200)
      .then((response) => {
        expect(response.body).toHaveProperty('_id');
        expect(response.body._id).toBe(id);
        expect(response.body).toHaveProperty('indoorOutdoor');
        expect(response.body.indoorOutdoor).toBe('Outdoor');
        expect(response.body).toHaveProperty('discipline');
        expect(response.body.discipline).toBe('Boulder');
        expect(response.body).toHaveProperty('climbStyle');
        expect(response.body.climbStyle).toStrictEqual({
          crimp: true,
          pinch: true,
          sloper: false,
          jug: true,
          slab: false,
          overhang: false,
          vert: true,
          compStyle: false,
          dynamic: true,
          static: true,
          complex: true,
          power: true,
          endurance: false,
          technical: false,
          compression: true,
          heady: false,
          faceClimbing: false,
          arete: false,
          dihedral: false,
          balance: false,
          layback: false,
          undercling: false,
          directional: false,
        });
        expect(response.body).toHaveProperty('vScale');
        expect(response.body.vScale).toBe('V4');
        expect(response.body).toHaveProperty('attempts');
        expect(response.body.attempts).toBe(10);
        expect(response.body).toHaveProperty('send');
        expect(response.body.send).toBe(true);
        expect(response.body).toHaveProperty('date');
        expect(response.body.date).toBe('2022-10-05T00:00:00.000Z');
        expect(response.body).toHaveProperty('description');
        expect(response.body.description).toBe('Really classic boulder at mt gretna, start on large pinch rail with a heel hook, and bump off very bad crimp to a larger hold. Then big moves to good holds to the top.');
        expect(response.body).toHaveProperty('rating');
        expect(response.body.rating).toBe(5);
        expect(response.body).toHaveProperty('image');
        expect(response.body.image).toBe('https://cdn2.apstatic.com/photos/climb/119274765_large_1595717656_topo.jpg');
      }),
  );
  it('responds with an invalid ObjectId error', (done) => {
    request(app)
      .get('/api/v1/climb-entry/notarealid')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(422, done);
  });
  it('responds with an invalid ObjectId error', (done) => {
    request(app)
      .get('/api/v1/climb-entry/6306d061477bdb46f9c57fa4')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(404, done);
  });
});

describe('PUT /api/v1/climb-entry:id', () => {
  it('responds with a not found error', (done) => {
    request(app)
      .put('/api/v1/climb-entry/6306d061477bdb46f9c57fa4')
      .set('Accept', 'application/json')
      .send({
        indoorOutdoor: 'Outdoor',
        discipline: 'Boulder',
        climbStyle: {
          crimp: true,
          pinch: true,
          sloper: false,
          jug: true,
          slab: false,
          overhang: false,
          vert: true,
          compStyle: false,
          dynamic: true,
          static: true,
          complex: true,
          power: true,
          endurance: false,
          technical: false,
          compression: true,
          heady: false,
          faceClimbing: false,
          arete: false,
          dihedral: false,
          balance: false,
          layback: false,
          undercling: false,
          directional: false,
        },
        vScale: 'V4',
        attempts: 20,
        send: true,
        date: '2022-10-05T00:00:00.000Z',
        description: 'Really classic boulder at mt gretna, start on large pinch rail with a heel hook, and bump off very bad crimp to a larger hold. Then big moves to good holds to the top.',
        rating: 5,
        image: 'https://cdn2.apstatic.com/photos/climb/119274765_large_1595717656_topo.jpg',
      })
      .expect('Content-Type', /json/)
      .expect(404, done);
  });
  it('responds with a single climb entry', async () =>
    request(app)
      .put(`/api/v1/climb-entry/${id}`)
      .set('Accept', 'application/json')
      .send({
        indoorOutdoor: 'Outdoor',
        discipline: 'Boulder',
        climbStyle: {
          crimp: true,
          pinch: true,
          sloper: false,
          jug: true,
          slab: false,
          overhang: false,
          vert: true,
          compStyle: false,
          dynamic: true,
          static: true,
          complex: true,
          power: true,
          endurance: false,
          technical: false,
          compression: true,
          heady: false,
          faceClimbing: false,
          arete: false,
          dihedral: false,
          balance: false,
          layback: false,
          undercling: false,
          directional: false,
        },
        vScale: 'V4',
        attempts: 10,
        send: true,
        date: '2022-10-05T00:00:00.000Z',
        description: 'Really classic boulder at mt gretna, start on large pinch rail with a heel hook, and bump off very bad crimp to a larger hold. Then big moves to good holds to the top.',
        rating: 5,
        image: 'https://cdn2.apstatic.com/photos/climb/119274765_large_1595717656_topo.jpg',
      })
      .expect('Content-Type', /json/)
      .expect(201)
      .then((response) => {
        expect(response.body).toHaveProperty('_id');
        expect(response.body._id).toBe(id);
        expect(response.body).toHaveProperty('indoorOutdoor');
        expect(response.body.indoorOutdoor).toBe('Outdoor');
        expect(response.body).toHaveProperty('discipline');
        expect(response.body.discipline).toBe('Boulder');
        expect(response.body).toHaveProperty('climbStyle');
        expect(response.body.climbStyle).toStrictEqual({
          crimp: true,
          pinch: true,
          sloper: false,
          jug: true,
          slab: false,
          overhang: false,
          vert: true,
          compStyle: false,
          dynamic: true,
          static: true,
          complex: true,
          power: true,
          endurance: false,
          technical: false,
          compression: true,
          heady: false,
          faceClimbing: false,
          arete: false,
          dihedral: false,
          balance: false,
          layback: false,
          undercling: false,
          directional: false,
        });
        expect(response.body).toHaveProperty('vScale');
        expect(response.body.vScale).toBe('V4');
        expect(response.body).toHaveProperty('attempts');
        expect(response.body.attempts).toBe(10);
        expect(response.body).toHaveProperty('send');
        expect(response.body.send).toBe(true);
        expect(response.body).toHaveProperty('date');
        expect(response.body.date).toBe('2022-10-05T00:00:00.000Z');
        expect(response.body).toHaveProperty('description');
        expect(response.body.description).toBe('Really classic boulder at mt gretna, start on large pinch rail with a heel hook, and bump off very bad crimp to a larger hold. Then big moves to good holds to the top.');
        expect(response.body).toHaveProperty('rating');
        expect(response.body.rating).toBe(5);
        expect(response.body).toHaveProperty('image');
        expect(response.body.image).toBe('https://cdn2.apstatic.com/photos/climb/119274765_large_1595717656_topo.jpg');
      }),
  );
});

describe('DELETE /api/v1/climb-entry/:id', () => {
  it('responds with a not found error', (done) => {
    request(app)
      .delete('/api/v1/climb-entry/6306d061477bdb46f9c57fa4')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(404, done);
  });
  it('responds with a 204 status code', (done) => {
    request(app)
      .delete(`/api/v1/climb-entry/${id}`)
      .expect(204, done);
  });
});