import { useState } from 'react';

import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination';
import { Button } from '@/components/ui/button';

import { Input } from '@/components/ui/input';

interface EnhancedPaginationProps {
  currentPage: number;
  pageMax: number;
  pageNumbers: number[];
  onPageChange: (page: number) => void;
}

export function EnhancedPagination({ currentPage, pageMax, pageNumbers, onPageChange }: EnhancedPaginationProps) {
  const [jumpToPage, setJumpToPage] = useState<string>('');

  const handleJumpToPage = () => {
    const pageNumber = parseInt(jumpToPage);
    if (!isNaN(pageNumber) && pageNumber >= 1 && pageNumber <= pageMax) {
      onPageChange(pageNumber);
      setJumpToPage('');
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleJumpToPage();
    }
  };

  return (
    <div className="mb-4 flex flex-col items-center space-y-4">
      <div className="text-sm text-gray-500">
        第
        {' '}
        {currentPage}
        {' '}
        頁 / 共
        {' '}
        {pageMax}
        {' '}
        頁
      </div>

      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious
              onClick={() => onPageChange(currentPage > 1 ? currentPage - 1 : 1)}
              className={currentPage === 1 ? 'pointer-events-none opacity-50' : ''}
            />
          </PaginationItem>
          <PaginationItem>
            {pageNumbers[0] !== 1 && <PaginationEllipsis />}
          </PaginationItem>
          {pageNumbers.map((pageNumber: number) => (
            <PaginationItem key={pageNumber}>
              <PaginationLink
                onClick={() => onPageChange(pageNumber)}
                isActive={pageNumber === currentPage}
                className={pageNumber === currentPage
                  ? `
                    bg-sky-500 text-white
                    hover:bg-sky-600
                  `
                  : ''}
              >
                {pageNumber}
              </PaginationLink>
            </PaginationItem>
          ))}
          <PaginationItem>
            {currentPage <= pageNumbers[pageNumbers.length - 1] - 2 && pageNumbers[pageNumbers.length - 1] !== pageMax && (
              <PaginationEllipsis />
            )}
          </PaginationItem>
          <PaginationItem>
            <PaginationNext
              onClick={() => onPageChange(currentPage < pageMax ? currentPage + 1 : pageMax)}
              className={currentPage === pageMax
                ? `pointer-events-none opacity-50`
                : ''}
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>

      <div className="flex items-center space-x-2">
        <Input
          className="w-20"
          placeholder="頁碼"
          value={jumpToPage}
          onChange={(e) => setJumpToPage(e.target.value)}
          onKeyDown={handleKeyDown}
          type="number"
          min={1}
          max={pageMax}
        />
        <Button onClick={handleJumpToPage} size="sm">
          跳轉
        </Button>
      </div>
    </div>
  );
}
