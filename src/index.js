import app from "./app";


const mainServer = async () => {
    const serverPort = app.get("port");
    try {
        app.listen(
            serverPort,
            () => {
                console.log(`Server on [ http://localhost:${ serverPort } ]`)
            }
        )
    } catch (error) {
        console.error(error);
        process.exit(0)
    }
}

mainServer()