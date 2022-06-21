// GET all employee
export const fetchEmployeeData = async ({ pageParam = 1, limit = 3 }) => {
  const res = await fetch(
    `http://localhost:4000/employees?_page=${pageParam}&_limit=${limit}&deleted=false`
  );

  if (!res.ok) {
    throw new Error(res.statusText);
  }

  const data = await res.json();

  return {
    data,
    total: res.headers.get('X-Total-Count'),
  };
};

// GET employee by team id
export const fetchEmployeeByTeamId = async ({ queryKey }) => {
  const res = await fetch(
    `http://localhost:4000/employees?team=${queryKey[1]}`
  );

  if (!res.ok) {
    throw new Error(res.statusText);
  }

  return res.json();
};

// GET employee by id
export const fetchEmployeeById = async ({ queryKey }) => {
  const res = await fetch(`http://localhost:4000/employees/${queryKey[1]}`);

  if (!res.ok) {
    throw new Error(res.statusText);
  }

  return res.json();
};

// POST create new employee
export const createNewEmployee = async (newEmployee) => {
  const res = await fetch(`http://localhost:4000/employees`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(newEmployee),
  });

  if (!res.ok) {
    throw new Error(res.statusText);
  }

  return res.json();
};

// PATCH update employee by id
export const deleteEmployee = async (employeeId) => {
  const res = await fetch(`http://localhost:4000/employees/${employeeId}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      deleted: true,
    }),
  });

  if (!res.ok) {
    throw new Error(res.statusText);
  }

  return res.json();
};

// PUT update employee by new employee
export const updateEmployee = async (employee) => {
  const res = await fetch(`http://localhost:4000/employees/${employee.id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(employee),
  });

  if (!res.ok) {
    throw new Error(res.statusText);
  }

  return res.json();
};
