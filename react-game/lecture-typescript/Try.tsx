import React, {memo, useState, FunctionComponent} from 'react';
import {TryInfo} from "./types";

const Try: FunctionComponent<{tryInfo: TryInfo}> = memo(({ tryInfo }) => {
    const [result, setResult] = useState(tryInfo.result);
    const onClick = () => {
      setResult('1');
    };
    return (
        <li>
            <div>{tryInfo.try}</div>
            <div onClick={onClick} >{result}</div>
            {/*<div>{tryInfo.result}</div>*/}
        </li>
    )
});


export default Try;