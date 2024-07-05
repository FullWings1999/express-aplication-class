const { faker } = require('@faker-js/faker');
//const faker = require("faker");
const articales = [];

for(let i = 0; i < 20; i++){
    articales.push({
        title:faker.lorem.sentence(),
        subTitle:faker.lorem.sentence(),
        data:faker.date.past().tostring,
        content:faker.lorem.paragraphs(),
        publish:[true, false][
            Math.floor(Math.random()*[true, false].length)
        ],
        url:`/articales/${i}`
    });
}

module.exports = articales;