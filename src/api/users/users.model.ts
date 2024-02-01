import { DataTypes } from "sequelize";
import sequelize from "../../database";

const UserSchema = sequelize.define("users", {
  userid: {
    type: DataTypes.STRING,
    primaryKey: true,
  },
  username: DataTypes.STRING,
  useremail: DataTypes.STRING,
  userpassword: DataTypes.STRING,
},
{
 timestamps: false,
}
);

export default UserSchema;