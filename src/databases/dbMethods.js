const fs = require('fs');

const { Client } = require('@notionhq/client');
const dotenv = require('dotenv');
const { refineData } = require('../../utils/refineData');

dotenv.config();

const notion = new Client({ auth: process.env.NOTION_TOKEN });

/** parentPage의 하위로 DB를 생성함
 * - 401에러 header나 token을 전달하는 방법을 sdk에서 찾아야함
 */
async function createDB() {
  try {
    notion.databases.create({
      parent: {
        type: 'page_id',
        page_id: process.env.NOTION_PAGE_ID,
      },

      title: [
        {
          type: 'text',
          text: {
            content: '진료 현황 by API',
            link: null,
          },
        },
      ],
      properties: {
        place: {
          title: {},
        },
        status: {
          select: {
            options: [
              {
                name: '진료 완료',
                color: 'green',
              },
              {
                name: '진료 대기',
                color: 'gray',
              },
            ],
          },
        },
        address: {
          rich_text: {},
        },
        link: {
          url: {},
        },
      },
    });
  } catch (err) {
    console.log(err);
  }
}

async function retrieveDB(databaseId) {
  const response = await notion.databases.retrieve({ database_id: databaseId });
  console.log(response);
  return response;
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
    response.results.map((x) => console.log(x.properties));
    const data = await refineData(response);
    // console.log(data);
    return data;
  } catch (error) {
    console.log(error.body);
  }
}

/** List를 받아서 파일에 write함
 * - query한 결과를 fs로 작성
 */
async function exportDBtoJSON(databaseId, query) {
  const response = await postQueryDB(databaseId, query);
  JsonStringify = await JSON.stringify(response);
  fs.writeFileSync(`test1.json`, JsonStringify);
}

async function updateDB(databaseId, text) {
  const response = await notion.databases.update({
    database_id: databaseId,
    title: [
      {
        text: {
          content: text,
        },
      },
    ],
  });
  console.log(response);
}

const getDatabase = async (dbId) => {
  const response = await notion.databases.query({
    database_id: dbId,
  });
  const refinedResponse = response.results.map((page) => {
    return {
      id: page.id,
      place: page.properties.place.title[0]?.plain_text,
      address: page.properties.address.rich_text[0]?.plain_text,
      status: page.properties.status.select?.name,
      link: page.properties.link?.url,
    };
  });
  return refinedResponse;
};

module.exports = {
  createDB,
  retrieveDB,
  postQueryDB,
  exportDBtoJSON,
  updateDB,
  getDatabase,
};
