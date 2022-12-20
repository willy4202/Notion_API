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
  retrieveDB,
} = require('./src/databases/dbMethods');
const { getPage } = require('@notionhq/client/build/src/api-endpoints');
const { init } = require('./utils/findChangesAndAction');
const dotenv = require('dotenv').config();
const notion = new Client({ auth: process.env.NOTION_TOKEN });

const notionTokenMap = {
  young: process.env.NOTION_TOKEN,
};

const notionIdMap = {
  hospital: {
    parentPage: process.env.NOTION_PAGE_ID,
    database: process.env.NOTION_DATABASE_ID,
  },
  sample: {
    parentPage: process.env.NOTION_EXAMPLE_PARENT,
    database: process.env.NOTION_EXAMPLE_DB,
  },
};

const pageMethodsMap = {
  retrieve(pageId) {
    retrievePage(notion, pageId);
  },

  create(parentId, text) {
    createPage(notion, parentId, text);
  },

  createBulk(dbId) {
    createBulkPageToDB(notion, dbId);
  },
};

const dbMethodsMap = {
  retrive(dbId) {
    retrieveDB(notion, dbId);
  },
  postQuery(dbId, query) {
    postQueryDB(notion, dbId, query);
  },

  exportData(dbId, query) {
    exportDBtoJSON(notion, dbId, query);
  },
};

const option = {
  filter: {
    property: 'status',
    select: {
      equals: '진료 대기',
    },
  },
  sort: [],
};

// pageMethodsMap.retrieve(notionIdMap.hospital.parentPage);
// pageMethodsMap.create(notionIdMap.hospital.parentPage, 'hi');
// pageMethodsMap.createBulkPageToDB(notionIdMap.hospital.database);

// dbMethodsMap.retrive(notionIdMap.hospital.database);
// dbMethodsMap.postQuery(notionIdMap.hospital.database);
// dbMethodsMap.exportData(notionIdMap.hospital.database);

// ======= 구글챗 api =======
init();
