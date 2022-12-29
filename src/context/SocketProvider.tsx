import React, { useContext, useEffect, useState } from 'react';
import io, { Socket } from 'socket.io-client';

interface Context {
  socket: typeof Socket | null;
  isWSUnAuthorized: WSUnAuthorizedError | null;
}

export const SocketContext = React.createContext<Context>({} as Context);
export function useSocket(): Context {
  return useContext(SocketContext);
}

interface ProviderProps {
  children: React.ReactNode;
}
interface WSUnAuthorizedError {
  statusCode: 401;
  message: 'Unauthorized';
}
const SocketProvider: React.FC<ProviderProps> = ({ children }) => {
  const [socket, setSocket] = useState<typeof Socket | null>(null);
  const [isWSUnAuthorized, SetWSUnAuthorized] = useState<WSUnAuthorizedError | null>(
    null,
  );

  //CHANGE io options
  // if (dev) io('http://localhost:5000', { withCredentials: true }); //DIFF. DOMAINS
  // if (prod) io({ withCredentials: true }); //SAME DOMAIN

  useEffect(() => {
    const s: typeof Socket = io('https://clienthubapp.herokuapp.com');

    setSocket(s);
    console.log('socket init: ', socket);
    // const userData:any = localStorage.getItem('userData');
    // const parsedData = JSON.parse(userData);
    // socket?.emit('set-user', { token: parsedData.token});
    return () => {
      console.log('unmount socket provider: ', socket);
      s.close();
    };
  }, []);

  useEffect(() => {
    socket?.on('set-usertoken', () => {
      console.log("error");
      console.log("socket");
      console.log(socket);
      const userData:any = localStorage.getItem('userData');
      const parsedData = JSON.parse(userData);
      socket?.emit('set-user', { token: parsedData.token});
    });
    socket?.on('Error', (m :any) => {
      SetWSUnAuthorized(m.response);
    });
    return () => {
      socket?.off('Error');
    };
  }, [socket]);

  return (
    <SocketContext.Provider value={{ socket, isWSUnAuthorized }}>
      {children}
    </SocketContext.Provider>
  );
};

export default SocketProvider;

/*
import { useSocket } from '../utils/context/SocketProvider';

function Mes() {
	let [con, setCon] = useState(false);
	const { socket } = useSocket();
	const handleInviteAccepted = useCallback(() => {
		setCon(true);
	}, []);
	const [msg, setMsg] = useState(null);
	const onclick = () => {
		socket?.emit('SEND_MSG', 'soikat');
	};

	const receiveMsg = useCallback((d) => {
		setMsg(d);
	}, []);

	useEffect(() => {
		socket?.emit('USER_ONLINE');
		socket?.on('USER_ONLINE', handleInviteAccepted);
		socket?.on('SEND_MSG', receiveMsg);
		return () => {
			// clear only event listener....no need to clean emit
			socket?.off('USER_ONLINE', handleInviteAccepted);
			socket?.off('SEND_MSG', receiveMsg);
		};
	}, [handleInviteAccepted, socket, receiveMsg]);
	return (
		<>
			<h1 className='text-white'>{con && 'Connected'}</h1>
			<button onClick={onclick} className='bg-yellow-200 p-4'>
				Say Hi
			</button>
			<h1 className='text-white'>{msg && JSON.stringify(msg)}</h1>
		</>
	);
}

*/
