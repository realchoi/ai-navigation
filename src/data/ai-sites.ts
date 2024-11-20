interface AISite {
  id: string;
  name: string;
  description: string;
  category: string[];
  tags: string[];
  url: string;
  logo: string;
}

export const aiSites: AISite[] = [
  {
    id: "1",
    name: "ChatGPT",
    description: "OpenAI 开发的 AI 聊天助手，支持自然对话、代码编写、文本分析等多种功能",
    category: ["AI助手", "聊天"],
    tags: ["GPT", "对话", "AI", "热门"],
    url: "https://chat.openai.com",
    logo: "https://cdn.oaistatic.com/_next/static/media/favicon-32x32.be48395e.png"
  },
  {
    id: "2",
    name: "文心一言",
    description: "百度推出的人工智能语言模型，支持中文创作、问答、分析",
    category: ["AI助手", "聊天"],
    tags: ["国产", "对话", "创作"],
    url: "https://yiyan.baidu.com",
    logo: "https://yiyan.baidu.com/favicon.ico"
  },
  {
    id: "3",
    name: "Midjourney",
    description: "AI 艺术创作和图像生成工具，可以根据文本描述生成高质量图片",
    category: ["AI绘画", "创作"],
    tags: ["绘画", "艺术", "创作"],
    url: "https://www.midjourney.com",
    logo: "https://www.midjourney.com/favicon.ico"
  },
  {
    id: "4",
    name: "通义千问",
    description: "阿里云推出的大语言模型，擅长中文理解和行业知识",
    category: ["AI助手", "聊天"],
    tags: ["国产", "对话", "专业"],
    url: "https://qianwen.aliyun.com",
    logo: "https://qianwen.aliyun.com/favicon.ico"
  },
  {
    id: "5",
    name: "Stable Diffusion",
    description: "开源的 AI 图像生成模型，支持本地部署",
    category: ["AI绘画", "开源"],
    tags: ["绘画", "开源", "创作"],
    url: "https://stability.ai",
    logo: "https://stability.ai/favicon.ico"
  },
  {
    id: "6",
    name: "Claude",
    description: "Anthropic 开发的 AI 助手，注重安全性和准确性",
    category: ["AI助手", "聊天"],
    tags: ["对话", "专业", "写作"],
    url: "https://claude.ai",
    logo: "https://claude.ai/favicon.ico"
  },
  {
    id: "7",
    name: "讯飞星火",
    description: "科大讯飞推出的认知大模型，专注中文交互和语音技术",
    category: ["AI助手", "聊天"],
    tags: ["国产", "对话", "语音"],
    url: "https://xinghuo.xfyun.cn",
    logo: "https://xinghuo.xfyun.cn/favicon.ico"
  },
  {
    id: "8",
    name: "Notion AI",
    description: "Notion 集成的 AI 助手，支持写作、总结、翻译等功能",
    category: ["AI助手", "效率"],
    tags: ["写作", "效率", "办公"],
    url: "https://notion.so",
    logo: "https://www.notion.so/images/favicon.ico"
  },
  {
    id: "9",
    name: "Copilot",
    description: "GitHub 和 OpenAI 合作开发的 AI 编程助手",
    category: ["编程", "开发"],
    tags: ["代码", "编程", "效率"],
    url: "https://github.com/features/copilot",
    logo: "https://github.com/favicon.ico"
  },
  {
    id: "10",
    name: "智谱 ChatGLM",
    description: "清华大学开源的中文大语言模型，支持本地部署",
    category: ["AI助手", "开源"],
    tags: ["国产", "开源", "对话"],
    url: "https://chatglm.cn",
    logo: "https://chatglm.cn/favicon.ico"
  },
  {
    id: "11",
    name: "Gamma",
    description: "AI 驱动的演示文稿创作平台，可快速生成精美 PPT",
    category: ["效率", "创作"],
    tags: ["PPT", "办公", "创作"],
    url: "https://gamma.app",
    logo: "https://gamma.app/favicon.ico"
  },
  {
    id: "12",
    name: "Jasper",
    description: "AI 写作助手，专注于营销文案和内容创作",
    category: ["写作", "营销"],
    tags: ["写作", "营销", "创作"],
    url: "https://jasper.ai",
    logo: "https://www.jasper.ai/favicon.ico"
  }
]