/* Michael 写作课 · 课后作业提交系统
   数据来源：Michael写作 class 1–8「课后助教安排」原始文档，逐条转录。
   本文件只存放内容，不含任何评分或批改逻辑。 */

window.COURSE = {
  title: 'Michael 写作课',
  subtitle: '课后作业与模考提交系统',
  note: '本系统只负责「引导 → 收集 → 确认 → 汇总」。不评分、不批改、不修改你的答案。',
  lessons: []
};

/* ---------------------------------- Class 1 ---------------------------------- */
window.COURSE.lessons.push({
  id: 1,
  name: 'Class 1',
  theme: '四项评分标准 · 模板陷阱 · 镜子法',
  themeEn: 'The Four Criteria · Template Traps · The Mirror Method',
  mock: {
    title: '写作模考',
    format: '助教扮演雅思考官，对每位学生进行一篇完整的 Task 2 大作文限时写作（建议议论文 Argumentative），其余时间用于即时反馈。要求全程手写、限时、不查词典。',
    steps: [
      { title: 'Step 1：考试说明与计时开始', quote: 'Good morning. This is the Academic Writing test. You have 40 minutes to complete Task 2. You should write at least 250 words. No dictionary, no phone. Your time starts now.' },
      { title: 'Step 2：Task 2 大作文', text: '从以下剑桥雅思官方真题中任选 1 道题（与 Class 1 PPT 话题方向一致：交通／政府开支／城市发展）。' },
      { title: 'Step 3：即时反馈（约 10–15 分钟）', text: '助教给出即时反馈，并带学生进行「镜子法（Mirror Method）」的第一步：把学生段落与 Band 7 范文段落并排对照，标出差距（childish words / wrong collocation / broken logic / Chinese word order）。' }
    ],
    prompts: [
      { label: '题目 A', source: 'Cambridge IELTS 真题（交通与政府开支）', text: 'Some people think that governments should spend money on public transport rather than building new roads. To what extent do you agree or disagree?' },
      { label: '题目 B', source: 'Cambridge IELTS 14, Test 4（备选社会发展类）', text: 'In some countries, many more people are choosing to live alone nowadays than in the past. Do you think this is a positive or negative development?' },
      { label: '题目 C', source: 'Cambridge IELTS 真题（城市发展）', text: 'Traffic and housing problems in major cities could be solved by moving large companies, factories and their employees to the countryside. To what extent do you agree or disagree?' }
    ],
    rules: ['限时 40 分钟', '字数 ≥ 250 词', '全程手写', '不查词典、不用手机'],
    focusTitle: 'Class 1 重点观察（对应 PPT 四项标准）',
    focus: [
      { k: '（1）任务回应 Task Response', v: '是否明确表态、全面回应题目，而不是写跑题的泛泛而谈？是否有具体论据而非空话填充？' },
      { k: '（2）逻辑与连贯 Coherence', v: '每段是否只有一个中心句？是否是「Claim → Reason → Example → Result」的阶梯逻辑，而不是机械堆砌 Furthermore / Moreover / Additionally？' },
      { k: '（3）模板陷阱与大词误用 Lexical Resource', v: '是否使用了背诵的模板开头（如 In today’s rapidly modernising world…）或生硬大词（如 ameliorate / multifarious）？是否使用了自然搭配（如 reduce traffic congestion）？' }
    ]
  },
  dictation: {
    title: '单词听写',
    note: '助教朗读英文单词／词组，学生写出英文 + 中文。',
    total: '总计 50 词',
    rounds: [
      { name: 'Round 1：城市发展 & 交通', max: 15, items: [['urbanization','城市化'],['infrastructure','基础设施'],['public transport system','公共交通系统'],['traffic congestion','交通拥堵'],['gridlock','(交通)瘫痪／堵死'],['pedestrian','行人'],['relocate','搬迁'],['high-rise buildings','高楼'],['skyscraper','摩天大楼'],['impede','阻碍'],['enhance the cityscape','美化城市景观'],['operating costs','运营成本'],['augment efficiency','提高效率'],['the disparity between the city and the countryside','城乡差距'],['sustainable development','可持续发展']] },
      { name: 'Round 2：环境', max: 15, items: [['ecological balance','生态平衡'],['environmentally-friendly','对环境无害的'],['conserve','节约使用'],['preserve','保护'],['greenhouse effect','温室效应'],['global warming','全球变暖'],['pollute','污染'],['contaminate','污染'],['renewable resources','可再生资源'],['non-renewable resources','不可再生资源'],['deplete','消耗／耗尽'],['raise public awareness','增强公众意识'],['wreak havoc on','破坏'],['fossil fuels','化石燃料'],['severe','严重的']] },
      { name: 'Round 3：政府 & 发展', max: 15, items: [['authorities','当局／政府'],['regulate','规范／管理'],['implement','实施'],['allocate money to','为……拨款'],['budget','预算'],['government spending','政府开支'],['curtail','削减'],['priority','当务之急'],['give priority to','把……当成当务之急'],['poverty alleviation','扶贫'],['employment opportunity','就业机会'],['affluent','富裕的'],['impoverished','贫穷的'],['a democratic and progressive government','民主开明的政府'],['short-sighted policy','缺乏远见的政策']] },
      { name: 'Round 4（加分轮）：高分学术动词 & 搭配', max: 5, items: [['cultivate','培养'],['foster','促进／培养'],['facilitate','促进／使便利'],['mitigate','减轻／缓解'],['a two-edged sword','双刃剑']] }
    ]
  },
  homework: [
    { n: 1, title: '搭配收集练习（Collocation Harvest）',
      brief: '按照 Class 1 学到的「每节课收集 8 个搭配」原则，从今天的 Band 7 范文段落和听写词表中，整理你的自然搭配库。',
      bullets: ['写出 8 个你能立刻用对的自然搭配（如 prioritise investment in / reduce traffic congestion / allocate money to）', '用其中至少 3 个搭配各造一个完整句子'],
      submit: '搭配库列表 + 3 个完整句子',
      fields: [
        { key: 'coll', kind: 'lines', label: '我的搭配库（8 个）', count: 8, placeholder: '例：reduce traffic congestion' },
        { key: 'sent', kind: 'paras', label: '完整句子（至少 3 句）', count: 3, rows: 2, placeholder: '用上面其中一个搭配造一个完整句子' }
      ] },
    { n: 2, title: '模板陷阱改写练习',
      brief: 'Class 1 中学到了「模板开头会被考官识破并扣分」。请把下面这个典型模板开头，改写成直接回应题目的自然句子（题目：政府是否应优先投资公共交通）。',
      quote: 'In today’s rapidly modernising world, this is a highly controversial issue that has attracted a great deal of attention from all walks of life…',
      submit: '1 个直接、自然、明确表态的改写开头（2–3 句话）',
      fields: [ { key: 'rewrite', kind: 'para', label: '我的改写开头（2–3 句）', rows: 4 } ] },
    { n: 3, title: '镜子法对照仿写（Mirror Method）',
      brief: '用 Class 1 的五步法完成一次对照仿写：读范文 → 合上 → 用自己的英语重写 → 并排对照 → 标出差距。',
      quote: '范文句（Band 7）：Governments that prioritise public transport investment tend to achieve lower urban congestion levels and reduced carbon output.',
      submit: '你的重写版本 + 至少 3 处差距标注',
      fields: [
        { key: 'mine', kind: 'para', label: '我的重写版本', rows: 3 },
        { key: 'gap', kind: 'lines', label: '差距标注（至少 3 处）', count: 3, placeholder: '例：traffic jam problem → urban congestion' }
      ] },
    { n: 4, title: '词汇造句练习',
      brief: '从今天听写的 50 个词中选 5 个不熟悉的词／词组（建议至少包含 2 个搭配类词组，如 give priority to / wreak havoc on），各造一个与雅思写作话题相关的完整句子。',
      note: '要求有上下文语境，体现自然搭配而非生硬大词。',
      submit: '5 个词 + 5 个句子',
      fields: [ { key: 'voc', kind: 'pairs', label: '词汇造句', count: 5, aLabel: '词／词组', bLabel: '句子', aPlaceholder: 'give priority to', bPlaceholder: '完整句子，有上下文' } ] }
  ]
});

