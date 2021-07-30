import './App.css';

import React from 'react';
import TestComponent from './testComponent';
import Recipe from './recipe.js';

class App extends React.Component 
{
  constructor(props)
  {
    super(props);
    this.state = {
      isAddRecipeFormDisplayed: false,
      recipes: [],
      newRecipeName: '',
      newRecipeInstructions: '',
      needsUpdate: false
    }

    this.recipes = [];
    this.key = 0;
    this.recipeId = 0;
  }

  componentDidMount() {
    //this.recipes.push({name: 'Lean Pockets', instructions: 'place in toaster oven on 350 for 45 minutes' })

    // this.setState({
    //   recipes: this.recipes
    // })
  }

  handleRecipeInstructionsChange = (event) => {
    const value = event.target.value;
    
    
    this.setState({newRecipeInstructions: value});
    // console.log('VALUE : ', value);
    // console.log('STATE VALUE : ', this.state.newRecipeInstructions);
  }

  handleRecipeNameChange = (event) => {
    const value = event.target.value;
    this.setState({newRecipeName: value});
  }

  submitRecipe = (event, callbackFunc = this.handleClickedRecipe) => {
    event.preventDefault();

    let name = document.getElementById('newRecipeName').value;
    let instructions = document.getElementById('newRecipeInstructions').value;

    this.recipes.push(
      {
        name: name, 
        instructions: instructions, 
        clicked: false,
        id: this.recipeId++
      });

    this.setState({
      recipes: this.recipes
    })
  }

  toggleAddRecipeForm = () => {
    this.setState({isAddRecipeFormDisplayed: !this.state.isAddRecipeFormDisplayed})
  }

  render() {
    const addNewRecipeForm = (
      <form id="recipe-form" onSubmit={this.submitRecipe}>
        <label htmlFor="newRecipeName">Recipe name: </label>
        <input type="text"
          name="newRecipeName"
          data-testid="newRecipeInput"
          id="newRecipeName"
          onChange={this.handleRecipeNameChange}
          value={this.state.newRecipeName} />
        <label htmlFor="newRecipeInstructions">Instructions:</label>
        <textarea name="newRecipeInstructions"
          data-testid="newInstructionInput"
          id="newRecipeInstructions"
          placeholder="write recipe instructions here..."
          onChange={this.handleRecipeInstructionsChange}
          value={this.state.newRecipeInstructions} />
        <input data-testid="submit-button"type="submit" ></input> 
      </form>
    )

    return (
      <div className="App">
        <h1 className="App-header">My Recipes</h1>
        {
          this.state.isAddRecipeFormDisplayed
            ? addNewRecipeForm
            : <button id="add-recipe" data-testid="add-recipe" onClick={this.toggleAddRecipeForm}>Add Recipe</button>
        }
        {
          this.state.recipes.length > 0 ?
            <ul>
              {this.state.recipes.map((item) => {
                return <Recipe key={this.key++} data={item} />
              })}
            </ul> :
            <p>There are no recipes to list.</p>
        }
      </div>
    )
  }
}

export default App;