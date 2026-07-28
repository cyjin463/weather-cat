import { Pressable, Text } from "react-native";

interface RegionSelectBtnProps {
    onPress: () => void;
    text: string;
    color: string;
}

const RegionSelectBtn = ({ onPress, text, color }: RegionSelectBtnProps) => {
  return (
    <Pressable
      onPress={onPress} 
      style={{ 
        alignItems: "center", 
        paddingVertical: 8,
        borderRadius: 16, 
        backgroundColor: "rgba(255,255,255,0.2)", 
        borderWidth: 1, 
        borderColor: color,
        minWidth: 300,
        maxWidth: 500,
        overflow: "hidden",
      }}>
      <Text style={{ fontSize: 24, fontWeight: "bold", color: color }}>{text}</Text>
    </Pressable>
  );
};

export default RegionSelectBtn;