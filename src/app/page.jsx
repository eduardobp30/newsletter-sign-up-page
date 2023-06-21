"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import illustrationSignUpDesktop from "../../public/illustration-sign-up-desktop.svg";
import illustrationSignUpMobile from "../../public/illustration-sign-up-mobile.svg";

export default function Home() {
  const [isMobile, setMobile] = useState(true);
  const [popUp, setPopUp] = useState(false);
  const [userEmail, setUserEmail] = useState("");
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isValid },
  } = useForm();

  const onSubmit = (data) => setUserEmail(data.email);

  useEffect(() => {
    if (window.innerWidth <= 440) {
      setMobile(true);
    } else {
      setMobile(false);
    }

    const updateMedia = () => {
      if (window.innerWidth > 440) {
        setMobile(false);
      } else {
        setMobile(true);
      }
    };
    window.addEventListener("resize", updateMedia);
    return () => window.removeEventListener("resize", updateMedia);
  }, []);

  return (
    <main className="relative bg-[#36384E] flex items-center justify-center md:h-screen">
      <div className="z-0 bg-white flex flex-col items-center justify-center min-w-min max-w-4xl md:rounded-3xl md:grid md:grid-cols-2 md:grid-flow-col md:auto-cols-fr md:p-8 md:gap-6">
        <div className="md:flex md:justify-center md:items-center">
          {isMobile ? (
            <Image
              src={illustrationSignUpMobile}
              alt="sign up image"
              priority={true}
            ></Image>
          ) : (
            <Image
              src={illustrationSignUpDesktop}
              alt="sign up image"
              priority={true}
            ></Image>
          )}
        </div>
        <div className="flex flex-1 flex-col p-6 md:order-first md:p-5">
          <div className="pr-2">
            <h1 className="text-4xl text-slate-950 font-bold mb-6 md:text-5xl">
              Stay updated!
            </h1>
            <p className="mb-6 text-base text-gray-600">
              Join 60,000+ product managers receiving monthly updates on:
            </p>
            <ul className="flex flex-col gap-4 mb-8 text-sm text-gray-600">
              <li className="flex">
                <Image
                  src="/icon-list.svg"
                  width={20}
                  height={20}
                  className="mr-3"
                  alt="bullet point"
                />
                Product discovery and building what matters
              </li>
              <li className="flex">
                <Image
                  src="/icon-list.svg"
                  width={20}
                  height={20}
                  className="mr-3"
                  alt="bullet point"
                />
                Measuring to ensure updates are a success
              </li>
              <li className="flex">
                <Image
                  src="/icon-list.svg"
                  width={20}
                  height={20}
                  className="mr-3"
                  alt="bullet point"
                />
                And much more!
              </li>
            </ul>
          </div>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="flex justify-between mb-2 text-xs font-bold">
              <label className="text-slate-950">E-mail address</label>
              <span className="text-[#FF6257]">{errors.email?.message}</span>
            </div>
            <input
              {...register("email", {
                required: "E-mail is required",
                pattern: {
                  value:
                    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                  message: "Valid e-mail required",
                },
              })}
              placeholder="email@company.com"
              autoComplete="off"
              className={`w-full border border-solid border-gray-300 rounded-md mb-6 px-3 py-3 text-gray-600 cursor-pointer focus:outline-none focus:border-gray-600 
              ${
                errors["email"]
                  ? "bg-[#FFD4BF] border-red-400 focus:border-red-400 text-red-400"
                  : null
              }
            `}
            />
            <button
              type="submit"
              onClick={isValid ? () => setPopUp(true) : () => setPopUp(false)}
              className="w-full bg-[#242742] text-white text-base font-bold rounded-md py-4 cursor-pointer hover:bg-[#FF6257] hover:shadow-2xl transition duration-500 ease-in-out"
            >
              Subscribe to monthly newsletter
            </button>
          </form>
        </div>
      </div>
      <div
        className={`${
          popUp
            ? "absolute z-10 h-full w-full bg-white p-6 flex flex-col md:bg-[#36384E] md:justify-center md:items-center"
            : "hidden"
        }`}
      >
        <div className="md:bg-white md:w-96 md:p-10 md:rounded-2xl">
          <Image
            src="/icon-success.svg"
            width={50}
            height={50}
            className="mb-10 mt-14 md:mt-0 md:mb-4"
            alt="bullet point"
          />
          <div className="">
            <h1 className="text-4xl text-slate-950 font-bold mb-6">
              Thanks for subscribing!
            </h1>
            <p className="text-slate-950 md:text-sm md:mb-8">
              A confirmation e-mail has been sent to{" "}
              <span className="font-bold">{`${userEmail}`}</span>. Please open
              it and click the button inside to confirm your subscription.
            </p>
          </div>
          <button
            type="button"
            onClick={() => {
              reset();
              setPopUp(false);
            }}
            className="absolute bottom-0 self-center w-10/12 mb-16 bg-[#242742] text-white text-base font-bold rounded-md py-4 cursor-pointer hover:bg-[#FF6257] hover:shadow-2xl transition duration-500 ease-in-out md:relative md:mb-0 md:w-full"
          >
            Dismiss message
          </button>
        </div>
      </div>
    </main>
  );
}

// onClick={() => setPopUp((prev) => !prev)}
