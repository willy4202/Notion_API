/** 전달받은 id의 page 정보, 스키마를 보여준다. */
async function retrievePage(notion, pageId) {
  const response = await notion.pages.retrieve({ page_id: pageId });
  // console.log(response.properties.title.title[0]);
  console.log(response);
}

/**  하위에 page를 추가한다
 * 1. 현재 DB 스키마에 맞춰서 page를 추가하게 설정되어 있다.
 * 2. 만약 parent Page 하위에 추가하고 싶다면 pageID를 설정해주자.
 */
async function createPage(notion, id, text) {
  try {
    notion.pages.create({
      parent: { database_id: id },
      // parent: { page_id: id },
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

/** json 파일을 DB에 추가한다.
 * 한계점은 다음과 같다.
 * 1. DB의 스키마가 다를 경우 에러를 반환하기에 DB마다 다른 로직이 필요하다.
 * 2. bulk page는 api에서 지원하지 않음, pageMethods의 createPage를 데이터 수만큼 실행시킨다.
 * 현재는 진료 현황 DB에 맞춰져 있음  */
function createBulkPageToDB(notion, databaseId) {
  const notionData = require('../../2022. 12. 15. 오전 10:33:10notion.json');
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

        status: {
          select: {
            name: page.properties.status.select.name,
          },
        },
      },
    });
  });
}

module.exports = { retrievePage, createPage, createBulkPageToDB };
