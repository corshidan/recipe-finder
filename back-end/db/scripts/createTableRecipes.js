const { query } = require('../index');

async function createTableRecipes() {
	const sqlStr =
		'CREATE TABLE recipes (id SERIAL PRIMARY KEY, name TEXT,image TEXT, keywords TEXT[], ingredients TEXT, method TEXT, calories NUMERIC)';

	const res = await query(sqlStr);
	console.log('table created');
}

createTableRecipes();
