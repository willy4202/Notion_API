const { Client } = require('@notionhq/client');
const dotenv = require('dotenv');
const { sendMessageToSpace } = require('./googleChat');

dotenv.config();

const notion = new Client({ auth: process.env.NOTION_TOKEN });
const database_id = process.env.NOTION_DATABASE_ID_BY_API;

let itemInDatabase = {};

async function findChangesAndAction() {
  console.log(
    '============== Looking for changes in Notion database =============='
  );
  const currItemInDatabase = await getItemFromDatabase();

  for (const [key, value] of Object.entries(currItemInDatabase)) {
    const page_id = key;
    const curr_place = value.place;
    const curr_status = value.status;
    if (!(page_id in itemInDatabase)) {
      itemInDatabase[page_id] = value;
      sendMessageToSpace(`${curr_place}(이/가) 추가됐습니다`);
    }
    if (!Object.keys(itemInDatabase).includes(page_id)) {
      console.log(page_id);
    } else {
      if (curr_status !== itemInDatabase[page_id].status) {
        itemInDatabase[page_id] = {
          status: curr_status,
        };
        console.log('status change');
        sendMessageToSpace(`${value.place} status changed to ${curr_status}`);
      }
    }
  }
  console.log(itemInDatabase);
  setTimeout(main, 5000);
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
      items[page.id] = {
        place: page.properties.place.title[0]?.text.content ?? '미정',
        status: page.properties.status.select?.name ?? '미정',
      };
    }
    /** page list가 추가로 들어올 것이 있으면, 추가 page 요청 */
    if (current_page.has_more) {
      await getPagesByCursor(current_page.next_cursor);
    }
  }
  await getPagesByCursor();
  return items;
}

function main() {
  findChangesAndAction().catch((err) => console.log(err));
}

async function init() {
  itemInDatabase = await getItemFromDatabase();
  main();
}

module.exports = {
  itemInDatabase,
  main,
  init,
};
