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
const router = require('koa-router')
const bodyParser = require('koa-bodyparser');
const uuidV4 = require('uuid/v4');
const controller = require('./controller');
const websockify = require('koa-websocket');
const wsControl = require('./wsControl')
const route = require('koa-route')
const IO = require('koa-socket')
const api = new router();
//创建一个包裹websocket的koa对象
const app = new Koa();
const io = new IO();
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

//独立处理文件上传的api
api.post('/api/upload', async(ctx, next) => {
		console.log('?')
		var form = new formidable.IncomingForm();
		form.parse(ctx.req, async function (err, fields, files) {
				// 上传的数据放在fields,文件放在files中,目前只尝试图片转base64然后base64再转回图片上传(ps:图片转base64可能会变大了,这种上
				// 传 方式合不合理有待商榷) 取出formdata中的数据,假如提交了tes1,test2,和一个名为base64的base64数据
				if (err) {
						return err
				}
				let {test1, test2, pic} = fields;
				//test1,test2,base64就是提交的数据了
				console.log(fields)
		});
		ctx.body = {
				code: '1'
		}
		// await next();
})

io.on('connect', async(ctx, data) => {
		console.log('connect')
		ctx
				.socket
				.emit('event', '123')
})

io.on('new-Pic-Change', async(ctx, data) => {
		console.log('join event fired', data)
		io.broadcast('received-pic-message', data)
})

io.on('pic-instead', async(ctx, data) => {
		io.broadcast('received-pic-instead',data)
})

io.on('send-message',(ctx,data)=>{
	io.broadcast('received-message',data)
})

//加载routes
app
		.use(api.routes())
		.use(api.allowedMethods());

//处理其他url
app.use(controller());

io.attach(app)
app.listen(3001);
console.log("app start at port 3001");