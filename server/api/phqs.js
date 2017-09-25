const router = require('express').Router()
const { Phq } = require('../db/models')
module.exports = router

router.get('/:user', (req, res, next) => {
  if (!req.user) {
    return res.status(401).send('You must be logged in')
  } else if (parseInt(req.params.user) !== req.user.id) {
    return res.status(403).send('You can only see your own data.')
  } else {
    Phq.findAll({
      where: {
        userId: req.params.user
      }
    })
      .then(phqs => res.status(200).json(phqs))
      .catch(next)
  }
})

router.post('/', (req, res, next) => {
  Phq.create(req.body)
    .then(phq => res.status(201).json(phq))
    .catch(next)
})

router.put('/:session', (req, res, next) =>
  Phq.update(
    { userId: req.body.userId },
    {
      where: {
        session: req.params.session
      },
      returning: true,
      plain: true
    })
    .then((phq) => {
      res.status(201).json(phq)})
    .catch(next)
)



