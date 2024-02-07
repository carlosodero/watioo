import * as userRepo from './users.repo.js';

export async function getUsers() {
  const users = await userRepo.getUsers();
  return users;
}

export async function getUserById({ id }: {id:string}) {
  const user = await userRepo.getUserById(id);
  return user;
} 

export async function getUserByUsername(username: string) {
  const user = await userRepo.getUserByUsername(username);
  const userWithoutPassword = user;
  delete userWithoutPassword.userPassword;
  return userWithoutPassword;
}   

export async function updateUserById(id: string, newProps: object) {
  const updatedUser = await userRepo.updateUserById(id, newProps);
  return updatedUser;
}

export async function deleteUserById( id: string) {
  const user = await userRepo.deleteUserById(id);
  return user;
}
