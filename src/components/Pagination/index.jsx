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

const Pagination = () => {
  return (
    <Container>
      <PageNumberList>
        <li>
          <PageButton disabled onClick={(e) => handleButtonEffect(e)}>
            <MdOutlineKeyboardArrowLeft />
          </PageButton>
        </li>
        <li>
          <PageButton active onClick={(e) => handleButtonEffect(e)}>
            1
          </PageButton>
        </li>
        <li>
          <PageButton onClick={(e) => handleButtonEffect(e)}>2</PageButton>
        </li>
        <li>
          <PageButton onClick={(e) => handleButtonEffect(e)}>
            <MdOutlineKeyboardArrowRight />
          </PageButton>
        </li>
      </PageNumberList>
    </Container>
  );
};

export default Pagination;
