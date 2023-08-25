document.getElementById('join').addEventListener('submit', e => {
    e.preventDefault();

    const roomID = document.getElementById('room')?.value;
    if (!roomID) return alert('Invalid room name: ' + roomID);

    location.href = '/room/' + encodeURIComponent(roomID); 
});
