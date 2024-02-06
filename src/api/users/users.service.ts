import * as userRepo from './users.repo.js';

export async function getUsers() {
  const users = await userRepo.getUsers();
  return users;
}

export async function getUserById({ id }: {id:string}) {
  const user = await userRepo.getUserById(id);
  return user;
} 

export async function getUserByName({ username }:{username: string}) {
  const user = await userRepo.getUserByName(username);
  return user;
}   

export async function updateUserById(id: string, newValues: object) {
  const updatedUser = await userRepo.updateUserById(id, newValues);
  return updatedUser;
}

export async function deleteUserById( id: string) {
  const user = await userRepo.deleteUserById(id);
  return user;
}
