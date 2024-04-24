import { useState } from 'react';

export default function Create() {
    const [nume, setNume] = useState('');
    const [prenume, setPrenume] = useState('');

    async function handleSubmit(event) {
        event.preventDefault();
        const response = await fetch('/api/insert', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ nume, prenume })
        });

        if (response.ok) {
            console.log('Data submitted successfully');
            const data = await response.json();
            alert('Entry created: ' + JSON.stringify(data));
            setNume('');
            setPrenume('');
        } else {
            console.error('Failed to submit data');
            alert('Failed to create entry');
        }
    }

    return (
        <div className="max-w-md mx-auto p-6 bg-white rounded-md shadow-md text-black">
            <h1 className="text-2xl font-bold mb-4">Create Entry</h1>
            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label htmlFor="nume" className="block text-gray-700">Nume:</label>
                    <input
                        type="text"
                        id="nume"
                        value={nume}
                        onChange={(e) => setNume(e.target.value)}
                        className="form-input mt-1 block w-full rounded-md border-gray-300"
                        required
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
                        required
                    />
                </div>
                <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-md">Submit</button>
            </form>
        </div>
    );
}
