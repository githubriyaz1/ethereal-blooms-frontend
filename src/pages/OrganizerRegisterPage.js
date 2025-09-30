import React, { useState } from 'react';
import { Form, Button, Container, Alert, Spinner } from 'react-bootstrap';
import { db, auth } from '../firebase';
import { doc, setDoc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';

const OrganizerRegisterPage = () => {
    const [profile, setProfile] = useState({
        name: '',
        location: '',
        priceRange: '',
        bio: '',
        imageUrl: '' // Changed from profilePic to imageUrl
    });
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleChange = (e) => {
        setProfile({ ...profile, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        const user = auth.currentUser;
        if (!user) {
            setError('You must be logged in to create a profile.');
            setLoading(false);
            return;
        }

        try {
            // We just save the URL directly to Firestore now
            const organizerProfile = {
                ...profile,
                userId: user.uid,
                userEmail: user.email
            };

            await setDoc(doc(db, "organizers", user.uid), organizerProfile);
            setLoading(false);
            alert('Profile created successfully!');
            navigate('/organizers');
        } catch (err) {
            setError('Failed to create profile. Please try again.');
            console.error(err);
            setLoading(false);
        }
    };

    return (
        <Container className="my-5">
            <div className="glass-card">
                <h2 className="text-center mb-4">Create Your Decorator Profile</h2>
                {error && <Alert variant="danger">{error}</Alert>}
                <Form onSubmit={handleSubmit}>
                    {/* ... other form groups for name, location, etc. ... */}

                    {/* THIS IS THE GLOW-UP: A text field for an image URL */}
                    <Form.Group className="mb-3">
                        <Form.Label>Profile Picture URL</Form.Label>
                        <Form.Control 
                            type="text" 
                            name="imageUrl"
                            placeholder="https://imgur.com/your-image-url.jpg"
                            value={profile.imageUrl}
                            onChange={handleChange}
                            required
                        />
                        <Form.Text className="text-muted">
                            Upload your picture to a site like Imgur and paste the direct link here.
                        </Form.Text>
                    </Form.Group>

                    <div className="d-grid">
                        <Button className="btn-custom" type="submit" disabled={loading}>
                            {loading ? <Spinner animation="border" size="sm" /> : 'Create Profile'}
                        </Button>
                    </div>
                </Form>
            </div>
        </Container>
    );
};

export default OrganizerRegisterPage;

