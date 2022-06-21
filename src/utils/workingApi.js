// GET all working by employee id
export const fetchWorkingByEmployeeId = async (employeeId) => {
  const res = await fetch(
    `http://localhost:4000/working?employeeId=${employeeId}&deleted=false`
  );

  if (!res.ok) {
    throw new Error(res.statusText);
  }

  return res.json();
};

// POST create new employee
export const createNewWorking = async (data) => {
  const res = await fetch(`http://localhost:4000/working`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

  return res.json();
};

// PATCH delete working by working id
export const deleteWorkingById = async (workingId) => {
  const res = await fetch(`http://localhost:4000/working/${workingId}`, {
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
