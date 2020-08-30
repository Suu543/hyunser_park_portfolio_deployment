import React, { useState, useEffect } from "react";
import Layout from "../../core/Layout";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { getCategories, removeCategory } from "../../actions/category";
import { getCookie } from "../../helpers/auth";

const CategoryContainer = styled.section`
  width: 100%;
  min-height: 100vh;
  margin: auto;
  margin-top: 10vh;
`;

const CategoryTitleWrapper = styled.header`
  display: flex;
  width: 80%;
  margin: auto;
  margin-top: 1%;
  align-items: flex-start;
  justify-content: flex-start;

  h1 {
    font-size: 5rem;
    color: #763735;
  }
`;

const CategoryCreateFeature = styled.article`
  display: flex;
  width: 80%;
  margin: auto;

  button {
    padding: 1rem 2rem;
    margin-left: 1rem;
    margin-top: 2rem;
    font-size: 2rem;
    font-weight: lighter;
    font-family: "Times New Roman", Times, serif;
    text-transform: capitalize;
    background: #31ae88;
    border: none;
    border-radius: 10px;
    cursor: pointer;
    opacity: 0.9;

    :hover {
      outline: none;
      opacity: 1;
    }

    :active {
      outline: none;
      opacity: 1;
    }
  }
`;

const CategoryCreateFeatureLink = styled(Link)`
  text-decoration: none;
`;

const CategoryWrapper = styled.section`
  display: flex;
  flex-flow: column wrap;
  width: 80%;
  margin: auto;
`;

const CategoryCard = styled.article`
  display: grid;
  grid-template-columns: auto auto;
  align-items: center;
  padding: 2rem;
  margin-top: 3rem;
  background: #9b8271;

  h1 {
    font-size: 2.5rem;
    color: #f3efdf;
  }
`;

const CategoryFeatureWrapper = styled.article`
  justify-self: end;

  a {
    text-decoration: none;
  }

  button {
    padding: 1rem 2rem;
    margin-left: 1rem;
    font-size: 1.6rem;
    font-weight: lighter;
    font-family: "Times New Roman", Times, serif;
    text-transform: uppercase;
    background: #f57367;
    border: none;
    cursor: pointer;
  }
`;

const ReadCategories = () => {
  const token = getCookie("token");
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    loadCategories();
  }, []);

  const loadCategories = async () => {
    try {
      let response = await getCategories();
      console.log("response", response);
      setCategories([...response]);
    } catch (error) {
      console.log("error", error);
    }
  };

  const deleteCategory = async (slug) => {
    try {
      const deletedCategory = await removeCategory(slug, token);
      if (deletedCategory) alert(`Successfully Delete ${slug} category...`);
      await loadCategories();
    } catch (error) {
      console.log("error", error);
    }
  };

  const deleteConfirm = (slug) => {
    let answer = window.confirm("Do you really want to delete this category?");
    if (answer) deleteCategory(slug);
  };

  return (
    <Layout>
      <CategoryContainer>
        <CategoryTitleWrapper>
          <h1>Admin - Category</h1>
        </CategoryTitleWrapper>
        <CategoryCreateFeature>
          <CategoryCreateFeatureLink to="/admin/category/create">
            <button>Create Category</button>
          </CategoryCreateFeatureLink>
        </CategoryCreateFeature>
        <CategoryWrapper>
          {categories &&
            categories.length > 0 &&
            categories.map((c, i) => (
              <CategoryCard>
                <h1>{c.title}</h1>
                <CategoryFeatureWrapper>
                  <Link to={`/admin/category/update/${c.slug}`}>
                    <button style={{ background: "#09C0CB" }}>Update</button>
                  </Link>
                  <button onClick={() => deleteConfirm(c.slug)}>Delete</button>
                </CategoryFeatureWrapper>
              </CategoryCard>
            ))}
        </CategoryWrapper>
      </CategoryContainer>
    </Layout>
  );
};

export default ReadCategories;
