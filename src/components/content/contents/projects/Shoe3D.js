import { RoundedBox } from "@react-three/drei";
import ShoeModel from "./ShoeModel";
const Shoe3D = () => {
  return (
    <group>
      <spotLight
        castShadow
        position={[14.5, 0, 20]}
        color="white"
        fov={"70"}
        intensity={1.5}
      />
      <RoundedBox
        receiveShadow
        position={[12, 0, 20]}
        args={[10, 5, 0]} // Width, height, depth. Default is [1, 1, 1]
        radius={0.05} // Radius of the rounded corners. Default is 0.05
        smoothness={4} // The number of curve segments. Default is 4
        bevelSegments={4} // The number of bevel segments. Default is 4, setting it to 0 removes the bevel, as a result the texture is applied to the whole geometry.
        creaseAngle={0.4} // Smooth normals everywhere except faces that meet at an angle greater than the crease angle
      >
        <meshPhongMaterial color="red" />
      </RoundedBox>
      <RoundedBox
        receiveShadow
        position={[12, -2.5, 22.3]}
        args={[10, 0, 4.7]} // Width, height, depth. Default is [1, 1, 1]
        radius={0.05} // Radius of the rounded corners. Default is 0.05
        smoothness={4} // The number of curve segments. Default is 4
        bevelSegments={4} // The number of bevel segments. Default is 4, setting it to 0 removes the bevel, as a result the texture is applied to the whole geometry.
        creaseAngle={0.4} // Smooth normals everywhere except faces that meet at an angle greater than the crease angle
      >
        <meshPhongMaterial color="orange" />
      </RoundedBox>
      <RoundedBox
        receiveShadow
        position={[17, 0, 22]}
        args={[0, 5, 5]} // Width, height, depth. Default is [1, 1, 1]
        radius={0.05} // Radius of the rounded corners. Default is 0.05
        smoothness={4} // The number of curve segments. Default is 4
        bevelSegments={4} // The number of bevel segments. Default is 4, setting it to 0 removes the bevel, as a result the texture is applied to the whole geometry.
        creaseAngle={0.4} // Smooth normals everywhere except faces that meet at an angle greater than the crease angle
      >
        <meshPhongMaterial color="blue" />
      </RoundedBox>
      <ShoeModel position={[10, 30, 27]} />
    </group>
  );
};
export default Shoe3D;
