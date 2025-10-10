"use client";

import { FC, JSX, useEffect, useRef } from "react";
import { Content } from "@prismicio/client";
import { SliceComponentProps } from "@prismicio/react";
import Heading from "@/app/components/Heading";
import React from "react";
import { MdCircle } from "react-icons/md";
import Bounded from "@/app/components/Bounded";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);


/**
 * Props for `TechList`.
 */
export type TechListProps = SliceComponentProps<Content.TechListSlice>;

/**
 * Component for "TechList" Slices.
 */
const TechList = ({ slice }: TechListProps): JSX.Element => {
  const component = useRef(null);

  useEffect(() => {
    let ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: component.current,
          markers: false,
          start: "top 80%",
          end: "bottom 20%",
          scrub: 3,
        }
      });

      tl.fromTo(
        ".tech-row", {
          x: (index) => {
            return index % 2 === 0 ? gsap.utils.random(600, 400) : gsap.utils.random(-600, -400)
          }
        }, {
          x: (index) => {
            return index % 2 === 0 ? gsap.utils.random(-600, -400) : gsap.utils.random(600, 400)
          },
          ease: "power1.inOut",
        }
      );
    }, component);
    
    return () => ctx.revert();
  }, []);

  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className="overflow-hidden"
      ref={component}
      >

      <Bounded as="div">        
        <Heading size="xl" className="mb-8" as="h2">
          {slice.primary.heading}
        </Heading>
      </Bounded>

        {slice.primary.repeatable_zone.map(({tech_name, tech_color}, index) => (
          <div key={index} className="tech-row mb-8 flex items-center justify-center gap-4 text-slate-600"
          aria-label={tech_name || undefined}>
            {Array.from({length: 15}, (_, i) => (
              <React.Fragment key={i}>
                <span 
                  className="tech-item text-8xl font-extrabold uppercase tracking-tighter"
                  style={{
                    color: i === 7 && tech_color ? tech_color : "inherit",
                  }}
                >
                  {tech_name}
                </span>
                <span className="text-3xl">
                  <MdCircle />
                </span>
              </React.Fragment>
            ))}
          </div>
        ))}

    </section>
  );
};

export default TechList;
