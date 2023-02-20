import { View, Text, tokens, rcss } from "node_modules";
import { ReactNode } from "react";

const Tab = ({
  text,
  onClick,
  icon,
  isFocused,
}: {
  text: string;
  onClick: () => void;
  icon: ReactNode;
  isFocused?: boolean;
}) => {
  return (
    <View
      css={[
        rcss.px(8),
        rcss.py(4),
        rcss.borderRadius(8),
        rcss.flex.row,
        rcss.align.center,
        rcss.rowWithGap(4),
        {
          background: isFocused
            ? tokens.backgroundHigher
            : tokens.backgroundDefault,
          transition: "0.25s",
          "&:hover": {
            background: isFocused
              ? tokens.backgroundHighest
              : tokens.backgroundHigher,
            cursor: "pointer",
          },
        },
      ]}
      onClick={onClick}
    >
      {icon}
      <Text color="dimmer" variant="small">
        {text}
      </Text>
    </View>
  );
};

export default Tab;
