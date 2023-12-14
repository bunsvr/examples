/// <reference lib='dom' />
/// <reference lib='esnext' />
/// <reference lib='dom.iterable' />

const msgBox = document.getElementById('msgbox');

// Slice /room/
const roomID = new URLSearchParams(location.search).get('name'),
    url = `ws://${location.host}/room/ws?id=${encodeURIComponent(roomID)}`,
    reconnectLimit = 5, lineWordCount = 70;

/** @type {WebSocket} */
let ws, reconnect = 0, username = '', msgQueue = [];

/**
 * @param {string} msg
 */
const
    // Slice messages into parts separated with `br` tag
    sliceMessage = msg => {
        if (msg.length > lineWordCount) {
            let out = [], idx = 0;

            while (idx < msg.length)
                out.push(msg.slice(idx, idx += lineWordCount));

            return out.join('<br>');
        }

        return msg;
    },
    // Connect to the WS server
    connect = () => {
        ws = new WebSocket(url);

        ws.addEventListener('open', () => {
            // Send all queued messages
            for (const msg of msgQueue)
                ws.send(msg);

            reconnect = 0;

            const newE = document.createElement('div');
            newE.className = 'note';
            newE.innerHTML = 'You joined the chat :D';

            msgBox.appendChild(newE);
        });

        // When a message in the room is broadcasted
        ws.addEventListener('message', e => {
            /** @type {string} */
            let msg = e.data;

            if (msg.startsWith('name'))
                username = msg.slice(5);
            else {
                const newE = document.createElement('div');

                if (msg.startsWith('join')) {
                    newE.className = 'note';
                    newE.innerHTML = `${msg.substring(5)} joined the chat :D`;
                } else if (msg.startsWith('msg')) {
                    newE.className = 'msg';

                    const sliceMsgIndex = msg.indexOf(':', 8);

                    // Get username 
                    let e = document.createElement('span'),
                        currentUser = msg.slice(4, sliceMsgIndex);

                    if (currentUser === username) {
                        newE.className += ' self';
                        e.innerHTML = 'You';
                    } else e.innerHTML = currentUser;
                    newE.appendChild(e);

                    // Store messages
                    e = document.createElement('p');
                    e.innerHTML = sliceMessage(msg.slice(sliceMsgIndex + 1));
                    newE.appendChild(e);

                    // Auto scroll
                    msgBox.scrollTo({
                        top: msgBox.scrollHeight
                    });
                } else if (msg.startsWith('leave')) {
                    newE.className = 'note';
                    newE.innerHTML = `${msg.substring(6)} left the chat :(`;
                }

                msgBox.appendChild(newE);
            }
        });

        ws.addEventListener('close', () => {
            const newE = document.createElement('div');
            newE.className = 'note';

            if (reconnect < reconnectLimit) {
                // Disconnect message
                newE.innerHTML = 'You got disconnected ;-;, reconnecting...';

                // Reconnect
                connect();
                ++reconnect;
            } else
                newE.innerHTML = 'Cannot reconnect! Please check your internet connection!';

            msgBox.appendChild(newE);
        });
    }

// This implements a WebSocket client that automatically reconnects when failed
connect();

// This queues the message when connecting
const inp = document.getElementById('msginp');
document.getElementById('msgsubmit').addEventListener('submit', e => {
    e.preventDefault();

    const msg = inp.value;
    if (msg) {
        if (ws.readyState === WebSocket.OPEN) ws.send(msg);
        else msgQueue.push(msg);

        inp.value = '';
    }
});
