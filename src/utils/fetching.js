export const fetchEmployeeData = async () => {
  const res = await fetch('http://localhost:4000/employees');

  if (!res.ok) {
    throw new Error(res.statusText);
  }
  return res.json();
};

export const fetchEmployeeByTeamId = async ({ queryKey }) => {
  const res = await fetch(
    `http://localhost:4000/employees?team=${queryKey[1]}`
  );
  if (!res.ok) {
    throw new Error(res.statusText);
  }
  return res.json();
};

export const fetchEmployeeById = async ({ queryKey }) => {
  const res = await fetch(`http://localhost:4000/employees/${queryKey[1]}`);
  if (!res.ok) {
    throw new Error(res.statusText);
  }
  return res.json();
};

export const addNewEmployee = async (newEmployee) => {
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

export const fetchTeamData = async () => {
  const res = await fetch(`http://localhost:4000/teams`);
  if (!res.ok) {
    throw new Error(res.statusText);
  }
  return res.json();
};
