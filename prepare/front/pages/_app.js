import "antd/dist/antd.css";
import PropTypes from "prop-types";
import Head from "next/head";
import wrapper from "../store/configureStore";
import withReduxSaga from "next-redux-saga";

// 전체 페이지에 공통적인 적용함
const NodeBird = ({ Component }) => {
    return (
        <>
            <Head>
                <meta charSet="utf-8"/>
                <title>NodeBird</title>
            </Head>
            <Component />
        </>
    );
};

NodeBird.propTypes = {
    Component: PropTypes.elementType.isRequired,
}
export default wrapper.withRedux(withReduxSaga(NodeBird));