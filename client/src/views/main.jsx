import React from "react";
import ReactPlayer from "react-player";

import Upcoming from "../Component/upcoming";
import News from "../Component/news";
function Main() {
  return (
    <div className="items-center gap-12 container mx-auto mt-20">
      <div className="md:flex justify-around">
        <div className="w-full md:w-5/12">
          <img
            src="https://www.mae.tn/sites/default/files/2023-07/sliderhp.jpg"
            className="rounded-lg"
            alt=""
          />
        </div>
        <div className="h-full align-middle mt-5 px-2">
          <h1 className="text-2xl font-bold text-green-500 hover:text-green-300 hover:underline">
            MAE Assurances :
          </h1>

          <p className="mb-8 md:grid w-96 text-lg leading-relaxed text-gray-800 font-serif font-bold transition duration-300 ease-in-out">
            Upskill on Your Time: Unleash Your Potential with MAE Learn
            Transform your workday into a continuous learning journey. MAE Learn
            offers a comprehensive library of online courses designed to help
            you master the skills you need to excel in your role. Whether you
            want to dive deeper into existing tasks or explore new areas, learn
            at your own pace, anytime, anywhere.
          </p>
        </div>
      </div>
      <p className="text-xl font-bold mt-10 px-2 text-green-600 hover:text-green-400 hover:translate-x-2 transition duration-300 ease-in-out">
        Upcoming:
      </p>
      <div className="blur-md hover:blur-none transition duration-300 ease-in-out">
    <Upcoming />
</div>
      <p className="text-xl font-bold mt-10 px-2 text-green-600 hover:text-green-400 hover:translate-x-2 transition duration-300 ease-in-out">
        New :
      </p>
      <News />
      <div className=" xl:block">
        <p className="text-xl font-bold mt-10 px-2 text-green-600 hover:text-green-400  transition duration-300 ease-in-out  text-center">La MAE en video</p>

        <ReactPlayer
          url="https://www.youtube.com/watch?v=LMqqO_7031g"
          controls
          width="%100"
        />
      </div>
    </div>
  );
}

export default Main;
