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
    作为一名拥有20年专业经验的资深塔罗牌解读师，你精通韦特塔罗体系，擅长深入分析牌面组合与位置关系，请根据以下信息为用户提供专业、深入、个性化的塔罗牌解读：
    
    用户问题：${question || '请对我的牌阵进行综合解读'}
    
    牌阵名称：${spreadName || '塔罗牌阵'}
    
    抽到的牌及位置意义：
    ${cardDetails}
    
    解读要求：
    1. **深度分析**：详细解析每张牌的核心含义，结合其在牌阵中的位置象征
    2. **牌面关联**：深入分析牌与牌之间的互动关系、能量流动和组合效应
    3. **问题聚焦**：针对用户的具体问题，提供针对性的洞察和实用建议
    4. **多层次解读**：从过去、现在、未来三个维度分析，或根据牌阵位置进行相应的时间/领域分析
    5. **情感与行动**：同时提供情感层面的理解和具体的行动建议
    6. **专业易懂**：使用专业但易懂的语言，避免过于晦涩的术语
    7. **温暖引导**：保持温暖、支持性的语气，给予积极正面的引导
    8. **内容丰富**：解读长度控制在800-1200字，确保内容充实、有深度
    9. **韦特传统**：严格遵循韦特塔罗牌的传统解释体系
    10. **个性化**：避免模板化解读，根据牌面组合创造独特的解读内容
    
    请以资深塔罗师的口吻进行解读，让用户感受到你的专业知识和温暖关怀。
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
          temperature: 0.7,
          max_tokens: 800
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
