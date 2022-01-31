import React, {Component} from 'react';
import BallClass from "./BallClass";

function getWinNumbers() {
    console.log('getWinNumbers');
    const candidate = Array(45).fill(null).map((v, i) => i + 1);
    const shuffle = [];
    while(candidate.length > 0) {
        shuffle.push(candidate.splice(Math.floor(Math.random() * candidate.length), 1)[0]);
    }
    const bonusNumber = shuffle[shuffle.length - 1];
    const winNumbers = shuffle.slice(0, 6).sort((p, c) => p - c);
    return [...winNumbers, bonusNumber]
}

interface State {
    winNumbers: number[]; // 당첨 숫자들
    winBalls: number[];
    bonus: number | null; // 보너스 공
    redo: boolean;
}

class Lotto extends Component<{}, State> {
    state: State = {
        winNumbers: getWinNumbers(), // 당첨 숫자들
        winBalls: [],
        bonus: null, // 보너스 공
        redo: false,
    };
    timeouts: number[] = [];

    runTimeouts = () => {
        const { winNumbers } = this.state;
        for(let i = 0; i < this.state.winNumbers.length - 1; i++) {
            this.timeouts[i] = window.setTimeout(() => {
                this.setState((prevState) =>{
                    return {
                        winBalls: [...prevState.winBalls, winNumbers[i]],
                    }
                })
            }, (i + 1) * 1000);
        }
        this.timeouts[6] = window.setTimeout(() => {
            this.setState({
                bonus: winNumbers[6],
                redo: true,
            });
        }, 7000)
    };

    componentDidMount() {
        this.runTimeouts();
    }

    componentDidUpdate(prevProps: {}, prevState: State) {
        if(!this.state.winBalls.length) {
            this.runTimeouts();
        }
    }

    // setTimeout은 항상 종료를 해줘야한다.
    componentWillUnmount() {
        this.timeouts.forEach((v) => {
            clearTimeout(v);
        })
    }

    onClickRedo = () => {
        this.setState({
            winNumbers: getWinNumbers(), // 당첨 숫자들
            winBalls: [],
            bonus: null, // 보너스 공
            redo: false,
        })
        this.timeouts = [];
    }

    render() {
        const { winBalls, bonus, redo } = this.state;
        return (
            <>
                <div>당첨숫자</div>
                <div id="결과창">
                    {winBalls.map((v) => <BallClass key={v} number={v} />)}
                </div>
                <div>보너스!</div>
                {bonus && <BallClass number={bonus}/>}
                {redo && <button onClick={this.onClickRedo}>한 번 더!</button>}
            </>
        )
    }
}

export default Lotto;