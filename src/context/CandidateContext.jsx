import { createContext, useContext, useState, useCallback } from "react";
import { candidateService } from "../services/services";

const CandidateContext = createContext(null);

export const CandidateProvider = ({ children }) => {
  const [candidates, setCandidates] = useState([]);
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchCandidates = useCallback(async (params = {}) => {
    setLoading(true);
    setError(null);
    try {
      const res = await candidateService.getAll(params);
      setCandidates(res.data);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to fetch candidates");
    } finally {
      setLoading(false);
    }
  }, []);

  const fetchStats = useCallback(async () => {
    try {
      const res = await candidateService.getStats();
      setStats(res.data);
    } catch (err) {
      console.error("Stats fetch failed:", err);
    }
  }, []);

  const addCandidate = async (data) => {
    const res = await candidateService.create(data);
    setCandidates((prev) => [res.data, ...prev]);
    await fetchStats();
    return res.data;
  };

  const updateCandidate = async (id, data) => {
    const res = await candidateService.update(id, data);
    setCandidates((prev) => prev.map((c) => (c._id === id ? res.data : c)));
    await fetchStats();
    return res.data;
  };

  const deleteCandidate = async (id) => {
    await candidateService.delete(id);
    setCandidates((prev) => prev.filter((c) => c._id !== id));
    await fetchStats();
  };

  const deleteBulk = async (ids) => {
    await candidateService.deleteBulk(ids);
    setCandidates((prev) => prev.filter((c) => !ids.includes(c._id)));
    await fetchStats();
  };

  return (
    <CandidateContext.Provider
      value={{ candidates, stats, loading, error, fetchCandidates, fetchStats, addCandidate, updateCandidate, deleteCandidate, deleteBulk }}
    >
      {children}
    </CandidateContext.Provider>
  );
};

export const useCandidates = () => {
  const ctx = useContext(CandidateContext);
  if (!ctx) throw new Error("useCandidates must be used within CandidateProvider");
  return ctx;
};
