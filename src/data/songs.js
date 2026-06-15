/**
 * Song catalogue — all lyrics transcribed from Eiro's 2020–2025 portfolio PDF.
 *
 * Data shape:
 *   id          – slug used in routing / data lookups
 *   title       – Cantonese title shown on spread
 *   originalTitle – English title of source song
 *   originalArtist
 *   youtubeId   – official MV; used for karaoke timing + QR/link block
 *   coverAsset  – filename in /public/assets/songs/
 *   sticker     – filename in /public/assets/cover/ (sticker on landing page)
 *   stickerPos  – { top, left } as % strings for hotspot overlay
 *   category    – column key in 九因歌 index
 *   pages       – array of page objects; each page = array of line objects
 *
 * Line object:
 *   { text, type, time }
 *   type: 'lyric' | 'section' | 'blank'
 *   time: seconds (null until synced)
 *
 * Manual page breaks are deliberate — these are hand-tuned like the original PDF.
 */

export const CATEGORIES = {
  western: 'Pop',
  kpop: 'K-Pop',
  japanese: 'J-Pop',
  cantonese: 'Canto Pop',
};

export const songs = [
  {
    id: 'abc',
    title: 'ABC',
    subtitle: '(angrily-born chinese)',
    originalTitle: 'all-american bitch',
    originalArtist: 'Olivia Rodrigo',
    youtubeId: 'n2BnbpjpRdo',
    youtubeUrl: 'https://music.youtube.com/watch?v=n2BnbpjpRdo&si=0p9ZsU0-qLqbOISn',
    coverAsset: 'allamericanbitch.png',
    sticker: 'sticker-abc.png',
    stickerPos: { top: '44%', left: '22%' },
    category: 'western',
    pages: [
      // Page 1 (right of spread)
      [
        { text: '[Verse 1]', type: 'section', time: null },
        { text: '不想真心但我真的怯懦', type: 'lyric', time: 6.2 },
        { text: '很想借口於事完全沒法躲', type: 'lyric', time: 12.4 },
        { text: '像燈熄了我會緊張急跳', type: 'lyric', time: 18.4 },
        { text: '交給你我會擔心分秒', type: 'lyric', time: 22.6 },
        { text: '都是我', type: 'lyric', time: 25.3 },
        { text: '', type: 'blank', time: null },
        { text: '心間滿載寄望我要友善', type: 'lyric', time: 28.0 },
        { text: '擔心許多不過無法浮現', type: 'lyric', time: 33.9 },
        { text: '像歡喜我要掩飾', type: 'lyric', time: 40.2 },
        { text: '不喜歡他也要解釋', type: 'lyric', time: 43.4 },
        { text: '多少次 yeah 不會變', type: 'lyric', time: 46.0 },
        { text: '', type: 'blank', time: null },
        { text: '[Chorus]', type: 'section', time: null },
        { text: '謊話像是脈搏', type: 'lyric', time: 53.0 },
        { text: '歡笑說話讓我討好每個', type: 'lyric', time: 56.0 },
        { text: '真實就是做錯', type: 'lyric', time: 59.0 },
        { text: '', type: 'blank', time: null },
        { text: '就用我今晚悔過', type: 'lyric', time: 62.7 },
      ],
      // Page 2
      [
        { text: '[Verse 2]', type: 'section', time: null },
        { text: '不想感恩也要勉強答謝', type: 'lyric', time: 64.5 },
        { text: '她的理想讓我得到這些', type: 'lyric', time: 70.7 },
        { text: '心思博到嘉許 但我的真心全部婉拒', type: 'lyric', time: 77.4 },
        { text: '心會碎 但我繼續追-', type: 'lyric', time: 83.1 },
        { text: '', type: 'blank', time: null },
        { text: '[Chorus]', type: 'section', time: null },
        { text: '一個 現實自我', type: 'lyric', time: 89.9 },
        { text: '所有渴望我都不放過', type: 'lyric', time: 93.5 },
        { text: '甘願 日日受挫', type: 'lyric', time: 96.1 },
        { text: '為了實現天天悔過', type: 'lyric', time: 99.6 },
        { text: '管他真心多麽惹禍', type: 'lyric', time: 103.6 },
        { text: '解脫自我哪怕過火', type: 'lyric', time: 106.3 },
        { text: '而我是我 年輕是錯 無須嫌我', type: 'lyric', time: 109.0 },
        { text: '', type: 'blank', time: null },
        { text: '[Post Chorus]', type: 'section', time: null },
        { text: '不甘小心不鍾意', type: 'lyric', time: 113.2 },
        { text: '我此生只得這一次', type: 'lyric', time: 116.7 },
        { text: '再多痛楚我都想試 好嗎', type: 'lyric', time: 159.6 },
        { text: '', type: 'blank', time: null },
        { text: '[Outro]', type: 'section', time: null },
        { text: '多少次', type: 'lyric', time: 138.8 },
        { text: '脫光了很多遍', type: 'lyric', time: 140.9 },
        { text: '苦心過無數天', type: 'lyric', time: 143.8 },
        { text: '反覆重演一次', type: 'lyric', time: 147.5 },
        { text: '也許很想試', type: 'lyric', time: 150.2 },
        { text: '未實行過一次', type: 'lyric', time: 152.9 },
        { text: '心境隨時化煙', type: 'lyric', time: 156.4 },
        { text: '憧憬仍不許變', type: 'lyric', time: 158.9 },
      ],
    ],
  },

  {
    id: 'hottogo',
    title: '學跳高',
    subtitle: null,
    originalTitle: 'HOT TO GO!',
    originalArtist: 'Chappell Roan',
    youtubeId: 'GJAt8bqW00E',
    youtubeUrl: 'https://youtu.be/GJAt8bqW00E?si=0ptf6g6aspWakHOl',
    coverAsset: 'hottogo.png',
    sticker: 'sticker-hottogo.png',
    stickerPos: { top: '48%', left: '30%' },
    category: 'western',
    pages: [
      // Page 1
      [
        { text: '[Verse 1]', type: 'section', time: null },
        { text: '你說有愛侶可以不管一切', type: 'lyric', time: 17.4 },
        { text: '我聽進半句轉眼擺好姿勢', type: 'lyric', time: 20.5 },
        { text: '聽說你興趣恐怕這般心意', type: 'lyric', time: 24.3 },
        { text: '你永遠抗拒所以高舉真摯', type: 'lyric', time: 27.8 },
        { text: '', type: 'blank', time: null },
        { text: '[Refrain]', type: 'section', time: null },
        { text: '喜歡要寫種情詩', type: 'lyric', time: 31.3 },
        { text: '跳高叫囂多無恥', type: 'lyric', time: 34.5 },
        { text: '心中要不得如此', type: 'lyric', time: 37.0 },
        { text: '所以放棄去暗示 要有你注視', type: 'lyric', time: 41.2 },
        { text: '', type: 'blank', time: null },
        { text: '[[Pre-Chorus]]', type: 'section', time: null },
        { text: 'H o t t o g o', type: 'lyric', time: 44.9 },
        { text: '知覺興奮你feel到', type: 'lyric', time: 46.7 },
        { text: '心跳七拍數一數', type: 'lyric', time: 48.0 },
        { text: '跟我起舞會剛好', type: 'lyric', time: 50.2 },
        { text: 'H o t t o g o', type: 'lyric', time: 51.3 },
        { text: '相約小鎮跳風土', type: 'lyric', time: 53.0 },
        { text: '所有心意我傾吐', type: 'lyric', time: 54.4 },
        { text: 'H o t t o g o', type: 'lyric', time: 56.8 },
        { text: '', type: 'blank', time: null },
        { text: '[Chorus]', type: 'section', time: null },
        { text: 'H O T T O G O', type: 'lyric', time: 59.3 },
        { text: '若你願意請跳高', type: 'lyric', time: 62.4 },
        { text: 'H O T T O G O', type: 'lyric', time: 65.4 },
        { text: '隨地跳放心跌倒', type: 'lyric', time: 69.5 },
      ],
      // Page 2
      [
        { text: '[Verse 2]', type: 'section', time: null },
        { text: '愛意說半句聽太多都心碎', type: 'lyric', time: 72.0 },
        { text: '跳舞跳到老這晚多麼心醉', type: 'lyric', time: 75.2 },
        { text: '跳躍會熱愛請你聽這一次', type: 'lyric', time: 79.0 },
        { text: '滿意試著叫三秒供給心跳', type: 'lyric', time: 82.5 },
        { text: '', type: 'blank', time: null },
        { text: '[Refrain]', type: 'section', time: null },
        { text: '愛戀要點點自私', type: 'lyric', time: 86.0 },
        { text: '跌傷也應該投資', type: 'lyric', time: 88.8 },
        { text: '理想要不得良知', type: 'lyric', time: 81.8 },
        { text: '所以放棄去暗示 要你賦意義', type: 'lyric', time: 96.8 },
        { text: '', type: 'blank', time: null },
        { text: '[Pre-Chorus]', type: 'section', time: null },
        { text: 'H o t t o g o', type: 'lyric', time: 99.8 },
        { text: '知覺興奮你feel到', type: 'lyric', time: 101.5 },
        { text: '心跳七拍數一數', type: 'lyric', time: 122.0 },
        { text: '跟我起舞會剛好', type: 'lyric', time: 124.5 },
        { text: 'H o t t o g o', type: 'lyric', time: 127.0 },
        { text: '相約小鎮跳風土', type: 'lyric', time: 129.5 },
        { text: '所有心意會知道', type: 'lyric', time: 132.0 },
        { text: 'H o t t o g o', type: 'lyric', time: 134.0 },
        { text: '', type: 'blank', time: null },
        { text: '[Chorus]', type: 'section', time: null },
        { text: 'H O T T O G O', type: 'lyric', time: 135.0 },
        { text: '若你願意請跳高', type: 'lyric', time: 137.5 },
        { text: 'H O T T O G O', type: 'lyric', time: 140.0 },
        { text: '隨地跳放心跌倒', type: 'lyric', time: 142.5 },
        { text: '', type: 'blank', time: null },
        { text: '[Bridge]', type: 'section', time: null },
        { text: '心一跳我手腳亂舞', type: 'lyric', time: 150.0 },
        { text: '準備好你請跳高', type: 'lyric', time: 152.5 },
        { text: '可不可拍手跳七步', type: 'lyric', time: 155.0 },
        { text: '請不要放手太早', type: 'lyric', time: 157.5 },
        { text: '', type: 'blank', time: null },
        { text: '經不起我心態驕傲', type: 'lyric', time: 160.0 },
        { text: '我想跟你活到老', type: 'lyric', time: 162.5 },
        { text: '三分鐘請跟我速度', type: 'lyric', time: 165.0 },
        { text: '有心者總可跳高', type: 'lyric', time: 167.5 },
        { text: '', type: 'blank', time: null },
        { text: '[Chorus]', type: 'section', time: null },
        { text: 'H O T T O G O', type: 'lyric', time: 170.0 },
        { text: '若你願意請跳高', type: 'lyric', time: 172.5 },
        { text: 'H O T T O G O', type: 'lyric', time: 175.0 },
        { text: '隨地跳放心跌倒', type: 'lyric', time: 177.5 },
      ],
    ],
  },

  {
    id: 'lovedive',
    title: 'Love Dive',
    subtitle: null,
    originalTitle: 'Love Dive',
    originalArtist: 'IVE',
    youtubeId: 'hh5GKVa8VtM',
    youtubeUrl: 'https://youtu.be/hh5GKVa8VtM?si=46QS0uCqinSRV53B',
    coverAsset: 'lovedive.png',
    sticker: 'sticker-lovedive.png',
    stickerPos: { top: '55%', left: '62%' },
    category: 'kpop',
    pages: [
      // Page 1
      [
        { text: '[Verse 1]', type: 'section', time: null },
        { text: '如今要真心講 心裡感覺真的諷刺', type: 'lyric', time: 25.0 },
        { text: '能否講出心安 不要躲避心中意思', type: 'lyric', time: 29.0 },
        { text: '實在沒法擋 心知不妙都要試', type: 'lyric', time: 33.0 },
        { text: '剖白一息間 彷似水裡飛越魚兒', type: 'lyric', time: 37.0 },
        { text: '', type: 'blank', time: null },
        { text: '[Pre-Chorus]', type: 'section', time: null },
        { text: 'Ooh-ooh, ooh-ooh 水中呼吸覺阻', type: 'lyric', time: 41.0 },
        { text: 'Ooh-ooh, ooh-ooh 這碧波怎去躲', type: 'lyric', time: 44.5 },
        { text: 'Ooh-ooh, ooh-ooh yeah,', type: 'lyric', time: 48.0 },
        { text: 'It\'s so bad, it\'s good', type: 'lyric', time: 50.0 },
        { text: '我只顧跟上心中腳步', type: 'lyric', time: 53.0 },
        { text: '', type: 'blank', time: null },
        { text: '[Chorus]', type: 'section', time: null },
        { text: '憑值舞曲 在月夜痛哭 這是我心歸屬', type: 'lyric', time: 57.0 },
        { text: '即使心醉 忘掉吐息 也分外刺激', type: 'lyric', time: 61.0 },
        { text: '（你加親暱 我於水溺）', type: 'lyric', time: 65.0 },
        { text: '碧波退, love dive', type: 'lyric', time: 69.0 },
        { text: '', type: 'blank', time: null },
        { text: '[Chorus]', type: 'section', time: null },
        { text: 'Ooh-ooh, ooh-ooh', type: 'lyric', time: 73.0 },
        { text: 'La-la, la, la, la-la-la', type: 'lyric', time: 75.0 },
        { text: 'Ooh-ooh, ooh-ooh 無阻無擋 love dive', type: 'lyric', time: 77.0 },
        { text: 'Ooh-ooh, ooh-ooh', type: 'lyric', time: 81.0 },
        { text: 'Oh perfect sacrifice, yeah', type: 'lyric', time: 83.0 },
        { text: '', type: 'blank', time: null },
        { text: '身粉碎, love dive', type: 'lyric', time: 87.0 },
      ],
      // Page 2
      [
        { text: '[Verse 2]', type: 'section', time: null },
        { text: '難俯瞰知水深 好說躲退偏不依', type: 'lyric', time: 95.0 },
        { text: '而爾如此果敢 決定這愛必一試', type: 'lyric', time: 99.0 },
        { text: '我會懊悔嗎? 此刻不試怎麼知?', type: 'lyric', time: 103.0 },
        { text: '邁 步 越 跨', type: 'lyric', time: 107.0 },
        { text: '此生此戀僅於此', type: 'lyric', time: 110.0 },
        { text: '', type: 'blank', time: null },
        { text: '[Pre-Chorus]', type: 'section', time: null },
        { text: 'Ooh-ooh, ooh-ooh 盼君心生愛戀', type: 'lyric', time: 113.0 },
        { text: 'Ooh-ooh, ooh-ooh 這碧波將我捲', type: 'lyric', time: 116.5 },
        { text: 'Ooh-ooh, ooh-ooh yeah,', type: 'lyric', time: 120.0 },
        { text: 'It\'s so bad, it\'s good', type: 'lyric', time: 122.0 },
        { text: '放手讓愛動領我腳步', type: 'lyric', time: 125.0 },
        { text: '', type: 'blank', time: null },
        { text: '[Chorus]', type: 'section', time: null },
        { text: '憑值舞曲 在月夜痛哭 這是我心歸屬', type: 'lyric', time: 129.0 },
        { text: '即使心醉 忘掉吐息 也分外刺激', type: 'lyric', time: 133.0 },
        { text: '（你加親暱 我於水溺）', type: 'lyric', time: 137.0 },
        { text: '碧波退, love dive', type: 'lyric', time: 141.0 },
        { text: '', type: 'blank', time: null },
        { text: '[Chorus]', type: 'section', time: null },
        { text: 'Ooh-ooh, ooh-ooh', type: 'lyric', time: 145.0 },
        { text: 'La-la, la, la, la-la-la', type: 'lyric', time: 147.0 },
        { text: 'Ooh-ooh, ooh-ooh 無阻無擋 love dive', type: 'lyric', time: 149.0 },
        { text: 'Ooh-ooh, ooh-ooh', type: 'lyric', time: 153.0 },
        { text: 'Oh perfect sacrifice, yeah', type: 'lyric', time: 155.0 },
        { text: '', type: 'blank', time: null },
        { text: '身粉碎, love dive', type: 'lyric', time: 159.0 },
        { text: '', type: 'blank', time: null },
        { text: '[Bridge]', type: 'section', time: null },
        { text: '身粉碎, love dive x5', type: 'lyric', time: 165.0 },
      ],
    ],
  },

  {
    id: 'blueming',
    title: 'Blueming',
    subtitle: null,
    originalTitle: 'Blueming',
    originalArtist: 'IU',
    youtubeId: 'I0_ZXHzKysc',
    youtubeUrl: 'https://youtu.be/I0_ZXHzKysc?si=Oe-HDG1An6SktgBj',
    coverAsset: 'blueming.png',
    sticker: 'sticker-blueming.png',
    stickerPos: { top: '52%', left: '68%' },
    category: 'kpop',
    pages: [
      // Page 1
      [
        { text: '深夜世界未止息', type: 'lyric', time: 12.0 },
        { text: '仍然跳躍變身的語句 每天 woo', type: 'lyric', time: 15.5 },
        { text: '還跟你對答像往昔', type: 'lyric', time: 19.0 },
        { text: '為何每次遠走心都可變近 習慣 woo', type: 'lyric', time: 22.5 },
        { text: '', type: 'blank', time: null },
        { text: '沒錯困倦也要談 不必歇下', type: 'lyric', time: 28.0 },
        { text: '怎麼嘴角會上揚 續笑會發麻', type: 'lyric', time: 31.5 },
        { text: '現在 不必講從來 專注於剎那', type: 'lyric', time: 35.0 },
        { text: '這道理你懂嗎', type: 'lyric', time: 38.5 },
        { text: '', type: 'blank', time: null },
        { text: '但我 逐秒都會想她', type: 'lyric', time: 42.0 },
        { text: '這記掛再次見面態度為「你好嗎」', type: 'lyric', time: 45.5 },
        { text: '就算 令我哭也想她', type: 'lyric', time: 51.0 },
        { text: '要變卦也要借對話來解 牽掛', type: 'lyric', time: 54.5 },
        { text: '', type: 'blank', time: null },
        { text: '現正 為你將這歌 寄意', type: 'lyric', time: 61.0 },
        { text: '', type: 'blank', time: null },
        { text: '能跟你 再說是那些', type: 'lyric', time: 67.0 },
        { text: '無聊玩笑 達旦都可感暢快 奇怪 ooh', type: 'lyric', time: 70.5 },
        { text: '得你故意說着某些', type: 'lyric', time: 76.0 },
        { text: '神奇語句 令我手都感到震 太傷感', type: 'lyric', time: 79.5 },
      ],
      // Page 2
      [
        { text: '逐句糾正照片配合 情意要送達', type: 'lyric', time: 87.0 },
        { text: '為了交心包裝卸下 如我要對話', type: 'lyric', time: 90.5 },
        { text: '這個 真正的你我 好好的試過', type: 'lyric', time: 94.0 },
        { text: '學聽見你心窩', type: 'lyric', time: 97.5 },
        { text: '', type: 'blank', time: null },
        { text: '是我 逐秒都會想她', type: 'lyric', time: 101.0 },
        { text: '這記掛再次見面態度為「晚安啦」', type: 'lyric', time: 104.5 },
        { text: '就算 令我哭也想她', type: 'lyric', time: 110.0 },
        { text: '眼裏這眼淚化做回憶', type: 'lyric', time: 113.5 },
        { text: '', type: 'blank', time: null },
        { text: '讓我為你將這歌', type: 'lyric', time: 120.0 },
        { text: '', type: 'blank', time: null },
        { text: '最好把心中所有思念都要一一撰寫', type: 'lyric', time: 127.0 },
        { text: '是晚上跟隔天早晨 相距思念描寫', type: 'lyric', time: 132.0 },
        { text: '無法可 天天相見 掛念從此傾瀉', type: 'lyric', time: 137.0 },
        { text: '對話會否理想些？', type: 'lyric', time: 142.0 },
        { text: '', type: 'blank', time: null },
        { text: '但是我 難以不去想她', type: 'lyric', time: 147.0 },
        { text: '蓋過我悲傷快樂 怎會如此牽掛', type: 'lyric', time: 150.5 },
        { text: '換你今次想我，好嗎？', type: 'lyric', time: 156.0 },
        { text: '我也會每次繼續回想', type: 'lyric', time: 159.5 },
        { text: '', type: 'blank', time: null },
        { text: '用我甜笑把煩厭抹過', type: 'lyric', time: 167.0 },
      ],
    ],
  },

  {
    id: 'windflower',
    title: '風花',
    subtitle: null,
    originalTitle: 'Wind Flower',
    originalArtist: 'MAMAMOO',
    youtubeId: 'B09fEHm48ZI',
    youtubeUrl: 'https://youtu.be/B09fEHm48ZI?si=Dpvpdo7JvuBup_p_',
    coverAsset: 'windflower.png',
    sticker: 'sticker-windflower.png',
    stickerPos: { top: '60%', left: '55%' },
    category: 'kpop',
    pages: [
      // Page 1
      [
        { text: '吹散那朵花', type: 'lyric', time: 10.0 },
        { text: '傷口會結疤', type: 'lyric', time: 13.0 },
        { text: '不要再想他', type: 'lyric', time: 16.0 },
        { text: '則會更好吧', type: 'lyric', time: 19.0 },
        { text: '', type: 'blank', time: null },
        { text: '然心緒有點差', type: 'lyric', time: 25.0 },
        { text: '不見得歸家', type: 'lyric', time: 28.0 },
        { text: 'Baby', type: 'lyric', time: 31.0 },
        { text: '這真愛卻是有點虛假', type: 'lyric', time: 33.0 },
        { text: '', type: 'blank', time: null },
        { text: '盛放的花 綻開那一剎多麼閃爍璀璨', type: 'lyric', time: 40.0 },
        { text: '然而 花朵凋謝消逝不過短暫一眼', type: 'lyric', time: 45.0 },
        { text: '迷失中 yayayayaya', type: 'lyric', time: 50.0 },
        { text: '任這風 yayayayaya', type: 'lyric', time: 53.0 },
        { text: '難保花開不會變化', type: 'lyric', time: 56.0 },
        { text: '', type: 'blank', time: null },
        { text: 'Wind flower', type: 'lyric', time: 60.0 },
        { text: 'Wind-wind flower', type: 'lyric', time: 62.5 },
        { text: '道別那剎愛戀將消逝', type: 'lyric', time: 65.0 },
        { text: 'Wind flower', type: 'lyric', time: 68.0 },
        { text: 'Wind-wind flower', type: 'lyric', time: 70.5 },
        { text: '', type: 'blank', time: null },
        { text: 'Ooh oh oh oh', type: 'lyric', time: 73.0 },
        { text: '乾脆撇掉了吧', type: 'lyric', time: 75.5 },
        { text: 'dudududu', type: 'lyric', time: 78.0 },
        { text: '不要憂心牽掛', type: 'lyric', time: 80.5 },
        { text: '讓這朵花風裡起舞好嗎', type: 'lyric', time: 83.0 },
        { text: 'Get better day by day,', type: 'lyric', time: 86.0 },
        { text: 'Get better day by day', type: 'lyric', time: 89.0 },
      ],
      // Page 2
      [
        { text: '下降 後會 漸漸 長滿花 (長滿花 oh yeah)', type: 'lyric', time: 98.0 },
        { text: '就似 你會 遇上 好的他 (遇上好的他)', type: 'lyric', time: 103.0 },
        { text: 'ooh oh oh oh', type: 'lyric', time: 108.0 },
        { text: '不需憂心牽掛', type: 'lyric', time: 110.5 },
        { text: 'Get better day by day,', type: 'lyric', time: 113.0 },
        { text: 'Get better day by day', type: 'lyric', time: 116.0 },
        { text: '', type: 'blank', time: null },
        { text: '但係我真係好想知', type: 'lyric', time: 122.0 },
        { text: '點解你話我痴線', type: 'lyric', time: 125.0 },
        { text: '付出過嘅 唔係想要回報咩', type: 'lyric', time: 128.0 },
        { text: '算啦 無謂 嘥氣啦', type: 'lyric', time: 131.0 },
        { text: '我為我自己而活', type: 'lyric', time: 134.0 },
        { text: '原來我個心係你架？', type: 'lyric', time: 137.0 },
        { text: '點解我唔知嘅？', type: 'lyric', time: 140.0 },
        { text: '', type: 'blank', time: null },
        { text: '盛放的花 綻開那一剎多麼璀璨', type: 'lyric', time: 145.0 },
        { text: '然而 花朵凋謝消逝不過一眼', type: 'lyric', time: 149.0 },
        { text: '迷失中 yayayayaya', type: 'lyric', time: 153.0 },
        { text: '別心痛 yayayayaya', type: 'lyric', time: 156.0 },
        { text: '預左花開必會變化', type: 'lyric', time: 159.0 },
        { text: '', type: 'blank', time: null },
        { text: 'wind flower', type: 'lyric', time: 163.0 },
        { text: 'wind wind flower', type: 'lyric', time: 165.5 },
        { text: '道別那剎愛戀經消逝', type: 'lyric', time: 168.0 },
        { text: 'wind flower', type: 'lyric', time: 171.0 },
        { text: 'wind wind flower', type: 'lyric', time: 173.5 },
        { text: '', type: 'blank', time: null },
        { text: 'Ooh oh oh oh', type: 'lyric', time: 176.0 },
        { text: '乾脆撇掉了吧', type: 'lyric', time: 178.5 },
        { text: 'dudududu', type: 'lyric', time: 181.0 },
        { text: '不要憂心牽掛', type: 'lyric', time: 183.5 },
        { text: '讓這朵花風裡起舞好嗎', type: 'lyric', time: 186.0 },
        { text: 'Get better day by day,', type: 'lyric', time: 189.0 },
        { text: 'Get better day by day', type: 'lyric', time: 192.0 },
      ],
    ],
  },
  {
    id: 'focus',
    title: "Focus",
    originalTitle: "Focus",
    originalArtist: "Hearts2Hearts",
    youtubeId: 'eqKhhG4FVoQ',
    pages: [
      [
            {
                  text: '[Intro]',
                  type: 'section',
                  time: null
            },
            {
                  text: 'I cannot focus',
                  type: 'lyric',
                  time: 2.1
            },
            {
                  text: 'You’re all I’m needing',
                  type: 'lyric',
                  time: 4.2
            },
            {
                  text: 'I cannot focus',
                  type: 'lyric',
                  time: 6.2
            },
            {
                  text: 'You’re all I’m seeing',
                  type: 'lyric',
                  time: 7.7
            },
            {
                  text: '',
                  type: 'blank',
                  time: null
            },
            {
                  text: '[Verse 1]',
                  type: 'section',
                  time: null
            },
            {
                  text: 'I cannot focus 電話set勿擾baby',
                  type: 'lyric',
                  time: 9.4
            },
            {
                  text: 'I cannot focus 自尊心已弄丟',
                  type: 'lyric',
                  time: 13
            },
            {
                  text: '呼叫在心裏內 怎可外表 baby',
                  type: 'lyric',
                  time: 16.6
            },
            {
                  text: '將我目光放在 anything, on anyone but you',
                  type: 'lyric',
                  time: 20.4
            },
            {
                  text: '',
                  type: 'blank',
                  time: null
            },
            {
                  text: '[Pre-Chorus]',
                  type: 'section',
                  time: null
            },
            {
                  text: '思想反覆聽見',
                  type: 'lyric',
                  time: 24.4
            },
            {
                  text: 'You’re so amazing, amazing, amazing, amazing',
                  type: 'lyric',
                  time: 27.1
            },
            {
                  text: '天天想他幾遍',
                  type: 'lyric',
                  time: 31.6
            },
            {
                  text: '要見你訊息 要瞬即 要壓抑 太刺激',
                  type: 'lyric',
                  time: 34.3
            },
            {
                  text: '為了',
                  type: 'lyric',
                  time: 38.6
            },
            {
                  text: '不分心去嘆息 任訊息讓我積心裏',
                  type: 'lyric',
                  time: 41.6
            },
            {
                  text: '編輯即刪去 若不 講出心裏 能否寫出詩句',
                  type: 'lyric',
                  time: 48.1
            },
            {
                  text: '',
                  type: 'blank',
                  time: null
            },
            {
                  text: '[Chorus]',
                  type: 'section',
                  time: null
            },
            {
                  text: 'I cannot focus 電話set勿擾baby',
                  type: 'lyric',
                  time: 53.6
            },
            {
                  text: 'I cannot focus 自尊心已弄丟',
                  type: 'lyric',
                  time: 57.4
            },
            {
                  text: '呼叫在心裏內 怎可外表 baby',
                  type: 'lyric',
                  time: 61
            },
            {
                  text: '將我目光放在 anything, on anyone but you',
                  type: 'lyric',
                  time: 64.8
            }
      ],
      [
            {
                  text: '[Post-Chorus]',
                  type: 'section',
                  time: null
            },
            {
                  text: '他於腦內擾 擾 擾 擾 擾',
                  type: 'lyric',
                  time: 71.3
            },
            {
                  text: '心火似在燒 燒 燒 燒 燒',
                  type: 'lyric',
                  time: 74.9
            },
            {
                  text: '思想往外飄 飄 飄 飄 飄',
                  type: 'lyric',
                  time: 78.6
            },
            {
                  text: '',
                  type: 'blank',
                  time: null
            },
            {
                  text: '[Verse 2]',
                  type: 'section',
                  time: null
            },
            {
                  text: '即使很想反對',
                  type: 'lyric',
                  time: 83.5
            },
            {
                  text: '但看似意識 要脅迫 用美色 在夾擊',
                  type: 'lyric',
                  time: 86.2
            },
            {
                  text: '要共心思作對',
                  type: 'lyric',
                  time: 90.7
            },
            {
                  text: '你佔據記憶 so random 但滿意 my pleasure',
                  type: 'lyric',
                  time: 93.6
            },
            {
                  text: 'it’s you',
                  type: 'lyric',
                  time: 97.8
            },
            {
                  text: '手機倒轉 受傷 別再想',
                  type: 'lyric',
                  time: 100.7
            },
            {
                  text: '卻也即翻轉',
                  type: 'lyric',
                  time: 103.9
            },
            {
                  text: '可否給致電 能聽到他聲線',
                  type: 'lyric',
                  time: 107.2
            },
            {
                  text: '認真多想一見',
                  type: 'lyric',
                  time: 110.6
            },
            {
                  text: '',
                  type: 'blank',
                  time: null
            },
            {
                  text: '[Chorus]',
                  type: 'section',
                  time: null
            },
            {
                  text: 'I cannot focus 電話set勿擾baby',
                  type: 'lyric',
                  time: 112.7
            },
            {
                  text: 'I cannot focus 自尊心已弄丟',
                  type: 'lyric',
                  time: 116.5
            },
            {
                  text: '呼叫在心裏內 怎可以外表 baby',
                  type: 'lyric',
                  time: 120.1
            },
            {
                  text: '將我目光放在 anything, on anyone but you',
                  type: 'lyric',
                  time: 123.8
            },
            {
                  text: '',
                  type: 'blank',
                  time: null
            },
            {
                  text: '[Outro]',
                  type: 'section',
                  time: null
            },
            {
                  text: 'I cannot focus',
                  type: 'lyric',
                  time: 142.5
            },
            {
                  text: 'You’re all I’m needing',
                  type: 'lyric',
                  time: 144.4
            },
            {
                  text: 'I cannot focus',
                  type: 'lyric',
                  time: 146.2
            },
            {
                  text: 'You’re all I’m seeing',
                  type: 'lyric',
                  time: 148
            },
            {
                  text: 'I cannot focus',
                  type: 'lyric',
                  time: 150
            },
            {
                  text: 'You’re all I’m needing',
                  type: 'lyric',
                  time: 151.7
            },
            {
                  text: 'I cannot focus',
                  type: 'lyric',
                  time: 153.6
            },
            {
                  text: 'You’re all I’m seeing',
                  type: 'lyric',
                  time: 155.4
            },
            {
                  text: 'I cannot focus',
                  type: 'lyric',
                  time: 159.1
            },
            {
                  text: 'You’re all I’m needing',
                  type: 'lyric',
                  time: 161.2
            },
            {
                  text: 'I cannot focus',
                  type: 'lyric',
                  time: 163.3
            },
            {
                  text: 'You’re all I’m seeing',
                  type: 'lyric',
                  time: 165.3
            },
            {
                  text: 'I cannot focus',
                  type: 'lyric',
                  time: 169.1
            },
            {
                  text: 'You’re all I’m needing',
                  type: 'lyric',
                  time: 171.2
            },
            {
                  text: 'I cannot focus',
                  type: 'lyric',
                  time: 173.3
            },
            {
                  text: 'You’re all I’m seeing',
                  type: 'lyric',
                  time: 175.3
            },
      ]
]
  },

  {
    id: 'gethimback',
    title: "反枱",
    originalTitle: "get him back!",
    originalArtist: "Olivia Rodrigo",
    youtubeId: 'i_GA5GFAyKE',
    pages: [
      [
            {
                  text: '[Verse 1]',
                  type: 'section',
                  time: null
            },
            {
                  text: '跌傷 不通暢 都通通歸佢帳',
                  type: 'lyric',
                  time: 5.4
            },
            {
                  text: '難道我心碎要考慮佢立場？',
                  type: 'lyric',
                  time: 8.3
            },
            {
                  text: '佢三月告白七月即刻心意難測',
                  type: 'lyric',
                  time: 11.2
            },
            {
                  text: '我話要短暫告別',
                  type: 'lyric',
                  time: 13.9
            },
            {
                  text: '佢話 “dude, nice try”',
                  type: 'lyric',
                  time: 15.6
            },
            {
                  text: '',
                  type: 'blank',
                  time: null
            },
            {
                  text: '[Pre-Chorus]',
                  type: 'section',
                  time: null
            },
            {
                  text: '我知好天真',
                  type: 'lyric',
                  time: 17.2
            },
            {
                  text: '鍾意一個原因',
                  type: 'lyric',
                  time: 18.6
            },
            {
                  text: '佢睇住我就好似世上只係得我一人',
                  type: 'lyric',
                  time: 19.9
            },
            {
                  text: '佢攬住我 佢哼首歌 佢去廁所 佢唔見咗',
                  type: 'lyric',
                  time: 23
            },
            {
                  text: '問佢有邊個 佢話係我諗多',
                  type: 'lyric',
                  time: 25.8
            },
            {
                  text: '就係反反覆覆 令我心意難讀',
                  type: 'lyric',
                  time: 29.3
            },
            {
                  text: '佢真係知我心意先會令我痛哭',
                  type: 'lyric',
                  time: 31.6
            },
            {
                  text: '我鍾意佢？想殺咗佢？',
                  type: 'lyric',
                  time: 34.6
            },
            {
                  text: '聽到自己都叫慘',
                  type: 'lyric',
                  time: 36.7
            },
            {
                  text: '所以寫首歌 先叫even翻',
                  type: 'lyric',
                  time: 38
            },
            {
                  text: '',
                  type: 'blank',
                  time: null
            },
            {
                  text: '[Chorus]',
                  type: 'section',
                  time: null
            },
            {
                  text: '怨恨冇根據',
                  type: 'lyric',
                  time: 41.3
            },
            {
                  text: '當心思思 怕報復心意將會終於必須',
                  type: 'lyric',
                  time: 43.4
            },
            {
                  text: '再黎錫翻佢',
                  type: 'lyric',
                  time: 47.1
            },
            {
                  text: '只因到最後 失意感覺只會因他空虛 oh',
                  type: 'lyric',
                  time: 49.4
            },
            {
                  text: '愛恨很空泛 昨日很崩爛',
                  type: 'lyric',
                  time: 53.1
            },
            {
                  text: '約定即推翻',
                  type: 'lyric',
                  time: 59.5
            }
      ],
      [
            {
                  text: '[Verse 2]',
                  type: 'section',
                  time: null
            },
            {
                  text: '我打咗一堆短訊又馬上想遣散',
                  type: 'lyric',
                  time: 64.7
            },
            {
                  text: '佢做唔到啲嘢又唔係大罪犯',
                  type: 'lyric',
                  time: 67.6
            },
            {
                  text: '我諗起即刻放棄 但我又幾生氣',
                  type: 'lyric',
                  time: 70.6
            },
            {
                  text: '我於是寫翻曬 又馬上刪除翻',
                  type: 'lyric',
                  time: 73.5
            },
            {
                  text: '因為其實佢知 佢唔係得哩一次',
                  type: 'lyric',
                  time: 76.8
            },
            {
                  text: '佢話佢知我心意 講真係個騙子',
                  type: 'lyric',
                  time: 79.4
            },
            {
                  text: '但佢應該知我心意 我唔需要再說明',
                  type: 'lyric',
                  time: 82.1
            },
            {
                  text: '所以我自己嬲自己 唔鍾意請將佢飛！',
                  type: 'lyric',
                  time: 85.3
            },
            {
                  text: '',
                  type: 'blank',
                  time: null
            },
            {
                  text: '[Chorus]',
                  type: 'section',
                  time: null
            },
            {
                  text: '怨恨冇根據',
                  type: 'lyric',
                  time: 88.7
            },
            {
                  text: '當心思思 怕報復心意只會必須',
                  type: 'lyric',
                  time: 90.8
            },
            {
                  text: '再黎錫翻佢',
                  type: 'lyric',
                  time: 94.6
            },
            {
                  text: '只因到最後 失意只會因他空虛 oh',
                  type: 'lyric',
                  time: 97
            },
            {
                  text: '愛恨很空泛 昨日很崩爛',
                  type: 'lyric',
                  time: 100.3
            },
            {
                  text: '約定即推翻',
                  type: 'lyric',
                  time: 107
            },
            {
                  text: '',
                  type: 'blank',
                  time: null
            },
            {
                  text: '約定即推翻',
                  type: 'lyric',
                  time: 112.1
            }
      ],
      [
            {
                  text: '[Bridge]',
                  type: 'section',
                  time: null
            },
            {
                  text: '無法看得見',
                  type: 'lyric',
                  time: 118
            },
            {
                  text: '誰人也不可以',
                  type: 'lyric',
                  time: 120.6
            },
            {
                  text: '能和佢笑三秒',
                  type: 'lyric',
                  time: 123.7
            },
            {
                  text: '然而我又要做聖物',
                  type: 'lyric',
                  time: 126.4
            },
            {
                  text: '完美活天使',
                  type: 'lyric',
                  time: 130
            },
            {
                  text: '忘記是受罰',
                  type: 'lyric',
                  time: 132.5
            },
            {
                  text: '嘗試斷界限',
                  type: 'lyric',
                  time: 135.6
            },
            {
                  text: '但卻話佢係漢奸',
                  type: 'lyric',
                  time: 138.8
            },
            {
                  text: '',
                  type: 'blank',
                  time: null
            },
            {
                  text: '所以可不以',
                  type: 'lyric',
                  time: 141.2
            },
            {
                  text: '知曉我心意',
                  type: 'lyric',
                  time: 142.9
            },
            {
                  text: '可否不需要',
                  type: 'lyric',
                  time: 144.3
            },
            {
                  text: '失去變空虛',
                  type: 'lyric',
                  time: 145.8
            },
            {
                  text: '我怕愛會死',
                  type: 'lyric',
                  time: 147.4
            },
            {
                  text: '你不知死因',
                  type: 'lyric',
                  time: 148.8
            },
            {
                  text: '怪你太過分',
                  type: 'lyric',
                  time: 150.4
            },
            {
                  text: '然而未對等',
                  type: 'lyric',
                  time: 151.9
            },
            {
                  text: '',
                  type: 'blank',
                  time: null
            },
            {
                  text: '[Chorus]',
                  type: 'section',
                  time: null
            },
            {
                  text: '怨恨冇根據',
                  type: 'lyric',
                  time: 154
            },
            {
                  text: '當心思思 怕報復心意只會必須',
                  type: 'lyric',
                  time: 156.1
            },
            {
                  text: '再黎錫翻佢',
                  type: 'lyric',
                  time: 159.8
            },
            {
                  text: '只因到最後 失意只會因他空虛 oh',
                  type: 'lyric',
                  time: 162.2
            },
            {
                  text: '愛恨很空泛 昨日很崩爛',
                  type: 'lyric',
                  time: 165.7
            },
            {
                  text: '約定即推翻',
                  type: 'lyric',
                  time: 172.4
            },
            {
                  text: '',
                  type: 'blank',
                  time: null
            },
            {
                  text: '約定即推翻',
                  type: 'lyric',
                  time: 177.5
            },
            {
                  text: '',
                  type: 'blank',
                  time: null
            },
            {
                  text: '[Outro]',
                  type: 'section',
                  time: null
            },
            {
                  text: '我真係太鍾意佢 (You know what I mean)',
                  type: 'lyric',
                  time: 196.3
            },
            {
              text: '鍾意到自己都死埋',
              type: 'lyric',
              time: 199.3
            },
            {
                  text: '（go girl you better get him back）',
                  type: 'lyric',
                  time: 202
            }
      ]
]
  },

  {
    id: 'housetour',
    title: "參觀",
    originalTitle: "House Tour",
    originalArtist: "",
    youtubeId: 'rt_z10mb_k0',
    pages: [
      [
            {
                  text: '[Intro]',
                  type: 'section',
                  time: null
            },
            {
                  text: '（打俾邊個）',
                  type: 'lyric',
                  time: 4.9
            },
            {
                  text: '',
                  type: 'blank',
                  time: null
            },
            {
                  text: '[Verse 1]',
                  type: 'section',
                  time: null
            },
            {
                  text: '手機要此刻冇電 唉',
                  type: 'lyric',
                  time: 21.9
            },
            {
                  text: '不想急折返',
                  type: 'lyric',
                  time: 24
            },
            {
                  text: '可否去你家中借電',
                  type: 'lyric',
                  time: 26.3
            },
            {
                  text: '時 間將節省',
                  type: 'lyric',
                  time: 28.1
            },
            {
                  text: '想將你拉出放裏面',
                  type: 'lyric',
                  time: 30.7
            },
            {
                  text: '可否給我擺',
                  type: 'lyric',
                  time: 32.4
            },
            {
                  text: '（講差電咋嘛！',
                  type: 'lyric',
                  time: 35
            },
            {
                  text: '你咪諗多啦）',
                  type: 'lyric',
                  time: 35.9
            },
            {
                  text: '',
                  type: 'blank',
                  time: null
            },
            {
                  text: '[Pre-Chorus]',
                  type: 'section',
                  time: null
            },
            {
                  text: '別大力怕他撕破',
                  type: 'lyric',
                  time: 37.2
            },
            {
                  text: '要於低處看看他 可否幫我',
                  type: 'lyric',
                  time: 39.7
            },
            {
                  text: '仲未試過用這款我怕揾錯',
                  type: 'lyric',
                  time: 43.7
            },
            {
                  text: '我想將你這包裝拆解',
                  type: 'lyric',
                  time: 48.1
            },
            {
                  text: '(我可保管你是聽錯)',
                  type: 'lyric',
                  time: 51.8
            }
      ],
      [
            {
                  text: '[Verse 2]',
                  type: 'section',
                  time: null
            },
            {
                  text: '床前思想',
                  type: 'lyric',
                  time: 62.8
            },
            {
                  text: '彎月（不遠）十九年',
                  type: 'lyric',
                  time: 64.3
            },
            {
                  text: '長粗都飛雪（飄雪）',
                  type: 'lyric',
                  time: 67
            },
            {
                  text: '再深入',
                  type: 'lyric',
                  time: 70.1
            },
            {
                  text: '一次 七次 多次',
                  type: 'lyric',
                  time: 71.4
            },
            {
                  text: '右手當作有恩典',
                  type: 'lyric',
                  time: 74.8
            },
            {
                  text: '（李白都俾like）',
                  type: 'lyric',
                  time: 76.8
            },
            {
                  text: '',
                  type: 'blank',
                  time: null
            },
            {
                  text: '[Pre-Chorus]',
                  type: 'section',
                  time: null
            },
            {
                  text: '現在插會否穩妥',
                  type: 'lyric',
                  time: 78.3
            },
            {
                  text: '要於低處看看他 可否幫我',
                  type: 'lyric',
                  time: 79.9
            },
            {
                  text: '仲未試過用這款我怕揾錯',
                  type: 'lyric',
                  time: 84.4
            },
            {
                  text: '我想將你這包裝拆解',
                  type: 'lyric',
                  time: 88.6
            },
            {
                  text: '(我可保管你是聽錯)',
                  type: 'lyric',
                  time: 92.4
            },
            {
                  text: '',
                  type: 'blank',
                  time: null
            },
            {
                  text: '[Chorus]',
                  type: 'section',
                  time: null
            },
            {
                  text: '穿破',
                  type: 'lyric',
                  time: 95.1
            },
            {
                  text: '此番溫熱插太多 擔心失火',
                  type: 'lyric',
                  time: 96.7
            },
            {
                  text: '盡量慾望控制會最穩妥',
                  type: 'lyric',
                  time: 100.8
            },
            {
                  text: '此刻face id心鎖拆解',
                  type: 'lyric',
                  time: 104.9
            },
            {
                  text: 'baby三聲即衝破',
                  type: 'lyric',
                  time: 108.8
            }
      ],
      [
            {
                  text: '[Bridge]',
                  type: 'section',
                  time: null
            },
            {
                  text: 'Come on babe',
                  type: 'lyric',
                  time: 119
            },
            {
                  text: '',
                  type: 'blank',
                  time: null
            },
            {
                  text: 'Oh baby if you come inside.',
                  type: 'lyric',
                  time: 123.7
            },
            {
                  text: '',
                  type: 'blank',
                  time: null
            },
            {
                  text: '[Outro]',
                  type: 'section',
                  time: null
            },
            {
                  text: '只需捉緊拳頭即穩妥',
                  type: 'lyric',
                  time: 127.9
            },
            {
                  text: '佢天生線長那用摸',
                  type: 'lyric',
                  time: 132.2
            },
            {
                  text: '用他充充電來解我悶',
                  type: 'lyric',
                  time: 136.2
            },
            {
                  text: '溢出 就來溫鄉倦',
                  type: 'lyric',
                  time: 140.3
            }
      ]
]
  },

  {
    id: 'manchild',
    title: "男人（難忍）",
    originalTitle: "Manchild",
    originalArtist: "Sabrina Carpenter",
    youtubeId: 'pAVFSp5zBqc',
    pages: [
      [
            {
                  text: '[Verse 1]',
                  type: 'section',
                  time: null
            },
            {
                  text: '年輕 小生氣味誘惑紅杏',
                  type: 'lyric',
                  time: 10.4
            },
            {
                  text: '男人思想簡單 腦力亦要精緻',
                  type: 'lyric',
                  time: 14.5
            },
            {
                  text: '年紀輕 怎等於信任過份容易',
                  type: 'lyric',
                  time: 18.3
            },
            {
                  text: '呼喊你作正太 幼稚未似你02',
                  type: 'lyric',
                  time: 22.5
            },
            {
                  text: '',
                  type: 'blank',
                  time: null
            },
            {
                  text: '[Pre-Chorus]',
                  type: 'section',
                  time: null
            },
            {
                  text: '出世',
                  type: 'lyric',
                  time: 28.1
            },
            {
                  text: '',
                  type: 'blank',
                  time: null
            },
            {
                  text: '抑或是',
                  type: 'lyric',
                  time: 29.8
            },
            {
                  text: '細',
                  type: 'lyric',
                  time: 31.9
            },
            {
                  text: '',
                  type: 'blank',
                  time: null
            },
            {
                  text: '小弟弟',
                  type: 'lyric',
                  time: 33.8
            },
            {
                  text: '複製',
                  type: 'lyric',
                  time: 35.9
            },
            {
                  text: '',
                  type: 'blank',
                  time: null
            },
            {
                  text: '我所以呼叫你',
                  type: 'lyric',
                  time: 38.2
            },
            {
                  text: '（聽實啦）',
                  type: 'lyric',
                  time: 39.9
            },
            {
                  text: '',
                  type: 'blank',
                  time: null
            },
            {
                  text: '[Chorus]',
                  type: 'section',
                  time: null
            },
            {
                  text: '男人',
                  type: 'lyric',
                  time: 41.5
            },
            {
                  text: '這刻歡喜你而下秒顛覆',
                  type: 'lyric',
                  time: 45.3
            },
            {
                  text: '流行曲',
                  type: 'lyric',
                  time: 49.4
            },
            {
                  text: '也都不及這人自我反覆',
                  type: 'lyric',
                  time: 53.3
            },
            {
                  text: '',
                  type: 'blank',
                  time: null
            },
            {
                  text: '全部抱怨十句',
                  type: 'lyric',
                  time: 57.5
            },
            {
                  text: '從未理性面對',
                  type: 'lyric',
                  time: 61.1
            },
            {
                  text: '',
                  type: 'blank',
                  time: null
            },
            {
                  text: '難忍',
                  type: 'lyric',
                  time: 65
            },
            {
                  text: '這刻歡喜你而下秒',
                  type: 'lyric',
                  time: 68.8
            },
            {
                  text: '不講了 來贈你此曲',
                  type: 'lyric',
                  time: 71.2
            }
      ],
      [
            {
                  text: '[Verse 2]',
                  type: 'section',
                  time: null
            },
            {
                  text: '身體小 幼長重要 而他智商有點縹緲',
                  type: 'lyric',
                  time: 81.3
            },
            {
                  text: '我皆清楚亦全負上',
                  type: 'lyric',
                  time: 88.7
            },
            {
                  text: '便宜母親要色相',
                  type: 'lyric',
                  time: 92.5
            },
            {
                  text: '',
                  type: 'blank',
                  time: null
            },
            {
                  text: '[Chorus]',
                  type: 'section',
                  time: null
            },
            {
                  text: '男人',
                  type: 'lyric',
                  time: 96.5
            },
            {
                  text: '這刻歡喜你而下秒顛覆',
                  type: 'lyric',
                  time: 100.1
            },
            {
                  text: '流行曲',
                  type: 'lyric',
                  time: 103.9
            },
            {
                  text: '也都不及這人自我反覆',
                  type: 'lyric',
                  time: 107.7
            },
            {
                  text: '',
                  type: 'blank',
                  time: null
            },
            {
                  text: '全部抱怨十句',
                  type: 'lyric',
                  time: 111.9
            },
            {
                  text: '從未理性面對',
                  type: 'lyric',
                  time: 115.2
            },
            {
                  text: '',
                  type: 'blank',
                  time: null
            },
            {
                  text: '難忍',
                  type: 'lyric',
                  time: 119.3
            },
            {
                  text: '這刻歡喜你而下秒',
                  type: 'lyric',
                  time: 123.4
            },
            {
                  text: '不講了 來贈你此曲',
                  type: 'lyric',
                  time: 125.8
            },
            {
                  text: '',
                  type: 'blank',
                  time: null
            },
            {
                  text: '[Bridge]',
                  type: 'section',
                  time: null
            },
            {
                  text: '曾話過像愛 自己裝慷慨',
                  type: 'lyric',
                  time: 127.9
            },
            {
                  text: '人淚腺懈怠 陋性佢未改',
                  type: 'lyric',
                  time: 131.3
            },
            {
                  text: '前列腺負載 自尊心可愛',
                  type: 'lyric',
                  time: 135.9
            },
            {
                  text: '一秒',
                  type: 'lyric',
                  time: 139.2
            },
            {
                  text: '弱小!!',
                  type: 'lyric',
                  time: 141.2
            }
      ],
      [
            {
                  text: '曾話過像愛 自己裝慷慨',
                  type: 'lyric',
                  time: 143.1
            },
            {
                  text: '唔服氣又再 就當我活該',
                  type: 'lyric',
                  time: 146.8
            },
            {
                  text: '人淚腺懈怠 用makeup掩蓋',
                  type: 'lyric',
                  time: 152
            },
            {
                  text: '代價？',
                  type: 'lyric',
                  time: 154.7
            },
            {
                  text: '待嫁！',
                  type: 'lyric',
                  time: 157.7
            },
            {
                  text: '',
                  type: 'blank',
                  time: null
            },
            {
                  text: '[Chorus]',
                  type: 'section',
                  time: null
            },
            {
                  text: '男人',
                  type: 'lyric',
                  time: 158.9
            },
            {
                  text: '這刻歡喜你而下秒顛覆',
                  type: 'lyric',
                  time: 162.5
            },
            {
                  text: '流行曲',
                  type: 'lyric',
                  time: 166.5
            },
            {
                  text: '也都不及這人自我反覆',
                  type: 'lyric',
                  time: 170.2
            },
            {
                  text: '',
                  type: 'blank',
                  time: null
            },
            {
                  text: '[Outro]',
                  type: 'section',
                  time: null
            },
            {
                  text: '曾話過像愛 自己裝慷慨',
                  type: 'lyric',
                  time: 174.7
            },
            {
                  text: '唔服氣又再 就當我活該',
                  type: 'lyric',
                  time: 178.1
            },
            {
                  text: '人淚腺懈怠 又反覆的愛',
                  type: 'lyric',
                  time: 182
            },
            {
                  text: 'would愛',
                  type: 'lyric',
                  time: 186.5
            },
            {
                  text: '活該！',
                  type: 'lyric',
                  time: 188.9
            }
      ]
]
  },

  {
    id: 'tox',
    title: "To X",
    originalTitle: "To. X",
    originalArtist: "TAEYEON",
    youtubeId: 'UTOxChG5Ucc',
    pages: [
      [
            {
                  text: '[Verse 1]',
                  type: 'section',
                  time: null
            },
            {
                  text: '闊別每日進睡前',
                  type: 'lyric',
                  time: 10.5
            },
            {
                  text: '與你暢談',
                  type: 'lyric',
                  time: 12.3
            },
            {
                  text: '心裏細說覺得快樂',
                  type: 'lyric',
                  time: 13.5
            },
            {
                  text: '',
                  type: 'blank',
                  time: null
            },
            {
                  text: '冷靜告別 那二人',
                  type: 'lyric',
                  time: 15.6
            },
            {
                  text: '說著要獨過',
                  type: 'lyric',
                  time: 17.3
            },
            {
                  text: '往日跳脫那顆心痛麼？',
                  type: 'lyric',
                  time: 18.2
            },
            {
                  text: '',
                  type: 'blank',
                  time: null
            },
            {
                  text: '[Pre-Chorus]',
                  type: 'section',
                  time: null
            },
            {
                  text: '日記內剖說心事',
                  type: 'lyric',
                  time: 20.3
            },
            {
                  text: '現今很諷刺',
                  type: 'lyric',
                  time: 22.6
            },
            {
                  text: '位置回倒 覺很累 是否感心醉 oh oh',
                  type: 'lyric',
                  time: 25.1
            },
            {
                  text: '',
                  type: 'blank',
                  time: null
            },
            {
                  text: '[Chorus]',
                  type: 'section',
                  time: null
            },
            {
                  text: '我沒法等',
                  type: 'lyric',
                  time: 30.3
            },
            {
                  text: '態度誘人',
                  type: 'lyric',
                  time: 31.5
            },
            {
                  text: '也沒法掩那日那傷疤',
                  type: 'lyric',
                  time: 32.7
            },
            {
                  text: '我為了等',
                  type: 'lyric',
                  time: 35.1
            },
            {
                  text: '心裏那人',
                  type: 'lyric',
                  time: 36.4
            },
            {
                  text: '原來自己軀殼早已分離',
                  type: 'lyric',
                  time: 37.9
            },
            {
                  text: '',
                  type: 'blank',
                  time: null
            },
            {
                  text: '對我痛哭',
                  type: 'lyric',
                  time: 40.1
            },
            {
                  text: '不會折服',
                  type: 'lyric',
                  time: 41.4
            },
            {
                  text: '往日發生只是我天真',
                  type: 'lyric',
                  time: 42.6
            },
            {
                  text: '我沒法等',
                  type: 'lyric',
                  time: 45.1
            },
            {
                  text: '拒絕慰問',
                  type: 'lyric',
                  time: 46.3
            },
            {
                  text: 'gonna block you 不再忍 to x',
                  type: 'lyric',
                  time: 47.9
            }
      ],
      [
            {
                  text: '[Verse 2]',
                  type: 'section',
                  time: null
            },
            {
                  text: '你今天覺得好嗎',
                  type: 'lyric',
                  time: 59.3
            },
            {
                  text: '怒火也不敷衍',
                  type: 'lyric',
                  time: 61.4
            },
            {
                  text: '讓辛酸說出嘴裡',
                  type: 'lyric',
                  time: 64.3
            },
            {
                  text: '來拋開你心虛',
                  type: 'lyric',
                  time: 66.4
            },
            {
                  text: '另一端接收心裡',
                  type: 'lyric',
                  time: 68.9
            },
            {
                  text: '問我怎麼不聽取',
                  type: 'lyric',
                  time: 70.9
            },
            {
                  text: '說心畢竟很粉碎',
                  type: 'lyric',
                  time: 73.8
            },
            {
                  text: '問我怎麼唏噓',
                  type: 'lyric',
                  time: 76.2
            },
            {
                  text: '',
                  type: 'blank',
                  time: null
            },
            {
                  text: '[Pre-Chorus]',
                  type: 'section',
                  time: null
            },
            {
                  text: '別再為她獻心吧',
                  type: 'lyric',
                  time: 79.6
            },
            {
                  text: '大家都不牽掛',
                  type: 'lyric',
                  time: 82
            },
            {
                  text: 'every day every night',
                  type: 'lyric',
                  time: 84.7
            },
            {
                  text: '用心喜歡一個 oh oh',
                  type: 'lyric',
                  time: 87
            },
            {
                  text: '',
                  type: 'blank',
                  time: null
            },
            {
                  text: '[Chorus]',
                  type: 'section',
                  time: null
            },
            {
                  text: '我沒法等',
                  type: 'lyric',
                  time: 89.7
            },
            {
                  text: '態度誘人',
                  type: 'lyric',
                  time: 91.3
            },
            {
                  text: '也沒法掩那日那傷疤',
                  type: 'lyric',
                  time: 92.7
            },
            {
                  text: '我為了等',
                  type: 'lyric',
                  time: 94.6
            },
            {
                  text: '心裏那人',
                  type: 'lyric',
                  time: 95.9
            },
            {
                  text: '原來自己軀殼早已分離',
                  type: 'lyric',
                  time: 97.7
            },
            {
                  text: '',
                  type: 'blank',
                  time: null
            },
            {
                  text: '對我痛哭',
                  type: 'lyric',
                  time: 99.6
            },
            {
                  text: '不會折服',
                  type: 'lyric',
                  time: 100.8
            },
            {
                  text: '往日發生只是我天真',
                  type: 'lyric',
                  time: 102
            },
            {
                  text: '我沒法等',
                  type: 'lyric',
                  time: 104.5
            },
            {
                  text: '拒絕慰問',
                  type: 'lyric',
                  time: 105.8
            },
            {
                  text: 'gonna block you 不再忍 to x',
                  type: 'lyric',
                  time: 107.5
            }
      ],
      [
            {
                  text: '[Bridge]',
                  type: 'section',
                  time: null
            },
            {
                  text: '放棄舊愛戀',
                  type: 'lyric',
                  time: 130
            },
            {
                  text: '成全他許願',
                  type: 'lyric',
                  time: 132.5
            },
            {
                  text: '',
                  type: 'blank',
                  time: null
            },
            {
                  text: '[Chorus]',
                  type: 'section',
                  time: null
            },
            {
                  text: '我沒法等',
                  type: 'lyric',
                  time: 139.3
            },
            {
                  text: '態度誘人',
                  type: 'lyric',
                  time: 140.4
            },
            {
                  text: '也沒法掩那日那傷疤',
                  type: 'lyric',
                  time: 141.6
            },
            {
                  text: '我為了等',
                  type: 'lyric',
                  time: 144
            },
            {
                  text: '心裏那人',
                  type: 'lyric',
                  time: 145.3
            },
            {
                  text: '原來自己軀殼早已分離',
                  type: 'lyric',
                  time: 146.8
            },
            {
                  text: '',
                  type: 'blank',
                  time: null
            },
            {
                  text: '對我痛哭',
                  type: 'lyric',
                  time: 149
            },
            {
                  text: '不會折服',
                  type: 'lyric',
                  time: 150.3
            },
            {
                  text: '往日發生只是我天真',
                  type: 'lyric',
                  time: 151.5
            },
            {
                  text: '我沒法等',
                  type: 'lyric',
                  time: 154
            },
            {
                  text: '拒絕慰問',
                  type: 'lyric',
                  time: 155.1
            },
            {
                  text: 'gonna block you 不再忍 to x',
                  type: 'lyric',
                  time: 156.8
            }
      ]
]
  },

  {
    id: '15minutes',
    title: "15 Minutes",
    originalTitle: "15 Minutes",
    originalArtist: "",
    youtubeId: 'EfhemiNrg4E',
    pages: [
      [
            {
                  text: '[Verse 1]',
                  type: 'section',
                  time: null
            },
            {
                  text: '聽到鐘聲長鳴',
                  type: 'lyric',
                  time: 5.9
            },
            {
                  text: '故事又到終點到句點',
                  type: 'lyric',
                  time: 9.6
            },
            {
                  text: '幻變要指點化名',
                  type: 'lyric',
                  time: 13.5
            },
            {
                  text: '有如戴上冠冕變泡影',
                  type: 'lyric',
                  time: 16.8
            },
            {
                  text: '南瓜車失蹤找背景',
                  type: 'lyric',
                  time: 21.9
            },
            {
                  text: '十二點酒館裡辭聘',
                  type: 'lyric',
                  time: 25.4
            },
            {
                  text: '帶上靴 想找我盡快',
                  type: 'lyric',
                  time: 29
            },
            {
                  text: '',
                  type: 'blank',
                  time: null
            },
            {
                  text: '[Chorus]',
                  type: 'section',
                  time: null
            },
            {
                  text: '只需三分鐘都可將他應徵',
                  type: 'lyric',
                  time: 34.9
            },
            {
                  text: '沒第二別個 活像我有美色',
                  type: 'lyric',
                  time: 38.4
            },
            {
                  text: '出生很謙虛 即將使你碰壁',
                  type: 'lyric',
                  time: 42.1
            },
            {
                  text: 'You, you know I',
                  type: 'lyric',
                  time: 45.8
            },
            {
                  text: '只需三分鐘 他都給我戒指',
                  type: 'lyric',
                  time: 49.5
            },
            {
                  text: '事實上若有 兩秒也會進逼',
                  type: 'lyric',
                  time: 53.1
            },
            {
                  text: '不需身分都 得到他的愛惜',
                  type: 'lyric',
                  time: 56.6
            },
            {
                  text: 'You, you know I',
                  type: 'lyric',
                  time: 60.2
            },
            {
                  text: '',
                  type: 'blank',
                  time: null
            },
            {
                  text: 'can',
                  type: 'lyric',
                  time: 64.6
            }
      ],
      [
            {
                  text: '[Verse 2]',
                  type: 'section',
                  time: null
            },
            {
                  text: '去來自由心思浮游',
                  type: 'lyric',
                  time: 66.5
            },
            {
                  text: '昨日若見君主試抱緊',
                  type: 'lyric',
                  time: 69.6
            },
            {
                  text: '用過半億表出心意',
                  type: 'lyric',
                  time: 73.6
            },
            {
                  text: '轉個身當作他發燒發瘟',
                  type: 'lyric',
                  time: 76.6
            },
            {
                  text: '從來瀟灑不甘此生坐穩',
                  type: 'lyric',
                  time: 81.8
            },
            {
                  text: '亦並非snow white要等你來解',
                  type: 'lyric',
                  time: 85.4
            },
            {
                  text: '無皇宮都可冠冕自戴',
                  type: 'lyric',
                  time: 89.1
            },
            {
                  text: '',
                  type: 'blank',
                  time: null
            },
            {
                  text: '[Chorus]',
                  type: 'section',
                  time: null
            },
            {
                  text: '只需三分鐘都可將他應徵',
                  type: 'lyric',
                  time: 94.8
            },
            {
                  text: '沒第二別個 活像我有美色',
                  type: 'lyric',
                  time: 98.4
            },
            {
                  text: '出生很謙虛 即將使你碰壁',
                  type: 'lyric',
                  time: 102
            },
            {
                  text: 'You, you know I',
                  type: 'lyric',
                  time: 105.8
            },
            {
                  text: '只需三分鐘 認清這漢子',
                  type: 'lyric',
                  time: 109.4
            },
            {
                  text: '辨別著實話 辨認著你意思',
                  type: 'lyric',
                  time: 113.1
            },
            {
                  text: '只想找開心 一哭泣會瞬即',
                  type: 'lyric',
                  time: 116.6
            },
            {
                  text: 'You, you know I',
                  type: 'lyric',
                  time: 120.3
            },
            {
                  text: '',
                  type: 'blank',
                  time: null
            },
            {
                  text: 'can',
                  type: 'lyric',
                  time: 124.7
            }
      ],
      [
            {
                  text: '[Bridge]',
                  type: 'section',
                  time: null
            },
            {
                  text: '試過 半生交托',
                  type: 'lyric',
                  time: 140.9
            },
            {
                  text: '到最尾意識很錯',
                  type: 'lyric',
                  time: 144.5
            },
            {
                  text: '當我笨 上一堆課',
                  type: 'lyric',
                  time: 148.2
            },
            {
                  text: '轉個運 感激這個',
                  type: 'lyric',
                  time: 151.9
            },
            {
                  text: '',
                  type: 'blank',
                  time: null
            },
            {
                  text: '上過 至深一課',
                  type: 'lyric',
                  time: 155.5
            },
            {
                  text: '到最尾意識很錯',
                  type: 'lyric',
                  time: 159.2
            },
            {
                  text: '當我笨 上一堆課',
                  type: 'lyric',
                  time: 162.8
            },
            {
                  text: '轉個運 揾新一個',
                  type: 'lyric',
                  time: 166.3
            }
      ]
]
  },







];

/** Flat list of all lines with their page/song indices — used by karaoke engine */
export function buildLineIndex(song) {
  const lines = [];
  song.pages.forEach((page, pageIdx) => {
    page.forEach((line, lineIdx) => {
      if (line.time !== null) {
        lines.push({ ...line, pageIdx, lineIdx });
      }
    });
  });
  return lines.sort((a, b) => a.time - b.time);
}