/* ---------------------------------- Class 2 ---------------------------------- */
window.COURSE.lessons.push({
  id: 2,
  name: 'Class 2',
  theme: '审题四步 · 限定词 · 题型决定结构',
  themeEn: 'Four-Step Analysis · Limiters · Type Decides Structure',
  mock: null,
  mockNote: '本次课后安排中没有写作模考环节，直接进入单词听写与四项课后作业。',
  dictation: {
    title: '单词听写',
    note: '助教朗读英文单词／词组，学生写出英文 + 中文。',
    total: '总计 50 词',
    rounds: [
      { name: 'Round 1：教育', max: 15, items: [['cultivate aptitude','培养(先天)学习能力'],['impart knowledge','传授知识'],['instill high moral values','灌输高尚价值观'],['employable skills','就业能力'],['vocational education','职业教育'],['tertiary-level education','高等(大学)教育'],['curriculum','(各科)总课程'],['extra-curricular activities','课外活动'],['think critically','辩证思考'],['learn things by rote','死记硬背'],['well-rounded','全面发展的'],['academic experience','学术经历'],['stifle creativity','扼杀创造力'],['peer pressure','同辈压力'],['adaptability','适应能力']] },
      { name: 'Round 2：媒体 & 科技', max: 15, items: [['the print media','印刷媒体'],['the electronic media','电子媒体'],['ubiquitous','无处不在的'],['misleading','有误导性的'],['distorted','被扭曲的'],['objective and balanced','公正客观的'],["violate one's privacy",'侵犯隐私'],['reliable','可信的'],['informative','信息量大的'],['cutting-edge technology','尖端科技'],['information explosion','信息爆炸'],['the proliferation of the Internet','互联网的广泛普及'],['enhance productivity','提高生产效率'],['automation','自动化'],['media hype','媒体炒作']] },
      { name: 'Round 3：犯罪 & 法律', max: 15, items: [['commit a crime','犯罪'],['offender','罪犯'],['law-abiding citizens','守法公民'],['abide by the law','遵守法律'],['violate the law','触犯法律'],['impose stricter penalties','施加更严厉的处罚'],['stringent laws','严格的法律'],['lenient','宽容的／宽松的'],['rehabilitate criminals','改造罪犯'],['be brought to justice','被绳之以法'],['deter','威慑／阻止'],['petty crime','轻罪'],['repeat criminals','惯犯'],['criminal tendency','犯罪倾向'],['resent society','憎恨社会']] },
      { name: 'Round 4（加分轮）：论证 & 审题高分搭配', max: 5, items: [['outweigh','(利)大于(弊)'],['take a clear position','明确表态'],['scrutinise','仔细审查'],['a double-edged sword','双刃剑'],['address the issue','解决／应对问题']] }
    ]
  },
  homework: [
    { n: 1, title: '审题四步专项练习',
      brief: '用 Class 2 学到的「审题四步（主题 → 限定词 → 题型 → 必要内容）」，分析以下 3 道剑桥真题，每题都要写出完整四步并圈出限定词。',
      submit: '3 道题的完整四步分析（注明每题的限定词和题型）',
      fields: [ { key: 'four', kind: 'group', label: '四步分析', items: [
        { heading: '（1）Is it always better for children to grow up in the countryside rather than in a city?' },
        { heading: '（2）Some people think zoos are useful. Others believe they are cruel. Discuss both views and give your opinion.' },
        { heading: '（3）Why do some people choose to live alone? Is this a positive or negative trend?' }
      ], sub: [
        { key: 'topic', kind: 'line', label: 'Step 1 主题 Topic' },
        { key: 'limit', kind: 'line', label: 'Step 2 限定词 Limiters（请圈出）' },
        { key: 'type', kind: 'line', label: 'Step 3 题型 Type' },
        { key: 'req', kind: 'para', label: 'Step 4 必要内容 Required', rows: 2 }
      ] } ] },
    { n: 2, title: '限定词盲区改写练习',
      brief: 'Class 2 中学到了「一个限定词改变整道题」。下面这道题如果忽略限定词 “only in countries where obesity is a national health crisis” 就会严重跑题。',
      quote: 'Fast food restaurants should be taxed at a higher rate than other businesses only in countries where obesity is a national health crisis. Do you agree or disagree?',
      submit: '正确审题说明（1–2 句）+ 紧扣限定词的中心句（1 句）',
      fields: [
        { key: 'read', kind: 'para', label: '（1）正确审题后这道题真正在问什么（1–2 句）', rows: 3 },
        { key: 'ts', kind: 'para', label: '（2）紧扣限定词的中心句（1 句）', rows: 2 }
      ] },
    { n: 3, title: '题型 → 结构对照练习',
      brief: '根据 Class 2 的「题型 → 文章结构」，为下面每道题写出应有的段落结构（不用写全文，只写每段写什么）。',
      submit: '每题的段落结构提纲（注明题型）',
      fields: [ { key: 'struct', kind: 'group', label: '结构提纲', items: [
        { heading: '（1）To what extent do you agree that social media has had a negative impact on young people?' },
        { heading: '（2）Some governments believe the voting age should be lowered to 16. Others disagree. Discuss both views and give your opinion.' }
      ], sub: [
        { key: 'type', kind: 'line', label: '题型' },
        { key: 'outline', kind: 'para', label: '段落结构提纲（每段写什么）', rows: 5 }
      ] } ] },
    { n: 4, title: '词汇造句练习（听写后）',
      brief: '从今天听写的 50 个词中选 5 个不熟悉的词／词组（建议至少包含 2 个搭配类词组，如 impose stricter penalties / take a clear position / advantages outweigh），各造一个与雅思写作话题相关的完整句子。',
      note: '要求有上下文语境，体现自然搭配而非生硬大词。',
      submit: '5 个词 + 5 个句子',
      fields: [ { key: 'voc', kind: 'pairs', label: '词汇造句', count: 5, aLabel: '词／词组', bLabel: '句子', aPlaceholder: 'impose stricter penalties', bPlaceholder: '完整句子，有上下文' } ] }
  ]
});

