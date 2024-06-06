import { useState } from 'react';

export default function DeletePersonPage() {
    const [nume, setName] = useState('');
    const [prenume, setPrenume] = useState('');
    const [message, setMessage] = useState('');

    async function handleDelete() {
        const response = await fetch('/api/delete', {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ nume, prenume }),
        });

        if (response.ok) {
            const deletedPerson = await response.json();
            setMessage(`Person with nume ${nume} and prenume ${prenume} deleted successfully`);
        } else {
            setMessage('Failed to delete person');
        }
    }

    return (
        <div className="max-w-md mx-auto p-6 bg-white rounded-md shadow-md text-black">
            <h1 className="text-2xl font-bold mb-4">Delete Person</h1>
            <div className="mb-4">
                <label htmlFor="nume" className="block text-gray-700">Name:</label>
                <input
                    type="text"
                    id="nume"
                    value={nume}
                    onChange={(e) => setName(e.target.value)}
                    className="form-input mt-1 block w-full rounded-md border-gray-300"
                />
            </div>
            <div className="mb-4">
                <label htmlFor="prenume" className="block text-gray-700">Prenume:</label>
                <input
                    type="text"
                    id="prenume"
                    value={prenume}
                    onChange={(e) => setPrenume(e.target.value)}
                    className="form-input mt-1 block w-full rounded-md border-gray-300"
                />
            </div>
            <button onClick={handleDelete} className="bg-blue-500 text-white px-4 py-2 rounded-md">Delete</button>
            <p className="mt-4">{message}</p>
        </div>
    );
}
