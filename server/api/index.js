const router = require('express').Router()
module.exports = router

router.use('/users', require('./users'))
router.use('/phqs', require('./phqs'))
router.use('/session', require('./session'))

router.use((req, res, next) => {
  const error = new Error('Not Found')
  error.status = 404
  next(error)
})


