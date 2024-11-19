import { Box } from "@react-three/drei";
import { RigidBody } from "@react-three/rapier";
import { useRef, useState } from "react";

const dominos = [{ position: { x: -12, y: 20 } },{ position: { x: -10, y: 20 } }, { position: { x: -8, y: 20 } }, { position: { x: -6, y: 20 } }, { position: { x: -4, y: 20 } }, { position: { x: -2, y: 20 } }];

export const Dominos = () => {
    const boxRef = useRef();
    const [hovered,hover] = useState();

    const jumpRight = () => {
        boxRef.current.applyImpulse({ x: -2, y: 0, z: 0 });
    };

    return (
        <>
            {dominos.map((item, index) => {
                return (
                    <RigidBody friction={1} position={[item.position.x, -6, item.position.y]} ref={boxRef} key={index} colliders={'cuboid'}>
                        <Box onPointerEnter={()=>{hover(true)}} onPointerLeave={()=>{hover(false)}} onClick={jumpRight} castShadow receiveShadow args={[.5, 3, 1]}>
                            <meshStandardMaterial color={hovered?"lightgreen":'darkGreen'} />
                        </Box>
                    </RigidBody>)
            })}

            {/* <RigidBody colliders={'cuboid'} type='dynamic'>
                <Box position={[-9, 0, 15]} castShadow receiveShadow args={[1, 3, 1]}>
                    <meshStandardMaterial color={'darkGreen'} />
                </Box>
            </RigidBody> */}
        </>
    )
};