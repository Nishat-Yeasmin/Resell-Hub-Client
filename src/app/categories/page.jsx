import CategoriesList from "@/components/CategoriesList";

export default function CategoriesPage(){

    return(

        <div className="max-w-7xl mx-auto px-5 py-10">

            <h1 className="text-4xl font-bold text-center">

                Categories

            </h1>

            <p className="text-center text-gray-400 mt-2 mb-10">

                Explore product categories.

            </p>

            <CategoriesList/>

        </div>

    )

}