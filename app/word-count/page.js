'use client'
import { useState } from 'react'

function analyze(text) {
  if (!text.trim()) return null
  const chineseChars = (text.match(/[一-鿿]/g) || []).length
  const englishWords = (text.match(/\b[a-zA-Z]+\b/g) || []).length
  const numbers = (text.match(/\b\d+\b/g) || []).length
  const totalChars = text.replace(/\s/g, '').length
  const paragraphs = text.split(/\n+/).filter(p => p.trim()).length
  const sentences = (text.match(/[。！？.!?]/g) || []).length
  const readingMinutes = Math.ceil((chineseChars + englishWords * 2) / 300)
  return { chineseChars, englishWords, numbers, totalChars, paragraphs, sentences, readingMinutes }
}

export default function WordCount() {
  const [text, setText] = useState('')
  const result = analyze(text)

  return (
    <div className="container" style={{ paddingTop: 48 }}>
      <h1 style={{ fontSize: 28, fontWeight: 700, marginBottom: 8 }}>字数统计器</h1>
      <p style={{ color: '#666', marginBottom: 32 }}>实时统计，数据不上传到服务器</p>

      <textarea
        className="tool-textarea"
        placeholder="在这里粘贴或输入你的文章内容..."
        value={text}
        onChange={e => setText(e.target.value)}
        style={{ minHeight: 260 }}
      />

      <div style={{ display: 'flex', gap: 12, marginTop: 16 }}>
        <button className="btn-clear" onClick={() => setText('')}>清空</button>
        <span style={{ fontSize: 13, color: '#aaa', alignSelf: 'center' }}>
          实时统计，无需点击按钮
        </span>
      </div>

      {result && (
        <div className="result-card">
          <h3>统计结果</h3>
          <div className="stat-grid">
            {[
              { number: result.chineseChars, label: '中文字数' },
              { number: result.englishWords, label: '英文单词' },
              { number: result.totalChars, label: '总字符数' },
              { number: result.paragraphs, label: '段落数' },
              { number: result.sentences, label: '句子数' },
              { number: result.readingMinutes + ' 分钟', label: '预计阅读' },
            ].map(item => (
              <div key={item.label} className="stat-item">
                <div className="stat-number">{item.number}</div>
                <div className="stat-label">{item.label}</div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
