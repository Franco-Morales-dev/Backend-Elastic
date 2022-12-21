import { getElasticInfo } from "../services/elasticSearch";

const elasticSearchInfo = async (_req, res ) => {
  let info;

  try {
    info = await getElasticInfo();

    return res.json({
      info
    });
  } catch (error) {
    return res.status(500).json({ error });
  }
};


export { elasticSearchInfo };