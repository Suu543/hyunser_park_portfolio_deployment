import React, { useState } from "react";
import { contactFromClient } from "../../actions/contact";
import {
  ContactContainer,
  ContactPageTitle,
  ContactPageSubTitle,
  ContactMain,
  ContactMainLeft,
  ContactMainLeftTitle,
  ContactMainLeftContent,
  ContactMainLeftContactTitle,
  ContactMainLeftContactList,
  ContactMainRight,
  ContactFormWrapper,
  ContactMainRightInput,
  ContactMainRightTextArea,
  ContactMainRightSubmitButton,
  HomeLogoWrapper,
  HomeLogo,
} from "../../styles/ContactPage";

const ContactPage = () => {
  const [values, setValues] = useState({
    name: "",
    email: "",
    message: "",
    buttonText: "SUBMIT",
  });

  const { name, email, message, buttonText } = values;

  const handleChange = (name) => (e) => {
    setValues({ ...values, [name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setValues({ ...values, buttonText: "Submitting..." });

    const data = { name, email, message };
    const response = contactFromClient(data);

    if (response) {
      setValues({
        ...values,
        name: "",
        email: "",
        message: "",
        buttonText: "Submitted",
      });
    } else {
      setValues({
        ...values,
        buttonText: "Please Try Again...",
      });
    }
  };

  return (
    <ContactContainer>
      <HomeLogoWrapper>
        <HomeLogo to="/">Hyunser Park</HomeLogo>
      </HomeLogoWrapper>
      <ContactPageTitle>CONTACT</ContactPageTitle>
      <ContactPageSubTitle>GET IN TOUCH</ContactPageSubTitle>
      <ContactMain>
        <ContactMainLeft>
          <ContactMainLeftTitle>Agencies Contacts</ContactMainLeftTitle>
          <ContactMainLeftContent>
            <ContactMainLeftContactTitle>
              INTERNATIONAL: <br /> <i>The YoungBloods (MA)</i>
            </ContactMainLeftContactTitle>
            <ContactMainLeftContactList>
              <li>romanyoung@gmail.com</li>
              <li>nycbcg@gmail.com</li>
            </ContactMainLeftContactList>
          </ContactMainLeftContent>
          <ContactMainLeftContent>
            <ContactMainLeftContactTitle>
              KOREA: <i>J-Jean Artist</i>
            </ContactMainLeftContactTitle>
            <ContactMainLeftContactList>
              <li>jjeanartist@naver.com</li>
            </ContactMainLeftContactList>
          </ContactMainLeftContent>
          <ContactMainLeftContent>
            <ContactMainLeftContactTitle>
              U.K: <i>Wilhemina London</i>
            </ContactMainLeftContactTitle>
            <ContactMainLeftContactList>
              <li>Victoria.Rich@wilhelmina.com</li>
              <li>jordan.shiel@wilhelmina.com</li>
            </ContactMainLeftContactList>
          </ContactMainLeftContent>
        </ContactMainLeft>
        <ContactMainRight>
          <ContactFormWrapper onSubmit={handleSubmit}>
            <ContactMainRightInput
              value={name}
              onChange={handleChange("name")}
              type="text"
              placeholder="Enter Your Name"
              required
            />
            <ContactMainRightInput
              value={email}
              onChange={handleChange("email")}
              type="email"
              placeholder="Enter Your Email"
              required
            />
            <ContactMainRightTextArea
              value={message}
              onChange={handleChange("message")}
              type="text"
              placeholder="Enter Your Message"
              required
            />
            <ContactMainRightSubmitButton>
              {buttonText}
            </ContactMainRightSubmitButton>
          </ContactFormWrapper>
        </ContactMainRight>
      </ContactMain>
    </ContactContainer>
  );
};

export default ContactPage;

// Instagram @hyunseo_59
