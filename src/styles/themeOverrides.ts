import { GlobalThemeOverrides } from 'naive-ui'

export const themeOverrides: GlobalThemeOverrides = {
  common: {
    primaryColor: '#333333',
    primaryColorHover: '#666666',
    primaryColorPressed: '#000000',
    primaryColorSuppl: '#ffffff',
    
    textColor1: '#000000',
    textColor2: '#333333',
    textColor3: '#666666',
    
    borderColor: '#e5e5e5',
    borderRadius: '4px',
    
    bodyColor: '#ffffff',
    cardColor: '#ffffff',
    modalColor: '#ffffff',
    popoverColor: '#ffffff',
    
    dividerColor: '#e5e5e5',
    placeholderColor: '#999999',
    
    heightTiny: '22px',
    heightSmall: '28px',
    heightMedium: '34px',
    heightLarge: '40px'
  },
  Button: {
    textColor: '#333333',
    border: '1px solid #e5e5e5',
    borderHover: '1px solid #666666',
    borderPressed: '1px solid #000000',
    borderFocus: '1px solid #333333',
    backgroundColor: '#ffffff',
    backgroundColorHover: '#f5f5f5',
    backgroundColorPressed: '#e5e5e5',
  },
  Input: {
    color: '#ffffff',
    borderColor: '#e5e5e5',
    borderHover: '#666666',
    borderFocus: '#333333',
  },
  Card: {
    color: '#ffffff',
    borderColor: '#e5e5e5',
  },
  Select: {
    peers: {
      InternalSelection: {
        textColor: '#333333',
        border: '#e5e5e5',
        borderHover: '#666666',
        borderFocus: '#333333',
      }
    }
  },
  // 可以继续添加其他组件的样式覆盖
}
