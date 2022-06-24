import { useState } from 'react';
import {
  MdOutlineKeyboardArrowLeft,
  MdOutlineKeyboardArrowRight,
} from 'react-icons/md';
import { onChangeEmployeePerPage } from '../../app/actions';
import { PageButton } from '../../common/Button';
import { SquareInput } from '../../common/Input';
import { Container, PageNumberList } from './PaginationStyles';

const handleButtonEffect = (e) => {
  const button = e.currentTarget;

  const circle = document.createElement('span');
  const diameter = Math.max(button.clientWidth, button.clientHeight);
  const radius = diameter / 2;

  circle.style.width = circle.style.height = `${diameter}px`;
  circle.style.left = `${
    e.clientX - (button.getBoundingClientRect().left + radius)
  }px`;
  circle.style.top = `${
    e.clientY - (button.getBoundingClientRect().top + radius)
  }px`;

  button.appendChild(circle);

  setTimeout(() => {
    circle.remove();
  }, 1000);
};

const Pagination = ({
  pageNumber,
  maxEmployeePerPage,
  employeePerPage,
  page,
  setPage,
}) => {
  const handlePrevPage = (e) => {
    handleButtonEffect(e);
    setPage((prev) => Math.max(prev - 1, 1));
  };

  const handleNextPage = (e) => {
    handleButtonEffect(e);
    setPage((prev) => prev + 1);
  };

  const handleClickPage = (e, page) => {
    handleButtonEffect(e);
    setPage(page);
  };

  const handleNextEmployeePerPage = (e) => {
    handleButtonEffect(e);
    onChangeEmployeePerPage(parseInt(employeePerPage) + 1);
  };

  const handlePrevEmployeePerPage = (e) => {
    handleButtonEffect(e);
    onChangeEmployeePerPage(Math.max(parseInt(employeePerPage) - 1, 1));
  };

  const handleChangeEmployeePerPage = (e) => {
    const pageNumber = parseInt(e.target.value);

    if (pageNumber <= 0 || isNaN(pageNumber)) {
      onChangeEmployeePerPage(1);
    } else if (pageNumber > parseInt(maxEmployeePerPage)) {
      onChangeEmployeePerPage(parseInt(maxEmployeePerPage));
    } else {
      onChangeEmployeePerPage(pageNumber);
    }
  };

  return (
    <>
      {pageNumber > 0 && (
        <Container>
          <PageNumberList>
            <li>
              <PageButton
                disabled={employeePerPage === 1}
                onClick={handlePrevEmployeePerPage}
              >
                <MdOutlineKeyboardArrowLeft />
              </PageButton>
            </li>
            <li>
              <SquareInput
                type="number"
                value={employeePerPage}
                onChange={handleChangeEmployeePerPage}
              />
            </li>
            <li>
              <PageButton
                disabled={employeePerPage === parseInt(maxEmployeePerPage)}
                onClick={handleNextEmployeePerPage}
              >
                <MdOutlineKeyboardArrowRight />
              </PageButton>
            </li>
          </PageNumberList>
          <PageNumberList>
            <li>
              <PageButton disabled={page === 1} onClick={handlePrevPage}>
                <MdOutlineKeyboardArrowLeft />
              </PageButton>
            </li>
            {[...Array(pageNumber).keys()].map((number) => (
              <li key={number}>
                <PageButton
                  active={page === number + 1}
                  onClick={(e) => handleClickPage(e, number + 1)}
                >
                  {number + 1}
                </PageButton>
              </li>
            ))}

            <li>
              <PageButton
                disabled={page === pageNumber}
                onClick={handleNextPage}
              >
                <MdOutlineKeyboardArrowRight />
              </PageButton>
            </li>
          </PageNumberList>
        </Container>
      )}
    </>
  );
};

export default Pagination;
