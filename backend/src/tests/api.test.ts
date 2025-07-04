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

  it('returns stats', async () => {
    await request(app).post('/new-game');
    const statsRes = await request(app).get('/stats');
    expect(statsRes.status).toBe(200);
    expect(statsRes.body).toHaveProperty('wins');
    expect(statsRes.body).toHaveProperty('streak');
    expect(statsRes.body).toHaveProperty('averageAttempts');
    expect(statsRes.body).toHaveProperty('gamesPlayed');
    expect(typeof statsRes.body.wins).toBe('number');
    expect(typeof statsRes.body.streak).toBe('number');
    expect(typeof statsRes.body.averageAttempts).toBe('string');
    expect(typeof statsRes.body.gamesPlayed).toBe('number');
  });

  it('updates stats after win', async () => {
    const newGame = await request(app).post('/new-game');
    const targetWord = newGame.body.targetWord;
    const oldStats = await request(app).get('/stats');
    await request(app).post('/guess').send({ word: targetWord });
    const statsRes = await request(app).get('/stats');
    expect(statsRes.body.wins).toBeGreaterThan(oldStats.body.wins);
    expect(statsRes.body.streak).toBeGreaterThan(oldStats.body.streak);
    expect(statsRes.body.gamesPlayed).toBeGreaterThan(oldStats.body.gamesPlayed);
  });

    it('updates stats after loss', async () => {
      const newGame = await request(app).post('/new-game');
      const targetWord = newGame.body.targetWord;
      const badWord = targetWord === 'PLANE' ? 'HOUSE' : 'PLANE';

      for (let i = 0; i < 6; i++) {
        await request(app).post('/guess').send({ word: badWord });
      }

      const statsRes = await request(app).get('/stats');
      expect(statsRes.body.gamesPlayed).toBeGreaterThan(0);
      expect(statsRes.body.streak).toBe(0);
    });

});
