const Sequelize = require('sequelize')
const db = require('../db')

const Phq = db.define('phq', {
  q1: {
    type: Sequelize.INTEGER,
    allowNull: false,
    validate: {min: 0, max: 3}
  },
  q2: {
    type: Sequelize.INTEGER,
    allowNull: false,
    validate: {min: 0, max: 3}
  },
  q3: {
    type: Sequelize.INTEGER,
    allowNull: false,
    validate: {min: 0, max: 3}
  },
  q4: {
    type: Sequelize.INTEGER,
    allowNull: false,
    validate: {min: 0, max: 3}
  },
  q5: {
    type: Sequelize.INTEGER,
    allowNull: false,
    validate: {min: 0, max: 3}
  },
  q6: {
    type: Sequelize.INTEGER,
    allowNull: false,
    validate: {min: 0, max: 3}
  },
  q7: {
    type: Sequelize.INTEGER,
    allowNull: false,
    validate: {min: 0, max: 3}
  },
  q8: {
    type: Sequelize.INTEGER,
    allowNull: false,
    validate: {min: 0, max: 3}
  },
  q9: {
    type: Sequelize.INTEGER,
    allowNull: false,
    validate: {min: 0, max: 3}
  },
  q10: {
    type: Sequelize.INTEGER,
    allowNull: false,
    validate: {min: 0, max: 3}
  },
  session: {
    type: Sequelize.STRING
  },
  score: {
    type: Sequelize.INTEGER,
    validate: {min: 0, max: 27}
  }
})

module.exports = Phq


  




