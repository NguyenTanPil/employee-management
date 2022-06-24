import logo from '../../assets/images/logo.png';
import { LinkButton, ThemeButton } from '../../common/Button';
import { setCookie } from '../../utils/cookie';
import { Container, Logo, Menu } from './HeaderStyles';

const Header = ({ theme, setTheme }) => {
  const handleSetTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setCookie({ name: 'theme', value: newTheme });
    setTheme(newTheme);
  };

  return (
    <Container>
      <Logo to="/employee">
        <img src={logo} alt="logo" />
        <span>Employee Manager</span>
      </Logo>
      <Menu>
        <ThemeButton active onClick={handleSetTheme}>
          {theme === 'light' ? '🌜' : '🌞'}
        </ThemeButton>
        <LinkButton to="/employee">employee</LinkButton>
        <LinkButton to="/team">team</LinkButton>
      </Menu>
    </Container>
  );
};

export default Header;
