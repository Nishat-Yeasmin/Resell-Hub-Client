const BASE_URL = process.env.NEXT_PUBLIC_BETTER_AUTH_URL;

export const fetcher = async (url) => {
  const res = await fetch(`${BASE_URL}${url}`);
  return res.json();
};