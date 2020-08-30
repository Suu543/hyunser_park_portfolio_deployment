/* eslint-disable */
import React, { useEffect, useState } from "react";
import { readImages } from "../actions/image";
import { contactEmailFromClient } from "../actions/contact";
import {
  Container,
  SliderWrapper,
  IntroductionWrapper,
  IntroductionContent,
  IntroductionSizeWrapper,
  IntroductionSizeTitle,
  CentiInchButtonWrapper,
  CentimeterButton,
  InchButton,
  IntroductionSizeCmWrapper,
  IntroductionSizeInchWrapper,
  IntroductionAboutMeWrapper,
  CategoryTitle,
  CategoryContainer,
  CategoryWrapper,
  CategoryCard,
  Thumb,
  SayingContainer,
  SayingWrapper,
  Contact,
  ContactMultiPurposeWrapper,
  ContactTitle,
  ContactSubTitle,
  ContactForm,
  ContactSocial,
} from "../styles/Home";
import AwesomeSlider from "react-awesome-slider";
import withAutoplay from "react-awesome-slider/dist/autoplay";
import "react-awesome-slider/dist/styles.css";

import { getCategories } from "../actions/category";

import Layout from "../core/Layout";
import Fade from "react-reveal/Fade";

const Home = () => {
  const AutoplaySlider = withAutoplay(AwesomeSlider);
  const [allImages, setAllImages] = useState([]);
  const [categories, setCategories] = useState([]);
  const [centimeter, setCentimeter] = useState(true);
  const [values, setValues] = useState({ email: "", buttonText: "SUBMIT" });

  const { email, buttonText } = values;

  const loadCarouselImages = async () => {
    try {
      let images = [];
      let response = await readImages();
      response.forEach((img) => {
        let imgData = {
          width: 1,
          height: 1,
        };

        imgData.src = img.image.url;
        images.push(imgData);
      });

      console.log("response", response);
      setAllImages([...images]);
    } catch (error) {
      console.log("error", error);
    }
  };

  const loadCategories = async () => {
    try {
      let response = await getCategories();
      setCategories([...categories, ...response]);
    } catch (error) {
      console.log("error", error);
    }
  };

  const appendCarouselDiv = () => {
    return allImages.map((data, index) => (
      <div key={index} data-src={data.src} />
    ));
  };

  const handleChange = (name) => (e) => {
    setValues({ ...values, [name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setValues({ ...values, buttonText: "Submitting..." });

    const data = { email };
    const response = contactEmailFromClient(data);
    if (response) {
      setValues({
        ...values,
        email: "",
        buttonText: "Submitted",
      });
    } else {
      setValues({
        ...values,
        buttonText: "Please Try Again...",
      });
    }
  };

  useEffect(() => {
    loadCategories();
    loadCarouselImages();
  }, []);

  return (
    <Layout>
      <Container>
        <SliderWrapper>
          <AutoplaySlider
            play={true}
            cancelOnInteraction={false}
            interval={3000}
          >
            {appendCarouselDiv()}
          </AutoplaySlider>
        </SliderWrapper>
        <Fade left delay={300} duration={700}>
          <IntroductionWrapper>
            <IntroductionContent>
              <IntroductionAboutMeWrapper>
                <h3>
                  <b>About Me</b>
                </h3>
                <p>
                  Hi! I am a born and bred Korean, and an international model
                  working with The YoungBloods (MA), J-Jean Artist (KR), and
                  Wilhelmina-London. Being a fashion model was a dream goal
                  since I was a child, and finally gave it a shot after Junior
                  year at the University of Wisconsin- Madison. Starting from a
                  model academy in South Korea, I worked for Seoul 365 Fashion
                  Show for 5 months, and was discovered by the international
                  modeling agency director, Roman Young. As building up my
                  portfolio, I gained a large range of experiences in fashion
                  shows and photoshoots. Because I value the meaning that my
                  works can give, I also have experienced directing to imply a
                  message beyond the work.
                </p>
              </IntroductionAboutMeWrapper>
              <IntroductionSizeWrapper>
                <IntroductionSizeTitle>
                  <b>Details</b>
                </IntroductionSizeTitle>
                <CentiInchButtonWrapper>
                  <CentimeterButton
                    centimeter={centimeter}
                    onClick={() => setCentimeter(!centimeter)}
                  >
                    CM
                  </CentimeterButton>
                  <span> / </span>
                  <InchButton
                    centimeter={centimeter}
                    onClick={() => setCentimeter(!centimeter)}
                  >
                    IN
                  </InchButton>
                </CentiInchButtonWrapper>
              </IntroductionSizeWrapper>

              <IntroductionSizeCmWrapper centimeter={centimeter}>
                <span>HEIGHT- 179.6CM</span>
                <span>BUST- 76CM</span>
                <span>WAIST- 60CM</span>
                <span>HIPS- 87CM</span>
                <span>SHOE- KR: 250mm EU: 39.5 US: 7</span>
                <span>HAIR- BLACK</span>
                <span>EYES- BROWN</span>
              </IntroductionSizeCmWrapper>
              <IntroductionSizeInchWrapper centimeter={centimeter}>
                <span>HEIGHT- 5'10½"'</span>
                <span>BUST- 29½''</span>
                <span>WAIST- 23½''</span>
                <span>HIPS- 34''</span>
                <span>SHOE- KR: 250mm EU: 39.5 US: 7</span>
                <span>HAIR- BLACK</span>
                <span>EYES- BROWN</span>
              </IntroductionSizeInchWrapper>
            </IntroductionContent>
          </IntroductionWrapper>
        </Fade>

        <Fade left delay={300} duration={700}>
          <CategoryTitle>
            <h1>
              <b>Featured</b> Portfolio
            </h1>
          </CategoryTitle>
        </Fade>

        <Fade right delay={300} duration={700}>
          <section>
            <CategoryContainer>
              {categories &&
                categories.length > 0 &&
                categories.map((c, i) => (
                  <CategoryWrapper key={i}>
                    <CategoryCard to={`/works/${c.slug}`}>
                      <Thumb url={c.image.url}></Thumb>
                      <article>
                        <h1>{c.title}</h1>
                      </article>
                    </CategoryCard>
                  </CategoryWrapper>
                ))}
            </CategoryContainer>
            <SayingContainer>
              <SayingWrapper>
                <h1>
                  “Success Consists of Going from Failure to Failure Without
                  Loss of Enthusiasm.”
                </h1>
                <h3>- Winston Churchill -</h3>
              </SayingWrapper>
            </SayingContainer>
            <Contact>
              <ContactMultiPurposeWrapper>
                <ContactTitle>For All Things Hyunser.</ContactTitle>
              </ContactMultiPurposeWrapper>
              <ContactMultiPurposeWrapper>
                <ContactSubTitle>CONTACT</ContactSubTitle>
              </ContactMultiPurposeWrapper>
              <ContactMultiPurposeWrapper>
                <ContactForm onSubmit={handleSubmit}>
                  <input
                    value={email}
                    onChange={handleChange("email")}
                    type="email"
                    placeholder="Email Address"
                    required
                  />
                  <button>{buttonText}</button>
                </ContactForm>
              </ContactMultiPurposeWrapper>
              <br />
              <ContactSocial>
                <a
                  href="https://www.instagram.com/hyunseo_59/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <i className="fab fa-instagram" />
                </a>
              </ContactSocial>
            </Contact>
          </section>
        </Fade>
      </Container>
    </Layout>
  );
};

export default Home;
