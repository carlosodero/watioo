import UserSchema from "./users.model";

export async function getUsers() {
    const users = await UserSchema.findAll();
    return users;
}