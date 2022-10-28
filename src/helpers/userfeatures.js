import jwt from 'jsonwebtoken';

function generateToken(email, userName, typeUser) {

  const secret = 't3h&V.w/7kpe/0XaiFrf';

  return jwt.sign({ infoUser: { email, userName, typeUser } }, secret, { expiresIn: 60 * 60 * 5 });
}

export { generateToken };