import Redis from 'ioredis'

const redis = new Redis({
    host: process.env.REDIS_HOST,
    password: process.env.REDIS_PASSWORD,
    port: process.env.REDIS_PORT
})

redis.on("connect", () => {
    console.log("Redis connected")
})

redis.on("error", (error) => {
    console.log("Redis error:", error);
});


export default redis;