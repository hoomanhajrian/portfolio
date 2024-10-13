import { Text3D, Cylinder } from "@react-three/drei";

export const MenuButton = ({text,position}) => {

  return (<>
    {/* <Button2D text="Go Back" func={() => {}}  position={[0, 0, 0]} textPos={[-0.5, -0.65, -2.5]} rotation={[0, 0, 0]} args={[20, 20, 20]} /> */}
    <Cylinder
      position={position}
      receiveShadow
      args={[7, 5, 5]} // Width, height, depth. Default is [1, 1, 1]
      radius={15} // Radius of the rounded corners. Default is 0.05
      smoothness={4} // The number of curve segments. Default is 4
      bevelSegments={4} // The number of bevel segments. Default is 4, setting it to 0 removes the bevel, as a result the texture is applied to the whole geometry.
      creaseAngle={0.4} // Smooth normals everywhere except faces that meet at an angle greater than the crease angle
    //   onPointerOver={() => {
    //     updatePointerHover(true);
    //   }}
    //   onPointerOut={() => {
    //     updatePointerHover(false);
    //   }}
    //   onClick={() => {
    //     func();
    //   }}
    >
      <meshBasicMaterial color={"green"} />
    </Cylinder>
    <Text3D
      position={[-6, -5, 15]}
      rotation={[0,Math.PI,0]}
      font={"/Source Sans 3 ExtraLight_Regular.json"}
      letterSpacing={-0.06}
      size={3}
    >
      Newgame
    <meshBasicMaterial color="yellow" />
    </Text3D> 
  </>)
};