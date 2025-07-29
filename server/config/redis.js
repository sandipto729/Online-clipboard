import redis from 'redis';
import dotenv from 'dotenv';
dotenv.config();
import { createClient } from 'redis';

// Initialize Redis client
const RedisClient = createClient({
    password: process.env.REDIS_PASSWORD,
    socket: {
        host: process.env.REDIS_HOST,
        port: process.env.REDIS_PORT,
    },
});

RedisClient.on('error', (err) => console.error('Redis error:', err));

// Connect to Redis
(async () => {
    try {
        await RedisClient.connect();
        console.log('Connected to Redis');
    } catch (err) {
        console.error('Failed to connect to Redis:', err);
    }
})();

export default RedisClient;