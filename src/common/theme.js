const theme = {
  light: {
    backgroundColor: '#ffffff',
    borderColor: '#e3e8ec',
    buttonBackgroundColor: '#00BBF0',
    errorColor: '#f55d7a',
    fontColor: '#536471',
    hoverColor: '#005792',
    selectBackgroundColor: '#f3f3f3',
    successColor: '#0fb56d',
    titleColor: '#363940',
    pageButtonColor: '#00000040',
    warningColor: '#FDDB3A',
  },
  dark: {
    backgroundColor: '#15202b',
    borderColor: '#373b3d',
    buttonBackgroundColor: '#00BBF0',
    errorColor: '#f55d7a',
    fontColor: '#8899a6',
    hoverColor: '#005792',
    selectBackgroundColor: '#181a1b',
    successColor: '#0fb56d',
    titleColor: '#ffffff',
    pageButtonColor: '#ffffff40',
    warningColor: '#FDDB3A',
  },
};

export const getTheme = (themeName) => {
  return theme[themeName];
};
