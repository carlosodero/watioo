import * as userRepo from './users.repo.js';

export async function getUsers() {
    const users = await userRepo.getUsers();
    return users;
}