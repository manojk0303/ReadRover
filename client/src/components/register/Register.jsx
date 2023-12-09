import React,{useState} from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
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

const LoginContainer = styled.form`
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
  let apiUrl = "http://localhost:5000/api";

  const [fname,setFName] = useState("");
  const [lname,setLName] = useState("");
  const [email,setEmail] = useState("");
  const [password,setPassword] = useState("");

  
  const navigate = useNavigate(); 
  const handleRegister = async (event) => {
    event.preventDefault()
        try {
          let name = fname + " " + lname;
          const response = await axios.post(`${apiUrl}/register`, { name, email, password });
          console.log(response.data.token)
          if (response.data.token){
            localStorage.setItem('jwt', response.data.token);
            navigate('/');
        }
        } catch (error) {
          if (error.response.status === 409) {
            alert('Email already exists');
          } else {
            console.error('Error during registration:', error);
            alert('Registration failed');
          }
        }
      };

  return (
    <Container onSubmit={handleRegister}>
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
            <MDBInput id='form3Example1' label='First name' value={fname} onChange={(e)=>setFName(e.target.value)} />
            </MDBCol>
            <MDBCol>
            <MDBInput id='form3Example2' label='Last name' value={lname} onChange={(e)=>setLName(e.target.value)} />
            </MDBCol>
        </MDBRow>
        <MDBInput className='mb-4' type='email' id='form3Example3' value={email} label='Email address' onChange={(e)=>setEmail(e.target.value)} />
        <MDBInput className='mb-4' type='password' id='form3Example4' value={password} label='Password' onChange={(e)=>setPassword(e.target.value)}/>

        <MDBCheckbox
            wrapperClass='d-flex justify-content-center mb-4'
            id='form3Example5'
            label='Subscribe to our newsletter'
            defaultChecked
        />

        <MDBBtn  type='submit' onClick={handleRegister} className='mb-4' block>
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
