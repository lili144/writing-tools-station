import './globals.css'

export const metadata = {
  title: '写作工具站 — 免费中文写作辅助工具',
  description: '免费在线中文写作工具集合，包含字数统计、可读性检测、标题评分、文章结构检测、同义词建议，无需注册即可使用。',
}

export default function RootLayout({ children }) {
  return (
    <html lang="zh-CN">
      <head>
        <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-5265207250332541" crossOrigin="anonymous"></script>
      </head>
      <body>
        <header style={{
          borderBottom: '1px solid #e0ddd8',
          background: '#ffffff',
          position: 'sticky',
          top: 0,
          zIndex: 100,
        }}>
          <div className="container" style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            height: 56,
          }}>
            <a href="/" style={{
              fontWeight: 700,
              fontSize: 18,
              color: '#2d5a27',
              letterSpacing: '-0.01em',
            }}>
              ✍️ 写作工具站
            </a>
            <nav style={{ display: 'flex', gap: 24, fontSize: 14 }}>
              <a href="/word-count">字数统计</a>
              <a href="/readability">可读性</a>
              <a href="/title-score">标题评分</a>
              <a href="/structure-check">结构检测</a>
              <a href="/synonym">同义词</a>
            </nav>
          </div>
        </header>

        <main style={{ minHeight: 'calc(100vh - 120px)', paddingBottom: 60 }}>
          {children}
        </main>

        <footer style={{
          borderTop: '1px solid #e0ddd8',
          padding: '24px 0',
          textAlign: 'center',
          fontSize: 13,
          color: '#aaa',
        }}>
          <div className="container">
            写作工具站 · 免费使用 · 无需注册 · 数据不上传
          </div>
        </footer>
      </body>
    </html>
  )
}
