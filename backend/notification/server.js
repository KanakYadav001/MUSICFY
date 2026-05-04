import config from './src/config/config.js';
import app from './src/app.js';
import {connectQueue} from './src/broker/broker.js';
import {getBrokerMessage} from './src/broker/getbroketMessage.js';

connectQueue().then(() => {
    getBrokerMessage();
})

app.listen(config.PORT, () => {
    console.log(`Notification service is running on port ${config.PORT}`);
});