import React from 'react';
import { usePagination } from './usePagination';
import { BsArrowLeft, BsArrowRight } from 'react-icons/bs'

const Pagination = props => {
  const {
    onPageChange,
    totalCount,
    siblingCount = 1,
    currentPage,
    pageSize,
  } = props;

  const paginationRange = usePagination({
    currentPage,
    totalCount,
    siblingCount,
    pageSize
  });

  if (currentPage === 0 || paginationRange.length < 2) {
    return null;
  }

  const onNext = () => {
    onPageChange(currentPage + 1);
  };

  const onPrevious = () => {
    onPageChange(currentPage - 1);
  };

  let lastPage = paginationRange[paginationRange.length - 1];
  return (
    <nav>
      <ul
        className='inline-flex items-center -space-x-px'
      > {currentPage === 0 || paginationRange.length < 2 ?
        <li onClick={onPrevious}>
          <button className="h-10 block px-3 py-2 ml-0 leading-tight text-gray-500 bg-white border border-gray-300 rounded-l-lg hover:bg-gray-100 hover:text-gray-700"
            disabled><BsArrowLeft /></button>
        </li>
        :
        <li onClick={onPrevious}>
          <button className="h-10 block px-3 py-2 ml-0 leading-tight text-gray-500 bg-white border border-gray-300 rounded-l-lg hover:bg-gray-100 hover:text-gray-700"
          ><BsArrowLeft /></button>
        </li>
        }
        {paginationRange.map(pageNumber => {
          if (pageNumber === currentPage) {
            return (
              <li onClick={() => onPageChange(pageNumber)} key={pageNumber}>
                <a
                  className='z-10 px-3 py-2 leading-tight text-blue-600 border border-blue-300 bg-blue-50 hover:bg-blue-100 hover:text-blue-700'
                >{pageNumber}</a>
              </li>
            )
          } else {
            return (
              <li onClick={() => onPageChange(pageNumber)} key={pageNumber}>
                <a
                  className='px-3 py-2 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700'
                >{pageNumber}</a>
              </li>
            )
          }
        })}
        {currentPage === lastPage ?
          <li onClick={onNext}>
            <button className="h-10 block px-3 py-2 leading-tight text-gray-500 bg-white border border-gray-300 rounded-r-lg hover:bg-gray-100 hover:text-gray-700"
            disabled><BsArrowRight /></button>
          </li>
          :
          <li onClick={onNext}>
            <button className="h-10 block px-3 py-2 leading-tight text-gray-500 bg-white border border-gray-300 rounded-r-lg hover:bg-gray-100 hover:text-gray-700"
            ><BsArrowRight /></button>
          </li>
        }
      </ul>
    </nav>
  );
};

export default Pagination;
