import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { X } from 'lucide-react'
import { addProject, updateProject } from '../../store/slices/projectSlice'
import { closeModal } from '../../store/slices/uiSlice'

const PRESET_COLORS = [
  '#0052CC', // Blue
  '#6554C0', // Purple
  '#00875A', // Green
  '#FF5630', // Red
  '#FF991F', // Orange
  '#00B8D9', // Teal
]

export default function ProjectModal({ mode = 'create' }) {
  const dispatch = useDispatch()
  const { user } = useSelector(state => state.auth)
  const { teamMembers, projects } = useSelector(state => state.projects)
  const { modalData } = useSelector(state => state.ui)
  
  const [formData, setFormData] = useState({
    name: '',
    key: '',
    color: PRESET_COLORS[0],
    description: '',
    status: 'NOT_STARTED',
    priority: 'MEDIUM',
    startDate: new Date().toISOString().split('T')[0],
    endDate: '',
    budget: '',
    members: [],
    tags: '',
  })

  useEffect(() => {
    if (mode === 'edit' && modalData) {
      setFormData({
        id: modalData.id,
        name: modalData.name || '',
        key: modalData.key || '',
        color: modalData.color || PRESET_COLORS[0],
        description: modalData.description || '',
        status: modalData.status || 'NOT_STARTED',
        priority: modalData.priority || 'MEDIUM',
        startDate: modalData.startDate || '',
        endDate: modalData.endDate || '',
        budget: modalData.budget || '',
        members: modalData.members || [],
        tags: modalData.tags ? modalData.tags.join(', ') : '',
      })
    }
  }, [mode, modalData])

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleMemberToggle = (memberId) => {
    setFormData(prev => {
      const isSelected = prev.members.includes(memberId)
      const updatedMembers = isSelected 
        ? prev.members.filter(id => id !== memberId)
        : [...prev.members, memberId]
      return { ...prev, members: updatedMembers }
    })
  }

  const handleClose = () => {
    dispatch(closeModal())
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    
    const formattedTags = formData.tags 
      ? formData.tags.split(',').map(tag => tag.trim()).filter(Boolean)
      : []

    if (mode === 'create') {
      const newProject = {
        id: `proj-${Date.now()}`,
        name: formData.name,
        key: formData.key.toUpperCase(),
        color: formData.color,
        description: formData.description,
        status: formData.status,
        priority: formData.priority,
        progress: 0,
        startDate: formData.startDate,
        endDate: formData.endDate,
        budget: Number(formData.budget) || 0,
        members: [...formData.members, user?.id].filter(Boolean),
        owner: user?.id || 'user-1',
        taskCount: { total: 0, completed: 0, inProgress: 0, todo: 0 },
        tags: formattedTags,
      }
      dispatch(addProject(newProject))
      dispatch({ 
        type: 'ui/addToast', 
        payload: { type: 'success', title: 'Project Created', message: `Project "${formData.name}" has been created successfully.` }
      })
    } else {
      const updatedData = {
        id: formData.id,
        name: formData.name,
        key: formData.key.toUpperCase(),
        color: formData.color,
        description: formData.description,
        status: formData.status,
        priority: formData.priority,
        startDate: formData.startDate,
        endDate: formData.endDate,
        budget: Number(formData.budget) || 0,
        members: formData.members,
        tags: formattedTags,
      }
      dispatch(updateProject(updatedData))
      dispatch({ 
        type: 'ui/addToast', 
        payload: { type: 'success', title: 'Project Updated', message: `Project "${formData.name}" has been updated.` }
      })
    }
    
    handleClose()
  }

  return (
    <div className="modal-backdrop" onClick={handleClose}>
      <div className="modal-container" onClick={e => e.stopPropagation()} style={{ maxWidth: 600 }}>
        <div className="modal-header">
          <h2 className="modal-title">{mode === 'create' ? 'Create New Project' : 'Edit Project'}</h2>
          <button className="modal-close-btn" onClick={handleClose}>
            <X size={16} />
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="modal-body">
            <div className="form-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '16px' }}>
              <div className="form-group" style={{ gridColumn: 'span 2' }}>
                <label className="form-label required">Project Name</label>
                <input 
                  type="text" 
                  name="name" 
                  value={formData.name} 
                  onChange={handleInputChange} 
                  className="form-control"
                  placeholder="e.g. Website Redesign"
                  required
                />
              </div>

              <div className="form-group">
                <label className="form-label required">Project Key (2-4 chars)</label>
                <input 
                  type="text" 
                  name="key" 
                  value={formData.key} 
                  onChange={handleInputChange} 
                  className="form-control"
                  placeholder="e.g. WR"
                  maxLength={4}
                  required
                  disabled={mode === 'edit'}
                />
              </div>

              <div className="form-group">
                <label className="form-label">Theme Color</label>
                <div className="flex gap-2 items-center" style={{ marginTop: 6 }}>
                  {PRESET_COLORS.map(color => (
                    <button
                      key={color}
                      type="button"
                      className="project-key-badge"
                      style={{ 
                        backgroundColor: color, 
                        width: 24, 
                        height: 24, 
                        border: formData.color === color ? '2px solid #172B4D' : 'none',
                        cursor: 'pointer',
                        transform: formData.color === color ? 'scale(1.15)' : 'none',
                        transition: 'transform 0.1s ease'
                      }}
                      onClick={() => setFormData(prev => ({ ...prev, color }))}
                    />
                  ))}
                </div>
              </div>
            </div>

            <div className="form-group mb-4">
              <label className="form-label">Description</label>
              <textarea 
                name="description" 
                value={formData.description} 
                onChange={handleInputChange} 
                className="form-control"
                placeholder="What is this project about?"
                rows={3}
              />
            </div>

            <div className="form-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '16px' }}>
              <div className="form-group">
                <label className="form-label">Status</label>
                <select name="status" value={formData.status} onChange={handleInputChange} className="form-control">
                  <option value="NOT_STARTED">Not Started</option>
                  <option value="IN_PROGRESS">In Progress</option>
                  <option value="COMPLETED">Completed</option>
                </select>
              </div>

              <div className="form-group">
                <label className="form-label">Priority</label>
                <select name="priority" value={formData.priority} onChange={handleInputChange} className="form-control">
                  <option value="LOW">Low</option>
                  <option value="MEDIUM">Medium</option>
                  <option value="HIGH">High</option>
                  <option value="CRITICAL">Critical</option>
                </select>
              </div>

              <div className="form-group">
                <label className="form-label">Start Date</label>
                <input 
                  type="date" 
                  name="startDate" 
                  value={formData.startDate} 
                  onChange={handleInputChange} 
                  className="form-control"
                />
              </div>

              <div className="form-group">
                <label className="form-label">Target End Date</label>
                <input 
                  type="date" 
                  name="endDate" 
                  value={formData.endDate} 
                  onChange={handleInputChange} 
                  className="form-control"
                />
              </div>

              <div className="form-group">
                <label className="form-label">Budget ($)</label>
                <input 
                  type="number" 
                  name="budget" 
                  value={formData.budget} 
                  onChange={handleInputChange} 
                  className="form-control"
                  placeholder="e.g. 50000"
                />
              </div>

              <div className="form-group">
                <label className="form-label">Tags (comma-separated)</label>
                <input 
                  type="text" 
                  name="tags" 
                  value={formData.tags} 
                  onChange={handleInputChange} 
                  className="form-control"
                  placeholder="Design, Frontend, Mobile"
                />
              </div>
            </div>

            {/* Team Member Selection */}
            <div className="form-group mb-4">
              <label className="form-label">Team Members</label>
              <div className="team-select-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px', maxHeight: 150, overflowY: 'auto', border: '1px solid var(--color-border)', borderRadius: 4, padding: 8 }}>
                {teamMembers.map(member => {
                  const isChecked = formData.members.includes(member.id)
                  return (
                    <label key={member.id} className="flex items-center gap-2" style={{ cursor: 'pointer', padding: '4px', borderRadius: 4, background: isChecked ? 'rgba(0,82,204,0.05)' : 'none' }}>
                      <input 
                        type="checkbox" 
                        checked={isChecked}
                        onChange={() => handleMemberToggle(member.id)}
                      />
                      <div className="user-avatar-sm" style={{ backgroundColor: member.avatarColor, width: 20, height: 20, fontSize: 8 }}>{member.avatar}</div>
                      <span style={{ fontSize: 12 }}>{member.name}</span>
                    </label>
                  )
                })}
              </div>
            </div>
          </div>

          <div className="modal-footer">
            <button type="button" className="btn btn-secondary" onClick={handleClose}>Cancel</button>
            <button type="submit" className="btn btn-primary">{mode === 'create' ? 'Create Project' : 'Save Changes'}</button>
          </div>
        </form>
      </div>
    </div>
  )
}
