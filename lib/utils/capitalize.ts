const capitalize = (str: string | string[]) => {
  const strArr = Array.isArray(str) ? str : str.split(" ");

  return strArr
    .map((str) => {
      return str.charAt(0).toUpperCase() + str.slice(1);
    })
    .join("");
};

export default capitalize;
