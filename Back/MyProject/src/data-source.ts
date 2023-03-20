import "reflect-metadata"
import { DataSource } from "typeorm"
import { Call } from "./entity/Call"

const AppDataSource = new DataSource({
    type: "mysql",
    host: "localhost",
    port: 3001,
    username: "root",
    password: "fatec",
    database: "localhost",
    synchronize: true,
    logging: false,
    entities: [Call],
    migrations: [],
    subscribers: [],
})

AppDataSource.initialize()
.then(() => console.log("Data source inicializada"))
.catch((e) => {
    console.error("Erro na inicialização do data source: ", e)
});

export default AppDataSource;