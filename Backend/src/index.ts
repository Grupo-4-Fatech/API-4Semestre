import * as express from "express";
import * as dotenv from "dotenv";
import routes from "./routes";
import * as cookieParser from "cookie-parser"
const bodyParser = require( "body-parser");
dotenv.config();


const app = express();
app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));
app.use(express.json()); 
app.use(cookieParser())

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => console.log(`running at the door ${PORT}`));

app.use(routes);