import { Server, Socket } from 'socket.io';
import { Server as HTTPServer } from 'http';

let io: Server;
const connectedSockets = new Set<string>();

export const initSocket = (httpServer: HTTPServer) => {
    if (!io) {
        io = new Server(httpServer, {
            cors: {
                origin: "http://localhost:3000",
                credentials: true
            }
        });

        io.on('connection', (socket: Socket) => {
            connectedSockets.add(socket.id);
            const count = connectedSockets.size;

            io.emit('userCount', count);

            socket.on('disconnect', () => {
                connectedSockets.delete(socket.id);
                const updatedCount = connectedSockets.size;

                io.emit('userCount', updatedCount);
            });
        });
    }
    return io;
};
