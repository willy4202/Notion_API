const express = require('express');
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

const { init } = require('./utils/findChangesAndAction');
const dotenv = require('dotenv').config();

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

  update(dbId, text) {
    updateDB(dbId, text);
  },

  exportData(dbId, query) {
    exportDBtoJSON(dbId, query);
  },
};

const pageMethodsMap = {
  create(parentId, text) {
    createPage(parentId, text);
  },

  retrieve(pageId) {
    retrievePage(pageId);
  },

  update(pageId, text) {
    updatePage(pageId, text);
  },

  createBulk(dbId) {
    createBulkPageToDB(dbId);
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
// dbMethodsMap.update(notionIdMap.hospital.sampleDb, '진료현황 by API');

// =============== Page ===============
// === C ===
// pageMethodsMap.create(notionIdMap.hospital.sampleDb, 'page by API');
// pageMethodsMap.createBulk(notionIdMap.hospital.sampleDb);

// === R ===
//  pageMethodsMap.retrieve(notionIdMap.hospital.parentPage);

// === U ===
// pageMethodsMap.update(`원하는 페이지 id 넣어주세요`, '타이틀 변경');

// ======= 구글챗 api =======
// init(notionIdMap.hospital.sampleDb);
