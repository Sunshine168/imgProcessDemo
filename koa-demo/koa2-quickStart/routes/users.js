const router = require('koa-router')()

router.prefix('/users')

router.post('/signin', function(ctx, next) {
	var email = ctx.request.body.email,
		password = ctx.request.body.password;
	if (email.trim() === "admin@example.com" && password.trim() === "123456") {
		ctx.render('signin-ok.html', {
			name: "admin",
			title: "Sign In OK",
		})
	} else {
		ctx.render('signin-failed.html', {
			name: "admin",
			title: "Sign In Fail",
		})
	}
})

router.get('/bar', function(ctx, next) {
	ctx.body = 'this is a users/bar response'
})
router.post('/')

module.exports = router