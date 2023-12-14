import { ws } from '@stricjs/app';

interface User {
    /**
     * The username
     */
    name: string;
    /**
     * The current room
     */
    room: string;
}

const messageLenLimit = 10000;

const route = ws.route<User>({
    open(ws) {
        // Send the username back
        ws.send('name:' + ws.data.name);
        console.log('New user joins:', ws.data.name);

        // Subscribe to the room and send first message
        ws.subscribe(ws.data.room);
        ws.publish(ws.data.room, 'join:' + ws.data.name);
    },

    message(ws, message) {
        if (typeof message !== 'string' || message.length > messageLenLimit) return;
        message = 'msg:' + ws.data.name + ':' + message;

        // Send a message to all room members include the sender
        ws.publish(ws.data.room, message);
        ws.send(message);
    },

    close(ws) {
        console.log('User leaves:', ws.data.name);

        // Broadcast to the room
        route.server.publish(ws.data.room, 'leave:' + ws.data.name);
    }
});

export default route;
