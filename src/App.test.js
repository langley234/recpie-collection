//src App.test.js
import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from './App';
import TestComponent from './testComponent';

const setup = () => {
  const app = render(<App />);

  userEvent.click(app.getByText('Add Recipe'));

  // Add the submit button to your setup method:
  const submitButton = app.getByTestId('submit-button')
  const instructionsInput = app.getByLabelText('Instructions:')
  const nameInput = app.getByLabelText('Recipe name:')

  return {
    instructionsInput,
    nameInput,
    submitButton
  }
}

test('Add recipe button toggles visibility of a form on the page ', () => {

  render(<App />);
  // `queryBy...` methods will return null if the element is not found:
  const recipeForm = screen.queryByText("Instructions:");

  // `getBy...` methods will "throw" an error if the element is not found:
  // const recipeForm = screen.getByText("Instructions:");

  expect(recipeForm).toBeNull();
  userEvent.click(screen.getByText("Add Recipe"));

  expect(screen.getByLabelText("Instructions:")).toBeInTheDocument();
});

test('typing in the recipe instructions makes the instructions appear in the form', async () => {
  const {instructionsInput} = setup();

  const recipeInstructions = "kinda hard to write instructions without knowing what I'm cooking"

  await userEvent.type(instructionsInput, recipeInstructions)
  expect(instructionsInput.value).toEqual(recipeInstructions);
})

test('recipe name from state appears in an unordered list', async () => {
  const {instructionsInput, nameInput, submitButton} = setup();
  const recipeName = "Lean Pockets"
  const recipeInstructions = "place in toaster oven on 350 for 45 minutes"

  await userEvent.type(instructionsInput, recipeInstructions)
  await userEvent.type(nameInput, recipeName)
  userEvent.click(submitButton);

  expect(screen.getByRole('listitem')).toBeInTheDocument();
  expect(screen.getByText(recipeName)).toBeInTheDocument();
})

test(`when adding multiple recipes, they should display under the 'My Recipes' heading`, async() => {
  const {instructionsInput, nameInput, submitButton} = setup();
  const recipeName = "Lean Pockets";
  const recipeInstructions = "place in toaster oven on 350 for 45 minutes";

  const secondRecipeName = "Toast";
  const secondRecipeInstructions = "put bread in the toaster";

  await userEvent.type(instructionsInput, recipeInstructions)
  await userEvent.type(nameInput, recipeName)
  userEvent.click(submitButton);

  expect(screen.getByRole('listitem')).toBeInTheDocument();
  expect(screen.getByText(recipeName)).toBeInTheDocument();

  userEvent.clear(screen.getByTestId('newRecipeInput'));
  userEvent.clear(screen.getByTestId('newInstructionInput'));

  await userEvent.type(instructionsInput, secondRecipeInstructions)
  await userEvent.type(nameInput, secondRecipeName)
  userEvent.click(submitButton);
  
  expect(screen.getByText(secondRecipeName)).toBeInTheDocument();
})

test('should see instructions for a recipe beneath the clicked recipe when it is clicked', async() => {
  const {instructionsInput, nameInput, submitButton} = setup();
  const recipeName = "Lean Pockets";
  const recipeInstructions = "place in toaster oven on 350 for 45 minutes";

  await userEvent.type(instructionsInput, recipeInstructions)
  await userEvent.type(nameInput, recipeName)
  userEvent.click(submitButton);

  userEvent.click(screen.getByTestId('recipe-0'));

  expect(screen.getByText(recipeInstructions)).toBeInTheDocument();
})

test('should allow an individual recipe to be edited after the user has clicked the item', async() => {
  const {instructionsInput, nameInput, submitButton} = setup();
  await userEvent.type(instructionsInput, "place in toaster oven on 350 for 45 minutes")
  await userEvent.type(nameInput, "Lean Pockets")

  userEvent.click(submitButton);
  userEvent.click(screen.getByTestId("recipe-0"));

  await screen.findByTestId("recipe-0-edit-button");
  userEvent.click(screen.getByTestId("recipe-0-edit-button"));
    
  

  await userEvent.type(screen.getByTestId('edit-name-input-0'), 'a new name');
  await userEvent.type(screen.getByTestId('edit-instructions-input-0'), 'a new instruction');

  userEvent.click(screen.getByTestId('recipe-0-finish-edit-button'));
  await userEvent.click(screen.getByTestId('recipe-0'));

  expect(screen.getByText('a new name')).toBeInTheDocument();
  expect(screen.getByText('a new instruction')).toBeInTheDocument();
})
