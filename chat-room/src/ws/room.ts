import { Group } from '@stricjs/router';
import { qs } from '@stricjs/utils';

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

const getRoom = qs.searchKey('q'),
    roomLimit = 1000, messageLenLimit = 10000;

export default new Group().ws<User>('/ws/room', {
    open(ws) {
        const room = getRoom(ws.data.ctx);
        if (room === null) return ws.terminate();

        const name = 'User' + (Date.now() % roomLimit) + 1;

        ws.data.name = name;
        ws.data.room = room;

        // Send the username back
        ws.send('name:' + name);
        console.log('New user joins:', name);

        // Subscribe to the room and send first message
        ws.subscribe(room);
        ws.publish(room, 'join:' + name);
    },

    message(ws, message) {
        if (typeof message !== 'string') return;

        if (message.length > messageLenLimit) return;
        message = 'msg:' + ws.data.name + ':' + message;

        // Send a message to the room
        ws.publish(ws.data.room, message);
        ws.send(message);
    },

    close(ws) {
        // TODO: Send leave message
        console.log('User leaves:', ws.data.name);
    }
});