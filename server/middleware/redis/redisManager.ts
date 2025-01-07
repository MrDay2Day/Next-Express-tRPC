// import { redisServerDuplicate } from "../socket/socketServer";
import { createClient, RedisClientType } from "redis";

const userRedis = process.env.USE_REDIS === "y";

export default class RedisClientClass {
  private client: RedisClientType | null;
  private errMsg: Error = new Error("No Redis Connection");

  constructor() {
    this.client = createClient({ url: process.env.REDIS_URL });
    this.initiate();
  }

  async initiate() {
    // this.client = redisServerDuplicate() ?? null;
    if (this.client && userRedis) {
      await this.client.connect();
      this.client.on("error", (err) =>
        console.error("Redis Client Error:", err)
      );
      this.client.on("connect", () => console.log("Redis Client Connected"));
    }
  }

  /**
   * Disconnect from Redis server
   */
  async disconnect(): Promise<void> {
    if (!this.client) throw this.errMsg;
    await this.client.disconnect();
  }

  /**
   * Set a key-value pair
   */
  async set(key: string, value: string, expireSeconds?: number): Promise<void> {
    if (!this.client) throw this.errMsg;
    if (expireSeconds) {
      await this.client.set(key, value, { EX: expireSeconds });
    } else {
      await this.client.set(key, value);
    }
  }

  /**
   * Get value by key
   */
  async get(key: string): Promise<string | null> {
    if (!this.client) throw this.errMsg;
    return await this.client.get(key);
  }

  /**
   * Delete a key
   */
  async delete(key: string): Promise<number> {
    if (!this.client) throw this.errMsg;
    return await this.client.del(key);
  }

  /**
   * Check if key exists
   */
  async exists(key: string): Promise<number> {
    if (!this.client) throw this.errMsg;
    return await this.client.exists(key);
  }

  /**
   * Increment a number stored at key
   */
  async increment(key: string): Promise<number> {
    if (!this.client) throw this.errMsg;
    return await this.client.incr(key);
  }

  /**
   * Decrement a number stored at key
   */
  async decrement(key: string): Promise<number> {
    if (!this.client) throw this.errMsg;
    return await this.client.decr(key);
  }

  /**
   * Set multiple key-value pairs
   */
  async mset(keyValuePairs: Record<string, string>): Promise<void> {
    if (!this.client) throw this.errMsg;
    await this.client.mSet(keyValuePairs);
  }

  /**
   * Get multiple values by keys
   */
  async mget(keys: string[]): Promise<(string | null)[]> {
    if (!this.client) throw this.errMsg;
    return await this.client.mGet(keys);
  }

  /**
   * Add members to a set
   */
  async sadd(key: string, ...members: string[]): Promise<number> {
    if (!this.client) throw this.errMsg;
    return await this.client.sAdd(key, members);
  }

  /**
   * Get all members of a set
   */
  async smembers(key: string): Promise<string[]> {
    if (!this.client) throw this.errMsg;
    return await this.client.sMembers(key);
  }

  /**
   * Remove members from a set
   */
  async srem(key: string, ...members: string[]): Promise<number> {
    if (!this.client) throw this.errMsg;
    return await this.client.sRem(key, members);
  }

  /**
   * Check if member exists in set
   */
  async sismember(key: string, member: string): Promise<boolean> {
    if (!this.client) throw this.errMsg;
    return await this.client.sIsMember(key, member);
  }

  /**
   * Add element to a list
   */
  async lpush(key: string, ...elements: string[]): Promise<number> {
    if (!this.client) throw this.errMsg;
    return await this.client.lPush(key, elements);
  }

  /**
   * Remove and get last element of list
   */
  async rpop(key: string): Promise<string | null> {
    if (!this.client) throw this.errMsg;
    return await this.client.rPop(key);
  }

  /**
   * Get list length
   */
  async llen(key: string): Promise<number> {
    if (!this.client) throw this.errMsg;
    return await this.client.lLen(key);
  }

  /**
   * Get range of elements from list
   */
  async lrange(key: string, start: number, stop: number): Promise<string[]> {
    if (!this.client) throw this.errMsg;
    return await this.client.lRange(key, start, stop);
  }

  /**
   * Set hash field
   */
  async hset(key: string, field: string, value: string): Promise<number> {
    if (!this.client) throw this.errMsg;
    return await this.client.hSet(key, field, value);
  }

  /**
   * Get hash field
   */
  async hget(key: string, field: string): Promise<string | undefined> {
    if (!this.client) throw this.errMsg;
    return await this.client.hGet(key, field);
  }

  /**
   * Get all hash fields and values
   */
  async hgetall(key: string): Promise<Record<string, string>> {
    if (!this.client) throw this.errMsg;
    return await this.client.hGetAll(key);
  }

  /**
   * Delete hash fields
   */
  async hdel(key: string, ...fields: string[]): Promise<number> {
    if (!this.client) throw this.errMsg;
    return await this.client.hDel(key, fields);
  }

  /**
   * Set key with expiry
   */
  async setex(key: string, seconds: number, value: string): Promise<void> {
    if (!this.client) throw this.errMsg;
    await this.client.setEx(key, seconds, value);
  }

  /**
   * Get key expiry time
   */
  async ttl(key: string): Promise<number> {
    if (!this.client) throw this.errMsg;
    return await this.client.ttl(key);
  }

  /**
   * Set key expiry time
   */
  async expire(key: string, seconds: number): Promise<boolean> {
    if (!this.client) throw this.errMsg;
    return await this.client.expire(key, seconds);
  }

  /**
   * Get all keys matching pattern
   */
  async keys(pattern: string): Promise<string[]> {
    if (!this.client) throw this.errMsg;
    return await this.client.keys(pattern);
  }

  /**
   * Publish message to channel
   */
  async publish(channel: string, message: string): Promise<number> {
    if (!this.client) throw this.errMsg;
    return await this.client.publish(channel, message);
  }

  /**
   * Subscribe to channel
   */
  async subscribe(
    channel: string,
    callback: (message: string) => void
  ): Promise<void> {
    if (!this.client) throw this.errMsg;
    await this.client.subscribe(channel, (message) => {
      callback(message);
    });
  }

  /**
   * Execute transaction
   */
  async transaction(): Promise<RedisClientType> {
    if (!this.client) throw this.errMsg;
    //@ts-expect-error: Types are the same
    return this.client!.multi();
  }

  /**
   * Flush all data
   */
  async flushAll(): Promise<void> {
    if (!this.client) throw this.errMsg;
    await this.client.flushAll();
  }

  /**
   * Get server info
   */
  async info(): Promise<string> {
    if (!this.client) throw this.errMsg;
    return await this.client.info();
  }
}
