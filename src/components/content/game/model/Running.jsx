import {useEffect,useRef,useMemo,useState} from 'react';
import { useFrame, useGraph } from '@react-three/fiber';
import { useGLTF, useAnimations } from '@react-three/drei';
import { SkeletonUtils } from 'three-stdlib';
import * as THREE from 'three';

export const Running = (props) => {
  const modelRef = useRef();
  const [modelState, updateModelState] = useState('idle');
  const { scene, animations } = useGLTF('/running.glb');
  const clone = useMemo(() => SkeletonUtils.clone(scene), [scene])
  const { nodes, materials } = useGraph(clone);
  const { actions } = useAnimations(animations, modelRef);


//   useEffect(() => {/* highlight-line */
//     actions['Armature|mixamo.com|Layer0'].play(); /* highlight-line */
//  });

 useEffect(() => {
  const handleKeydown = (e) => {
    e.preventDefault();
    const { key, keyCode } = e;
    switch (keyCode) {
      case 37:
        // left
        updateModelState('turnLeft');
        // updateModelPos((prePos) => { return prePos[0] === -18 ? [0, prePos[1], prePos[2]] : [18, prePos[1], prePos[2]] });
        break;

      case 39:
        // right
        updateModelState('turnRight');
        // updateModelPos((prePos) => { return prePos[0] === 18 ? [0, prePos[1], prePos[2]] : [-18, prePos[1], prePos[2]] });
        break;

      default:
        updateModelState('idle');
        break;
    }
  };

  const idleState = () => {
    updateModelState('idle');
  };
  window.addEventListener('keydown', handleKeydown);
  window.addEventListener('keyup', idleState);

  return () => {
    window.removeEventListener('keydown', handleKeydown);
    window.removeEventListener('keyup', idleState);
  };
}, []);

 useFrame(({ gl, camera }) => {
      // camera.position.x = camera.position.x - 0.05;
      // camera.position.z = camera.position.z - 0.05;
      // camera.rotation.y = camera.rotation.y - 0.005;
      // camera.rotation.z = camera.rotation.z - 0.0004;
// camera.lookAt = modelRef.current;
// camera.rotation.set(THREE.MathUtils.degToRad(30), 0, 0);
      
});
  return (
    <group ref={modelRef} {...props} dispose={null} scale={15}>
      <group name="Scene">
        <group name="Armature">
          <primitive object={nodes.Hips} />
          <skinnedMesh name="Wolf3D_Body" geometry={nodes.Wolf3D_Body.geometry} material={materials.Wolf3D_Body} skeleton={nodes.Wolf3D_Body.skeleton} />
          <skinnedMesh name="Wolf3D_Hair" geometry={nodes.Wolf3D_Hair.geometry} material={materials.Wolf3D_Hair} skeleton={nodes.Wolf3D_Hair.skeleton} />
          <skinnedMesh name="Wolf3D_Outfit_Bottom" geometry={nodes.Wolf3D_Outfit_Bottom.geometry} material={materials.Wolf3D_Outfit_Bottom} skeleton={nodes.Wolf3D_Outfit_Bottom.skeleton} />
          <skinnedMesh name="Wolf3D_Outfit_Footwear" geometry={nodes.Wolf3D_Outfit_Footwear.geometry} material={materials.Wolf3D_Outfit_Footwear} skeleton={nodes.Wolf3D_Outfit_Footwear.skeleton} />
          <skinnedMesh name="Wolf3D_Outfit_Top" geometry={nodes.Wolf3D_Outfit_Top.geometry} material={materials.Wolf3D_Outfit_Top} skeleton={nodes.Wolf3D_Outfit_Top.skeleton} />
          <skinnedMesh name="EyeLeft" geometry={nodes.EyeLeft.geometry} material={materials.Wolf3D_Eye} skeleton={nodes.EyeLeft.skeleton} morphTargetDictionary={nodes.EyeLeft.morphTargetDictionary} morphTargetInfluences={nodes.EyeLeft.morphTargetInfluences} />
          <skinnedMesh name="EyeRight" geometry={nodes.EyeRight.geometry} material={materials.Wolf3D_Eye} skeleton={nodes.EyeRight.skeleton} morphTargetDictionary={nodes.EyeRight.morphTargetDictionary} morphTargetInfluences={nodes.EyeRight.morphTargetInfluences} />
          <skinnedMesh name="Wolf3D_Head" geometry={nodes.Wolf3D_Head.geometry} material={materials.Wolf3D_Skin} skeleton={nodes.Wolf3D_Head.skeleton} morphTargetDictionary={nodes.Wolf3D_Head.morphTargetDictionary} morphTargetInfluences={nodes.Wolf3D_Head.morphTargetInfluences} />
          <skinnedMesh name="Wolf3D_Teeth" geometry={nodes.Wolf3D_Teeth.geometry} material={materials.Wolf3D_Teeth} skeleton={nodes.Wolf3D_Teeth.skeleton} morphTargetDictionary={nodes.Wolf3D_Teeth.morphTargetDictionary} morphTargetInfluences={nodes.Wolf3D_Teeth.morphTargetInfluences} />
        </group>
      </group>
    </group>
  )
}

useGLTF.preload('/running.glb')
