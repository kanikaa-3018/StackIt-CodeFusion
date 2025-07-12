
import React from 'react';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight, MoreHorizontal } from 'lucide-react';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  showFirstLast?: boolean;
  maxVisiblePages?: number;
  className?: string;
}

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
  showFirstLast = true,
  maxVisiblePages = 5,
  className = ""
}) => {
  if (totalPages <= 1) return null;

  const getVisiblePages = () => {
    const pages: (number | string)[] = [];
    const halfVisible = Math.floor(maxVisiblePages / 2);
    
    let start = Math.max(1, currentPage - halfVisible);
    let end = Math.min(totalPages, currentPage + halfVisible);
    
    // Adjust if we're near the beginning or end
    if (end - start + 1 < maxVisiblePages) {
      if (start === 1) {
        end = Math.min(totalPages, start + maxVisiblePages - 1);
      } else {
        start = Math.max(1, end - maxVisiblePages + 1);
      }
    }
    
    // Add first page and ellipsis if needed
    if (start > 1) {
      pages.push(1);
      if (start > 2) {
        pages.push('...');
      }
    }
    
    // Add visible pages
    for (let i = start; i <= end; i++) {
      pages.push(i);
    }
    
    // Add ellipsis and last page if needed
    if (end < totalPages) {
      if (end < totalPages - 1) {
        pages.push('...');
      }
      pages.push(totalPages);
    }
    
    return pages;
  };

  const visiblePages = getVisiblePages();

  return (
    <div className={`flex items-center justify-center space-x-1 ${className}`}>
      {/* Previous button */}
      <Button
        variant="outline"
        size="sm"
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="h-8 w-8 p-0"
      >
        <ChevronLeft className="h-4 w-4" />
      </Button>

      {/* First page button (if not showing first/last) */}
      {!showFirstLast && currentPage > 3 && (
        <>
          <Button
            variant="outline"
            size="sm"
            onClick={() => onPageChange(1)}
            className="h-8 w-8 p-0"
          >
            1
          </Button>
          {currentPage > 4 && (
            <div className="flex items-center justify-center h-8 w-8">
              <MoreHorizontal className="h-4 w-4 text-muted-foreground" />
            </div>
          )}
        </>
      )}

      {/* Page buttons */}
      {visiblePages.map((page, index) => (
        <React.Fragment key={index}>
          {page === '...' ? (
            <div className="flex items-center justify-center h-8 w-8">
              <MoreHorizontal className="h-4 w-4 text-muted-foreground" />
            </div>
          ) : (
            <Button
              variant={currentPage === page ? "default" : "outline"}
              size="sm"
              onClick={() => onPageChange(page as number)}
              className="h-8 w-8 p-0"
            >
              {page}
            </Button>
          )}
        </React.Fragment>
      ))}

      {/* Last page button (if not showing first/last) */}
      {!showFirstLast && currentPage < totalPages - 2 && (
        <>
          {currentPage < totalPages - 3 && (
            <div className="flex items-center justify-center h-8 w-8">
              <MoreHorizontal className="h-4 w-4 text-muted-foreground" />
            </div>
          )}
          <Button
            variant="outline"
            size="sm"
            onClick={() => onPageChange(totalPages)}
            className="h-8 w-8 p-0"
          >
            {totalPages}
          </Button>
        </>
      )}

      {/* Next button */}
      <Button
        variant="outline"
        size="sm"
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="h-8 w-8 p-0"
      >
        <ChevronRight className="h-4 w-4" />
      </Button>
    </div>
  );
};

export default Pagination;
