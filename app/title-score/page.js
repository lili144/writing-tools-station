'use client'
import { useState } from 'react'

function scoreTitle(title) {
  if (!title.trim()) return null
  const len = title.length
  const scores = []

  let lenScore = 0
  if (len >= 15 && len <= 28) lenScore = 25
  else if (len >= 10 && len <= 35) lenScore = 15
  else lenScore = 5
  scores.push({ name: '长度适中', score: lenScore, max: 25,
    hint: len < 10 ? '标题太短，信息量不足' : len > 35 ? '标题过长，建议压缩' : '长度合适' })

  const hasNumber = /\d+/.test(title)
  scores.push({ name: '包含数字', score: hasNumber ? 20 : 0, max: 20,
    hint: hasNumber ? '数字增加具体感' : '可以尝试加入具体数字' })

  const emotionWords = /免费|必看|实用|干货|秘诀|技巧|方法|指南|攻略|全面|深度|详解|揭秘|真相|原来/
  const hasEmotion = emotionWords.test(title)
  scores.push({ name: '价值词', score: hasEmotion ? 20 : 0, max: 20,
    hint: hasEmotion ? '包含吸引性词汇' : '可以加入价值词如"指南""技巧"' })

  const hasSuspense = /[？?]|为什么|怎么|如何|什么|哪些/.test(title)
  scores.push({ name: '设置悬念', score: hasSuspense ? 20 : 0, max: 20,
    hint: hasSuspense ? '疑问句增加点击欲' : '可以改为疑问句式' })

  const punctureCount = (title.match(/[！!。，,、]/g) || []).length
  const clean = punctureCount <= 1
  scores.push({ name: '表达简洁', score: clean ? 15 : 0, max: 15,
    hint: clean ? '没有标点堆砌' : '感叹号和逗号过多，显得廉价' })

  const total = scores.reduce((a, b) => a + b.score, 0)
  let level, levelColor
  if (total >= 80) { level = '优秀'; levelColor = '#2d5a27' }
  else if (total >= 60) { level = '良好'; levelColor = '#b07800' }
  else if (total >= 40) { level = '一般'; levelColor = '#e8a020' }
  else { level = '需改进'; levelColor = '#c0392b' }

  return { total, level, levelColor, scores }
}

export default function TitleScore() {
  const [title, setTitle] = useState('')
  const [result, setResult] = useState(null)

  return (
    <div className="container" style={{ paddingTop: 48 }}>
      <h1 style={{ fontSize: 28, fontWeight: 700, marginBottom: 8 }}>标题吸引力评分</h1>
      <p style={{ color: '#666', marginBottom: 32 }}>从5个维度评估你的标题质量</p>

      <input
        type="text"
        placeholder="输入你的标题..."
        value={title}
        onChange={e => { setTitle(e.target.value); setResult(null) }}
        style={{
          width: '100%',
          padding: '16px',
          border: '1.5px solid #e0ddd8',
          borderRadius: 8,
          fontSize: 18,
          fontFamily: 'inherit',
          background: '#ffffff',
          outline: 'none',
        }}
        onFocus={e => e.target.style.borderColor = '#2d5a27'}
        onBlur={e => e.target.style.borderColor = '#e0ddd8'}
      />
      <div style={{ fontSize: 13, color: '#aaa', marginTop: 8, marginBottom: 20 }}>
        当前长度：{title.length} 字
      </div>

      <div style={{ display: 'flex', gap: 12 }}>
        <button className="btn-primary" onClick={() => setResult(scoreTitle(title))}>评分</button>
        <button className="btn-clear" onClick={() => { setTitle(''); setResult(null) }}>清空</button>
      </div>

      {result && (
        <div className="result-card">
          <h3>评分结果</h3>
          <div style={{ textAlign: 'center', padding: '16px 0 24px' }}>
            <div style={{ fontSize: 56, fontWeight: 700, color: result.levelColor, lineHeight: 1 }}>
              {result.total}
            </div>
            <div style={{ fontSize: 16, color: result.levelColor, marginTop: 8 }}>{result.level}</div>
          </div>

          {result.scores.map(item => (
            <div key={item.name} style={{ marginBottom: 16 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 14, marginBottom: 6 }}>
                <span style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                  <span style={{ color: item.score > 0 ? '#2d5a27' : '#ccc' }}>
                    {item.score > 0 ? '✓' : '○'}
                  </span>
                  {item.name}
                </span>
                <span style={{ color: '#888' }}>{item.score}/{item.max}</span>
              </div>
              <div className="score-bar-wrap">
                <div className="score-bar" style={{
                  width: (item.score / item.max * 100) + '%',
                  background: item.score > 0 ? '#2d5a27' : '#e0ddd8',
                }} />
              </div>
              <div style={{ fontSize: 12, color: '#999', marginTop: 4 }}>{item.hint}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
