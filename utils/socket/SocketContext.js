
// utils/socket/SocketContext.js
import React, { createContext, useEffect, useRef, useState, useContext } from 'react';
import io from 'socket.io-client';
import { serverIP } from '@/config';
//import { showLocalNotification } from '../ios Notification/notification';

const SocketContext = createContext(null);

const SocketProvider = ({ children }) => {
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    const newSocket = io(serverIP);
    setSocket(newSocket);

    const handleMessage = async (message) => {
      console.log("📩 Global message:", message);
      //await showLocalNotification(`${message.sender}:`, message.message, { roomId: message.roomId });
    };

    newSocket.on("message", handleMessage);

    return () => {
      newSocket.off("message", handleMessage);
      newSocket.disconnect();
    };
  }, []);

  return (
    <SocketContext.Provider value={socket}>
      {children}
    </SocketContext.Provider>
  );
};

export { SocketProvider };
export default SocketContext;

export const useSocket = () => useContext(SocketContext);
