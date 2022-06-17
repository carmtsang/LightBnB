// to figure out how if getAllProperties query is using WHERE or AND
const queryType = queryParam => {
  let queryString = `WHERE`;
  if (queryParam.length > 1) {
    queryString = `AND`;
  };
  return queryString;
};

module.exports = {
  queryType
};