import {Queue, Worker} from 'bullmq';
import IORedis from 'ioredis';

export enum QueueNames {
  Interaction = 'interaction'
}

export class RedisManager {
  private connection: IORedis;
  private queues: Map<QueueNames, Queue>;

  constructor() {
    this.connection = new IORedis({
      host: 'localhost',
      port: 6379
    });
    this.queues = new Map<QueueNames, Queue>();

    // Initialize queues by going through the enum
    for (const queueName in QueueNames) {
      this.queues.set(
        QueueNames[queueName as keyof typeof QueueNames],
        new Queue(QueueNames[queueName as keyof typeof QueueNames], {connection: this.connection})
      );
    }
  }

  public getQueue(queueName: QueueNames): Queue {
    return this.queues.get(queueName) as Queue;
  }

  public async addJob<T extends string, K>(queueName: QueueNames, jobName: T, data: K): Promise<void> {
    await this.queues.get(queueName)!.add(jobName, data);
  }
}
