import UserSchema from './users.model.js';

export async function getUsers() {
  try {
    const users = await UserSchema
      .findAll({
        where: {
          isArchived: false,
          isConfirmed: true,
          isAdmin: false,
        },
      }
      );
    return users;
  } catch (error) {
    console.log('Error in getUsers in users.repo', error);
    return { message: 'Internal error in getUsers in users.repo' };
  }
}

export async function getUserById(id: string) {
  try {
    const user = await UserSchema
      .findOne({
        where: {
          userId: id,
          isArchived: false,
          isConfirmed: true,
        },
      });
    const userWithoutPassword = user?.dataValues;
    delete userWithoutPassword.userPassword;
    return userWithoutPassword;
  } catch (error) {
    console.log('Error in getUserById in users.repo', error);
    return { message: 'Internal error in getUserById in users.repo' };
  }
}

export async function getUserByUsername(username: string) {
  try {
    const user = await UserSchema.findOne({
      where: {
        username,
      },
    });
    return user?.dataValues;
  } catch (error) {
    console.log('Error in getUserByUsername in users.repo', error);
    return { message: 'Internal error in getUserByUsername in users.repo' };
  }
}

export async function updateUserById(id: string, newProps: object) {
  try {
    const updatedUser = await UserSchema.update(newProps, { where: { userId: id }, returning: true });
    const updatedUserWithoutPassword = updatedUser[1][0]?.dataValues;
    delete updatedUserWithoutPassword.userPassword;
    return updatedUserWithoutPassword;
  } catch (error) { 
    console.log('Error in updateUserById in users.repo', error);
    return { message: 'Internal error in updateUserById in users.repo' };
  }
}

export async function deleteUserById(id: string) {
  try {
    const user = await UserSchema.update({ isArchived: true }, { where: { userId: id, isArchived: false } });
    return user;
  } catch (error) {
    console.log('Error in deleteUserById in users.repo', error);
    return { message: 'Internal error in deleteUserById in users.repo' };
  }
}

export async function registerUser({ newUserId, username, userPassword, userEmail }: { newUserId: string, username: string, userPassword: string, userEmail: string }) {
  try {
    const user = await UserSchema.create({
      userId: newUserId,
      username,
      userPassword: userPassword,
      userEmail: userEmail,
    });
    return user?.dataValues;
  } catch (error) {
    console.log('Error in registerUser in users.repo', error);
    return { message: 'Internal error in registerUser in users.repo' };
  }
}

export async function getUserByEmail(userEmail: string) {
  try {
    const user = await UserSchema.findOne({
      where: {
        userEmail: userEmail,
      },
    });
    return user;
  } catch (error) {
    console.log('Error in getUserByEmail in users.repo', error);
    return { message: 'Internal error in getUserByEmail in users.repo' };
  }
}

export async function confirmUser({ username }: { username: string }) {
  try {
    const confirmedUser = await UserSchema.update(
      { isConfirmed: true },
      { where: { username: username } }
    );
    if (!confirmedUser) {
      return null;
    }
    return confirmedUser;
  }
  catch (error) {
    console.log('Error in confirmUser in users.repo', error);
    return { message: 'Internal error in confirmUser in users.repo' };
  }
}
