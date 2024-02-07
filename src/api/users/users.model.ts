import { DataTypes } from 'sequelize';
import sequelize from '../../database.js';

const UserSchema = sequelize.define('users', {
  userId: {
    type: DataTypes.UUID,
    primaryKey: true,
  },
  username: {
    type: DataTypes.STRING,
    unique: true,
  },
  userEmail: DataTypes.STRING,
  userPassword: DataTypes.STRING,

  isArchived: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
  isConfirmed: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
  isAdmin: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
  dni: DataTypes.STRING,
  phone: DataTypes.STRING,
  name: DataTypes.STRING,
  surname: DataTypes.STRING,
},
{
  timestamps: false,
}
);

export default UserSchema;
