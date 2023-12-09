import React from 'react';
import styled from 'styled-components';
import 'mdb-react-ui-kit/dist/css/mdb.min.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import { Link } from 'react-router-dom';
import Icon from "../../images/logo.png";

import {
  MDBInput,
  MDBCol,
  MDBRow,
  MDBCheckbox,
  MDBBtn,
  MDBIcon
} from 'mdb-react-ui-kit';

const Container = styled.div`
  height: 100vh; /* Set the height to 100% of the viewport height */                                        
  display: flex;
  justify-content: center;
  align-items: center;
`;

const LoginContainer = styled.div`
  width: 300px; /* Adjust the width as needed */
`;
const Logo = styled.div`
  text-align: center;
  margin-bottom: 20px;
`;

const   LoginHeading = styled.h3`
  text-align: center;
  margin-bottom: 20px;
`;

export default function Login() {
  return (

    <Container>
      <LoginContainer>
      <Logo>
          <img
            src={Icon} 
            alt="ReadRover Logo"
            style={{ width: '40px', height: '40px', borderRadius: '50%' }}
          />
        </Logo>
        < LoginHeading>Login</ LoginHeading>
        <form>
          <MDBInput className='mb-4' type='email' id='form2Example1' label='Email address' />
          <MDBInput className='mb-4' type='password' id='form2Example2' label='Password' />

          <MDBRow className='mb-4'>
            <MDBCol className='d-flex justify-content-center'>
              <MDBCheckbox id='form2Example3' label='Remember me' defaultChecked />
            </MDBCol>
            <MDBCol>
              <a href='#!'>Forgot password?</a>
            </MDBCol>
          </MDBRow>

          <MDBBtn type='submit' className='mb-4' block>
            Sign in
          </MDBBtn>

          <div className='text-center'>
            <p>
              Not a member?  <Link to="/register">register</Link>
            </p>
            <p>or sign up with:</p>

            <MDBBtn floating color="secondary" className='mx-1'>
              <MDBIcon fab icon='facebook-f' />
            </MDBBtn>

            <MDBBtn floating color="secondary" className='mx-1'>
              <MDBIcon fab icon='google' />
            </MDBBtn>

            <MDBBtn floating color="secondary" className='mx-1'>
              <MDBIcon fab icon='twitter' />
            </MDBBtn>

            <MDBBtn floating color="secondary" className='mx-1'>
              <MDBIcon fab icon='github' />
            </MDBBtn>
          </div>
        </form>
      </LoginContainer>
    </Container>

    
  );
}
