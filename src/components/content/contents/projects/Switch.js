import { RoundedBox, Cone, Text, SpotLight } from "@react-three/drei";
import { useRef } from "react";

const Switch = ({ position, updateSwitch, switchState }) => {
    const coneRef = useRef();
    return <group onClick={() => { updateSwitch(!switchState) }}>
        <Text>
            Light switch
        </Text>
        <Cone
            receiveShadow
            position={[position[0], position[1] + 10, position[2] + 3]}
            args={[3, 2, 3]} // Width, height, depth. Default is [1, 1, 1]
        >
            <meshStandardMaterial color={switchState ? '#bbb' : 'yellow'} />
        </Cone>
        <SpotLight
            position={[position[0] + 0.5, position[1] + 10, position[2] + 3]}
            distance={8}
            angle={1}
            attenuation={5}
            anglePower={5}
            target={coneRef.current}
            />
        <RoundedBox
        
        ref={coneRef}
            receiveShadow
            position={position}
            args={[3, 3, 1.5]} // Width, height, depth. Default is [1, 1, 1]
            radius={0.1} // Radius of the rounded corners. Default is 0.05
            smoothness={4} // The number of curve segments. Default is 4
            bevelSegments={4} // The number of bevel segments. Default is 4, setting it to 0 removes the bevel, as a result the texture is applied to the whole geometry.
            creaseAngle={0.4} // Smooth normals everywhere except faces that meet at an angle greater than the crease angle

        >
            <meshPhongMaterial color={'white'} />
        </RoundedBox>
        <RoundedBox
            receiveShadow
            position={position}
            args={[0.5, 1, 3]} // Width, height, depth. Default is [1, 1, 1]
            radius={0.1} // Radius of the rounded corners. Default is 0.05
            smoothness={4} // The number of curve segments. Default is 4
            bevelSegments={4} // The number of bevel segments. Default is 4, setting it to 0 removes the bevel, as a result the texture is applied to the whole geometry.
            creaseAngle={0.4} // Smooth normals everywhere except faces that meet at an angle greater than the crease angle
            rotation={switchState ? [+Math.PI / 8, 0, 0] : [-Math.PI / 8, 0, 0]}
        >
            <meshPhongMaterial color={'lightblue'} />
        </RoundedBox>
    </group>
};
export default Switch;