/* ---------------------------------- Class 3 ---------------------------------- */
window.COURSE.lessons.push({
  id: 3,
  name: 'Class 3',
  theme: 'PEEL 框架 · 首尾段三任务 · 功能化连接词',
  themeEn: 'The PEEL Frame · Three Jobs in Intro & Conclusion · Functional Linking',
  mock: {
    title: '写作模考（60 分钟）',
    format: '助教扮演监考角色，对每位学生进行计时写作模考（Task 2 一篇完整大作文），模考结束后给予简要反馈。',
    steps: [
      { title: 'Step 1：模考说明与准备（5 分钟）' },
      { title: 'Step 2：Task 2 写作（40 分钟）', text: '从以下剑桥雅思官方真题中任选 1 题。' },
      { title: 'Step 3：答案收取与提纲检查（5 分钟）', text: '助教收取学生答卷及提纲，快速浏览。' },
      { title: 'Step 4：即时反馈（10 分钟）', text: '围绕第 3 次课核心内容：PEEL 框架是否完整（Topic Sentence → Explain → Example → Link）；Introduction 三任务（Background → Issue → Thesis）是否齐全；Conclusion 三任务（Restate Thesis → Summarise Two Reasons → Final Thought）是否齐全；连接词是否功能化（因果／对比／让步／举例），而非机械堆砌。' }
    ],
    prompts: [
      { label: '题目 A', source: 'Cambridge IELTS 13, Test 1（社区服务，与 Debate 话题 “Exams are fair?” 结构相似）', text: 'Some people believe that unpaid community service should be a compulsory part of high school programmes. To what extent do you agree or disagree?' },
      { label: '题目 B', source: 'Cambridge IELTS 12, Test 1（大学：就业技能 vs 学术知识，含对比 rather than）', text: 'Some people think that universities should focus on providing students with practical skills for the workplace rather than academic knowledge. To what extent do you agree or disagree with this view?' },
      { label: '题目 C', source: 'Cambridge IELTS 15, Test 1（经济与生活质量，适合练「让步」结构）', text: "Some people think that economic progress is the only way to measure a country's success, while others believe that there are other factors, such as quality of life, that should be considered. Discuss both views and give your own opinion." }
    ],
    rules: ['时间：40 分钟（严格计时）', '字数：至少 250 词', '形式：手写（模拟真实考试）', '禁止使用任何辅助工具', '必须先在草稿纸上完成 PEEL 框架提纲（Background / Issue / Thesis / Body 1 TS + Example / Body 2 TS + Example / Conclusion Final Thought），再开始写作'],
    focusTitle: 'Class 3 重点检查项',
    focus: [
      { k: 'PEEL 框架是否完整', v: '每个主体段是否有明确的 Topic Sentence → Explain → Example → Link？' },
      { k: 'Introduction 三任务', v: 'Background → Issue → Thesis 是否都在？' },
      { k: 'Conclusion 三任务', v: 'Restate Thesis → Summarise Two Reasons → Final Thought 是否都在？' },
      { k: '连接词是否功能化', v: '连接词是否表达了逻辑关系（因果／对比／让步／举例），而非机械堆砌？' }
    ]
  },
  dictation: {
    title: '单词听写',
    note: '助教朗读英文单词／词组，学生写出英文 + 中文。',
    total: '总计 70 词',
    rounds: [
      { name: 'Round 1：Tourism 旅游类高频词', max: 20, items: [['tourist attractions','旅游景点'],['places of interest','景点'],["push back one's horizons",'开阔眼界'],['interact with the locals','与当地人互动'],['promote cultural communication','促进文化交流'],['first-hand experience','亲身体验'],['multi-sensory','多种感官体验的'],['conflict','冲突'],['discord','争端'],['seclude tourists from locals','把游客和当地人隔离'],['commercialise','商业化'],['commodify','商品化'],['second-hand experience','间接体验'],['vicarious experience','间接体验'],['cultural heritage','文化遗产'],['render tourism obsolete','使旅游业过时'],['tourist spots','旅游景点'],["expand one's vision",'开阔视野'],['draw tourists','吸引游客'],['be a magnet for tourists','吸引游客']] },
      { name: 'Round 2：Women & Families 女性与家庭类高频词', max: 20, items: [['gender equality','两性平等'],['gender discrimination','性别歧视'],['sexism','性别歧视'],['a progressive society','一个开明的社会'],['an enlightened society','一个开明的社会'],['be tied down by chores','被家务事拖累'],['child bearing','生育孩子'],['child rearing','抚育孩子'],['maternal instinct','母性本能'],['household chores','家务事'],['family bonds','家庭成员间的情感纽带'],['family ties','家庭纽带'],['a sense of belonging','归属感'],['an attachment to sth.','对……的依恋'],['single-parent households','单亲家庭'],['mistreat','虐待'],['abuse','虐待／滥用'],['domestic violence','家庭暴力'],['addiction to drugs','毒品上瘾'],['be addicted to drugs','对毒品上瘾']] },
      { name: 'Round 3：Globalisation 全球化补充类高频词', max: 20, items: [['a lingua franca','一种通用语言'],['the proliferation of English','英语的广泛应用'],['the ascendancy of English','英语的统治地位'],['the hegemony of English','英语的统治地位'],['dialect','方言'],['vernacular','方言／本地语言'],['the indigenous language','本地语言'],['become extinct','消亡'],['become obsolete','消亡'],['the extinction of languages','语言的消亡'],['the demise of languages','语言的消亡'],['preserve','保护'],['protect','保护'],['ancestors','祖先'],['descendants','后代'],['posterity','后代'],['the harmony between ethnic groups','民族团结'],['cultural integration','文化融合'],['cultural synthesis','文化融合'],['interaction','相互影响']] },
      { name: 'Round 4（加分轮）：Health & Lifestyle 健康与生活方式类高频词', max: 10, items: [['sedentary lifestyle','缺少运动的生活方式'],['sleep-deprivation','睡眠不足'],['sleeplessness','失眠'],['insomnia','失眠'],['obesity','肥胖'],['overnourishment','营养过剩'],['stress-related illnesses','压力相关疾病'],['mental well-being','心理健康'],['physical health','身体健康'],['work-life balance','工作与生活平衡']] }
    ]
  },
  homework: [
    { n: 1, title: 'PEEL 框架练习',
      brief: '用第 3 次课学到的「PEEL 框架（Point → Explain → Example → Link）」，为以下 2 个 Task 2 题目写出完整提纲。提纲要求：Introduction 3 句（Background + Issue + Thesis）；Body 1／Body 2 各 4 个任务（Topic Sentence + Explain + Example + Link）；Conclusion 3 句（Restate + Summarise + Final Thought）。',
      submit: '2 份完整的 PEEL 框架提纲（每份含 3 段 + 主体段任务标注）',
      fields: [ { key: 'peel', kind: 'group', label: 'PEEL 提纲', items: [
        { heading: '题目 1：Cambridge IELTS 12, Test 1 — Some people think that universities should focus on providing students with practical skills for the workplace rather than academic knowledge. To what extent do you agree or disagree with this view?' },
        { heading: '题目 2：Cambridge IELTS 15, Test 1 — Some people think that economic progress is the only way to measure a country’s success, while others believe that there are other factors, such as quality of life, that should be considered. Discuss both views and give your own opinion.' }
      ], sub: [
        { key: 'bg', kind: 'line', label: 'Intro · Background' },
        { key: 'is', kind: 'line', label: 'Intro · Issue' },
        { key: 'th', kind: 'line', label: 'Intro · Thesis' },
        { key: 'b1p', kind: 'line', label: 'Body 1 · Point（Topic Sentence）' },
        { key: 'b1e', kind: 'line', label: 'Body 1 · Explain' },
        { key: 'b1x', kind: 'line', label: 'Body 1 · Example' },
        { key: 'b1l', kind: 'line', label: 'Body 1 · Link' },
        { key: 'b2p', kind: 'line', label: 'Body 2 · Point（Topic Sentence）' },
        { key: 'b2e', kind: 'line', label: 'Body 2 · Explain' },
        { key: 'b2x', kind: 'line', label: 'Body 2 · Example' },
        { key: 'b2l', kind: 'line', label: 'Body 2 · Link' },
        { key: 'cr', kind: 'line', label: 'Conclusion · Restate Thesis' },
        { key: 'cs', kind: 'line', label: 'Conclusion · Summarise Two Reasons' },
        { key: 'cf', kind: 'line', label: 'Conclusion · Final Thought' }
      ] } ] },
    { n: 2, title: '连接词功能分类练习',
      brief: '将以下 15 个连接词按功能分类（Adding / Cause & Effect / Contrast / Concession / Exemplify），并各造一个句子。',
      submit: '功能分类表 + 15 个句子（每个连接词一句）',
      fields: [ { key: 'link', kind: 'group', compact: true, label: '连接词分类与造句',
        items: ['Furthermore','As a result','However','Although','For instance','Moreover','Consequently','Nevertheless','While it is true that','Take X as an example','In addition','Therefore','In contrast','Admittedly','This is evident in'].map(function(w){ return { heading: w }; }),
        sub: [
          { key: 'cat', kind: 'choice', label: '功能分类', options: ['Adding','Cause & Effect','Contrast','Concession','Exemplify'] },
          { key: 'sen', kind: 'line', label: '造句' }
        ] } ] },
    { n: 3, title: '逻辑排序练习',
      brief: '以下是关于「公立博物馆是否应免费」的 6 个句子，请按正确逻辑顺序排列，并标注每个句子的任务名称。',
      list: [
        'A. “This suggests that free access to cultural resources has tangible educational and social returns.”',
        'B. “Many countries invest significant public funds in museums and galleries to preserve their cultural heritage.”',
        'C. “I believe public museums should remain free because they provide essential educational opportunities for all citizens.”',
        'D. “The debate centres on whether these institutions should be funded by taxpayers or by visitors themselves.”',
        'E. “For instance, the British Museum in London attracted over 6 million visitors last year, many of whom were students on school trips.”',
        'F. “Free admission removes financial barriers, allowing people from all socioeconomic backgrounds to access cultural knowledge.”'
      ],
      submit: '正确顺序（字母排列）+ 每个句子的任务名称',
      fields: [
        { key: 'order', kind: 'line', label: '正确顺序（例：B → D → C → …）', placeholder: '按逻辑顺序写出 6 个字母' },
        { key: 'jobs', kind: 'group', compact: true, label: '每句的任务名称',
          items: ['A 句','B 句','C 句','D 句','E 句','F 句'].map(function(w){ return { heading: w }; }),
          sub: [ { key: 'job', kind: 'choice', label: '任务名称', options: ['Background','Issue','Thesis','Topic Sentence','Example','Link Back'] } ] }
      ] },
    { n: 4, title: '搭配库建立',
      brief: '从今天听写的 70 个词中，选 8 个自然搭配（如 promote cultural communication、gender equality、family bonds、sedentary lifestyle 等），每个搭配造一个完整的学术句子。',
      submit: '8 个完整句子',
      fields: [ { key: 'coll', kind: 'pairs', label: '搭配造句', count: 8, aLabel: '搭配', bLabel: '学术句子', aPlaceholder: 'promote cultural communication', bPlaceholder: '完整学术句子' } ] }
  ]
});

