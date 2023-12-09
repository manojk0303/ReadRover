import React,{useState} from 'react';
import styled from 'styled-components';
import 'mdb-react-ui-kit/dist/css/mdb.min.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import { Link,useNavigate } from 'react-router-dom';
import Icon from "../../images/logo.png";
import axios from 'axios';

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

    let apiUrl = "http://localhost:5000/api";
  const [email,setEmail] = useState("");
  const [password,setPassword] = useState("")
  const navigate = useNavigate(); 


    const handleLogin = async (event) => {
      event.preventDefault()
        try {
          const response = await axios.post(`${apiUrl}/login`, { email, password });
          const token = response.data.token;
          if (token) {
            localStorage.setItem('jwt', token);
            navigate('/');
          } else {
            alert('Wrong email or password');
          }
          
        } catch (error) {
          console.error('Error during login:', error);
          alert('Wrong Email or password');
        }
      };
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
        <LoginHeading>Login</LoginHeading>
        <form>
          <MDBInput className='mb-4' type='email' id='form2Example1' label='Email address' value={email} onChange={e=>setEmail(e.target.value)} />
          <MDBInput className='mb-4' type='password' id='form2Example2' label='Password' value={password} onChange={e=>setPassword(e.target.value)}/>

          <MDBRow className='mb-4'>
            <MDBCol className='d-flex justify-content-center'>
              <MDBCheckbox id='form2Example3' label='Remember me' defaultChecked />
            </MDBCol>
            <MDBCol>
              <a href='#!'>Forgot password?</a>
            </MDBCol>
          </MDBRow>

          <MDBBtn type='submit' onClick={handleLogin} className='mb-4' block>
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
