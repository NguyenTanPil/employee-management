// GET all teams
export const fetchTeamData = async () => {
  const res = await fetch(`http://localhost:4000/teams?deleted=false`);

  if (!res.ok) {
    throw new Error(res.statusText);
  }

  return res.json();
};

// POST create new team
export const createNewTeam = async (newTeam) => {
  const res = await fetch(`http://localhost:4000/teams`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(newTeam),
  });

  if (!res.ok) {
    throw new Error(res.statusText);
  }

  return res.json();
};

// PATCH update team by id
export const deleteTeam = async (teamId) => {
  const res = await fetch(`http://localhost:4000/teams/${teamId}`, {
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
