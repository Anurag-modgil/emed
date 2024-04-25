import React from "react";
import {
  Typography,
  Button,
  Card,
  CardContent,
  List,
  ListItem,
  Box,
  Backdrop,
} from "@mui/material";
import { Link } from "react-router-dom";
import AliceCarousel from "react-alice-carousel";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { useRef, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { findProducts } from "../../../Redux/Customers/Product/Action";
import HomeSectionCard from "../../components/homesectioncard/HomeSectionCard";

const styles = {
  card: {
    margin: "20px auto",
    padding: "20px",
    maxWidth: "800px",
    backgroundColor: "#f5f5f5",
  },
  title: {
    marginBottom: "20px",
  },
  bodyText: {
    marginBottom: "10px",
  },
  list: {
    marginBottom: "20px",
  },
  button: {
    marginTop: "20px",
  },
};

const Labtest = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const jwt = localStorage.getItem("jwt");
  const param = useParams();
  const { customersProduct } = useSelector((store) => store);
  const location = useLocation();
  const [isLoaderOpen, setIsLoaderOpen] = useState(false);

  const handleLoderClose = () => {
    setIsLoaderOpen(false);
  };

  // const filter = decodeURIComponent(location.search);
  const decodedQueryString = decodeURIComponent(location.search);
  const searchParams = new URLSearchParams(decodedQueryString);
  const price = searchParams.get("price");
  const disccount = searchParams.get("disccout");
  const stock = searchParams.get("stock");

  // console.log("location - ", colorValue, sizeValue,price,disccount);

  useEffect(() => {
    const [minPrice, maxPrice] =
      price === null ? [0, 0] : price.split("-").map(Number);
    const data = {
      minPrice: minPrice || 0,
      maxPrice: maxPrice || 10000,
      minDiscount: disccount || 0,
      stock: stock,
    };
    dispatch(findProducts(data));
  }, [price, disccount, stock]);

  useEffect(() => {
    if (customersProduct.loading) {
      setIsLoaderOpen(true);
    } else {
      setIsLoaderOpen(false);
    }
  }, [customersProduct.loading]);

  const carouselRef = useRef();
  const [activeIndex, setActiveIndex] = useState(0);

  const slidePrev = () => {
    setActiveIndex(activeIndex - 1);
    carouselRef.current.slidePrev();
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"  // for smooth scrolling
    });
  };

  const slideNext = () => {
    setActiveIndex(activeIndex + 1);
    carouselRef.current.slideNext();
  };

  const syncActiveIndex = ({ item }) => setActiveIndex(item);

  const responsive = {
    0: { items: 2 },
    568: { items: 3 },
    1024: { items: 4 },
  };

  const items = customersProduct.products?.content
    ?.slice(0, 6)
    .map((item) => <HomeSectionCard product={item} />);

  return (
    <div>
      <div className="relative px-4 sm:px-6 lg:px-8 ">
        <div className="relative border bg-[#d4e2fa] rounded-xl p-5">
          <AliceCarousel
            ref={carouselRef}
            disableButtonsControls
            disableDotsControls
            mouseTracking
            items={items}
            responsive={responsive}
            onSlideChanged={syncActiveIndex}
          />
          {activeIndex !== items - 4 && (
            <Button
              onClick={slideNext}
              variant="contained"
              className="z-50 bg-white rounded-md"
              sx={{
                position: "absolute",
                top: "50%",
                right: "0",
                transform: "translate(50%, -50%) rotate(90deg)",
              }}
              color="secondary"
              aria-label="next"
            >
              <ArrowForwardIosIcon sx={{ transform: "rotate(-90deg)" }} />
            </Button>
          )}
          {activeIndex !== 0 && (
            <Button
              onClick={slidePrev}
              variant="contained"
              className="z-50 bg-white"
              color="secondary"
              sx={{
                position: "absolute",
                top: "50%",
                left: "0",
                transform: "translate(-50%, -50%) rotate(90deg)",
              }}
              aria-label="previous"
            >
              <ArrowForwardIosIcon sx={{ transform: "rotate(90deg)" }} />
            </Button>
          )}
        </div>
      </div>
      <Card style={styles.card}>
        <CardContent>
          <Typography variant="h4" style={styles.title}>
            The (Pharm)Easy Way To Book Lab Tests Online
          </Typography>
          <Typography variant="body1" style={styles.bodyText}>
            Book Diagnostics Lab Test Online. Get doorstep sample collection.
            Lab Test Booking Made Simple. One of the most popular services
            PharmEasy offers is diagnostic testing. People need to book
            pathological tests for many reasons. But before booking, they wonder
            if the diagnostic centre can be trusted to produce accurate results
            and how long they might have to wait in a queue to get tested. To
            bypass these hassles, PharmEasy has set up an extensive network of
            reputed pathological laboratories in India. One such lab is
            Thyrocare. With Thyrocare on board, we can give you access to a wide
            network of diagnostic laboratories. We also offer a home collection
            of samples as well. Bid adieu to anxious days of wondering where to
            book diagnostic tests and embrace the PharmEasy way.
          </Typography>
          <Typography variant="h5" style={styles.title}>
            Lab tests at your doorstep
          </Typography>
          <Typography variant="body1" style={styles.bodyText}>
            To ease your anxieties, PharmEasy offers the facility of doorstep
            collection. The technician will come to your house to collect
            samples. And all safety precautions are maintained. A fresh
            collection kit and/or needle will be used so that there is no
            contamination of samples of the spread of diseases. We use special
            ice boxes that meet NABL guidelines to transport your samples. The
            reports will be sent to you online. That means you won’t have to
            travel to the diagnostic lab to collect your reports.
          </Typography>
          <Typography variant="h5" style={styles.title}>
            How can you book diagnostic tests online?
          </Typography>
          <Typography variant="body1" style={styles.bodyText}>
            Booking a test on PharmEasy is simple:
          </Typography>
          <List style={styles.list}>
            <ListItem>
              Visit{" "}
              <Link to="https://pharmeasy.in/diagnostics">
                pharmeasy.in/diagnostics
              </Link>{" "}
              or click on Lab Tests on the PharmEasy website or app.
            </ListItem>
            <ListItem>
              Alternatively, you can call our customer service team on{" "}
              <Link to="tel:7022000900">7022000900</Link> and they will make the
              booking for you.
            </ListItem>
          </List>
          <Typography variant="body1" style={styles.bodyText}>
            Looking to book a pathology test? Here’s how PharmEasy can help!
            Online diagnostic tests work as smoothly as clockwork. Once you’ve
            booked the pathology test you need with the diagnostic centre you
            prefer, you will get a confirmation on your registered e-mail id and
            SMS. The backend support team might also call you to confirm the
            booking. Post this our expert technician will arrive at your place
            at the selected slot and collect your sample for processing at our
            state of the art labs. Reports will be shared with you over SMS and
            will also be available in your account on app/web.
          </Typography>
          <Typography variant="h5" style={styles.title}>
            Why choose PharmEasy to book lab tests?
          </Typography>
          <List style={styles.list}>
            <ListItem>2 Lac+ happy customers</ListItem>
            <ListItem>Safe home sample collection</ListItem>
            <ListItem>Up to 70% OFF</ListItem>
            <ListItem>Certified & 100% Automated labs</ListItem>
            <ListItem>Timely and accurate reports</ListItem>
            <ListItem>500+ tests and health packs to choose from</ListItem>
          </List>
          <Typography variant="body1" style={styles.bodyText}>
            Now that you know why PharmEasy can be your trusted diagnostic test
            booking partner, don’t wait, download the PharmEasy app today and
            book a health check right away.
          </Typography>
          <Button
            variant="contained"
            color="primary"
            style={styles.button}
           onClick={scrollToTop}
          >
            Book a Test
          </Button>
        </CardContent>
      </Card>
      
    </div>
  );
};

export default Labtest;
