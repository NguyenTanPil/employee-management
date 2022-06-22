// GET all statistics by employee id
export const fetchStatisticsByEmployeeId = async (employeeId) => {
  const res = await fetch(
    `http://localhost:4000/statistics?employeeId=${employeeId}&deleted=false`
  );

  if (!res.ok) {
    throw new Error(res.statusText);
  }

  return res.json();
};

// POST new statistics
export const createNewStatistic = async (data) => {
  const res = await fetch(`http://localhost:4000/statistics`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    throw new Error(res.statusText);
  }

  return res.json();
};

// PATCH delete statistics by statistics id
export const deleteStatisticById = async (statisticsId) => {
  const res = await fetch(`http://localhost:4000/statistics/${statisticsId}`, {
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
