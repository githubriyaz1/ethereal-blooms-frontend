import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Spinner, Button } from 'react-bootstrap';
import { useParams, Link } from 'react-router-dom';
import { db } from '../firebase';
import { doc, getDoc } from 'firebase/firestore';
import { FaStar } from 'react-icons/fa';

// Star Rating Component - it's giving ✨ aesthetic ✨
const StarRating = ({ rating }) => {
    const stars = [];
    for (let i = 0; i < 5; i++) {
        stars.push(
            <FaStar key={i} color={i < rating ? "#ffc107" : "#e4e5e9"} size={20} />
        );
    }
    return <div className="mb-3">{stars}</div>;
};

const OrganizerProfilePage = () => {
    const { id } = useParams();
    const [organizer, setOrganizer] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchOrganizer = async () => {
            setLoading(true);
            try {
                const docRef = doc(db, "organizers", id);
                const docSnap = await getDoc(docRef);

                if (docSnap.exists()) {
                    setOrganizer(docSnap.data());
                } else {
                    console.log("No such document!");
                }
            } catch (error) {
                console.error("Error fetching organizer profile: ", error);
            }
            setLoading(false);
        };

        if (id) {
            fetchOrganizer();
        }
    }, [id]);

    if (loading) {
        return (
            <Container className="text-center my-5">
                <Spinner animation="border" variant="light" />
            </Container>
        );
    }

    if (!organizer) {
        return (
            <Container className="text-center my-5">
                <h2 className="heading">Profile Not Found</h2>
                <Button as={Link} to="/organizers" className="btn-custom mt-3">Back to List</Button>
            </Container>
        );
    }

    return (
        <Container className="my-5">
            <Row className="justify-content-center">
                <Col md={8}>
                    <Card className="glass-card text-center">
                        <Card.Img 
                            src={organizer.imageUrl || 'https://placehold.co/400x400/f8c8dc/444?text=No+Image'} 
                            className="rounded-circle mx-auto mt-3"
                            style={{ width: '150px', height: '150px', objectFit: 'cover' }}
                        />
                        <Card.Body>
                            <Card.Title as="h1">{organizer.name}</Card.Title>
                            <Card.Subtitle className="mb-3 text-muted">{organizer.location}</Card.Subtitle>
                            <StarRating rating={organizer.rating} />
                            
                            <Card.Text className="text-start"><strong>About Me:</strong> {organizer.bio}</Card.Text>
                            <Card.Text className="text-start"><strong>Packages:</strong> {organizer.packages}</Card.Text>
                            <Card.Text className="text-start"><strong>Price Range:</strong> {organizer.priceRange}</Card.Text>
                            
                            <hr />
                            
                            <Button href={`mailto:${organizer.userEmail}`} className="btn-custom m-2">Email Me</Button>
                            <Button href={`tel:${organizer.phoneNumber}`} className="btn-custom m-2">Call Me</Button>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
};

export default OrganizerProfilePage;

