const express = require('express');
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
  getDatabase,
} = require('./src/databases/dbMethods');
const { getPage } = require('@notionhq/client/build/src/api-endpoints');
const { init } = require('./utils/findChangesAndAction');
const dotenv = require('dotenv').config();
const notion = new Client({ auth: process.env.NOTION_TOKEN });

const port = 8000;
const app = express();
app.use(express.static('public'));

app.get('/', async (req, res) => {
  const data = await dbMethodsMap.getDbAndRefineData(
    notionIdMap.hospital.database
  );
  res.json(data);
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

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
    retrievePage(pageId);
  },

  create(parentId, text) {
    createPage(parentId, text);
  },

  createBulk(dbId) {
    createBulkPageToDB(dbId);
  },
};

const dbMethodsMap = {
  retrive(dbId) {
    retrieveDB(dbId);
  },

  getDbAndRefineData(dbId) {
    getDatabase(dbId);
  },

  postQuery(dbId, query) {
    postQueryDB(dbId, query);
  },

  exportData(dbId, query) {
    exportDBtoJSON(dbId, query);
  },

  create(parentId, option) {
    createDB(parentId, option);
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
// pageMethodsMap.create(notionIdMap.hospital.database, 'hi');
// pageMethodsMap.createBulk(notionIdMap.hospital.database);

// dbMethodsMap.retrive(notionIdMap.hospital.database);
// dbMethodsMap.getDbAndRefineData(notionIdMap.hospital.database);
// dbMethodsMap.postQuery(notionIdMap.hospital.database);
// dbMethodsMap.exportData(notionIdMap.hospital.database);
// dbMethodsMap.create();

// ======= 구글챗 api =======
init();
