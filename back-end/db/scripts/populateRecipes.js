const { query } = require('../index');
const data = require('../../recipes_data');

async function populateRecipes() {
	for (let i = 0; i < data.length; i++) {
		const { name, image, keywords, ingredients, method, calories } = data[i];
		const res = await query(
			'INSERT INTO recipes (name,image, keywords, ingredients, method, calories) VALUES ($1, $2, $3, $4, $5,$6)',
			[name, image, keywords, ingredients, method, calories]
		);
		console.log(`populated table with ${name}`);
	}
}
populateRecipes();
