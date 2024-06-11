import UploadForm from '@components/UploadForm';
import FileViewer from '@components/FileViewer';

const Home = () => {
  return (
    <div>
      <h1>Upload PDF File</h1>
      <UploadForm />
      <h1>View PDF File</h1>
      <FileViewer />
    </div>
  );
};

export default Home;
