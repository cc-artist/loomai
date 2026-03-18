'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import { tarotMasters, spreads, tarotCards } from '@/utils/mockData'
import { TarotCard } from '@/utils/types'

// 辅助函数：根据卡牌ID获取Wikimedia图片路径
const getWikimediaImagePath = (cardId: number): string => {
  const cardPaths: Record<number, string> = {
    1: '5/5f/RWS_Tarot_01_Magician',
    2: '1/10/RWS_Tarot_02_High_Priestess',
    3: '3/3a/RWS_Tarot_03_Empress',
    4: '2/2c/RWS_Tarot_04_Emperor',
    5: '3/3d/RWS_Tarot_05_Hierophant',
    6: '3/39/RWS_Tarot_06_Lovers',
    7: '7/74/RWS_Tarot_07_Chariot',
    8: '4/42/RWS_Tarot_08_Strength',
    9: '9/9b/RWS_Tarot_09_Hermit',
    10: 'd/d3/RWS_Tarot_10_Wheel_of_Fortune',
    11: '9/93/RWS_Tarot_11_Justice',
    12: '7/73/RWS_Tarot_12_Hanged_Man',
    13: 'd/d4/RWS_Tarot_13_Death',
    14: 'f/fa/RWS_Tarot_14_Temperance',
    15: '2/2c/RWS_Tarot_15_Devil',
    16: '4/4a/RWS_Tarot_16_Tower',
    17: '5/5a/RWS_Tarot_17_Star',
    18: 'd/d7/RWS_Tarot_18_Moon',
    19: 'c/c4/RWS_Tarot_19_Sun',
    20: '6/60/RWS_Tarot_20_Judgement',
    21: '8/8e/RWS_Tarot_22_World',
    22: '5/59/RWS_Tarot_00_Fool'
  }
  return cardPaths[cardId] || '5/5f/RWS_Tarot_01_Magician'
}

// 辅助函数：根据卡牌ID获取Wikimedia图片文件名
const getWikimediaImageFileName = (cardId: number): string => {
  const cardFileNames: Record<number, string> = {
    1: 'RWS_Tarot_01_Magician',
    2: 'RWS_Tarot_02_High_Priestess',
    3: 'RWS_Tarot_03_Empress',
    4: 'RWS_Tarot_04_Emperor',
    5: 'RWS_Tarot_05_Hierophant',
    6: 'RWS_Tarot_06_Lovers',
    7: 'RWS_Tarot_07_Chariot',
    8: 'RWS_Tarot_08_Strength',
    9: 'RWS_Tarot_09_Hermit',
    10: 'RWS_Tarot_10_Wheel_of_Fortune',
    11: 'RWS_Tarot_11_Justice',
    12: 'RWS_Tarot_12_Hanged_Man',
    13: 'RWS_Tarot_13_Death',
    14: 'RWS_Tarot_14_Temperance',
    15: 'RWS_Tarot_15_Devil',
    16: 'RWS_Tarot_16_Tower',
    17: 'RWS_Tarot_17_Star',
    18: 'RWS_Tarot_18_Moon',
    19: 'RWS_Tarot_19_Sun',
    20: 'RWS_Tarot_20_Judgement',
    21: 'RWS_Tarot_22_World',
    22: 'RWS_Tarot_00_Fool'
  }
  return cardFileNames[cardId] || 'RWS_Tarot_01_Magician'
}

