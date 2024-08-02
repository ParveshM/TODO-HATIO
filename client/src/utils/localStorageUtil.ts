// Function to set an item in local storage
export const setItem = (key: string, value: any) => {
  localStorage.setItem(key, JSON.stringify(value));
};

// Function to get an item from local storage
export const getItem = (key: string) => {
  const item = localStorage.getItem(key);
  return item ? JSON.parse(item) : null;
};

// Function to remove an item from local storage
export const removeItem = (key: string) => {
  localStorage.removeItem(key);
};
