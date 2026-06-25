const BASE_URL = "http://localhost:5000";

export const fetcher = async (url) => {
  const res = await fetch(`${BASE_URL}${url}`);
  return res.json();
};