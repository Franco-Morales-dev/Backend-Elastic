import app from "./app";
import { elasticSearch } from "./services/elasticSearch";

const mainServer = async () => {
  const serverPort = app.get("port");
  try {
    app.listen(
      serverPort,
      () => {
        console.log(`Server on [ http://localhost:${ serverPort } ]`);
      }
    );

    await elasticSearch.index.createDefaultIndices();
  } catch (error) {
    console.error(error);
    process.exit(0);
  }
};

mainServer();