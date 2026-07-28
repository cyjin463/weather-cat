import { Pressable, Text } from "react-native";

interface RegionSelectBtnProps {
    onPress: () => void;
    text: string;
    color: string;
    disabled?: boolean;
}

const RegionSelectBtn = ({ onPress, text, color, disabled }: RegionSelectBtnProps) => {
  return (
    <Pressable
      onPress={disabled ? undefined : onPress} 
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
        opacity: disabled ? 0.3 : 1,
      }}>
      <Text style={{ fontSize: 24, fontWeight: "bold", color: color }}>{text}</Text>
    </Pressable>
  );
};

export default RegionSelectBtn;