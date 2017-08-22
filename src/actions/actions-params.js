export const updateDisplayParams = (value) => ({
  type: "PARAMS:UPDATE_DISPLAY",
  value: value,
});

export const updateDefaultParams = (value) => ({
  type: "PARAMS:UPDATE_DEFAULTS",
  value: value,
});

export const applyDefaultParams = () => ({
  type: "PARAMS:APPLY_DEFAULTS",
});

export const updateParam = (value) => ({
  type: "PARAMS:UPDATE_PARAM",
  value: value,
});
