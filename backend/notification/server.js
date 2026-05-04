import config from './src/config/config.js';
import app from './src/app.js';


app.listen(config.PORT, () => {
    console.log(`Notification service is running on port ${config.PORT}`);
});