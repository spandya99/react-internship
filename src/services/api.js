export async function fetchArtworks(page, limit) {
  const response = await fetch(
    `https://api.artic.edu/api/v1/artworks?page=${page}&limit=${limit}`
  );

  if (!response.ok) {
    throw new Error("Failed to fetch data");
  }

  const data = await response.json();

  return {
    data: data.data || [],
    total: data.pagination?.total || 0
  };
}