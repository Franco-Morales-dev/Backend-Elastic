import { getElasticClient } from "../elasticSearchClient";

const getElasticInfo = async () => {
  const client = await getElasticClient.getInstance();

  return await client.info();
};

const createIndexDefault = async (indexName, data) => {
  const client = await getElasticClient.getInstance();

  return await client.index({
    index: indexName,
    body: {
      ...data
    }
  });
};

const getAllDocs = async ( indexName ) => {
  const client = await getElasticClient.getInstance();

  return await client.search({
    index: indexName,
    query: { match_all: {} }
  });
};

const getOneDoc = async ( indexName, doc_id ) => {
  const client = await getElasticClient.getInstance();

  return await client.get({
    index: indexName,
    id: doc_id
  });
};

const updateOneDoc = async ( indexName, doc_id, doc_data ) => {
  const client = await getElasticClient.getInstance();

  return await client.update({
    index: indexName,
    id: doc_id,
    doc: {
      ...doc_data
    }
  });
};

const deleteOneDoc = async ( indexName, doc_id ) => {
  const client = await getElasticClient.getInstance();

  return await client.delete({
    index: indexName,
    id: doc_id
  });
};

const searchIn = async ( indexName, terms ) => {
  const client = await getElasticClient.getInstance();

  return await client.search({
    index: indexName,
    query: {
      match: {
        fullname: terms
      }
    }
  });
};

export { getElasticInfo, createIndexDefault, getAllDocs, getOneDoc, updateOneDoc, deleteOneDoc, searchIn };