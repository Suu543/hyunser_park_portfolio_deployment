import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getCategories } from "../../actions/category";
import { allWorks } from "../../actions/work";
import { readImages } from "../../actions/image";
import { readGridImages } from "../../actions/grid";
import Layout from "../../core/Layout";
import {
  AdminDashboardContainer,
  AdminDashboardTitleWrapper,
  AdminFeaturesContainer,
  AdminFeaturesWrapper,
  FeatureLink,
  Features,
  SummaryContainer,
  Summary,
} from "../../styles/AdminDashboard";

const AdminDashboard = () => {
  const [summary, setSummary] = useState({
    category: 0,
    work: 0,
    carousel: 0,
    grid: 0,
  });

  const initSummary = async () => {
    const category = await getCategories();
    const work = await allWorks();
    const image = await readImages();
    const grid = await readGridImages();

    setSummary({
      category: category.length,
      work: work.length,
      carousel: image.length,
      grid: grid.length,
    });
  };

  useEffect(() => {
    initSummary();
  }, []);

  const { category, work, carousel, grid } = summary;

  return (
    <Layout>
      <AdminDashboardContainer>
        <AdminDashboardTitleWrapper>
          <h1>Admin Dashboard</h1>
        </AdminDashboardTitleWrapper>
        <AdminFeaturesContainer>
          <AdminFeaturesWrapper>
            <FeatureLink to="/admin/category">
              <Features>Category</Features>
            </FeatureLink>
            <FeatureLink to="/admin/work">
              <Features>Work</Features>
            </FeatureLink>
            <FeatureLink to="/admin/carousel">
              <Features>Carousel</Features>
            </FeatureLink>
            <FeatureLink to="/admin/grid">
              <Features>Grid</Features>
            </FeatureLink>
          </AdminFeaturesWrapper>
        </AdminFeaturesContainer>
        <SummaryContainer>
          <h1>Summary</h1>
          <Summary>
            <span>
              <Link to="/admin/category">Category:</Link> {category}
            </span>
          </Summary>
          <Summary>
            <span>
              <Link to="/admin/work">Work:</Link> {work}
            </span>
          </Summary>
          <Summary>
            <span>
              <Link to="/admin/carousel">Carousel:</Link> {carousel}
            </span>
          </Summary>
          <Summary>
            <span>
              <Link to="/admin/grid">Grid:</Link> {grid}
            </span>
          </Summary>
        </SummaryContainer>
      </AdminDashboardContainer>
    </Layout>
  );
};

export default AdminDashboard;
