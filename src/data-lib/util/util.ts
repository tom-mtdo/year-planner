// Todo, make input into object for generic
export const standardiseEvent = (event: any, compDataPath: string | undefined) => {
  return {
    target: {
      dataset: { compDataPath },
      value: event.target.value,
    },
    originalEvent: event,
  };
};

export const pathToId = (compDataPath: string) => {
  const regex = /[\.\[\]]+/g;
  // replace "." and "[" and "]" with "-"
  const temp = compDataPath.trim().replace(regex, "-");
  // remove "-" at the end, if any
  const result = temp.replace(/-$/, "");
  return result;
};

export const buildId = (parentId: string, compName: string) => {
  return Boolean(parentId)
    ? compName
      ? `${parentId}-${compName}`
      : parentId
    : compName;
};

export const buildPath = (
  parentPath: string,
  compName: string,
  nameInPath: boolean = true
) => {
  let result;

  if (nameInPath) {
    result = parentPath
      ? compName
        ? `${parentPath}.${compName}`
        : parentPath
      : compName;
  } else {
    result = parentPath;
  }

  return result;
};
