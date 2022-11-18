exports.validate = (ctx, next) => {
  const data = ctx.request.body;
  console.log(data);
  if (!data) {
    ctx.statusCode = 400;
    ctx.body = 'data is required';
  }
  if (!data.name) {
    ctx.statusCode = 400;
    ctx.body = 'name is required';
  } else if (typeof data.name !== 'string') {
    ctx.statusCode = 400;
    ctx.body = 'name is not valid';
  } else if (!data.email) {
    ctx.statusCode = 400;
    ctx.body = 'email is required';
  } else if (
    !data.email
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      )
  ) {
    ctx.statusCode = 400;
    ctx.body = 'email is not valid';
  } else if (!data.gender) {
    ctx.statusCode = 400;
    ctx.body = 'gender is required';
  } else if (!(data.gender === 'male' || data.gender === 'female')) {
    ctx.statusCode = 400;
    ctx.body = 'gender must be male or female';
  } else if (!data.address || data.address.length === 0) {
    ctx.statusCode = 400;
    ctx.body = 'address is required';
  } else if (typeof data.address.city !== 'string') {
    ctx.statusCode = 400;
    ctx.body = `city isn't a string`;
  } else if (data.address.city.length === 0) {
    ctx.statusCode = 400;
    ctx.body = 'city is required';
  } else if (!data.address.street || data.address.street.length === 0) {
    ctx.statusCode = 400;
    ctx.body = 'street is required';
  } else if (!data.phone) {
    ctx.statusCode = 400;
    ctx.body = 'phone number is required';
  } else {
    ctx.state.body = data;
    next();
  }
};
