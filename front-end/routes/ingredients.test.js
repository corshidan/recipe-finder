const request = require('supertest');
const app = require('../app');
const { pool } = require('../db/index');
console.log(pool.end);

afterAll(async () => {
	await pool.end();
});

describe('testing GET routes for ingredients database', () => {
	test('geting GET all ingredients', async () => {
		const response = await request(app).get('/ingredients');
		let body = response.body;
		expect(body).toStrictEqual({
			success: true,
			message: 'all ingredients',
			payload: expect.any(Array),
		});
		for (const item of body.payload) {
			expect(item).toStrictEqual({
				id: expect.any(Number),
				name: expect.any(String),
			});
		}
	});
	test('testing GET by name', async () => {
		const name = 'eggs';
		const response = await request(app).get(`/ingredients?name=${name}`);
		let body = response.body;
		expect(body).toStrictEqual({
			success: true,
			message: 'Found ingredient',
			payload: expect.any(Array),
		});
		for (const item of body.payload) {
			expect(item).toStrictEqual({
				id: expect.any(Number),
				name: expect.stringMatching(name),
			});
		}
	});
	test('testing GET by ID', async () => {
		const id = 23;
		const response = await request(app).get(`/ingredients/${id}`);
		let body = response.body;
		console.log(body);
		expect(body).toStrictEqual({
			success: true,
			message: `The ingredient with ${id}`,
			payload: expect.any(Array),
		});
		for (const item of body.payload) {
			expect(item).toStrictEqual({
				id: id,
				name: expect.any(String),
			});
		}
	});
});

describe('testing for POST route', () => {
	test.skip('testing that POST successfully adds a new ingredient', async () => {
		const data = { ingredient: 'Parsley' };
		const response = await request(app)
			.post('/ingredients')
			.set('Content-Type', 'application/json')
			.send(data);
		const body = response.body;
		// console.log(body);
		// console.log(body.payload);
		expect(body).toStrictEqual({
			success: true,
			message: `You added a new ingredient named ${body.payload.name}`,
			payload: {
				id: expect.any(Number),
				name: body.payload.name,
			},
		});
		// for (const item of body.payload) {
		//   expect(item).toStrictEqual({
		//     id: expect.any(Number),
		//     name: body.payload.name,
		//   });
		// }
	});
});

describe('testing the PUT route and DELTE route', () => {
	test.skip('testing the PUT route ', async () => {
		const data = { name: 'lamburghini' };
		const id = 1;
		const response = await request(app)
			.put(`/ingredients/${id}`)
			.set('Content-Type', 'application/json')
			.send(data);
		const body = response.body;
		//console.log(body);
		expect(body).toStrictEqual({
			success: expect.any(Boolean),
			message: `You updated the ingredient with id ${id} to be named ${data.name}`,
			payload: {
				id: id,
				name: data.name,
			},
		});
	});
	test.skip('testing the DELETE route', async () => {
		const id = 18;
		const response = await request(app).delete(`/ingredients/${id}`);
		const body = response.body;
		expect(body).toStrictEqual({
			success: true,
			message: `You deleted ingredient with id ${id}`,
			payload: {
				id: id,
				name: expect.any(String),
			},
		});
	});
});
