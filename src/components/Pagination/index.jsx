import {
  MdOutlineKeyboardArrowLeft,
  MdOutlineKeyboardArrowRight,
} from 'react-icons/md';
import { PageButton } from '../../common/Button';
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

const Pagination = ({ pageNumber, page, setPage }) => {
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

  return (
    <Container>
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
          <PageButton disabled={page === 2} onClick={handleNextPage}>
            <MdOutlineKeyboardArrowRight />
          </PageButton>
        </li>
      </PageNumberList>
    </Container>
  );
};

export default Pagination;
