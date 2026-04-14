import api from "./api";

export const authService = {
  login: (data) => api.post("/auth/login", data),
  register: (data) => api.post("/auth/register", data),
  getMe: () => api.get("/auth/me"),
};

export const candidateService = {
  getAll: (params) => api.get("/candidates", { params }),
  getById: (id) => api.get(`/candidates/${id}`),
  create: (data) => api.post("/candidates", data),
  update: (id, data) => api.put(`/candidates/${id}`, data),
  delete: (id) => api.delete(`/candidates/${id}`),
  deleteBulk: (ids) => api.delete("/candidates/bulk", { data: { ids } }),
  getStats: () => api.get("/candidates/stats"),
};

export const jobService = {
  getAll: (params) => api.get("/jobs", { params }),
  getById: (id) => api.get(`/jobs/${id}`),
  create: (data) => api.post("/jobs", data),
  update: (id, data) => api.put(`/jobs/${id}`, data),
  delete: (id) => api.delete(`/jobs/${id}`),
  apply: (id, data) => api.post(`/jobs/${id}/apply`, data),
};
