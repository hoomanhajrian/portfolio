import React, { useRef, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Stars, ass } from '@react-three/drei';
import { Card, CardHeader } from '@mui/material';


const Box = (props) => {
    // This reference gives us direct access to the THREE.Mesh object
    const ref = useRef()
    // Hold state for hovered and clicked events
    const [hovered, hover] = useState(false)
    const [size, changeSize] = useState(false)
    // Return the view, these are regular Threejs elements expressed in JSX
    return (
        <mesh
            {...props}
            ref={ref}
            scale={size ? 1.2 : 1}
            onPointerOver={(event) => { hover(true); changeSize(!size) }}
            onPointerOut={(event) => { hover(false); changeSize(!size) }}>
            <boxBufferGeometry attach='geometry' />
            <meshLambertMaterial attach='material' color={hovered ? '#007bff' : 'red'} />
        </mesh>
    )
}


const Plane = (props) => {

    return (
        <mesh
            {...props}
        >
            <planeBufferGeometry attach='geometry' args={[10, 10]} />
            <meshLambertMaterial attach='material' color={'darkgreen'} />
        </mesh>
    )
}


const FlowtingBox = () => {

    return (
        <Card className='flowtingbox-card'>
            <CardHeader
                title="3D Objects"
                subheader='Drag to rotate the cube'
            />
            <Canvas shadows style={{ background: 'black' }}>
                <ambientLight />
                <Stars />
                <OrbitControls />
                <ambientLight intensity={0.5} />
                <spotLight position={[10, 15, 10]} angle={10} />
                <Box position={[0, 0, 0]} />
                <Plane position={[0, -.4, 0]} rotation={[-Math.PI / 2, 0, 0]} />
            </Canvas>
        </Card>
    );

};

export default FlowtingBox;