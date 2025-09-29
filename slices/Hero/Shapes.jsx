"use client";

import * as THREE from "three";
import { Canvas } from '@react-three/fiber';
import { ContactShadows, Float, Environment } from '@react-three/drei';
import { Suspense, useRef, useState, useEffect } from "react";
import { gsap } from "gsap";

export default function Shapes() {
    return (
        <div className ="row-span-1 row-start-1 -mt-9 aspect-square md:col-span-1 md:col-start-2 md:mt-0">
            <Canvas className="z-0" shadows gl={{antialias: false}} dpr={[1, 1.5]} camera={{ position: [0, 0, 25], fov: 30, near:1, far:40 }}>
            <Suspense fallback={null}>
                <Geometries />
                <ContactShadows
                position={[0, -3.55, 0]}
                opacity={0.65}
                scale={40}
                blur={1}
                far={10}
                />
                <Environment preset="studio" />
            </Suspense>
            </Canvas>
        </div>
        )
    }

function Geometries() {
    const geometries = [
        {
            position: [0,0,0],
            r: 0.3,
            geometry: new THREE.IcosahedronGeometry(3) // gem-like poly
        },     
        {
            position: [1,-0.75,4],
            r: 0.4,
            geometry: new THREE.CapsuleGeometry(0.5,1.7, 2, 16) // capsule
        },      
        {
            position: [-1.4, 2, -4],
            r: 1,
            geometry: new THREE.SphereGeometry(1.0) // sphere disc
        },       
        {
            position: [-0.8,-0.75,5],
            r: 0.8,
            geometry: new THREE.TorusGeometry(0.6, 0.25, 16, 32) //donut
        },       
        {
            position: [1.6,1.6,-4],
            r: 0.7,
            geometry: new THREE.OctahedronGeometry(1.5) // octahedron
        },     
    ];

    const materials = [
        new THREE.MeshStandardMaterial({ color: new THREE.Color('#ff6b6b'), metalness: 0.6, roughness: 0.25, flatShading: true }),
        new THREE.MeshStandardMaterial({ color: new THREE.Color('#f59e0b'), metalness: 0.6, roughness: 0.25, flatShading: true }),
        new THREE.MeshStandardMaterial({ color: new THREE.Color('#10b981'), metalness: 0.6, roughness: 0.25, flatShading: true }),
        new THREE.MeshStandardMaterial({ color: new THREE.Color('#3b82f6'), metalness: 0.6, roughness: 0.25, flatShading: true }),
        new THREE.MeshStandardMaterial({ color: new THREE.Color('#8b5cf6'), metalness: 0.6, roughness: 0.25, flatShading: true }),
        new THREE.MeshStandardMaterial({ color: new THREE.Color('#ec4899'), metalness: 0.6, roughness: 0.25, flatShading: true })
    ];

    return geometries.map(({ position, r, geometry }) => (
        <Geometry 
            key={JSON.stringify(position)} 
            position= {position.map((p) => p * 2)} 
            geometry={geometry}
            materials={materials}
            r={r}
        />
    ));
}

function Geometry({r, position, geometry, materials}) {  
    const meshRef = useRef();  
    const [visible, setVisible] = useState(false);  

    function getRandomMaterial() {
        return gsap.utils.random(materials);
    }
    const startingMaterial = getRandomMaterial();

    function handleClick(e){ 
        const mesh = e.object;

        gsap.to(mesh.rotation, {
            x: `+=${gsap.utils.random(0,2)}`,
            y: `+=${gsap.utils.random(0,2)}`,
            z: `+=${gsap.utils.random(0,2)}`,
            duration: 1.5,
            ease: "elastic.out(1, 0.3)",
            yoyo: true
        });
        mesh.material = getRandomMaterial();
    }

    const handlePointerOver = () => {
        document.body.style.cursor = 'pointer';
    }

    const handlePointerOut = () => {
        document.body.style.cursor = 'default';
    }

    useEffect(() => {
        let ctx = gsap.context(() => {
            setVisible(true)
            gsap.from(meshRef.current.scale, 
            {
                x: 0, 
                y: 0,   
                z: 0,
                duration: 1.5,
                ease: "elastic.out(1, 0.3)",
                delay: 0.3,
            });
        });
        return () => ctx.revert();
    }, []);

    return(
        <group position={position} ref={meshRef} >
            <Float speed={5 * r} rotationIntensity={6 * r} floatIntensity={5 * r}>
                <mesh
                    geometry={geometry}
                    material={startingMaterial}
                    onClick={handleClick}
                    onPointerOver={handlePointerOver}
                    onPointerOut={handlePointerOut}
                    visible={visible}
                />
            </Float>
        </group>
    )

}

