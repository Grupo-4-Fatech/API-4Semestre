import * as express from "express";
import * as dotenv from "dotenv";
import routes from "./routes";
const bodyParser = require( "body-parser");
dotenv.config();


const app = express();
app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));
app.use(express.json()); 

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => console.log(`Rodando na porta ${PORT}`));

app.use(routes);