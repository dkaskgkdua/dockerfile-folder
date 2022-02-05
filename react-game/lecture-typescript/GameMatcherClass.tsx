import React, { Component } from 'react';
import { RouteComponentProps, RouteChildrenProps } from 'react-router';
import { withRouter } from 'react-router-dom';
import NumberBaseball from './NumberBaseball';
import RSP from './RSP';
import Lotto from './Lotto';

interface Props extends RouteChildrenProps {
    hello: 'zerocho'; // 프롭스 확장
}

class GameMatcherClass extends Component<RouteComponentProps<{name: string}>> {
    render() {
        if( !this.props.match) {
            return (
                <div>
                    일치하는 게임이 없습니다.
                </div>
            )
        }
        let urlSearchParams = new URLSearchParams(this.props.location.search.slice(1));
        console.log(urlSearchParams.get('skip'));
        if(this.props.match.params.name === 'number-baseball') {
            return <NumberBaseball/>
        } else if(this.props.match.params.name === 'rock-scissors-paper') {
            return <RSP/>
        } else if(this.props.match.params.name === 'lotto-generator') {
            return <Lotto/>
        } else {
            return (
                <div>
                    일치하는 게임이 없습니다.
                </div>
            )
        }

    }
}

export default withRouter(GameMatcherClass);
