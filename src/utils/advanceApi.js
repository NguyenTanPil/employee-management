// GET all advance by employee id
export const fetchAdvanceByEmployeeId = async (employeeId) => {
  const res = await fetch(
    `http://localhost:4000/advances?employeeId=${employeeId}&deleted=false`
  );

  if (!res.ok) {
    throw new Error(res.statusText);
  }

  return res.json();
};

// POST new advance
export const createNewAdvance = async (data) => {
  const res = await fetch(`http://localhost:4000/advances`, {
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

// PATCH delete advance by advance id
export const deleteAdvanceById = async (advanceId) => {
  const res = await fetch(`http://localhost:4000/advances/${advanceId}`, {
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
