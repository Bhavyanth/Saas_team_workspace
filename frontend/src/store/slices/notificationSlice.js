import { createSlice } from '@reduxjs/toolkit'

const INITIAL_NOTIFICATIONS = [
  { id: 'notif-1', type: 'TASK_ASSIGNED', title: 'Task Assigned', message: 'Alex Johnson assigned you "Implement responsive navigation"', isRead: false, createdAt: new Date(Date.now() - 30 * 60000).toISOString(), entityType: 'task', entityId: 'task-2' },
  { id: 'notif-2', type: 'DEADLINE_APPROACHING', title: 'Deadline Approaching', message: 'Task "App store submission preparation" is due tomorrow', isRead: false, createdAt: new Date(Date.now() - 2 * 3600000).toISOString(), entityType: 'task', entityId: 'task-8' },
  { id: 'notif-3', type: 'COMMENT_ADDED', title: 'New Comment', message: 'James Wilson commented on "Push notification system"', isRead: false, createdAt: new Date(Date.now() - 4 * 3600000).toISOString(), entityType: 'task', entityId: 'task-6' },
  { id: 'notif-4', type: 'PROJECT_UPDATED', title: 'Project Updated', message: 'Mobile App v2 status changed to In Progress', isRead: true, createdAt: new Date(Date.now() - 24 * 3600000).toISOString(), entityType: 'project', entityId: 'proj-2' },
  { id: 'notif-5', type: 'MENTION', title: 'You were mentioned', message: 'Priya Patel mentioned you in "Performance optimization" task', isRead: true, createdAt: new Date(Date.now() - 48 * 3600000).toISOString(), entityType: 'task', entityId: 'task-4' },
]

const initialState = {
  notifications: INITIAL_NOTIFICATIONS,
  unreadCount: 3,
  loading: false,
}

const notificationSlice = createSlice({
  name: 'notifications',
  initialState,
  reducers: {
    addNotification: (state, action) => {
      state.notifications.unshift(action.payload)
      if (!action.payload.isRead) state.unreadCount += 1
    },
    markAsRead: (state, action) => {
      const notif = state.notifications.find(n => n.id === action.payload)
      if (notif && !notif.isRead) {
        notif.isRead = true
        notif.readAt = new Date().toISOString()
        state.unreadCount = Math.max(0, state.unreadCount - 1)
      }
    },
    markAllAsRead: (state) => {
      state.notifications.forEach(n => {
        n.isRead = true
        n.readAt = new Date().toISOString()
      })
      state.unreadCount = 0
    },
    deleteNotification: (state, action) => {
      const notif = state.notifications.find(n => n.id === action.payload)
      if (notif && !notif.isRead) state.unreadCount = Math.max(0, state.unreadCount - 1)
      state.notifications = state.notifications.filter(n => n.id !== action.payload)
    },
  },
})

export const { addNotification, markAsRead, markAllAsRead, deleteNotification } = notificationSlice.actions
export default notificationSlice.reducer
