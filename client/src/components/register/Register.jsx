import React from 'react';
import {
  MDBInput,
  MDBCol,
  MDBRow,
  MDBCheckbox,
  MDBBtn,
  MDBIcon
} from 'mdb-react-ui-kit';
import styled from 'styled-components';
import Icon from "../../images/logo.png";
const Container = styled.div`
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const LoginContainer = styled.div`
  width: 400px;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
`;

const Logo = styled.div`
  text-align: center;
  margin-bottom: 20px;
`;

const RegisterHeading = styled.h3`
  text-align: center;
  margin-bottom: 20px;
`;

export default function Register() {
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
        <RegisterHeading>Register</RegisterHeading>
        <form>
        
        <MDBRow className='mb-4'>
            <MDBCol>
            <MDBInput id='form3Example1' label='First name' />
            </MDBCol>
            <MDBCol>
            <MDBInput id='form3Example2' label='Last name' />
            </MDBCol>
        </MDBRow>
        <MDBInput className='mb-4' type='email' id='form3Example3' label='Email address' />
        <MDBInput className='mb-4' type='password' id='form3Example4' label='Password' />

        <MDBCheckbox
            wrapperClass='d-flex justify-content-center mb-4'
            id='form3Example5'
            label='Subscribe to our newsletter'
            defaultChecked
        />

        <MDBBtn type='submit' className='mb-4' block>
            Sign up
        </MDBBtn>

        <div className='text-center'>
            <p>
            Already a member? <a href='/login'>Login</a>
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
