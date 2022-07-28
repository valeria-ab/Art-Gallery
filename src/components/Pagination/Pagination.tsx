import { useDispatch, useSelector } from 'react-redux';
import React, { useMemo, useState } from 'react';
import classnames from 'classnames';
import { AppDispatch, IAppStore } from '../../store/store';
import { AuthorPaintingsType } from '../../utils/api';

// type PaginationPropsType = {
//   setCurrentPage: (value: number) => void;
//   currentPagesPortion: number;
//   setCurrentPagesPortion: (value: number) => void;
// }
// export const Pagination = ({
//   setCurrentPage,
//   setCurrentPagesPortion,
//   currentPagesPortion,
// }: PaginationPropsType) => {
//   const dispatch = useDispatch<AppDispatch>();
//   // const [currentPage, setCurrentPage] = useState(1);
//   const [portion, setPortion] = useState(1);
//   const artworks = useSelector<IAppStore, Array<AuthorPaintingsType>>(
//     (state) => state.artistPage.artistInfo.paintings,
//   );
//   const artworksPortionSize = useSelector<IAppStore, number>(
//     (state) => state.artistPage.artworksPortionSize,
//   );
//   // const artworksCurrentPage = useSelector<IAppStore, number>(
//   //   (state) => state.artistPage.artworksCurrentPage,
//   // );
//   const pagesCount = useSelector<IAppStore, number>(
//     (state) => state.artistPage.artworksTotalPagesCount,
//   );
//
//   const pages = [];
//   for (let i = 1; i <= pagesCount; i += 1) {
//     pages.push(i);
//   }
//   const portionSize = 3; // по 3 страниц показывать до точек
//   const portionCount = Math.ceil(pagesCount / portionSize); // сколько всего pagination кнопок
//
//   // const [portion, setPortion] = useState(Math.ceil(artworksCurrentPage / portionSize));
//
//   const leftNumber = (portion - 1) * portionSize + 1;
//   const rightNumber = portion * portionSize;
//
//   const onFirstPageClick = () => {
//     setCurrentPagesPortion(1);
//     setPortion(1);
//   };
//
//   const onLastPageClick = () => {
//     setCurrentPagesPortion(pagesCount);
//     setPortion(portionCount);
//   };
//
//   return (
//     <div style={{ display: 'flex' }}>
//       {
//               portion === 1 && <button type="button" disabled>&lt;</button>
//           }
//       {portion > 1
//           && (
//           <button
//             type="button"
//             onClick={() => {
//               // dispatch(setArtworksCurrentPage({
//               //   artworksCurrentPage: (portionSize * (portion - 2)) + 1,
//               // }));
//
//               setPortion(portion - 1);
//             }}
//           >
//             &lt;
//           </button>
//           )}
//       <div
//         onClick={onFirstPageClick}
//         onKeyDown={() => {
//           console.log('keyboard listener');
//         }}
//         role="button"
//         tabIndex={-1}
//       >
//         1
//       </div>
//       {/* first page click */}
//       <div>...</div>
//       {/* </> */}
//       {/* )} */}
//
//       {pages
//         .filter((p) => (p ? p >= leftNumber && p <= rightNumber : ''))
//         .map((q) => (
//           <div
//             onKeyDown={() => {
//               console.log('keyboard listener');
//             }}
//             role="button"
//             tabIndex={-1}
//             key={q}
//             onClick={() => {
//               // dispatch(setArtworksCurrentPage({
//               //   artworksCurrentPage: (portionSize * (portion - 2)) + 1,
//               // }));
//               setCurrentPagesPortion(q);
//             }}
//           >
//             {q}
//           </div>
//         ))}
//       {currentPagesPortion !== portionCount
//               && (
//               <>
//                 <div>...</div>
//                 <div
//                   onKeyDown={() => {
//                     console.log('keyboard listener');
//                   }}
//                   role="button"
//                   tabIndex={-1}
//                   onClick={onLastPageClick}
//                 >
//                   {pagesCount}
//                 </div>
//                 {/* last page click */}
//               </>
//               )}
//       {portionCount > portion
//               && (
//               <button
//                 type="button"
//                 disabled={portion === portionCount}
//                 onClick={() => {
//                   setPortion(portion + 1);
//                   setCurrentPage(portionSize * portion + 1);
//                 }}
//               >
//                 &gt;
//               </button>
//               )}
//     </div>
//   );
// };

