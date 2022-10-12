import jwt from 'jsonwebtoken';

function verifyJWT(req, res, next) {
  const secret = 't3h&V.w/7kpe/0XaiFrf';

  const authHeader = req.headers.authorization;
  if (!authHeader) return res.status(401).send({ message: 'Token não informado.' });

  const parts = authHeader.split(' ');
  if (parts.length !== 2) return res.status(401).send({ message: 'Token inválido.' });

  const [scheme, token] = parts;
  if (!/^Bearer$/i.test(scheme)) return res.status(401).send({ message: 'Token inválido' });

  jwt.verify(token, secret, (err, decoded) => {
    if (err) {
      return res.status(401).send({ message: 'Usuário não autenticando.' });
    }
    req.infoUser = decoded.infoUser;
    return next();
  });
}

export { verifyJWT };