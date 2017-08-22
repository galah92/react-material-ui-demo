export const connManagerHandleConnBtn = () => ({
  type: "CONN_MANAGER:CONN_BTN",
});

export const connManagerHandleStartBtn = () => ({
  type: "CONN_MANAGER:START_BTN",
});

export const connManagerUpdateURL = (value) => ({
  type: "CONN_MANAGER:UPDATE_URL",
  value: value,
});
