import React, { useCallback, memo } from 'react';
import  { CLICK_CELL, CHANGE_TURN } from './TicTacToe';

const Td = ({ rowIndex, cellIndex, dispatch, cellData }) => {
    const onClickTd = useCallback(() => {
        console.log(rowIndex,cellIndex);
        if(cellData) {
            return;
        }
        // 비동기 ( 리덕스에선 동기 )
        dispatch({ type: CLICK_CELL, row: rowIndex, cell: cellIndex});

    }, [cellData]);
    return (
        <td onClick={onClickTd}>{cellData}</td>
    )
};

export default Td;