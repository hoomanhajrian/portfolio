import React, { useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from "three";

const Planet = (props) => {

    const texture = new THREE.TextureLoader().load(props.texture);

    // This reference gives us direct access to the THREE.Mesh object
    const ref = useRef()
    // Hold state for hovered and clicked events
    const [hovered, hover] = useState(false)
    const [clicked, click] = useState(false)
    // Subscribe this component to the render-loop, rotate the mesh every frame
    let t = 0;
    useFrame((state, delta) => {
        t += props.speed ? props.speed : null;
        ref.current.position.x = props.rotationValue * Math.cos(t) + 0;
        ref.current.position.z = props.rotationValue * Math.sin(t) + 0; // These to strings make it work
    })
    // Return the view, these are regular Threejs elements expressed in JSX
    return (
        <mesh
            {...props}
            ref={ref}
            onClick={(event) => click(!clicked)}
            onPointerOver={(event) => hover(true)}
            onPointerOut={(event) => hover(false)}>
            <sphereGeometry />
            <meshLambertMaterial color={props.color} map={texture} />
        </mesh>
    )
};

export default Planet;