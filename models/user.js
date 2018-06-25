'use strict';
import bcrypt from 'bcrypt-nodejs'

module.exports = (sequelize, DataTypes) => {
  var User = sequelize.define('User', {
    companyName: {
      type: DataTypes.STRING,
      allowNull: true,
      unique: true
    },
    firstName: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    companyName: {
      type: DataTypes.STRING,
      allowNull: true,
      unique: true
    },
    password: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    phoneNumber: {
      type: DataTypes.STRING
    },
    email: {
      type: DataTypes.STRING
      unique: true
      validate: {
        isEmail:{
        message: "Invalid email address"
        }
      }
    },
    companyName: {
      type: DataTypes.STRING
    }

  }, {
    hooks:
  });
  User.associate = function(models) {
    // associations can be defined here
  };
  User.beforeCreate(function(user, options) {
    return cryptPassword(user.password)
      .then(success => {
        user.password = success;
      })
      .catch(err => {
        if (err) console.log(err);
      });
  });

function cryptPassword(password) {
  console.log("cryptPassword" + password);
  return new Promise(function(resolve, reject) {
    bcrypt.genSalt(10, function(err, salt) {
      // Encrypt password using bycrpt module
      if (err) return reject(err);

      bcrypt.hash(password, salt, null, function(err, hash) {
        if (err) return reject(err);
        return resolve(hash);
      });
    });
  });

  return User;
};