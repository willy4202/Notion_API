/** 병원 DB refine에 최적화되어 있음. place, address, status, link */
async function refineData(response) {
  return (refineRes = response.results.map((page) => {
    return {
      id: page?.id,
      place: page.properties?.place.title[0].plain_text,
      address: page.properties?.address.rich_text[0].plain_text,
      status: page.properties?.status.select.name,
      link: page.properties?.link.url,
    };
  }));
}

module.exports = { refineData };
