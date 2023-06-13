import styled from "styled-components"
import Input from "@/components/Input";
import StarsRating from "@/components/StarsRating";
import Textarea from "@/components/Textarea";
import Button from "@/components/Button";
import axios from "axios";
import Spinner from "@/components/Spinner";
import { useEffect, useState } from "react";
import WhiteBox from "@/components/WhiteBox";
import { useSession } from "next-auth/react";

const Title = styled.h2`
  font-size:1.2rem;
  margin-bottom:5px;
`;
const Subtitle = styled.h3`
  font-size: 1rem;
  margin-top: 5px;
`;
const ColsWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 20px;
  margin-bottom: 40px;
  @media screen and (min-width: 768px) {
    grid-template-columns: 1fr 1fr;
    gap: 40px;
  }
`;
const ReviewWrapper = styled.div`
  margin-bottom: 10px;
  border-top: 1px solid #eee;
  padding: 10px 0;
  h3{
    margin:3px 0;
    font-size:1rem;
    color:#333;
    font-weight: normal;
  }
  p{
    margin:0;
    font-size: .7rem;
    line-height: 1rem;
    color:#555;
  }
`;
const ReviewHeader = styled.div`
  display: flex;
  justify-content: space-between;
  time{
    font-size: 12px;
    color: #aaa;
  }
`;


const ProductReviews = ({ product }) => {
    const [title, setTitle] = useState('');
    const {data: session } = useSession();
    const [description, setDescription] = useState('');
    const [stars, setStars] = useState(0);
    const [reviews, setReviews] = useState([]);
    const [reviewsLoading, setReviewsLoading] = useState(false);
    const [isReviewer, setIsReviewer] = useState(false);
    const submitReview = () => {
        const data = { title, description, stars, product: product._id, user: session.user };
        axios.post('/api/reviews', data).then(res => {
            setTitle('');
            setDescription('');
            setStars(0);
            loadReviews();
        });
    }
    useEffect(() => {
        loadReviews();
    }, []);
    const loadReviews = () => {
        setReviewsLoading(true);
        axios.get('/api/reviews?product=' + product._id).then(res => {
            setReviews(res.data);
            setReviewsLoading(false);
        });
        axios.get('/api/tools/orderbyproducts?user='+
        session?.user?.email+'&product='+product._id).then(res => {
            // console.log(session);
            if(res.data.length>0){
                setIsReviewer(true);
            }
        });
    }
    return (
        <div>
            <Title>Reviews</Title>
            <ColsWrapper >
                {isReviewer && (<div>
                    <WhiteBox>
                        <Subtitle>Add a review</Subtitle>
                        <div>
                            <StarsRating onChange={setStars} />
                        </div>
                        <Input
                            value={title}
                            onChange={ev => setTitle(ev.target.value)}
                            placeholder="Title" />
                        <Textarea
                            value={description}
                            onChange={ev => setDescription(ev.target.value)}
                            placeholder="Was it good? " />
                        <div>
                            <Button primary onClick={submitReview}>Submit your review</Button>
                        </div>
                    </WhiteBox>
                </div>)}
                <div>
                    <WhiteBox>
                        <Subtitle>All reviews</Subtitle>
                        {reviewsLoading && (
                            <Spinner fullWidth={true} />
                        )}
                        {reviews.length === 0 && (
                            <p>No reviews </p>
                        )}
                        {reviews.length > 0 && reviews.map(review => (
                            <ReviewWrapper key={review._id}>
                                <ReviewHeader>
                                    <StarsRating size={'sm'} disabled={true} defaultHowMany={review.stars} />
                                    
                                    <time><span><i >{review.user.name}</i></span> {(new Date(review.createdAt)).toLocaleString('sv-SE')}</time>
                                </ReviewHeader>
                                <h3>{review.title}</h3>
                                <p>{review.description}</p>
                                <p></p>
                            </ReviewWrapper>
                        ))}
                    </WhiteBox>
                </div>
            </ColsWrapper>
        </div>
    )
}

export default ProductReviews