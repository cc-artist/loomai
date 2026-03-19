import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const { cards, question, masterId, spreadName, preferredModel } = await request.json();
    
    // 验证请求参数
    if (!cards || !Array.isArray(cards)) {
      return NextResponse.json(
        { success: false, message: '缺少必要的卡片数据' },
        { status: 400 }
      );
    }
    
    // 准备卡片详细信息，包含位置信息和正逆位状态
    const cardDetails = cards.map((card: any) => {
      const positionInfo = card.position || `位置 ${cards.indexOf(card) + 1}`;
      const orientation = card.reversed ? '(逆位)' : '(正位)';
      const actualMeaning = card.actualMeaning || card.meaning;
      return `${positionInfo}：${card.name} ${orientation} (${actualMeaning})`;
    }).join('\n');
    
    // 专业塔罗牌解读提示词模板
    const prompt = `
    作为一名拥有20年专业经验的资深塔罗牌解读师，你精通韦特塔罗体系，深入研究过牌面象征、元素关联、数字命理和神话原型，擅长将这些知识融合到解读中。请根据以下信息为用户提供专业、深入、个性化的塔罗牌解读：
    
    用户问题：${question || '请对我的牌阵进行综合解读'}
    
    牌阵名称：${spreadName || '塔罗牌阵'}
    
    抽到的牌及位置意义：
    ${cardDetails}
    
    解读框架要求：
    1. **开场引导**：用温暖的语言欢迎用户，建立信任关系
    2. **整体能量评估**：先对整个牌阵的整体能量和主题进行概括
    3. **单牌深度解析**：
       - 每张牌单独进行深入解析，包括核心象征、元素属性、数字意义
       - 结合牌在牌阵中的位置，分析其在该位置的特殊含义
       - 区分正逆位的细微差别，解释能量的流动和变化
    4. **牌面组合分析**：
       - 分析相邻牌之间的互动关系和能量共鸣
       - 找出牌阵中的关键牌和核心组合
       - 解释牌与牌之间的冲突、支持或转化关系
    5. **问题聚焦解读**：
       - 紧密围绕用户的具体问题进行深入分析
       - 提供针对性的洞察和见解
       - 避免泛泛而谈，确保解读与用户问题高度相关
    6. **多维度分析**：
       - 从过去、现在、未来三个时间维度进行解读
       - 结合情感、心理、行动等多个层面
       - 分析内在因素（潜意识、心态）和外在因素（环境、他人）
    7. **实用建议**：
       - 提供具体、可操作的建议
       - 针对不同情况给出相应的行动步骤
       - 保持积极正面的引导，增强用户的信心和行动力
    8. **总结与祝福**：
       - 对整个解读进行总结提炼
       - 给予温暖的祝福和鼓励
    
    语言风格要求：
    - 专业但不失温暖，避免过于晦涩的术语
    - 结构清晰，逻辑连贯，层次分明
    - 用词精准，富有洞察力和启发性
    - 保持客观中立，同时给予积极的引导
    - 解读长度控制在1000-1500字，确保内容充实、有深度
    
    请以资深塔罗师的口吻进行解读，让用户感受到你的专业知识、深度洞察和真诚关怀。
    `;
    
    let interpretation: string | undefined;
    const isProduction = process.env.NODE_ENV === 'production';
    
    // 模型配置
    const models = {
      openai: {
        apiKey: process.env.OPENAI_API_KEY,
        model: process.env.OPENAI_MODEL || 'gpt-4o',
        url: 'https://api.openai.com/v1/chat/completions',
        headers: (apiKey: string) => ({
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${apiKey}`
        }),
        body: (prompt: string) => ({
          model: process.env.OPENAI_MODEL || 'gpt-4o',
          messages: [
            {
              role: 'system',
              content: '你是一名专业的塔罗牌解读师，具有丰富的塔罗牌解读经验。'
            },
            {
              role: 'user',
              content: prompt
            }
          ],
          temperature: 0.6, // 降低温度以获得更一致、更准确的解读
          max_tokens: 1500 // 增加最大tokens以支持更长的解读内容
        }),
        parseResponse: (data: any) => data.choices?.[0]?.message?.content
      },
      anthropic: {
        apiKey: process.env.ANTHROPIC_API_KEY,
        model: process.env.ANTHROPIC_MODEL || 'claude-3-sonnet-20240229',
        url: 'https://api.anthropic.com/v1/messages',
        headers: (apiKey: string) => ({
          'Content-Type': 'application/json',
          'x-api-key': apiKey,
          'anthropic-version': '2023-06-01'
        }),
        body: (prompt: string) => ({
          model: process.env.ANTHROPIC_MODEL || 'claude-3-sonnet-20240229',
          messages: [
            {
              role: 'user',
              content: prompt
            }
          ],
          temperature: 0.6,
          max_tokens: 1500
        }),
        parseResponse: (data: any) => data.content?.[0]?.text
      },
      deepseek: {
        apiKey: process.env.DEEPSEEK_API_KEY,
        model: process.env.DEEPSEEK_MODEL || 'deepseek-v3',
        url: 'https://api.deepseek.com/v1/chat/completions',
        headers: (apiKey: string) => ({
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${apiKey}`
        }),
        body: (prompt: string) => ({
          model: process.env.DEEPSEEK_MODEL || 'deepseek-v3',
          messages: [
            {
              role: 'system',
              content: '你是一名专业的塔罗牌解读师，具有丰富的塔罗牌解读经验。'
            },
            {
              role: 'user',
              content: prompt
            }
          ],
          temperature: 0.6,
          max_tokens: 1500
        }),
        parseResponse: (data: any) => data.choices?.[0]?.message?.content
      }
    };
    
    // 模型调用函数
    const callModel = async (modelType: keyof typeof models): Promise<string | null> => {
      const model = models[modelType];
      
      if (!model.apiKey) {
        console.log(`跳过${modelType}模型，未配置API密钥`);
        return null;
      }
      
      try {
        console.log(`调用${modelType}模型：${model.model}`);
        
        const response = await fetch(model.url, {
          method: 'POST',
          headers: model.headers(model.apiKey),
          body: JSON.stringify(model.body(prompt))
        });
        
        if (!response.ok) {
          const errorData = await response.json().catch(() => ({}));
          console.error(`${modelType} API错误:`, response.status, errorData);
          return null;
        }
        
        const data = await response.json();
        const result = model.parseResponse(data);
        
        if (result) {
          console.log(`${modelType}模型调用成功`);
          return result;
        }
        
        console.error(`${modelType} API返回格式错误:`, data);
        return null;
      } catch (error) {
        console.error(`${modelType} API调用错误:`, error);
        return null;
      }
    };
    
    // 选择模型调用顺序
    let modelOrder: (keyof typeof models)[];
    
    // 验证preferredModel是否为有效的模型类型
    if (preferredModel && Object.keys(models).includes(preferredModel)) {
      modelOrder = [
        preferredModel as keyof typeof models, 
        ...Object.keys(models)
          .filter(m => m !== preferredModel)
          .map(m => m as keyof typeof models)
      ];
    } else {
      // 默认优先使用DeepSeek模型，然后是OpenAI，最后是Anthropic
      modelOrder = ['deepseek', 'openai', 'anthropic'];
    };
    
    // 尝试调用模型，直到成功或所有模型都失败
    let actualModelUsed: string = 'mock';
    for (const modelType of modelOrder) {
      const result = await callModel(modelType);
      if (result) {
        interpretation = result;
        actualModelUsed = modelType;
        break;
      }
    }
    
    // 如果所有模型都失败
    if (!interpretation) {
      if (isProduction) {
        // 生产环境：返回错误
        return NextResponse.json(
          { success: false, message: 'AI模型调用失败' },
          { status: 500 }
        );
      } else {
        // 非生产环境：使用更智能的模拟数据
        interpretation = `根据您的问题：${question || '塔罗牌解读'}\n\n您抽到的牌阵：${spreadName || '塔罗牌阵'}\n\n牌面详情：\n${cardDetails}\n\nAI塔罗解读：\n这是一段智能模拟的塔罗解读。在实际应用中，系统会调用DeepSeek、OpenAI或Anthropic等先进AI模型，结合您的具体问题和牌面组合，生成深入、个性化的解读。\n\n建议：根据解牌结果，您可以考虑采取相应的行动，保持积极的心态面对生活中的挑战和机遇。`;
      }
    }
    
    return NextResponse.json({
      success: true,
      interpretation,
      modelUsed: actualModelUsed
    });
  } catch (error) {
    console.error('AI解读错误:', error);
    return NextResponse.json(
      { success: false, message: error instanceof Error ? error.message : '服务器内部错误' },
      { status: 500 }
    );
  }
}
