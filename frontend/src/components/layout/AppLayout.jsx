import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Outlet, useLocation } from 'react-router-dom'
import Sidebar from './Sidebar'
import Header from './Header'
import NotificationPanel from '../common/NotificationPanel'
import TaskModal from '../tasks/TaskModal'
import ProjectModal from '../projects/ProjectModal'
import { closeNotificationPanel, closeUserMenu } from '../../store/slices/uiSlice'

export default function AppLayout() {
  const dispatch = useDispatch()
  const location = useLocation()
  
  const { 
    sidebarCollapsed, 
    notificationPanelOpen, 
    activeModal 
  } = useSelector(state => state.ui)

  // Close panels on route change
  useEffect(() => {
    dispatch(closeNotificationPanel())
    dispatch(closeUserMenu())
  }, [location.pathname, dispatch])

  return (
    <div className={`app-layout ${sidebarCollapsed ? 'sidebar-collapsed' : ''}`}>
      {/* Sidebar Layout */}
      <Sidebar />

      {/* Main Content Area */}
      <div className="main-content">
        <Header />
        
        {/* Render child pages */}
        <main className="page-content">
          <Outlet />
        </main>
      </div>

      {/* Notification overlay panel */}
      {notificationPanelOpen && <NotificationPanel />}

      {/* Modals rendering container */}
      {activeModal === 'CREATE_TASK' && <TaskModal mode="create" />}
      {activeModal === 'EDIT_TASK' && <TaskModal mode="edit" />}
      {activeModal === 'CREATE_PROJECT' && <ProjectModal mode="create" />}
      {activeModal === 'EDIT_PROJECT' && <ProjectModal mode="edit" />}
      {activeModal === 'GLOBAL_SEARCH' && <GlobalSearchModal />}
    </div>
  )
}

// Simple Global Search Overlay
function GlobalSearchModal() {
  const dispatch = useDispatch()
  const projects = useSelector(state => state.projects.projects)
  const tasks = useSelector(state => state.tasks.tasks)
  
  const handleClose = () => {
    dispatch({ type: 'ui/closeModal' })
  }
  
  return (
    <div className="modal-backdrop" onClick={handleClose}>
      <div className="modal-container search-modal" onClick={e => e.stopPropagation()} style={{ maxWidth: 500, marginTop: '10vh' }}>
        <div className="modal-header" style={{ padding: '12px 16px' }}>
          <input 
            type="text" 
            placeholder="Type to search projects or tasks..." 
            className="w-full text-base" 
            style={{ border: 'none', outline: 'none' }}
            autoFocus 
          />
        </div>
        <div className="modal-body" style={{ maxHeight: 300, overflowY: 'auto', padding: '12px 16px' }}>
          <div className="search-section-label" style={{ fontSize: 10, fontWeight: 700, textTransform: 'uppercase', color: 'var(--color-text-subtle)', marginBottom: 8 }}>Recent Projects</div>
          <div className="flex flex-col gap-1 mb-4">
            {projects.slice(0, 3).map(p => (
              <a href={`/projects`} key={p.id} className="search-result-item flex items-center gap-2 p-2 hover-bg" style={{ borderRadius: 4 }}>
                <span className="project-key-badge" style={{ backgroundColor: p.color }}>{p.key[0]}</span>
                <span className="font-medium">{p.name}</span>
              </a>
            ))}
          </div>
          
          <div className="search-section-label" style={{ fontSize: 10, fontWeight: 700, textTransform: 'uppercase', color: 'var(--color-text-subtle)', marginBottom: 8 }}>Recent Tasks</div>
          <div className="flex flex-col gap-1">
            {tasks.slice(0, 4).map(t => (
              <a href={`/tasks`} key={t.id} className="search-result-item flex items-center gap-2 p-2 hover-bg" style={{ borderRadius: 4 }}>
                <span className={`badge badge-sm badge-${t.priority === 'HIGH' || t.priority === 'CRITICAL' ? 'danger' : 'info'}`} style={{ minWidth: 50 }}>{t.priority}</span>
                <span>{t.title}</span>
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
