import logger from "../configs/logger.js";

const logRequest = (req, res, next) => {
  logger.info(`Terjadi request ke PATH: `, req.path);
  next();
};

export default logRequest;
