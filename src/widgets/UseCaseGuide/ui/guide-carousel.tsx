"use client";

import { Card, CardContent } from "@/shared/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/shared/ui/carousel";
import { Guide } from "../model/type/guides";
import Image from "next/image";

export const GuideCarousel = ({ guides }: { guides?: Guide[] }) => {
  return (
    <Carousel className="max-w-[70%] border border-yellow-400">
      <CarouselContent className="h-full border border-yellow-400 items-center max-w-full">
        {guides?.map((guide, index) => (
          <CarouselItem key={guide.queue}>
            <div className="p-1">
              <h1 className="text-lg">Step - {guide.queue}</h1>
              <Card className="h-full">
                <CardContent className="flex flex-col p-3 h-full gap-3">
                  {guide.image && (
                    <div className="flex-grow overflow-auto custom-scrollbar max-h-[500px]">
                      <Image
                        src={guide.image}
                        alt="#"
                        width={1000}
                        height={2000}
                        className="w-full max-h-full rounded-xl"
                        priority={true}
                      />
                    </div>
                  )}
                  <h1 className="text-2xl">{guide.title}</h1>
                  <p className="text-xl">{guide.description}</p>
                </CardContent>
              </Card>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
};