/* ---------------------------------- Class 4 ---------------------------------- */
window.COURSE.lessons.push({
  id: 4,
  name: 'Class 4',
  theme: '四种议论文类型 · 触发词决策树 · 立场结构',
  themeEn: 'Four Essay Types · The Trigger-Word Decision Tree · Stance Architecture',
  mock: {
    title: '写作模考（60 分钟）',
    format: '助教扮演雅思考官，对每位学生进行一篇完整的 Task 2 大作文限时写作，其余时间用于即时反馈。Class 4 核心是「四种议论文类型（One-Sided 一边倒 / Concession 让步 / Balanced 折中 / Rebuttal 驳斥）」，因此模考前必须先用「30 秒决策树」根据触发词选定文章类型，并在草稿上写明所选类型，再动笔。要求全程手写、限时、不查词典。',
    steps: [
      { title: 'Step 1：考试说明与计时开始（2 分钟）', quote: 'Good morning. This is the Academic Writing test. You have 40 minutes to complete Task 2. Before you write, read the question for trigger words and choose your essay type: One-Sided, Concession, Balanced, or Rebuttal. Write your chosen type at the top of your draft. You should write at least 250 words. No dictionary, no phone. Your time starts now.' },
      { title: 'Step 2：选类型 + Task 2 大作文（40 分钟）', text: '从以下剑桥雅思官方真题中任选 1 道题（话题与 Class 4 PPT 一致：动物园／难民／核能；题型刻意覆盖四种类型的触发词）。' },
      { title: 'Step 3：即时反馈（约 10–15 分钟）', text: '助教先确认学生所选类型与触发词是否匹配，再用 PPT 的「Type-Spotting（找结构转折点）」方法：找出文章的 turn（如 However / This view misrepresents）在哪、是否清晰。最后用 Band 5 vs Band 7 对照同一题，指出立场结构的差距，并提醒「Concession 是保底默认选择」。' }
    ],
    prompts: [
      { label: '题目 A', source: 'Cambridge IELTS 真题（动物园 — 适合 One-Sided 或 Concession）', text: 'Some people think that zoos should be banned, while others believe they play an important role. Do you agree or disagree that zoos should be banned?' },
      { label: '题目 B', source: 'Cambridge IELTS 真题（难民／财富责任 — “Discuss both views” = Balanced）', text: 'Some people believe that wealthy nations have a responsibility to accept more refugees, while others disagree. Discuss both views and give your own opinion.' },
      { label: '题目 C', source: 'Cambridge IELTS 真题（核能／气候 — “To what extent” = Concession，或可写 Rebuttal）', text: 'Some experts claim that nuclear energy is the only realistic solution to climate change. To what extent do you agree or disagree?' }
    ],
    rules: ['限时 40 分钟', '字数 ≥ 250 词', '全程手写', '不查词典、不用手机', '动笔前先在草稿顶部写明所选文章类型'],
    focusTitle: 'Class 4 重点观察（对应 PPT「四种类型」与触发词决策）',
    focus: [
      { k: '（1）类型选择是否正确 Type Choice', v: '是否读出了触发词并选对类型？“Discuss both views” 是否写成 Balanced；“To what extent / How far” 是否走 Concession；“Do you agree?” 是否用 One-Sided 或 Concession。是否在草稿顶部标明了所选类型。' },
      { k: '（2）立场结构是否到位 Stance Architecture', v: '让步型是否 Body 1 让步、Body 2 用 However 推翻；一边倒型两段是否同向且为两个不同理由；折中型是否两面都充分展开、结论给出「取决于……」的条件；驳斥型是否先陈述对方观点再质疑前提（This view overlooks…）。' },
      { k: '（3）衔接与 register Linking & Register', v: '让步／对比／驳斥的衔接短语是否自然（如 Admittedly / However / On balance），有无 PPT 点名的错误（“Although…but…”连用、“I think”、“Both sides have advantages and disadvantages”空话）。' }
    ]
  },
  dictation: {
    title: '单词听写',
    note: '助教朗读英文单词／词组，学生写出英文 + 中文。',
    total: '总计 50 词',
    rounds: [
      { name: 'Round 1：动物', max: 15, items: [['animal right activists','动物权益保护主义者'],['wildlife','野生动物'],['protect wild animals','保护野生动物'],['endangered species','濒危物种'],['natural habitat','自然栖息地'],['captivity','圈养／被囚禁'],['cruel','残忍的'],['inhumane','不人道的'],['medical research','医学研究'],['vivisection','活体解剖'],["alleviate animals' pain",'减轻动物痛苦'],["pets are their masters' companions",'宠物是主人的伙伴'],['poach','偷猎'],['there are no substitutes for','……是没有替代物的'],['ecosystem','生态系统']] },
      { name: 'Round 2：健康', max: 15, items: [['obesity','肥胖症'],['a balanced diet','均衡饮食'],['junk food','垃圾食品'],['nutritious','有营养的'],['cardiovascular disease','心血管疾病'],['a national health crisis','全国性健康危机'],['place a burden on','给……带来负担'],['public health','公共健康'],['mental well-being','心理健康'],['depression','抑郁症'],['insomnia','失眠'],['overnourishment','营养过剩'],['preventive measures','预防措施'],['physical development','身体发育'],['life expectancy','预期寿命']] },
      { name: 'Round 3：旅游 & 社会', max: 15, items: [['tourist attractions','旅游景点'],['places of interest','名胜古迹'],["broaden one's horizons",'开阔眼界'],['first-hand experience','亲身体验'],['promote cultural communication','促进文化交流'],['commercialise','商业化'],['current affairs','时事'],['a sense of obligation','责任感／义务感'],['the citizenry','全体公民'],['self-defence','自卫'],['national security','国土安全'],['a vicious circle','恶性循环'],['rules and regulations','规章制度'],['expose','揭露'],['censor','审查']] },
      { name: 'Round 4（加分轮）：让步 & 驳斥衔接', max: 5, items: [['it is true that','诚然／确实(让步开头)'],['there is no denying that','不可否认……'],['on balance','总体而言'],['this view overlooks','这种观点忽视了……(驳斥)'],['such a claim misrepresents','这种说法歪曲了……(驳斥)']] }
    ]
  },
  homework: [
    { n: 1, title: '配型练习（Type-Spotting）',
      brief: '根据 Class 4 的「触发词决策树」，为以下 5 道剑桥真题各判定最合适的文章类型（One-Sided / Concession / Balanced / Rebuttal），并写出判断依据（触发词）。',
      submit: '5 道题的类型判定 + 触发词依据',
      fields: [ { key: 'type', kind: 'group', compact: true, label: '类型判定', items: [
        { heading: '（1）Is it better to live in a big city or a small town?' },
        { heading: '（2）Some people think higher education should be free. To what extent do you agree?' },
        { heading: '（3）Discuss the advantages and disadvantages of remote work.' },
        { heading: '（4）Many argue that social media has damaged young people’s communication skills. Do you agree?' },
        { heading: '（5）Some say wealthy nations should accept more refugees. Others disagree. Discuss both views.' }
      ], sub: [
        { key: 'ty', kind: 'choice', label: '文章类型', options: ['One-Sided','Concession','Balanced','Rebuttal'] },
        { key: 'tw', kind: 'line', label: '判断依据（触发词）' }
      ] } ] },
    { n: 2, title: '一题两写练习（同题不同类型）',
      brief: '就下面同一道题，分别写出 Concession（让步）和 One-Sided（一边倒）两份大纲（每份含 Intro + Body 1 + Body 2 + Conclusion 的一句话提纲），然后对比哪一份更有说服力、为什么。',
      quote: 'Some people think that governments should ban fast food. Do you agree or disagree?',
      submit: '两份大纲 + 1 段对比说明（哪份更强、为什么）',
      fields: [
        { key: 'conc', kind: 'lines', label: 'Concession 让步大纲', count: 4, itemLabels: ['Intro','Body 1','Body 2','Conclusion'] },
        { key: 'one', kind: 'lines', label: 'One-Sided 一边倒大纲', count: 4, itemLabels: ['Intro','Body 1','Body 2','Conclusion'] },
        { key: 'cmp', kind: 'para', label: '对比说明：哪一份更有说服力、为什么', rows: 4 }
      ] },
    { n: 3, title: '衔接短语清单 + 改错练习',
      brief: '按 PPT slide 27 整理三类衔接短语：让步（Concede）／推翻对比（Overturn）／驳斥（Rebuttal），每类至少 3 个。然后改正下面三个 PPT 点名的常见错误。',
      list: ['（1）“Although living in a city is convenient, but it is expensive.”','（2）“On the other hand, I think it is good.”','（3）“Both sides have their own advantages and disadvantages.”'],
      submit: '三类衔接短语清单（≥9 个）+ 3 句改正版',
      fields: [
        { key: 'cd', kind: 'lines', label: '让步 Concede（≥3 个）', count: 3 },
        { key: 'ov', kind: 'lines', label: '推翻对比 Overturn（≥3 个）', count: 3 },
        { key: 'rb', kind: 'lines', label: '驳斥 Rebuttal（≥3 个）', count: 3 },
        { key: 'fix', kind: 'lines', label: '3 句改正版', count: 3, itemLabels: ['改正（1）','改正（2）','改正（3）'] }
      ] },
    { n: 4, title: '词汇造句练习',
      brief: '从今天听写的 50 个词中选 5 个不熟悉的词／词组（建议至少包含 2 个让步／驳斥类衔接，如 there is no denying that / this view overlooks），各造一个与雅思写作话题相关的完整句子。',
      note: '要求有上下文语境，体现自然搭配与正确的立场衔接，而非生硬大词。',
      submit: '5 个词 + 5 个句子',
      fields: [ { key: 'voc', kind: 'pairs', label: '词汇造句', count: 5, aLabel: '词／词组', bLabel: '句子', aPlaceholder: 'there is no denying that', bPlaceholder: '完整句子，有上下文' } ] }
  ]
});

