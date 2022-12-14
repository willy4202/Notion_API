const { Client } = require('@notionhq/client');
const {
  createPage,
  createBulkPageToDB,
  retrievePage,
} = require('./src/page/pageMethods');
const {
  postQueryDB,
  exportDBtoJSON,
  createDB,
} = require('./src/databases/dbMethods');
const { getPage } = require('@notionhq/client/build/src/api-endpoints');
const { getHtml, parsing } = require('./src/news/crawling');
const cheerio = require('cheerio');
const { itemInDatabase, main } = require('./utils/findChangesAndAction');

const dotenv = require('dotenv').config();
const notion = new Client({ auth: process.env.NOTION_TOKEN });
const databaseId = process.env.NOTION_DATABASE_ID;

const pageId = process.env.NOTION_PAGE_ID;
const newsDB = process.env.NOTION_NEWS_ID;

const queryOption = {
  // filter: {
  //   property: 'category',
  //   select: {
  //     equals: '브랜드카페',
  //   },
  // },
  // sort: [
  // ],
};

// =========== page ===========
// retrievePage(notion, pageId);
// createPage(notion, databaseId, 'hi');
// createBulkPageToDB(notion, databaseId);

// =========== database ===========
// postQueryDB(notion, databaseId, queryOption);
// exportDBtoJSON(notion, databaseId, queryOption);

// parsing('하이메디');

// (async () => {
//   main();
// })();
