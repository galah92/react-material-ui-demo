const defaultDataState = {
  trackerInit: {
    DataType: "Tracker_Init",
    Data: [[-1, -1], [1, 1]],
    X0: 0, X1: 0, Y0: 0, Y1: 0,
    ID: "Generic2DMatrix",
  },
  tracker: {
    DataType: "Tracker_Update",
    ZoneID: "Office",
    PostureVector: ["NA", "NA", "NA", "NA"],
    ActivityVector: ["NA", "NA", "NA", "NA"],
    LocationMatrix: [["NaN", "NaN"], ["NaN", "NaN"], ["NaN", "NaN"], ["NaN", "NaN"]],
    ID: "Tracker_Update",
  },
  heatmap: {
    DataType: "",
    Data: [[0, 0], [0, 0]],
    X0: 0, X1: 0, Y0: 0, Y1: 0,
    ID: "Generic2DMatrix",
  },
  threeD: {
    DataType: "",
    Data: [[0, 0], [0, 0]],
    X0: 0, X1: 0, Y0: 0, Y1: 0,
    ID: "Generic2DMatrix",
  },
};

const DataReducer = (state = defaultDataState, action) => {
  if (action.type === "WEBSOCKET:MESSAGE") {
    switch (action.payload.data.ID) {
      case "UpdateConfigurationEditor":
        return { ...state, params: action.payload.data };
      case "Tracker_Update":
        return { ...state, tracker: action.payload.data };
      case "Generic2DMatrix":
        switch (action.payload.data.DataType) {
          case "sliceBot":
            return {
              ...state,
              heatmap: action.payload.data,
              threeD: action.payload.data,
            };
          case "Tracker_Init":
            return { ...state, trackerInit: action.payload.data };
          default:
            return state;
        }
      default:
        return state;
    }
  } else {
    return state;
  }
};

export default DataReducer;
