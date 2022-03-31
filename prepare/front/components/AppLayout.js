import PropTypes from "prop-types";
import Link from "next/link";
import {Menu, Input, Row, Col} from 'antd';
import {useState} from "react";
import UserProfile from "./UserProfile";
import LoginForm from "./LoginForm";
import styled from "styled-components"
import {useSelector} from "react-redux";

// 객체형태로 스타일 적용시 리렌더링 되므로 스타일컴포넌트 적용
const SearchInput = styled(Input.Search)`
    vertical-align: middle;
`;

const AppLayout = ({ children }) => {
    const {isLoggedIn} = useSelector((state) => state.user);

    return (
        <div>
            <Menu mode="horizontal">
                <Menu.Item>
                    <Link href="/"><a>노드버드</a></Link>
                </Menu.Item>
                <Menu.Item>
                    <Link href="/profile"><a>프로필</a></Link>
                </Menu.Item>
                <Menu.Item>
                    <SearchInput enterButton />

                </Menu.Item>
                <Menu.Item>
                    <Link href="/signup"><a>회원가입</a></Link>
                </Menu.Item>
            </Menu>
            <Row gutter={8}>
                <Col xs={24} md={6}>
                    {isLoggedIn ? <UserProfile/> : <LoginForm/> }
                </Col>
                <Col xs={24} md={12}>
                    {children}
                </Col>
                <Col xs={24} md={6}>
                    <a href="https://www.zerocho.com" target="_blank" rel="noreferrer noopener">Made by MJ</a>
                </Col>
            </Row>

        </div>
    )
}

AppLayout.propTypes = {
    children: PropTypes.node.isRequired
};

export default AppLayout;