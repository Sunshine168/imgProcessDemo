// const fs = require("fs");
// const formidable = require('koa-formidable')
// var upload = async(ctx, next) => {
// 	var imgData = ctx.request.body.base64;
// 	let form = await formidable.parse(ctx)
// 	console.log(form);
// 	// var base64Data = imgData.replace(/^data:image\/\w+;base64,/, "");
// 	// var dataBuffer = new Buffer(base64Data, 'base64');
// 	// fs.writeFile("../static/upload/output.jpg", dataBuffer, function(err) {
// 	// 	if (err) {
// 	// 		res.send(err);
// 	// 	} else {
// 	// 		res.send("保存成功！");
// 	// 	}
// 	// });
// }
// module.exports = {
// 	'POST /api/upload': upload
// }