import UserSchema from './users.model.js';

export async function getUsers() {
  const users = await UserSchema.findAll();
  return users;
}
