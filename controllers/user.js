import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt-nodejs';
import { User } from '../models';
// const { User } = require('../models/user');

const { JWTSECRET } = process.env;


const userDetails = (user) => {
  const fields = {
    id: user.id,
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
    role: user.role,
    createdAt: user.createdAt,
    updatedAt: user.updatedAt,
  };
  return fields;
};
class UserController {
  static createUser(req, res) {
    User.create(req.body)
      .then((createdUser) => {
        const token = jwt.sign({
          userId: createdUser.id,
          email: createdUser.email,
          role: createdUser.role,
        }, JWTSECRET, { expiresIn: '365 days' });
        return res
          .status(200)
          .send({
            message: 'New user created successfully',
            user: createdUser,
            token,
          });
      })
      .catch(err => res.status(400).send({ err }));
  }

  static getUsers(request, response) {
    console.log(request.body);
    User.findAll({
      where: {
        role: 'User',
      },
    }).then((users) => {
      response.status(200).send({ message: 'Users found', users });
    }).catch((err) => {
      if (err) {
        response.status(404).send({ message: 'none found' });
      }
    });
  }

  static logIn(request, response) {
    User.findOne({
      where: {
        email: request.body.email,
      },
    }).then((user) => {
      if (user) {
        const validatePassword = bcrypt.compareSync(request.body.password, user.password);
        if (validatePassword) {
          const token = jwt.sign({
            userId: user.id,
            email: user.email,
            role: user.role,
          }, JWTSECRET, { expiresIn: '360 days' });
          response.status(200).send({ message: 'logged in', user: userDetails(user), token });
        } else {
          response.status(400).send({ message: 'invalid password' });
        }
      } else {
        response.status(400).send({ message: 'User not found' });
      }
    });
  }

  static deleteUser(request, response) {
    if (request.body.role === 'Admin') {
      User.findOne({
        where: {
          email: request.body.email,
        },
      }).then((user) => {
        if (user) {
          User.destroy({
            where: {
              email: user.email,
            },
          }).then(() => response.status(200).send({ message: 'User deleted successfully' }));
        } else {
          response.status(404).send({ message: 'User not found' });
        }
      });
    } else {
      response.status(401).send({ message: 'Sorry, you are not authorized to perform this action' });
    }
  }
}
export default UserController;
