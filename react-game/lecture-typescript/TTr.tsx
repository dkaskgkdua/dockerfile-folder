import React, { Dispatch, FC, useMemo } from 'react';
import Td from './TTd';

interface Props {
    rowData: string[];
    rowIndex: number;
    dispatch: Dispatch<any>;
}

const Tr: FC<Props> =({ rowData, rowIndex, dispatch }) => {
    return (
        <tr>
            {Array(rowData.length).fill(null).map((td, i) => (
                useMemo(
                    () =>
                <Td dispatch={dispatch} rowIndex={rowIndex} cellIndex={i} key={i} cellData={rowData[i]}>{''}</Td>
                , [rowData[i]])
            ))}
        </tr>
    )
};

export default Tr;