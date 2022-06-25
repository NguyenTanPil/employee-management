import { useEffect, useState } from 'react';
import {
  MdOutlineKeyboardArrowLeft,
  MdOutlineKeyboardArrowRight,
} from 'react-icons/md';
import { TbRefresh } from 'react-icons/tb';
import { useSnapshot } from 'valtio';
import { onChangeEmployeePerPage } from '../../app/actions';
import { store } from '../../app/store';
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

const Pagination = ({ pageNumber, maxEmployeePerPage, page, setPage }) => {
  const { employeePerPage, searchContent } = useSnapshot(store);

  const [pageLimit, setPageLimit] = useState(employeePerPage);

  const handlePrevPage = (e) => {
    handleButtonEffect(e);
    setPage((prev) => Math.max(prev - 1, 1));
  };

  const handleNextPage = (e) => {
    handleButtonEffect(e);
    setPage((prev) => prev + 1);
  };

  const handleClickPage = (e, p) => {
    handleButtonEffect(e);
    setPage(p);
  };

  const handleChangeEmployeePerPage = (e) => {
    const pageInput = parseInt(e.target.value);

    if (pageInput <= 0 || isNaN(pageInput)) {
      setPageLimit(1);
    } else if (pageInput > parseInt(maxEmployeePerPage)) {
      setPageLimit(parseInt(maxEmployeePerPage));
    } else {
      setPageLimit(pageInput);
    }
  };

  useEffect(() => {
    if (searchContent) {
      setPageLimit(
        maxEmployeePerPage > employeePerPage
          ? employeePerPage
          : maxEmployeePerPage,
      );
    } else {
      setPageLimit(parseInt(employeePerPage));
    }
  }, [maxEmployeePerPage]);

  return (
    <>
      {pageNumber > 0 && (
        <Container>
          <PageNumberList>
            <li>
              <SquareInput
                type="number"
                value={pageLimit}
                onChange={handleChangeEmployeePerPage}
              />
            </li>
            <li>
              <PageButton onClick={() => onChangeEmployeePerPage(pageLimit)}>
                <TbRefresh />
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
