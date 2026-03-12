
const generateMockContent = (title) => [
  { type: 'text', value: `针对 ${title} 项目，JustPai 团队深入一线，进行了为期 3 个月的实地调研与数据采集。我们发现传统的运维模式存在响应滞后、能耗数据不透明等痛点。` },
  { type: 'h3', value: '核心挑战与对策' },
  { type: 'text', value: '在项目实施过程中，我们主要面临三大挑战：现有设备老化严重、原有数据孤岛难以打通、以及办公人员对施工干扰的零容忍要求。为此，JustPai 制定了“非接触式”智能改造方案。' },
  { type: 'img', value: 'https://placehold.co/800x450/e5e7eb/9ca3af?text=Project+Implementation+Scene' },
  { type: 'text', value: '通过部署超过 500 个 IoT 传感器节点，我们成功构建了数字孪生底座。上图展示了我们的工程师正在进行精密传感器的调试工作。' },
  { type: 'h3', value: '交付成果' },
  { type: 'text', value: '最终，该项目不仅按时交付，更实现了超出预期的节能效果。数据显示，改造后的首个季度，整体综合能耗下降了 28.5%，报修响应时间缩短了 60%。' },
];

const ALL_CASES = [
  {
    id: 1,
    title: "全球知名车企亚太总部办公空间升级",
    category: "办公空间升级",
    date: "October 15, 2025",
    author: "项目组 A",
    desc: "为 50,000㎡ 办公园区提供智能化改造与硬装升级，提升空间利用率 40%。",
    img: "https://placehold.co/600x400/e5e7eb/9ca3af?text=Case+Image+1",
    content: generateMockContent("全球知名车企亚太总部")
  },
  {
    id: 2,
    title: "TOP3 互联网大厂研发中心智能安防改造",
    category: "智能安防改造",
    date: "September 20, 2025",
    author: "技术工程部",
    desc: "部署 2,000+ 智能传感器节点，实现全域安防联动与环境实时监测。",
    img: "https://placehold.co/600x400/e5e7eb/9ca3af?text=Case+Image+2",
    content: generateMockContent("互联网大厂研发中心")
  },
  {
    id: 3,
    title: "国际金融中心大厦节能运维托管",
    category: "节能运维托管",
    date: "August 10, 2025",
    author: "能源管理组",
    desc: "通过 AI 能耗管理系统，帮助客户在首年实现电力成本下降 30%。",
    img: "https://placehold.co/600x400/e5e7eb/9ca3af?text=Case+Image+3",
    content: generateMockContent("国际金融中心大厦")
  },
  {
    id: 4,
    title: "生物医药产业园区实验室环境控温",
    category: "实验室环境控温",
    date: "July 05, 2025",
    author: "特种设备组",
    desc: "高精度恒温恒湿空调系统建设，保障 24 小时实验环境稳定运行。",
    img: "https://placehold.co/600x400/e5e7eb/9ca3af?text=Case+Image+4",
    content: generateMockContent("生物医药产业园区")
  },
  {
    id: 5,
    title: "某大型连锁零售门店多网点统一运维",
    category: "多网点统一运维",
    date: "June 12, 2025",
    author: "大客户服务部",
    desc: "为全国 300+ 门店提供标准化水电维修服务，响应速度提升 200%。",
    img: "https://placehold.co/600x400/e5e7eb/9ca3af?text=Case+Image+5",
    content: generateMockContent("连锁零售门店")
  },
  {
    id: 6,
    title: "高科技芯片制造工厂洁净室维护",
    category: "洁净室维护",
    date: "May 28, 2025",
    author: "精密维护组",
    desc: "提供 ISO Class 5 级别洁净室的日常巡检与精密设备维护。",
    img: "https://placehold.co/600x400/e5e7eb/9ca3af?text=Case+Image+6",
    content: generateMockContent("高科技芯片制造工厂")
  }
];

const ALL_NEWS = [
  {
    id: 1,
    title: "JustPai 公布 2025 年度服务数据报告：助力企业减碳 1000 吨",
    date: "February 04, 2026",
    category: "企业新闻",
    author: "JustPai PR Team",
    desc: "今日，JustPai 正式发布《2025 绿色办公与智能运维白皮书》。报告显示，通过我们的智能能耗管理系统，累计为服务企业节约电力消耗 500 万千瓦时。",
    img: "https://placehold.co/600x400/f3f4f6/9ca3af?text=News+1",
    content: [
      { type: 'text', value: '今日，JustPai 正式发布《2025 绿色办公与智能运维白皮书》。报告显示，通过我们的智能能耗管理系统，累计为服务企业节约电力消耗 500 万千瓦时，相当于减少碳排放约 1000 吨。' },
      { type: 'h3', value: '数据背后的技术突破' },
      { type: 'text', value: '这一成绩的取得，离不开 JustPai 持续迭代的 AI 调度算法。通过对空调、照明、电梯等高能耗设备的精细化控制，我们在不牺牲办公舒适度的前提下，实现了能源利用率的最大化。' },
      { type: 'img', value: 'https://placehold.co/800x400/f3f4f6/9ca3af?text=Data+Chart' },
      { type: 'text', value: '未来，我们将继续加大在绿色科技领域的研发投入，目标在 2028 年助力客户实现累计减碳 10000 吨的目标。' }
    ]
  },
  {
    id: 2,
    title: "发布 JustPai OS 2.0 系统，AI 调度效率提升 50%",
    date: "January 20, 2026",
    category: "产品发布",
    author: "产品研发中心",
    desc: "全新的 OS 2.0 系统引入了边缘计算能力，即使在断网环境下也能保障基础安防与温控逻辑的正常运行。",
    img: "https://placehold.co/600x400/f3f4f6/9ca3af?text=News+2",
    content: generateMockContent("JustPai OS 2.0")
  },
  {
    id: 3,
    title: "JustPai 携手西门子，深化楼宇自动化战略合作",
    date: "January 05, 2026",
    category: "战略合作",
    author: "战略合作部",
    desc: "双方将在智慧园区底层协议互通、硬件生态共建等方面展开深度合作。",
    img: "https://placehold.co/600x400/f3f4f6/9ca3af?text=News+3",
    content: generateMockContent("西门子战略合作")
  },
  {
    id: 4,
    title: "新增 20 个城市服务节点，全国网点覆盖率进一步提升",
    date: "December 12, 2025",
    category: "市场拓展",
    author: "运营中心",
    desc: "随着西部运营中心的启用，JustPai 的线下服务网络已正式覆盖全国 76 个核心城市。",
    img: "https://placehold.co/600x400/f3f4f6/9ca3af?text=News+4",
    content: generateMockContent("城市节点扩张")
  },
  {
    id: 5,
    title: "荣获“2025 年度最佳企业服务商”奖项",
    date: "November 28, 2025",
    category: "荣誉奖项",
    author: "品牌部",
    desc: "在昨日举办的中国企业服务年度峰会上，JustPai 凭借卓越的交付能力获此殊荣。",
    img: "https://placehold.co/600x400/f3f4f6/9ca3af?text=News+5",
    content: generateMockContent("获奖报道")
  },
  {
    id: 6,
    title: "JustPai 创始人受邀参加全球数字建筑峰会",
    date: "November 15, 2025",
    category: "行业会议",
    author: "CEO 办公室",
    desc: "分享关于“Web3 技术在实体建筑资产确权中的应用”的主题演讲。",
    img: "https://placehold.co/600x400/f3f4f6/9ca3af?text=News+6",
    content: generateMockContent("数字建筑峰会")
  }
];

export { generateMockContent, ALL_CASES, ALL_NEWS };
