import { useEffect, useRef, useMemo, useState } from 'react';
import { useFrame, useGraph } from '@react-three/fiber';
import { useGLTF, useAnimations } from '@react-three/drei';
import { SkeletonUtils } from 'three-stdlib';
import { ArrowUpward } from '@mui/icons-material';





export const Model = (props) => {
  const modelRef = useRef();
  const [modelPos, updateModelPos] = useState([0, -15, -10]);
  const [modelRotation, updateModelRotation] = useState([Math.PI / 2, 0, 0]);
  const modelDeg = useRef({ x: 0, y: 1 });
  const [modelWalkSpeed, updateModelWalkSpeed] = useState(.6);
  const [modelRunSpeed, updateModelRunSpeed] = useState(1.5);
  const [modelBackSpeed, updatemodelBackSpeed] = useState(.3);
  const { scene, animations } = useGLTF('/models/model.glb')
  const clone = useMemo(() => SkeletonUtils.clone(scene), [scene])
  const { nodes, materials } = useGraph(clone)
  const { actions } = useAnimations(animations, modelRef);
  const maxSpeed = 3;
  const rotationSpeed = Math.PI / 32;



  const idleState = () => {
    actions['walking'].stop();
    actions['walkback'].stop();
    actions['lookleft'].stop();
    actions['running'].stop();
    actions['lookright'].stop();
    actions['idle'].play();
    updateModelWalkSpeed(.6);
    updateModelRunSpeed(1.5)
  };



  // on key press and leave

  const onkeyup = (e) => {
    idleState();
  };

  const onkeydown = (e) => {
    e.preventDefault();
    console.log("actions", actions);
    const { key, keyCode, shiftKey } = e;
    console.log(key, keyCode, shiftKey);

    /*conditionals here */
    switch (keyCode) {
      case 37:
        // left
        updateModelRotation((preDeg) => { return [preDeg[0], preDeg[1], preDeg[2] - rotationSpeed] });
        actions['lookright'].play();
        actions['walking'].play();
        break;
      case 39:
        // right
        updateModelRotation((preDeg) => { return [preDeg[0], preDeg[1], preDeg[2] + rotationSpeed] });
        actions['lookleft'].play();
        actions['walking'].play();
        break;
      case 38:
        // up
        if (!shiftKey) {
          updateModelWalkSpeed((preSpeed) => { return preSpeed < maxSpeed ? preSpeed + 0.02 : preSpeed });
          updateModelPos((prePos) => {
            return [prePos[0] + modelWalkSpeed * modelDeg.current.x, prePos[1], prePos[2] + modelWalkSpeed * modelDeg.current.y]
          });
          actions['walking'].play();
          actions['running'].stop();
        } else {
          updateModelWalkSpeed((preSpeed) => { return preSpeed < maxSpeed ? preSpeed + 0.02 : preSpeed });
          updateModelPos((prePos) => {
            return [prePos[0] + modelRunSpeed * modelDeg.current.x, prePos[1], prePos[2] + modelRunSpeed * modelDeg.current.y]
          });
          actions['walking'].stop();
          actions['running'].play();
        }

        // start walking animation
        // actions['Armature|mixamo.com|Layer0'].play();
        break;
      case 40:
        // down
        updateModelWalkSpeed((preSpeed) => { return preSpeed < maxSpeed ? preSpeed + 0.01 : preSpeed });
        updateModelPos((prePos) => {
          return [prePos[0] - modelBackSpeed * modelDeg.current.x, prePos[1], prePos[2] - modelBackSpeed * modelDeg.current.y]
        });
        actions['walkback'].play();
        break;
      default:
        idleState();
        break;
    }
  };

  useEffect(() => {
    window.addEventListener('keydown', onkeydown);
    window.addEventListener('keyup', onkeyup);

    return () => {
      window.removeEventListener('keydown', onkeydown);
      window.removeEventListener('keyup', onkeyup);
    };
  }, []);

  // Character rotation
  useEffect(() => {
    const deg = modelRotation[2];
    modelDeg.current = { x: -Math.sin(deg), y: Math.cos(deg) };
  }, [modelRotation]);



  useEffect(() => {
    actions['idle'].play();
  }, [onkeydown]);


  useFrame(({ gl, camera, delta }) => {
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
