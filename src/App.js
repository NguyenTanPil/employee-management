import { useState } from 'react';
import GirdLayout from './components/GirdLayout';
import Header from './components/Header';
import Home from './components/Pages/Home';
import GlobalStyles from './GlobalStyles';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import EmployeeDetail from './components/Pages/EmployeeDetail';
import Team from './components/Pages/Team';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';

// create client
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      staleTime: 1000 * 60,
      retry: false,
    },
  },
});

function App() {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <QueryClientProvider client={queryClient}>
      <GlobalStyles />
      <GirdLayout>
        <Router>
          <Header activeTab={activeTab} setActiveTab={setActiveTab} />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route exact path="/team" element={<Team />} />
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
  );
}

export default App;
