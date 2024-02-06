// Custom styles for React-select
export const customStyle = {
    control: (baseStyle) => ({
      ...baseStyle,
      background: "#1c4b91",
      color: "white",
      maxWidth: "500px",
      minWidth: "240px",
    }),
    placeholder: (baseStyle) => ({
      ...baseStyle,
      color: "white",
    }),
    multiValueLabel: (baseStyle) => ({
      ...baseStyle,
      background: "black",
      color: "white",
      borderRadius: "10px 0 0 10px",
    }),
    multiValue: (baseStyle) => ({
      ...baseStyle,
      background: "none",
      border: "none",
    }),
    multiValueRemove: (baseStyle) => ({
      ...baseStyle,

      color: "white",
      background: "black",
      ":hover": {
        color: "white",
      },
      border: "none",
      borderRadius: "0 10px 10px 0",
    }),
    option: (baseStyle, state) => ({
      ...baseStyle,
      background: "#1c4b91",
    }),
  };