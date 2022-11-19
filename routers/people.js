const people = require('../controllers/people');
const { validate } = require('../middlewares/validate');
const router = require('koa-router')({ prefix: '/people' });

router.get('/', people.getPeople);

router.delete('/person/:id', people.deletePerson);

router.post('/person', validate, people.postPerson);

router.put('/person/:id', validate, people.putPerson);

module.exports = router;
