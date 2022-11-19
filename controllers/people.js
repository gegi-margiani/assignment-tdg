const fs = require('fs');
const path = require('path');

exports.getPeople = (ctx, next) => {
  try {
    const people = JSON.parse(
      fs.readFileSync(path.join(__dirname, '../db.json'), 'utf8')
    );
    ctx.body = people;
  } catch (error) {
    console.log(error);
    ctx.status = 500;
  }
};

exports.deletePerson = (ctx, next) => {
  try {
    const id = ctx.params.id;
    if (!id || typeof +id !== 'number') {
      ctx.status = 400;
      ctx.body = 'id must be a number';
      return;
    }
    const people = JSON.parse(
      fs.readFileSync(path.join(__dirname, '../db.json'), 'utf8')
    );
    const indexOfPerson = people.findIndex((person) => person.id === +id);
    if (indexOfPerson === -1) {
      ctx.status = 404;
      ctx.body = 'Person not found';
      return;
    }
    people.splice(indexOfPerson, 1);
    fs.writeFileSync(
      path.join(__dirname, '../db.json'),
      JSON.stringify(people)
    );
    ctx.status = 200;
    ctx.body = 'Person deleted';
  } catch (error) {
    console.log(error);
    ctx.status = 500;
  }
};

exports.postPerson = (ctx, next) => {
  try {
    const person = { id: undefined, ...ctx.state.body };
    const people = JSON.parse(
      fs.readFileSync(path.join(__dirname, '../db.json'), 'utf8')
    );
    const id =
      people.reduce(function (prev, current) {
        return prev.id > current.id ? prev : current;
      }).id + 1;
    person.id = id;
    people.push(person);
    fs.writeFileSync(
      path.join(__dirname, '../db.json'),
      JSON.stringify(people)
    );
    ctx.status = 201;
    ctx.body = person;
  } catch (error) {
    console.log(error);
    ctx.status = 500;
  }
};

exports.putPerson = (ctx, next) => {
  try {
    const id = ctx.params.id;
    if (!id || typeof +id !== 'number') {
      ctx.status = 400;
      ctx.body = 'id must be a number';
      return;
    }
    const people = JSON.parse(
      fs.readFileSync(path.join(__dirname, '../db.json'), 'utf8')
    );
    const indexOfPerson = people.findIndex((person) => person.id === +id);
    if (indexOfPerson === -1) {
      ctx.status = 404;
      ctx.body = 'Person not found';
      return;
    }
    people[indexOfPerson] = { id: +id, ...ctx.state.body };
    fs.writeFileSync(
      path.join(__dirname, '../db.json'),
      JSON.stringify(people)
    );
    ctx.status = 200;
    ctx.body = 'Person updated';
  } catch (error) {
    console.log(error);
    ctx.status = 500;
  }
};
