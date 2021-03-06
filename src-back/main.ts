import Koa from 'koa';
import serve from 'koa-static';
const app = new Koa();
const PORT = process.env.PORT || 8080;

console.log("Starting Application");
console.log("Running on port "+PORT);
console.log(__dirname);

// logger
app.use(async (ctx, next) => {
    await next();
    const rt = ctx.response.get('X-Response-Time');
    console.log(`${ctx.method} ${ctx.url} - ${rt}`);
});

// x-response-time

app.use(async (ctx, next) => {
    const start = Date.now();
    await next();
    const ms = Date.now() - start;
    ctx.set('X-Response-Time', `${ms}ms`);
});

// response
app.use(serve(__dirname+'/../app'));
app.listen(PORT);
