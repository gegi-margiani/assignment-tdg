const Koa = require('koa');
const bodyParser = require('koa-bodyparser');
const router = require('./routers/people');

const app = new Koa();

app.use(bodyParser({ enableTypes: ['json', 'text'] }));
app.use(router.routes());
app.use(router.allowedMethods());

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => console.log(`Server listening on port ${PORT}.`));
