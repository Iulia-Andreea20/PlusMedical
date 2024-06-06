const Home = ({ data, error }) => {
  return (
    <>
      <div>PlusMedical</div>
      <div>
        <h1>API Request Demo</h1>
        {error ? (
          <div>Error: {error}</div>
        ) : (
          <div>
            <h2>Response Data</h2>
            <pre>{JSON.stringify(data, null, 2)}</pre>
          </div>
        )}
      </div>
    </>
  );
};


export default Home;
