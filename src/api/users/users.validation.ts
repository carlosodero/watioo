import zod from 'zod';
import {User} from '../../interfaces/user.js';

const userSchema = zod.object({
  userid: zod.string(),
  username: zod.string(),
  useremail: zod.string().email(),
  userpassword: zod.string(),
  isarchived: zod.boolean(),
  isconfirmed: zod.boolean(),
  isadmin: zod.boolean(),
  dni: zod.string(),
  phone: zod.string(),
  name: zod.string(),
  surname: zod.string(),
});

export function validateUser (user: User) {
  return userSchema.safeParse(user);
}

export function validatePartialUser (user: Partial<User>) {
  return userSchema.partial().safeParse(user);
}
