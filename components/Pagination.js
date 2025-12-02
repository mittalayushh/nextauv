import { IconChevronLeft, IconChevronRight } from "@tabler/icons-react";

export default function Pagination({ currentPage, totalPages, onPageChange }) {
  const pages = [];

  // Simple logic to show range of pages
  // For a more complex "Google-style" with ellipsis (1 ... 4 5 6 ... 10), we can add logic here.
  // Let's implement a smart range: always show first, last, and current +/- 2.

  const range = (start, end) => {
    let length = end - start + 1;
    return Array.from({ length }, (_, idx) => idx + start);
  };

  if (totalPages <= 7) {
    pages.push(...range(1, totalPages));
  } else {
    // Always show first page
    pages.push(1);

    if (currentPage > 3) {
      pages.push("...");
    }

    // Show current and neighbors
    let start = Math.max(2, currentPage - 1);
    let end = Math.min(totalPages - 1, currentPage + 1);

    // Adjust if near start
    if (currentPage <= 3) {
      end = 4;
    }
    // Adjust if near end
    if (currentPage >= totalPages - 2) {
      start = totalPages - 3;
    }

    pages.push(...range(start, end));

    if (currentPage < totalPages - 2) {
      pages.push("...");
    }

    // Always show last page
    pages.push(totalPages);
  }

  return (
    <div className="flex items-center justify-center gap-2 mt-8">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="p-2 rounded-full hover:bg-gray-800 text-gray-400 disabled:opacity-30 disabled:hover:bg-transparent transition"
      >
        <IconChevronLeft size={20} />
      </button>

      {pages.map((page, index) => (
        <button
          key={index}
          onClick={() => typeof page === "number" ? onPageChange(page) : null}
          disabled={page === "..."}
          className={`w-8 h-8 flex items-center justify-center rounded-full text-sm font-medium transition
            ${page === currentPage
              ? "bg-indigo-600 text-white"
              : page === "..."
                ? "text-gray-500 cursor-default"
                : "text-gray-400 hover:bg-gray-800 hover:text-white"
            }`}
        >
          {page}
        </button>
      ))}

      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="p-2 rounded-full hover:bg-gray-800 text-gray-400 disabled:opacity-30 disabled:hover:bg-transparent transition"
      >
        <IconChevronRight size={20} />
      </button>
    </div>
  );
}
