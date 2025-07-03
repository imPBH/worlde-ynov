import request from 'supertest';
import app from '../app';

describe('Wordle API', () => {

  it('starts a new game', async () => {
    const res = await request(app).post('/new-game');
    expect(res.status).toBe(200);
    expect(res.body.message).toBe('New game started');
  });

  it('makes a valid guess', async () => {
    await request(app).post('/new-game');
    const res = await request(app).post('/guess').send({ word: 'APPLE' });
    expect(res.status).toBe(200);
    expect(res.body.feedback).toBeDefined();
  });

  it('rejects invalid word', async () => {
    await request(app).post('/new-game');
    const res = await request(app).post('/guess').send({ word: '12345' });
    expect(res.body.error).toBe('Invalid word');
  });

  it('blocks guess after win', async () => {
    const newGame = await request(app).post('/new-game');
    const targetWord = newGame.body.targetWord;
    await request(app).post('/guess').send({ word: targetWord });
    const res = await request(app).post('/guess').send({ word: 'PLANE' });
    expect(res.body.error).toBe('Game over');
  });
});
