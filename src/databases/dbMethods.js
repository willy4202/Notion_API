const fs = require('fs');

// ====== query To DB
async function postQueryDB(notion, databaseId) {
  try {
    const response = await notion.databases.query({
      database_id: databaseId,
    });
    console.log(response);
    return response;
  } catch (error) {
    console.log(error.body);
  }
}

// ====== export To DB
async function exportDBtoJSON(notion, databaseId) {
  const response = await postQueryDB(notion, databaseId);
  JsonStringify = JSON.stringify(response.results);
  fs.writeFileSync('notion.json', JsonStringify);
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
