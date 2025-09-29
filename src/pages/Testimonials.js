import React, { useState, useEffect } from 'react';
import { Container } from 'react-bootstrap';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { Pagination, Navigation, Autoplay } from 'swiper/modules';
import { db } from '../firebase'; // Import your Firebase db
import { collection, query, orderBy, onSnapshot } from 'firebase/firestore';
import './Testimonials.css';

const Testimonials = () => {
    // This state will hold the reviews from your database
    const [reviews, setReviews] = useState([]);
    const [loading, setLoading] = useState(true);

    // This is the glow-up: Fetch reviews in real-time
    useEffect(() => {
        const reviewsCollection = collection(db, "reviews");
        const q = query(reviewsCollection, orderBy("createdAt", "desc"));

        const unsubscribe = onSnapshot(q, (querySnapshot) => {
            const reviewsData = [];
            querySnapshot.forEach((doc) => {
                reviewsData.push({ ...doc.data(), id: doc.id });
            });
            setReviews(reviewsData);
            setLoading(false);
        });

        // Cleanup the listener when the component unmounts
        return () => unsubscribe();
    }, []);

    return (
        <div className="testimonials-section">
            <Container>
                <h2 className="text-center">What Our Clients Say</h2>
                {loading ? (
                    <p className="text-center">Loading testimonials...</p>
                ) : (
                    <Swiper
                        slidesPerView={1}
                        spaceBetween={30}
                        loop={true}
                        autoplay={{ delay: 5000, disableOnInteraction: false }}
                        pagination={{ clickable: true }}
                        navigation={true}
                        modules={[Pagination, Navigation, Autoplay]}
                        className="mySwiper"
                    >
                        {reviews.map((review) => (
                            <SwiperSlide key={review.id}>
                                <div className="testimonial-content">
                                    <p className="quote">"{review.quote}"</p>
                                    <p className="author">- {review.name}, {review.event}</p>
                                </div>
                            </SwiperSlide>
                        ))}
                    </Swiper>
                )}
            </Container>
        </div>
    );
};

export default Testimonials;

