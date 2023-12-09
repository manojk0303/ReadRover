import React from 'react';
import styled from 'styled-components';
import Icon from "../../images/logo.png";
import { Link } from 'react-router-dom';
const Container = styled.div`
  background-color: BLACK;
  padding: 15px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;


const Logo = styled.div`
  text-align: center;
  margin-bottom: 20px;
  background-color: white;
  padding: 5px;
  border-radius: 50%;
`;

const LogoutButton = styled.button`
  background-color: transparent;
  color: white;
  border: none;
  cursor: pointer;
  font-size: 16px;
  margin-left: 20px;
`;

const Navbar = ({ onLogout }) => {
  return (
    <Container>
        <Link to="/">
      <Logo>
          <img
            src={Icon} 
            alt="ReadRover Logo"
            style={{ width: '40px', height: '40px', borderRadius: '50%' }}
          />
        </Logo>
        </Link>
      <LogoutButton onClick={onLogout}>Logout</LogoutButton>
    </Container>
  );
};

export default Navbar;
