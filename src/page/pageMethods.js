const { Client } = require('@notionhq/client');
const dotenv = require('dotenv');
dotenv.config();

const notion = new Client({ auth: process.env.NOTION_TOKEN });

async function retrievePage(pageId) {
  const response = await notion.pages.retrieve({ page_id: pageId });
  console.log(response);
  return response;
}

async function createPage(id, text) {
  try {
    notion.pages.create({
      parent: { database_id: id },
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
    console.log(text + ' page is created!');
  } catch (error) {
    console.error(error.body);
  }
}

function createBulkPageToDB(databaseId) {
  const file = require('../../notion.json');
  const res = file.map(async (page) => {
    await notion.pages.create({
      parent: {
        database_id: databaseId,
      },
      properties: {
        place: {
          title: [
            {
              text: {
                content: page.place,
              },
            },
          ],
        },
        address: {
          rich_text: [
            {
              type: 'text',
              text: {
                content: page.address,
              },
            },
          ],
        },
        link: {
          url: page.link,
        },

        status: {
          select: {
            name: page.status,
          },
        },
      },
    });
  });
  return res;
}

async function updatePage(pageId, text) {
  notion.pages.update({
    page_id: pageId,
    properties: {
      place: {
        title: [{ text: { content: text } }],
      },
    },
  });
}

const createPageByClient = async (place_name, address, dbId) => {
  const response = await notion.pages.create({
    parent: {
      database_id: dbId,
    },
    properties: {
      place: {
        title: [
          {
            text: {
              content: place_name,
            },
          },
        ],
      },
      address: {
        rich_text: [
          {
            type: 'text',
            text: {
              content: address,
            },
          },
        ],
      },
      link: {
        url: '링크 미정',
      },

      status: {
        select: {
          name: '진료 대기',
        },
      },
    },
  });
  return response;
};

module.exports = {
  retrievePage,
  createPage,
  createBulkPageToDB,
  createPageByClient,
  updatePage,
};
