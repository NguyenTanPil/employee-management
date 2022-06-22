export const createCheckedList = (employeeData) => {
  const list = [
    {
      id: '0',
      status: false,
    },
  ];

  for (let i = 0; i < employeeData.length; i++) {
    if (!employeeData[i].deleted) {
      list.push({
        id: employeeData[i].id || '0',
        status: false,
      });
    }
  }

  return list;
};

export const findCheckListElementById = (checkedList, id) => {
  return checkedList.find((element) => element.id === id) || { status: false };
};

export const handleSelectButton = (checkedList, idx) => {
  let newCheckedList;

  if (idx === '0') {
    const checkAllStatus = !checkedList[0].status;
    newCheckedList = checkedList.map((item) => ({
      ...item,
      status: checkAllStatus,
    }));
  } else {
    newCheckedList = checkedList.map((item) => {
      if (item.id === idx) {
        return {
          ...item,
          status: !item.status,
        };
      } else {
        return item;
      }
    });

    if (findCheckListElementById(checkedList, idx).status) {
      newCheckedList[0].status = false;
    } else {
      const checkAllStatus = newCheckedList
        .slice(1)
        .every((item) => item.status);
      newCheckedList[0].status = checkAllStatus;
    }
  }

  return newCheckedList;
};
