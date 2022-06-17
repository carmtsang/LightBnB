// to figure out how if getAllProperties query is using WHERE or AND
const queryType = queryParam => {
  let queryString = `WHERE`;
  if (queryParam.length > 1) {
    queryString = `AND`;
  };
  return queryString;
};

// to add to query string in getAllProperties. Find all properties belonging to a user;
const ownerProperty = param => {
  if (param) {
    queryParams.push(`${param}`);
    queryString += `${queryType(queryParams)} owner_id = $${queryParams.length} `;
  };
};


module.exports = {
  queryType,
  ownerProperty
};