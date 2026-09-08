import app from "./server/src/app/app.js";
import { connectDb } from "./server/src/config/db.config.js";


connectDb()

const port = process.env.PORT || 4000;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
})