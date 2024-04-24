import { useState } from 'react';

export default function UpdatePersonPage() {
    const [id, setId] = useState('');
    const [nume, setNume] = useState('');
    const [prenume, setPrenume] = useState('');
    const [message, setMessage] = useState('');

    async function handleUpdate(event) {
        event.preventDefault();
        
        const response = await fetch('/api/update', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ id, nume, prenume }),
        });

        if (response.ok) {
            const updatedPerson = await response.json();
            setMessage(`Person with ID ${id} updated successfully`);
        } else {
            setMessage('Failed to update person');
        }
    }

    return (
        <div className="max-w-md mx-auto p-6 bg-white rounded-md shadow-md text-black">
            <h1 className="text-2xl font-bold mb-4">Update Person</h1>
            <form onSubmit={handleUpdate}>
                <div className="mb-4">
                    <label htmlFor="id" className="block text-gray-700">ID:</label>
                    <input
                        type="number"
                        id="id"
                        value={id}
                        onChange={(e) => setId(e.target.value)}
                        className="form-input mt-1 block w-full rounded-md border-gray-300"
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="nume" className="block text-gray-700">Nume:</label>
                    <input
                        type="text"
                        id="nume"
                        value={nume}
                        onChange={(e) => setNume(e.target.value)}
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
                <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-md">Update</button>
            </form>
            <p className="mt-4">{message}</p>
        </div>
    );
}
