import { useState, useCallback } from 'react';
import { policies } from '../data/policies';
import type { Policy } from '../data/policies';

export const usePolicySearch = () => {
    const [result, setResult] = useState<Policy | null>(null);
    const [results, setResults] = useState<Policy[] | null>(null);
    const [isSearching, setIsSearching] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const search = useCallback((searchQuery: string) => {
        setIsSearching(true);
        setError(null);
        setResults(null);

        // Simulate API delay
        setTimeout(() => {
            const q = searchQuery.toLowerCase();

            // Basic keyword matching for demo purposes
            const found = policies.find(p =>
                p.title.toLowerCase().includes(q) ||
                p.content.toLowerCase().includes(q) ||
                p.category.toLowerCase().includes(q)
            );

            if (found) {
                setResult(found);
            } else {
                setResult(null);
                setError("This information is not explicitly defined in current HR policy. Please contact HR for clarification.");
            }
            setIsSearching(false);
        }, 800);
    }, []);

    const searchByCategory = useCallback((category: string) => {
        setIsSearching(true);
        setError(null);
        setResult(null);

        setTimeout(() => {
            const found = policies.filter(p =>
                p.category.toLowerCase() === category.toLowerCase()
            );

            if (found.length > 0) {
                setResults(found);
            } else {
                setResults(null);
                setError(`No policies found under "${category}". Please contact HR for clarification.`);
            }
            setIsSearching(false);
        }, 500);
    }, []);

    const clearResults = useCallback(() => {
        setResult(null);
        setResults(null);
        setError(null);
    }, []);

    return { result, results, search, searchByCategory, isSearching, error, clearResults };
};
