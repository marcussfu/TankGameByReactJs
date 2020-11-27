import React from 'react';
import './Board.css';
import Tank from './components/Tank';
import { addBlocks, refreshBlocks, checkBlocks } from './utils/utils';
import { BoardHeight, BoardWidth, TankSize, BlockSize } from './utils/config';
import { useSelector, useDispatch } from 'react-redux';
import { UpArrow, DownArrow, LeftArrow, RightArrow, AddBlock, RefreshBlocks, ChangeTankClassIndex } from './actions/tankActions';

function Board() {
  const left = useSelector(state => state.left);
  const top = useSelector(state => state.top);
  const dir = useSelector(state => state.dir);
  const blocks = useSelector(state => state.blocks);

  const dispatch = useDispatch();

  // control tank to left
  const controlMoveLeft = () => {
    if (left > 20) {
      dispatch(LeftArrow());
    }
  };

  // control tank to up
  const controlMoveUp = () => {
    if (top > 20) {
      dispatch(UpArrow());
    }
  };

  // control tank to right
  const controlMoveRight = () => {
    // check block
    if (checkBlocks(left, top, false, TankSize, blocks)) {
      return;
    }

    // create block
    const block = addBlocks(dir);
    if (block !== null) {
      dispatch(AddBlock(block));
    }

    //move blocks
    moveBlocks();
    
    if ((left+TankSize+20) < BoardWidth) {
      dispatch(RightArrow());
    }
  };

  // control tank to down
  const controlMoveDown = () => {
    if ((top+TankSize+20) < BoardHeight) {
      dispatch(DownArrow());
    }
  };

  // change tank class to red, blue or green
  const changeTankClass = () => {
    dispatch(ChangeTankClassIndex());
  };

  // move reverse blocks from tank
  const moveBlocks = () => {
    const newBlocks = refreshBlocks(blocks, dir);
    if (newBlocks && newBlocks.length > 0) {
      dispatch(RefreshBlocks(newBlocks));
    }
  };
  
  return (
    <div className="container">
      <div className="board" style={{ width: BoardWidth, height: BoardHeight }}>
        <Tank/>
        {
          blocks.map(
            (block, index) => (
            <span
                className='tk-block'
                key={index}
                style={{
                    left: block.left,
                    top: block.top,
                    transform: `translate(${block.pos.x}px, ${block.pos.y}px)`,
                    height: BlockSize,
                    width: BlockSize,
                    backgroundColor: block.classIndex === 1 ? 'black' : '#eba40c'
                }}
            >
              <h1>
                {block.health}
              </h1>
            </span>
            ),
          )
        }
      </div>
      <div className="controlpanel">
        <button className="ui green button" onClick={controlMoveLeft} style={{width: 100}}>LEFT</button>
        <button className="ui green button" onClick={controlMoveUp} style={{width: 100}}>UP</button>
        <button className="ui green button" onClick={controlMoveRight} style={{width: 100}}>RIGHT</button>
        <button className="ui green button" onClick={controlMoveDown} style={{width: 100}}>DOWN</button>
        <button className="ui green button" onClick={changeTankClass} style={{width: 150}}>CHANGETANK</button>
      </div>
    </div>
  );
}

export default Board;
