const { Client } = require('@notionhq/client');
const { response } = require('express');
const express = require('express');
const dotenv = require('dotenv').config();
const fs = require('fs');
const app = express();

const notion = new Client({ auth: process.env.NOTION_TOKEN });
const databaseId = process.env.NOTION_DATABASE_ID;

/** 전체 로직을 파악하기 위한 함수, 형식에 상관없이 title하나가 기재된 페이지를 추가해준다. */
async function addPagetoNotionDb(text) {
  try {
    const response = await notion.pages.create({
      parent: { database_id: databaseId },
      properties: {
        title: {
          title: [
            {
              text: {
                content: text,
              },
            },
          ],
        },
      },
    });
    console.log(response);
    console.log('Success! Entry added.');
  } catch (error) {
    console.error(error.body);
  }
}

// addItem('hi');

async function exportDBtoJSON(client, databaseId) {
  const response = await client.databases.query({
    database_id: databaseId,
  });
  response.results.map((x) => console.log(x.properties));
  JsonStringify = JSON.stringify(response.results);
  fs.writeFileSync('notion.json', JsonStringify);
}
// exportDBtoJSON(notion, databaseId);

/** json파일을 읽어서 연결된 notion DB로 page를 생성해주는 함수 */
function postJsonToDB(notion, databaseId) {
  const notionData = require('./notion.json');

  notionData.map(async (page) => {
    await notion.pages.create({
      parent: {
        database_id: databaseId,
      },
      properties: {
        title: {
          title: [
            {
              text: {
                content: page.properties.place.title[0].text.content,
              },
            },
          ],
        },
        address: {
          rich_text: [
            {
              type: 'text',
              text: {
                content: page.properties.address.rich_text[0].text.content,
              },
            },
          ],
        },
        link: {
          url: page.properties.link.url,
        },

        category: {
          select: {
            name: page.properties.category.select.name,
          },
        },
      },
    });
  });
}
postJsonToDB(notion, databaseId);
