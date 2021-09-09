const { query } = require('../db/index');

async function getIngredients() {
	const data = await query('SELECT * FROM ingredients;');
	console.log('all ingredients logged by function', data.rows);
	return data.rows;
}

async function getIngredientsById(id) {
	const data = await query(`SELECT * FROM ingredients WHERE id=${id};`);
	console.log(data.rows[0]);
	return data.rows;
}

async function getIngredientsByName(name) {
	const data = await query(`SELECT * FROM ingredients WHERE name ILIKE '%${name}%';`);
	console.log('names ingredient logged by function', data.rows[0]);
	return data.rows;
}

async function addIngredient(ingredient) {
	const sqlQuery = `INSERT INTO ingredients(name) VALUES($1) RETURNING *;`;
	const data = await query(sqlQuery, [ingredient.ingredient]);
	// console.log(data.rows[0]);
	return data.rows[0];
}

async function updateIngredient(ingredient, id) {
	const sqlQuery = 'UPDATE ingredients SET name = $1 WHERE id=$2 RETURNING *;';
	const data = await query(sqlQuery, [ingredient.name, id]);
	// console.log(`you updated ${ingredient.name}`);
	return data.rows[0];
}

async function deleteIngredient(id) {
	const sqlQuery = 'DELETE FROM ingredients WHERE id=$1 RETURNING *;';
	const data = await query(sqlQuery, [id]);
	console.log(`you deleted ingredient with id ${id}`);
	return data.rows[0];
}

module.exports = {
	getIngredients,
	getIngredientsById,
	getIngredientsByName,
	addIngredient,
	updateIngredient,
	deleteIngredient,
};
