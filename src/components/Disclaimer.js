import { useColorMode } from '@docusaurus/theme-common'

export default function Disclaimer({ children }) {
    const { colorMode } = useColorMode()
    return (
      <div
        style={{
          padding: "12px",
          backgroundColor: colorMode == 'light' ? '#fff3cd' : '#856404',
          borderLeft: "5px solid #ffc107",
          color: colorMode == 'light' ? '#856404' : '#fff3cd',
          margin: "20px 0",
          borderRadius: "5px",
        }}
      >
        ℹ️ {children}
      </div>
    );
  }
