const { Client } = require('@notionhq/client');
const dotenv = require('dotenv');
const { sendMessageToSpace } = require('./googleChat');

dotenv.config();

const notion = new Client({ auth: process.env.NOTION_TOKEN });
const database_id = process.env.NOTION_DATABASE_ID;

let itemInDatabase = {};

async function findChangesAndAction() {
  console.log('Looking for changes in Notion database ');
  /** 5초마다 연결된 노션 DB의 정보를 가지고 온다 */
  const currItemInDatabase = await getItemFromDatabase();

  for (const [key, value] of Object.entries(currItemInDatabase)) {
    const page_id = key;
    const curr_status = value.Status;

    if (!(page_id in itemInDatabase)) {
      itemInDatabase[page_id] = value;
    } else {
      /** 기존 DB의 status와 5초마다 요청하는 DB를 비교해서 기존 DB를 업데이트함 */
      if (curr_status !== itemInDatabase[page_id].Status) {
        itemInDatabase[page_id] = {
          Status: curr_status,
        };
        console.log('status change');
        let message = `${value.Place} status changed to ${value.Status}`;
        sendMessageToSpace(message);
      }
    }
  }
  console.log(currItemInDatabase);
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
        Place: page.properties.place.title[0]?.text.content ?? '미정',
        Status: page.properties.status.select?.name ?? '폐업',
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
  console.log('this is local DB', itemInDatabase);
  main();
}

module.exports = {
  itemInDatabase,
  main,
  init,
};
