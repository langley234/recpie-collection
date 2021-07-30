describe("Home page", () => {
    beforeEach(() => {
        cy.visit('/')
    })
    it("header contains recipe heading with a message that there are no recipes", () => {
      cy.findByRole('heading').should('contain', 'My Recipes')
      cy.get('p')
        .findByText('There are no recipes to list.')
        .should('exist')
    })

    it("contains an add recipe button that when clicked opens a form", () => {
        cy.findByRole('button').click();

        cy.get('form')
            .findByRole('button')
            .should('exist');
    })
    it("contains a form with fields 'Recipe Name' and 'Recipe Instructions' after clicking the 'Add Recipe' button", () => {
        cy.findByRole('button').click();
        expect(cy.findByRole('textbox', {name: /Recipe name/i})).toExist();
        cy.findByRole('textbox', {name: /instructions/i}).should('exist');
    })

    it("displays a recipe name under the 'My Recipes' heading after it has been added through the 'Add Recipe' form", () => {
        const recipeName = 'Tofu Scramble Tacos';
        cy.findByRole('button').click()
        cy.findByRole('textbox', {name: /Recipe name/i}).type(recipeName)
        cy.findByRole('textbox', {name: /instructions/i}).type("1. heat a skillet on medium with a dollop of coconut oil {enter} 2. warm flour tortillas")
      
        return cy.findByRole('button').click()
          .then(() => {
          expect(cy.findByRole('listitem', /tofu scramble tacos/i)).toExist();
          })
      })

      it('should see instructions for a recipe beneath the clicked recipe when it is clicked', () => {
        cy.get('[data-testid="add-recipe"]').click()
        cy.get('[data-testid="newRecipeInput"]').type("Lean Pockets")
        cy.get('[data-testid="newInstructionInput"]').type("place in toaster oven on 350 for 45 minutes");
        cy.get('[data-testid="submit-button"]').click()
        
        return cy.get('[data-testid="recipe-0"]').click()
            .then( () => {
                expect(cy.get('[data-testid="recipe-0-instructions"]').contains('place in toaster oven on 350 for 45 minutes'));
                expect(cy.get('[data-testid="recipe-0-instructions"]').should('be.visible'));
            })
      })

      it('should allow an individual recipe to be edited after the user has clicked the item', () => {
        cy.get('[data-testid="add-recipe"]').click()
        cy.get('[data-testid="newRecipeInput"]').type("Lean Pockets")
        cy.get('[data-testid="newInstructionInput"]').type("place in toaster oven on 350 for 45 minutes");
        cy.get('[data-testid="submit-button"]').click()
        cy.get('[data-testid="recipe-0"]').click()
        cy.get('[data-testid="recipe-0-edit-button"]').click();
        cy.get('[data-testid="edit-name-input-0"]').type("a new name")
        cy.get('[data-testid="edit-instructions-input-0"]').type("a new instruction")
        cy.get('[data-testid="recipe-0-finish-edit-button"]').click()
        cy.get('[data-testid="recipe-0"]').click()

        expect(cy.get('[data-testid="recipe-0-name"]').contains('a new name'));
        expect(cy.get('[data-testid="recipe-0-instructions"]').contains('a new instruction'));
      })
  })