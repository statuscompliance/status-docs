import { useColorMode } from '@docusaurus/theme-common'

export default function Alert({ children }) {
    const { colorMode } = useColorMode()
    return (
      <div
        style={{
          padding: "12px",
          backgroundColor: colorMode == 'light' ? '#ffe6e6' : '#8c2d2d',
          borderLeft: "5px solid #d9534f",
          color: colorMode == 'light' ? '#a94442' : '#ffe6e6',
          margin: "20px 0",
          borderRadius: "5px",
          fontWeight: "bold",
        }}
      >
        ⚠️ {children}
      </div>
    );
  }
