const Koa = require('koa');

// 注意require('koa-router')返回的是函数:
const router = require('koa-router')();
const multer = require('koa-multer');

const app = new Koa();
const upload = multer({ dest: 'uploads/' });

// log request URL:
app.use(async (ctx, next) => {
    console.log(`Process ${ctx.request.method} ${ctx.request.url}...`);
    await next();
});

// add url-route:
router.get('/hello/:name', async (ctx, next) => {
    var name = ctx.params.name;
    ctx.response.body = `<h1>Hello, ${name}!</h1>`;
});

router.get('/upload', async (ctx, next) => {
    ctx.response.body = `<form method='post' action='/upload' enctype='multipart/form-data' >
  <input type="file" multiple name='field1'/><br>
  <input type="submit" />
</form>`;
});

router.post('/upload', upload.single('field1'),async (ctx, next) => {
    var filename = ctx.req.file.originalname;
    var filesize = ctx.req.file.size;
    ctx.response.body = `<h1>SUCCESS,${filename},${filesize}!</h1>`;
});

router.get('/', async (ctx, next) => {
    ctx.response.body = '<h1>Index</h1>';
});

// add router middleware:
app.use(router.routes());

app.listen(3000);
console.log('app started at port 3000...');