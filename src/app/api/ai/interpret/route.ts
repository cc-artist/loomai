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
    
    // 准备卡片详细信息，包含位置信息
    const cardDetails = cards.map((card: any) => 
      `${card.position}：${card.name} (${card.meaning})`
    ).join('\n');
    
    // 优化后的提示词模板
    const prompt = `
    作为一名资深塔罗牌解读师，你拥有20年的专业经验，请根据以下信息为用户提供深入、精准的塔罗牌解读：
    
    用户问题：${question || '请对我的牌阵进行综合解读'}
    
    牌阵名称：${spreadName || '塔罗牌阵'}
    
    抽到的牌及位置意义：
    ${cardDetails}
    
    解读要求：
    1. 结合每张牌的核心含义和位置象征
    2. 针对用户问题给出具体的洞察和实用建议
    3. 语言专业易懂，避免过于晦涩的术语
    4. 保持积极正面的引导
    5. 解读长度适中，500-800字
    6. 遵循韦特塔罗牌的传统解释体系
    7. 突出牌面组合的协同效应
    
    请以塔罗师的口吻进行解读，保持温暖、专业的语气。
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
          temperature: 0.7,
          max_tokens: 800
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
          temperature: 0.7,
          max_tokens: 800
        }),
        parseResponse: (data: any) => data.content?.[0]?.text
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
      modelOrder = ['openai', 'anthropic'];
    };
    
    // 尝试调用模型，直到成功或所有模型都失败
    for (const modelType of modelOrder) {
      const result = await callModel(modelType);
      if (result) {
        interpretation = result;
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
        interpretation = `根据您的问题：${question || '塔罗牌解读'}\n\n您抽到的牌阵：${spreadName || '塔罗牌阵'}\n\n牌面详情：\n${cardDetails}\n\nAI塔罗解读：\n这是一段智能模拟的塔罗解读。在实际应用中，系统会调用OpenAI或Anthropic等先进AI模型，结合您的具体问题和牌面组合，生成深入、个性化的解读。\n\n建议：根据解牌结果，您可以考虑采取相应的行动，保持积极的心态面对生活中的挑战和机遇。`;
      }
    }
    
    return NextResponse.json({
      success: true,
      interpretation,
      modelUsed: interpretation.includes('智能模拟') ? 'mock' : modelOrder[0]
    });
  } catch (error) {
    console.error('AI解读错误:', error);
    return NextResponse.json(
      { success: false, message: error instanceof Error ? error.message : '服务器内部错误' },
      { status: 500 }
    );
  }
}
