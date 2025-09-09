import { cn } from '@/lib/utils';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import Link from 'next/link';

interface BlogPaginationProps {
  currentPage: number;
  totalPages: number;
  basePath: string;
}

export function BlogPagination({
  currentPage,
  totalPages,
  basePath,
}: BlogPaginationProps) {
  if (totalPages <= 1) {
    return null;
  }

  const getPageHref = (page: number) => {
    if (page === 1) {
      return basePath;
    }
    return `${basePath}?page=${page}`;
  };

  const renderPageNumbers = () => {
    const pages = [];
    const maxVisible = 5;

    let startPage = Math.max(1, currentPage - Math.floor(maxVisible / 2));
    let endPage = Math.min(totalPages, startPage + maxVisible - 1);

    if (endPage - startPage < maxVisible - 1) {
      startPage = Math.max(1, endPage - maxVisible + 1);
    }

    // First page
    if (startPage > 1) {
      pages.push(
        <Link
          key={1}
          href={getPageHref(1)}
          className={pageButtonClass(1 === currentPage)}
        >
          1
        </Link>
      );
      if (startPage > 2) {
        pages.push(
          <span
            key="start-ellipsis"
            className="px-3 py-2 text-muted-foreground"
          >
            ...
          </span>
        );
      }
    }

    // Visible pages
    for (let page = startPage; page <= endPage; page++) {
      pages.push(
        <Link
          key={page}
          href={getPageHref(page)}
          className={pageButtonClass(page === currentPage)}
        >
          {page}
        </Link>
      );
    }

    // Last page
    if (endPage < totalPages) {
      if (endPage < totalPages - 1) {
        pages.push(
          <span key="end-ellipsis" className="px-3 py-2 text-muted-foreground">
            ...
          </span>
        );
      }
      pages.push(
        <Link
          key={totalPages}
          href={getPageHref(totalPages)}
          className={pageButtonClass(totalPages === currentPage)}
        >
          {totalPages}
        </Link>
      );
    }

    return pages;
  };

  const pageButtonClass = (isActive: boolean) =>
    cn(
      'px-3 py-2 text-sm border rounded-md transition-colors',
      isActive
        ? 'bg-primary text-primary-foreground border-primary'
        : 'bg-background hover:bg-muted border-border'
    );

  return (
    <nav
      className="flex items-center justify-center gap-2"
      aria-label="Pagination"
    >
      {/* Previous Page */}
      {currentPage > 1 && (
        <Link
          href={getPageHref(currentPage - 1)}
          className={cn(
            'px-3 py-2 text-sm border rounded-md transition-colors flex items-center gap-1',
            'bg-background hover:bg-muted border-border'
          )}
        >
          <ChevronLeft className="w-4 h-4" />
          Previous
        </Link>
      )}

      {/* Page Numbers */}
      <div className="flex items-center gap-1">{renderPageNumbers()}</div>

      {/* Next Page */}
      {currentPage < totalPages && (
        <Link
          href={getPageHref(currentPage + 1)}
          className={cn(
            'px-3 py-2 text-sm border rounded-md transition-colors flex items-center gap-1',
            'bg-background hover:bg-muted border-border'
          )}
        >
          Next
          <ChevronRight className="w-4 h-4" />
        </Link>
      )}
    </nav>
  );
}
