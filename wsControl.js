const route = require('koa-route')

function wsControl(app){
  //全体广播的内容
   app.ws.use(async(ctx,next)=>{
     await next()
   })

   app.ws.use(route.all('/'),async(ctx)=>{
      //test
      ctx.websocket.send('Hello,world')

      ctx.websocket.on('picChanged',function(message){
        console.log(message)
      })
   })
}

module.exports = wsControl