/* ---------------------------------- Class 5 ---------------------------------- */
window.COURSE.lessons.push({
  id: 5,
  name: 'Class 5',
  theme: 'PEEL 逻辑深挖 · 主题句与段落打磨',
  themeEn: 'Digging into PEEL · Sharpening Topic Sentences & Paragraphs',
  mock: {
    title: '写作模考（60 分钟）',
    format: '助教扮演雅思考官，对每位学生进行一篇完整的 Task 2 大作文限时写作，其余时间用于即时反馈。Class 5 核心是「PEEL 逻辑深挖 + 主题句与段落打磨」——即把 Class 3 学到的 Point→Explain→Example→Link 从「写全」升级到「写透写利落」。因此模考重点不在「有没有四步」，而在「每一步是否够扎实」。要求全程手写、限时、不查词典。',
    steps: [
      { title: 'Step 1：考试说明与计时开始（2 分钟）', quote: 'Good morning. This is the Academic Writing test. You have 40 minutes to complete Task 2. Focus this time on your body paragraphs: one clear topic sentence per paragraph, then Explain → Example → Link. Make every paragraph razor-sharp. You should write at least 250 words. No dictionary, no phone. Your time starts now.' },
      { title: 'Step 2：Task 2 大作文（40 分钟）', text: '从以下剑桥雅思官方真题中任选 1 道题（话题不限，重点是练段落打磨与 PEEL 深挖）。' },
      { title: 'Step 3：即时反馈（约 10–15 分钟）', text: '助教用「PEEL 四色标注」带学生逐段拆解：把主体段的 Point / Explain / Example / Link 分别标出，哪一环薄弱就当场补哪一环。重点抓两类常见问题：主题句写成背景句（观点不明），以及「例子无解释」的逻辑断层。最后用 Band 5 vs Band 7 的同题段落对照。' }
    ],
    prompts: [
      { label: '题目 A', source: 'Cambridge IELTS 真题（环境 — 练具体 example 与 link）', text: 'Some people believe that environmental problems are too big for individuals to solve, while others think individuals can make a difference. Discuss both views and give your own opinion.' },
      { label: '题目 B', source: 'Cambridge IELTS 真题（媒体 — 练主题句与解释）', text: 'Some people think that the media should always tell the truth, while others believe that certain information should be withheld. To what extent do you agree or disagree?' },
      { label: '题目 C', source: 'Cambridge IELTS 真题（政府开支 — 练理由的区分度）', text: 'Some people think governments should spend money on protecting the environment, while others believe this money should be used to reduce poverty. Discuss both views and give your opinion.' }
    ],
    rules: ['限时 40 分钟', '字数 ≥ 250 词', '全程手写', '不查词典、不用手机'],
    focusTitle: 'Class 5 重点观察（对应 PEEL 深挖与主题句打磨）',
    focus: [
      { k: '（1）主题句质量 Topic Sentence', v: '每个主体段是否以一句清晰、可辩护的主题句开头，一句话只承载一个观点？主题句是否直接呼应 Thesis，而不是复述题目或写成模糊的大背景句？' },
      { k: '（2）Explain 是否真展开 Explanation Depth', v: '是否 Explain 了主题句背后的逻辑链（为什么成立、怎么起作用），而不是提出观点后立刻跳到例子？是否存在「观点 + 例子、中间断层」的问题？' },
      { k: '（3）Example 具体度 + Link 回扣', v: '例子是否具体（国家／数据／真实情景）而非「for example, in my country…」式空泛？每个例子后是否有一句 Link 把它拉回论点（This demonstrates / This suggests that…）？' }
    ]
  },
  dictation: {
    title: '单词听写',
    note: '助教朗读英文单词／词组，学生写出英文 + 中文。',
    total: '总计 50 词',
    rounds: [
      { name: 'Round 1：环境', max: 15, items: [['ecological equilibrium','生态平衡(正式)'],['conservationists','环保主义者'],['deforestation','砍伐森林'],['toxic','有毒的'],['boost crop yield','增加农产品产量'],['put a strain on resources','让资源承受压力'],['exhaust','用尽(资源)'],['discharge','排放'],['sewage','污水'],['biodiversity','生物多样性'],['the ozone layer','臭氧层'],['fertile soil','肥沃的土壤'],['arable land','耕地'],['combat environmental problems','解决环境问题'],['scarcity','短缺']] },
      { name: 'Round 2：媒体 & 语言', max: 15, items: [['news outlets','新闻机构'],['pervasive','无处不在的'],['be inundated with','充斥着'],['fraudulent','诈骗性的'],['exaggerate','夸大'],['sensationalise','煽情化处理'],["tarnish one's reputation",'毁坏某人名誉'],['trustworthy','可信赖的'],['up-to-date','及时的／最新的'],['newsworthy','有新闻价值的'],['code of ethics','道德标准'],['a universal language','通用语言'],['the dominant role of English','英语的统治地位'],['dialect','方言'],['become extinct','消亡／灭绝']] },
      { name: 'Round 3：政府 & 发展', max: 15, items: [['oversee','监督／管理'],['legislate','立法'],['strictly prohibit','严禁'],['allocate funds','拨款'],['tax revenue','税收'],['expenditure','开支'],['arms race','军备竞赛'],['seek hegemony','谋求霸权'],['destabilising factors','不稳定因素'],['unemployment','失业'],['laid-off workers','下岗工人'],['dilapidated','破旧的'],['demolish','拆除'],['the disparity between rich and poor','贫富差距'],['job satisfaction','工作满意度']] },
      { name: 'Round 4（加分轮）：主题句 & 论证高分动词', max: 5, items: [['substantiate','用实据支持(论点)'],['illustrate','举例说明'],['reinforce','强化(论点)'],['underpin','支撑／构成……的基础'],['a compelling reason','有说服力的理由']] }
    ]
  },
  homework: [
    { n: 1, title: '主题句打磨练习（Topic Sentence Drill）',
      brief: '下面给出 3 个「模糊／像背景句」的主题句，请各改写成「一句一观点、清晰可辩护」的强主题句（针对括号里的题目）。',
      submit: '3 个改写后的强主题句',
      fields: [ { key: 'ts', kind: 'group', compact: true, label: '主题句改写', items: [
        { heading: '（1）“Transport is an important issue today.”（题目：政府是否应优先投资公共交通）' },
        { heading: '（2）“The media is everywhere in modern life.”（题目：媒体是否应始终讲真话）' },
        { heading: '（3）“The environment is a big problem.”（题目：环保 vs 扶贫，钱该花在哪）' }
      ], sub: [ { key: 'new', kind: 'para', label: '改写后的强主题句', rows: 2 } ] } ] },
    { n: 2, title: '「补 Explain」练习（消除逻辑断层）',
      brief: '下面是一个「观点 + 例子、中间缺 Explain」的残缺段落。请在 Point 和 Example 之间补上 2–3 句 Explain，把逻辑链讲透。',
      quote: 'Public transport investment reduces urban congestion. (←补 Explain) For instance, Seoul’s metro expansion cut private car use by 20% in a decade.',
      submit: '补全后的完整段落（标出你补的 Explain 部分）',
      fields: [ { key: 'para', kind: 'para', label: '补全后的完整段落（请用【】标出你补的 Explain 部分）', rows: 7 } ] },
    { n: 3, title: '完整 PEEL 段落 + 自评',
      brief: '就下面题目写一个完整的 PEEL 主体段（Point → Explain → Example → Link），并用「PEEL 四步检查表」给自己打勾自评。',
      quote: 'Some people think governments should spend money on protecting the environment rather than reducing poverty. To what extent do you agree or disagree?',
      submit: '1 个完整 PEEL 段落 + 自评表',
      fields: [
        { key: 'para', kind: 'para', label: '我的 PEEL 主体段', rows: 8 },
        { key: 'self', kind: 'checks', label: '自评表（学生自查，不是评分）', options: ['四步齐全（Point / Explain / Example / Link）','Explain 有展开逻辑链，不是一句带过','Example 具体（国家／数据／真实情景）','Link 回扣了论点'] }
      ] },
    { n: 4, title: '词汇造句练习',
      brief: '从今天听写的 50 个词中选 5 个不熟悉的词／词组（建议至少包含 2 个论证类动词，如 substantiate / reinforce / underpin），各造一个与雅思写作话题相关的完整句子。',
      note: '要求有上下文语境，体现自然搭配而非生硬大词。',
      submit: '5 个词 + 5 个句子',
      fields: [ { key: 'voc', kind: 'pairs', label: '词汇造句', count: 5, aLabel: '词／词组', bLabel: '句子', aPlaceholder: 'underpin', bPlaceholder: '完整句子，有上下文' } ] }
  ]
});

