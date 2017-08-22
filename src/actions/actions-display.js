export const toggleDrawer = () => ({
  type: "DRAWER:TOGGLE_OPEN",
});

export const switchTabInDrawer = (value) => ({
  type: "DRAWER:SWITCH_TAB",
  value: value,
});

export const toggleCard = (index) => ({
  type: "CARD:TOGGLE_MOUNT",
  index: index,
});

export const updateCardLayers = (index, value) => ({
  type: "CARD:UPDATE_LAYERS",
  index: index,
  value: value,
});

export const rotateCard90DegLeft = (index) => ({
  type: "CARD:ROTATE_90_DEG_LEFT",
  index: index,
});

export const rotateCard90DegRight = (index) => ({
  type: "CARD:ROTATE_90_DEG_RIGHT",
  index: index,
});

export const toggleCardReflection = (index) => ({
  type: "CARD:TOGGLE_REFLECTION",
  index: index,
});
