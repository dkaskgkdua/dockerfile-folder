import React, {Component, MouseEvent, useEffect} from 'react';

const rspCoords = {
    바위: '0',
    가위: '-142px',
    보: '-284px',
} as const;

const scores = {
    가위: 1,
    바위: 0,
    보: -1,
} as const;

// type ImgCoords = '0' | '-142px' | '-284px';
// type ImgCoordsKey = keyof typeof rspCoords; // 키 타입으로 뽑기
type ImgCoords = typeof rspCoords[keyof typeof rspCoords];
type ImgCoordsKey = keyof typeof rspCoords;

const computerChoice = (imgCoord: ImgCoords) => {
    return (Object.keys(rspCoords) as ['바위', '가위', '보']).find((v) => {
        return rspCoords[v] === imgCoord;
    })!; // undefined가 안나온다는 확신으로 !를 주거나 if로 검증처리
}

interface State {
    result: string,
    imgCoords: ImgCoords,
    score: number,
}

class RSP extends Component<{}, State> {
    state: State = {
        result: '',
        imgCoords: rspCoords.바위,
        score: 0,
    }
    /**
     * 컴포넌트 라이프 사이클
     * 클래스의 경우 -> constructor -> render
     * -> ref -> componentDidMount ->
     * (setState/props 바뀔 때 -> shouldComponentUpdate -> render -> componentDidUpdate)
     * 부모가 나를 없앨 때 -> componentWillUnmount -> 소멸
     * */
    interval: number | null = null;
    // 최초 렌더링 이후만 실행됨 - 비동기 요청을 많이 함
    componentDidMount() {
        this.interval = window.setInterval(this.changeHand, 1000);
    }
    // // 리렌더링 후 실행됨
    // componentDidUpdate(prevProps, prevState, snapshot) {
    //
    // }

    // 컴포넌트가 제거되기 직전 - 비동기 요청 많이 함
    componentWillUnmount() {
        clearInterval(this.interval!);
    }

    changeHand = () => {
        const {imgCoords} = this.state;
        if(imgCoords === rspCoords.바위) {
            this.setState({
                imgCoords: rspCoords.가위,
            });
        } else if(imgCoords === rspCoords.가위) {
            this.setState({
                imgCoords: rspCoords.보,
            });
        } else if(imgCoords === rspCoords.보) {
            this.setState({
                imgCoords: rspCoords.바위,
            });
        }
    }
    onClickBtn = (choice: ImgCoordsKey) => (e: MouseEvent<HTMLButtonElement>) => { // 고차함수
        const { imgCoords } = this.state;
        clearInterval(this.interval!);
        const myScore = scores[choice];
        const cpuScore = scores[computerChoice(imgCoords)];
        const diff = myScore - cpuScore;
        if(diff === 0) {
            this.setState({
                result: '비겼습니다.',
            });
        } else if([-1, 2].includes(diff)) {
            this.setState((prevState) => {
                return {
                    result: '이겼습니다.!',
                    score : prevState.score + 1

                }
            })
        } else {
            this.setState((prevState) => {
                return {
                    result: '졌습니다.',
                    score: prevState.score -1,
                }
            })
        }
        setTimeout(() => {
            this.interval = window.setInterval(this.changeHand, 1000);
        }, 1000);

    }

    render() {
        const  { result, score, imgCoords } = this.state;
        return (
            <>
                <div
                    id="computer"
                    style={{ background : `url(https://en.pimg.jp/023/182/267/1/23182267.jpg) ${imgCoords} 0`}}
                >
                </div>
                <div>
                    <button id="rock" className="btn" onClick={this.onClickBtn('바위')}>바위</button>
                    <button id="scissor" className="btn" onClick={this.onClickBtn('가위')}>가위</button>
                    <button id="paper" className="btn" onClick={this.onClickBtn('보')}>보</button>
                </div>
                <div>{result}</div>
                <div>현재 {score}점</div>
            </>
        );
    }
}

module.exports = RSP;