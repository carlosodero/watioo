import zod from 'zod';
import {User} from '../../interfaces/user.js';

const userSchema = zod.object({
  userId: zod.string(),
  username: zod.string(),
  userEmail: zod.string().email(),
  userPassword: zod.string(),
  isArchived: zod.boolean(),
  isConfirmed: zod.boolean(),
  isAdmin: zod.boolean(),
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
