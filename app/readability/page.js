'use client'
import { useState } from 'react'

function analyze(text) {
  if (!text.trim()) return null
  const sentences = text.split(/[。！？.!?]/).filter(s => s.trim().length > 0)
  if (sentences.length === 0) return null

  const lengths = sentences.map(s => s.trim().length)
  const avgLen = Math.round(lengths.reduce((a, b) => a + b, 0) / lengths.length)
  const longSentences = lengths.filter(l => l > 40).length
  const shortSentences = lengths.filter(l => l < 10).length
  const longRatio = Math.round((longSentences / sentences.length) * 100)

  const complexWords = (text.match(/[的地得]{2,}|然而|因此|综上所述|基于此|与此同时/g) || []).length

  let score = 100
  if (avgLen > 40) score -= 20
  else if (avgLen > 30) score -= 10
  if (longRatio > 50) score -= 20
  else if (longRatio > 30) score -= 10
  if (complexWords > 3) score -= 10
  score = Math.max(0, Math.min(100, score))

  let level, levelColor
  if (score >= 80) { level = '易读'; levelColor = '#2d5a27' }
  else if (score >= 60) { level = '适中'; levelColor = '#b07800' }
  else { level = '较难'; levelColor = '#c0392b' }

  const suggestions = []
  if (avgLen > 30) suggestions.push('平均句长偏长，尝试在句中加入标点断句')
  if (longRatio > 30) suggestions.push(`${longRatio}% 的句子超过40字，建议拆分长句`)
  if (complexWords > 3) suggestions.push('连接词使用偏多，部分位置可以删除')
  if (suggestions.length === 0) suggestions.push('整体可读性良好，继续保持')

  return { score, level, levelColor, avgLen, longRatio, sentences: sentences.length, suggestions }
}

export default function Readability() {
  const [text, setText] = useState('')
  const [result, setResult] = useState(null)

  return (
    <div className="container" style={{ paddingTop: 48 }}>
      <h1 style={{ fontSize: 28, fontWeight: 700, marginBottom: 8 }}>可读性检测</h1>
      <p style={{ color: '#666', marginBottom: 32 }}>分析句子长度和复杂度，给出可读性评分</p>

      <textarea
        className="tool-textarea"
        placeholder="粘贴你的文章内容..."
        value={text}
        onChange={e => setText(e.target.value)}
        style={{ minHeight: 260 }}
      />

      <div style={{ display: 'flex', gap: 12, marginTop: 16 }}>
        <button className="btn-primary" onClick={() => setResult(analyze(text))}>开始检测</button>
        <button className="btn-clear" onClick={() => { setText(''); setResult(null) }}>清空</button>
      </div>

      {result && (
        <div className="result-card">
          <h3>检测结果</h3>
          <div style={{ marginBottom: 24 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
              <span style={{ fontWeight: 600 }}>可读性评分</span>
              <span style={{ fontWeight: 700, color: result.levelColor }}>
                {result.score}分 · {result.level}
              </span>
            </div>
            <div className="score-bar-wrap">
              <div className="score-bar" style={{ width: result.score + '%', background: result.levelColor }} />
            </div>
          </div>

          <div className="stat-grid" style={{ marginBottom: 24 }}>
            {[
              { number: result.sentences, label: '句子总数' },
              { number: result.avgLen + ' 字', label: '平均句长' },
              { number: result.longRatio + '%', label: '长句比例' },
            ].map(item => (
              <div key={item.label} className="stat-item">
                <div className="stat-number" style={{ fontSize: 24 }}>{item.number}</div>
                <div className="stat-label">{item.label}</div>
              </div>
            ))}
          </div>

          <div>
            <div style={{ fontSize: 13, color: '#888', marginBottom: 10 }}>改进建议</div>
            {result.suggestions.map((s, i) => (
              <div key={i} style={{
                padding: '10px 14px',
                background: '#f8f7f4',
                borderRadius: 6,
                fontSize: 14,
                marginBottom: 8,
                borderLeft: '3px solid #2d5a27',
              }}>{s}</div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
