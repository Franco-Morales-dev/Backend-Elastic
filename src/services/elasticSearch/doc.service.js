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
  
const createQueryForSearch = (qString, filterObj) => {
  let queryObj = {
    "bool": {}
  };

  let mustObjQuery;
  let filterObjQuery;

  if(!qString || !qString.length) {
    mustObjQuery = {
      "must": {
        "match_all": {}
      }
    };

    queryObj.bool = {
      ...queryObj.bool,
      ...mustObjQuery
    };
  } else if(qString.length) { 
    mustObjQuery = {
      "must": {
        "match_phrase": {
          "desc": qString
        }
      }
    };

    queryObj.bool = {
      ...queryObj.bool,
      ...mustObjQuery
    };
  }

  

  if(Object.keys(filterObj).every(key => filterObj[key])) {
    filterObjQuery = {
      "filter": { }
    };

    if(filterObj.company) {
      filterObjQuery.filter = {
        ...filterObjQuery.filter,
        "term": {
          "company": filterObj.company
        }
      };
    }

    queryObj.bool = {
      ...queryObj.bool,
      ...filterObjQuery
    };
    
  }

  return queryObj;
};

const searchIn = async ( indexName, qString, filters) => {
  const esClient = await elasticClient.getInstance();
  // console.log(JSON.stringify(createQueryForSearch(qString, filters),null, " "));
  
  return await esClient.search({
    index: indexName,
    "query": createQueryForSearch(qString, filters),
    "highlight": {
      "pre_tags": ["<b>"],
      "post_tags": ["</b>"],
      "fields": {
        desc: {
          "fragment_size": 5,
          "type": "plain",
          "number_of_fragments": 3,
        },
        company: {
          "fragment_size": 5,
          "type": "plain",
          "number_of_fragments": 3,
        }
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