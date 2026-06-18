import Link from "next/link";
import {
  LogoFacebook,
  LogoLinkedin,
  LogoGithub,
} from "@gravity-ui/icons";

export default function Footer() {
  return (
    <footer className=" text-white">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        {/* Top Section */}
        <div className="flex flex-col gap-12 lg:flex-row lg:justify-between">
          {/* Left Side */}
          <div className="max-w-md">
            <Link href="/" className="text-3xl font-bold">
              ReSell Hub
            </Link>

            <p className="mt-4 text-gray-400 leading-relaxed">
              A trusted marketplace for buying and selling second-hand products at affordable prices.
            </p>
          </div>

          {/* Right Side */}
          <div className="grid grid-cols-1 gap-10 sm:grid-cols-3">
            {/* Product */}
            <div>
              <h3 className="mb-4 text-lg font-semibold text-blue-400">
                Product
              </h3>

              <ul className="space-y-3">
                <li>
                  <Link
                    href="/products"
                    className="text-gray-400 transition hover:text-white"
                  >
                    Browse Products
                  </Link>
                </li>

                <li>
                  <Link
                    href="/categories"
                    className="text-gray-400 transition hover:text-white"
                  >
                    Categories
                  </Link>
                </li>

                <li>
                  <Link
                    href="/featured-products"
                    className="text-gray-400 transition hover:text-white"
                  >
                    Featured Items
                  </Link>
                </li>

                <li>
                  <Link
                    href="/add-product"
                    className="text-gray-400 transition hover:text-white"
                  >
                    Sell Product
                  </Link>
                </li>
              </ul>
            </div>

            {/* Navigation */}
            <div>
              <h3 className="mb-4 text-lg font-semibold text-blue-400">
                Quick Links
              </h3>

              <ul className="space-y-3">
                <li>
                  <Link
                    href="/help-center"
                    className="text-gray-400 transition hover:text-white"
                  >
                   All Products
                  </Link>
                </li>

                <li>
                  <Link
                    href="/career-library"
                    className="text-gray-400 transition hover:text-white"
                  >
                   Dashboard
                  </Link>
                </li>

                <li>
                  <Link
                    href="/contact"
                    className="text-gray-400 transition hover:text-white"
                  >
                    Contact Us
                  </Link>
                </li>
              </ul>
            </div>

            {/* Resources */}
            <div>
  <h3 className="mb-4 text-lg font-semibold text-blue-400">
    Contact Us
  </h3>

  <ul className="space-y-3 text-gray-400">
    <li>Email: support@resellhub.com</li>
    <li>Phone: +880 1234-567890</li>
    <li>Sylhet, Bangladesh</li>
  </ul>
</div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="mt-12 border-t border-gray-700 pt-6">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            {/* Social Icons */}
            <div className="flex items-center gap-4">
              <Link
                href="https://facebook.com"
                target="_blank"
                className="text-gray-400 transition hover:text-white"
              >
                <LogoFacebook className="h-5 w-5" />
              </Link>

              <Link
                href="https://github.com"
                target="_blank"
                className="text-gray-400 transition hover:text-white"
              >
                <LogoGithub className="h-5 w-5" />
              </Link>

              <Link
                href="https://Linkedin.com"
                target="_blank"
                className="text-gray-400 transition hover:text-white"
              >
                <LogoLinkedin className="h-5 w-5" />
              </Link>
            </div>

 <div className="flex gap-4 text-sm text-gray-500">
    <Link href="/terms">Terms</Link>
    <Link href="/privacy">Privacy Policy</Link>
  </div>

            {/* Copyright */}
            <p className="text-sm text-gray-500">
              © {new Date().getFullYear()} Resell Hub. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}