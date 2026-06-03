// import { describe, it, expect, beforeAll, afterAll, vi } from 'vitest';
// import { getPayload, Payload } from 'payload';
// import config from '@/payload.config';
// import { POST, DELETE, PATCH } from '@/app/api/comments/route';

// let payload: Payload;
// let playerOne: any;
// let playerTwo: any;
// let playerOneToken: string;
// let playerTwoToken: string;
// let testAdventure: any;
// let testWorld: any;

// beforeAll(async () => {
//   const payloadConfig = await config;
//   payload = await getPayload({ config: payloadConfig });

//   playerOne = await payload.create({
//     collection: 'players',
//     data: {
//       username: 'testplayer1',
//       email: 'zOx0W@example.com',
//       password: 'password123',
//     },
//     overrideAccess: true,
//   });

//   playerTwo = await payload.create({
//     collection: 'players',
//     data: {
//       username: 'testplayer2',
//       email: 'zOx0Y@example.com',
//       password: 'password123',
//     },
//     overrideAccess: true,
//   });

//   const loginOne = await payload.login({
//     collection: 'players',
//     data: {
//       username: 'testplayer1',
//       password: 'password123',
//     },
//     overrideAccess: true,
//   });

//   playerOneToken = loginOne.token || '';

//   const loginTwo = await payload.login({
//     collection: 'players',
//     data: {
//       username: 'testplayer2',
//       password: 'password123',
//     },
//     overrideAccess: true,
//   });

//   playerTwoToken = loginTwo.token || '';

//   testWorld = await payload.create({
//     collection: 'worlds',
//     data: {
//       name: 'Test World',
//       pageSlug: 'test-world',
//     },
//     overrideAccess: true,
//   });

//   testAdventure = await payload.create({
//     collection: 'adventures',
//     data: {
//       name: 'Test Adventure',
//       pageSlug: 'test-adventure',
//       summary: 'This is a test adventure',
//       status: 'not_started',
//       startDateYear: 123,
//       startDateMonth: 1,
//       relatedCharacters: [playerOne.id, playerTwo.id],
//       relatedWorld: testWorld.id,
//     },
//     overrideAccess: true,
//   });
// });

// afterAll(async () => {
//   await payload.delete({ collection: 'adventures', id: testAdventure.id, overrideAccess: true });
//   await payload.delete({ collection: 'worlds', id: testWorld.id, overrideAccess: true });
//   await payload.delete({ collection: 'players', id: playerOne.id, overrideAccess: true });
//   await payload.delete({ collection: 'players', id: playerTwo.id, overrideAccess: true });
// });

// describe('POST /api/comments', () => {
//   it('returns a 401 when unauthenticated', async () => {
//     const req = new Request('http://localhost:3000/api/comments', {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify({ content: 'Test comment', path: '/test' }),
//     });

//     const res = await POST(req);
//     expect(res.status).toBe(401);
//   });
// });
