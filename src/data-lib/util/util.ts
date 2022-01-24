import { get } from "lodash";
import { isEmpty } from "./validation";

// Todo, make input into object for generic
export const standardiseEvent = (
  event: any,
  compDataPath: string | undefined
) => {
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

/**
 *
 * @param aPath page1.group1[0].group2[2].comp1
 * @returns page1.group1.group2.comp
 */
export const removeIteration = (aPath: string) => {
  return aPath.replace(/(\[[0-9]*\])/g, "");
};

/**
 *
 * @param aPath page1.group1[0].group2[2].comp1
 * @returns page1.group1[0].group2[2]
 *
 */
export const getParentPath = (aPath: string): string => {
  if (isEmpty(aPath)) {
    return "";
  }
  return `${aPath.substring(0, aPath.lastIndexOf("."))}`;
};

/**
 *
 * @param aPath page1.group1[0].group2[2].comp1
 * @returns page1.group1[0].group2
 *
 */
export const getArrayPath = (iterationPath: string): string => {
  if (isEmpty(iterationPath)) {
    return "";
  }
  const openIndex = iterationPath.lastIndexOf("[");
  return openIndex < 0 ? iterationPath : iterationPath.substring(0, openIndex);
};

export const isIterationPath = (aPath: string) => {
  return aPath.charAt(aPath.length - 1) === "]";
};

export const getSiblingPath = (aPath: string, siblingName: string) => {
  const parentPath = getParentPath(aPath) || "";
  return `${parentPath.length > 0 ? parentPath.concat(".") : ""}${siblingName}`;
};

export const getSiblingValue = (
  aPath: string,
  siblingName: string,
  data: any
) => {
  const siblingPath = getSiblingPath(aPath, siblingName) || "";
  return get(data, siblingPath);
};

export const getIteration = (aPath: string) => {
  if (isEmpty(aPath)) {
    return "";
  }

  const openIndex = aPath.lastIndexOf("[");
  const closeIndex = aPath.lastIndexOf("]");

  if (openIndex < 0 || closeIndex < 0 || openIndex > closeIndex) {
    return "";
  }

  return aPath.substring(openIndex + 1, closeIndex);
};

export const comparePathSameGroup = (
  path1: string,
  path2: string,
  order?: any[]
): number => {
  const parentP1 = getParentPath(path1);
  const parentP2 = getParentPath(path2);

  // if same iteration
  if (parentP1 === parentP2) {
    const noIteP1 = removeIteration(path1);
    const noIteP2 = removeIteration(path2);
    const ind1 = order?.indexOf(noIteP1) || -2;
    const ind2 = order?.indexOf(noIteP2) || -2;

    // @ts-ignorets
    if (ind1 >= 0 && ind2 >= 0) {
      return ind1 < ind2 ? -1 : ind1 > ind2 ? 1 : 0;
    }

    if (ind1 < 0 && ind2 < 0) {
      return 0;
    }
    if (ind1 < 0) {
      return 1;
    }
    if (ind2 < 0) {
      return -1;
    }
  } else {
    const i1 = getIteration(path1);
    const i2 = getIteration(path2);
    return i1 < i2 ? -1 : i1 > i2 ? 1 : 0;
  }

  // shouldn't reach here
  return 0;
};

/**
 * Compare 2 paths
 * @param path1 : dataPath e.g. page1.group1[0].group2[2].comp1
 * @param path2 : dataPath e.g. page1.group1[0].group2[2].comp2
 * @param order : e.g. [page1.group1.group2.comp2, page1.group1.group2.comp1]
 * which means error message for comp2 should be shorted to stand before comp1
 * @returns which path has higher priority
 * example:
 * path1 < path2 -> return -1
 * path1 = path2 -> return 0
 * path1 > path2 -> return 1
 * empty string has greatest value
 * - both not in order or both empty -> return 0
 * - 1 found, 2 not found in order -> return -1
 * - 1 not found, 2 found in order -> return 1
 *
 * See unit test for more details
 */
export const comparePath = (
  path1: string,
  path2: string,
  order?: string[]
): number => {
  // check empty
  if (isEmpty(path1) && isEmpty(path2)) {
    return 0;
  }
  if (isEmpty(path1)) {
    return 1;
  }
  if (isEmpty(path2)) {
    return -1;
  }

  const parentPath1 = getParentPath(path1);
  const parentPath2 = getParentPath(path2);

  // compare a parent & its children
  if (path1 === parentPath2) {
    return -1;
  }
  if (path2 === parentPath1) {
    return 1;
  }

  // Compare same group, diffrent iteration
  if (
    (isIterationPath(path1) &&
      getArrayPath(path1) === getArrayPath(parentPath2)) ||
    (isIterationPath(path2) &&
      getArrayPath(path2) === getArrayPath(parentPath1)) ||
    (isIterationPath(path1) &&
      isIterationPath(path2) &&
      getArrayPath(path1) === getArrayPath(path2))
  ) {
    const iter1 = getIteration(path1);
    const iter2 = getIteration(path2);

    return iter1 < iter2 ? -1 : 1;
  }

  // same group, different iteration cont.
  // cover case when ind1 === ind2
  //  path1: page1.group1[0].comp2
  //  path2: page1.group1[3].comp1
  if (removeIteration(parentPath1) === removeIteration(parentPath2)) {
    return comparePathSameGroup(path1, path2, order);
  }

  const noIteP1 = removeIteration(path1);
  const noIteP2 = removeIteration(path2);

  const ind1 = order?.indexOf(noIteP1) || -2;
  const ind2 = order?.indexOf(noIteP2) || -2;

  if (ind1 >= 0 && ind2 >= 0) {
    return ind1 < ind2 ? -1 : 1;
  }

  if (ind1 < 0 && ind2 < 0) {
    return 0;
  }
  if (ind1 < 0) {
    return 1;
  }
  if (ind2 < 0) {
    return -1;
  }

  // Shouldn't reach here
  return 0;
};
