import { Canvas, useImage } from "@shopify/react-native-skia";
function Temp({ photo, setPhoto }) {
  const canvas = useRef(null);

  return <Canvas ref={canvas} onDraw={processImage} />;
}
