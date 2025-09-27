"use client";
import Categories from "@/components/categories";
import Container from "@/components/container";
import Hero from "@/components/hero";
import PopularProducts from "@/components/popular-products";
import Products from "@/components/products";
import Subcategories from "@/components/subcategories";
import SocialText from "@/components/social-text";
import SocialFloat from "@/components/social-float";
import SmallPopup from "@/components/small-popup";
import LargePopup from "@/components/large-popup";
import { useIsMobile } from "@/hooks/useIsMobile";

const HomePage = () => {
  const isMobile = useIsMobile();
  return (
    <Container>
      <Hero />
      <Categories />
      {!isMobile && <SocialText />}
      <Subcategories />
      <Products showViewAll={true} />
      <PopularProducts />
      {isMobile && <SocialFloat />}
      <SmallPopup />
      <LargePopup />
    </Container>
  );
};

export default HomePage;
