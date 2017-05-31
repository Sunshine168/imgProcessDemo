var photoIndex = async(ctx, next) => {
  await ctx.render('alloyphoto');
}
module.exports = {
  'GET /index': photoIndex
};