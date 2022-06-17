import logo from '../../assets/images/logo.png';
import { LinkButton } from '../../common/Button';
import { Container, Logo, Menu } from './HeaderStyles';

const Header = () => {
  return (
    <Container>
      <Logo to="/employee">
        <img src={logo} alt="logo" />
        <span>Employee Manager</span>
      </Logo>
      <Menu>
        <LinkButton to="/employee">employee</LinkButton>
        <LinkButton to="/team">team</LinkButton>
      </Menu>
    </Container>
  );
};

export default Header;
