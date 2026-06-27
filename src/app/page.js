import Banner from "@/components/Banner";
import Featured from "@/components/Featured";
import MarketplaceStatistics from "@/components/MarketplaceStatistics";
import PopularCategories from "@/components/PopularCategories";
import SuccessStories from "@/components/SuccessStories";
import Image from "next/image";

export default function Home() {
  return (
    <>
    <Banner></Banner>
    <Featured></Featured>
    <PopularCategories></PopularCategories>
    <SuccessStories/>
    <MarketplaceStatistics/>
    </>
  );
}
