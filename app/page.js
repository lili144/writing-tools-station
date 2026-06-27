'use client'

const tools = [
  {
    href: '/word-count',
    icon: '📊',
    name: '字数统计器',
    desc: '实时统计总字数、中文字数、英文单词数、段落数、预计阅读时间',
  },
  {
    href: '/readability',
    icon: '📖',
    name: '可读性检测',
    desc: '分析句子长度分布、复杂句比例，给出可读性评分和改进建议',
  },
  {
    href: '/title-score',
    icon: '🎯',
    name: '标题吸引力评分',
    desc: '从长度、数字、情绪词、悬念感等维度评估标题质量',
  },
  {
    href: '/structure-check',
    icon: '🏗️',
    name: '文章结构检测',
    desc: '检测段落分布、小标题使用、首尾段质量，给出结构优化建议',
  },
  {
    href: '/synonym',
    icon: '🔄',
    name: '同义词替换建议',
    desc: '输入常用词，获取近义替换选项，让文章表达更丰富',
  },
]

export default function Home() {
  return (
    <div className="container" style={{ paddingTop: 64 }}>
      <div style={{ textAlign: 'center', marginBottom: 56 }}>
        <h1 style={{
          fontSize: 36,
          fontWeight: 700,
          letterSpacing: '-0.02em',
          marginBottom: 16,
        }}>
          让写作更清晰
        </h1>
        <p style={{ fontSize: 17, color: '#666', maxWidth: 480, margin: '0 auto' }}>
          5个免费工具，帮你检查字数、可读性、标题质量和文章结构。无需注册，数据不上传。
        </p>
      </div>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
        gap: 20,
      }}>
        {tools.map(tool => (
          <a key={tool.href} href={tool.href} style={{
            display: 'block',
            background: '#ffffff',
            border: '1.5px solid #e0ddd8',
            borderRadius: 10,
            padding: '28px 24px',
            transition: 'border-color 0.2s, box-shadow 0.2s',
            textDecoration: 'none',
            color: 'inherit',
          }}
          onMouseEnter={e => {
            e.currentTarget.style.borderColor = '#2d5a27'
            e.currentTarget.style.boxShadow = '0 4px 16px rgba(45,90,39,0.08)'
          }}
          onMouseLeave={e => {
            e.currentTarget.style.borderColor = '#e0ddd8'
            e.currentTarget.style.boxShadow = 'none'
          }}>
            <div style={{ fontSize: 32, marginBottom: 12 }}>{tool.icon}</div>
            <div style={{ fontWeight: 600, fontSize: 17, marginBottom: 8 }}>{tool.name}</div>
            <div style={{ fontSize: 14, color: '#666', lineHeight: 1.6 }}>{tool.desc}</div>
          </a>
        ))}
      </div>
    </div>
  )
}
