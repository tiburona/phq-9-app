const router = require('express').Router()
module.exports = router

router.get('/end', (req, res, next) => {
  req.session.destroy()
  res.json({ session: '' })
    .catch(next)
})

router.get('/', (req, res, next) => {
  res.json({ session: req.sessionID })
    .catch(next)
})


