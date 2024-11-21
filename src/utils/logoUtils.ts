export function getLocalLogo(logo: string): string {
    // 将站点名称转换为文件名格式（小写，移除特殊字符）
    const logoName = logo.toLowerCase()
    console.log(`logoName: ${logoName}`)
    return `/logos/${logoName}.png`
}

// 默认 logo 路径
export const DEFAULT_LOGO = '/logos/default.png'