import { getRabbitMQConnection } from '../configs/rabbitmq';
import { Channel } from 'amqplib';

export const consumeMessages = async (queue: string) => {
    try {
        const connection = getRabbitMQConnection();
        if (!connection) {
            throw new Error('Conexão RabbitMQ não foi estabelecida.');
        }

        const channel: Channel = await connection.createChannel();
        await channel.assertQueue(queue);

        channel.consume(queue, (msg) => {
            if (msg !== null) {
                console.log(`Mensagem recebida da fila ${queue}: ${msg.content.toString()}`);
                channel.ack(msg);
            }
        });
    } catch (error) {
        console.error('Erro ao consumir mensagens da fila:', error);
    }
};