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


export async function createUser ( { username, userPassword, userEmail} : { username: string, userPassword: string, userEmail: string }) {
  const user= await UserSchema.create({
    userid: '5',
    username: username,
    userpassword: userPassword,
    useremail: userEmail,
  });
  return user?.dataValues;
}

export async function getUserByEmail ({userEmail}:{userEmail: string}) {
  const user = await UserSchema.findOne({
    where: {
      useremail: userEmail,
    },
  });
  return user;
}

export async function getUserByUsername ( {username}:{username: string}) {
  try {
    const user = await UserSchema.findOne({
      where: {
        username,
      },
    });
    return user?.dataValues;
  } catch (error) {
    console.log('Error in getUserByUsername in users.repo', error);
    return null;
  }
}

export async function confirmUser ( { username } : { username: string }) {
  try {
    const confirmedUser = await UserSchema.update(
      { isconfirmed: true },
      { where: { username: username } }
    );
    if (!confirmedUser) {
      return null;
    }
    return confirmedUser;
  }
  catch (error) {
    console.log('Error in confirmUser in users.repo', error);
    return null;
  }
}

export async function getUserById(id: string) {
  const user = await UserSchema
    .findOne({
      where: {
        userid: id,
        isarchived: false,
        isconfirmed: true,
      },
    });
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
