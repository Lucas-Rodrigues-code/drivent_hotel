import api from '../services/api';

export async function tryChangeRoom(roomId, currentRoom, token) {
  await api.put(
    `booking/${currentRoom}`,
    { roomId },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
}
