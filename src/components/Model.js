"use client"
import { useAnimations, useGLTF, useScroll } from '@react-three/drei';
import { useFrame, useThree } from '@react-three/fiber';
import React, { useEffect, useRef } from 'react'
import * as THREE from 'three';

useGLTF.preload("/iphone_14_pro.glb");

const Model = ({ model }) => {
    const group = useRef(null);
    const { scene } = useGLTF("/iphone_14_pro.glb");

    const { gl, camera, scene: mainScene } = useThree(); // useThree gives us access to the renderer (gl), camera, and the main scene.
    const raycaster = new THREE.Raycaster(); // raycaster and mouse are initialized for detecting clicks on the 3D objects.
    const mouse = new THREE.Vector2();

    useEffect(() => {

        raycaster.setFromCamera(mouse, camera);
        const intersects = raycaster.intersectObject(group.current, true);

        if (intersects.length > 0) {
            intersects.forEach(intersect => {
                intersect.object.material.color.set(`${model}`);
            });
        };

    }, [model]);

    return (
        <group ref={group}> // Group multiple 3D objects together for collective transformations
            <primitive object={scene} /> // Inserts the entire scene object from the GLTF model into the Three.js scene.
        </group>
    );
};

export default Model;
