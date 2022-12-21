import { createIndexDefault, getAllDocs, getOneDoc, updateOneDoc, deleteOneDoc, searchIn } from "../services/elasticSearch";


const persistDataInElastic = async (req, res) => {
  const { fullname, email, company, desc, address } = req.body;

  try {
    const indexCreated = await createIndexDefault("test-people", {
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
    const data = await getAllDocs("test-people");

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
    const data = await getOneDoc("test-people", id);

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
    const data = await updateOneDoc("test-people", id, docData);

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
    await deleteOneDoc("test-people", id);

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
    const results = await searchIn("test-people", q);

    return res.json({
      message: "searched results",
      data: results
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