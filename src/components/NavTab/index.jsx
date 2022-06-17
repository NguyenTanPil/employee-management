import { NavButton } from '../../common/Button';
import { Container, NavTabItem } from './NavTabStyles';

const NavTab = ({ tabsNames, activeTab, setActiveTab }) => {
  return (
    <Container>
      {tabsNames.map((tabName, idx) => (
        <NavTabItem key={tabName + idx}>
          <NavButton
            isActive={activeTab === idx}
            onClick={() => setActiveTab(idx)}
          >
            {tabName}
          </NavButton>
        </NavTabItem>
      ))}
    </Container>
  );
};

export default NavTab;
