"use client";
import React from "react";
import { ContainerScroll } from "@/components/ui/container-scroll-animation";
import Image from "next/image";
import heroImage from "@/assets/images/heroImage.png";

export function HeroScrollDemo() {
  return (
    <div className="flex flex-col overflow-hidden">
      <ContainerScroll
        titleComponent={
          <>
            <h2 className="text-4xl font-semibold text-foreground">
              גלו את העוצמה של <br />
              <span className="text-4xl md:text-[6rem] font-bold mt-1 leading-none">
                Kaspi
              </span>
            </h2>
          </>
        }
      >
        <Image
          src={heroImage}
          alt="Kaspi dashboard preview"
          height={720}
          width={1400}
          className="mx-auto rounded-2xl object-cover h-full object-top-left"
          draggable={false}
          placeholder="blur"
        />
      </ContainerScroll>
    </div>
  );
}
