import React from 'react';

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  const renderPageNumbers = () => {
    const pages = [];
    const maxVisiblePages = 5; // 한 번에 보여줄 최대 페이지 수
    let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
    let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

    // startPage 조정
    if (endPage - startPage + 1 < maxVisiblePages) {
      startPage = Math.max(1, endPage - maxVisiblePages + 1);
    }

    // 이전 페이지 버튼
    pages.push(
      <button
        key="prev"
        className="nav-button"
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
      >
        &lt;
      </button>
    );

    // 첫 페이지
    if (startPage > 1) {
      pages.push(
        <button key={1} onClick={() => onPageChange(1)}>
          1
        </button>
      );
      if (startPage > 2) {
        pages.push(<span key="ellipsis1" className="ellipsis">...</span>);
      }
    }

    // 페이지 번호
    for (let i = startPage; i <= endPage; i++) {
      pages.push(
        <button
          key={i}
          className={currentPage === i ? 'active' : ''}
          onClick={() => onPageChange(i)}
        >
          {i}
        </button>
      );
    }

    // 마지막 페이지
    if (endPage < totalPages) {
      if (endPage < totalPages - 1) {
        pages.push(<span key="ellipsis2" className="ellipsis">...</span>);
      }
      pages.push(
        <button key={totalPages} onClick={() => onPageChange(totalPages)}>
          {totalPages}
        </button>
      );
    }

    // 다음 페이지 버튼
    pages.push(
      <button
        key="next"
        className="nav-button"
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
      >
        &gt;
      </button>
    );

    return pages;
  };

  return (
    <div className="pagination">
      {renderPageNumbers()}
    </div>
  );
};

export default Pagination;