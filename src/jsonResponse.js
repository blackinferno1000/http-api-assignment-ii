const users = {};

const respondJSON = (req, res, status, object) => {
  res.writeHead(status, { 'Content-Type': 'application/json' });
  res.write(JSON.stringify(object));
  res.end();
};

const respondJSONMeta = (req, res, status) => {
  res.writeHead(status, { 'Content-Type': 'application/json' });
  res.end();
};

const getUsers = (req, res, meta) => {
  const responseJSON = {
    users,
  };

  if(meta) {
    return respondJSONMeta(req, res, 200);
  }

  respondJSON(req, res, 200, responseJSON);
};

const notFound = (req, res, meta) => {
  const responseJSON = {
    message: 'The page you are looking for was not found.',
    id: 'notFound',
  };

  if(meta) {
    return respondJSONMeta(req, res, 404);
  }

  respondJSON(req, res, 404, responseJSON);
};

const addUser = (req, res, body) => {
  const responseJSON = {
    message: 'Name and age are both required',
  };

  if(!body.name || !body.age){
    responseJSON.id = 'missingParams';
    return respondJSON(req, res, 400, responseJSON);
  }

  let responseCode = 201;

  if(users[body.name]){
    responseCode = 204;
  } else {
    users[body.name] = {};
  }

  users[body.name].name = body.name;
  users[body.name].age = body.age;

  if(responseCode === 201){
    responseJSON.message = 'Created Successfully';
    return respondJSON(req, res, responseCode, responseJSON);
  }

  return respondJSONMeta(req, res, responseCode);
};

module.exports = {
  getUsers,
  addUser,
  notFound,
};