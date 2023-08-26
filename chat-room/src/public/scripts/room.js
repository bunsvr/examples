/// <reference lib='dom' />
/// <reference lib='esnext' />
/// <reference lib='dom.iterable' />

const msgBox = document.getElementById('msgbox');

// Slice /room/
const roomID = location.pathname.slice(6),
    url = `ws://${location.host}/ws/room?q=${encodeURIComponent(location.pathname)}`,
    reconnectLimit = 5;

/** @type {WebSocket} */
let ws, reconnect = 0, username = '', msgQueue = [];

/**
 * @param {string} msg
 */
function sliceMessage(msg) {
    if (msg.length <= 70) return msg;

    let out = '';
    while (msg.length > 70) {
        out += msg.slice(0, 70) + '<br/>';
        msg = msg.slice(71);
    }

    return out.slice(0, -1);
}

function connect() {
    ws = new WebSocket(url);
    console.log('Connecting...');

    ws.addEventListener('open', () => {
        // Send all queued messages
        for (const msg of msgQueue)
            ws.send(msg);

        console.log('Client connected!');
        reconnect = 0;

        const newE = document.createElement('div');
        newE.className = 'note';
        newE.innerHTML = 'You joined the chat :D';

        msgBox.appendChild(newE);
    });
    ws.addEventListener('message', e => {
        /** @type {string} */
        let msg = e.data;

        if (msg.startsWith('name')) {
            username = msg.slice(5);
            console.log('Name:', username);
        } else {
            const newE = document.createElement('div');

            if (msg.startsWith('join')) {
                newE.className = 'note';
                newE.innerHTML = msg.substring(5) + ' joined the chat :D';
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
                newE.innerHTML = msg.substring(6) + 'left the chat :(';
            }

            msgBox.appendChild(newE);
        }
    });
    ws.addEventListener('close', () => {
        if (reconnect < reconnectLimit) {
            // Disconnect message
            const newE = document.createElement('div');
            newE.className = 'note';
            newE.innerHTML = 'You got disconnected :(';
            msgBox.appendChild(newE);

            // Reconnect
            connect();
            ++reconnect;
        } else alert('Connect to room failed! Please check your internet connection!');
    });
}

// This implements a WebSocket client that automatically reconnects when failed
connect();

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
