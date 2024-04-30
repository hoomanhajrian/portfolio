import { Text3D, RoundedBox } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useRef, useState } from "react";
const Television = () => {
    const [tvOn, changeTvState] = useState(true);
    const textRef = useRef();

    useFrame(()=>{
        // if(textRef.current.position.x < 10 || textRef.current.position.x > 35){
        //     textRef.current.position.x = textRef.current.position.x + 0.005;
        // }
        console.log(textRef.current);
    });

    return <group>
        {/* TV */}
        <group>
            <RoundedBox
                receiveShadow
                position={[0, 2, .5]}
                args={[35, 18, 0.5]} // Width, height, depth. Default is [1, 1, 1]
                radius={0.05} // Radius of the rounded corners. Default is 0.05
                smoothness={4} // The number of curve segments. Default is 4
                bevelSegments={4} // The number of bevel segments. Default is 4, setting it to 0 removes the bevel, as a result the texture is applied to the whole geometry.
                creaseAngle={0.4} // Smooth normals everywhere except faces that meet at an angle greater than the crease angle
            >
                <meshBasicMaterial color={tvOn ? 'white' : 'black'} attach="material" />
            </RoundedBox>
            <RoundedBox
                receiveShadow
                position={[0, -7, 1]}
                args={[35, 2, 0.5]} // Width, height, depth. Default is [1, 1, 1]
                radius={0.05} // Radius of the rounded corners. Default is 0.05
                smoothness={4} // The number of curve segments. Default is 4
                bevelSegments={4} // The number of bevel segments. Default is 4, setting it to 0 removes the bevel, as a result the texture is applied to the whole geometry.
                creaseAngle={0.4} // Smooth normals everywhere except faces that meet at an angle greater than the crease angle
            >
                <meshBasicMaterial color={'black'} attach="material" />
            </RoundedBox>
            {tvOn ? <Text3D
            r   ef={textRef}
                position={[-10, 2, 1]}
                font={"/Source Sans 3 ExtraLight_Regular.json"}
                letterSpacing={-0.06}
                size={3.5}
            >
                PROJECTS
                <meshPhongMaterial color={"yellow"} />
            </Text3D> : <></>}
            {/* tv buttons */}
            <group>
                <RoundedBox
                    onClick={() => { changeTvState(!tvOn) }}
                    receiveShadow
                    position={[16, -7, 1]}
                    args={[1, 1, 1]} // Width, height, depth. Default is [1, 1, 1]
                    radius={0.5} // Radius of the rounded corners. Default is 0.05
                    smoothness={4} // The number of curve segments. Default is 4
                    bevelSegments={4} // The number of bevel segments. Default is 4, setting it to 0 removes the bevel, as a result the texture is applied to the whole geometry.
                    creaseAngle={0.4} // Smooth normals everywhere except faces that meet at an angle greater than the crease angle
                >
                    <meshBasicMaterial color={tvOn ? 'lightgreen' : 'red'} attach="material" />
                </RoundedBox>
            </group>
        </group>
    </group>
};
export default Television;