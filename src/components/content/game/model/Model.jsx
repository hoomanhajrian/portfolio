import { useEffect, useRef, useMemo, useState } from 'react';
import { useFrame, useGraph } from '@react-three/fiber';
import { useGLTF, useAnimations } from '@react-three/drei';
import { SkeletonUtils } from 'three-stdlib';

export const Model = (props) => {
  const modelRef = useRef();
  const [modelPos, updateModelPos] = useState([0, -15, 0]);
  const [modelRotation, updateModelRotation] = useState([Math.PI / 2, 0, 0]);
  const modelDeg = useRef({ x: 0, y: 1 });
  const [modelSpeed, updateModelSpeed] = useState(.6);
  const { scene, animations } = useGLTF('/models/model.glb')
  const clone = useMemo(() => SkeletonUtils.clone(scene), [scene])
  const { nodes, materials } = useGraph(clone)
  const { actions } = useAnimations(animations, modelRef);
  const maxSpeed = 3;
  const rotationSpeed = Math.PI / 32;

  useEffect(() => {
    console.log("actions", actions);
    actions['idle'].play();
    const handleKeydown = (e) => {
      e.preventDefault();
      const { key, keyCode } = e;
      switch (keyCode) {
        case 37:
          // left
          updateModelRotation((preDeg) => { return [preDeg[0], preDeg[1], preDeg[2] - rotationSpeed] });
          actions['lookright'].play();
          break;
        case 39:
          // right
          updateModelRotation((preDeg) => { return [preDeg[0], preDeg[1], preDeg[2] + rotationSpeed] });
          actions['lookleft'].play();
          break;
        case 38:
          // up
          actions['idle'].stop();
          actions['walking.001'].play();
          updateModelSpeed((preSpeed) => { return preSpeed < maxSpeed ? preSpeed + 0.02 : preSpeed });
          updateModelPos((prePos) => {
            return [prePos[0] + modelSpeed * modelDeg.current.x, prePos[1], prePos[2] + modelSpeed * modelDeg.current.y]
          });

          // start walking animation
          // actions['Armature|mixamo.com|Layer0'].play();
          break;
        case 40:
          // down
          updateModelSpeed((preSpeed) => { return preSpeed < maxSpeed ? preSpeed + 0.01 : preSpeed });
          updateModelPos((prePos) => {
            return [prePos[0] - modelSpeed * modelDeg.current.x, prePos[1], prePos[2] - modelSpeed * modelDeg.current.y]
          });
          actions['walkback'].play();
          break;



        default:
          idleState();
          break;
      }
    };
    const idleState = () => {
      actions['walking.001'].stop();
      actions['walkback'].stop();
      actions['lookleft'].stop();
actions['lookright'].stop();
      actions['idle'].play();
      updateModelSpeed(.6);
    };
    window.addEventListener('keydown', handleKeydown);
    window.addEventListener('keyup', idleState);

    return () => {
      window.removeEventListener('keydown', handleKeydown);
      window.removeEventListener('keyup', idleState);
    };
  }, []);

  // Character rotation
  useEffect(() => {
    const deg = modelRotation[2];
    modelDeg.current = { x: -Math.sin(deg), y: Math.cos(deg) };
  }, [modelRotation]);


  useFrame(({ gl, camera }) => {
    // camera.position 
    camera.position.x = 0;
    camera.position.y = 15;
    camera.position.z = -20;
    // modelRef.current.rotation.y += 0.01;
  });
  return (
    <group ref={modelRef} position={modelPos} {...props} dispose={null}>
      <group name="model">
        <group name="Armature" rotation={modelRotation} scale={0.15}>
          <primitive object={nodes.mixamorigHips} />
          <skinnedMesh name="ely_vanguardsoldier_kerwinatienza_Mesh" geometry={nodes.ely_vanguardsoldier_kerwinatienza_Mesh.geometry} material={materials['ely_vanguardsoldier_kerwinatienza_M2.003']} skeleton={nodes.ely_vanguardsoldier_kerwinatienza_Mesh.skeleton} />
        </group>
      </group>
    </group>
  )
}

useGLTF.preload('/models/model.glb');
