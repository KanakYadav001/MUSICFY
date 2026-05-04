import amqp from "amqplib";
import config from "../config/config.js";

const QUEUE = "emailQueue";

let channel, connection;

// 🔌 Connect once (important)
export const connectQueue = async () => {
  connection = await amqp.connect(config.RABBITMQ_URI);
  channel = await connection.createChannel();

  console.log("RabbitMQ connected successfully");
};

// 📤 Send to Queue (Producer)
export const sendToQueue = async (name ,data) => {
  if (!channel) {
    await connectQueue();
  }

  await channel.assertQueue(name, { durable: true });
  channel.sendToQueue(name, Buffer.from(JSON.stringify(data)));

  console.log("📨 Job added:", data);
};


