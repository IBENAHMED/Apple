"use client"

import { ScrollControls, Html, useProgress, OrbitControls, Environment, ContactShadows } from '@react-three/drei'
import { Canvas } from '@react-three/fiber'
import React, { Suspense, useEffect, useRef, useState } from 'react'
import Model from './Model';
import * as THREE from 'three';
import { models, sizes } from '@/constants';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';

function Loader() {
    const { progress, active } = useProgress()
    return <Html center>{progress.toFixed(1)} % loaded</Html>
};

const Scene = () => {

    const yellowImg = "/assets/images/yellow.jpg"

    const [size, setSize] = useState('small');
    const [model, setModel] = useState({
        title: 'iPhone 15 Pro in Natural Titanium',
        color: ['#8F8A81', '#FFE7B9', '#6F6C64'],
        img: yellowImg,
    });

    useGSAP(() => {
        gsap.fromTo('#heading',
            { opacity: 0, y: -100 },
            { opacity: 1, y: 0, duration: 1, scrollTrigger: { trigger: "#section" } });
    }, []);

    const scaleValues = {
        small: 1,
        medium: 1.5,
        large: 2
    };


    return (
        <section id="section" className="common-padding">
            <div className="screen-max-width">
                <h1 id="heading" className="section-heading">
                    Take a closer look.
                </h1>

                <div className="flex flex-col items-center mt-5">
                    <div className="w-full h-[75vh] md:h-[90vh] overflow-hidden relative">

                        <Canvas camera={{ fov: 35, zoom: 0.6, near: 1, far: 1000 }}> //Canvas it's container for 3D content Three.js scene, camera, renderer, and other
                            <directionalLight position={[-5, -5, 5]} intensity={4} /> //Lighting
                            {/* add your 3D modal */}
                            <Suspense fallback={<Loader />}>
                                <Model model={model.color[0]} />
                                <OrbitControls enableZoom={false} enablePan={false} />
                                <ambientLight intensity={4} />
                                <Environment preset='sunset' />
                                <directionalLight position={[5, 10, 10]} />
                                {/* <ContactShadows
                                     position={[0, -1, 0]}
                                     width={10}
                                     height={10}
                                     far={200}
                                     rotation={[Math.PI / 2, 0, 0]}
                                 /> */}
                            </Suspense>
                        </Canvas>
                    </div>

                    <div className="mx-auto w-full">
                        <p className="text-sm font-light text-center mb-5">{model.title}</p>

                        <div className="flex-center">
                            <ul className="color-container">
                                {models.map((item, i) => (
                                    <li key={i} className="w-6 h-6 rounded-full mx-2 cursor-pointer" style={{ backgroundColor: item.color[0] }} onClick={() => setModel(item)} />
                                ))}
                            </ul>

                            <button className="size-btn-container">
                                {sizes.map(({ label, value }) => (
                                    <span key={label} className="size-btn" style={{ backgroundColor: size === value ? 'white' : 'transparent', color: size === value ? 'black' : 'white' }} onClick={() => setSize(value)}>
                                        {label}
                                    </span>
                                ))}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Scene
