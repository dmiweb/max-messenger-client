import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/app/providers/useAuth';
import { Sidebar } from '@/widgets/sidebar';
import { ChatArea } from '@/widgets/chat-area';
import { CreateChatModal } from '@/features/create-chat';
import { useChatSearch } from '@/features/search-chats';
import { useChatPage } from '../model/useChatPage';
import styles from './ChatPage.module.css';

export const ChatPage = () => {
  const navigate = useNavigate();
  const { logout } = useAuth();

  const {
    chats,
    selectedChatId,
    selectedChat,
    messages,
    isNewChatOpen,
    setIsNewChatOpen,
    handleChatCreated,
    handleSelectChat,
    handleSent,
    handleBackToChats
  } = useChatPage();

  const { search, setSearch, filtered } = useChatSearch(chats);

  const handleLogout = () => {
    logout();
    navigate('/login', { replace: true });
  };

  return (
    <main className={styles.page}>
      <div className={styles.app}>
        <Sidebar
          chats={filtered}
          selectedChatId={selectedChatId}
          search={search}
          onSearchChange={setSearch}
          onSelectChat={handleSelectChat}
          onNewChat={() => setIsNewChatOpen(true)}
          onLogout={handleLogout}
          isHiddenOnMobile={selectedChatId !== null}
        />

        <ChatArea
          chat={selectedChat}
          messages={messages}
          onSent={(message) => {
            if (selectedChat) {
              handleSent(selectedChat.id, message);
            }
          }}
          isHiddenOnMobile={selectedChatId === null}
          onBack={handleBackToChats}
        />
      </div>

      <CreateChatModal
        isOpen={isNewChatOpen}
        onClose={() => setIsNewChatOpen(false)}
        onCreated={handleChatCreated}
      />
    </main>
  );
};