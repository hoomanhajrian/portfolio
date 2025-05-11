import { useRef,useState } from "react";
import { Text3D } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";

export const Projects3DText = () => {

        const colors = ['red','yellow','blue','lightgreen','purple','orange','lightblue','cyan','hotpink'];
        const textRef = useRef();
        const [textVerDirection, updateTextVerDirection] = useState('down');
        const [textHorDirection, updateTextHorDirection] = useState('right');
        const [textColor,updateColor] = useState(colors[0]);
    


        const checkHorLimit = (limit) => {
            if (limit < -17.5) {
                updateTextHorDirection('right');
                updateColor(colors[Math.ceil(Math.random() * colors.length)]);
            }
            if (limit > 17.5) {
                updateTextHorDirection('left');
                updateColor(colors[Math.ceil(Math.random() * colors.length)]);
            }
        };
        const checkVerLimit = (limit) => {
            if (limit > 5) {
                updateTextVerDirection('down');
            }
            if (limit < -5) {
                updateTextVerDirection('up');
            }
        };
        useFrame(() => {    
                const wordLength = 21;
                const Textheight = 2;
                const textLeftPos = textRef.current.position.x;
                const textRightPos = textLeftPos + wordLength;
                const textTopPos =  textRef.current.position.y;
                const textBottomPos =  textTopPos - Textheight;
    
                if (textHorDirection === 'right') {
                    textRef.current.position.x = textRef.current.position.x + 0.05;
                    checkHorLimit(textRightPos);
                }
                if (textHorDirection === 'left') {
                    textRef.current.position.x = textRef.current.position.x - 0.05;
                    checkHorLimit(textLeftPos);
                }
                if(textVerDirection === 'down'){
                    textRef.current.position.y = textRef.current.position.y - 0.05;
                    checkVerLimit(textTopPos);
                }
                if(textVerDirection === 'up'){
                    textRef.current.position.y = textRef.current.position.y + 0.05;
                    checkVerLimit(textBottomPos);
                }
    
            }
        );
    
    return (
        <Text3D
            ref={textRef}
            position={[-17.5, 7, 1]}
            font={"/Source Sans 3 ExtraLight_Regular.json"}
            letterSpacing={-0.06}
            size={3.5}
        >
            PROJECTS
            <meshPhongMaterial color={textColor} />
        </Text3D>
        )
}