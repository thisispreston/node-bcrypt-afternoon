const bcrypt = require('bcryptjs');

module.exports = {
  register: async(req, res) => {
  let { username, password, isAdmin } = req.body
  let db = req.app.get('db')

  let result = await db.get_user([username])
  let existingUser = result[0]
  if (existingUser) {
    return res.status(409).send('Username taken.')
  }

  let salt = bcrypt.genSaltSync(10)
  let hash = bcrypt.hashSync(password, salt)
  let registeredUser = await db.register_user([isAdmin, username, hash])
  let user = registeredUser[0]

  req.session.user = {
    isAdmin: user.is_admin,
    id: user.id,
    username: user.username,
  }
  res.status(201).send(req.session.user)
  }
}
