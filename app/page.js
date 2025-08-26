import { Navbar } from "@/components/Navbar/Navbar";
import Image from "next/image";

export default function Home() {
  return (
    <>
    <div className="flex justify-center text-white h-[30vh] md:h-[45vh] items-center flex-col px-5 md:px-0">
      <div className="font-bold text-4xl md:text-5xl flex gap-5 items-center">
        Buy Me A Chai! <span className="mb-8"><img className="h-20" src="/tea.gif" alt=""/></span>
      </div>
      <p className="text-center">
        A platform for creators where fans can donate and support their favorite chai makers.
      </p>
      <div className="mt-5">
      <button type="button" className="text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-full text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700">Start Now</button>
      <button type="button" className="text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-full text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700">Read More</button>
      </div>
    </div>
    <div className="bg-white h-0.5 opacity-10"> </div>
    <div className="text-white my-5 px-5">
      <h1 className="text-2xl font-bold text-center mb-14 md:mb-16">Your Fans can Buy you a chai.</h1>
      <div className="flex gap-2 md:gap-5 justify-around text-center">
        <div className="items space-y-2 flex flex-col justify-center items-center">
          <img  className=" bg-white rounded-full p-3 h-16 md:h-20" src="./money.png" alt="" />
          <p className="font-bold">Fund Yourself</p>
          <p>Fans are ready to help you.</p>
        </div>
        <div className="items space-y-2 flex flex-col justify-center items-center">
          <img  className=" bg-white rounded-full p-3 h-16 md:h-20" src="./fund.png" alt="" />
          <p className="font-bold">Fuel Your Fans</p>
          <p>Your fans are ready to help you</p>
        </div>
        <div className="items space-y-2 flex flex-col justify-center items-center">
          <img  className=" bg-white rounded-full p-3 h-16 md:h-20" src="./people.png" alt="" />
          <p className="font-bold">Dream</p>
          <p>Together, we brew success.</p>
        </div>
      </div>
    </div>

    <div className="bg-white h-0.5 opacity-10"> </div>
    <div className="text-white mt-5">
      <h1 className="text-2xl font-bold text-center mb-16">Leran More About Us</h1>
      <div className="flex flex-col gap-5 justify-around mx-2">
        <h5 className="mb-8 text-justify px-5 text-xl">Buy Me A Chai! is an engaging platform designed to bring creators and their fans closer together. It's a space where chai enthusiasts, tea artists, and passionate creators can receive support from their fans in the form of small, heartfelt contributions. Here's what makes us special:</h5>
        <div className="item flex flex-col justify-center items-center text-justify px-10 md:px-28">
          <h2 className="text-2xl font-bold">About Us</h2>
          <p>Welcome to Buy Me A Chai!, a platform that brings creators and their fans closer together by celebrating creativity, community, and a shared love for chai. We provide an easy way for fans to support their favorite creators with small, meaningful contributions that we call “chai.” Creators can showcase their work, connect with their audience, and turn their passion into sustainable endeavors.
Our platform offers a seamless way to support creators, customizable pages for showcasing talents, and exclusive perks to make the experience rewarding for fans.</p>
        </div>

        <div className="item flex flex-col justify-center items-center text-justify px-10 md:px-28">
          <h2 className="text-2xl font-bold">What We Offer</h2>
          <p>At Buy Me A Chai!, we provide creators with a platform to showcase their work and receive direct support from fans in a simple, meaningful way. Fans can contribute with small donations, symbolized as “chai,” making it easy to show appreciation without any complexity. Creators can personalize their profiles to share their stories, highlight their talents, and connect with their audience. Additionally, fans can enjoy exclusive perks such as shoutouts, behind-the-scenes content, or unique chai-inspired creations, fostering deeper connections and a sense of community.</p>
        </div>

        <div className="item flex flex-col justify-center items-center text-justify px-10 md:px-28">
          <h2 className="text-2xl font-bold">Why Chai?</h2>
          <p>Chai is more than just a drink; it’s a symbol of warmth, connection, and inspiration that brings people together across cultures and borders. For millions, it’s a daily ritual that sparks creativity and meaningful conversations. At Buy Me A Chai!, we chose chai because it represents comfort, gratitude, and the simple joys in life—the very essence of what we aim to share between creators and their fans. By supporting creators through “chai,” we transform this universal love into a way to fuel creativity and build lasting connections.</p>
        </div>
      </div>
    </div>
    </>
  );
}
export const metadata = {
  title: `FueltheChai!`,
}
