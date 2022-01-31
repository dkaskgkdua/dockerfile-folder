import React, { useMemo, FC, Dispatch } from 'react';
import Tr from './TTr';

interface Props {
    tableData: string[][];
    dispatch: Dispatch<any>;
    // onCLick: () => void;
}

const Table: FC<Props> = ({  tableData, dispatch }) => {
    return (
        <table>
            <tbody>
                {Array(tableData.length).fill(null).map((tr, i) => (
                    useMemo(
                        () =>
                        <Tr key = {i} dispatch={dispatch} rowIndex={i} rowData={tableData[i]}/>,
                        [tableData[i]],
                    )
                ))}
            </tbody>
        </table>
    )
};

export default Table;