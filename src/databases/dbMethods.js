const fs = require('fs');
const axios = require('axios');

const { Client } = require('@notionhq/client');
const dotenv = require('dotenv');
const { refineData } = require('../../utils/refineData');
dotenv.config();

const notion = new Client({ auth: process.env.NOTION_TOKEN });

async function retrieveDB(databaseId) {
  const response = await notion.databases.retrieve({ database_id: databaseId });
  console.log(response);
}

/** DB의 리스트를 받아옴
 * - query 옵션을 함께 전송해서 filter, sort할 수 있음
 */
async function postQueryDB(databaseId, option) {
  try {
    const response = await notion.databases.query({
      database_id: databaseId,
      filter: option?.filter,
      sort: option?.sort,
    });

    const data = await refineData(response);
    console.log(data);
    return data;
  } catch (error) {
    console.log(error.body);
  }
}

/** List를 받아서 파일에 write함
 * - query한 결과를 fs로 작성하는 방식
 */
async function exportDBtoJSON(databaseId, query) {
  const response = await postQueryDB(databaseId, query);
  JsonStringify = await JSON.stringify(response);
  fs.writeFileSync(
    `${new Date().toLocaleString('ko-KR')}notion.json`,
    JsonStringify
  );
}

/** parentPage의 하위로 DB를 생성함
 * - 401에러 header나 token을 전달하는 방법을 sdk에서 찾아야함
 */
function createDB() {
  axios
    .post('https://api.notion.com/v1/databases', {
      headers: {
        accept: 'application/json',
        'Notion-Version': '2022-06-28',
        'content-type': 'application/json',
        Authorization: `Bearer ${process.env.NOTION_TOKEN}`,
      },
      parent: {
        type: 'page_id',
        page_id: process.env.NOTION_PAGE_ID,
      },
    })
    .then(function (response) {
      console.log(response.data);
    })
    .catch(function (error) {
      console.error(error);
    });
}

/** query해서 list 데이터 refine 후 리턴 */
async function getDatabase(databaseId) {
  const response = await notion.databases.query({ database_id: databaseId });
  const responseResults = response.results.map((page) => {
    return {
      id: page.id,
      place: page.properties.place.title[0]?.plain_text,
      status: page.properties.status.select.name,
      address: page.properties.address.rich_text[0]?.plain_text,
    };
  });

  console.log(responseResults);
  return responseResults;
}

module.exports = {
  postQueryDB,
  exportDBtoJSON,
  createDB,
  retrieveDB,
  getDatabase,
};
