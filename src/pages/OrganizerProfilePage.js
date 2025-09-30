import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Spinner, Button } from 'react-bootstrap';
import { useParams, Link } from 'react-router-dom';
import { db } from '../firebase';
import { doc, getDoc } from 'firebase/firestore';

const OrganizerProfilePage = () => {
    const { id } = useParams(); // Gets the decorator's ID from the URL
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
                    <Card className="glass-card">
                        <Row>
                            <Col md={4}>
                                <Card.Img 
                                    src={organizer.imageUrl || 'https://placehold.co/400x400/f8c8dc/444?text=No+Image'} 
                                    className="rounded-circle"
                                />
                            </Col>
                            <Col md={8}>
                                <Card.Body>
                                    <Card.Title as="h1">{organizer.name}</Card.Title>
                                    <Card.Subtitle className="mb-3 text-muted">{organizer.location}</Card.Subtitle>
                                    <Card.Text><strong>Price Range:</strong> {organizer.priceRange}</Card.Text>
                                    <Card.Text>{organizer.bio}</Card.Text>
                                    <Button href={`mailto:${organizer.userEmail}`} className="btn-custom">Contact Organizer</Button>
                                </Card.Body>
                            </Col>
                        </Row>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
};

export default OrganizerProfilePage;

