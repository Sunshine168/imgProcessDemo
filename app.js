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
			if (err) {
				throw err;
				return;
			}
			//从fromdata中取出base64
			var pic = fields['pic']
				//正则替换base64
			var base64Data = pic.replace(/^data:image\/\w+;base64,/, "");
			//转换为数据流
			var dataBuffer = new Buffer(base64Data, 'base64');
			try {
				//生成文件名
				let fileName = uuidV4().replace(/-/g, "");
				//保存文件
				let result = await fs.writeFile(path.join(__dirname, `/static/upload/${fileName}.png`), dataBuffer)
			} catch (e) {
				console.log(e)
			}
			ctx.body = "end"
		});

		await next();
	})
	//处理其他url
app.use(controller());
app.listen(3001);
console.log("app start at port 3001");