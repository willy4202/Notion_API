const express = require('express');
const { Client } = require('@notionhq/client');
const {
  createPage,
  createBulkPageToDB,
  retrievePage,
  updatePage,
} = require('./src/page/pageMethods');
const {
  postQueryDB,
  exportDBtoJSON,
  createDB,
  retrieveDB,
  updateDB,
} = require('./src/databases/dbMethods');
const { getPage } = require('@notionhq/client/build/src/api-endpoints');
const { init } = require('./utils/findChangesAndAction');
const dotenv = require('dotenv').config();
const notion = new Client({ auth: process.env.NOTION_TOKEN });

const port = 8000;
const app = express();
app.use(express.static('public'));

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

const notionIdMap = {
  hospital: {
    parentPage: process.env.NOTION_PAGE_ID,
    database: process.env.NOTION_DATABASE_ID_BY_LOCAL,

    sampleDb: process.env.NOTION_DATABASE_ID_BY_API,
  },
  sample: {
    parentPage: process.env.NOTION_EXAMPLE_PARENT,
    database: process.env.NOTION_EXAMPLE_DB,
  },
};

const dbMethodsMap = {
  create(parentId, option) {
    createDB(parentId, option);
  },

  retrive(dbId) {
    retrieveDB(dbId);
  },

  postQuery(dbId, query) {
    postQueryDB(dbId, query);
  },

  exportData(dbId, query) {
    exportDBtoJSON(dbId, query);
  },

  update(dbId) {
    updateDB(dbId);
  },
};

const pageMethodsMap = {
  retrieve(pageId) {
    retrievePage(pageId);
  },

  create(parentId, text) {
    createPage(parentId, text);
  },

  createBulk(dbId) {
    createBulkPageToDB(dbId);
  },

  update(pageId, text) {
    updatePage(pageId, text);
  },
};

const option = {
  // filter: {
  //   property: 'status',
  //   select: {
  //     equals: '진료 대기',
  //   },
  // },
  // sort: [],
};

// =============== DB ===============

// === C ===
// dbMethodsMap.create(notionIdMap.hospital.parentPage);
// === R ===
// dbMethodsMap.retrive(notionIdMap.hospital.sampleDb);
// dbMethodsMap.postQuery(notionIdMap.hospital.sampleDb, option);
// dbMethodsMap.exportData(notionIdMap.hospital.sampleDb, option);
// === U ===
// dbMethodsMap.update(notionIdMap.hospital.sampleDb);
// === D ===

// =============== Page ===============
// === C ===
// pageMethodsMap.create(notionIdMap.hospital.sampleDb, 'page by API');
// pageMethodsMap.createBulk(notionIdMap.hospital.sampleDb);

// === R ===
//  pageMethodsMap.retrieve(notionIdMap.hospital.parentPage);
// pageMethodsMap.retrieve('c99b89285b9549aab46fa30bae540255');

// === U ===
// pageMethodsMap.update('c99b89285b9549aab46fa30bae540255', '타이틀 변경');

// ======= 구글챗 api =======
// init(notionIdMap.hospital.sampleDb);
