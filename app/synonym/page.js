'use client'
import { useState } from 'react'

const synonymDB = {
  '但是': ['然而', '不过', '可是', '只是', '却', '然则'],
  '因为': ['由于', '基于', '鉴于', '出于', '因此'],
  '所以': ['因此', '于是', '故而', '从而', '所以', '结果'],
  '很': ['十分', '相当', '颇为', '格外', '尤为', '非常', '极其'],
  '非常': ['极为', '十分', '相当', '格外', '甚为', '相当地', '非常地'],
  '好': ['出色', '优秀', '良好', '不错', '上乘', '甚好', '很好'],
  '说': ['表示', '指出', '提到', '强调', '指明', '阐述', '讲述', '陈述'],
  '做': ['开展', '进行', '推进', '实施', '落实', '执行', '从事', '从事'],
  '看': ['观察', '审视', '审阅', '查看', '浏览', '察看', '瞧'],
  '用': ['使用', '运用', '采用', '借助', '利用', '应用', '施用'],
  '大': ['庞大', '巨大', '宏大', '广泛', '可观', '硕大', '浩大'],
  '小': ['细微', '轻微', '有限', '小幅', '微小', '狭小'],
  '多': ['大量', '众多', '丰富', '充足', '可观', '繁多', '海量'],
  '快': ['迅速', '快速', '高效', '及时', '敏捷', '飞快', '迅疾'],
  '慢': ['缓慢', '逐步', '渐进', '迟缓', '徐徐', '缓缓'],
  '问题': ['挑战', '难点', '症结', '痛点', '困境', '课题', '议题'],
  '方法': ['方式', '途径', '路径', '手段', '策略', '办法', '技巧'],
  '重要': ['关键', '核心', '至关重要', '举足轻重', '不可或缺', '重大', '要紧'],
  '发现': ['察觉', '注意到', '意识到', '找到', '识别', '发觉', '觉察'],
  '提高': ['提升', '增强', '改善', '优化', '强化', '增进', '改进'],
  '减少': ['降低', '压缩', '削减', '缩减', '收窄', '下降', '衰减'],
  '开始': ['启动', '着手', '展开', '推进', '开展', '起始', '伊始'],
  '结束': ['完成', '收尾', '收束', '落幕', '告一段落', '终止', '结束'],
  '认为': ['认定', '判断', '觉得', '以为', '主张', '认识', '看法'],
  '希望': ['期望', '期待', '寄望', '盼望', '期许', '渴望'],
  '重点': ['核心', '关键', '重心', '焦点', '中心', '重头'],
  '理解': ['领会', '体悟', '感悟', '明白', '懂得', '认识'],
  '需要': ['需求', '必要', '要求', '需求', '急需'],
  '情况': ['状况', '局面', '形势', '现象', '事态'],
  '作用': ['效果', '功效', '影响', '意义', '价值'],
  '能力': ['才能', '本领', '实力', '水平', '素质'],
  '机会': ['机遇', '机关', '良机', '时机', '契机'],
  '努力': ['奋力', '尽力', '竭力', '用力', '发奋'],
  '成功': ['成就', '胜利', '圆满', '如愿', '达成'],
  '失败': ['挫折', '失利', '败北', '不成', '失手'],
  '继续': ['持续', '坚持', '保持', '继而', '随之'],
  '改变': ['转变', '改革', '革新', '调整', '变更'],
  '保持': ['维持', '保留', '保存', '维护', '存续'],
  '增加': ['增多', '增长', '扩大', '增值', '增幅'],
  '分析': ['剖析', '解析', '分解', '拆解', '诠释'],
}

export default function Synonym() {
  const [word, setWord] = useState('')
  const [result, setResult] = useState(null)
  const [copied, setCopied] = useState('')

  function lookup() {
    const trimmed = word.trim()
    if (!trimmed) return
    const synonyms = synonymDB[trimmed]
    if (synonyms) {
      setResult({ found: true, word: trimmed, synonyms })
    } else {
      setResult({ found: false, word: trimmed })
    }
  }

  function copy(text) {
    navigator.clipboard.writeText(text)
    setCopied(text)
    setTimeout(() => setCopied(''), 1500)
  }

  return (
    <div className="container" style={{ paddingTop: 48 }}>
      <h1 style={{ fontSize: 28, fontWeight: 700, marginBottom: 8 }}>同义词替换建议</h1>
      <p style={{ color: '#666', marginBottom: 32 }}>输入常用词，获取近义替换，让表达更丰富</p>

      <div style={{ display: 'flex', gap: 12 }}>
        <input
          type="text"
          placeholder="输入词语，如：但是、很、重要..."
          value={word}
          onChange={e => { setWord(e.target.value); setResult(null) }}
          onKeyDown={e => e.key === 'Enter' && lookup()}
          style={{
            flex: 1,
            padding: '14px 16px',
            border: '1.5px solid #e0ddd8',
            borderRadius: 8,
            fontSize: 16,
            fontFamily: 'inherit',
            background: '#ffffff',
            outline: 'none',
          }}
          onFocus={e => e.target.style.borderColor = '#2d5a27'}
          onBlur={e => e.target.style.borderColor = '#e0ddd8'}
        />
        <button className="btn-primary" onClick={lookup}>查询</button>
        <button className="btn-clear" onClick={() => { setWord(''); setResult(null) }}>清空</button>
      </div>

      <div style={{ marginTop: 16, fontSize: 13, color: '#aaa' }}>
        支持查询：{Object.keys(synonymDB).join('、')}
      </div>

      {result && (
        <div className="result-card">
          {result.found ? (
            <>
              <h3>「{result.word}」的近义替换</h3>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10 }}>
                {result.synonyms.map(syn => (
                  <button
                    key={syn}
                    onClick={() => copy(syn)}
                    style={{
                      padding: '10px 20px',
                      background: copied === syn ? '#2d5a27' : '#f8f7f4',
                      color: copied === syn ? '#ffffff' : '#1a1a1a',
                      border: '1.5px solid',
                      borderColor: copied === syn ? '#2d5a27' : '#e0ddd8',
                      borderRadius: 6,
                      fontSize: 15,
                      cursor: 'pointer',
                      fontFamily: 'inherit',
                      transition: 'all 0.15s',
                    }}
                  >
                    {copied === syn ? '已复制 ✓' : syn}
                  </button>
                ))}
              </div>
              <div style={{ fontSize: 13, color: '#aaa', marginTop: 16 }}>
                点击词语即可复制
              </div>
            </>
          ) : (
            <div style={{ color: '#888', fontSize: 15 }}>
              暂未收录「{result.word}」，可以尝试：{Object.keys(synonymDB).slice(0, 6).join('、')} 等常用词
            </div>
          )}
        </div>
      )}
    </div>
  )
}
