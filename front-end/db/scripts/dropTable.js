const { query } = require("../index");

async function dropTableIngredients() {
    const sqlStr =
      'DROP TABLE ingredients';
  
    const res = await query(sqlStr);
    console.log("you dropped ingredients table");
  }

  async function dropTableRecipes() {
    const sqlStr =
      'DROP TABLE recipes';
  
    const res = await query(sqlStr);
    console.log("you dropped recipes table");
  }


  
  dropTableIngredients();
  dropTableRecipes();