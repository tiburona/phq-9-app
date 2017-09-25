const router = require('express').Router()
module.exports = router

router.get('/end', (req, res, next) => {
  req.session.destroy()
  res.json({session: ''})
})

router.get('/', (req, res, next) => {
  res.json({session: req.sessionID})
})

