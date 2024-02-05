import { DataTypes } from 'sequelize';
import sequelize from '../../database.js';

const UserSchema = sequelize.define('users', {
  userid: {
    type: DataTypes.STRING,
    primaryKey: true,
  },
  username: DataTypes.STRING,
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
},
{
  timestamps: false,
}
);

export default UserSchema;
