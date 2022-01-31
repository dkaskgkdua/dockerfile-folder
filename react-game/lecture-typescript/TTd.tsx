import React, { Dispatch, FC, useCallback } from 'react';
import  { CLICK_CELL, clickCell } from './TicTacToe';

interface Props {
    rowIndex: number;
    cellIndex: number;
    dispatch: Dispatch<any>;
    cellData: string;
    children: string;
}

const Td: FC<Props> = ({ rowIndex, cellIndex, dispatch, cellData }) => {

    // const ref = useRef([]);
    // useEffect(() => {
    //     console.log(rowIndex === ref.current[0], cellIndex === ref.current[1], dispatch === ref.current[2], cellData === ref.current[3]);
    //     ref.cureent = [rowIndex, cellIndex, dispatch, cellData]
    // }, [rowIndex, cellIndex, dispatch, cellData])

    const onClickTd = useCallback(() => {
        console.log(rowIndex,cellIndex);
        if(cellData) {
            return;
        }
        // 비동기 ( 리덕스에선 동기 )
        // dispatch({ type: CLICK_CELL, row: rowIndex, cell: cellIndex});
        dispatch(clickCell(rowIndex, cellIndex));

    }, [cellData]);
    return (
        <td onClick={onClickTd}>{cellData}</td>
    )
};

export default Td;