/* ---------------------------------- Class 6 ---------------------------------- */
window.COURSE.lessons.push({
  id: 6,
  name: 'Class 6',
  theme: '自然搭配 · Thesaurus Soup 与 Chinglish · Repair Clinic',
  themeEn: 'Natural Collocations · Thesaurus Soup vs Chinglish · The Repair Clinic',
  mock: {
    title: '写作模考（60 分钟）',
    format: '助教扮演雅思考官，对每位学生进行一篇完整的 Task 2 大作文限时写作，其余时间用于即时反馈。Class 6 核心是「自然搭配（Natural Collocations）」——真相是：多数中级学生卡在 5.5 不是因为语法，而是因为用词，尤其是暴露中式英语的「不自然搭配」。因此本次模考批改重点从「有没有内容」转向「词是否『结婚』」。要求全程手写、限时、不查词典。',
    steps: [
      { title: 'Step 1：考试说明与计时开始（2 分钟）', quote: 'Good morning. This is the Academic Writing test. You have 40 minutes to complete Task 2. Remember today’s rule: ordinary words in the right partnerships beat fancy words used wrongly. Precision, not vocabulary size. You should write at least 250 words. No dictionary, no phone. Your time starts now.' },
      { title: 'Step 2：Task 2 大作文（40 分钟）', text: '从以下剑桥雅思官方真题中任选 1 道题（话题与 Class 6 PPT 一致：环境／社会／语言）。' },
      { title: 'Step 3：即时反馈（约 10–15 分钟）', text: '助教开「Repair Clinic（修复诊所）」：带学生对自己文章里的问题句做三步——(1) Diagnose 诊断问题、(2) Name the pattern 命名类型（Missing Partner 缺搭档 / Literal Idiom 直译 / Redundancy 冗余）、(3) Repair 用真实搭配替换。最后用「Upgrade Before→After」思路：不加任何新「大词」，只把弱搭配换成强搭配。' }
    ],
    prompts: [
      { label: '题目 A', source: 'Cambridge IELTS 真题（环境 — 练 address the issue / considerable strain 等真实搭配）', text: 'The rapid growth of cities has placed enormous pressure on the environment. What are the causes of this problem and what measures can be taken to address it?' },
      { label: '题目 B', source: 'Cambridge IELTS 真题（语言／翻译科技 — 呼应 PPT 翻译 App 辩论）', text: 'Some people believe that the widespread use of translation technology means learning a foreign language will become unnecessary. To what extent do you agree or disagree?' },
      { label: '题目 C', source: 'Cambridge IELTS 真题（社会 — 练 play a crucial role / have a negative impact）', text: 'Some people think that social media has a negative impact on both individuals and society. To what extent do you agree or disagree?' }
    ],
    rules: ['限时 40 分钟', '字数 ≥ 250 词', '全程手写', '不查词典、不用手机'],
    focusTitle: 'Class 6 重点观察（对应 PPT「两大失败类型」与「四类搭配」）',
    focus: [
      { k: '（1）Thesaurus Soup 大词堆砌', v: '是否把每个词都换成「更高级」的同义词、结果搭配不通、意思含糊（如 the utilisation of a plethora of merits）？应换成「简单、精准、真实」的表达（如 this has produced many advantages）。' },
      { k: '（2）Chinglish 中式英语', v: '是否有「中文逻辑套英文外衣」的直译？重点抓四类高频：动词搭错（do a contribution → make）、介词搭错（pay attention on → to；depend of → on）、缺搭档（pay attention to protect → to protecting）、冗余（more higher、very large significant）。' },
      { k: '（3）四类搭配是否到位 Four Types', v: '动词 + 名词、形容词 + 名词、副词 + 形容词、介词搭配——是否用对 locked partner（如 raise awareness、a significant impact、deeply concerned、result in）。精准度而非词汇量，才是 Band 7 信号。' }
    ]
  },
  dictation: {
    title: '搭配听写',
    note: '本节为搭配听写：助教朗读英文搭配，学生写出英文 + 中文。Class 6 主题是「自然搭配」，因此本次听写全部为「搭配」而非单个大词，并按 PPT 的四类搭配 family 分组，帮助学生把「记单词」升级为「记搭档」。',
    total: '总计 50 个搭配',
    rounds: [
      { name: 'Round 1：动词 + 名词搭配（Verb + Noun）', max: 15, items: [['make a decision','做决定'],['make a contribution','做贡献'],['make significant progress','取得重大进展'],['make every effort','尽一切努力'],['reach a consensus','达成共识'],['draw a conclusion','得出结论'],['meet demand','满足需求'],['take responsibility','承担责任'],['play a crucial role','起关键作用'],['pose a threat','构成威胁'],['bridge the gap','弥合差距'],['gain access to','获得……的机会'],['shoulder the burden','承担重担'],['foster innovation','促进创新'],['curb pollution','遏制污染']] },
      { name: 'Round 2：形容词 + 名词搭配（Adj + Noun）', max: 15, items: [['a significant impact','重大影响'],['a viable solution','可行的方案'],['a pressing issue','亟待解决的问题'],['a marked improvement','明显的改善'],['a diverse range','多样的种类'],['a considerable disparity','相当大的差距'],['a compelling argument','有说服力的论点'],['a widespread belief','普遍的看法'],['a detrimental effect','有害的影响'],['a fundamental change','根本性的变化'],['a valuable asset','宝贵的财富'],['a plausible explanation','合理的解释'],['adverse consequences','不良后果'],['profound implications','深远的影响'],['a controversial topic','有争议的话题']] },
      { name: 'Round 3：副词 + 形容词／动词搭配（Adv + Adj）', max: 15, items: [['deeply concerned','深切担忧的'],['increasingly common','越来越普遍的'],['widely acknowledged','被广泛认可的'],['largely ineffective','在很大程度上无效的'],['highly controversial','极具争议的'],['strictly regulated','受严格监管的'],['heavily dependent on','严重依赖……的'],['fundamentally flawed','根本上有缺陷的'],['readily available','容易获得的'],['invest heavily in','大力投资于'],['significantly higher','显著更高的'],['increasingly serious','日益严重的'],['closely linked','密切相关的'],['vastly different','截然不同的'],['genuinely beneficial','真正有益的']] },
      { name: 'Round 4（加分轮）：介词搭配（Preposition Partners）', max: 5, items: [['depend on','取决于／依赖'],['result in','导致(结果)'],['contribute to','促成／贡献于'],['be associated with','与……相关'],['be attributed to','归因于']] }
    ]
  },
  homework: [
    { n: 1, title: 'Chinglish 诊断与修复（Repair Clinic）',
      brief: '按 PPT「诊断 → 命名类型 → 修复」三步，改正下面 6 个句子，并注明每个属于哪种模式。',
      submit: '6 句修复版 + 每句的模式命名',
      fields: [ { key: 'fix', kind: 'group', compact: true, label: '诊断与修复', items: [
        { heading: '（1）We should pay attention to protect the environment.' },
        { heading: '（2）The government has taken measures to face the problem.' },
        { heading: '（3）Young people pay more and more attention on social media.' },
        { heading: '（4）People have more higher living standards than before.' },
        { heading: '（5）This will have a very obvious effect.' },
        { heading: '（6）With the development of society, people’s lives have improved.' }
      ], sub: [
        { key: 'rep', kind: 'line', label: '修复版' },
        { key: 'pat', kind: 'choice', label: '模式命名', options: ['缺搭档 Missing Partner','直译 Literal Idiom','冗余 Redundancy','介词错 Wrong Preposition','弱搭配 Weak Collocation'] }
      ] } ] },
    { n: 2, title: '段落升级（Upgrade：不加大词，只换搭配）',
      brief: '把下面这段 Band 5.5 的段落升级，规则：不许用任何新「大词」，只把弱搭配／中式英语换成强搭配。',
      quote: 'With the development of society, more and more people are paying attention to protect the environment. Governments have done a lot of work to solve this problem, and many big improvements have been made. However, there is still a very large gap between what is needed and what has been done. We should do our best to face this challenge.',
      submit: '升级后的段落 + 标出你替换的每一处搭配',
      fields: [
        { key: 'para', kind: 'para', label: '升级后的段落', rows: 7 },
        { key: 'swap', kind: 'lines', label: '替换记录（原搭配 → 新搭配）', count: 5, placeholder: '例：pay attention to protect → prioritise protecting' }
      ] },
    { n: 3, title: '范文采集（Mining a Model）',
      brief: '找一篇 Band 7–8 范文，按 PPT 三步「Read for Meaning → Re-read & Highlight → Sort by Type」，采集 10 个自然搭配，标注每个属于四类中的哪一类，并把最好的 5 个加入你的「个人搭配清单」。',
      submit: '10 个采集到的搭配（含类型标注）+ 选入清单的 5 个',
      fields: [
        { key: 'src', kind: 'line', label: '范文出处（题目／来源）' },
        { key: 'mine', kind: 'group', compact: true, label: '采集到的 10 个搭配',
          items: [1,2,3,4,5,6,7,8,9,10].map(function(i){ return { heading: '搭配 ' + i }; }),
          sub: [
            { key: 'c', kind: 'line', label: '搭配' },
            { key: 't', kind: 'choice', label: '类型', options: ['Verb + Noun','Adj + Noun','Adv + Adj','Preposition'] }
          ] },
        { key: 'top', kind: 'lines', label: '选入个人搭配清单的 5 个', count: 5 }
      ] },
    { n: 4, title: '搭配造句练习',
      brief: '从今天听写的 50 个搭配中选 5 个（建议每个 family 至少选 1 个，务必包含 2 个介词搭配如 depend on / result in），各造一个与雅思写作话题相关的完整句子。',
      note: '要求搭配用对、介词用对，体现「精准而非堆砌」。',
      submit: '5 个搭配 + 5 个句子',
      fields: [ { key: 'voc', kind: 'pairs', label: '搭配造句', count: 5, aLabel: '搭配', bLabel: '句子', aPlaceholder: 'result in', bPlaceholder: '完整句子，搭配与介词都用对' } ] }
  ]
});

