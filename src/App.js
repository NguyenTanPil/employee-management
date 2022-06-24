import { useState } from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import { getTheme } from './common/theme';
import GirdLayout from './components/GirdLayout';
import Header from './components/Header';
import EmployeeDetail from './components/Pages/EmployeeDetail';
import Home from './components/Pages/Home';
import Team from './components/Pages/Team';
import GlobalStyles from './GlobalStyles';
import { getCookie } from './utils/cookie';

// create client
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      staleTime: 1000 * 30,
      retry: false,
    },
  },
});

function App() {
  const [theme, setTheme] = useState(() => {
    return getCookie('theme') || 'light';
  });

  return (
    <ThemeProvider theme={getTheme(theme)}>
      <QueryClientProvider client={queryClient}>
        <GlobalStyles />
        <GirdLayout>
          <Router>
            <Header theme={theme} setTheme={setTheme} />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route exact path="/team" element={<Team />} />
              <Route exact path="/team/:teamName" element={<Team />} />
              <Route path="/employee" element={<Home />} />
              <Route
                path="/employee/:page/:employeeId"
                element={<EmployeeDetail />}
              />
            </Routes>
          </Router>
        </GirdLayout>
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </ThemeProvider>
  );
}

export default App;
