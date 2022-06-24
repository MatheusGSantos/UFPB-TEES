type AvailableKeys = 'token' | 'user';

export const setLocalStorageItem = (key: AvailableKeys, value: any): void => {
  localStorage.setItem(
    `@CRUD:${key}`,
    typeof value === 'string' ? value : JSON.stringify(value),
  ); 
};

export const getLocalStorageItem = (key: AvailableKeys): any => {
  return localStorage.getItem(`@CRUD:${key}`);
};

export const removeLocalStorageItem = (key: AvailableKeys): void => {
  localStorage.removeItem(`@CRUD:${key}`);
};