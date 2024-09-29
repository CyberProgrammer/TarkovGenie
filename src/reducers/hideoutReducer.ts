import { ReducerActionString } from 'types/types'
import {DECREASE_HIDEOUT_LEVEL, INCREASE_HIDEOUT_LEVEL} from "../actionTypes/actionTypes.ts";
import HideoutData from "@data/hideout.json";

const initialHideoutState = {
    stationData: HideoutData.data.hideoutStations,
    userStationData: [
        {
            id: "5d388e97081959000a123acf",
            name: "Heating",
            level: 0
        },
        {
            id: "5d3b396e33c48f02b81cd9f3",
            name: "Generator",
            level: 0
        },
        {
            id: "5d473c1e081959000e530190",
            name: "Vents",
            level: 0
        },
        {
            id: "5d484fb3654e7600681d9314",
            name: "Security",
            level: 0
        },
        {
            id: "5d484fba654e7600691aadf7",
            name: "Lavatory",
            level: 0
        },
        {
            id: "5d484fc0654e76006657e0ab",
            name: "Stash",
            level: 0
        },
        {
            id: "5d484fc8654e760065037abf",
            name: "Water Collector",
            level: 0
        },
        {
            id: "5d484fcd654e7668ec2ec322",
            name: "Medstation",
            level: 0
        },
        {
            id: "5d484fd1654e76006732bf2e",
            name: "Nutrition Unit",
            level: 0
        },
        {
            id: "5d484fd6654e76051d3cc791",
            name: "Rest Space",
            level: 0
        },
        {
            id: "5d484fda654e7600681d9315",
            name: "Workbench",
            level: 0
        },
        {
            id: "5d484fdf654e7600691aadf8",
            name: "Intelligence Center",
            level: 0
        },
        {
            id: "5d484fe3654e76006657e0ac",
            name: "Shooting Range",
            level: 0
        },
        {
            id: "5d494a0e5b56502f18c98a02",
            name: "Library",
            level: 0
        },
        {
            id: "5d494a175b56502f18c98a04",
            name: "Scav Case",
            level: 0
        },
        {
            id: "5d494a205b56502f18c98a06",
            name: "Illumination",
            level: 0
        },
        {
            id: "5d494a295b56502f18c98a08",
            name: "Hall of Fame",
            level: 0
        },
        {
            id: "5d494a315b56502f18c98a0a",
            name: "Air Filtering Unit",
            level: 0
        },
        {
            id: "5d494a385b56502f18c98a0c",
            name: "Solar Power",
            level: 0
        },
        {
            id: "5d494a3f5b56502f18c98a0e",
            name: "Booze Generator",
            level: 0
        },
        {
            id: "5d494a445b56502f18c98a10",
            name: "Bitcoin Farm",
            level: 0
        },
        {
            id: "6377a9b9a93bde8fa30eb79a",
            name: "Gym",
            level: 0
        },
        {
            id: "637b39f02e873739ec490215",
            name: "Defective Wall",
            level: 0
        },
        {
            id: "63db64cbf9963741dc0d741f",
            name: "Weapon Rack",
            level: 0
        },
        {
            id: "65e5bb1713227bb7690cea0a",
            name: "Gear Rack",
            level: 0
        },
        {
            id: "667298e75ea6b4493c08f266",
            name: "Cultist Circle",
            level: 0
        }
    ]
};

const hideoutReducer = (state = initialHideoutState, action: ReducerActionString) => {
    switch (action.type) {
        case INCREASE_HIDEOUT_LEVEL:
            return {
                ...state,
                userStationData: state.userStationData.map(station =>
                    station.id === action.payload ?
                        {
                            ...station,
                            level: station.level + 1
                        } : station
                )
            }
        case DECREASE_HIDEOUT_LEVEL:
            return {
                ...state,
                userStationData: state.userStationData.map(station =>
                    station.id === action.payload ?
                        {
                            ...station,
                            level: station.level - 1
                        } : station
                )
            }
        default:
            return state;
    }
};

export default hideoutReducer;
