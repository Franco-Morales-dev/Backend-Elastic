import elasticClient from "../../elasticSearchClient";
import { indexName } from "../../const/const";
import dataJSON from "../../data/data_test.json";

const createDefaultIndices = async () => {
  // await deleteOneIndex(indexName.TEST_PEOPLE);

  const esClient =  await elasticClient.getInstance();
  
  const indices = await getAllIndex();

  if(indices.length) return;

  await esClient.indices.create({
    index: indexName.TEST_PEOPLE,
    settings: {
      analysis : {
        filter: {
          english_stop: {
            type: "stop",
            stopwords: "_english_"
          },
          english_stemmer: {
            type: "stemmer",
            language: "english"
          }
        },
        analyser: { }
      }
    },
    mappings: {
      properties: {
        fullname: {
          type: "text",
          index: true,
          analyzer: "whitespace"
        },
        email: {
          type: "text",
          index: false
        },
        company: {
          type: "text",
          index: true,
          analyzer: "keyword"
        },
        desc: {
          type: "text",
          index: true,
          analyzer: "standard"
        },
        adress: {
          type: "text",
          index: false
        }
      }
    }
  });

  await bulkInsertDocs();
};

const deleteOneIndex = async (indexName) => {
  const esClient =  await elasticClient.getInstance();

  return await esClient.indices.delete({
    index: indexName
  });
};

const getAllIndex = async () => {
  const esClient =  await elasticClient.getInstance();

  return await esClient.cat.indices({
    format: "json"
  });
};

const bulkInsertDocs = async () => {
  const esClient = await elasticClient.getInstance();

  const actions = [];

  for (const people of dataJSON) {
    actions.push({
      index: {
        _index: indexName.TEST_PEOPLE
      }
    });

    actions.push({
      fullname: people.fullname,
      email: people.email,
      company: people.job.company,
      desc: people.description,
      adress: people.location.address
    });
  }
  return esClient.bulk({
    index: indexName.TEST_PEOPLE,
    operations: actions
  });
};

export { createDefaultIndices, deleteOneIndex, getAllIndex };