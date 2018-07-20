import jwt from 'jsonwebtoken';


const secret = process.env.JWTSECRET;


class Auth {
  static validateToken(request, response, next) {
    const token = request.headers.authorization || request.headers['x-access-token'];
    if (!token) {
      return response.status(404).send({ message: 'No token suppplied' });
    }
    return jwt.verify(token, secret, (err, decoded) => {
      if (err) {
        return response.status(401).send({ message: 'Invalid token' });
      }
      request.decoded = decoded;
      return next();
    });
  }
}
export default Auth;
