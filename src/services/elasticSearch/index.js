import { getAll, getOne, insertOne, updateOne, deleteOne, searchIn } from "./doc.service";
import { createDefaultIndices, deleteOneIndex, getAllIndex } from "./index.service";
import { info } from "./status.service";

export const elasticSearch =  { 
  doc: {
    getAll,
    getOne,
    insertOne,
    updateOne,
    deleteOne,
    searchIn
  },
  index: {
    createDefaultIndices,
    deleteOneIndex,
    getAllIndex
  },
  status : {
    info
  }
};