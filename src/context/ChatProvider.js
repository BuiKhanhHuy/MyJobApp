import React from 'react';
import {useSelector} from 'react-redux';

import {
  checkExists,
  createUser,
  getUserAccount,
} from '../services/firebaseService';

export const ChatContext = React.createContext();

const ChatProvider = ({children}) => {
  const {currentUser, isAuthenticated} = useSelector(state => state.user);
  const [selectedRoomId, setSelectedRoomId] = React.useState('');
  const [currentUserChat, setCurrentUserChat] = React.useState(null);

  React.useEffect(() => {
    const createUserChat = async () => {
      const isExists = await checkExists('accounts', `${currentUser.id}`);

      if (!isExists) {
        // tao moi user chat tren firestore.
        const userData = {
          userId: currentUser.id,
          name: currentUser?.fullName,
          email: currentUser?.email,
          avatarUrl: currentUser?.avatarUrl,
          company: null,
        };  

        const createResult = await createUser(
          'accounts',
          userData,
          currentUser.id,
        );
        console.log('CREATE USER TRÊN FILRESTORE: ', createResult);
      }

      // lay thong tin user hien tai
      const account = await getUserAccount('accounts', currentUser.id);
      setCurrentUserChat(account);
    };

    if (isAuthenticated) {
      createUserChat();
    }
  }, [currentUser, currentUser?.id]);

  return (
    <ChatContext.Provider
      value={{
        currentUserChat,
        selectedRoomId,
        setSelectedRoomId,
      }}>
      {children}
    </ChatContext.Provider>
  );
};

export default ChatProvider;
