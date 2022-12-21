import { Client } from "@elastic/elasticsearch";

// const getElasticClient = async () => {
//     try {
//         const client = new Client({
//             node: "http://localhost:9200",
//             maxRetries: 5,
//             requestTimeout: 60000
//         });

//         // const client = new Client({
//         //     cloud: {
//         //         id: '<cloud-id>'
//         //     },
//         //     auth: {
//         //         username: 'elastic',
//         //         password: 'changeme'
//         //     }
//         // });

//         return client;
//     } catch (error) {
//         console.error(error);
//     }
// }

// singleton? is necesary ?
// https://www.dofactory.com/javascript/design-patterns/singleton
const getElasticClient = (
  () => {
    let instance;

    function createInstance () {
      const client = new Client({
        node: "http://localhost:9200",
        maxRetries: 5,
        requestTimeout: 60000
      });

      return client;
    }
        
    return {
      getInstance : () => {
        if(!instance) instance = createInstance();

        return instance;
      }
    };
  }
)();


export { getElasticClient };