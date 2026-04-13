// import dbPool from "../configs/database.js";

// export const createModels = (body) => {
//   const query = `INSERT INTO users (name, email, address) VALUES
//                   VALUES ('${body.name}', '${body.email}', '${body.address}')`;
//   return dbPool.execute(query);
// };

import dbPool from "../configs/database.js";

/**
 * Membuat user baru di database
 * @param {Object} userData - Data user yang akan dibuat
 * @param {string} userData.name - Nama user
 * @param {string} userData.email - Email user
 * @param {string} userData.address - Alamat user
 * @returns {Promise<Object>} - Hasil query (inserted user)
 */
export const createUser = async (userData) => {
  const { name, email, address } = userData;
  const query = `
    INSERT INTO users (name, email, address)
    VALUES (?, ?, ?)
  `;
  const [result] = await dbPool.execute(query, [name, email, address]);
  return result;
};
