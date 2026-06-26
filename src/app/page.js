import Banner from "@/components/Banner";
import Featured from "@/components/Featured";
import PopularCategories from "@/components/PopularCategories";
import Image from "next/image";

export default function Home() {
  return (
    <>
    <Banner></Banner>
    <Featured></Featured>
    <PopularCategories></PopularCategories>
    </>
  );
}
