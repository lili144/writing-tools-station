'use client'
import { useState } from 'react'

function checkStructure(text) {
  if (!text.trim()) return null
  const paragraphs = text.split(/\n+/).filter(p => p.trim())
  if (paragraphs.length === 0) return null

  const hasHeaders = paragraphs.some(p => p.startsWith('#') || /^[一二三四五六七八九十]+[、.．]/.test(p))
  const firstPara = paragraphs[0] || ''
  const lastPara = paragraphs[paragraphs.length - 1] || ''
  const avgParaLen = Math.round(paragraphs.reduce((a, p) => a + p.length, 0) / paragraphs.length)
  const longParas = paragraphs.filter(p => p.length > 200).length
  const shortParas = paragraphs.filter(p => p.length < 20).length

  const issues = []
  const goods = []

  if (paragraphs.length >= 4) goods.push('段落数量合适（' + paragraphs.length + '段）')
  else issues.push('段落太少，建议拆分成4段以上')

  if (hasHeaders) goods.push('使用了小标题，结构清晰')
  else if (paragraphs.length > 5) issues.push('没有小标题，长文建议加入分段标题')

  if (firstPara.length >= 30 && firstPara.length <= 150) goods.push('开头段长度适中')
  else if (firstPara.length < 30) issues.push('开头段太短，建议补充背景或问题引入')
  else issues.push('开头段过长，建议精简到150字以内')

  if (lastPara.length >= 20) goods.push('结尾段存在')
  else issues.push('结尾段太短或缺失，建议补充总结或行动建议')

  if (longParas === 0) goods.push('没有超长段落')
  else issues.push(`${longParas} 个段落超过200字，建议拆分`)

  if (avgParaLen >= 40 && avgParaLen <= 150) goods.push('平均段落长度适中')

  return { paragraphs: paragraphs.length, avgParaLen, hasHeaders, longParas, shortParas, issues, goods }
}

export default function StructureCheck() {
  const [text, setText] = useState('')
  const [result, setResult] = useState(null)

  return (
    <div className="container" style={{ paddingTop: 48 }}>
      <h1 style={{ fontSize: 28, fontWeight: 700, marginBottom: 8 }}>文章结构检测</h1>
      <p style={{ color: '#666', marginBottom: 32 }}>检测段落分布、标题使用和首尾段质量</p>

      <textarea
        className="tool-textarea"
        placeholder="粘贴你的完整文章内容..."
        value={text}
        onChange={e => setText(e.target.value)}
        style={{ minHeight: 260 }}
      />

      <div style={{ display: 'flex', gap: 12, marginTop: 16 }}>
        <button className="btn-primary" onClick={() => setResult(checkStructure(text))}>检测结构</button>
        <button className="btn-clear" onClick={() => { setText(''); setResult(null) }}>清空</button>
      </div>

      {result && (
        <div className="result-card">
          <h3>结构分析</h3>
          <div className="stat-grid" style={{ marginBottom: 24 }}>
            {[
              { number: result.paragraphs, label: '段落数' },
              { number: result.avgParaLen + '字', label: '平均段长' },
              { number: result.hasHeaders ? '有' : '无', label: '小标题' },
              { number: result.longParas, label: '超长段落' },
            ].map(item => (
              <div key={item.label} className="stat-item">
                <div className="stat-number" style={{ fontSize: 24 }}>{item.number}</div>
                <div className="stat-label">{item.label}</div>
              </div>
            ))}
          </div>

          {result.goods.length > 0 && (
            <div style={{ marginBottom: 16 }}>
              <div style={{ fontSize: 13, color: '#888', marginBottom: 8 }}>✓ 做得好的地方</div>
              {result.goods.map((g, i) => (
                <div key={i} className="tag tag-good" style={{ display: 'block', marginBottom: 6, borderRadius: 6 }}>
                  {g}
                </div>
              ))}
            </div>
          )}

          {result.issues.length > 0 && (
            <div>
              <div style={{ fontSize: 13, color: '#888', marginBottom: 8 }}>⚠ 需要改进</div>
              {result.issues.map((issue, i) => (
                <div key={i} style={{
                  padding: '10px 14px',
                  background: '#fff4e0',
                  borderRadius: 6,
                  fontSize: 14,
                  marginBottom: 8,
                  borderLeft: '3px solid #e8a020',
                }}>{issue}</div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  )
}
