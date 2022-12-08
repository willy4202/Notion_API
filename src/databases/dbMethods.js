const fs = require('fs');
const axios = require('axios');

// ====== query To DB
async function postQueryDB(notion, databaseId, option) {
  try {
    const response = await notion.databases.query({
      database_id: databaseId,
      filter: option?.filter,
      sort: option?.sort,
    });
    console.log(response.results.length);
    return response;
  } catch (error) {
    console.log(error.body);
  }
}

// ====== export To DB
async function exportDBtoJSON(notion, databaseId, option) {
  const response = await postQueryDB(notion, databaseId, option);

  JsonStringify = JSON.stringify(response.results);
  fs.writeFileSync(
    `${new Date().toLocaleString('ko-KR')}notion.json`,
    JsonStringify
  );
}

// ====== create DB
function createDB() {
  axios
    .post('https://api.notion.com/v1/databases', {
      headers: {
        accept: 'application/json',
        'Notion-Version': '2022-06-28',
        'content-type': 'application/json',
      },
    })
    .then(function (response) {
      console.log(response.data);
    })
    .catch(function (error) {
      console.error(error);
    });
}

module.exports = { postQueryDB, exportDBtoJSON, createDB };
