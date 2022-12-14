const { Client } = require('@notionhq/client');
const dotenv = require('dotenv');

dotenv.config();

const notion = new Client({ auth: process.env.NOTION_TOKEN });
const database_id = process.env.NOTION_DATABASE_ID;

let itemInDatabase = {};

async function findChangesAndAction() {
  console.log('Looking for changes in Notion database ');
  const currItemInDatabase = await getItemFromDatabase();
}

async function getItemFromDatabase() {
  const items = {};

  /** start_curosr에 따라 reqeust payload 생성 */
  async function getPagesByCursor(cursor) {
    let reqeust_payload = '';
    if (cursor == undefined) {
      reqeust_payload = {
        method: 'POST',
        path: 'databases/' + database_id + '/query',
      };
    } else {
      reqeust_payload = {
        path: 'databases/' + database_id + '/query',
        method: 'POST',
        body: {
          start_cursor: cursor,
        },
      };
    }

    const current_page = await notion.request(reqeust_payload);

    for (const page of current_page.results) {
      if (page.properties.place) {
        items[page.id] = {
          Place: page.properties.place.title[0].text.content,
          Category: page.properties.category.select.name,
        };
      } else {
        items[page.id] = {
          Place: 'no Place',
          Category: page.properties.category.select.name,
        };
      }
    }
    /** page list가 추가로 들어올 것이 있으면, 추가 page 요청 */
    if (current_page.has_more) {
      await getPagesByCursor(current_page.next_cursor);
    }
  }
  await getPagesByCursor();
  return items;
}

findChangesAndAction();
