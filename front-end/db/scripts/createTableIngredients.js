const { query } = require("../index");

async function createTableIngredients() {
  const sqlStr =
    'CREATE TABLE ingredients (id SERIAL PRIMARY KEY, name TEXT)';

  const res = await query(sqlStr);
  console.log("table created");
}

createTableIngredients();