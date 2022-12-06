// ====== create Page To DB
async function createPage(text, notion, databaseId) {
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

// ====== create Bulk Pages To DB
function createBulkPageToDB(notion, databaseId) {
  const notionData = require('../../notion.json');

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
module.exports = { createPage, createBulkPageToDB };
