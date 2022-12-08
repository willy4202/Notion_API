// ====== create Page To DB
async function createPage(notion, databaseId, text) {
  try {
    const array = new Array(300).fill(0).map((x, i) => ({ number: i }));

    array.map((page) =>
      notion.pages.create({
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
          number: {
            number: page.number,
          },
        },
      })
    );

    console.log('Success! Entry added.');
  } catch (error) {
    console.error(error.body);
  }
}

// ====== create Bulk Pages To DB
function createBulkPageToDB(notion, databaseId) {
  const notionData = require('../../2022. 12. 7. 오후 5:14:11notion.json');
  notionData.map(async (page) => {
    await notion.pages.create({
      parent: {
        database_id: databaseId,
      },
      properties: {
        place: {
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

async function retrievePage(notion, pageId) {
  const response = await notion.pages.retrieve({ page_id: pageId });
  console.log(response);
}

module.exports = { createPage, createBulkPageToDB, retrievePage };
