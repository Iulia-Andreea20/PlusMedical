import useSWR from 'swr';

const fetcher = url => fetch(url).then(res => res.json());

export default function People() {
  const { data, error } = useSWR('/api/test', fetcher);

  if (error) return <div>Failed to load</div>;
  if (!data) return <div>Loading...</div>;

  return (
    <div>
      <h1>Test records</h1>
      <ul>
        {data.map((p, index) => (
          <li key={index}> {p.nume} {p.prenume}</li>
        ))}
      </ul>
    </div>
  );
}
