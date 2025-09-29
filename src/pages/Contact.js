import React, { useState, useRef } from 'react';
import { Container, Form, Button, Alert, Spinner } from 'react-bootstrap';

// This is the main character move:
const API_URL = process.env.NODE_ENV === 'production'
    ? 'https://ethereal-blooms-backend.onrender.com' // Your live backend URL
    : 'http://localhost:8080'; // Your local backend URL

const Contact = () => {
  const form = useRef();
  const [status, setStatus] = useState('idle'); // 'idle', 'sending', 'success', 'error'

  const sendEmail = async (e) => {
    e.preventDefault();
    setStatus('sending');

    const formData = new FormData(form.current);
    const data = {
      fromName: formData.get('from_name'),
      fromEmail: formData.get('from_email'),
      fromMobile: formData.get('from_mobile'),
      message: formData.get('message')
    };

    try {
      const response = await fetch(`${API_URL}/api/send-email`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        setStatus('success');
        form.current.reset();
      } else {
        setStatus('error');
      }
    } catch (error) {
      console.error('Error sending email:', error);
      setStatus('error');
    }
  };
  
  return (
    <Container className="my-5">
      <div className="glass-card">
        <h2 className="text-center">Plan Your Perfect Day</h2>
        <p className="text-center mb-4">Fill out the form below and we'll be in touch shortly!</p>
        
        <Form ref={form} onSubmit={sendEmail}>
          <Form.Group className="mb-3" controlId="formFromName">
            <Form.Label>Full Name</Form.Label>
            <Form.Control type="text" name="from_name" required />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formFromEmail">
            <Form.Label>Email Address</Form.Label>
            <Form.Control type="email" name="from_email" required />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formFromMobile">
            <Form.Label>Mobile Number</Form.Label>
            <Form.Control type="tel" name="from_mobile" required />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formMessage">
            <Form.Label>Your Message</Form.Label>
            <Form.Control as="textarea" rows={5} name="message" required />
          </Form.Group>
          
          <div className="d-grid">
            <Button type="submit" className="btn-custom" disabled={status === 'sending'}>
              {status === 'sending' ? (
                <>
                  <Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true" />
                  {' '}Sending...
                </>
              ) : (
                'Send Inquiry'
              )}
            </Button>
          </div>
        </Form>
        
        {status === 'success' && (
          <Alert variant="success" className="mt-4">
            Message sent successfully! We will get back to you soon.
          </Alert>
        )}
        {status === 'error' && (
          <Alert variant="danger" className="mt-4">
            Something went wrong. Please try again later.
          </Alert>
        )}
      </div>
    </Container>
  );
};

export default Contact;

