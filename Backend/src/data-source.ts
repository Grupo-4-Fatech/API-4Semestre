import { DataSource } from "typeorm";

const AppDataSource = new DataSource({
    database: 'bdaula.sqlite',
    type: "sqlite", 
    synchronize: true, 
    logging: true, 
    entities: ["src/entities/*.ts"], 
    migrations: ["src/migrations/*.ts"], 
    subscribers: [],
    maxQueryExecutionTime: 2000 
});

AppDataSource.initialize()
    .then(() => {
        console.log("Data Source initialized!")
    })
    .catch((e) => {
        console.error("Data Source initialization error:", e)
    });

export default AppDataSource;