const url = "http://localhost:3000/api";

export const api = {
  users: `${url}/users`,
  transactions: `${url}/transactions`,
  auth: `${url}/auth`,
};

export async function get(url) {
  try {
    const resp = await fetch(url);
    let data = await resp.json();
    return data.content;
  } catch {
    return {};
  }
}

export async function request(url, method, object) {
  try {
    const response = await fetch(url, {
      headers: { "Content-Type": "application/json" },
      method: method,
      body: JSON.stringify(object),
    });
    return response;
  } catch (error) {
    console.error(error);
  }
}
