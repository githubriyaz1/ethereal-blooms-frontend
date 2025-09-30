import React, { useState } from 'react';
import { Form, Button, Container, Alert } from 'react-bootstrap';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth, db } from '../firebase'; // Import db as well
import { doc, setDoc } from 'firebase/firestore'; // Import doc and setDoc
import { useNavigate } from 'react-router-dom';

const SignupPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [userType, setUserType] = useState('client');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSignup = async (e) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            return setError("Passwords do not match");
        }
        setError('');
        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;

            await setDoc(doc(db, "users", user.uid), {
                email: user.email,
                role: userType
            });

            if (userType === 'decorator') {
                navigate('/organizer-register');
            } else {
                navigate('/');
            }
        } catch (err) {
            setError('Failed to create an account. The email may already be in use.');
            console.error(err);
        }
    };

    return (
        <Container className="my-5">
            <div className="glass-card">
                <h2 className="text-center mb-4">Sign Up</h2>
                {error && <Alert variant="danger">{error}</Alert>}
                <Form onSubmit={handleSignup}>
                    
                    {/* THIS IS THE GLOW-UP: The missing form fields */}
                    <Form.Group className="mb-3" controlId="formSignupEmail">
                        <Form.Label>Email address</Form.Label>
                        <Form.Control type="email" placeholder="Enter email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formSignupPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formConfirmPassword">
                        <Form.Label>Confirm Password</Form.Label>
                        <Form.Control type="password" placeholder="Confirm Password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required />
                    </Form.Group>
                    
                    <Form.Group className="mb-3">
                        <Form.Label>I am a...</Form.Label>
                        <div className="d-flex">
                            <Form.Check
                                type="radio"
                                label="Client"
                                name="userType"
                                id="client-radio"
                                value="client"
                                checked={userType === 'client'}
                                onChange={(e) => setUserType(e.target.value)}
                                className="me-3"
                            />
                            <Form.Check
                                type="radio"
                                label="Decorator"
                                name="userType"
                                id="decorator-radio"
                                value="decorator"
                                checked={userType === 'decorator'}
                                onChange={(e) => setUserType(e.target.value)}
                            />
                        </div>
                    </Form.Group>

                    <div className="d-grid">
                        <Button className="btn-custom" type="submit">
                            Sign Up
                        </Button>
                    </div>
                </Form>
            </div>
        </Container>
    );
};

export default SignupPage;

