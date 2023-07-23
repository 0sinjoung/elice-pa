import React, { useState, useEffect } from "react";
import styles from "@/styles/Pagination.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleRight, faAngleLeft } from "@fortawesome/free-solid-svg-icons";

interface PaginationProps {
  totalCount: number;
  countPerPage: number; // 페이지당 보여줄 컨텐츠 갯수
  handleChangePage: (changedPage: number) => void;
}

export default function Pagination({
  totalCount,
  countPerPage,
  handleChangePage,
}: PaginationProps): JSX.Element {
  /* page */
  const totalPage = Math.ceil(totalCount / countPerPage) || 0;
  const [currentPage, setCurrentPage] = useState(1);

  const handleClickPageButton = (page: number): void => {
    setCurrentPage(page);
  };

  const handleClickArrow = (type: string): void => {
    if (type === "prev") {
      if (currentPage === 1) return;
      setCurrentPage((prev) => prev - 1);
    }
    if (type === "next") {
      if (currentPage === totalPage) return;
      setCurrentPage((prev) => prev + 1);
    }
  };

  useEffect(() => {
    handleChangePage(currentPage);
  }, [currentPage, handleChangePage]);

  if (totalCount === 0) return <div className="pagination"></div>;

  return (
    <div className={styles.pagination}>
      <button
        type="button"
        className={`${styles.prev} ${currentPage === 1 ? styles.disable : ""}`}
        onClick={() => handleClickArrow("prev")}
      >
        <FontAwesomeIcon icon={faAngleLeft} />
      </button>
      <ol className={styles.button_lists}>
        {[...Array(4)].map((x, i) => {
          const num = i + (currentPage - 4);
          if (num <= 0) return;
          return (
            <li className={styles.button_list} key={num}>
              <button
                type="button"
                onClick={() => handleClickPageButton(num)}
                className={`${styles.page_button} ${
                  currentPage === num ? styles.breadscrumb : ""
                }`}
              >
                {num}
              </button>
            </li>
          );
        })}
        {
          <li className={styles.button_list} key={currentPage}>
            <button
              type="button"
              onClick={() => handleClickPageButton(currentPage)}
              className={`${styles.page_button} ${
                currentPage === currentPage ? styles.breadscrumb : ""
              }`}
            >
              {currentPage}
            </button>
          </li>
        }
        {[...Array(4)].map((x, i) => {
          const num = currentPage + i + 1;
          if (num > totalPage) return;
          return (
            <li className={styles.button_list} key={num}>
              <button
                type="button"
                onClick={() => handleClickPageButton(num)}
                className={`${styles.page_button} ${
                  currentPage === num ? styles.breadscrumb : ""
                }`}
              >
                {num}
              </button>
            </li>
          );
        })}
      </ol>
      <button
        type="button"
        className={`${styles.prev} ${
          currentPage === totalPage ? styles.disable : ""
        }`}
        onClick={() => handleClickArrow("next")}
      >
        <FontAwesomeIcon icon={faAngleRight} />
      </button>
    </div>
  );
}
