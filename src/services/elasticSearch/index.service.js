import elasticClient from "../../elasticSearchClient";
import { indexName } from "../../const/const";

const createDefaultIndices = async () => {
  const esClient =  await elasticClient.getInstance();
  
  const indices = await getAllIndex();

  if(indices.length) return;

  return await esClient.indices.create({
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
          analyzer: "whitespace"
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
};

const deleteOneIndex = async (indexName) => {
  const esClient =  await elasticClient.getInstance();

  return await esClient.indices.delete({
    index: indexName
  });
};

const getAllIndex = async ( ) => {
  const esClient =  await elasticClient.getInstance();

  return await esClient.cat.indices({
    format: "json"
  });
};

export { createDefaultIndices, deleteOneIndex, getAllIndex };