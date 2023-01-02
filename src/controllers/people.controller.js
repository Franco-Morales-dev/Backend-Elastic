import { elasticSearch } from "../services/elasticSearch"; 
import { indexName } from "../const/const";

const persistDataInElastic = async (req, res) => {
  const { fullname, email, company, desc, address } = req.body;

  try {
    const indexCreated = await elasticSearch.doc.insertOne(indexName.TEST_PEOPLE, {
      fullname, email, company, desc, address
    });

    return res.json({
      message:"Saved in Elastic search",
      data: indexCreated
    });
  } catch (error) {
    return res.status(500).json({ error });
  }
};

const getAllFromElastic = async (_req, res) => {
  try {
    const data = await elasticSearch.doc.getAll(indexName.TEST_PEOPLE);

    return res.json({
      message: "all records",
      data
    });
  } catch (error) {
    return res.status(500).json({ error });
  }
};

const getOneByIdFromElastic = async (req, res) => {
  let { id } = req.params;

  try {
    const data = await elasticSearch.doc.getOne(indexName.TEST_PEOPLE, id);

    return res.json({
      message: "founded result",
      data: data
    });
  } catch (error) {
    return res.status(500).json({ error });
  }
};

const updateOneByIdFromElastic = async (req, res) => {
  let { id } = req.params;
  let { ...docData} = req.body;
  
  try {
    const data = await elasticSearch.doc.updateOne(indexName.TEST_PEOPLE, id, docData);

    return res.json({
      message: "updated",
      data: data
    });
  } catch (error) {
    return res.status(500).json({ error });
  }
};

const deleteOneByIdFromElastic = async (req, res) => {
  let { id } = req.params;

  try {
    await elasticSearch.doc.deleteOne(indexName.TEST_PEOPLE, id);

    return res.json({
      message: "deleted"
    });
  } catch (error) {
    return res.status(500).json({ error });
  }
};

const searchInElastic = async (req, res) => {
  let { q } = req.query;
    
  try {
    const results = await elasticSearch.doc.searchIn(indexName.TEST_PEOPLE, q);

    return res.json({
      message: "searched results",
      data: results.hits
    });
  } catch (error) {
    return res.status(500).json({ error });
  }
};

export { 
  persistDataInElastic, 
  getAllFromElastic, 
  getOneByIdFromElastic, 
  updateOneByIdFromElastic, 
  deleteOneByIdFromElastic, 
  searchInElastic
};