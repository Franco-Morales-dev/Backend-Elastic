import elasticClient from "../../elasticSearchClient";

const insertOne = async (indexName, data) => {
  const esClient = await elasticClient.getInstance();
  
  return await esClient.index({
    index: indexName,
    body: {
      ...data
    }
  });
};
  
const getAll = async ( indexName ) => {
  const esClient = await elasticClient.getInstance();
  
  return await esClient.search({
    index: indexName,
    query: { match_all: {} }
  });
};
  
const getOne = async ( indexName, doc_id ) => {
  const esClient = await elasticClient.getInstance();
  
  return await esClient.get({
    index: indexName,
    id: doc_id
  });
};
  
const updateOne = async ( indexName, doc_id, doc_data ) => {
  const esClient = await elasticClient.getInstance();
  
  return await esClient.update({
    index: indexName,
    id: doc_id,
    doc: {
      ...doc_data
    }
  });
};
  
const deleteOne = async ( indexName, doc_id ) => {
  const esClient = await elasticClient.getInstance();
  
  return await esClient.delete({
    index: indexName,
    id: doc_id
  });
};
  
const searchIn = async ( indexName, terms ) => {
  const esClient = await elasticClient.getInstance();
  
  return await esClient.search({
    index: indexName,
    query: {
      match: {
        desc: terms
      }
    }
  });
};

export { 
  getAll,
  getOne,
  insertOne,
  updateOne,
  deleteOne,
  searchIn
};