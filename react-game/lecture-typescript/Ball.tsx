import React, {FunctionComponent} from 'react';

// 아래 코드는 훅스(useState 같은..)가 아님 함수 컴포넌임.
const Ball: FunctionComponent<{number: number}> = ({ number }) => {
    let background;
    if(number <= 10) {
        background = 'red';
    } else if(number <= 20) {
        background = 'orange';
    } else if(number <= 30) {
        background = 'yellow';
    } else if(number <= 40) {
        background = 'blue';
    } else {
        background = 'green';
    }
    return (
        <div className="ball" style={{ background }}>{number}</div>
    )
};


export default Ball;