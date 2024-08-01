"use client"

import { useGSAP } from "@gsap/react";
import { rightImg, watchImg } from "../utils";
import gsap from "gsap";
import { useRef } from "react";
import { ScrollTrigger } from 'gsap/all'
import VideoCarousele from "./VideoCarousele";

gsap.registerPlugin(ScrollTrigger)

const Highlights = () => {

    let scrollRef = useRef();

    useGSAP(() => {
        gsap.fromTo('#title',
            { opacity: 0, y: -100 },
            { opacity: 1, y: 0, duration: 1, scrollTrigger: { trigger: "highlights" } })
        gsap.to('.link',
            { opacity: 1, y: 0, duration: 1, stagger: 0.25, scrollTrigger: { trigger: "highlights" } })
    }, [])

    return (
        <section id="highlights" className="w-screen common-padding bg-zinc">
            <div className="screen-max-width">
                <div className="mb-12 w-full md:flex items-end justify-between">
                    <h1 id="title" className="section-heading">Get the highlights.</h1>

                    <div className="flex flex-wrap items-end gap-5">
                        <p className="link">
                            Watch the film
                            <img src={watchImg.src} alt="watch" className="ml-2" />
                        </p>
                        <p className="link">
                            Watch the event
                            <img src={rightImg.src} alt="right" className="ml-2" />
                        </p>
                    </div>
                </div>

                <VideoCarousele />
            </div>
        </section>
    )
}

export default Highlights