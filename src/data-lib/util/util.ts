// Todo, make input into object for generic
export const standardiseEvent = (event: any, dataPath: string | undefined) => {
  return {
    target: {
      dataset: { dataPath },
      value: event.target.value,
    },
    originalEvent: event,
  };
};
