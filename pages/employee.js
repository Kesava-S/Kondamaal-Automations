import { useEffect, useState } from 'react'
import { supabase } from '../lib/supabaseClient'
import { getUserRole } from '../lib/auth'
import { useRouter } from 'next/router'
import DataTable from '../components/DataTable'

export default function EmployeeDashboard() {
    const [role, setRole] = useState(null)
    const [loading, setLoading] = useState(true)
    const [activeTab, setActiveTab] = useState('tasks')
    const [data, setData] = useState([])
    const [userId, setUserId] = useState(null)
    const router = useRouter()

    // --- Auth Check ---
    useEffect(() => {
        const checkAccess = async () => {
            const { data: { session } } = await supabase.auth.getSession()
            if (!session) {
                router.push('/login')
                return
            }
            setUserId(session.user.id)
            const userRole = await getUserRole(session.user.id)
            setRole(userRole)
            setLoading(false)
        }
        checkAccess()
    }, [router])

    // --- Data Fetching ---
    useEffect(() => {
        const fetchData = async () => {
            if (!userId || !role) return

            let query = supabase
                .from(activeTab)
                .select('*')
                .order('created_at', { ascending: false })

            // Filter by assigned user
            // Note: This assumes column names match. 
            // Tasks -> assigned_to
            // Attendance -> user_id
            // Leads -> assigned_to
            if (activeTab === 'attendance') {
                query = query.eq('user_id', userId)
            } else {
                query = query.eq('assigned_to', userId)
            }

            const { data: result, error } = await query

            if (error) console.error('Error fetching data:', error)
            else setData(result || [])
        }

        if (role) {
            fetchData()
        }
    }, [role, activeTab, userId])

    // --- Config ---
    const getColumns = () => {
        switch (activeTab) {
            case 'tasks':
                return [
                    { key: 'title', label: 'Task Title' },
                    { key: 'description', label: 'Description' },
                    { key: 'status', label: 'Status', render: (val) => <span className={`status-badge ${val?.toLowerCase()}`}>{val}</span> },
                    { key: 'deadline', label: 'Deadline' }
                ]
            case 'attendance':
                return [
                    { key: 'date', label: 'Date' },
                    { key: 'status', label: 'Status' },
                    { key: 'check_in', label: 'Check In' },
                    { key: 'check_out', label: 'Check Out' }
                ]
            case 'leads':
                return [
                    { key: 'name', label: 'Lead Name' },
                    { key: 'email', label: 'Email' },
                    { key: 'status', label: 'Status' },
                    { key: 'source', label: 'Source' }
                ]
            default: return []
        }
    }

    if (loading) return <div className="p-8">Loading...</div>

    // Allow admin/owner to view this page too for testing, or restrict strictly
    const allowedRoles = ['employee', 'admin', 'owner']
    if (!allowedRoles.includes(role)) {
        return <div className="p-8 text-red-600">Access Denied.</div>
    }

    return (
        <div className="min-h-screen bg-gray-50">
            <header className="bg-white shadow">
                <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
                    <h1 className="text-3xl font-bold text-gray-900">Employee Dashboard</h1>
                    <p className="text-gray-600 mt-1">Welcome back!</p>
                </div>
            </header>

            <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
                {/* Tabs */}
                <div className="flex border-b border-gray-200 mb-6">
                    {['tasks', 'attendance', 'leads'].map(tab => (
                        <button
                            key={tab}
                            onClick={() => setActiveTab(tab)}
                            className={`py-2 px-4 font-medium capitalize ${activeTab === tab ? 'border-b-2 border-blue-500 text-blue-600' : 'text-gray-500 hover:text-gray-700'}`}
                        >
                            {tab}
                        </button>
                    ))}
                </div>

                {/* Table */}
                <DataTable
                    columns={getColumns()}
                    data={data}
                    isAdmin={false} // Employees cannot edit/delete via this table
                />
            </main>
        </div>
    )
}
