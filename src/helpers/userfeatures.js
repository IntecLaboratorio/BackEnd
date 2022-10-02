import jwt from 'jsonwebtoken';

function generateToken(email, name_user) {

  const secret = 't3h&V.w/7kpe/0XaiFrf';

  return jwt.sign({ infoUser: { email, name_user } }, secret, { expiresIn: 60 * 60 * 5 });
}

export { generateToken };;