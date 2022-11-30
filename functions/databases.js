const createDatabase = async () => {
  axios
    .request(options)
    .then((res) => {
      console.log(res.data);
    })
    .catch((err) => {
      console.error(err);
    });
};

async function getDatabases() {
  try {
    const response = await notion.databases.retrieve({
      database_id: databaseId,
    });
    console.log(response);
  } catch (err) {
    console.log(err.body);
  }
}

module.export = { getDatabases, createDatabase };
