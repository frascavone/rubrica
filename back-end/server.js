const fs = require('fs');

// Chiamata alla libreria Faker per riempire la lista di contatti

// const { faker } = require('@faker-js/faker');

// const createRandomUsers = (numberOfUsers) => {
//   const data = require('./dev-data/data.json');

//   for (let i = 0; i < numberOfUsers; i++) {
//     const sex = faker.name.sexType();
//     const firstName = faker.name.firstName(sex);
//     const lastName = faker.name.lastName();
//     const username = `${firstName} ${lastName}`;
//     const phone = faker.phone.number('+39 ### ### ####');
//     const email = faker.helpers.unique(faker.internet.email, [
//       firstName,
//       lastName,
//     ]);
//     const randomUser = {
//       id: faker.datatype.uuid(),
//       firstName,
//       lastName,
//       username,
//       email,
//       phone,
//       avatar: faker.image.avatar(),
//       sex,
//     };
//     data.push(randomUser);
//   }
//   fs.writeFile('./dev-data/data.json', JSON.stringify(data), function (err) {
//     if (err) throw err;
//     console.log(`${numberOfUsers} utenti salvati in ./dev-data/data.json!`);
//   });
// };
// createRandomUsers(100);

// Inizializzazione server /////////////////////////////
const users = JSON.parse(
  fs.readFileSync(`${__dirname}/dev-data/data.json`, 'utf-8')
);

const express = require('express');
const app = express();
const cors = require('cors');

app.use(express.json());

app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept'
  );
  res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');
  next();
});

app.get('/api/users', cors({ origin: 'http://localhost:5173' }), (req, res) => {
  res.status(200).json({
    status: 'success',
    users,
  });
});

app.post(
  '/api/users',
  cors({ origin: 'http://localhost:5173' }),
  (req, res) => {
    users.unshift(req.body);
    fs.writeFile(
      `${__dirname}/dev-data/data.json`,
      JSON.stringify(users),
      function (err) {
        if (err) throw err;
        console.log(`Contatto Aggiunto!`);
      }
    );
    res.send('Fatto!');
  }
);

app.delete(
  '/api/users/:id',
  cors({ origin: 'http://localhost:5173' }),
  (req, res) => {
    const updatedList = users.filter((el) => el.id !== req.params.id);
    fs.writeFile(
      `${__dirname}/dev-data/data.json`,
      JSON.stringify(updatedList),
      function (err) {
        if (err) throw err;
        console.log(`Contatto Eliminato!`);
      }
    );
    res.status(204).json({
      data: null,
    });
  }
);

app.patch(
  '/api/users/:id',
  cors({ origin: 'http://localhost:5173' }),
  (req, res) => {
    res.status(200).json({ data: null });
  }
);

const port = 3000;
app.listen(port, () => {
  console.log(`Listening to requests on port ${port}...`);
});
