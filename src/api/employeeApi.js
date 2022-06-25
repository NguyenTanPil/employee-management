// GET all employee
export const fetchEmployeeData = async ({
  pageParam = 1,
  limit = 3,
  searchContent = '',
  sortCondition,
}) => {
  const res = await fetch(
    `http://localhost:4000/employees?q=${searchContent}&_page=${pageParam}&_limit=${limit}&_sort=${sortCondition.name}&_order=${sortCondition.status}&deleted=false`,
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
export const fetchEmployeeByTeamId = async (teamName) => {
  const res = await fetch(
    `http://localhost:4000/employees?team=${teamName}&deleted=false`,
  );

  if (!res.ok) {
    throw new Error(res.statusText);
  }

  return res.json();
};

// GET employee by id
export const fetchEmployeeById = async (employeeId) => {
  const res = await fetch(`http://localhost:4000/employees/${employeeId}`);

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

// PATCH update many employee by employee id list
export const deleteEmployeeBySelected = async (employeeIdList) => {
  const promiseList = employeeIdList.map((employeeId) =>
    deleteEmployee(employeeId),
  );
  const deleteList = await Promise.all(promiseList);

  return deleteList.map((item) => item.id);
};

// PATCH update employee avatar
export const updateEmployeeAvatar = async ({ employeeId, imgUrl }) => {
  const res = await fetch(`http://localhost:4000/employees/${employeeId}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      avatar: imgUrl,
    }),
  });

  if (!res.ok) {
    throw new Error(res.statusText);
  }

  return res.json();
};
