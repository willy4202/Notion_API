class NotionKey {
  constructor(pageId, integration) {
    this.pageId = pageId;
    this.integration = integration;
  }

  postQuery() {
    console.log(`Post to ${this.pageId} Page`);
  }
}

const newsDataBase = new NotionKey('123', 'abc');

newsDataBase.postQuery();
