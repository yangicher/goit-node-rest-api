import { DataTypes } from "sequelize";
import { sequelize } from "../sequelize.js";

const User = sequelize.define(
  'users', {
    password: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: {
        args: true,
        msg: "Email in use",
      },
    },
    subscription: {
        type: DataTypes.ENUM,
        values: ["starter", "pro", "business"],
        defaultValue: "starter"
    },
    token: {
        type: DataTypes.STRING,
        defaultValue: null,
    },
    avatarURL: {
        type: DataTypes.STRING,
        defaultValue: null,
    },
    verify: {
      type: DataType.BOOLEAN,
      defaultValue: false,
    },
    verificationToken: {
      type: DataType.STRING,
    },
  }
);

export default User;

