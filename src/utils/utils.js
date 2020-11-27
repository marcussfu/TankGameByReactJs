import { Dir, MoveDistance, BoardHeight, BoardWidth, BlockSize, HayHealth } from '../utils/config';

export const Block = {
    left: 0,
    top: 0,
    dir: 0,
    pos: { x: 0, y: 0 },
    state: false,
    classIndex: 0,// 0: bullet, 1: wall, 2: hay
    health: HayHealth,
    setting: function (left, top) {
        this.left = left;
        this.top = top;
        this.pos = { x: 0, y: 0 };
        this.state = false;
    }
};

// create block on random position and time
export const addBlocks = (dir) => {
    if ((Math.floor(Math.random() * 100)) < 90) {
        return null;
    }
    const block = Object.create(Block);
    block.state = true;
    block.dir = dir;
    block.classIndex = Math.floor(Math.random() * 2) + 1;
    block.setting(BoardWidth + ( BlockSize * (Math.floor(Math.random() * 2))), Math.floor(Math.random() * (BoardHeight-BlockSize)));
    return block;
};

// update block position
export const refreshBlocks = (blocks, moveDir) => {
    const newBlocks = blocks.map(block => {
        switch (moveDir) {
            case Dir.UP:
                block.pos.y +=MoveDistance*2;
                break;
            case Dir.DOWN:
                block.pos.y -=MoveDistance*2;
                break;
            case Dir.LEFT:
                block.pos.x +=MoveDistance*2;
                break;
            case Dir.RIGHT:
                block.pos.x -=MoveDistance*2;
                break;
            default:
                break;
        }
        
        if (!isValid(block.pos)) {
            block.state = false;
            return null;
        }
        return block;
    }).filter(block => block !== null);
    return newBlocks;
};

// check object over range or not
export const isValid = (pos) => {
    return Math.abs(pos.y) < BoardHeight && Math.abs(pos.x) < BoardWidth;
};

// check object detection blocks
export const checkBlocks = (left, top, isBullet, targetSize, blocks) => {
    let result = false;
    const targetRight = left+targetSize+20;
    // const targetDown = top+targetSize;
    blocks.forEach((block) => {
        const blockLeft = block.left+block.pos.x;
        const blockTop = block.top+block.pos.y;
        if ( targetRight >= blockLeft && Math.abs(top-blockTop) <= BlockSize ) {
            result = true;
            if (isBullet) {
                // reduce block health
            }
        }
    });
    return result;
};