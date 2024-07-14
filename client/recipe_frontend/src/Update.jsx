

// Update.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useLocation, useParams } from 'react-router-dom';
import { Container, Form, Button } from 'react-bootstrap'; // Import Bootstrap components

function Update() {
  const [recipe, setRecipe] = useState({
    title: '',
    ingredients: '',
    instructions: '',
    time: '',
    image: '', // New field for image URL
    category: 'Breakfast'
  });
  const navigate = useNavigate();
  const location = useLocation();

  const {id} = useParams();
  

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setRecipe((prevRecipe) => ({ ...prevRecipe, [name]: value }));
  };
  
  const handleSubmit = (event) => {
    event.preventDefault();
    // Implement logic to add recipe on the server
    axios.put('http://localhost:8800/update/'+id, recipe)
      .then(() => {
        alert('Recipe Updated successfully');
        // Redirect to the respective category page based on the current route
        navigate(`/${recipe.category.toLowerCase()}`);
      })
      .catch((error) => console.error('Error adding recipe:', error));
  };

  return (
    <Container className="mt-5">
      <h2>Update Recipe</h2>
      <Form onSubmit={handleSubmit}>
        {/* Form fields for recipe details */}
        <Form.Group controlId="formRecipeName">
          <Form.Label>Recipe Name</Form.Label>
          <Form.Control type="text" name="title" value={recipe.title} onChange={handleInputChange} required />
        </Form.Group>

        <Form.Group controlId="formIngredients">
          <Form.Label>Ingredients:</Form.Label>
          <Form.Control as="textarea" name="ingredients" value={recipe.ingredients} onChange={handleInputChange} required />
        </Form.Group>

        <Form.Group controlId="formInstructions">
          <Form.Label>Instructions:</Form.Label>
          <Form.Control as="textarea" name="instructions" value={recipe.instructions} onChange={handleInputChange} required />
        </Form.Group>

        <Form.Group controlId="formCookingTime">
          <Form.Label>Cooking Time:</Form.Label>
          <Form.Control type="text" name="time" value={recipe.time} onChange={handleInputChange} required />
        </Form.Group>

        <Form.Group controlId="formImage">
          <Form.Label>Image URL:</Form.Label>
          <Form.Control type="text" name="image" value={recipe.image} onChange={handleInputChange} required />
        </Form.Group>

        <Form.Group controlId="formCategory">
          <Form.Label>Category:</Form.Label>
          <Form.Control as="select" name="category" value={recipe.category} onChange={handleInputChange}>
            <option value="Breakfast">Breakfast</option>
            <option value="Lunch">Lunch</option>
            <option value="Snacks">Snacks</option>
            <option value="Italian">Italian</option>
            <option value="Juices">Juices</option>
            <option value="Desserts">Desserts</option>
          </Form.Control>
        </Form.Group>


        <Button variant="primary" type="submit">
         Update Recipe
        </Button>
      </Form>
    </Container>
  );
}

export default Update;
