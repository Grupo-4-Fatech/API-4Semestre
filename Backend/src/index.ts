import * as express from "express";
import * as dotenv from "dotenv";
import routes from "./routes";

dotenv.config();


const app = express();

app.use(express.json()); 

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => console.log(`Rodando na porta ${PORT}`));

app.use(routes);