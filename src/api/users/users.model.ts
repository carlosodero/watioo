import { DataTypes } from 'sequelize';
import sequelize from '../../database.js';

const UserSchema = sequelize.define('users', {
  userid: {
    type: DataTypes.UUID,
    primaryKey: true,
  },
  username: {
    type: DataTypes.STRING,
    unique: true,
  },
  useremail: DataTypes.STRING,
  userpassword: DataTypes.STRING,

  isarchived: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
  isconfirmed: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
  isadmin: {
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
