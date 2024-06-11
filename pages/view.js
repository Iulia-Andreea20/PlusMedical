import React, { useEffect, useState } from 'react';

function ViewDocuments() {
  const [email, setEmail] = useState('');

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    const storedEmail = user?.email;
    if (storedEmail) {
      setEmail(storedEmail);
    }
  }, []);

  const handleViewDocuments = async () => {
    if (!email) {
      alert('No email found in local storage');
      return;
    }

    try {
      const response = await fetch(`/api/get-user-documents?email=${encodeURIComponent(email)}`);
      const result = await response.json();

      if (response.ok) {
        if (result.documents && result.documents.length > 0) {
          result.documents.forEach((docPath) => {
            const newWindow = window.open();
            newWindow.document.write(
              `<iframe src="${docPath}" frameborder="0" style="border:0; top:0; left:0; bottom:0; right:0; width:100%; height:100%;" allowfullscreen></iframe>`
            );
          });
        } else {
          alert('No documents found');
        }
      } else {
        alert(result.message || 'Failed to fetch documents');
      }
    } catch (error) {
      console.error('Error fetching documents:', error);
      alert('Failed to fetch documents');
    }
  };

  return (
    <div>
      <button onClick={handleViewDocuments}>View Documents</button>
    </div>
  );
}

export default ViewDocuments;
