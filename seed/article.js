const { faker } = require('@faker-js/faker');
//const faker = require("faker");
const articales = [];

for(let i = 0; i < 5; i++){
    articales.push({
        id:i,
        title:faker.lorem.sentence(),
        subTitle:faker.lorem.sentence(),
        creatDate:faker.date.past().toString(),
        content:faker.lorem.paragraphs(),
        /*
        publish:[true, false][
            Math.floor(Math.random()*[true, false].length)
        ],
        */
       publish:[true],
        url:`/articales/${i}`
    });
}

module.exports = articales;