/* eslint-disable no-unused-vars */
import React, { useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { useMutation, UseMutationResult } from 'react-query';
import { useHistory, useLocation } from 'react-router-dom';
// import { useAuth } from './AuthProvider';
import { useSocket } from './SocketProvider';
import { RootState } from '../app/store';
interface UserInfo {
  isLogged: boolean;
  id: string;
  userRole: string;
  username: string;
  email: string;
  password: string;
  image: string;
  token: string;
  cellPhone: string;
  officePhone: string;
  address: string;
  birthday: string;
}

interface Participant {
  id: string;
  updated_at: Date;
  created_at: Date;
  user: UserInfo;
}

interface Message {
  content: string;
  created_at: Date;
  id: string;
  sender: UserInfo;
  updated_at: Date;
}

interface Conversation {
  id: string;
  creator: UserInfo;
  participants: Participant[] | null;
  updated_at: Date;
  created_at: Date;
  messages: Message[] | null;
}

interface ChatContextType {
  conversations: Conversation[] | null;
  currentConversations: Conversation | null;
  currentUser: UserInfo | null;
  selectConversation: (convId: number) => void;
  selectedConversation: number;
  offerSDP: OfferSDPDetails | null;
  setOfferSDP: React.Dispatch<React.SetStateAction<OfferSDPDetails | null>>;
}
interface OfferSDPDetails {
  offer: RTCSessionDescription;
  sender_id: string;
  receiver_id: string;
}

const ChatContext = React.createContext<ChatContextType>({} as ChatContextType);
export function useChat() {
  return useContext(ChatContext);
}
const ChatProvider: React.FC = ({ children }) => {

  const dispatch = useDispatch();
  const appData = useSelector((state: RootState) => state.app);
  const userData = useSelector((state: RootState) => state.auth);
  const [loading, setLoading] = useState(false);
  const customInstance = axios.create({
    baseURL: 'https://clienthubapp.herokuapp.com/api/',
    headers: {'Authorization': `Bearer ${userData.token}`}
  });

  const [conversations, setConversations] = useState<Conversation[] | null>(null);
  const [currentConversations, setCurrentConversations] = useState<Conversation | null>(
    null,
  );
  const [currentUser, setCurrentUser] = useState<UserInfo | null>(null);

  const { socket } = useSocket();
  const user = useSelector((state: RootState) => state.auth);;
  const location = useLocation();
  const [selectedConversation, setSelectedConversation] = useState(0);

  const selectConversation = (convId: number) => {
    setSelectedConversation(convId);
  };

  useEffect(() => {
    if (conversations) setCurrentConversations(conversations[selectedConversation]);
  }, [conversations, selectedConversation]);

  const handleNewConversation = useCallback((d) => {
    if (d && d.length !== 0) {
      setConversations(d);
    }
    console.log(d);
  }, []);

  useEffect(() => {
    const intervalId = setInterval(() => {
      console.log("get conversation");
      
//      console.log(socket);
//      socket?.emit('get-all-conversations-immediate', { userID: user?.id, page: 1 });

    }, 1000 * 10);

    socket?.on('get-all-conversations-immediate', handleNewConversation);

    return () => {
      socket?.off('get-all-conversations-immediate', handleNewConversation);
      clearInterval(intervalId);
    };
  }, [socket, location, location.pathname, selectedConversation]);

  useEffect(() => {
    //socket?.emit('get-all-conversations', { userID: user?.id, page: 1 });
    socket?.on('get-all-conversations', handleNewConversation);

    return () => {
      socket?.off('get-all-conversations', handleNewConversation);
    };
  }, [socket, location, location.pathname]);

  useEffect(() => {
    socket?.on('notify-all-on-new-message', handleNewConversation);
    return () => {
      socket?.off('notify-all-on-new-message', handleNewConversation);
    };
  }, [socket]);

  useEffect(() => {
    if (user) setCurrentUser(user);
  }, [user]);

  // ANSWERing VIDEO CALL
  const [offerSDP, setOfferSDP] = useState<OfferSDPDetails | null>(null);

  useEffect(() => {
    socket?.on('sdp-process', async (message:any) => {
      if (message.offer_status) {
        alert('User Offline');
        // window.close();
      }

      if (message.offer) {
        // alert('Received Offer, Creating Answer');
        setOfferSDP(message); //interface OfferSDPDetails
      }
    });

    return () => {
      socket?.off('sdp-process');
    };
  }, [socket]);

  return (
    <ChatContext.Provider
      value={{
        conversations,
        currentConversations,
        currentUser,
        selectConversation,
        selectedConversation,
        offerSDP,
        setOfferSDP,
      }}>
      {children}
    </ChatContext.Provider>
  );
};

export default ChatProvider;
