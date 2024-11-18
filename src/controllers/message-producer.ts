import { getRabbitMQConnection } from '../configs/rabbitmq';
import { Channel } from 'amqplib';

export const sendMessageToQueue = async (queue: string, message: string) => {
    try {
        const connection = getRabbitMQConnection();
        if (!connection) {
            throw new Error('Conexão RabbitMQ não foi estabelecida.');
        }

        const channel: Channel = await connection.createChannel();
        await channel.assertQueue(queue);
        channel.sendToQueue(queue, Buffer.from(message));
        console.log(`Mensagem enviada para a fila ${queue}: ${message}`);
    } catch (error) {
        console.error('Erro ao enviar mensagem para a fila:', error);
    }
};