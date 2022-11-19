require('dotenv').config();
const path = require('path');
const serve = require('koa-static');
const mount = require('koa-mount');
const Koa = require('koa');
const cors = require('@koa/cors');
const bodyParser = require('koa-bodyparser');
const router = require('./routers/people');

const app = new Koa();

app.use(bodyParser({ enableTypes: ['json', 'text'] }));
app.use(cors());
app.use(router.routes());
app.use(router.allowedMethods());
app.use(serve(path.join(__dirname, 'client/build')));
app.use(
  mount('/', serve(path.resolve(__dirname, 'client/build', 'index.html')))
);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server listening on port ${PORT}.`));
