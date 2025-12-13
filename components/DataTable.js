export default function DataTable({ columns, data, onEdit, onDelete, isAdmin }) {
    if (!data || data.length === 0) {
        return <div className="p-4 text-gray-500">No records found.</div>
    }

    return (
        <div className="overflow-x-auto">
            <table className="min-w-full bg-white border border-gray-200">
                <thead>
                    <tr className="bg-gray-100 border-b">
                        {columns.map((col) => (
                            <th key={col.key} className="text-left py-3 px-4 uppercase font-semibold text-sm text-gray-700">
                                {col.label}
                            </th>
                        ))}
                        {isAdmin && <th className="text-left py-3 px-4 uppercase font-semibold text-sm text-gray-700">Actions</th>}
                    </tr>
                </thead>
                <tbody>
                    {data.map((row) => (
                        <tr key={row.id} className="border-b hover:bg-gray-50">
                            {columns.map((col) => (
                                <td key={`${row.id}-${col.key}`} className="py-3 px-4 text-gray-800">
                                    {col.render ? col.render(row[col.key], row) : row[col.key]}
                                </td>
                            ))}
                            {isAdmin && (
                                <td className="py-3 px-4">
                                    <button
                                        onClick={() => onEdit(row)}
                                        className="text-blue-600 hover:text-blue-800 mr-4 text-sm font-medium"
                                    >
                                        Edit
                                    </button>
                                    <button
                                        onClick={() => onDelete(row.id)}
                                        className="text-red-600 hover:text-red-800 text-sm font-medium"
                                    >
                                        Delete
                                    </button>
                                </td>
                            )}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}
