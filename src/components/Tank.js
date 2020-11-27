import React, { useEffect } from 'react';
import '../Board.css';
import { Block, addBlocks, refreshBlocks, isValid, checkBlocks } from '../utils/utils';
import { TanksColor, TanksBulletDemage, TankLayout, TankSize, BoardWidth, BoardHeight, Dir, BulletSize } from '../utils/config';
import useEvent from '../hooks/useEvent';
import { useSelector, useDispatch } from 'react-redux';
import { UpArrow, DownArrow, LeftArrow, RightArrow, FirePress, FireRelease, ChangeTankClassIndex, AddBullet, RefreshBullets, AddBlock, RefreshBlocks } from '../actions/tankActions';

export default function Tank() {
    const left = useSelector(state => state.left);
    const top = useSelector(state => state.top);
    const dir = useSelector(state => state.dir);
    const classIndex = useSelector(state => state.classIndex);
    const bullets = useSelector(state => state.bullets);
    const blocks = useSelector(state => state.blocks);
    // const [oldDir, setOldDir] = useState(dir);

    const dispatch = useDispatch();

    // first render, and each rerender to move bullets(if Exist)
    useEffect(() => {
        setInterval(() => moveBullets(), 20);
    });
    
    // keyboard to control tank move and fire('F' key)
    const handleKeyPress = (e) => {
        if (e.keyCode === 37) {
            // move tank left
            if (left > 20) {
                dispatch(LeftArrow());
            }
        }
        else if (e.keyCode === 38) {
            // move tank up
            if (top > 20) {
                dispatch(UpArrow());
            }
        }
        else if (e.keyCode === 39) {
            // move tank right
            // check block by tank
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
        }
        else if (e.keyCode === 40) {
            // move tank down
            if ((top+TankSize+20) < BoardHeight) {
                dispatch(DownArrow());
            }
        }
        else if (e.keyCode === 70) {
            // fire ('F' key)
            dispatch(FirePress());
        }
    };

    // keyboard release
    const handleKeyRelease = (e) => {
        if (e.keyCode === 70) {// fire key release
            dispatch(FireRelease());
            shoot();
        }
        else if (e.key === 'C') {// c to change tank class
            dispatch(ChangeTankClassIndex());
        }
        // else if (e.keyCode >= 37 && e.keyCode <= 40) {
        //     console.log("oldDir: ",oldDir, dir);
        //     setOldDir(dir);
        // }
    };

    // move reverse blocks from tank 
    const moveBlocks = () => {
        const newBlocks = refreshBlocks(blocks, dir);
        if (newBlocks && newBlocks.length > 0) {
            dispatch(RefreshBlocks(newBlocks));
        }
    };

    // create bullet follow tank's direction
    const shoot = () => {
        const bullet = Object.create(Block);
        bullet.state = true;
        bullet.dir = dir;
        
        switch (dir) {
            case Dir.LEFT:
                bullet.setting(-30, (TankSize/2) - 10);
                break;
            case Dir.UP:
                bullet.setting((TankSize/2) - 10, -30);
                break;
            case Dir.RIGHT:
                bullet.setting(TankSize + 10, (TankSize/2) - 10);
                break;
            case Dir.DOWN:
                bullet.setting((TankSize/2) - 10, TankSize + 10);
                break;
            default:
                break;
        }
        dispatch(AddBullet(bullet));
    };
    
    // hook key down addEventListener 
    useEvent('keydown', handleKeyPress);
    // hook key up addEventListener 
    useEvent('keyup', handleKeyRelease);

    // move bullets follow tank direction, and refresh store data to rerender
    const moveBullets = () => {
        const newBullets = bullets.map(bullet => {
                switch (bullet.dir) {
                    case Dir.UP:
                        bullet.pos.y--;
                        break;
                    case Dir.DOWN:
                        bullet.pos.y++;
                        break;
                    case Dir.LEFT:
                        bullet.pos.x--;
                        break;
                    case Dir.RIGHT:
                        bullet.pos.x++;
                        break;
                    default:
                        break;
                }
                if (!isValid(bullet.pos)) {
                    bullet.state = false;
                    return null;
                }
                // check block by bullet
                if (checkBlocks((bullet.left+bullet.pos.x), (bullet.top+bullet.pos.y), true, BulletSize, blocks)) {
                    console.log("detect object");
                    return null;
                }
                return bullet;
        }).filter(bullet => bullet !== null);
        
        if (newBullets && newBullets.length > 0) {
            dispatch(RefreshBullets(newBullets));
        }
    };
    
    // update function
    const repaint = () => {
        // start repaint on next frame
        return requestAnimationFrame(repaint);
    };

    return (
        <div className="tank" style={{ left: left, top: top, backgroundColor: TanksColor[classIndex] }}>
            <div className="circle" style={{
                left: 26+"%", 
                top: 26+"%",
                height: 50+"px",
                width: 50+"px",
                backgroundColor: 'black'
            }} />
            <div className="cannon" style={{ 
                left: TankLayout[dir].left+"%", 
                top: TankLayout[dir].top+"%", 
                height: TankLayout[dir].height,
                width: TankLayout[dir].width
            }}/>
            {
                bullets.map(
                    (bullet, index) => (
                    <span
                        className='tk-bullet'
                        key={index}
                        style={{
                            left: bullet.left,
                            top: bullet.top,
                            transform: `translate(${bullet.pos.x}px, ${bullet.pos.y}px)`,
                            height: BulletSize,
                            width: BulletSize,
                        }}
                    />
                    ),
                )
            }
        </div>
    );
}