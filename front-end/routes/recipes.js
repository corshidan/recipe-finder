const express = require('express');
const router = express.Router();

const {
	getRecipes,
	getRecipesById,
	getRecipesByName,
	addRecipe,
	updateRecipe,
	deleteRecipe,
} = require('../models/recipes');

router.get('/', async function (req, res) {
	const { name } = req.query;
	if (name) {
		const recipeSearched = await getRecipesByName(name);
		res.json({
			success: true,
			message: 'Found recipes',
			payload: recipeSearched,
		});
	}
	const recipes = await getRecipes();
	res.json({
		success: true,
		message: 'all recipes',
		payload: recipes,
	});
});
router.get('/:id', async (req, res) => {
	const { id } = req.params;
	const recipes = await getRecipesById(id);
	res.json({
		success: true,
		message: `The recipe with ${id}`,
		payload: recipes,
	});
});
router.post('/', async (req, res) => {
	const { body } = req;
	console.log(body, 'here');
	const response = await addRecipe(body);
	res.json({
		success: true,
		message: `You added a new recipe named ${body.name}`,
		payload: response.rows,
	});
});
router.put('/:id', async (req, res) => {
	const { body } = req;
	const { id } = req.params;
	const response = await updateRecipe(body, id);
	res.json({
		success: true,
		message: `You updated the recipe named ${body.name} with id ${id}`,
		payload: response.rows,
	});
});

// router.patch('/:id', async (req, res) => {
// 	const { body } = req;
// 	const { id } = req.params;
// 	const response = await updateRecipe(body, id);
// 	res.json({
// 		success: true,
// 		message: `You updated the recipe named ${body.name} with id ${id}`,
// 		payload: response.rows,
// 	});
// });

router.delete('/:id', async (req, res) => {
	const { id } = req.params;
	await deleteRecipe(id);
	res.json({
		success: true,
		message: `you deleted the recipe with id ${id}`,
	});
});

module.exports = router;
