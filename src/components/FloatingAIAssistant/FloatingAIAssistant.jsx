import React, { useState } from 'react';
import styles from './FloatingAIAssistant.module.scss';
import { FaRobot, FaTimes, FaPaperPlane } from 'react-icons/fa';

const FloatingAIAssistant = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([
    {
      type: 'bot',
      content: 'مرحباً! أنا مساعدك الذكي. كيف يمكنني مساعدتك اليوم؟'
    }
  ]);

  const handleSendMessage = () => {
    if (message.trim()) {
      setMessages([...messages, { type: 'user', content: message }]);
      setMessage('');
      
      // رد المساعد الذكي مع معلومات التواصل
      setTimeout(() => {
        setMessages(prev => [...prev, {
          type: 'bot',
          content: 'شكراً لك على رسالتك! المساعد الذكي قادم قريباً، ولكن يمكنك الآن التواصل معنا في حال واجهتك أي مشكلة:\n\n📧 البريد الإلكتروني: support@sayan.pro\n📱 0590406718\n\nسنكون سعداء لمساعدتك!'
        }]);
      }, 1000);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <>
      {/* زر المساعد العائم */}
      <div 
        className={`${styles.floatingButton} ${isOpen ? styles.hidden : ''}`}
        onClick={() => setIsOpen(true)}
      >
        <FaRobot />
        <span>مساعدك الذكي</span>
      </div>

      {/* نافذة المحادثة */}
      {isOpen && (
        <div className={styles.chatWindow}>
          <div className={styles.chatHeader}>
            <div className={styles.headerInfo}>
              <FaRobot className={styles.botIcon} />
              <div>
                <h3>مساعدك الذكي</h3>
                <span>قادم قريبا باذن الله</span>
              </div>
            </div>
            <button 
              className={styles.closeButton}
              onClick={() => setIsOpen(false)}
            >
              <FaTimes />
            </button>
          </div>

          <div className={styles.chatMessages}>
            {messages.map((msg, index) => (
              <div 
                key={index} 
                className={`${styles.message} ${styles[msg.type]}`}
              >
                {msg.type === 'bot' && <FaRobot className={styles.messageIcon} />}
                <div className={styles.messageContent}>
                  {msg.content}
                </div>
              </div>
            ))}
          </div>

          <div className={styles.chatInput}>
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="اكتب رسالتك هنا..."
              rows={1}
            />
            <button 
              onClick={handleSendMessage}
              disabled={!message.trim()}
            >
              <FaPaperPlane />
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default FloatingAIAssistant; 