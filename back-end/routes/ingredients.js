const express = require('express');
const { query } = require('../db');
const router = express.Router();

const {
	getIngredients,
	getIngredientsById,
	getIngredientsByName,
	addIngredient,
	updateIngredient,
	deleteIngredient,
} = require('../models/ingredients');

router.get('/', async function (req, res) {
	const { name } = req.query;
	if (name) {
		const ingredientSearched = await getIngredientsByName(name);
		return res.json({
			success: true,
			message: 'Found ingredient',
			payload: ingredientSearched,
		});
	}
	const ingredients = await getIngredients();
	res.json({
		success: true,
		message: 'all ingredients',
		payload: ingredients,
	});
});

router.get('/:id', async (req, res) => {
	const { id } = req.params;
	const ingredients = await getIngredientsById(id);
	res.json({
		success: true,
		message: `The ingredient with ${id}`,
		payload: ingredients,
	});
});

router.post('/', async (req, res) => {
	const { body } = req;
	console.log(body, 'lol');
	const response = await addIngredient(body);
	// console.log('this is our new response', response);
	res.json({
		success: true,
		message: `You added a new ingredient named ${body.ingredient}`,
		payload: response,
	});
});

router.put('/:id', async (req, res) => {
	const { body } = req;
	const { id } = req.params;
	const response = await updateIngredient(body, id);
	res.json({
		success: true,
		message: `You updated the ingredient with id ${id} to be named ${body.name}`,
		payload: response,
	});
});

router.delete('/:id', async (req, res) => {
	let { id } = req.params;
	// const sqlQuery = 'DELETE FROM ingredients WHERE id=$1';
	// await query(sqlQuery, [id]);
	const data = await deleteIngredient(id);
	console.log(`you deleted ingredient with id ${id}`);
	res.json({
		success: true,
		message: `You deleted ingredient with id ${id}`,
		payload: data,
	});
});

module.exports = router;
