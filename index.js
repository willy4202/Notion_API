const express = require('express');
const {
  createPage,
  createBulkPageToDB,
  retrievePage,
  updatePage,
  createPageByClient,
} = require('./src/page/pageMethods');
const {
  postQueryDB,
  exportDBtoJSON,
  createDB,
  retrieveDB,
  updateDB,
  getDatabase,
} = require('./src/databases/dbMethods');

const { init } = require('./utils/findChangesAndAction');
const { query } = require('express');
const dotenv = require('dotenv').config();

const port = 8000;
const app = express();

app.use(express.static('public'));

app.use(
  express.urlencoded({
    extended: true,
  })
);

app.get('/data', async (req, res) => {
  const data = await getDatabase(notionIdMap.hospital.sampleDb);
  res.json(data);
});

app.post('/submit-form', async (req, res) => {
  const place = req.body.place;
  const address = req.body.address;
  await createPageByClient(place, address, notionIdMap.hospital.sampleDb);
  res.redirect('/');
  res.end();
});

app.post('./submit-bulk-page', async (req, res) => {
  await pageMethodsMap.createBulk(notionIdMap.hospital.sampleDb);
  res.redirect('/');
  res.end();
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

app.post;

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
  //     equals: '?????? ??????',
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
// dbMethodsMap.update(notionIdMap.hospital.sampleDb, '?????? ?????? ??????');

// =============== Page ===============
// === C ===
// pageMethodsMap.create(notionIdMap.hospital.sampleDb, 'page by API');
// pageMethodsMap.createBulk(notionIdMap.hospital.sampleDb);

// === R ===
//  pageMethodsMap.retrieve(notionIdMap.hospital.parentPage);

// === U ===
// pageMethodsMap.update(`????????? ????????? id ???????????????`, '????????? ??????');

// ======= ????????? api =======
init();
