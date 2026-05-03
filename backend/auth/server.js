import dotenv from 'dotenv';
import connectDB from './src/db/db.js';
import app from './src/app.js';


dotenv.config();

app.listen(process.env.PORT, () => {
  connectDB();
  console.log(`Server is running on port ${process.env.PORT}`);
});




