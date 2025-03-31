"use client";

import {
  CircleDollarSign,
  Flower2,
  Heart,
  HeartHandshake,
  Leaf,
  Rabbit,
  ShoppingCart,
  Sparkles,
  Star,
  TreeDeciduous,
  Truck,
} from "lucide-react";
import { useEffect, useState } from "react";

import BlockAbout from "@/components/home-blocks/block-about";
import BlockCategory from "@/components/home-blocks/block-category";
import BlockCTA from "@/components/home-blocks/block-cta";
import BlockFeatures from "@/components/home-blocks/block-features";
import BlockHero from "@/components/home-blocks/block-hero";
import BlockProducts from "@/components/home-blocks/block-products";
import BlockPromo from "@/components/home-blocks/block-promo";
import BlockReviews from "@/components/home-blocks/block-reviews";
import BlockWhyUs from "@/components/home-blocks/block-why-us";
import { getAllContributors } from "@/core/actions/contributors/get-all-contributors";
import { IProduct } from "@/core/validators";
import { IContributor } from "@/core/validators/contributors.validator";
import ROLES from "@/lib/constants/roles";

export default function ContributorShowcase() {
  const [showFullDescription, setShowFullDescription] = useState(false);
  const [, setProducts] = useState<IProduct[]>([]);
  const [contributor, setContributor] = useState<IContributor>();
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("/api/contributor/get-all-products", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            affiliateId: "f232254a-b4fc-4b6b-8272-93d54a206b24",
          }),
        });
        const data = await response.json();
        setProducts(data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []);

  useEffect(() => {
    const fetchContributors = async () => {
      try {
        const response = await getAllContributors(ROLES.RETAILER);
        const randomIndex = Math.floor(Math.random() * response.length);
        setContributor(response[randomIndex]);
      } catch (error) {
        console.error("Error fetching contributors:", error);
      }
    };

    fetchContributors();
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="relative flex flex-col  gap-12 overflow-hidden">
      {/* PARALLAX ICONS - scroll based movement */}
      <Leaf
        className="pointer-events-none absolute left-4 top-[100vh] size-14 text-green-300 opacity-20 "
        style={{ transform: `translateY(${scrollY * -0.15}px)` }}
      />
      <Star
        className="pointer-events-none absolute right-6 top-[160vh] size-12 text-yellow-300 opacity-30 "
        style={{ transform: `translateY(${scrollY * -0.18}px)` }}
      />
      <HeartHandshake
        className="pointer-events-none absolute left-10 top-[240vh] size-20 text-pink-300 opacity-20 "
        style={{ transform: `translateY(${scrollY * -0.11}px)` }}
      />
      <Sparkles
        className="pointer-events-none absolute right-16 top-[320vh] size-14 text-purple-300 opacity-30 "
        style={{ transform: `translateY(${scrollY * -0.15}px)` }}
      />
      <Rabbit
        className="pointer-events-none absolute left-1/4 top-[420vh] size-16 text-amber-300 opacity-25 "
        style={{ transform: `translateY(${scrollY * -0.16}px)` }}
      />
      <Flower2
        className="pointer-events-none absolute right-[20%] top-[520vh] size-14 text-rose-300 opacity-30 "
        style={{ transform: `translateY(${scrollY * -0.14}px)` }}
      />
      <Truck
        className="pointer-events-none absolute left-12 top-[200vh] size-14 text-blue-300 opacity-20 "
        style={{ transform: `translateY(${scrollY * -0.19}px)` }}
      />
      <CircleDollarSign
        className="pointer-events-none absolute right-12 top-[280vh] size-14 text-orange-400 opacity-30 "
        style={{ transform: `translateY(${scrollY * -0.16}px)` }}
      />
      <TreeDeciduous
        className="pointer-events-none absolute left-1/3 top-[360vh] size-14 text-green-400 opacity-25 "
        style={{ transform: `translateY(${scrollY * -0.15}px)` }}
      />
      <Heart
        className="pointer-events-none absolute right-[10%] top-[450vh] size-12 text-red-300 opacity-20 "
        style={{ transform: `translateY(${scrollY * -0.11}px)` }}
      />
      <ShoppingCart
        className="pointer-events-none absolute left-[15%] top-[600vh] size-16 text-teal-300 opacity-20 "
        style={{ transform: `translateY(${scrollY * -0.13}px)` }}
      />

      {/* SECTIONS */}
      {contributor && <BlockHero contributor={contributor} />}
      <BlockPromo />
      <BlockAbout
        contributor={contributor}
        showFullDescription={showFullDescription}
        setShowFullDescription={setShowFullDescription}
      />
      <BlockCategory />
      <BlockWhyUs />
      <BlockFeatures />
      {contributor && <BlockProducts products={contributor.products} />}
      {contributor && <BlockReviews /* contributor={contributor} */ />}
      <BlockCTA />

      {/* FOOTER SPACING */}
      <div className="h-16" />
    </div>
  );
}
