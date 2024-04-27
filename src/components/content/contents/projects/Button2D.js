import { useRef,useState,useEffect} from "react";
import { Text3D,RoundedBox } from "@react-three/drei";
const Button2D = ({func,position,text})=>{
  
  const [pointerHovered, updatePointerHover] = useState(false);
  const buttonRef = useRef();
  useEffect(() => {
    if (pointerHovered) {
      document.body.style.cursor = "pointer";
    } else {
      document.body.style.cursor = "default";
    }
  }, [pointerHovered]);

    return<>
    <RoundedBox
        ref={buttonRef}
        receiveShadow
        position={position}
        args={[8, 3, 1]} // Width, height, depth. Default is [1, 1, 1]
        radius={0.1} // Radius of the rounded corners. Default is 0.05
        smoothness={4} // The number of curve segments. Default is 4
        bevelSegments={4} // The number of bevel segments. Default is 4, setting it to 0 removes the bevel, as a result the texture is applied to the whole geometry.
        creaseAngle={0.4} // Smooth normals everywhere except faces that meet at an angle greater than the crease angle
        onPointerOver={() => {
          updatePointerHover(true);
        }}
        onPointerOut={() => {
          updatePointerHover(false);
        }}
        onClick={() => {
          func(false);
        }}
      >
        <meshPhongMaterial color={pointerHovered ? "darkblue" : "#1677ff"} />
      </RoundedBox>
      <Text3D
        position={[position[0] - 3, position[1] - 0.5, position[2]+0.5]}
        font={"/Source Sans 3 ExtraLight_Regular.json"}
        letterSpacing={-0.06}
        size={1}
      >
        {text}
        <meshPhongMaterial color="#fff" />
      </Text3D>
      </>
};

export default Button2D;