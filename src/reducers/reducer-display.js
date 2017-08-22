const defaultDisplayState = {
  drawer: {
    isOpen: false,
    tabNumber: 0,
  },
  cards: [
    {
      isMount: true,
      layers: {
        isHeatmap1: true,
        isHeatmap2: false,
        isHeatmap3: false,
        isTargets: false,
        isPosture: true,
        isSensor: true,
        is3D: false,
      },
      rotate: 0,
      reflect: false,
    },
    {
      isMount: true,
      layers: {
        isHeatmap1: false,
        isHeatmap2: false,
        isHeatmap3: false,
        isTargets: false,
        isPosture: false,
        isSensor: false,
        is3D: false,
      },
      rotate: 0,
      reflect: false,
    },
  ],
};

const DrawerReducer = (state, action) => {
  switch (action.type) {
    case "DRAWER:TOGGLE_OPEN":
      return { ...state, isOpen: !state.isOpen };
    case "DRAWER:SWITCH_TAB":
      return { ...state, tabNumber: action.value };
    default:
      return state;
  }
};

const LayersReducer = (state, action) => {
  switch (action.value) {
    case "Heatmap1":
      return { ...state, isHeatmap1: !state.isHeatmap1, isHeatmap2: false, isHeatmap3: false, is3D: false };
    case "Heatmap2":
      return { ...state, isHeatmap2: !state.isHeatmap2, isHeatmap3: false, isHeatmap1: false, is3D: false };
    case "Heatmap3":
      return { ...state, isHeatmap3: !state.isHeatmap3, isHeatmap1: false, isHeatmap2: false, is3D: false };
    case "Targets":
      return { ...state, isTargets: !state.isTargets, isPosture: false, is3D: false };
    case "Posture":
      return { ...state, isPosture: !state.isPosture, isTargets: false, is3D: false };
    case "Sensor":
      return { ...state, isSensor: !state.isSensor, is3D: false };
    case "3D":
      return { ...state,
        is3D: !state.is3D,
        isHeatmap1: false, isHeatmap2: false, isHeatmap3: false,
        isTargets: false, isPosture: false, isSensor: false
      };
    default:
      return state;
  }
};

const CardReducer = (state, action) => {
  switch (action.type) {
    case "CARD:TOGGLE_MOUNT":
      return { ...state, isMount: !state.isMount };
    case "CARD:UPDATE_LAYERS":
      return { ...state, layers: LayersReducer(state.layers, action) };
    case "CARD:ROTATE_90_DEG_RIGHT":
      return { ...state, rotate: (((state.rotate - 1) % 4) + 4) % 4 };
    case "CARD:ROTATE_90_DEG_LEFT":
      return { ...state, rotate: (state.rotate + 1) % 4 };
    case "CARD:TOGGLE_REFLECTION":
      return { ...state, reflect: !state.reflect };
    default:
      return state;
  }
};
  
const DisplayReducer = (state = defaultDisplayState, action) => ({
  drawer: DrawerReducer(state.drawer, action),
  cards: state.cards.map((card, i) =>
    (i === action.index) ? CardReducer(card, action) : card
  ),
});

export default DisplayReducer;
