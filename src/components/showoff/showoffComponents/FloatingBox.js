import React from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Stars } from '@react-three/drei';
import Planet from './Planet';
import { Card } from '@mui/material';
import { CardHeader } from '@material-ui/core';
// import Ring from './Ring';



function FloatingBox() {
    return (
        <Card className='flowtingbox-card'>
            <CardHeader
                title="Solar system"
                subheader="3D using Three.js (rotate using mouse or touch)"
            />
            <Canvas camera={{ position: [100, 100, 100], fov: 100 }}
                style={{
                    backgroundColor: '#111a21',
                    width: '100%',
                    height: '100vh',
                }}>
                <OrbitControls />
                <Stars />
                <ambientLight intensity={1.2} />
                <pointLight position={[10, 10, 10]} />
                {/* Sun */}
                <Planet rotationValue={0} position={[0, 0, 0]} scale={[30, 30, 30]} texture={'/textures/8k_sun.jpg'} />
                {/* Mercury */}
                <Planet speed={0.02} rotationValue={50} position={[50, 0, 0]} scale={[0.108, 0.108, 0.108]} texture={'/textures/mercury.jpg'} />
                {/* <Ring position={[0, 0, 0]} scale={[50, 50, 50]} color={'white'} attributes={[.999, 1, 128]} /> */}
                {/* Venus */}
                <Planet speed={0.01} rotationValue={60} position={[60, 0, 0]} scale={[0.26, 0.26, 0.26]} texture={'/textures/venus.jpg'} />
                {/* <Ring position={[0, 0, 0]} scale={[60, 60, 60]} color={'white'} attributes={[.999, 1, 128]} /> */}
                {/* Earth */}
                <Planet speed={0.03} rotationValue={70} position={[70, 0, 0]} scale={[0.27, 0.27, 0.27]} texture={'/textures/earth.jpg'} />
                {/* <Ring position={[0, 0, 0]} scale={[70, 70, 70]} color={'white'} attributes={[.999, 1, 128]} /> */}
                {/* Mars */}
                <Planet speed={0.001} rotationValue={80} position={[80, 0, 0]} scale={[0.14, 0.14, 0.14]} texture={'/textures/mars.jpg'} />
                {/* <Ring position={[0, 0, 0]} scale={[80, 80, 80]} color={'white'} attributes={[.999, 1, 128]} /> */}
                {/* Jupiter */}
                <Planet speed={0.05} rotationValue={90} position={[90, 0, 0]} scale={[2.7, 2.7, 2.7]} texture={'/textures/jupiter.jpg'} />
                {/* <Ring position={[0, 0, 0]} scale={[90, 90, 90]} color={'white'} attributes={[.999, 1, 128]} /> */}
                {/* Saturn */}
                <Planet speed={0.04} rotationValue={100} position={[100, 0, 0]} scale={[2.5, 2.5, 2.5]} texture={'/textures/saturn.jpg'} />
                {/* <Ring position={[0, 0, 0]} scale={[100, 100, 100]} color={'white'} attributes={[.999, 1, 128]} /> */}
                {/* Neptune */}
                <Planet speed={0.007} rotationValue={110} position={[110, 0, 0]} scale={[1.08, 1.08, 1.08]} texture={'/textures/neptune.jpg'} />
                {/* <Ring position={[0, 0, 0]} scale={[110, 110, 110]} color={'white'} attributes={[.999, 1, 128]} /> */}
                {/* Uranus */}
                <Planet speed={0.01} rotationValue={120} position={[120, 0, 0]} scale={[1.09, 1.09, 1.09]} texture={'/textures/uranus.jpg'} />
                {/* <Ring position={[0, 0, 0]} scale={[120, 120, 120]} color={'white'} attributes={[.999, 1, 128]} /> */}
                {/* Pluto */}
                <Planet speed={0.08} rotationValue={130} position={[130, 0, 0]} scale={[0.05, 0.05, 0.05]} color={'#34cfeb'} texture={'/textures/uranus.jpg'} />
                {/* <Ring position={[0, 0, 0]} scale={[130, 130, 130]} color={'white'} attributes={[.999, 1, 128]} /> */}
            </Canvas>
        </Card>
    );
}

export default FloatingBox;
