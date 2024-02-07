// Replace with your actual import
import { v4 as uuidv4 } from 'uuid';
import { hashSync } from 'bcrypt';
// import {User} from '../interfaces/user.js';
import UserSchema from '../api/users/users.model.js';

// Function to generate random user data
const generateUserData = () => {

  return {
    userId: uuidv4(),
    username: `usuario${Math.floor(Math.random() * 100)}`,
    userEmail: `usuario${Math.floor(Math.random() * 100)}@ejemplo.com`,
    userPassword: hashSync('contraseña123', 10), // Replace with secure password
    isArchived: Math.random() < 0.2,
    isConfirmed: Math.random() < 0.8,
    isAdmin: Math.random() < 0.05,
    dni: `12345678${Math.floor(Math.random() * 10)}`, // Replace with logic for DNI generation
    phone: '912345678', // Replace with logic for phone number generation
    name: `Nombre${Math.floor(Math.random() * 10)}`,
    surname: `Apellido${Math.floor(Math.random() * 10)}`,
  };
};

// Main function
export default async function populateDatabase() {
  try {
    const usuarios= [];
    for (let i = 0; i < 100; i++) {
      usuarios.push(generateUserData());
    }

    await UserSchema.bulkCreate(usuarios);
    console.log('¡100 usuarios creados con éxito!');
  } catch (error) {
    console.error('Error al crear usuarios:', error);
  }
}
