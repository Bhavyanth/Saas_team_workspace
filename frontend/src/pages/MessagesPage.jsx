import { useState, useRef, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { 
  Hash, Send, Search, Users, Phone, Video, Info, 
  MessageSquare, Circle, Image, Paperclip, Smile 
} from 'lucide-react'

const MOCK_CHANNELS = [
  { id: 'ch-1', name: 'general', desc: 'Company-wide updates and announcements.' },
  { id: 'ch-2', name: 'website-redesign', desc: 'Discussions related to the marketing website redesign.', projectKey: 'WR' },
  { id: 'ch-3', name: 'mobile-app-v2', desc: 'Syncing up on iOS & Android sprints.', projectKey: 'MA' },
  { id: 'ch-4', name: 'api-migration', desc: 'Refactoring REST endpoints to GraphQL.', projectKey: 'API' },
]

const INITIAL_MESSAGES = {
  'ch-1': [
    { id: 'msg-1', sender: 'user-1', name: 'Alex Johnson', avatar: 'AJ', color: '#6554C0', content: 'Welcome to the new ProjectFlow workspace! Let\'s coordinate our Q1 sprint goals here.', time: '09:30 AM' },
    { id: 'msg-2', sender: 'user-4', name: 'James Wilson', avatar: 'JW', color: '#00875A', content: 'Awesome! Ready to push the API changes to staging.', time: '09:35 AM' },
  ],
  'ch-2': [
    { id: 'msg-3', sender: 'user-2', name: 'Sarah Chen', avatar: 'SC', color: '#0052CC', content: 'Homepage design mockups have been updated in Figma. Let me know what you think!', time: '11:15 AM' },
    { id: 'msg-4', sender: 'user-5', name: 'Priya Patel', avatar: 'PP', color: '#6554C0', content: 'Looking good Sarah, especially the hero alignment.', time: '11:22 AM' },
  ],
  'ch-3': [
    { id: 'msg-5', sender: 'user-6', name: 'Tom Bradley', avatar: 'TB', color: '#FF5630', content: 'QA found a slight regression on the biometric authentication toggle. Working on details.', time: '01:05 PM' },
  ],
  'ch-4': [
    { id: 'msg-6', sender: 'user-7', name: 'Emma Davis', avatar: 'ED', color: '#FF991F', content: 'GitHub actions pipeline is green. Merged API migration branch.', time: '02:40 PM' },
  ],
}

export default function MessagesPage() {
  const { user } = useSelector(state => state.auth)
  const teamMembers = useSelector(state => state.projects.teamMembers)

  const [activeChannelId, setActiveChannelId] = useState('ch-1')
  const [messages, setMessages] = useState(INITIAL_MESSAGES)
  const [inputText, setInputText] = useState('')

  const chatEndRef = useRef(null)

  const activeChannel = MOCK_CHANNELS.find(c => c.id === activeChannelId)
  const channelMessages = messages[activeChannelId] || []

  // Auto scroll to bottom
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, activeChannelId])

  const handleSendMessage = (e) => {
    e.preventDefault()
    if (!inputText.trim()) return

    const newMsg = {
      id: `msg-${Date.now()}`,
      sender: user?.id || 'user-1',
      name: user?.name || 'Alex Johnson',
      avatar: user?.avatar || 'AJ',
      color: user?.avatarColor || '#6554C0',
      content: inputText,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }

    setMessages(prev => ({
      ...prev,
      [activeChannelId]: [...(prev[activeChannelId] || []), newMsg]
    }))

    setInputText('')

    // Simulated response from colleagues
    setTimeout(() => {
      const colleague = teamMembers[Math.floor(Math.random() * teamMembers.length)]
      const botResponse = {
        id: `msg-bot-${Date.now()}`,
        sender: colleague.id,
        name: colleague.name,
        avatar: colleague.avatar,
        color: colleague.avatarColor,
        content: `Acknowledged! Adding that to my daily sprint log.`,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }
      setMessages(prev => ({
        ...prev,
        [activeChannelId]: [...(prev[activeChannelId] || []), botResponse]
      }))
    }, 1500)
  }

  return (
    <div className="card" style={{ display: 'grid', gridTemplateColumns: '240px 1fr', height: 'calc(100vh - 120px)', background: 'white', overflow: 'hidden' }}>
      
      {/* Sidebar Channels */}
      <div style={{ borderRight: '1px solid var(--color-border-subtle)', background: '#F4F5F7', display: 'flex', flexDirection: 'column' }}>
        <div style={{ padding: '16px 12px', borderBottom: '1px solid var(--color-border-subtle)' }}>
          <div className="relative">
            <Search size={12} style={{ position: 'absolute', left: 8, top: '50%', transform: 'translateY(-50%)', color: '#6B778C' }} />
            <input 
              type="text" 
              placeholder="Search chat..." 
              className="form-control form-control-sm"
              style={{ paddingLeft: 26, height: 28, fontSize: 11, background: 'white' }}
            />
          </div>
        </div>

        {/* Channel Lists */}
        <div className="overflow-y-auto" style={{ flex: 1, padding: 8 }}>
          <div style={{ fontSize: 10, fontWeight: 700, textTransform: 'uppercase', color: '#6B778C', margin: '8px 4px 4px', letterSpacing: 0.5 }}>Channels</div>
          <div className="flex flex-col gap-1">
            {MOCK_CHANNELS.map(c => {
              const active = c.id === activeChannelId
              return (
                <button
                  key={c.id}
                  onClick={() => setActiveChannelId(c.id)}
                  className="flex items-center gap-2"
                  style={{ 
                    width: '100%', 
                    padding: '6px 8px', 
                    borderRadius: 4, 
                    fontSize: 12, 
                    fontWeight: active ? 700 : 500,
                    color: active ? '#0052CC' : '#6B778C',
                    background: active ? 'rgba(0, 82, 204, 0.08)' : 'none',
                    textAlign: 'left'
                  }}
                >
                  <Hash size={13} style={{ opacity: active ? 1 : 0.6 }} />
                  <span className="truncate">{c.name}</span>
                </button>
              )
            })}
          </div>

          <div style={{ fontSize: 10, fontWeight: 700, textTransform: 'uppercase', color: '#6B778C', margin: '20px 4px 4px', letterSpacing: 0.5 }}>Direct Messages</div>
          <div className="flex flex-col gap-1">
            {teamMembers.map(m => (
              <div
                key={m.id}
                className="flex items-center gap-2"
                style={{ 
                  padding: '6px 8px', 
                  fontSize: 12, 
                  color: '#6B778C'
                }}
              >
                <div style={{ position: 'relative' }}>
                  <div className="user-avatar-sm" style={{ backgroundColor: m.avatarColor, width: 20, height: 20, fontSize: 8 }}>{m.avatar}</div>
                  <Circle size={6} fill="#00875A" color="none" style={{ position: 'absolute', bottom: -1, right: -1, border: '1px solid white', borderRadius: '50%' }} />
                </div>
                <span className="truncate">{m.name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Chat Window */}
      <div style={{ display: 'flex', flexDirection: 'column', height: '100%', background: 'white' }}>
        {/* Chat Window Header */}
        <div className="flex justify-between items-center" style={{ padding: '12px 20px', borderBottom: '1px solid var(--color-border-subtle)', background: 'white' }}>
          <div className="flex items-center gap-2">
            <Hash size={18} color="#0052CC" />
            <div>
              <h3 style={{ fontSize: 14, fontWeight: 700, color: '#172B4D', margin: 0 }}>{activeChannel?.name}</h3>
              <p style={{ fontSize: 11, color: '#6B778C', margin: 0 }}>{activeChannel?.desc}</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button className="icon-btn" style={{ width: 28, height: 28 }}><Phone size={14} /></button>
            <button className="icon-btn" style={{ width: 28, height: 28 }}><Video size={14} /></button>
            <button className="icon-btn" style={{ width: 28, height: 28 }}><Info size={14} /></button>
          </div>
        </div>

        {/* Message Feed */}
        <div className="overflow-y-auto" style={{ flex: 1, padding: 20, background: '#FAFBFC' }}>
          <div className="flex flex-col gap-4">
            {channelMessages.map(msg => {
              const isSelf = msg.sender === user?.id
              return (
                <div key={msg.id} className="flex gap-3 items-start">
                  <div 
                    className="user-avatar" 
                    style={{ 
                      backgroundColor: msg.color || '#0052CC',
                      width: 32,
                      height: 32,
                      fontSize: 11,
                      fontWeight: 700,
                      flexShrink: 0
                    }}
                  >
                    {msg.avatar}
                  </div>
                  <div style={{ minWidth: 0 }}>
                    <div className="flex items-baseline gap-2">
                      <span className="font-semibold" style={{ fontSize: 13, color: '#172B4D' }}>{msg.name}</span>
                      <span style={{ fontSize: 10, color: '#97A0AF' }}>{msg.time}</span>
                    </div>
                    <p style={{ fontSize: 13, color: '#172B4D', margin: '4px 0 0', lineHeight: 1.4, wordBreak: 'break-word' }}>
                      {msg.content}
                    </p>
                  </div>
                </div>
              )
            })}
            <div ref={chatEndRef} />
          </div>
        </div>

        {/* Input Bar */}
        <form onSubmit={handleSendMessage} style={{ padding: 16, borderTop: '1px solid var(--color-border-subtle)', background: 'white' }}>
          <div style={{ border: '1px solid var(--color-border)', borderRadius: 6, display: 'flex', flexDirection: 'column', background: 'white' }}>
            <textarea
              value={inputText}
              onChange={e => setInputText(e.target.value)}
              placeholder={`Message #${activeChannel?.name}`}
              className="w-full"
              rows={2}
              style={{ border: 'none', resize: 'none', padding: 8, outline: 'none', fontSize: 13 }}
              onKeyDown={e => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault()
                  handleSendMessage(e)
                }
              }}
            />
            
            {/* Input Toolbar */}
            <div className="flex justify-between items-center" style={{ padding: '6px 8px', borderTop: '1px solid var(--color-border-subtle)', background: '#FAFBFC' }}>
              <div className="flex gap-1">
                <button type="button" className="icon-btn" style={{ width: 24, height: 24 }}><Paperclip size={12} /></button>
                <button type="button" className="icon-btn" style={{ width: 24, height: 24 }}><Smile size={12} /></button>
                <button type="button" className="icon-btn" style={{ width: 24, height: 24 }}><Image size={12} /></button>
              </div>
              
              <button 
                type="submit" 
                className="btn btn-primary btn-sm flex items-center gap-1"
                style={{ padding: '2px 10px', height: 26 }}
                disabled={!inputText.trim()}
              >
                <span>Send</span>
                <Send size={10} />
              </button>
            </div>
          </div>
        </form>

      </div>
    </div>
  )
}
