import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Button, Spinner } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { db } from '../firebase';
import { collection, getDocs } from 'firebase/firestore';

const OrganizersListPage = () => {
    const [organizers, setOrganizers] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchOrganizers = async () => {
            setLoading(true);
            try {
                const querySnapshot = await getDocs(collection(db, "organizers"));
                const organizersList = querySnapshot.docs.map(doc => ({
                    id: doc.id,
                    ...doc.data()
                }));
                setOrganizers(organizersList);
            } catch (error) {
                console.error("Error fetching organizers: ", error);
            }
            setLoading(false);
        };

        fetchOrganizers();
    }, []);

    if (loading) {
        return (
            <Container className="text-center my-5">
                <Spinner animation="border" variant="light" />
                <p className="heading mt-2">Loading Decorators...</p>
            </Container>
        );
    }

    return (
        <Container className="my-5">
            <h2 className="text-center heading mb-4">Find Your Perfect Decorator</h2>
            <Row className="g-4">
                {organizers.length > 0 ? (
                    organizers.map(org => (
                        <Col md={6} lg={4} key={org.id}>
                            <Card className="service-card h-100">
                                <Card.Img 
                                    variant="top" 
                                    src={org.imageUrl || 'https://placehold.co/600x400/f8c8dc/444?text=No+Image'} 
                                    className="service-card-image" 
                                />
                                <Card.Body className="d-flex flex-column">
                                    <Card.Title as="h3">{org.name}</Card.Title>
                                    <Card.Subtitle className="mb-2 text-muted">{org.location}</Card.Subtitle>
                                    <Card.Text className="flex-grow-1">
                                        {org.bio.substring(0, 100)}...
                                    </Card.Text>
                                    <Button as={Link} to={`/organizer/${org.id}`} className="btn-custom mt-auto">
                                        View Profile
                                    </Button>
                                </Card.Body>
                            </Card>
                        </Col>
                    ))
                ) : (
                    <Col>
                        <p className="text-center heading">No decorators have registered yet. Be the first!</p>
                    </Col>
                )}
            </Row>
        </Container>
    );
};

export default OrganizersListPage;

