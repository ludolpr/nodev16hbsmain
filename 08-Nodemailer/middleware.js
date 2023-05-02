module.exports = {
    isAdmin: async (req, res, next) => {
      if(!req.session.user) return res.redirect('/')
      const [user] = await db.query(`SELECT isAdmin FROM users WHERE email="${req.session.user.email}"`);
      ( user.isAdmin === req.session.user.isAdmin && user.isAdmin === 0 ) ? res.redirect('/') : next();
    },
    isSession: async (req, res, next) => {
      if(!req.session.user) return res.redirect('back');
      next()
    }
}