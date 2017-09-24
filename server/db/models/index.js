const User = require('./user')
const Phq = require('./phq')

User.hasMany(Phq)
Phq.belongsTo(User)

module.exports = {
  User,
  Phq
}