export default function ReadingsPage() {
  const [selectedMaster, setSelectedMaster] = useState<number>(1)
  const [selectedSpread, setSelectedSpread] = useState<number>(1)
  const [question, setQuestion] = useState<string>('')
  const [isReading, setIsReading] = useState<boolean>(false)
  const [drawnCards, setDrawnCards] = useState<TarotCard[]>([])
  const [interpretation, setInterpretation] = useState<string>('')
  // 动画状态
  const [isShuffling, setIsShuffling] = useState<boolean>(false)
  const [isReadyToDraw, setIsReadyToDraw] = useState<boolean>(false)
  const [isSelectingCards, setIsSelectingCards] = useState<boolean>(false)
  const [selectedCardsIndices, setSelectedCardsIndices] = useState<number[]>([])
  const [isRevealing, setIsRevealing] = useState<boolean>(false)
  const [revealedCards, setRevealedCards] = useState<number[]>([])
  // 用于牌堆动画和摊牌的牌组
  const [shuffledDeck, setShuffledDeck] = useState<TarotCard[]>([])
  const [spreadDeck, setSpreadDeck] = useState<TarotCard[]>([])
  // 摊开的牌数量（显示给用户选择的牌）
  const spreadCardsCount = 20

  // 获取随机塔罗牌
  const drawCards = () => {
    const spread = spreads.find(s => s.id === selectedSpread)
    if (!spread) return

    // 开始占卜流程
    setIsReading(true)
    setIsShuffling(true)
    setIsReadyToDraw(false)
    setIsSelectingCards(false)
    setIsRevealing(false)
    setDrawnCards([])
    setSelectedCardsIndices([])
    setInterpretation('')
    setRevealedCards([])

    // 洗牌动画（延长洗牌时间，模拟真实洗牌过程）
    let shuffleCount = 0
    const shuffleInterval = setInterval(() => {
      // 每次洗牌生成新的随机牌堆
      const shuffled = [...tarotCards].sort(() => 0.5 - Math.random())
      setShuffledDeck(shuffled)
      shuffleCount++

      if (shuffleCount >= 30) { // 洗牌30次后停止（延长时间）
        clearInterval(shuffleInterval)
        setIsShuffling(false)
        setIsReadyToDraw(true)
        // 洗牌完成后，准备好最终牌堆
        const finalShuffled = [...tarotCards].sort(() => 0.5 - Math.random())
        setShuffledDeck(finalShuffled)
      }
    }, 150) // 每150ms洗牌一次（减慢洗牌速度）
  }

  // 用户点击开始抽牌，摊开牌让用户选择
  const handleDrawCards = () => {
    const spread = spreads.find(s => s.id === selectedSpread)
    if (!spread) return

    setIsReadyToDraw(false)
    
    // 从洗牌后的牌堆中选择20张牌摊开，供用户选择
    const spreadCards = shuffledDeck.slice(0, spreadCardsCount)
    setSpreadDeck(spreadCards)
    setIsSelectingCards(true)
  }

  // 用户选择一张牌
  const handleSelectCard = (index: number) => {
    const spread = spreads.find(s => s.id === selectedSpread)
    if (!spread) return

    // 如果已经选择了足够数量的牌，或者已经选择了这张牌，直接返回
    if (selectedCardsIndices.length >= spread.cards || selectedCardsIndices.includes(index)) {
      return
    }

    // 添加选择的牌索引
    const newSelectedIndices = [...selectedCardsIndices, index]
    setSelectedCardsIndices(newSelectedIndices)

    // 如果选择了足够数量的牌，结束选择阶段
    if (newSelectedIndices.length === spread.cards) {
      // 从摊开的牌中获取选择的牌
      const selectedCards = newSelectedIndices.map(i => spreadDeck[i])
      setDrawnCards(selectedCards)
      
      // 延迟进入翻牌阶段，增强体验
      setTimeout(() => {
        setIsSelectingCards(false)
        setIsRevealing(true)
      }, 1000)
    }
  }

  // 用户开始翻牌
  const startRevealingCards = () => {
    const spread = spreads.find(s => s.id === selectedSpread)
    if (!spread) return

    // 逐步翻牌效果（减慢翻牌速度，增强体验）
    drawnCards.forEach((_, index) => {
      setTimeout(() => {
        setRevealedCards(prev => [...prev, index])
      }, 800 * (index + 1)) // 每800ms翻一张牌
    })

    // 生成AI解读（模拟），等待所有牌翻完后
    setTimeout(() => {
      generateInterpretation(drawnCards)
    }, 800 * (drawnCards.length + 2))
  }

  // 生成AI解读（调用真实API）
  const generateInterpretation = async (cards: TarotCard[]) => {
    const master = tarotMasters.find(m => m.id === selectedMaster)
    const spread = spreads.find(s => s.id === selectedSpread)

    if (!master || !spread) return

    try {
      // 准备请求数据，包含牌面和位置信息
      const cardsWithPositions = cards.map((card, index) => ({
        ...card,
        position: spread.positions[index] || `位置 ${index + 1}`
      }))

      // 调用AI解读API
      const response = await fetch('/api/ai/interpret', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          cards: cardsWithPositions,
          question,
          masterId: selectedMaster,
          spreadName: spread.name
        })
      })

      const data = await response.json()
      if (data.success) {
        setInterpretation(data.interpretation)
      } else {
        // API调用失败，使用备用解读
        const fallbackInterpretation = `根据${master.name}的解读，${question ? `针对"${question}"这个问题，` : ''}你抽到的牌阵${spread.name}显示了${cards.map(card => card.name).join('、')}。综合来看，${master.specialty === '爱情与关系' ? '你们的关系正处于一个重要的转折点，需要更多的沟通和理解。' : master.specialty === '事业与人生规划' ? '你的事业正朝着积极的方向发展，但需要注意潜在的挑战。' : '你需要更多地倾听内心的声音，相信自己的直觉。'}`
        setInterpretation(fallbackInterpretation)
      }
    } catch (error) {
      console.error('AI解读请求失败:', error)
      // 网络错误，使用备用解读
      const fallbackInterpretation = `根据${master.name}的解读，${question ? `针对"${question}"这个问题，` : ''}你抽到的牌阵${spread.name}显示了${cards.map(card => card.name).join('、')}。综合来看，${master.specialty === '爱情与关系' ? '你们的关系正处于一个重要的转折点，需要更多的沟通和理解。' : master.specialty === '事业与人生规划' ? '你的事业正朝着积极的方向发展，但需要注意潜在的挑战。' : '你需要更多地倾听内心的声音，相信自己的直觉。'}`
      setInterpretation(fallbackInterpretation)
    }
  }

  // 重置占卜
  const resetReading = () => {
    setIsReading(false)
    setDrawnCards([])
    setInterpretation('')
    setQuestion('')
    setIsShuffling(false)
    setIsReadyToDraw(false)
    setIsSelectingCards(false)
    setSelectedCardsIndices([])
    setIsRevealing(false)
    setRevealedCards([])
    setShuffledDeck([])
    setSpreadDeck([])
  }

  return (
    <div className="max-w-6xl mx-auto space-y-12">
      {/* 页面标题 */}
      <section className="text-center">
        <h1 className="text-3xl md:text-5xl font-bold mb-6">
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">
            塔罗占卜
          </span>
        </h1>
        <p className="text-lg text-gray-300 max-w-3xl mx-auto">
          选择塔罗师和牌阵，提出您的问题，让AI塔罗牌为您带来深刻的洞察和启示。
        </p>
      </section>

      {!isReading ? (
        // 占卜设置界面
        <section className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 md:p-12 border border-white/10">
          <div className="space-y-8">
            {/* 选择塔罗师 */}
            <div>
              <h2 className="text-xl font-bold mb-4 text-white">选择塔罗师</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {tarotMasters.map((master) => (
                  <button
                    key={master.id}
                    onClick={() => setSelectedMaster(master.id)}
                    className={`bg-white/10 hover:bg-white/20 rounded-xl p-4 border transition-all duration-300 ${selectedMaster === master.id ? 'border-primary bg-primary/20' : 'border-white/10'}`}
                  >
                    <div className="text-3xl mb-2">{master.avatar}</div>
                    <h3 className="font-medium text-white">{master.name}</h3>
                    <p className="text-sm text-primary">{master.specialty}</p>
                  </button>
                ))}
              </div>
            </div>

            {/* 选择牌阵 */}
            <div>
              <h2 className="text-xl font-bold mb-4 text-white">选择牌阵</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {spreads.map((spread) => (
                  <button
                    key={spread.id}
                    onClick={() => setSelectedSpread(spread.id)}
                    className={`bg-white/10 hover:bg-white/20 rounded-xl p-6 border transition-all duration-300 ${selectedSpread === spread.id ? 'border-primary bg-primary/20' : 'border-white/10'}`}
                  >
                    <h3 className="font-medium text-white mb-2">{spread.name}</h3>
                    <p className="text-sm text-gray-300 mb-2">{spread.description}</p>
                    <div className="flex items-center justify-between text-sm text-gray-400">
                      <span>{spread.cards}张牌</span>
                      <span>{spread.positions.length}个位置</span>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* 输入问题 */}
            <div>
              <h2 className="text-xl font-bold mb-4 text-white">您的问题</h2>
              <textarea
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
                placeholder="请输入您想询问的问题，例如：'我的爱情关系会如何发展？'或'我应该接受这份新工作吗？'"
                className="w-full bg-white/5 border border-white/10 rounded-xl p-4 text-white placeholder-gray-500 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/30 resize-none h-32"
              />
            </div>

            {/* 开始占卜按钮 */}
            <div className="pt-4">
              <button
                onClick={drawCards}
                disabled={!question.trim()}
                className="btn-primary text-lg py-4 px-12 w-full disabled:opacity-50 disabled:cursor-not-allowed"
              >
                开始占卜
              </button>
            </div>
          </div>
        </section>
      ) : (
        // 占卜结果界面
        <section className="space-y-12">
          {/* 塔罗师和问题信息 */}
          <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
              <div>
                <h2 className="text-xl font-bold mb-2 text-white">
                  占卜师：{tarotMasters.find(m => m.id === selectedMaster)?.name}
                </h2>
                <p className="text-gray-300">
                  牌阵：{spreads.find(s => s.id === selectedSpread)?.name}
                </p>
              </div>
              <div className="text-right">
                <h3 className="text-lg font-medium text-white mb-1">您的问题</h3>
                <p className="text-gray-300 italic">{question}</p>
              </div>
            </div>
          </div>

          {/* 塔罗牌展示 */}
          <section className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10">
            <h2 className="text-2xl font-bold mb-8 text-center text-white">
              您的牌阵
            </h2>

            {/* 洗牌动画 */}
            {isShuffling && (
              <div className="flex flex-col items-center justify-center py-16">
                <div className="relative w-48 h-72 mb-8">
                  {[...Array(7)].map((_, i) => (
                    <div
                      key={i}
                      className="absolute w-48 h-72 bg-gradient-to-br from-primary/80 to-secondary/80 rounded-lg border-2 border-white/30 shadow-lg animate-shuffle"
                      style={{
                        transform: `translateY(${i * -10}px) rotate(${i * 5}deg) translateX(${Math.sin(i) * 5}px)`,
                        zIndex: 7 - i,
                        animationDelay: `${i * 0.1}s`,
                        backgroundImage: shuffledDeck[0] ? `url(${shuffledDeck[0].image})` : 'linear-gradient(to bottom right, var(--primary), var(--secondary))',
                        backgroundSize: 'cover',
                        backgroundPosition: 'center'
                      }}
                    >
                      <div className="w-full h-full bg-gradient-to-br from-primary/60 to-secondary/60 rounded-lg flex items-center justify-center">
                        <div className="text-4xl font-bold text-white drop-shadow-lg">🃏</div>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-white mb-3">正在洗牌...</div>
                  <div className="text-gray-300 max-w-md mx-auto">
                    塔罗师正在为您精心洗牌，准备揭示您问题的答案
                  </div>
                </div>
              </div>
            )}

            {/* 准备抽牌状态 */}
            {isReadyToDraw && (
              <div className="flex flex-col items-center justify-center py-16">
                <div className="relative w-48 h-72 mb-12">
                  {[...Array(5)].map((_, i) => (
                    <div
                      key={i}
                      className="absolute w-48 h-72 bg-gradient-to-br from-primary/80 to-secondary/80 rounded-lg border-2 border-white/30 shadow-lg"
                      style={{
                        transform: `translateY(${i * -15}px) rotate(${i * 3}deg)`,
                        zIndex: 5 - i,
                        backgroundImage: shuffledDeck[0] ? `url(${shuffledDeck[0].image})` : 'linear-gradient(to bottom right, var(--primary), var(--secondary))',
                        backgroundSize: 'cover',
                        backgroundPosition: 'center'
                      }}
                    >
                      <div className="w-full h-full bg-gradient-to-br from-primary/60 to-secondary/60 rounded-lg flex items-center justify-center">
                        <div className="text-4xl font-bold text-white drop-shadow-lg">🃏</div>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="text-center mb-8">
                  <div className="text-2xl font-bold text-white mb-3">洗牌完成</div>
                  <div className="text-gray-300 max-w-md mx-auto">
                    牌堆已准备就绪，点击下方按钮开始抽牌
                  </div>
                </div>
                <button
                  onClick={handleDrawCards}
                  className="btn-primary text-lg py-4 px-16"
                >
                  开始抽牌
                </button>
              </div>
            )}

            {/* 用户选择牌界面 */}
            {isSelectingCards && (
              <div className="space-y-12">
                <div className="text-center">
                  <div className="text-2xl font-bold text-white mb-3">请选择您的牌</div>
                  <div className="text-gray-300 max-w-2xl mx-auto">
                    从下方摊开的牌中选择 {spreads.find(s => s.id === selectedSpread)?.cards} 张牌，组成您的牌阵
                  </div>
                  <div className="mt-4 text-lg font-medium text-primary">
                    已选择：{selectedCardsIndices.length} / {spreads.find(s => s.id === selectedSpread)?.cards}
                  </div>
                </div>

                {/* 摊开的牌 */}
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                  {spreadDeck.map((card, index) => (
                    <div
                      key={index}
                      className={`cursor-pointer transition-all duration-500 transform ${selectedCardsIndices.includes(index) ? 'scale-110 border-primary shadow-lg shadow-primary/30' : 'hover:scale-105 hover:border-white/50'}`}
                      onClick={() => handleSelectCard(index)}
                    >
                      <div className="w-full aspect-[3/4] bg-gradient-to-br from-primary to-secondary rounded-lg border-2 border-white/30 shadow-md relative">
                        {/* 真实牌面 - 选择阶段显示牌背，但准备好真实数据 */}
                        <div className="w-full h-full bg-gradient-to-br from-primary/90 to-secondary/90 rounded-lg flex items-center justify-center">
                          <div className="text-4xl">🃏</div>
                        </div>
                        {/* 选择标记 */}
                        {selectedCardsIndices.includes(index) && (
                          <div className="absolute inset-0 bg-primary/30 rounded-lg flex items-center justify-center">
                            <div className="text-3xl font-bold text-white">✓</div>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>

                <div className="text-center">
                  <p className="text-gray-400 italic">
                    相信您的直觉，选择最吸引您注意力的牌
                  </p>
                </div>
              </div>
            )}

            {/* 简化的翻牌流程：直接显示真实牌面 */}
            {drawnCards.length > 0 && !isSelectingCards && !isShuffling && !isReadyToDraw && (
              <div className="space-y-12">
                {/* 牌阵展示 */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                  {drawnCards.map((card, index) => {
                    const spread = spreads.find(s => s.id === selectedSpread)
                    const position = spread?.positions[index] || `位置 ${index + 1}`
                    const isRevealed = revealedCards.includes(index)
                    
                    return (
                      <div 
                        key={card.id} 
                        className={`tarot-card bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/10 transition-all duration-700 transform opacity-100 scale-100`}
                        style={{ animationDelay: `${index * 0.1}s` }}
                      >
                      <div className="text-center mb-4">
                        <h3 className="text-lg font-medium text-white mb-1">{position}</h3>
                        <p className="text-sm text-gray-400">{index + 1} / {drawnCards.length}</p>
                      </div>
                       
                      <div className="bg-gradient-to-br from-primary/30 to-secondary/30 rounded-lg p-6 mb-4 aspect-[3/4] overflow-hidden relative">
                        {/* 翻牌效果，显示真实牌面 */}
                        <div className="relative w-full h-full">
                          {/* 牌背 */}
                          <div className={`absolute w-full h-full bg-gradient-to-br from-primary to-secondary rounded-md flex items-center justify-center transition-all duration-1000 ${isRevealed ? 'opacity-0 z-0' : 'opacity-100 z-10'}`}>
                            <div className="text-6xl">🃏</div>
                          </div>
                          
                          {/* 真实牌面 */}
                          <div className={`absolute w-full h-full bg-white/10 rounded-md flex items-center justify-center transition-all duration-1000 ${isRevealed ? 'opacity-100 z-20' : 'opacity-0 z-0'}`}>
                            <img 
                              src={card.image} 
                              alt={card.name} 
                              className="w-full h-full object-contain rounded-md transition-all duration-500 ease-in-out"
                              onError={(e) => {
                                /* 如果本地图片加载失败，显示默认图标 */
                                const target = e.target as HTMLImageElement;
                                target.style.display = 'none';
                                const container = target.parentElement;
                                if (container) {
                                  container.innerHTML = '<div className="w-full h-full flex items-center justify-center text-6xl">🃏</div>';
                                }
                              }}
                            />
                          </div>
                        </div>
                      </div>
                       
                      <h4 className={`text-xl font-bold text-center mb-2 transition-all duration-800 ${isRevealed ? 'text-white opacity-100 scale-100' : 'text-gray-500 opacity-0 scale-90'}`} style={{ animationDelay: `${index * 0.1 + 0.6}s` }}>{card.name}</h4>
                      <p className={`text-sm text-center mb-4 transition-all duration-800 ${isRevealed ? 'text-gray-300 opacity-100 scale-100' : 'text-gray-500 opacity-0 scale-90'}`} style={{ animationDelay: `${index * 0.1 + 0.9}s` }}>{card.meaning}</p>
                      </div>
                    )
                  })}
                </div>

                {/* 开始翻牌按钮 */}
                {revealedCards.length === 0 && (
                  <div className="text-center">
                    <div className="text-2xl font-bold text-white mb-4">牌阵已抽取完成</div>
                    <div className="text-gray-300 max-w-md mx-auto mb-8">
                      点击下方按钮，逐步揭示每张牌的含义
                    </div>
                    <button
                      onClick={startRevealingCards}
                      className="btn-primary text-lg py-4 px-16"
                    >
                      开始翻牌
                    </button>
                  </div>
                )}
              </div>
            )}
          </section>

          {/* AI解读 */}
          <section className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10">
            <h2 className="text-2xl font-bold mb-6 text-center">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">
                AI 塔罗解读
              </span>
            </h2>

            <div className="space-y-6">
              {!interpretation ? (
                // 加载状态
                <div className="text-center py-12">
                  <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
                  <p className="mt-4 text-lg text-gray-300">
                    {tarotMasters.find(m => m.id === selectedMaster)?.name}正在为您解读...
                  </p>
                </div>
              ) : (
                // 解读结果
                <div className="space-y-4">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="text-4xl">
                      {tarotMasters.find(m => m.id === selectedMaster)?.avatar}
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-white">
                        {tarotMasters.find(m => m.id === selectedMaster)?.name}
                      </h3>
                      <p className="text-primary">{tarotMasters.find(m => m.id === selectedMaster)?.specialty}</p>
                    </div>
                  </div>
                  
                  <div className="bg-white/5 rounded-lg p-6 text-gray-300 leading-relaxed">
                    {interpretation}
                  </div>
                </div>
              )}

              {/* 操作按钮 */}
              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <button
                  onClick={resetReading}
                  className="btn-primary text-lg py-4 px-8 flex-1"
                >
                  再次占卜
                </button>
                <button
                  onClick={() => {
                    setIsReading(false)
                    setDrawnCards([])
                    setInterpretation('')
                  }}
                  className="bg-white/10 hover:bg-white/20 text-white font-medium py-4 px-8 rounded-full transition-all duration-300 transform hover:scale-105 backdrop-blur-sm border border-white/20 flex-1"
                >
                  重新设置
                </button>
              </div>
            </div>
          </section>
        </section>
      )}
    </div>
  )
}