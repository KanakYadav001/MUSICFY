import connectDB from './src/db/db.js';
import app from './src/app.js';
import config from './src/config/config.js';
import {connectQueue} from './src/broker/broker.js';

connectQueue()


app.listen(config.PORT, () => {
  connectDB();
  console.log(`Server is running on port ${config.PORT}`);
});