type PaginationPropsType = {
  onPageChange: (page: number) => void;
  totalCount: number;
  siblingCount: number;
  currentPage: number;
  pageSize: number;
  className: number;
}

const DOTS = '...';

const Pagination = (props: PaginationPropsType) => {
  const {
    onPageChange,
    totalCount,
    siblingCount = 1,
    currentPage,
    pageSize,
    className,
  } = props;

  const paginationRange = usePagination({
    currentPage,
    totalCount,
    siblingCount,
    pageSize,
  });

  // If there are less than 2 times in pagination range we shall not render the component
  if (currentPage === 0 || (paginationRange && paginationRange.length < 2)) {
    return null;
  }

  const onNext = () => {
    onPageChange(currentPage + 1);
  };

  const onPrevious = () => {
    onPageChange(currentPage - 1);
  };

  const lastPage = paginationRange && paginationRange[paginationRange.length - 1];
  return (
    <ul
      className={classnames('pagination-container', { [className]: className })}
    >
      {/* Left navigation arrow */}
      <li
        className={classnames('pagination-item', {
          disabled: currentPage === 1,
        })}
        onClick={onPrevious}
      >
        <div className="arrow left" />
      </li>
      {paginationRange && paginationRange.map((pageNumber) => {
        // If the pageItem is a DOT, render the DOTS unicode character
        if (pageNumber === DOTS) {
          return <li className="pagination-item dots">&#8230;</li>;
        }

        // Render our Page Pills
        return (
          <li
            className={classnames('pagination-item', {
              selected: pageNumber === currentPage,
            })}
            onClick={() => onPageChange(pageNumber)}
          >
            {pageNumber}
          </li>
        );
      })}
      {/*  Right Navigation arrow */}
      <li
        className={classnames('pagination-item', {
          disabled: currentPage === lastPage,
        })}
        onClick={onNext}
      >
        <div className="arrow right" />
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
    const totalPageCount = Math.ceil(totalCount / pageSize);
    const range = (start: number, end: number) => {
      const length = end - start + 1;
      /*
          Create an array of certain length and set the elements within it from
        start value to end value.
      */
      return Array.from({ length }, (_, idx) => idx + start);
    };

    // Pages count is determined as siblingCount + firstPage + lastPage + currentPage + 2*DOTS
    const totalPageNumbers = siblingCount + 5;

    /*
      Case 1:
      If the number of pages is less than the page numbers we want to show in our
      paginationComponent, we return the range [1..totalPageCount]
    */
    if (totalPageNumbers >= totalPageCount) {
      return range(1, totalPageCount);
    }

    // Calculate left and right sibling index and make sure they are within
    // range 1 and totalPageCount

    const leftSiblingIndex = Math.max(currentPage - siblingCount, 1);
    const rightSiblingIndex = Math.min(
      currentPage + siblingCount,
      totalPageCount,
    );

    /*
      We do not show dots just when there is just one page number to
      be inserted between the extremes of sibling and the page limits i.e 1 and totalPageCount.
       Hence we are using leftSiblingIndex > 2 and rightSiblingIndex < totalPageCount - 2
    */
    const shouldShowLeftDots = leftSiblingIndex > 2;
    const shouldShowRightDots = rightSiblingIndex < totalPageCount - 2;

    const firstPageIndex = 1;
    const lastPageIndex = totalPageCount;

    if (!shouldShowLeftDots && shouldShowRightDots) {
      const leftItemCount = 3 + 2 * siblingCount;
      const leftRange = range(1, leftItemCount);

      return [...leftRange, DOTS, totalPageCount];
    }

    if (shouldShowLeftDots && !shouldShowRightDots) {
      const rightItemCount = 3 + 2 * siblingCount;
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
