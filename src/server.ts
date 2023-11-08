import 'dotenv/config';
import { router } from './router/router';
import  express  from 'express';
import cors from 'cors';

require("dotenv").config();

const app = express();
const port = process.env.PORT;

app.use(
    cors({
      origin: "*",
    })
  );

app.use(express.json());
app.use(router)
app.listen(process.env.PORT || 5000, () => {
  console.log(`🚀Server is running on http://localhost:${port}`);
});





