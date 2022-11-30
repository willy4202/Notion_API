const { Client } = require('@notionhq/client');
const dotenv = require('dotenv').config();

const notion = new Client({
  auth: process.env.NOTION_TOKEN,
});
const database_id = process.env.NOTION_DATABASE_ID;

module.exports = async function getDataBase() {
  const { results } = await notion.databases.query({
    database_id,
  });

  const table = results.map((data) => {
    console.log(data);
  });
};
