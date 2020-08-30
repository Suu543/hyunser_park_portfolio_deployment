import styled from "styled-components";

export const Spliter = styled.div`
  width: 10%;
  height: 2px;
  background: #4a5158;
  margin: 1.5rem;
`;

export const Container = styled.section`
  display: flex;
  align-content: flex-start;
  justify-content: center;
  flex-flow: row wrap;
  background: white;
  width: 100%;
  height: 90%;
  margin: auto;
  overflow-x: hidden;
  margin-top: 3vh;
`;

export const Form = styled.form`
  display: flex;
  flex-flow: column;
  align-items: center;
  justify-content: center;
  background: white;
`;

export const ImageWrapper = styled.section`
  width: 80%;
`;

export const TitleWrapper = styled.section`
  width: 80%;
`;

export const Title = styled.input`
  width: 100%;
  font-size: 1.7vw;
  border: none;

  :focus {
    outline: none;
  }
`;

export const ExcerptWrapper = styled.section`
  width: 80%;
  margin-bottom: 1rem;
`;

export const ExcerptTextArea = styled.textarea`
  width: 100%;
  font-size: 1.7vw;
  font-weight: bold;
  border: none;

  :focus {
    outline: none;
  }
`;

export const ArtistWrapper = styled.section`
  width: 80%;
`;

export const ArtistInput = styled.input`
  width: 100%;
  font-size: 1.7vw;
  border: none;

  :focus {
    outline: none;
  }
`;

export const TagWrapper = styled.article`
  width: 80%;
`;

export const TagListWrapper = styled.ul`
  display: flex;
  flex-flow: row wrap;
  align-content: flex-start;
  justify-content: flex-start;
  padding: 1rem;
  width: 50%;
  /* border-radius: 2px;
  border: black 1px solid; */
`;

export const TagList = styled.li`
  list-style: none;
  background: rgb(241, 243, 245);
  color: rgb(12, 166, 120);
  align-items: center;
  font-size: 1.5rem;
  cursor: pointer;
  border-radius: 40%;
  padding: 0.3rem;
  margin: 2px;
`;

export const TagInputWrapper = styled.article`
  display: flex;
  width: 80%;
  margin-left: 5px;
`;

export const TagInput = styled.input`
  border: none;
  background: none;
  font-size: 1rem;

  :focus {
    outline: none;
  }
`;

export const CategoryWrapper = styled.article`
  width: 80%;
  margin-top: 2rem;
  margin-bottom: 0.5rem;
`;

export const CategoryUl = styled.ul`
  width: 80%;
  display: flex;
  flex-flow: row wrap;
  justify-content: space-around;
  align-items: flex-start;

  li {
    font-size: 2rem;
    margin-left: 1rem;
    font-weight: bold;
    list-style: none;
  }

  input {
    margin-right: 3px;
  }
`;

export const QuillWrapper = styled.article`
  display: flex;
  justify-content: center;
  width: 80vw;
  min-height: 70vh;
`;

export const BtnWrapper = styled.article`
  display: flex;
  position: fixed;
  width: 80%;
  height: 5vh;
  background: white;
  top: 0;
  z-index: 10;
  justify-content: flex-end;
`;

export const SubmitBtn = styled.button`
  width: 20%;
  height: 80%;
  border: none;
  border-radius: 4px;
  background: #12b886;
  color: white;
  font-size: 1.5rem;
`;

export const HomeBtn = styled.span`
  width: 20%;
  font-size: 2rem;
  height: 80%;
  border: none;
  text-align: center;
  border-radius: 4px;
  background: #b3b3b1;

  a {
    text-decoration: none;
    font-weight: bold;
    color: white;
  }
`;

export const ErrorAlert = styled.article`
  width: 80%;
  font-size: 2rem;
  color: black;
  margin: auto;
  margin-bottom: 1rem;
  padding: 1rem;
  background: #f8d7da;

  h1 {
    text-align: center;
    color: #721c24;
  }
`;

export const SuccessAlert = styled.article`
  width: 80%;
  font-size: 2rem;
  color: black;
  margin: auto;
  margin-bottom: 1rem;
  padding: 1rem;
  background: #cce5ff;

  h1 {
    text-align: center;
    color: #5f8dbe;
  }
`;
