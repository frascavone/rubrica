const { faker } = require('@faker-js/faker');

const numberOfUsers = 200;

module.exports = () => {
  const data = { users: [] };

  for (let i = 0; i < numberOfUsers; i++) {
    const sex = faker.name.sexType();
    const firstName = faker.name.firstName(sex);
    const lastName = faker.name.lastName();
    const username = `${firstName} ${lastName}`;
    const phone = faker.phone.number('+39 ### ### ####');
    const email = faker.helpers.unique(faker.internet.email, [
      firstName,
      lastName,
    ]);
    const randomUser = {
      id: faker.datatype.uuid(),
      firstName,
      lastName,
      username,
      email,
      phone,
      avatar: faker.image.avatar(),
      sex,
    };
    data.users.push(randomUser);
  }
  return data;
};
