"use client";

import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/all";
gsap.registerPlugin(ScrollTrigger);
import { useEffect, useRef, useState } from "react";

import { hightlightsSlides } from "../constants";
import { pauseImg, playImg, replayImg } from "../utils";

import React from 'react'

const VideoCarousele = () => {

    const videoRef = useRef([]);
    const videoSpanRef = useRef([]);
    const videoDivRef = useRef([]);

    const [video, setVideo] = useState({
        isEnd: false,
        startPlay: false,
        videoId: 0,
        isLastVideo: false,
        isPlaying: true,
    });

    const { isEnd, isLastVideo, startPlay, videoId, isPlaying } = video;

    useGSAP(() => {
        if (videoRef.current[videoId]) {
            gsap.to("#slider", {
                transform: `translateX(${-100 * videoId}%)`,
                duration: 2,
                ease: "power2.inOut",
            });

            gsap.to(videoRef.current[videoId], {
                scrollTrigger: {
                    trigger: videoRef.current[videoId],
                },

                onComplete: () => {
                    setVideo((prev) => ({
                        ...prev,
                        startPlay: true,
                        isPlaying: true,
                    }));
                },
            });
        }
    }, [isEnd, videoId]);

    useEffect(() => {
        let currentProgress = 0;
        let span = videoSpanRef.current;

        if (span[videoId] && videoRef.current[videoId]) {
            const currentVideo = videoRef.current[videoId];
            const videoDuration = currentVideo ? currentVideo.duration : 1; // Fallback to 1 second if duration is not available

            let anim = gsap.to(span[videoId], {
                // duration: videoDuration, // Set the duration based on the video length
                onUpdate: () => {
                    let progress = Math.ceil(anim.progress() * 100);

                    if (progress !== currentProgress) {
                        currentProgress = progress;

                        if (videoDivRef) {
                            gsap.to(videoDivRef.current[videoId], {
                                width:
                                    window.innerWidth < 760
                                        ? '10vw'
                                        : window.innerWidth < 1200
                                            ? '10vw'
                                            : '4vw',
                            });
                        }

                        gsap.to(span[videoId], {
                            width: `${currentProgress}%`,
                            backgroundColor: 'white',
                        });
                    }
                },
                onComplete: () => {
                    if (isPlaying) {
                        gsap.to(videoDivRef.current[videoId], {
                            width: '12px',
                        });
                        gsap.to(span[videoId], {
                            backgroundColor: '#afafaf',
                        });
                    }
                },
            });

            if (videoId === 0) {
                anim.restart();
            }

            const animUpdate = () => {
                if (currentVideo) {
                    anim.progress(currentVideo.currentTime / videoDuration);
                }
            };

            if (isPlaying) {
                gsap.ticker.add(animUpdate);
            } else {
                gsap.ticker.remove(animUpdate);
            }
        }
    }, [videoId, startPlay, isPlaying]);

    useEffect(() => {
        if (!isPlaying) {
            videoRef.current[videoId]?.pause();
        } else {
            startPlay && videoRef.current[videoId]?.play();
        }
    }, [startPlay, videoId, isPlaying]);

    const handleProcess = (type, i) => {
        switch (type) {
            case 'video-end':
                setVideo((prev) => ({ ...prev, isEnd: true, videoId: i + 1 }));
                break;
            case 'video-last':
                setVideo((prev) => ({ ...prev, isLastVideo: true }));
                break;
            case 'video-reset':
                setVideo((prev) => ({ ...prev, videoId: 0, isLastVideo: false }));
                break;
            case 'pause':
                setVideo((prev) => ({ ...prev, isPlaying: !prev.isPlaying }));
                break;
            case 'play':
                setVideo((prev) => ({ ...prev, isPlaying: !prev.isPlaying }));
                break;
            default:
                return video;
        }
    };

    return (
        <>
            <div className="flex items-center">
                {hightlightsSlides.map((list, i) => (
                    <div key={list.id} id="slider" className="sm:pr-20 pr-10">
                        <div className="video-carousel_container">
                            <div className="w-full h-full flex-center rounded-3xl overflow-hidden bg-black">
                                <video
                                    id="video"
                                    playsInline={true}
                                    className={`${list.id === 2 && "translate-x-44"
                                        } pointer-events-none`}
                                    preload="auto"
                                    muted
                                    ref={(el) => (videoRef.current[i] = el)}
                                    onEnded={() =>
                                        i !== 3
                                            ? handleProcess("video-end", i)
                                            : handleProcess("video-last")
                                    }
                                >
                                    <source src={list.video} type="video/mp4" />
                                </video>
                            </div>

                            <div className="absolute top-12 left-[5%] z-10">
                                {list.textLists.map((text, i) => (
                                    <p key={i} className="md:text-2xl text-xl font-medium">
                                        {text}
                                    </p>
                                ))}
                            </div>
                        </div>
                    </div>
                ))}
            </div >

            <div className="relative flex-center mt-10">
                <div className="flex-center py-5 px-7 bg-gray-300 backdrop-blur rounded-full">
                    {videoRef.current.map((_, i) => (
                        <span
                            key={i}
                            className="mx-2 w-3 h-3 bg-gray-200 rounded-full relative cursor-pointer"
                            ref={(el) => (videoDivRef.current[i] = el)}
                        >
                            <span
                                className="absolute h-full w-full rounded-full"
                                ref={(el) => (videoSpanRef.current[i] = el)}
                            />
                        </span>
                    ))}
                </div>

                <button className="control-btn">
                    <img
                        src={
                            isLastVideo
                                ? replayImg.src
                                : !isPlaying
                                    ? playImg.src
                                    : pauseImg.src
                        }
                        alt={isLastVideo ? "replay" : !isPlaying ? "play" : "pause"}
                        onClick={
                            isLastVideo
                                ? () => handleProcess("video-reset")
                                : !isPlaying
                                    ? () => handleProcess("play")
                                    : () => handleProcess("pause")
                        }
                    />
                </button>
            </div>

        </>
    )
}

export default VideoCarousele
