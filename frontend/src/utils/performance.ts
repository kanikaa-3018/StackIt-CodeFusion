
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { APP_CONFIG } from '@/config/constants';

// Debounce hook for search optimization
export const useDebounce = <T>(value: T, delay: number = APP_CONFIG.DEBOUNCE_DELAY): T => {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
};

// Cache utility for expensive operations
class Cache<T> {
  private cache = new Map<string, { data: T; timestamp: number }>();
  private readonly maxAge: number;

  constructor(maxAge: number = APP_CONFIG.CACHE_DURATION) {
    this.maxAge = maxAge;
  }

  set(key: string, data: T): void {
    this.cache.set(key, { data, timestamp: Date.now() });
  }

  get(key: string): T | null {
    const entry = this.cache.get(key);
    if (!entry) return null;

    if (Date.now() - entry.timestamp > this.maxAge) {
      this.cache.delete(key);
      return null;
    }

    return entry.data;
  }

  clear(): void {
    this.cache.clear();
  }

  has(key: string): boolean {
    const entry = this.cache.get(key);
    if (!entry) return false;

    if (Date.now() - entry.timestamp > this.maxAge) {
      this.cache.delete(key);
      return false;
    }

    return true;
  }
}

// Global cache instances
export const questionsCache = new Cache<any[]>();
export const questionCache = new Cache<any>();

// Memoization hook for expensive calculations
export const useMemoizedValue = <T>(factory: () => T, deps: React.DependencyList): T => {
  return useMemo(factory, deps);
};

// Optimized pagination hook
export const usePagination = (totalItems: number, itemsPerPage: number = APP_CONFIG.QUESTIONS_PER_PAGE) => {
  const [currentPage, setCurrentPage] = useState(1);
  
  const totalPages = useMemoizedValue(
    () => Math.ceil(totalItems / itemsPerPage),
    [totalItems, itemsPerPage]
  );

  const startIndex = useMemoizedValue(
    () => (currentPage - 1) * itemsPerPage,
    [currentPage, itemsPerPage]
  );

  const endIndex = useMemoizedValue(
    () => Math.min(startIndex + itemsPerPage, totalItems),
    [startIndex, itemsPerPage, totalItems]
  );

  const goToPage = useCallback((page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  }, [totalPages]);

  const goToNext = useCallback(() => {
    goToPage(currentPage + 1);
  }, [currentPage, goToPage]);

  const goToPrevious = useCallback(() => {
    goToPage(currentPage - 1);
  }, [currentPage, goToPage]);

  return {
    currentPage,
    totalPages,
    startIndex,
    endIndex,
    goToPage,
    goToNext,
    goToPrevious,
    hasNext: currentPage < totalPages,
    hasPrevious: currentPage > 1
  };
};

// Intersection Observer hook for lazy loading
export const useIntersectionObserver = (
  callback: () => void,
  options: IntersectionObserverInit = {}
) => {
  const targetRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const target = targetRef.current;
    if (!target) return;

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        callback();
      }
    }, options);

    observer.observe(target);

    return () => {
      observer.unobserve(target);
    };
  }, [callback, options]);

  return targetRef;
};

// Performance monitoring
export const measurePerformance = (name: string) => {
  const start = performance.now();
  
  return {
    end: () => {
      const duration = performance.now() - start;
      console.log(`Performance: ${name} took ${duration.toFixed(2)}ms`);
      return duration;
    }
  };
};

// Virtual scrolling utility for large lists
export const useVirtualScrolling = (
  items: any[],
  itemHeight: number,
  containerHeight: number
) => {
  const [scrollTop, setScrollTop] = useState(0);
  
  const visibleStart = useMemoizedValue(
    () => Math.floor(scrollTop / itemHeight),
    [scrollTop, itemHeight]
  );

  const visibleEnd = useMemoizedValue(
    () => Math.min(visibleStart + Math.ceil(containerHeight / itemHeight) + 1, items.length),
    [visibleStart, containerHeight, itemHeight, items.length]
  );

  const visibleItems = useMemoizedValue(
    () => items.slice(visibleStart, visibleEnd),
    [items, visibleStart, visibleEnd]
  );

  const totalHeight = items.length * itemHeight;
  const offsetY = visibleStart * itemHeight;

  return {
    visibleItems,
    totalHeight,
    offsetY,
    setScrollTop
  };
};
