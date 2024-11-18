import amqplib, { Connection } from 'amqplib';

let connection: Connection;

export const connectRabbitMQ = async () => {
    try {
        connection = await amqplib.connect('amqp://localhost');
        console.log('Conectado ao RabbitMQ com sucesso.');
    } catch (error) {
        console.error('Erro ao conectar ao RabbitMQ:', error);
    }
};

export const getRabbitMQConnection = () => connection;