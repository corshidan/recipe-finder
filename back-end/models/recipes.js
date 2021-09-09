const { query } = require('../db/index');

async function getRecipes() {
	const data = await query('SELECT * FROM recipes;');
	console.log(data.rows);
	return data.rows;
}
async function getRecipesById(id) {
	const data = await query(`SELECT * FROM recipes WHERE id=${id};`);
	console.log(data.rows[0]);
	return data.rows;
}
async function getRecipesByName(name) {
	const data = await query(`SELECT * FROM recipes WHERE name ILIKE '%${name}%';`);
	console.log(data.rows[0]);
	return data.rows;
}
async function addRecipe(recipe) {
	const sqlQuery = `INSERT INTO recipes(name,image,keywords, ingredients, method, calories) VALUES($1,$2,$3,$4,$5,$6) RETURNING *;`;
	const data = await query(sqlQuery, [
		recipe.name,
		recipe.image,
		recipe.keywords,
		recipe.ingredients,
		recipe.method,
		recipe.calories,
	]);
	console.log(data.rows[0]);
	return data.rows[0];
}
async function updateRecipe(recipe, id) {
	const sqlQuery = `UPDATE recipes SET name= $1 ,keywords =$2, ingredients =$3, method=$4, calories=$5 WHERE id=$6 RETURNING *;`;
	const data = await query(sqlQuery, [
		recipe.name,
		recipe.image,
		recipe.keywords,
		recipe.ingredients,
		recipe.method,
		recipe.calories,
		id,
	]);
	console.log(data.rows[0]);
	return data.rows[0];
}

// async function updatePartialRecipe(recipe, id) {
// 	let name =
// 	const sqlQuery = `UPDATE recipes SET name= $1 ,keywords =$2, ingredients =$3, method=$4, calories=$5 WHERE id=$6 RETURNING *;`;
// 	const idQuery = 'SELECT * FROM recipes WHERE id=$1'
// 	const recipeToChange = await query (idQuery, id)
// 	const data = await query(sqlQuery, [
// 		recipe.name,
// 		recipe.keywords,
// 		recipe.ingredients,
// 		recipe.method,
// 		recipe.calories,
// 		id
// 	]);
// 	console.log(data.rows[0]);
// 	return data.rows[0];
// }

async function deleteRecipe(id) {
	const sqlQuery = 'DELETE FROM recipes WHERE id=$1';
	await query(sqlQuery, [id]);
	console.log(`you deleted recipe with id ${id}`);
	return;
}

module.exports = {
	getRecipes,
	getRecipesById,
	getRecipesByName,
	addRecipe,
	updateRecipe,
	deleteRecipe,
};
