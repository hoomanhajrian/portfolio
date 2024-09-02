import { Plane } from "@react-three/drei";
import { useLoader } from "@react-three/fiber";
import { TextureLoader } from 'three/src/loaders/TextureLoader'
export const Walls = ()=>{
  const [wallTexture, wallRoughness, groundTexture,groundRoughness] = useLoader(TextureLoader, ["/textures/wall/brick-wall.jpg", "/textures/wall/brick-wall-rough.jpg"
    , "/textures/ground/asphalt.jpg","/textures/ground/asphalt-rough.jpg"])
  
  
  return(
      <group receiveShadow>
      {/* tv wall */}
      <Plane
        receiveShadow
        position={[0, 0, -12]}
        args={[65, 30]} // Width, height, depth. Default is [1, 1, 1]
      >
        <meshPhongMaterial map={wallTexture} bumpMap={wallRoughness} bumpScale={1.3}/>
      </Plane>
      {/* oposite tv wall */}
      <Plane
        receiveShadow
        position={[0, 0, 77]}
        rotation={[-Math.PI, 0, 0]}
        args={[65, 30]} // Width, height, depth. Default is [1, 1, 1]
      >
        <meshPhongMaterial map={wallTexture} bumpMap={wallRoughness} bumpScale={1.3}/>
      </Plane>
      {/* projects wall */}
      <Plane
        receiveShadow
        position={[32.5, 0, 32.5]}
        rotation={[0, -Math.PI / 2, 0]}
        args={[90, 30]} // Width, height, depth. Default is [1, 1, 1]
       >
        <meshPhongMaterial map={wallTexture} bumpMap={wallRoughness} bumpScale={1.3}/>
      </Plane>
      {/* oposite projects wall */}
      <Plane
        receiveShadow
        position={[-32.5, 0, 32.5]}
        rotation={[0, Math.PI / 2, 0]}
        args={[90, 30]} // Width, height, depth. Default is [1, 1, 1]
       >
        <meshPhongMaterial map={wallTexture} bumpMap={wallRoughness} bumpScale={1.3}/>
      </Plane>
      {/* ground */}
      <Plane
        receiveShadow
        position={[0, -15, 32.5]}
        rotation={[-Math.PI / 2, 0, 0]}
        args={[65, 90]} // Width, height, depth. Default is [1, 1, 1]
       >
       <meshPhongMaterial map={groundTexture} bumpMap={groundRoughness} bumpScale={1.3}/>
      </Plane>
    </group>
    )
};