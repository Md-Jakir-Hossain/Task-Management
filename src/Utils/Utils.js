export const getData = () => {
  const data = localStorage.getItem("state");
  return data ? JSON.parse(data) : [];
};
