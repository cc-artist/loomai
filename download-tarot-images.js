const fs = require('fs');
const path = require('path');
const https = require('https');

// 韦特塔罗牌大阿卡纳图片URL列表
const tarotImages = [
  { id: 1, name: 'magician', url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/5f/RWS_Tarot_01_Magician.jpg/500px-RWS_Tarot_01_Magician.jpg' },
  { id: 2, name: 'high-priestess', url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/10/RWS_Tarot_02_High_Priestess.jpg/500px-RWS_Tarot_02_High_Priestess.jpg' },
  { id: 3, name: 'empress', url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/3a/RWS_Tarot_03_Empress.jpg/500px-RWS_Tarot_03_Empress.jpg' },
  { id: 4, name: 'emperor', url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/2c/RWS_Tarot_04_Emperor.jpg/500px-RWS_Tarot_04_Emperor.jpg' },
  { id: 5, name: 'hierophant', url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/3d/RWS_Tarot_05_Hierophant.jpg/500px-RWS_Tarot_05_Hierophant.jpg' },
  { id: 6, name: 'lovers', url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/39/RWS_Tarot_06_Lovers.jpg/500px-RWS_Tarot_06_Lovers.jpg' },
  { id: 7, name: 'chariot', url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/74/RWS_Tarot_07_Chariot.jpg/500px-RWS_Tarot_07_Chariot.jpg' },
  { id: 8, name: 'strength', url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/42/RWS_Tarot_08_Strength.jpg/500px-RWS_Tarot_08_Strength.jpg' },
  { id: 9, name: 'hermit', url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/9b/RWS_Tarot_09_Hermit.jpg/500px-RWS_Tarot_09_Hermit.jpg' },
  { id: 10, name: 'wheel-of-fortune', url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d3/RWS_Tarot_10_Wheel_of_Fortune.jpg/500px-RWS_Tarot_10_Wheel_of_Fortune.jpg' },
  { id: 11, name: 'justice', url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/93/RWS_Tarot_11_Justice.jpg/500px-RWS_Tarot_11_Justice.jpg' },
  { id: 12, name: 'hanged-man', url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/73/RWS_Tarot_12_Hanged_Man.jpg/500px-RWS_Tarot_12_Hanged_Man.jpg' },
  { id: 13, name: 'death', url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d4/RWS_Tarot_13_Death.jpg/500px-RWS_Tarot_13_Death.jpg' },
  { id: 14, name: 'temperance', url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/fa/RWS_Tarot_14_Temperance.jpg/500px-RWS_Tarot_14_Temperance.jpg' },
  { id: 15, name: 'devil', url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/2c/RWS_Tarot_15_Devil.jpg/500px-RWS_Tarot_15_Devil.jpg' },
  { id: 16, name: 'tower', url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/4a/RWS_Tarot_16_Tower.jpg/500px-RWS_Tarot_16_Tower.jpg' },
  { id: 17, name: 'star', url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/5a/RWS_Tarot_17_Star.jpg/500px-RWS_Tarot_17_Star.jpg' },
  { id: 18, name: 'moon', url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d7/RWS_Tarot_18_Moon.jpg/500px-RWS_Tarot_18_Moon.jpg' },
  { id: 19, name: 'sun', url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c4/RWS_Tarot_19_Sun.jpg/500px-RWS_Tarot_19_Sun.jpg' },
  { id: 20, name: 'judgement', url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/60/RWS_Tarot_20_Judgement.jpg/500px-RWS_Tarot_20_Judgement.jpg' },
  { id: 21, name: 'world', url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/8e/RWS_Tarot_22_World.jpg/500px-RWS_Tarot_22_World.jpg' },
  { id: 22, name: 'fool', url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/59/RWS_Tarot_00_Fool.jpg/500px-RWS_Tarot_00_Fool.jpg' }
];

// 创建目录
const directory = path.join(__dirname, 'public', 'tarot-cards', 'major-arcana');
if (!fs.existsSync(directory)) {
  fs.mkdirSync(directory, { recursive: true });
}

// 下载图片函数
const downloadImage = (url, filepath) => {
  return new Promise((resolve, reject) => {
    https.get(url, (response) => {
      if (response.statusCode === 200) {
        const file = fs.createWriteStream(filepath);
        response.pipe(file);
        file.on('finish', () => {
          file.close();
          resolve(filepath);
        });
      } else {
        reject(new Error(`Failed to download image, status code: ${response.statusCode}`));
      }
    }).on('error', (error) => {
      reject(error);
    });
  });
};

// 批量下载图片
const downloadAllImages = async () => {
  console.log('开始下载韦特塔罗牌图片...');
  
  for (const image of tarotImages) {
    try {
      const filepath = path.join(directory, `${image.name}.jpg`);
      console.log(`正在下载: ${image.name}`);
      await downloadImage(image.url, filepath);
      console.log(`✅ 下载完成: ${image.name}`);
      
      // 等待1秒，避免请求过快
      await new Promise(resolve => setTimeout(resolve, 1000));
    } catch (error) {
      console.error(`❌ 下载失败: ${image.name}`, error.message);
    }
  }
  
  console.log('所有图片下载完成！');
};

downloadAllImages();
