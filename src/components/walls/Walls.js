export const Walls = ()=>{
    return(
        <group receiveShadow>
        {/* tv wall */}
        <Plane
          receiveShadow
          position={[0, 0, 0]}
          args={[65, 30]} // Width, height, depth. Default is [1, 1, 1]
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