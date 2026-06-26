"use client";
// import {HeroUIProvider} from "@heroui/react"
// import { Elements } from "@stripe/react-stripe-js";
// import { loadStripe } from "@stripe/stripe-js";

// const stripePromise = loadStripe(
//   process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
// );

// export default function Providers({ children }) {
//   return (
//     <HeroUIProvider>{children}</HeroUIProvider>
//   );
// }
export default function Providers({ children }) {
  return <>{children}</>
}