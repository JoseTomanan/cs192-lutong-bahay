import { test, expect } from '@playwright/test';

test.describe('User table', ()=>{
    test('should reflect added user entry in database', async ({ request }) => {
        // TODO
        const newUser = { username: 'testUser', email: 'test@example.com' };

        // Send request to add user
        const response = await request.post('/api/users', { data: newUser });
        expect(response.status()).toBe(201); // Ensure request succeeded
    
        // Fetch user from database and verify
        const dbUser = await request.get(`/api/users/${newUser.username}`);
        const userData = await dbUser.json();
        expect(userData.email).toBe(newUser.email);
    });

    test('should reflect changes in user entry after edit', async ({ request }) => {
        const updateData = { username: 'testUser', email: 'updated@example.com' };
    
        // Send update request
        const response = await request.put('/api/users/testUser', { data: updateData });
        expect(response.status()).toBe(200);
    
        // Fetch and verify updated data
        const updatedUser = await request.get(`/api/users/testUser`);
        const userData = await updatedUser.json();
        expect(userData.email).toBe(updateData.email);
    });
});

test.describe('Recipes table', ()=>{
    test('should reflect added recipe entry in database', async ({ request }) => {
        const newRecipe = {
            title: 'Chicken Adobo',
            description: 'A classic Filipino dish',
            ingredients: ['chicken', 'soy sauce', 'vinegar', 'garlic'],
            steps: ['Marinate chicken', 'Cook with sauce', 'Simmer until tender'],
            userId: 1 // Assuming the user creating the recipe has an ID of 1
        };
    
        // Send request to create a new recipe
        const response = await request.post('/api/recipes', { data: newRecipe });
        expect(response.status()).toBe(201); // Ensure recipe creation was successful
    
        // Fetch the newly added recipe from the database
        const recipesResponse = await request.get('/api/recipes');
        const recipes = await recipesResponse.json();
    
        // Check if the recipe exists in the database
        const addedRecipe = recipes.find(r => r.title === newRecipe.title);
        expect(addedRecipe).toBeDefined();
        expect(addedRecipe.description).toBe(newRecipe.description);
    });

    test('should reflect changes in user entry after edit', async ({ request }) => {
        const updateData = { username: 'testUser', email: 'updated@example.com' };
    
        // Send update request
        const response = await request.put('/api/users/testUser', { data: updateData });
        expect(response.status()).toBe(200);
    
        // Fetch and verify updated data
        const updatedUser = await request.get(`/api/users/testUser`);
        const userData = await updatedUser.json();
        expect(userData.email).toBe(updateData.email);
    });

    test('should properly add user comment inside recipe entry', async ({ request }) => {
        const commentData = { recipeId: 1, userId: 1, comment: 'Delicious!' };
    
        // Send request to add comment
        const response = await request.post('/api/recipes/1/comments', { data: commentData });
        expect(response.status()).toBe(201);
    
        // Fetch and verify comment
        const recipe = await request.get('/api/recipes/1');
        const recipeData = await recipe.json();
        expect(recipeData.comments.some(c => c.comment === 'Delicious!')).toBe(true);
    });
});
