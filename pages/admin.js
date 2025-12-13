import { useEffect, useState } from 'react'
import { supabase } from '../lib/supabaseClient'
import { getUserRole } from '../lib/auth'
import { useRouter } from 'next/router'
import DataTable from '../components/DataTable'
import DataModal from '../components/DataModal'

export default function AdminDashboard() {
    const [role, setRole] = useState(null)
    const [loading, setLoading] = useState(true)
    const [activeTab, setActiveTab] = useState('tasks')
    const [data, setData] = useState([])
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [editingItem, setEditingItem] = useState(null)
    const router = useRouter()

    // --- Auth Check ---
    useEffect(() => {
        const checkAccess = async () => {
            const { data: { session } } = await supabase.auth.getSession()
            if (!session) {
                router.push('/login')
                return
            }
            const userRole = await getUserRole(session.user.id)
            setRole(userRole)
            setLoading(false)
        }
        checkAccess()
    }, [router])

    // --- Data Fetching ---
    const fetchData = async () => {
        if (!role) return
        const { data: result, error } = await supabase
            .from(activeTab)
            .select('*')
            .order('created_at', { ascending: false })

        if (error) console.error('Error fetching data:', error)
        else setData(result || [])
    }

    useEffect(() => {
        if (role === 'owner' || role === 'admin') {
            fetchData()
        }
    }, [role, activeTab])

    // --- CRUD Operations ---
    const handleSave = async (formData) => {
        const payload = { ...formData }
        // Add timestamps if new
        if (!editingItem) {
            payload.created_at = new Date().toISOString()
        }

        let error
        if (editingItem) {
            const { error: updateError } = await supabase
                .from(activeTab)
                .update(payload)
                .eq('id', editingItem.id)
            error = updateError
        } else {
            const { error: insertError } = await supabase
                .from(activeTab)
                .insert([payload])
            error = insertError
        }

        if (error) {
            alert('Error saving data: ' + error.message)
        } else {
            setIsModalOpen(false)
            setEditingItem(null)
            fetchData()
        }
    }

    const handleDelete = async (id) => {
        if (!confirm('Are you sure you want to delete this record?')) return

        const { error } = await supabase
            .from(activeTab)
            .delete()
            .eq('id', id)

        if (error) alert('Error deleting: ' + error.message)
        else fetchData()
    }

    // --- Config ---
    const getColumns = () => {
        switch (activeTab) {
            case 'tasks':
                return [
                    { key: 'title', label: 'Task Title' },
                    { key: 'status', label: 'Status', render: (val) => <span className={`status-badge ${val?.toLowerCase()}`}>{val}</span> },
                    { key: 'assigned_to', label: 'Assigned To (User ID)' },
                    { key: 'deadline', label: 'Deadline' }
                ]
            case 'attendance':
                return [
                    { key: 'user_id', label: 'Employee ID' },
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

    const getFormFields = () => {
        switch (activeTab) {
            case 'tasks':
                return [
                    { name: 'title', label: 'Title', required: true },
                    { name: 'description', label: 'Description', type: 'text' },
                    { name: 'status', label: 'Status', type: 'select', options: ['Pending', 'In Progress', 'Completed'] },
                    { name: 'assigned_to', label: 'Assign To (User ID)', required: true },
                    { name: 'deadline', label: 'Deadline', type: 'date' }
                ]
            case 'attendance':
                return [
                    { name: 'user_id', label: 'User ID', required: true },
                    { name: 'date', label: 'Date', type: 'date', required: true },
                    { name: 'status', label: 'Status', type: 'select', options: ['Present', 'Absent', 'Leave'] },
                    { name: 'check_in', label: 'Check In Time', type: 'time' },
                    { name: 'check_out', label: 'Check Out Time', type: 'time' }
                ]
            case 'leads':
                return [
                    { name: 'name', label: 'Name', required: true },
                    { name: 'email', label: 'Email', type: 'email', required: true },
                    { name: 'phone', label: 'Phone' },
                    { name: 'status', label: 'Status', type: 'select', options: ['New', 'Contacted', 'Qualified', 'Closed'] },
                    { name: 'source', label: 'Source' }
                ]
            default: return []
        }
    }

    if (loading) return <div className="p-8">Loading...</div>

    if (role !== 'owner' && role !== 'admin') {
        return <div className="p-8 text-red-600">Access Denied.</div>
    }

    return (
        <div className="min-h-screen bg-gray-50">
            <header className="bg-white shadow">
                <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8 flex justify-between items-center">
                    <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
                    <button
                        onClick={() => { setEditingItem(null); setIsModalOpen(true); }}
                        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                    >
                        + Add New
                    </button>
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
                    isAdmin={true}
                    onEdit={(item) => { setEditingItem(item); setIsModalOpen(true); }}
                    onDelete={handleDelete}
                />

                {/* Modal */}
                <DataModal
                    isOpen={isModalOpen}
                    onClose={() => setIsModalOpen(false)}
                    onSave={handleSave}
                    initialData={editingItem}
                    fields={getFormFields()}
                    title={`${editingItem ? 'Edit' : 'Add'} ${activeTab.slice(0, -1)}`}
                />
            </main>
        </div>
    )
}
