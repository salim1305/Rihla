// js/api.js
const DEFAULT_BASE = "http://localhost:5000"; // adapte si besoin
export const BASE_URL = window.__RIHLA_API__ || DEFAULT_BASE;

function authHeader() {
  const t = localStorage.getItem("token");
  return t ? { Authorization: `Bearer ${t}` } : {};
}

async function request(path, { method = "GET", headers = {}, body, form = false } = {}) {
  const url = `${BASE_URL}${path}`;
  const opts = { method, headers: { ...headers, ...authHeader() } };

  if (form) {
    // body = FormData
    opts.body = body;
  } else if (body !== undefined) {
    opts.headers["Content-Type"] = "application/json";
    opts.body = JSON.stringify(body);
  }

  const res = await fetch(url, opts);
  const text = await res.text();
  let data;
  try { data = text ? JSON.parse(text) : {}; } catch { data = { message: text }; }

  if (!res.ok) {
    const msg = data?.message || data?.error || `HTTP ${res.status}`;
    throw new Error(msg);
  }
  return data;
}

export const api = {
  get: (p, token) => request(p, { headers: token ? { Authorization: `Bearer ${token}` } : undefined }),
  post: (p, b, token) => request(p, { method: "POST", body: b, headers: token ? { Authorization: `Bearer ${token}` } : undefined }),
  postForm: (p, formData, token) => request(p, { method: "POST", body: formData, form: true, headers: token ? { Authorization: `Bearer ${token}` } : undefined }),
};