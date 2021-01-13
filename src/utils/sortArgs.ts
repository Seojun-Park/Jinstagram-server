const sortArgs = (prevData: object, args: object): any => {
  const obj: object = {};
  let res = {};
  Object.keys(args).forEach((key) => {
    if (args[key] !== "" || args[key] !== null) {
      obj[key] = args[key];
      if (obj[key] === "") {
        delete obj[key];
      }
    }
    res = Object.assign({}, prevData, obj);
  });
  return res;
};

export default sortArgs;
