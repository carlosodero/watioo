import UserSchema from './users.model.js';

export async function getUsers() {
  const users = await UserSchema
    .findAll({
      where: {
        isarchived: false,
        isconfirmed: true,
        isadmin: false,
      },
    }
    );
  return users;
}

export async function getUserById(id: string) {
  const user = await UserSchema.findByPk(id);
  return user;
}

export async function getUserByName(username: string) {
  const user = await UserSchema.findOne({ where: { username: username } });
  return user;
}

export async function updateUserById(id: string, newValues: object) {
  const updatedUser = await UserSchema.update(newValues, { where: { userid: id } });
  return updatedUser;
}

export async function deleteUserById(id: string) {
  const user = await UserSchema.update({ isarchived: true }, { where: { userid: id } });
  return user;
}