/* ---------------------------------- Class 7 ---------------------------------- */
window.COURSE.lessons.push({
  id: 7,
  name: 'Class 7',
  theme: '语法多样性与准确度 · 五大句型 · 三遍校对',
  themeEn: 'Grammatical Range & Accuracy · Five Structures · The 3-Pass Proof-Read',
  mock: {
    title: '写作模考（60 分钟）',
    format: '助教扮演雅思考官，对每位学生进行一篇完整的 Task 2 大作文限时写作，其余时间用于即时反馈。Class 7 核心是「语法多样性与准确度（Grammatical Range & Accuracy）」——语法不是为了炫技，而是为意义服务；目标是「可控的多样性」：大部分简单句正确 + 一些真正跑通的复杂句。核心原则：Range AND accuracy，但 accuracy 永远优先（一个正确的简单句 > 一个崩盘的复杂句）。要求全程手写、限时、不查词典，并预留时间做「三遍校对」。',
    steps: [
      { title: 'Step 1：考试说明与计时开始（2 分钟）', quote: 'Good morning. This is the Academic Writing test. You have 40 minutes to complete Task 2. Leave the last 3 minutes for the 3-pass proof-read: verbs, then nouns, then sentences. Accuracy first, range second — never the reverse. You should write at least 250 words. No dictionary, no phone. Your time starts now.' },
      { title: 'Step 2：Task 2 大作文（40 分钟，含最后 3 分钟三遍校对）', text: '从以下剑桥雅思官方真题中任选 1 道题（话题与 Class 7 PPT 一致：城市／交通／教育／科技）。' },
      { title: 'Step 3：即时反馈（约 10–15 分钟）', text: '助教带学生做「三遍校对系统（3-Pass Proof-Read）」：第一遍只查动词（主谓一致／时态／三单 -s），第二遍只查名词（冠词／单复数／不可数清单），第三遍只查句子（流水句／逗号拼接／从属连词是否用对）。每遍只盯一类错误，眼睛抓得更准。最后用「Upgrade Without Crashing」：只在「意义需要」处把简单句升级为高价值句型。' }
    ],
    prompts: [
      { label: '题目 A', source: 'Cambridge IELTS 真题（城市／基础设施 — 练复杂名词短语与从属句）', text: 'The rapid growth of urban populations has placed enormous pressure on infrastructure. What problems does this cause, and what measures can governments take to address them?' },
      { label: '题目 B', source: 'Cambridge IELTS 真题（科技／教育 — 练让步与条件句）', text: 'Although technology has transformed education, some people believe it has done more harm than good to students’ learning. To what extent do you agree or disagree?' },
      { label: '题目 C', source: 'Cambridge IELTS 真题（可再生能源 — 练真实／虚拟条件句）', text: 'Some people believe that governments should prioritise investment in renewable energy. Do the advantages of this approach outweigh the disadvantages?' }
    ],
    rules: ['限时 40 分钟（最后 3 分钟做三遍校对）', '字数 ≥ 250 词', '全程手写', '不查词典、不用手机'],
    focusTitle: 'Class 7 重点观察（两大失败模式 + 五大句型 + 五大准确度杀手）',
    focus: [
      { k: '（1）两大失败模式 Flatline vs Crash', v: '是否全是简单句、毫无变化（Flatline，封顶 Band 6）？还是复杂句堆砌、错误百出（Crash，流水句／逗号拼接／主谓错）？目标是「可控多样性」，每个复杂句都要「用得其所」并能经得起校对。' },
      { k: '（2）五大高分句型是否为意义服务', v: '从属连词、定语从句、条件句、复杂名词短语、让步连接——是否在「意义需要」的地方使用，而不是为炫技硬塞？重点看定从有无「双主语」错误、虚拟条件是否用 were、复杂名词短语是否真的压缩了意义。' },
      { k: '（3）五大准确度杀手 Accuracy Killers', v: '主谓一致（尤其 the number of…）、冠词（a/the/零冠词）、流水句与逗号拼接、时态与第三人称 -s、可数／不可数（information/evidence/research/advice）。这五项是「提准确度最快」的地方。' }
    ]
  },
  dictation: {
    title: '句型／语法听写',
    note: '本节为句型／语法听写：助教朗读英文，学生写出英文 + 中文。Class 7 主题是「语法多样性与准确度」，因此本次听写不再是普通单词，而是「五大高分句型的句架／信号词」+「五大准确度杀手的正确形式」+「语法校对高频术语」。',
    total: '总计 50 项',
    rounds: [
      { name: 'Round 1：五大高分句型 · 句架与信号词', max: 15, items: [['although / even though','尽管(从属让步)'],['whereas','然而／相比之下'],['since (= because)','既然／因为'],['which / that (relative)','定语从句引导词'],['the policy that was introduced','被引入的那项政策(定从)'],['if… , … will…','真实条件句'],['if… were… , … would…','虚拟(假设)条件句'],['the rapid growth of…','……的快速增长(复杂名词短语)'],['the increasing reliance on…','对……日益增长的依赖'],['the long-term consequences of…','……的长期后果'],['while some argue that…','尽管有人认为……(让步)'],['admittedly, … ; however, …','诚然……；然而……'],['not only… but also…','不但……而且……'],['a correct simple sentence','正确的简单句'],['controlled range','可控的多样性']] },
      { name: 'Round 2：五大准确度杀手 · 正确形式', max: 15, items: [['the number of … is (not are)','the number of… 用单数 is'],['subject-verb agreement','主谓一致'],['research shows that…','研究表明……(第三人称 +s)'],['education has become…','education 用 has(不可数)'],['students who study abroad','出国留学的学生(主谓一致)'],['struggle to adapt (not adapting)','难以适应(动词原形)'],['much information (not informations)','大量信息(不可数)'],['a piece of research (not a research)','一项研究(不可数)'],['much advice (not advices)','大量建议(不可数)'],['several pieces of evidence','几条证据(不可数)'],["Education is important (no 'the')",'教育很重要(泛指不加 the)'],['one main clause per sentence','一句一个主句(避免流水句)'],['comma splice','逗号拼接(错误)'],['run-on sentence','流水句(错误)'],['simple present for general truths','一般现在时表普遍真理']] },
      { name: 'Round 3：语法与校对高频术语／搭配', max: 15, items: [['subordination','从属(复合句)'],['relative clause','定语从句'],['conditional sentence','条件句'],['complex noun phrase','复杂名词短语'],['concession','让步'],['proofread','校对'],['verb tense','动词时态'],['countable / uncountable','可数／不可数'],['article (a / the)','冠词'],['ambiguity','歧义'],['grammatical accuracy','语法准确度'],['grammatical range','语法多样性'],['earn its place','(句型)物有所值／用得其所'],['survive the proof-read','经得起校对检查'],['signal Band 7 awareness','体现七分水平的意识']] },
      { name: 'Round 4（加分轮）：让步／对比高分连接词', max: 5, items: [['even so','即便如此'],['nonetheless','尽管如此'],['conversely','相反地'],['far outweighs','远远超过'],['undermines','削弱／破坏']] }
    ]
  },
  homework: [
    { n: 1, title: '五大句型专项造句',
      brief: '用 Class 7 的五大高分句型，各造 1 个与雅思写作话题相关的句子（务必「为意义服务」，不是硬塞）。',
      submit: '5 个句子（每句注明用了哪种句型）',
      fields: [ { key: 'five', kind: 'lines', label: '五大句型造句', count: 5, itemLabels: ['从属连词句','定语从句','条件句（含 1 个虚拟用 were）','复杂名词短语','让步连接句'] } ] },
    { n: 2, title: 'Error Hunt（改错 + 命名错误类型）',
      brief: '按 PPT「Error Hunt」，找出下面段落里的 6 处错误，写出改正并命名类型。',
      quote: 'Every year, the number of student who studies abroad are increasing. This show that education have become more globalise. Although many benefit from this experience, some student feels homesick and struggle to adapting to a new culture.',
      submit: '6 处改正 + 每处的错误类型命名',
      fields: [ { key: 'err', kind: 'group', compact: true, label: '6 处改错',
        items: [1,2,3,4,5,6].map(function(i){ return { heading: '第 ' + i + ' 处' }; }),
        sub: [
          { key: 'w', kind: 'line', label: '原文（错处）' },
          { key: 'c', kind: 'line', label: '改正' },
          { key: 't', kind: 'choice', label: '错误类型', options: ['主谓一致','时态','可数／不可数','形容词误用','动名词','流水句'] }
        ] } ] },
    { n: 3, title: '段落升级 + 三遍校对（Upgrade Without Crashing）',
      brief: '把下面这段全简单句的段落，只在「意义需要」处升级 2–3 个高价值句型（不要每句都改），然后用三遍校对法检查一遍并标注你查到的问题。',
      quote: 'Technology has changed education. Students can learn online. This is convenient. Some students do not have internet. This is a problem. Governments should help them.',
      submit: '升级后的段落（标出用了哪些句型）+ 三遍校对发现的问题清单',
      fields: [
        { key: 'para', kind: 'para', label: '升级后的段落（请标出用了哪些句型）', rows: 6 },
        { key: 'p1', kind: 'line', label: 'Pass 1 · 动词（主谓一致／时态／三单 -s）查到的问题' },
        { key: 'p2', kind: 'line', label: 'Pass 2 · 名词（冠词／单复数／不可数）查到的问题' },
        { key: 'p3', kind: 'line', label: 'Pass 3 · 句子（流水句／逗号拼接／从属连词）查到的问题' }
      ] },
    { n: 4, title: '句型／语法听写复盘造句',
      brief: '从今天听写的 50 项中选 5 项（建议至少包含 2 个高分句架如 “if… were… would…” / “the increasing reliance on…”，以及 1 个准确度要点如 “the number of … is”），各写一个正确、自然、为意义服务的完整句子。',
      submit: '5 项 + 5 个句子',
      fields: [ { key: 'voc', kind: 'pairs', label: '句型复盘造句', count: 5, aLabel: '所选项目', bLabel: '句子', aPlaceholder: 'the increasing reliance on…', bPlaceholder: '完整句子，句型为意义服务' } ] }
  ]
});

