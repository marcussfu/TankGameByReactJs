import { Dir, MoveDistance } from '../utils/config';

// change tank's y position
export const TopReducer = (state = 300, action) => {
    switch(action.type) {
        case 'UP':
            return state - MoveDistance;
        case 'DOWN':
            return state + MoveDistance;
        default :
        return state;
    };
};

// change tank's x position
export const LeftReducer = (state = 0, action) => {
    switch(action.type) {
        case 'LEFT':
            return state - MoveDistance;
        case 'RIGHT':
            return state + MoveDistance;
        default :
        return state;
    };
};

// change tank's direction
export const DirReducer = (state = Dir.RIGHT, action) => {
    switch(action.type) {
        case 'UP':
            state = Dir.UP;
            return state;
        case 'DOWN':
            state = Dir.DOWN;
            return state;
        case 'LEFT':
            state = Dir.LEFT;
            return state;
        case 'RIGHT':
            state = Dir.RIGHT;
            return state;
        default :
            return state;
    };
};

// change fire or not state
export const IsFireReducer = (state = false, action) => {
    switch(action.type) {
        case 'FIREPRESS':
            state = true;
            return state;
        case 'FIRERELEASE':
            state = false;
            return state;
        default:
            return state;
    };
};

// change tank class
export const TankClassIndexReducer = (state = 0, action) => {
    if (action.type !== 'TANKCLASSINDEX')
        return state;
    state++;
    if (state > 2) {
        state = 0;
    }
    return state;
};

// add bullets array or update total bullets array
export const BulletsReducer = (state = [], action) => {
    switch(action.type) {
        case 'ADDBULLET':
            state.push(action.payload);
            return state;
        case 'REMOVEBULLET':
            state.shift();
            return state;
        case 'REFRESHBULLETS':
            state = action.payload;
            return state;
        default:
            return state;
    };
};

// add blocks array or update total blocks array 
export const BlocksReducer = (state = [], action) => {
    switch(action.type) {
        case 'ADDBLOCK':
            state.push(action.payload);
            return state;
        case 'REFRESHBLOCKS':
            state = action.payload;
            return state;
        default :
        return state;
    };
};