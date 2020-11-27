import { combineReducers } from 'redux'
import {TopReducer, LeftReducer, DirReducer, IsFireReducer, TankClassIndexReducer, BulletsReducer, BlocksReducer} from './tankReducer';

//combined all reducers for store
const JoinedReducers = combineReducers({
    top: TopReducer,
    left: LeftReducer,
    dir: DirReducer,
    fire: IsFireReducer,
    classIndex: TankClassIndexReducer,
    bullets: BulletsReducer,
    blocks: BlocksReducer
});

export default JoinedReducers;