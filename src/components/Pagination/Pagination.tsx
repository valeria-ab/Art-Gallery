import React, { useContext, useMemo } from 'react';
import classNames from 'classnames/bind';
import style from './style.scss';
import { ThemeContext } from '../../contexts/ThemeContext';

const cx = classNames.bind(style);

type PaginationPropsType = {
    onPageChange: (page: number) => void;
    totalCount: number;
    siblingCount: number;
    currentPage: number;
    pageSize: number;
}

const DOTS = '...';

export const Pagination = (props: PaginationPropsType) => {
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
    pageSize,
  });
  const { theme, toggleTheme } = useContext(ThemeContext);

  const onNext = () => {
    onPageChange(currentPage + 1);
  };

  const onPrevious = () => {
    onPageChange(currentPage - 1);
  };

  const lastPage = paginationRange && paginationRange[paginationRange.length - 1];
  return (
    <ul
      style={{ display: 'flex' }}
      className={cx('pagination-container', {
        'pagination-container_light': theme === 'light',
        'pagination-container_dark': theme === 'dark',
      })}
    >
      <li
        className={cx('pagination-item', {
          disabled: currentPage === 1,
        })}
        onClick={onPrevious}
      >
        <div className={cx('arrow left', {
          arrow_dark: theme === 'dark',
          arrow_light: theme === 'light',
        })}
        />
      </li>
      {paginationRange && paginationRange.map((pageNumber) => {
        if (pageNumber === DOTS) {
          return <div className={cx('pagination-item dots')}>&#8230;</div>;
        }

        return (
          <li
            className={cx('pagination-item', {
              selected: pageNumber === currentPage,
              selected_light: theme === 'light',
              selected_dark: theme === 'dark',
            })}
            onClick={() => onPageChange(pageNumber)}
          >
            {pageNumber}
          </li>
        );
      })}
      <li
        className={cx('pagination-item', {
          disabled: currentPage === lastPage,
        })}
        onClick={onNext}
      >
        <div className={cx('arrow right')} />
      </li>
    </ul>
  );
};

type PropsType = {
    totalCount: number,
    pageSize: number,
    siblingCount: number,
    currentPage: number,
}
export const usePagination = ({
  totalCount,
  pageSize,
  siblingCount = 1,
  currentPage,
}: PropsType) => {
  const paginationRange = useMemo(() => {
    // const totalPageCount = Math.ceil(totalCount / pageSize);
    const totalPageCount = 9;

    const range = (start: number, end: number) => {
      const length = end - start + 1;

      return Array.from({ length }, (_, idx) => idx + start);
    };

    const totalPageNumbers = siblingCount + 5;

    if (totalPageNumbers >= totalPageCount) {
      return range(1, totalPageCount);
    }

    const leftSiblingIndex = Math.max(currentPage - siblingCount, 1);
    const rightSiblingIndex = Math.min(
      currentPage + siblingCount,
      totalPageCount,
    );

    const shouldShowLeftDots = leftSiblingIndex > 2;
    const shouldShowRightDots = rightSiblingIndex < totalPageCount - 2;

    const firstPageIndex = 1;
    const lastPageIndex = totalPageCount;

    if (!shouldShowLeftDots && shouldShowRightDots) {
      // const leftItemCount = 3 + 2 * siblingCount;
      const leftItemCount = 1 + 3 * siblingCount;
      const leftRange = range(1, leftItemCount);

      return [...leftRange, DOTS, totalPageCount];
    }

    if (shouldShowLeftDots && !shouldShowRightDots) {
      const rightItemCount = 1 + 3 * siblingCount;
      const rightRange = range(
        totalPageCount - rightItemCount + 1,
        totalPageCount,
      );
      return [firstPageIndex, DOTS, ...rightRange];
    }

    if (shouldShowLeftDots && shouldShowRightDots) {
      const middleRange = range(leftSiblingIndex, rightSiblingIndex);
      return [firstPageIndex, DOTS, ...middleRange, DOTS, lastPageIndex];
    }
  }, [totalCount, pageSize, siblingCount, currentPage]);

  return paginationRange;
};
