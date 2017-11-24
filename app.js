//导入koa
const Koa = require('koa');
const server = require('koa-static');
const convert = require('koa-convert')
const render = require('koa-ejs');
const path = require('path')
const upload = require('koa2-file-upload')
const body = require('koa-better-body')
const formidable = require("formidable");
const fs = require('async-file');
const router = require('koa-router')()
const bodyParser = require('koa-bodyparser');
const uuidV4 = require('uuid/v4');
const controller = require('./controller');
//创建一个koa对象
const app = new Koa();
app.use(async(ctx, next) => {
	console.log(`${ctx.request.method} ${ctx.request.url}`);
	await next();
});
//静态文件目录
app.use(convert(server(path.join(__dirname, '/'))));
//渲染html 设置为views文件夹
render(app, {
	root: path.join(__dirname, '/views/'),
	layout: false,
	viewExt: 'html',
	cache: false,
	debug: true
});
//加载routes
app.use(router.routes())
	//独立处理文件上传的api
router.post('/api/upload', async(ctx, next) => {
		var form = new formidable.IncomingForm();
		form.parse(ctx.req, async function(err, fields, files) {
			//上传的数据放在fields,文件放在files中,目前只尝试图片转base64然后base64再转回图片上传(ps:图片转base64可能会变大了,这种上传方式合不合理有待商榷)
			//取出formdata中的数据,假如提交了tes1,test2,和一个名为base64的base64数据
			if (err) {
				return err
			}
			let {
				test1,
				test2,
				base64
			} = fields;
			//test1,test2,base64就是提交的数据了


		});
		await next();
	})
	//处理其他url
app.use(controller());
app.listen(3001);
console.log("app start at port 3001");