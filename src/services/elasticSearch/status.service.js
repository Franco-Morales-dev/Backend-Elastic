import elasticClient from "../../elasticSearchClient";

const info = async () => {
  const esClient = await elasticClient.getInstance();
  
  return await esClient.info();
};

export { info };