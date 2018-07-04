
import bcrypt from 'bcrypt-nodejs';

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    companyName: {
      type: DataTypes.STRING,
      allowNull: true,
      unique: false,
    },
    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [6],
      },
    },
    phoneNumber: {
      type: DataTypes.STRING,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: {
          message: 'Invalid email address',
        },
      },
    },
    // role: {
    //   type: DataTypes.ENUM('Admin', 'User'),
    //   defaultValue: 'Admin',
    // },
  }, {
    hooks: {
      beforeCreate: (user) => {
        user.password = bcrypt.hashSync(user.password, bcrypt.genSaltSync());
      },
    },
  });
  // User.associate = (models) => {
  //   User.hasMany(models.Invoice, {
  //     foreignKey: 'UserId',
  //     as: 'Invoices',
  //   });
  // };
  return User;
};
