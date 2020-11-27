// dispatch actions reducer data in store

export const UpArrow = () => {
    return {
        type: 'UP'
    };
};

export const DownArrow = () => {
    return {
        type: 'DOWN'
    };
};

export const LeftArrow = () => {
    return {
        type: 'LEFT'
    };
};

export const RightArrow = () => {
    return {
        type: 'RIGHT'
    };
};

export const FirePress = () => {
    return {
        type: 'FIREPRESS'
    };
};

export const FireRelease = () => {
    return {
        type: 'FIRERELEASE'
    };
};

export const ChangeTankClassIndex = () => {
    return {
        type: 'TANKCLASSINDEX'
    };
};

export const AddBullet = (data) => {
    return {
        type: 'ADDBULLET',
        payload: data
    };
};

export const RemoveBullet = (data) => {
    return {
        type: 'REMOVEBULLET'
    };
};

export const RefreshBullets = (data) => {
    return {
        type: 'REFRESHBULLETS',
        payload: data
    };
};

export const AddBlock = (data) => {
    return {
        type: 'ADDBLOCK',
        payload: data
    };
};

export const RefreshBlocks = (data) => {
    return {
        type: 'REFRESHBLOCKS',
        payload: data
    };
};