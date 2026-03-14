import React, { createContext, useContext, useState, useEffect } from 'react';
import { ALL_NEWS, ALL_CASES } from '../data/content';
import { fetchNewsList, fetchCasesList } from '../data/contentApi';

const ContentContext = createContext({
  news: ALL_NEWS,
  cases: ALL_CASES,
  loading: false,
});

export function ContentProvider({ children }) {
  const [news, setNews] = useState(ALL_NEWS);
  const [cases, setCases] = useState(ALL_CASES);
  const [loading, setLoading] = useState(true);

  function refetch() {
    Promise.all([fetchNewsList(), fetchCasesList()]).then(([n, c]) => {
      setNews(n);
      setCases(c);
    });
  }

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    Promise.all([fetchNewsList(), fetchCasesList()]).then(([n, c]) => {
      if (!cancelled) {
        setNews(n);
        setCases(c);
      }
    }).finally(() => {
      if (!cancelled) setLoading(false);
    });
    return () => { cancelled = true; };
  }, []);

  useEffect(() => {
    window.addEventListener('focus', refetch);
    return () => window.removeEventListener('focus', refetch);
  }, []);

  return (
    <ContentContext.Provider value={{ news, cases, loading }}>
      {children}
    </ContentContext.Provider>
  );
}

export function useContent() {
  return useContext(ContentContext);
}
