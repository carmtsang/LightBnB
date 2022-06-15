const properties = require('./json/properties.json');
const users = require('./json/users.json');

const { Pool } = require('pg');
const pool = new Pool({
  user: 'vagrant',
  password: '123',
  host: 'localhost',
  database: 'lightbnb'
});

// pool.query(`SELECT title FROM properties LIMIT 10`).then(response => {console.log(response)});

/// Users

/**
 * Get a single user from the database given their email.
 * @param {String} email The email of the user.
 * @return {Promise<{}>} A promise to the user.
 */
const getUserWithEmail = email => {
  return pool.query(`SELECT * FROM users WHERE LOWER(email) = $1`, [email.toLowerCase()])
    .then(res => res.rows[0])
    .catch(err => {
      console.log(err.message);
    });
};
exports.getUserWithEmail = getUserWithEmail;

/**
 * Get a single user from the database given their id.
 * @param {string} id The id of the user.
 * @return {Promise<{}>} A promise to the user.
 */
const getUserWithId = id => {
  return pool.query(`SELECT * FROM users WHERE id = $1;`, [id])
    .then(res => {
      return res.rows[0];
    })
    .catch(err => {
      console.log(err.message);
    });
};
exports.getUserWithId = getUserWithId;


/**
 * Add a new user to the database.
 * @param {{name: string, password: string, email: string}} user
 * @return {Promise<{}>} A promise to the user.
 */
const addUser =  user => {
  return pool.query(`INSERT INTO users (name, email, password) VALUES ($1, $2, $3);`, [user.name, user.email, user.password])
    .then(res => {
      return res.rows;
    })
    .catch(err => {
      console.log(err.message);
   })
};
exports.addUser = addUser;

/// Reservations

/**
 * Get all reservations for a single user.
 * @param {string} guest_id The id of the user.
 * @return {Promise<[{}]>} A promise to the reservations.
 */
const getAllReservations = (guest_id, limit = 10) => {
  return pool.query(`SELECT reservations.*, properties.*, avg(property_reviews.rating) as average_rating
  FROM reservations 
  JOIN properties ON properties.id = property_id
  JOIN property_reviews ON reservations.id = reservation_id 
  WHERE reservations.guest_id = $1
  GROUP BY reservations.id, properties.id, properties.cost_per_night
  ORDER BY reservations.start_date
  LIMIT $2;`, [guest_id, limit])
    .then(res => {
      console.log(res.rows)
      return res.rows
    })
    .catch(err => {
      console.log(err.message);
    })
};
exports.getAllReservations = getAllReservations;

/// Properties

/**
 * Get all properties.
 * @param {{}} options An object containing query options.
 * @param {*} limit The number of results to return.
 * @return {Promise<[{}]>}  A promise to the properties.
 */
const getAllProperties = (options, limit = 10) => {
  // empty array to take in paramaters depending on the query
  const queryParams = [];

  let queryString = `
  SELECT properties.*, avg(property_reviews.rating) as average_rating
  FROM properties
  JOIN property_reviews ON property_id = properties.id
  `;

  // function to determine query
  const queryType = queryParam => {
    let queryString = `WHERE`;
    if (queryParam.length > 1) {
      queryString = `AND`;
    };
    return queryString;
  };

  // query for 'my listings'
  if (options.owner_id) {
    queryParams.push(`${options.owner_id}`);
    queryString += `${queryType(queryParams)} owner_id = $${queryParams.length} `;
  };

  // query for city
  if (options.city) {
    queryParams.push(`%${options.city}%`);
    queryString += `${queryType(queryParams)} city LIKE $${queryParams.length} `;
    console.log('in city:', queryParams);
  }

  if (options.minimum_price_per_night) {
    queryParams.push(`${options.minimum_price_per_night * 100}`);
    queryString += `${queryType(queryParams)} cost_per_night >= $${queryParams.length} `;
  };
  
  if (options.maximum_price_per_night) {
    queryParams.push(`${options.maximum_price_per_night * 100}`);
    queryString += `${queryType(queryParams)} cost_per_night <= $${queryParams.length} `;
  };
  


 
  if (options.minimum_rating) {
    queryParams.push(`${options.minimum_rating}`);
    queryString += `HAVING avg(property_reviews.rating) >= $${queryParams.length}`
  }

  // city //min cost//max cost//min rating //city & min cost // city & max cost // city & min rating // city 

  queryParams.push(limit);
  queryString += `
  GROUP BY properties.id
  ORDER BY cost_per_night
  LIMIT $${queryParams.length};
  `;

  console.log(queryString, queryParams);

  return pool.query(queryString, queryParams)
    .then(res => res.rows)
    .catch(err => {
      console.log(err.message);
    });
};
exports.getAllProperties = getAllProperties;


/**
 * Add a property to the database
 * @param {{}} property An object containing all of the property details.
 * @return {Promise<{}>} A promise to the property.
 */
const addProperty = function(property) {
  const propertyId = Object.keys(properties).length + 1;
  property.id = propertyId;
  properties[propertyId] = property;
  return Promise.resolve(property);
}
exports.addProperty = addProperty;
