
import React from "react";
import { RoundedBox, Plane } from "@react-three/drei";
import { useLoader } from "@react-three/fiber";
import { TextureLoader } from 'three/src/loaders/TextureLoader';

const tableLegs = [
    { id: 0, position: [0, -13, 20] },
    // { id: 1, position: [0, -7, 15] },
    // { id: 2, position: [0, -7, 15] },
    // { id: 3, position: [0, -7, 15] }
];

export const Table = () => {

    const [tableTexture] = useLoader(TextureLoader, ["/textures/table/table.jpg"])

    return (
        <group>
            <Plane
                receiveShadow
                castShadow
                position={[0, -8, 25]}
                 args={[25,15]}
                rotation={[-Math.PI / 2, 0, 0]}
                radius={0.5} // Radius of the rounded corners. Default is 0.05
                smoothness={10} // The number of curve segments. Default is 4
                bevelSegments={4} // The number of bevel segments. Default is 4, setting it to 0 removes the bevel, as a result the texture is applied to the whole geometry.
                creaseAngle={0.4} // Smooth normals everywhere except faces that meet at an angle greater than the crease angle
           
            >
                <meshPhongMaterial map={tableTexture} />
            </Plane>
            {tableLegs.map(({ id, position }) => {
                return (
                    <RoundedBox
                        key={id}
                        castShadow
                        position={position}
                        args={[4, 7, 4]} // Width, height, depth. Default is [1, 1, 1]
                        radius={0.15} // Radius of the rounded corners. Default is 0.05
                        smoothness={10} // The number of curve segments. Default is 4
                        bevelSegments={4} // The number of bevel segments. Default is 4, setting it to 0 removes the bevel, as a result the texture is applied to the whole geometry.
                        creaseAngle={0.4} // Smooth normals everywhere except faces that meet at an angle greater than the crease angle
                    >
                        <meshPhongMaterial map={tableTexture} />
                    </RoundedBox>
                )
            })}
        </group>
    )
};
