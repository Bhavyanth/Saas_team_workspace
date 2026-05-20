import { useSelector } from 'react-redux'
import { 
  Users, Mail, Award, CheckSquare, Clock, Shield, Briefcase, Plus 
} from 'lucide-react'

export default function TeamPage() {
  const teamMembers = useSelector(state => state.projects.teamMembers)
  const tasks = useSelector(state => state.tasks.tasks)

  return (
    <div className="flex flex-col gap-6">
      {/* Page Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 style={{ fontSize: 24, fontWeight: 700, color: '#172B4D' }}>Team Management</h2>
          <p style={{ fontSize: 13, color: '#6B778C' }}>Monitor employee workloads, view active sprint capacities, and manage roles.</p>
        </div>
      </div>

      {/* Stats Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 16 }}>
        <div className="stat-card">
          <div className="stat-card-header">
            <span className="stat-label">Total Engineering Squad</span>
            <div className="stat-icon" style={{ background: 'rgba(0, 82, 204, 0.1)', color: '#0052CC' }}>
              <Users size={18} />
            </div>
          </div>
          <div className="stat-value">{teamMembers.length}</div>
          <div style={{ fontSize: 11, color: '#6B778C' }}>Full-time contributors</div>
        </div>

        <div className="stat-card">
          <div className="stat-card-header">
            <span className="stat-label">Avg Workload per Developer</span>
            <div className="stat-icon" style={{ background: 'rgba(101, 84, 192, 0.1)', color: '#6554C0' }}>
              <Briefcase size={18} />
            </div>
          </div>
          <div className="stat-value">
            {teamMembers.length > 0 ? (tasks.filter(t => t.status !== 'COMPLETED').length / teamMembers.length).toFixed(1) : 0}
          </div>
          <div style={{ fontSize: 11, color: '#6B778C' }}>Pending sprint tickets</div>
        </div>
      </div>

      {/* Team Member Cards Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: 20 }}>
        {teamMembers.map(member => {
          // Calculate tasks for this member
          const memberTasks = tasks.filter(t => t.assignedTo === member.id)
          const completedCount = memberTasks.filter(t => t.status === 'COMPLETED').length
          const activeCount = memberTasks.filter(t => t.status !== 'COMPLETED').length
          const totalPoints = memberTasks
            .filter(t => t.status !== 'COMPLETED')
            .reduce((sum, t) => sum + (t.storyPoints || 0), 0)

          // Performance Score
          const completionRate = memberTasks.length > 0 
            ? Math.round((completedCount / memberTasks.length) * 100)
            : 100

          return (
            <div key={member.id} className="card" style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
              <div className="card-body" style={{ padding: 20 }}>
                {/* Member Profile Row */}
                <div className="flex gap-3 items-start" style={{ marginBottom: 16 }}>
                  <div 
                    className="user-avatar" 
                    style={{ 
                      backgroundColor: member.avatarColor || '#6554C0',
                      width: 44,
                      height: 44,
                      fontSize: 16,
                      fontWeight: 700
                    }}
                  >
                    {member.avatar}
                  </div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <h3 className="font-semibold truncate" style={{ fontSize: 15, color: '#172B4D', margin: 0 }}>{member.name}</h3>
                    <p style={{ fontSize: 11, color: '#6B778C', fontWeight: 500, margin: '2px 0' }}>{member.title}</p>
                    <span className="badge badge-sm badge-success">{member.role}</span>
                  </div>
                </div>

                {/* Email details */}
                <div className="flex items-center gap-2" style={{ fontSize: 11, color: '#6B778C', marginBottom: 16 }}>
                  <Mail size={12} />
                  <span>{member.name.toLowerCase().replace(' ', '')}@projectflow.com</span>
                </div>

                {/* Workload Breakdown */}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 8, padding: 10, background: 'var(--color-bg)', borderRadius: 6, marginBottom: 16, textAlign: 'center' }}>
                  <div>
                    <div style={{ fontSize: 15, fontWeight: 700, color: '#0052CC' }}>{activeCount}</div>
                    <div style={{ fontSize: 9, color: '#6B778C', textTransform: 'uppercase', fontWeight: 600 }}>Active Tasks</div>
                  </div>
                  <div>
                    <div style={{ fontSize: 15, fontWeight: 700, color: '#00875A' }}>{completedCount}</div>
                    <div style={{ fontSize: 9, color: '#6B778C', textTransform: 'uppercase', fontWeight: 600 }}>Completed</div>
                  </div>
                  <div>
                    <div style={{ fontSize: 15, fontWeight: 700, color: '#6554C0' }}>{totalPoints}</div>
                    <div style={{ fontSize: 9, color: '#6B778C', textTransform: 'uppercase', fontWeight: 600 }}>Story Pts</div>
                  </div>
                </div>

                {/* Task Load Level Indicator */}
                <div className="mb-2">
                  <div className="flex justify-between items-center mb-1" style={{ fontSize: 10, fontWeight: 600, color: '#172B4D' }}>
                    <span>Capacity (Tasks Completion Rate)</span>
                    <span>{completionRate}%</span>
                  </div>
                  <div style={{ height: 6, width: '100%', background: 'var(--color-border-subtle)', borderRadius: 3 }}>
                    <div 
                      style={{ 
                        height: '100%', 
                        width: `${completionRate}%`, 
                        background: completionRate > 75 ? '#00875A' : completionRate > 40 ? '#0052CC' : '#DE350B',
                        borderRadius: 3 
                      }} 
                    />
                  </div>
                </div>

                {/* Subtext info */}
                <div style={{ display: 'flex', alignItems: 'center', gap: 4, fontSize: 10, color: '#6B778C' }}>
                  <Award size={10} color="#FF991F" />
                  <span>Joined Engineering workspace in 2022</span>
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