/* ---------------------------------- Class 8 ---------------------------------- */
window.COURSE.lessons.push({
  id: 8,
  name: 'Class 8',
  theme: 'Task 1 学术图表 · Overview 第一 · 趋势语言',
  themeEn: 'Academic Charts · Overview First · The Language of Data',
  mock: {
    title: '写作模考（60 分钟 · 本次为 Task 1）',
    format: '本节课主题是 Task 1 学术图表（Academic Charts），因此模考改为 Task 1 为主。助教扮演雅思考官，对每位学生进行一篇完整的 Task 1 限时写作（≥150 词，建议 20 分钟），其余时间用于即时反馈。核心原则：Task 1 是「客观描述报告」，不是议论文——不给观点、不做判断，只做「筛选 + 归类」，先报总体规律（Overview）再用精选数字支撑。要求全程手写、限时、不查词典。',
    steps: [
      { title: 'Step 1：考试说明与计时开始（2 分钟）', quote: 'Good morning. This is the Academic Writing Task 1. You have 20 minutes to write at least 150 words. Remember: describe the data objectively — no opinions. Start with a clear overview and no numbers in the introduction. Select the key features; do not list every figure. Your time starts now.' },
      { title: 'Step 2：Task 1 图表描述（20 分钟）', text: '从以下剑桥雅思 Task 1 官方真题类型中任选 1 题（覆盖 PPT 所讲图型：趋势图／表格／流程图／地图）。' },
      { title: 'Step 3：即时反馈（约 10–15 分钟）', text: '助教先用 PPT 的「Overview A vs B」方法：让学生判断自己的 Overview 是「罗列数字型（A，差）」还是「概括规律型（B，好）」，当场改写成宏观、无数字的版本。再带学生做「趋势语言精修」：把口语化／中式表达换成 rose sharply / a gradual fall in 等；重点纠正 by/to 介词、副词 vs 形容词（a sharp rise / rose sharply）、以及是否误加了个人观点。' }
    ],
    prompts: [
      { label: '题目 A', source: 'Task 1（折线图／趋势 — 练趋势语言与 Overview）', text: 'The line graph shows the percentage of the population using the Internet in three countries between 2000 and 2020. Summarise the information by selecting and reporting the main features, and make comparisons where relevant.' },
      { label: '题目 B', source: 'Task 1（表格 — 练筛选与比较语言）', text: 'The table below gives information about the proportion of household spending on three categories in four countries in a single year. Summarise the information by selecting and reporting the main features, and make comparisons where relevant.' },
      { label: '题目 C', source: 'Task 1（流程图／地图 — 练被动语态／位置与变化语言）', text: 'The diagram below shows the process of recycling plastic bottles. / The two maps below show a town centre in 1990 and today. Summarise the information by selecting and reporting the main features.' }
    ],
    rules: ['限时 20 分钟（建议）', '字数 ≥ 150 词', '全程手写', '不查词典、不用手机', '客观描述，不给观点、不做判断', '引言不含数字，Overview 单独成段且无具体数字'],
    focusTitle: 'Class 8 重点观察（四段结构 + Overview 第一 + 趋势语言）',
    focus: [
      { k: '（1）四段结构与「Overview 第一」', v: '是否有引言（改写题干、不含数字）+ 独立的 Overview（1–2 句、宏观、无具体数字）+ 两个主体段（精选关键数字）？PPT 明确：没有清晰 Overview，几乎不可能超过 6 分，考官会先找它。' },
      { k: '（2）筛选而非罗列 Select, don’t list', v: '是否「找故事、报规律」——抓最高／最低／最大变化／同步趋势，而不是逐个数字复述？主体段的数字是否是「精选」用来支撑 Overview 的规律，而非流水账。' },
      { k: '（3）趋势语言精准度', v: '趋势动词／副词（rose sharply / fell gradually）与名词形式（a sharp rise in）是否换用得当；比较与约数是否自然；介词是否用对——尤其 increased BY（幅度）vs increased TO（终值）、时态、以及无观点无判断。' }
    ],
    task1: true
  },
  dictation: {
    title: 'Task 1 图表语言听写',
    note: '本节为 Task 1 图表语言听写：助教朗读英文，学生写出英文 + 中文。本次听写全部为 Task 1 数据描述语言——趋势动词／副词、名词形式、比较与约数、介词精确用法、流程图／地图语言，帮助学生把「记单词」升级为「记图表描述工具箱」。',
    total: '总计 50 项',
    rounds: [
      { name: 'Round 1：趋势语言 · 动词 + 副词（上升／下降／平稳）', max: 15, items: [['rose sharply','急剧上升'],['climbed steadily','稳步攀升'],['surged','激增'],['increased gradually','逐渐增长'],['fell gradually','逐渐下降'],['declined steadily','稳步下降'],['plummeted','暴跌'],['dropped dramatically','大幅下降'],['levelled off','趋于平稳'],['remained stable','保持稳定'],['fluctuated','波动'],['peaked at','达到峰值(在……)'],['hit a low of','降到最低点(在……)'],['reached a plateau','进入平台期'],['bottomed out','触底(回升)']] },
      { name: 'Round 2：趋势语言 · 名词形式 + 程度词', max: 15, items: [['a sharp rise in','……的急剧上升'],['a gradual fall in','……的逐渐下降'],['a steady increase in','……的稳步增长'],['a dramatic decline in','……的大幅下降'],['a slight fluctuation in','……的轻微波动'],['a significant growth','显著增长'],['a marked drop','明显下降'],['an upward trend','上升趋势'],['a downward trend','下降趋势'],['the overall pattern','总体规律'],['a noticeable decrease','明显的减少'],['a sudden surge','突然激增'],['the peak','峰值／最高点'],['the lowest point','最低点'],['over the period','在此期间']] },
      { name: 'Round 3：比较 & 约数 & 介词精确用法', max: 15, items: [['twice as high as','是……的两倍'],['significantly higher than','明显高于'],['by contrast','相比之下'],['whereas','而／然而'],['just over','略高于'],['just under','略低于'],['nearly half','几乎一半'],['approximately','大约'],['roughly','大致'],['increased by','增加了(幅度)'],['increased to','增加至(最终值)'],['from … to …','从……到……'],['accounted for','占(比例)'],['the proportion of','……的比例'],['compared with','与……相比']] },
      { name: 'Round 4（加分轮）：流程图 & 地图题语言', max: 5, items: [['is then transferred to','随后被输送到(流程被动)'],['the first stage involves','第一阶段包括(流程)'],['was replaced by','被……取代(地图)'],['a new … was constructed','新建了……(地图)'],['remained unchanged','保持不变(地图)']] }
    ]
  },
  homework: [
    { n: 1, title: '写 Overview 专项（无数字、抓规律）',
      brief: '针对下面这张表，用「一句话、不含任何数字」写出最大总体规律（对照 PPT 的 Overview B）。',
      table: { head: ['年份','国家 A','国家 B','国家 C'], rows: [['2000','20%','45%','10%'],['2010','35%','38%','22%'],['2020','55%','30%','40%']] },
      submit: '1 句宏观 Overview（无数字）+ 说明你抓的是哪个趋势',
      fields: [
        { key: 'ov', kind: 'para', label: 'Overview（1 句，不含任何数字）', rows: 2 },
        { key: 'why', kind: 'para', label: '说明：你抓的是哪个趋势', rows: 3 }
      ] },
    { n: 2, title: '趋势语言填空 + 介词辨析',
      brief: '完成下列句子，选对词形与介词，并说明另一个选项为什么错。',
      submit: '3 句答案 + 每题错误项的原因',
      fields: [ { key: 'gap', kind: 'group', compact: true, label: '填空与辨析', items: [
        { heading: '（1）Sales _____ (rose / raised) _____ (by / to) 40% in 2020.' },
        { heading: '（2）There was _____ (a sharp / sharply) increase _____ (in / of) exports.' },
        { heading: '（3）Country A spent _____ (twice as much as / twice more than) Country B.' }
      ], sub: [
        { key: 'ans', kind: 'line', label: '我的答案（完整句子）' },
        { key: 'why', kind: 'para', label: '另一个选项为什么错', rows: 2 }
      ] } ] },
    { n: 3, title: '一图两写（动词形式 ↔ 名词形式）',
      brief: '任选一个趋势（如某国互联网使用率 2000–2020 上升），先用「动词 + 副词」写一句（rose sharply），再用「名词形式」写同一意思一句（a sharp rise in）。共完成 3 组（上升、下降、波动各 1 组）。',
      submit: '3 组、共 6 句（每组动词版 + 名词版）',
      fields: [ { key: 'two', kind: 'group', compact: true, label: '一图两写', items: [
        { heading: '第 1 组：上升' },
        { heading: '第 2 组：下降' },
        { heading: '第 3 组：波动' }
      ], sub: [
        { key: 'v', kind: 'line', label: '动词 + 副词版' },
        { key: 'n', kind: 'line', label: '名词形式版' }
      ] } ] },
    { n: 4, title: 'Task 1 图表语言听写复盘造句',
      brief: '从今天听写的 50 项中选 5 项（建议至少包含 2 个趋势表达如 plummeted / a steady increase in，以及 1 个介词要点如 increased by vs to），各写一个准确、客观、无观点的 Task 1 描述句。',
      submit: '5 项 + 5 个句子',
      fields: [ { key: 'voc', kind: 'pairs', label: 'Task 1 语言造句', count: 5, aLabel: '所选项目', bLabel: '描述句', aPlaceholder: 'a steady increase in', bPlaceholder: '客观、无观点的 Task 1 描述句' } ] }
  ]
});
