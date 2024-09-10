import { useEffect, useRef, useMemo, useState } from 'react';
import { useFrame, useGraph } from '@react-three/fiber';
import { useGLTF, useAnimations } from '@react-three/drei';
import { SkeletonUtils } from 'three-stdlib';

export const Model = (props) => {
  const modelRef = useRef();
  const [modelState, updateModelState] = useState('idle');
  const [modelPos, updateModelPos] = useState([0, -15, 0]);
  const [modelRotation, updateModelRotation] = useState([Math.PI / 2, 0, 0]);
  const modelDirectionPercentageRef = useRef({ x: 0, y: 1 });
  const [modelSpeed, updateModelSpeed] = useState(.6);
  const { scene, animations } = useGLTF('/models/model-walking.glb')
  const clone = useMemo(() => SkeletonUtils.clone(scene), [scene])
  const { nodes, materials } = useGraph(clone)
  const { actions } = useAnimations(animations, modelRef);
  const maxSpeed = 3;
  const rotationSpeed = Math.PI / 64;

  useEffect(() => {
    // console.log("actions", actions);
    const handleKeydown = (e) => {
      e.preventDefault();
      const { key, keyCode } = e;
      switch (keyCode) {
        case 37:
          // left
          updateModelState('turnLeft');
          updateModelRotation((preDeg) => { return [preDeg[0], preDeg[1], preDeg[2] - rotationSpeed] });
          actions['Armature.001|mixamo.com|Layer0.001'].play();
          break;
        case 39:
          // right
          updateModelState('turnLeft');
          updateModelRotation((preDeg) => { return [preDeg[0], preDeg[1], preDeg[2] + rotationSpeed] });
          actions['Armature.001|mixamo.com|Layer0.001'].play();
          break;
        case 38:
          // up
          console.log('direction', modelDirectionPercentageRef.current);
          updateModelSpeed((preSpeed) => { return preSpeed < maxSpeed ? preSpeed + 0.01 : preSpeed })
          // updateModelState('walking');
          updateModelPos((prePos) => { return [prePos[0] + (modelSpeed * (modelDirectionPercentageRef.current.x / 100)), prePos[1], prePos[2] + (modelSpeed * (modelDirectionPercentageRef.current.y) / 100)] });


          actions['Armature.001|mixamo.com|Layer0.001'].play();

          // start walking animation
          // actions['Armature|mixamo.com|Layer0'].play();
          break;
        case 40:
          // down
          updateModelState('running');
          updateModelPos((prePos) => { return [prePos[0], prePos[1], prePos[2] - 0.5] });
          actions['Armature.002|mixamo.com|Layer0'].play();
          break;



        default:
          idleState();
          break;
      }
    };
    const idleState = () => {
      actions['Armature.002|mixamo.com|Layer0'].stop();
      actions['Armature.001|mixamo.com|Layer0.001'].stop();
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

    const charDeg = (modelRotation[2] * (180 / Math.PI).toFixed(0)) % 360;

    const convertToPercent = (x) => {
      const result = ((charDeg % 90) * 100) / 90;
      if (charDeg > 0) {
        if (charDeg <= 90) {
          return { x: -result, y: 100 - result }
        }
        else if (charDeg > 90 && charDeg <= 180) {
          return { x: -(100 - result), y: -result  }
        }
        else if (charDeg > 180 && charDeg <= 270) {
          return { x: result, y: -(100 - result) }
        }
        else if (charDeg > 270 && charDeg <= 359) {
          return { x: 100 - result, y:result  }
        }
      } else {
        const charDegAbs = Math.abs(charDeg);

        if (charDegAbs <= 90) {
          console.log('91');
          return { x: - result, y: 100 + result }
        }
        else if (charDegAbs > 90 && charDegAbs <= 180) {
          console.log('94');
          return { x: -result , y: -(100 + result) }
        }
        else if (charDegAbs > 180 && charDegAbs <= 270) {
          console.log('93');
          return { x:result, y:  - (100 + result) }
        }
        else if (charDegAbs > 270 && charDegAbs <= 359) {
          console.log('92');
          console.log(result);
          
          return { x: result, y: 100+result}
        }
      }
    }


    // checks the rotation side right or left...

    modelDirectionPercentageRef.current = convertToPercent(charDeg);

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
      <group name="walking">
        <group name="Armature001" rotation={modelRotation} scale={0.15}>
          <primitive object={nodes.mixamorigHips_1} />
          <skinnedMesh name="ely_vanguardsoldier_kerwinatienza_Mesh001" geometry={nodes.ely_vanguardsoldier_kerwinatienza_Mesh001.geometry} material={materials['ely_vanguardsoldier_kerwinatienza_M2.001']} skeleton={nodes.ely_vanguardsoldier_kerwinatienza_Mesh001.skeleton} />
        </group>
      </group>
    </group>
  )
}

useGLTF.preload('/models/model-walking.glb');
