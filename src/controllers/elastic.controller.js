import { elasticSearch } from "../services/elasticSearch";

const elasticSearchInfo = async (_req, res ) => {
  let info;

  try {
    info = await elasticSearch.status.info();

    return res.json({
      info
    });
  } catch (error) {
    return res.status(500).json({ error });
  }
};


export { elasticSearchInfo };