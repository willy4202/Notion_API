const fs = require('fs');
const axios = require('axios');

class NOTION_DB {
  constructor(notion, databaseId) {
    this.notion = notion;
    this.database_id = databaseId;
  }
}

// ====== query To DB
async function postQueryDB(notion, databaseId, option) {
  try {
    const response = await notion.databases.query({
      database_id: databaseId,
      filter: option?.filter,
      sort: option?.sort,
    });

    // response.results.map((x) => console.log(x.properties));
    // console.log(response.results);
    return response;
  } catch (error) {
    console.log(error.body);
  }
}

// ====== export To DB
async function exportDBtoJSON(notion, databaseId, option) {
  const response = await postQueryDB(notion, databaseId, option);
  const refineRes = [];

  //response.results.map((page) => console.log(page.properties.link.url));
  response.results.forEach((page) =>
    refineRes.push({
      id: page.id,
      place: page.properties.place.title[0].plain_text,
      address: page.properties.address.rich_text[0].plain_text,
      status: page.properties.status.select.name,
      link: page.properties.link.url,
    })
  );

  console.log(refineRes);

  JsonStringify = JSON.stringify(response.results);
  // fs.writeFileSync(
  //   `${new Date().toLocaleString('ko-KR')}notion.json`,
  //   JsonStringify
  // );
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
      body: {
        parent: '32a93b5989184169bbabf8b5d102b59e',
      },
    })
    .then(function (response) {
      console.log(response.data);
    })
    .catch(function (error) {
      console.error(error);
    });
}

async function retrieveDB(notion, databaseId) {
  const response = await notion.databases.retrieve({ database_id: databaseId });
  console.log(response);
}

module.exports = { postQueryDB, exportDBtoJSON, createDB, retrieveDB };
