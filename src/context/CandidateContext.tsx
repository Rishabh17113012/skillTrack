
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { toast } from 'sonner';

export interface Project {
  id: string;
  name: string;
}

export interface Candidate {
  id: string;
  name: string;
  skills: string[];
  projects: Project[];
  domain: string;
  profileStrength: number;
}

interface CandidateContextType {
  candidates: Candidate[];
  loading: boolean;
  error: string | null;
  addCandidate: (candidate: Omit<Candidate, 'id' | 'profileStrength'>) => void;
  updateCandidate: (candidate: Candidate) => void;
  getCandidates: () => void;
  searchCandidatesBySkill: (skill: string) => void;
  filteredCandidates: Candidate[];
}

const CandidateContext = createContext<CandidateContextType | undefined>(undefined);

// Mock API functions (would connect to real backend)
const mockApi = {
  getCandidates: (): Promise<Candidate[]> => {
    return new Promise((resolve) => {
      const storedCandidates = localStorage.getItem('candidates');
      const candidates = storedCandidates ? JSON.parse(storedCandidates) : [];
      setTimeout(() => resolve(candidates), 300); // Simulate network delay
    });
  },
  
  addCandidate: (candidate: Omit<Candidate, 'id' | 'profileStrength'>): Promise<Candidate> => {
    return new Promise((resolve) => {
      const id = Date.now().toString();
      const profileStrength = candidate.skills.length + candidate.projects.length;
      const newCandidate = { ...candidate, id, profileStrength };
      
      // Get existing candidates
      const storedCandidates = localStorage.getItem('candidates');
      const candidates = storedCandidates ? JSON.parse(storedCandidates) : [];
      
      // Add new candidate and store
      candidates.push(newCandidate);
      localStorage.setItem('candidates', JSON.stringify(candidates));
      
      setTimeout(() => resolve(newCandidate), 300); // Simulate network delay
    });
  },
  
  updateCandidate: (updatedCandidate: Candidate): Promise<Candidate> => {
    return new Promise((resolve) => {
      // Get existing candidates
      const storedCandidates = localStorage.getItem('candidates');
      const candidates: Candidate[] = storedCandidates ? JSON.parse(storedCandidates) : [];
      
      // Update the candidate
      const updatedCandidates = candidates.map(candidate => 
        candidate.id === updatedCandidate.id ? updatedCandidate : candidate
      );
      
      // Store updated candidates
      localStorage.setItem('candidates', JSON.stringify(updatedCandidates));
      
      setTimeout(() => resolve(updatedCandidate), 300); // Simulate network delay
    });
  },
  
  searchCandidatesBySkill: (skill: string): Promise<Candidate[]> => {
    return new Promise((resolve) => {
      const storedCandidates = localStorage.getItem('candidates');
      const candidates: Candidate[] = storedCandidates ? JSON.parse(storedCandidates) : [];
      
      if (!skill) {
        resolve(candidates);
        return;
      }
      
      const filtered = candidates.filter((candidate) => 
        candidate.skills.some((s) => 
          s.toLowerCase().includes(skill.toLowerCase())
        )
      );
      
      setTimeout(() => resolve(filtered), 300);
    });
  }
};

export const CandidateProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [candidates, setCandidates] = useState<Candidate[]>([]);
  const [filteredCandidates, setFilteredCandidates] = useState<Candidate[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const getCandidates = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await mockApi.getCandidates();
      setCandidates(data);
      setFilteredCandidates(data);
    } catch (err) {
      console.error('Error fetching candidates:', err);
      setError('Failed to fetch candidates');
      toast.error('Failed to fetch candidates');
    } finally {
      setLoading(false);
    }
  };

  const addCandidate = async (candidateData: Omit<Candidate, 'id' | 'profileStrength'>) => {
    try {
      setLoading(true);
      setError(null);
      const newCandidate = await mockApi.addCandidate(candidateData);
      setCandidates((prev) => [...prev, newCandidate]);
      setFilteredCandidates((prev) => [...prev, newCandidate]);
      toast.success('Candidate added successfully!');
    } catch (err) {
      console.error('Error adding candidate:', err);
      setError('Failed to add candidate');
      toast.error('Failed to add candidate');
    } finally {
      setLoading(false);
    }
  };

  const updateCandidate = async (updatedCandidate: Candidate) => {
    try {
      setLoading(true);
      setError(null);
      const result = await mockApi.updateCandidate(updatedCandidate);
      
      // Update candidates in state
      setCandidates(prev => 
        prev.map(candidate => 
          candidate.id === result.id ? result : candidate
        )
      );
      
      // Update filtered candidates as well
      setFilteredCandidates(prev => 
        prev.map(candidate => 
          candidate.id === result.id ? result : candidate
        )
      );
      
      toast.success('Candidate updated successfully!');
    } catch (err) {
      console.error('Error updating candidate:', err);
      setError('Failed to update candidate');
      toast.error('Failed to update candidate');
      throw err; // Rethrow to handle in component
    } finally {
      setLoading(false);
    }
  };

  const searchCandidatesBySkill = async (skill: string) => {
    try {
      setLoading(true);
      setError(null);
      const filtered = await mockApi.searchCandidatesBySkill(skill);
      setFilteredCandidates(filtered);
    } catch (err) {
      console.error('Error searching candidates:', err);
      setError('Failed to search candidates');
      toast.error('Failed to search candidates');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getCandidates();
  }, []);

  return (
    <CandidateContext.Provider
      value={{
        candidates,
        loading,
        error,
        addCandidate,
        updateCandidate,
        getCandidates,
        searchCandidatesBySkill,
        filteredCandidates
      }}
    >
      {children}
    </CandidateContext.Provider>
  );
};

export const useCandidates = () => {
  const context = useContext(CandidateContext);
  if (context === undefined) {
    throw new Error('useCandidates must be used within a CandidateProvider');
  }
  return context;
};
