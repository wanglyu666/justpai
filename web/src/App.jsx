import React, { useState, useEffect } from 'react';
import { Menu, X, ArrowRight, Activity, Zap, Layers, BarChart3, ShieldCheck, Globe, Cpu, Download, Users, User, UserPlus, Building2, Smartphone, MapPin, Clock, Wrench, PenTool, Sofa, Droplets, Fan, Leaf, Trash2, FileText, Router, ChevronRight, CheckCircle2, Heart, Handshake, Phone, Mail, HelpCircle, ChevronDown, ChevronLeft, Calendar, Newspaper, ArrowLeft, Target, Share2, Facebook, Twitter, Linkedin } from 'lucide-react';

// 自定义渐变色配置
const BRAND_GRADIENT = "bg-gradient-to-r from-[#FFEB69] to-[#A1D573]";
const PAI_GRADIENT_TEXT = "bg-clip-text text-transparent bg-gradient-to-r from-[#FFEB69] to-[#A1D573]";
const BG_GRADIENT_LIGHT = "bg-gradient-to-br from-[#FFEB69]/10 to-[#A1D573]/10";
const CARD_THEME_GLOW = "border border-gray-100 shadow-[0_8px_30px_rgba(0,0,0,0.04)] hover-rhythm relative z-10 bg-white";

// --- 数据源区域 (模拟数据库) ---

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

const CLIENTS = Array(15).fill(null).map((_, i) => ({
  name: `Client ${i + 1}`,
  src: "https://placehold.co/100x100/f3f4f6/a1a1aa?text=LOGO" 
}));

const HISTORY = [
  { year: "2020", title: "创立元年", desc: "公司正式成立，确立“快速工程”服务理念。同年携手西门子，提供全国改选维修年度框架协议服务，奠定行业基础。" },
  { year: "2021", title: "全国扩张", desc: "北京、上海、深圳分公司相继成立，业务覆盖华北、华东、华南。全国建立50+城市服务商网络，拥有300+专业认证师傅。携手字节跳动，服务互联网巨头。" },
  { year: "2022", title: "携手头部", desc: "开辟场所地网建设新业务。携手阿里巴巴，为其全国三四线城市办公室提供地网建设项目服务。与霍尼韦尔达成合作，深化技术壁垒。" },
  { year: "2023", title: "战略升级", desc: "品牌全面升级为“那就这么派”。建立全国四大核心业务区，拓展至150+城市服务商，1000+师傅。研发自有互联网服务平台，探索O2O业务模式。" },
  { year: "2024", title: "平台上线", desc: "“这么派/JustPai”平台及APP正式上线，开启O2O服务新纪元。平台上线500+标准化快速工程及运维产品，整合200+平台城市服务商，构建全域服务生态。" }
];

const SERVICE_ICONS = [
  { name: "空间设计", icon: PenTool },
  { name: "硬装改造", icon: Wrench },
  { name: "软装陈列", icon: Sofa },
  { name: "水电工程", icon: Droplets },
  { name: "暖通空调", icon: Fan },
  { name: "智能网络", icon: Router }, 
  { name: "设施运维", icon: Activity },
  { name: "办公家具", icon: Layers },
  { name: "绿化租赁", icon: Leaf },
  { name: "深度保洁", icon: Trash2 },
  { name: "年框服务", icon: FileText },
];

const FAQ_DATA = [
  "这么派平台有几种注册方式？有什么区别？",
  "购物车中为什么有普通产品和定制产品，有什么区别？",
  "什么是派服务？什么是派产品？",
  "派产品的价格包括什么？",
  "派产品中默认的起订量为什么不是1，需求量低于起订量怎么下单？",
  "派平台的积分有什么作用？",
  "我不是很专业，不会下单，怎么办？",
  "想订购“派产品”需要企业注册吗？",
  "下单过程中遇到问题怎么办？",
  "推荐码有什么用？"
];

// --- 主组件 ---

export default function App() {
  const [currentPage, setCurrentPage] = useState('home'); 
  const [detailData, setDetailData] = useState(null); 
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navigateTo = (page, data = null) => {
    setCurrentPage(page);
    setMobileMenuOpen(false);
    if (data) {
      setDetailData(data);
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-white text-gray-900 font-sans selection:bg-[#A1D573] selection:text-white overflow-x-hidden relative">
      
      {/* 顶部悬浮毛玻璃导航栏 (在 standards 页面隐藏) */}
      {currentPage !== 'standards' && (
        <div className="fixed top-6 left-1/2 -translate-x-1/2 z-[100] w-auto max-w-[95%] pointer-events-none">
          <nav className="pointer-events-auto bg-gray-200/50 backdrop-blur-md border border-white/60 rounded-full px-8 py-3.5 flex items-center justify-center gap-10 shadow-[0_8px_32px_rgba(0,0,0,0.08)] transition-all duration-300">
            
            <div className="flex items-center gap-3 cursor-pointer group shrink-0" onClick={() => navigateTo('home')}>
              <div className="w-7 h-7 relative">
                 <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <defs>
                       <linearGradient id="logoGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                          <stop offset="0%" stopColor="#FFEB69" />
                          <stop offset="100%" stopColor="#A1D573" />
                       </linearGradient>
                    </defs>
                    <path d="M10 30 C10 20 20 10 30 10 L60 10 C70 10 70 25 60 25 L40 25 L40 55 C40 65 25 65 25 55 L25 30 C25 25 10 30 10 30 Z" fill="url(#logoGradient)" className="group-hover:opacity-90 transition-opacity" />
                    <path d="M55 45 C65 45 75 45 75 45 L75 70 C75 80 60 85 60 85 L30 85 C20 85 20 70 30 70 L55 70 L55 45 Z" fill="url(#logoGradient)" transform="rotate(180 52.5 65)" className="group-hover:opacity-90 transition-opacity"/>
                 </svg>
              </div>
              <span className="text-xl font-bold tracking-tighter text-gray-900 whitespace-nowrap">JustPai</span>
            </div>

            <div className="hidden md:flex items-center gap-8 text-sm font-medium shrink-0">
              <button onClick={() => navigateTo('home')} className={`whitespace-nowrap transition-colors ${currentPage === 'home' ? 'text-gray-900 font-bold' : 'text-gray-500 hover:text-gray-900'}`}>首页</button>
              <button onClick={() => navigateTo('news')} className={`whitespace-nowrap transition-colors ${['news', 'news-list', 'cases-list', 'detail'].includes(currentPage) ? 'text-gray-900 font-bold' : 'text-gray-500 hover:text-gray-900'}`}>新闻中心</button>
              <button onClick={() => navigateTo('about')} className={`whitespace-nowrap transition-colors ${currentPage === 'about' ? 'text-gray-900 font-bold' : 'text-gray-500 hover:text-gray-900'}`}>关于我们</button>
              <button onClick={() => navigateTo('join')} className={`whitespace-nowrap transition-colors ${currentPage === 'join' ? 'text-gray-900 font-bold' : 'text-gray-500 hover:text-gray-900'}`}>加入我们</button>
              <button onClick={() => navigateTo('help')} className={`whitespace-nowrap transition-colors flex items-center gap-1 ${currentPage === 'help' ? 'text-gray-900 font-bold' : 'text-gray-500 hover:text-gray-900'}`}>帮助中心</button>
            </div>

            <button className="md:hidden text-gray-900 shrink-0" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </nav>
        </div>
      )}

      {mobileMenuOpen && currentPage !== 'standards' && (
        <div className="md:hidden fixed top-24 left-1/2 -translate-x-1/2 w-[90%] max-w-sm bg-gray-100/90 backdrop-blur-xl border border-white/60 rounded-3xl p-6 flex flex-col gap-6 shadow-2xl z-[90]">
          <button onClick={() => navigateTo('home')} className="text-lg text-left text-gray-600 hover:text-gray-900 font-medium">首页</button>
          <button onClick={() => navigateTo('news')} className="text-lg text-left text-gray-600 hover:text-gray-900 font-medium">新闻中心</button>
          <button onClick={() => navigateTo('about')} className="text-lg text-left text-gray-600 hover:text-gray-900 font-medium">关于我们</button>
          <button onClick={() => navigateTo('join')} className="text-lg text-left text-gray-600 hover:text-gray-900 font-medium">加入我们</button>
          <button onClick={() => navigateTo('help')} className="text-lg text-left text-gray-600 hover:text-gray-900 font-medium">帮助中心</button>
        </div>
      )}

      {/* 页面内容路由 */}
      <main>
        {currentPage === 'home' && <HomePage onNavigate={navigateTo} />}
        {currentPage === 'about' && <AboutPage />}
        {currentPage === 'join' && <JoinPage />}
        {currentPage === 'help' && <HelpPage />}
        {currentPage === 'news' && <NewsPage onNavigate={navigateTo} />}
        {currentPage === 'news-list' && <NewsListPage onNavigate={navigateTo} />}
        {currentPage === 'cases-list' && <CaseListPage onNavigate={navigateTo} />}
        {currentPage === 'detail' && detailData && <DetailPage data={detailData} onNavigate={navigateTo} />}
        {currentPage === 'standards' && <StandardsPage onNavigate={navigateTo} />}
      </main>

      {/* 公共页脚 (在 standards 页面隐藏) */}
      {currentPage !== 'standards' && (
        <footer className="bg-gray-900 border-t border-gray-800 pt-20 pb-10 px-6 text-white relative z-20">
           <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
              <div className="col-span-1 md:col-span-1">
                 <div className="flex items-center gap-2 mb-6">
                    <div className={`w-6 h-6 rounded-sm ${BRAND_GRADIENT}`}></div>
                    <span className="text-xl font-bold">JustPai</span>
                 </div>
                 <p className="text-gray-400 text-sm">
                    专注企业快速工程服务<br/>
                    Powered by Intelligent Tech.
                 </p>
              </div>
              
              <div>
                 <h4 className="font-bold text-white mb-6">服务</h4>
                 <ul className="space-y-4 text-gray-400 text-sm">
                    <li><a href="#" className="hover:text-[#A1D573] transition-colors">智能运维</a></li>
                    <li><a href="#" className="hover:text-[#A1D573] transition-colors">工程改造</a></li>
                    <li><a href="#" className="hover:text-[#A1D573] transition-colors">企业保洁</a></li>
                    <li><a href="#" className="hover:text-[#A1D573] transition-colors">资产管理</a></li>
                 </ul>
              </div>

              <div>
                 <h4 className="font-bold text-white mb-6">公司</h4>
                 <ul className="space-y-4 text-gray-400 text-sm">
                    <li><button onClick={() => navigateTo('about')} className="hover:text-[#A1D573] transition-colors">关于我们</button></li>
                    <li><button onClick={() => navigateTo('join')} className="hover:text-[#A1D573] transition-colors">加入我们</button></li>
                    <li><button onClick={() => navigateTo('news')} className="hover:text-[#A1D573] transition-colors">新闻中心</button></li>
                    <li><a href="#" className="hover:text-[#A1D573] transition-colors">隐私协议</a></li>
                 </ul>
              </div>

              <div>
                 <h4 className="font-bold text-white mb-6">联系</h4>
                 <ul className="space-y-4 text-gray-400 text-sm">
                    <li>上海市xx区xx路xx号</li>
                    <li>hello@justpai.com</li>
                    <li>400-888-8888</li>
                 </ul>
              </div>
           </div>
           
           <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center pt-8 border-t border-gray-800 text-xs text-gray-500">
              <p>&copy; 2024 JustPai Technology. All rights reserved.</p>
              <div className="flex gap-4 mt-4 md:mt-0">
                 <span>WeChat</span>
                 <span>LinkedIn</span>
                 <span>Twitter</span>
              </div>
           </div>
        </footer>
      )}
      
      {/* 动画及基础样式 */}
      <style>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee {
          animation: marquee 30s linear infinite;
        }
        .animate-fade-in-up {
          animation: fadeInUp 0.8s ease-out;
        }
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        /* 全局光晕动画 */
        @keyframes breathe-and-sway {
          0% { transform: scale(1) translate(0px, 0px); opacity: 0.2; }
          33% { transform: scale(1.4) translate(120px, -60px); opacity: 0.5; }
          66% { transform: scale(0.9) translate(-80px, 90px); opacity: 0.3; }
          100% { transform: scale(1) translate(0px, 0px); opacity: 0.2; }
        }
        @keyframes breathe-and-sway-reverse {
          0% { transform: scale(1) translate(0px, 0px); opacity: 0.2; }
          33% { transform: scale(0.8) translate(-100px, 80px); opacity: 0.4; }
          66% { transform: scale(1.5) translate(90px, -90px); opacity: 0.6; }
          100% { transform: scale(1) translate(0px, 0px); opacity: 0.2; }
        }
        .animate-glow-1 {
          animation: breathe-and-sway 12s infinite ease-in-out;
        }
        .animate-glow-2 {
          animation: breathe-and-sway-reverse 15s infinite ease-in-out;
        }

        /* 律动边缘光效 Hover */
        @keyframes rhythm-edge {
          0% { box-shadow: 0 8px 30px rgba(161,213,115, 0.15); border-color: rgba(161,213,115, 0.3); transform: translateY(-4px); }
          50% { box-shadow: 0 8px 40px rgba(161,213,115, 0.5); border-color: rgba(161,213,115, 0.9); transform: translateY(-4px); }
          100% { box-shadow: 0 8px 30px rgba(161,213,115, 0.15); border-color: rgba(161,213,115, 0.3); transform: translateY(-4px); }
        }
        .hover-rhythm {
          transition: all 0.3s ease;
        }
        .hover-rhythm:hover {
          animation: rhythm-edge 1.5s infinite ease-in-out;
          transform: translateY(-4px);
        }

        /* 自定义平滑缓动 */
        .ease-spring {
           transition-timing-function: cubic-bezier(0.2, 0.8, 0.2, 1);
        }

        /* 隐藏滚动条 */
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .no-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </div>
  );
}

// ================= 通用内容详情页 (DetailPage) =================
function DetailPage({ data, onNavigate }) {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [data]);

  return (
    <div className="animate-fade-in-up bg-white min-h-screen pt-40 pb-24 relative">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] pointer-events-none z-0">
         <div className="w-full h-full bg-[#A1D573] rounded-full blur-[120px] opacity-20 animate-glow-1"></div>
      </div>

      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-12 relative z-10">
        <div className="lg:col-span-8">
          <div className="flex items-center gap-2 text-sm text-gray-500 mb-6">
            <button onClick={() => onNavigate('home')} className="hover:text-black">首页</button>
            <ChevronRight size={14} />
            <button onClick={() => onNavigate('news')} className="hover:text-black">新闻中心</button>
            <ChevronRight size={14} />
            <span className="text-gray-900 font-medium truncate max-w-[200px]">{data.title}</span>
          </div>

          <h1 className="text-3xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight">
            {data.title}
          </h1>
          
          <div className="flex items-center gap-6 text-sm text-gray-500 mb-8 pb-8 border-b border-gray-100">
            <div className="flex items-center gap-2">
              <Calendar size={16} />
              {data.date || 'Unknown Date'}
            </div>
            <div className="flex items-center gap-2">
              <User size={16} />
              {data.author || 'JustPai Official'}
            </div>
          </div>

          {data.desc && (
            <div className="bg-gray-50 border-l-4 border-[#A1D573] p-6 mb-10 rounded-r-lg">
              <p className="text-lg text-gray-700 italic font-medium leading-relaxed">
                {data.desc}
              </p>
            </div>
          )}

          <div className="mb-12 rounded-2xl overflow-hidden shadow-lg">
            <img src={data.img} alt={data.title} className="w-full h-auto object-cover" />
          </div>

          <div className="prose prose-lg max-w-none text-gray-600">
            {data.content && data.content.map((block, index) => {
              switch (block.type) {
                case 'text':
                  return <p key={index} className="mb-6 leading-loose">{block.value}</p>;
                case 'h2':
                  return <h2 key={index} className="text-2xl font-bold text-gray-900 mt-10 mb-4">{block.value}</h2>;
                case 'h3':
                  return <h3 key={index} className="text-xl font-bold text-gray-900 mt-8 mb-3">{block.value}</h3>;
                case 'img':
                  return (
                    <div key={index} className="my-8">
                      <img src={block.value} alt="Content" className="rounded-xl shadow-md w-full" />
                      {block.caption && <p className="text-center text-sm text-gray-400 mt-2">{block.caption}</p>}
                    </div>
                  );
                default:
                  return null;
              }
            })}
            
            {!data.content && (
              <>
                <p className="mb-6">此处为默认文章内容。通过在数据源中添加 <code>content</code> 数组，您可以自由地在这里插入更多文字段落。</p>
                <p className="mb-6">JustPai 致力于通过数字化手段重塑企业办公基础设施管理。我们的服务涵盖了从前期的空间规划设计、工程改造实施，到后期的智能化运维托管全生命周期。</p>
                <h3 className="text-xl font-bold text-gray-900 mt-8 mb-4">技术赋能，降本增效</h3>
                <p className="mb-6">传统的设施管理往往依赖人工巡检和被动响应，效率低下且数据难以留存。JustPai 自研的智能工单系统和 IoT 物联平台，实现了设备状态的实时监控和故障的预测性维护。</p>
              </>
            )}
          </div>
        </div>

        <div className="lg:col-span-4">
          <div className="sticky top-32">
            {/* 相关推荐：当前为前端逻辑，按所在版块（动态 / 合作案例）取排除当前文章后的最新 3 条。
                后端可改为：根据当前文章 id 与版块类型请求接口，返回该版块下最新 3 条（排除当前条）。 */}
            <div className="bg-gray-50 p-6 rounded-2xl border border-gray-100">
              <h4 className="font-bold text-gray-900 mb-4 pb-2 border-b border-gray-200">
                相关推荐
              </h4>
              <ul className="space-y-4">
                {(() => {
                  const isFromNews = ALL_NEWS.some((n) => n.id === data.id);
                  const sourceList = isFromNews ? ALL_NEWS : ALL_CASES;
                  const related = sourceList.filter((item) => item.id !== data.id).slice(0, 3);
                  return related.map((item, i) => (
                    <li key={item.id} className="group cursor-pointer" onClick={() => onNavigate('detail', item)}>
                      <span className="text-xs text-[#A1D573] font-bold block mb-1">{item.date}</span>
                      <h5 className="text-sm font-medium text-gray-700 group-hover:text-[#A1D573] transition-colors leading-snug">
                        {item.title}
                      </h5>
                    </li>
                  ));
                })()}
              </ul>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}

// ================= 新增：企业标准文档页 (StandardsPage) =================

// 提取环境管控所有二级项的标准数据
const STANDARDS_DB = {
  '环境管理组织': {
    trigger: '7天以上的项目立项触发',
    check: '上级主管领导现场履职检查',
    reference: '《环境管理手册》\n第四节 环境实施措施',
    rules: [
      '建立以项目组/项目各参建方负责人为组长的环境污染管理小组，负责针对施工现场的不利环境因素进行识别、控制和策划，组织和落实人力、财力、物力，以保证噪音、粉尘、气味（统称环境污染）控制措施在整个施工过程中得到实施，并取得业主、用户、平台、社会相关方的认可。',
      '新建、改造、维修的项目，项目各参建方负责人在每天开始工作前第一件事就是组织其师傅们统一在 APP 上在线学习在施项目环境和风险管控措施。',
      '建立并执行施工现场环境管控巡检制度。管控巡检由项目各参建方负责人每天检查，也可以是由平台/项目组进行的日常抽检。\n\n检查均需以图像、视频进行记录反馈给平台。\n\n对检查中所发现的问题按“谁施工谁负责”的原则责令整改，项目各参建方在收到整改通知后，应根据整改内容及具体情况，定时间、定人、定措施予以整改解决，专职环境管理检查员负责检查及督促整改。'
    ]
  },
  '环境管控日报': {
    trigger: '3天以上的项目立项触发',
    check: '施工日报评价、标准化日报检查。',
    reference: '《环境管理手册》\n第四节 环境实施措施。',
    rules: [
      '新建、改造、维修的项目，每天项目各参建方负责人应根据当日环境标准化检查内容和频次要求，拍摄带项目信息及日期的现场标准化实施图像、视频上传至平台标准化检查日报页面，由项目组/平台查看及审核。',
      '重要精装/普装/机电/弱电智能化/特种作业的新建、改造项目，需每天两次、每次间隔4小时检查现场环境标准化执行情况，并将检查的图像、视频记录反馈给平台。',
      '确定为每日两检项目的平台指令由总包（大区）总监或区域经理在审核项目立项时根据项目特性发出。'
    ]
  },
  '环境管控周报': {
    trigger: '7天以上的项目立项触发',
    check: '施工周报评价、标准化日报检查。',
    reference: '《环境管理手册》\n第四节 环境实施措施。',
    rules: [
      '一周以上精装/普装/机电/弱电智能化/特种作业的新建、改造项目，项目组必须按时完成环境管控周报，并在平台项目管理菜单内周报页面提交环境管控周报内容。周报的内容编写应包含以下几个关键部分：\n\n1）概述本周内开展的影响现场环境的施工作业情况，包括但不限于噪音/粉尘/气味作业等，概述现场环境管控的措施实施情况，现场保洁员的配置及工作情况。\n2）详细记录本周内进行的环境检查情况，包括检查的频率、发现的问题及整改措施，确保整改得到及时处理。\n3）介绍本周内进行的环境管控教育与培训的内容，并提交带项目信息及日期的教育/交底照片。\n4）提前规划下一周的环境管控措施与培训，确保现场环境管理工作持续有效。\n5）其他重要事项，如即将进行的大规模噪音、粉尘作业等。'
    ]
  },
  '噪音控制': {
    check: '项目组及上级主管领导现场履职检查、环境周报评价、平台标准化日报检查、平台标准化检查团队现场巡检。',
    reference: '《环境管理手册》\n第四节 环境实施措施。',
    rules: [
      '严禁施工现场大声喧哗、起哄，严控各种可能对非施工区域产生影响的噪声源。',
      '对于会产生噪声且可以在施工现场以外完成的加工作业内容，要求在场外加工作业。',
      '对于需批量制作且不宜场外加工的割噪声作业，集中在用户非工作时间进行作业。',
      '施工现场使用效率高且噪声小的电动工具。',
      '施工现场采用低噪声的施工工艺和施工技术。'
    ],
    longTrigger: '石膏板天花、软膜天花、天花钢架(加固、转换层等)、窗帘盒、投影幕盒、铝格栅、铝板吊顶、矿棉板天花、硅钙板天花、钢丝网天花、吸音板天花(聚酯纤维、竹木复合冲孔板、碳晶板等）、不锈钢板天花、PVC、竹木纤维板天花、玻璃、镜子天花、木饰面天花、石材复合板天花、遮阳帘天花、石膏板隔墙、水泥板隔墙、玻璃隔墙、卫生间隔断、活动隔断、夹心彩钢板隔断、玻璃砖隔断、轻质预制板隔断、板材隔墙、墙面木饰面、门及门套、墙面石材、墙面吸音板(聚酯纤维、竹木复合冲孔板、碳晶板等）、墙面软包、墙面白板玻璃、墙面金属板、墙面砖、墙面防火板、墙面护墙板、墙面踢脚（木制、PVC、金属、石材、瓷砖）、固定家俱、钢架(加固、楼梯、基层等)、墙面硬包/软木、地面石材、地面砖、木地板、架空地板、钢架(加固、基层等)、水磨石（现浇、块贴）、成品灯箱、标识、五金、窗帘、系统家俱、吊顶拆除(含石膏板、矿棉板、金属板、玻璃板等各类材料吊顶)、钢架拆除(加固、楼梯、基层、转换层等)、石膏板隔墙拆除、砌筑隔墙拆除、玻璃隔断拆除、成品隔断拆除、墙地面线管开槽拆除、墙地面石材拆除、墙地面砖拆除、基础拆除(含水泥、木板、石膏板或其它材质)、地面找平层拆除、门窗拆除、固定家俱拆除、系统家俱拆除、通风管道风管供应及(金属钢板风管／玻璃钢风管／玻镁复合风管)、空调水管供应及(焊接钢管／镀锌钢管／无缝钢管)、电箱及电气设备类拆除、电气管槽拆除、空调外机及冷却塔等楼顶类设备拆除、空调内机类/风机类设备拆除、空调风管道及相关风阀附件类拆除、空调水/冷媒管道及相关水阀附件类拆除、通风风口类拆除、消防水系统设备类拆除(水箱/水泵/水管/消火栓/喷淋头)、消防排烟类设备拆除、水管道及相关阀门类拆除、石材结晶'
  },
  '气味控制': {
    check: '项目组及上级主管领导现场履职检查、环境周报评价、平台标准化日报检查、平台标准化检查团队现场巡检。',
    reference: '《环境管理手册》\n第四节 环境实施措施。',
    rules: [
      '使用绿色环保的材料，采用低异味的施工工艺和施工技术。',
      '金属/木作/油漆深加工工作须在场外工厂完成，到现场进行拼装。',
      '必须在现场完成的木作/油漆工作，应设置独立加工区。特别在非独立作业区内必须严格控制作业规模，并排风机进行通风。',
      '对施工现场采取必要的通风除味措施。开启所有可开启的门窗，施工方每天2次检查门窗开启情况，并将检查图像或视频记录发聩给平台。室内所有新风/排风系统开启最大风量，并保持24小时持续运转，施工方每天2次检查新风机组的运行情况，并将检查图像或视频记录反馈给平台。\n\n在自然通风和大厦系统通风不能满足情况下应采用布置手提式轴流风机的方式补充通风量，布置轴流风机应符合平台标准，施工方应随时检查排风机开启情况，并每天2次将检查视频记录发聩给平台。',
      '在用户非工作时间进行有气味的刷漆、补漆、粘合等作业，按平台标准采取通风除味措施。',
      '油漆、有机溶剂等材料应集中存放在通风良好的指定地点并密封保存。每次调配量和分装量不超过半天的使用量，使用完后应立即密闭并集中妥善保管。',
      '有效隔离异味传播的主要途径，对施工现场进行相对的隔离封闭，封闭施工现场风口风道。',
      '每天对施工现场的空气污浊物、气味进行监控和检查，进行图像、视频记录。'
    ],
    longTrigger: '石膏板天花、软膜天花、裸顶喷漆、天花乳胶漆、窗帘盒、投影幕盒、矿棉板天花、硅钙板天花、吸音板天花(聚酯纤维、竹木复合冲孔板、碳晶板等）、PVC、竹木纤维板天花、木饰面天花、石材复合板天花、石膏板隔墙、轻体隔墙砌筑、水泥板隔墙、卫生间隔断、夹心彩钢板隔断、轻质预制板隔断、板材隔墙、墙面乳胶漆、墙面木饰面、门及门套、墙面水泥砂浆找平、墙面石材、墙面吸音板(聚酯纤维、竹木复合冲孔板、碳晶板等）、墙面砖、墙面防火板、墙面踢脚（木制、PVC、金属、石材、瓷砖）、水泥漆、硅藻泥、马来漆、艺术漆等、地面石材、地面砖、地面垫层、自流平、地坪漆、木地板、架空地板、水磨石（现浇、块贴）、通风管道风管供应及(金属钢板风管／玻璃钢风管／玻镁复合风管)、空调水管供应及(焊接钢管／镀锌钢管／无缝钢管)、保温材料供应及(橡塑保温／玻璃棉保温)、水管保温供应(橡塑保温棉／玻璃棉保温)'
  },
  '废料与垃圾管理': {
    check: '项目组及上级主管领导现场履职检查、环境周报评价、平台标准化日报检查、平台标准化检查团队现场巡检。',
    reference: '《环境管理手册》\n第四节 环境实施措施。',
    rules: [
      '单日维修项目的废料/垃圾应在当天全部清理出现场，确保人走场清。',
      '2日以上新建/改造/维修项目工程废料/垃圾应在每天施工后清理归集到指定区域。',
      '根据废料/垃圾的量及场地情况提前安排垃圾消纳车辆。',
      '新建/改造项目施工现场安排专职清洁工。',
      '现场存放充足的垃圾袋和清理工具。',
      '清洁工每天随时清理和分类装袋施工废料/垃圾，清理垃圾时严禁室内扬尘。',
      '在用户非工作时间内或指定时间内放置在物业指定的垃圾废物站。无物业指定的垃圾废物站，现场储存装满的垃圾袋超过3袋时都必须外运至法定规定的消纳场所。',
      '搬运垃圾袋时，必须事先设定好专用通道和电梯，地面按平台《成品保护规范》标准做好地面保护，严禁拖拽垃圾袋，严禁垃圾遗落在通道。垃圾搬运完毕，清洁工必须将专用通道和电梯打扫干干净净。',
      '清洁工在现场随时清理和回收使用后的容器，检查每一个容器内不得留有残余的油漆、废溶剂、废机油、胶水等，空容器单独装进垃圾袋。',
      '禁止将废弃的油漆、废溶剂、废机油、胶水等倾倒入下水道。',
      '残余危险品废弃物应全部退给相应材料的生产厂家。'
    ],
    longTrigger: '石膏板天花、软膜天花、裸顶喷漆、天花乳胶漆、天花钢架(加固、转换层等)、窗帘盒、投影幕盒、铝格栅、铝板吊顶、矿棉板天花、硅钙板天花、钢丝网天花、吸音板天花(聚酯纤维、竹木复合冲孔板、碳晶板等）、不锈钢板天花、PVC、竹木纤维板天花、玻璃、镜子天花、木饰面天花、石材复合板天花、遮阳帘天花、石膏板隔墙、轻体隔墙砌筑、水泥板隔墙、玻璃隔墙、卫生间隔断、活动隔断、夹心彩钢板隔断、玻璃砖隔断、轻质预制板隔断、板材隔墙、墙面乳胶漆、墙面木饰面、门及门套、墙面水泥砂浆找平、墙面石材、墙面吸音板(聚酯纤维、竹木复合冲孔板、碳晶板等）、墙面软包、墙面白板玻璃、墙面镜子、墙面金属板、墙面砖、墙面壁纸、墙面防火板、墙面护墙板、墙面踢脚（木制、PVC、金属、石材、瓷砖）、固定家俱、钢架(加固、楼梯、基层等)、墙面硬包/软木、水泥漆、硅藻泥、马来漆、艺术漆等、乐高集成墙面、防火挡烟垂壁、护角条、地面石材、地面砖、地面垫层、地面防水(含墙面)、自流平、地坪漆、胶地板、地毯、木地板、架空地板、钢架(加固、基层等)、水磨石（现浇、块贴）、分割条/收口条（金属、PVC）、车位划线、成品灯箱、玻璃贴膜、标识、五金、窗帘、系统家俱、配电箱元器件供应及、控制电箱元器件更换及、UPS供应及、A型集中电源供应及、强弱电管槽、电线电缆供应及、接地系统供应及、灯具供应及、开关/插座面板、应急电源、风机盘管供应及、VRV空调设备供应及、VAV BOX供应及、AHU供应及、机房精密空调供应及、新风机供应及、排风机供应及、水泵供应及、冷却塔供应及、冷水机组供应及、热水锅炉供应及、空调百叶风口类供应及(送风口／回风口／防雨百叶)、空调风系统过虑净化器供应及(初／中效过虑网/PM2.5)、空调送回风软管供应及(铝箔软管／帆布软接头)、通风管道风阀类供应及(调节阀／止回阀／防火阀)、通风管道风管供应及(金属钢板风管／玻璃钢风管／玻镁复合风管)、空调水管供应及(焊接钢管／镀锌钢管／无缝钢管)、空调水系统阀门类供应及(闸阀／截止阀／调节阀／单向阀／排气阀／泄水阀)、空调水系统过虑器供应及(过虑器／排污阀)、空调水系统柔性接头供应及(金属软接头／橡胶软接头)、空调水系统仪表类供应及(压力表／温度表)、冷媒铜管供应及、保温材料供应及(橡塑保温／玻璃棉保温)、温度控制器供应及、喷淋头供应及、烟感探测器供应及、温感探测器供应及、可燃气体探测器供应及、消防栓供应及、消防广播供应及、声光报警器供应及、手动报警器供应及、消防模块供应及、防火门监控系统供应及、消防电源监控报警系统供应及、电气火灾报警系统供应及、早期烟雾报警系统供应及、气体灭火系统供应及、热水锅炉供应及、热水循环泵供应及、补水定压机组供应及、水管供应及(不锈钢管／铜管／镀锌管／PPR管／U-PVC 管)、水管保温供应(橡塑保温棉／玻璃棉保温)、洁具供应及、漏水报警系统、全自动提升泵供应及、热水器供应及、弱电布线(IT、AV、CCTV)、弱电面板(IT、AV、CCTV)、机房设备(IT、AV、CCTV)、智能系统布线、智能未端设备、智能控制面板、智能控制模块'
  },
  '个人物品和食物管理': {
    check: '项目组及上级主管领导现场履职检查、环境周报评价、平台标准化日报检查、平台标准化检查团队现场巡检。',
    reference: '《环境管理手册》\n第四节 环境实施措施。',
    rules: [
      '师傅因当天工作所需带入施工现场的个人物品，包括背包、衣物、鞋帽、饮用水及水杯、食物及餐盒、工具等必须严格控制带入数量。',
      '个人生活物品必须全部放入个人背包，个人工具必须全部放入工具箱内。',
      '个人背包、个人工具箱必须集体整齐摆放在作业区适当的位置，摆放后使用平台黑色保护布进行遮盖防尘。',
      '严禁将个人物品放入用户家具内，非作业区域的房间内，严禁随意各自摆放。',
      '白班师傅严禁在作业区域和用户工作区域内用餐，夜班师傅必须集中在作业区适当的位置用餐（严禁在机房等重要作业区域内用餐），用餐完毕集中收纳剩余食物和餐盒。',
      '严禁在用户工作区域和作业区域内随意丢弃饭盒、水瓶、食品袋、纸巾。',
      '严禁倒洒食物，不小心造成的倒洒须马上清理干净。'
    ],
    longTrigger: '石膏板天花、软膜天花、裸顶喷漆、天花乳胶漆、天花钢架(加固、转换层等)、窗帘盒、投影幕盒、铝格栅、铝板吊顶、矿棉板天花、硅钙板天花、钢丝网天花、吸音板天花(聚酯纤维、竹木复合冲孔板、碳晶板等）、不锈钢板天花、PVC、竹木纤维板天花、玻璃、镜子天花、木饰面天花、石材复合板天花、遮阳帘天花、石膏板隔墙、轻体隔墙砌筑、水泥板隔墙、玻璃隔墙、卫生间隔断、活动隔断、夹心彩钢板隔断、玻璃砖隔断、轻质预制板隔断、板材隔墙、墙面乳胶漆、墙面木饰面、门及门套、墙面水泥砂浆找平、墙面石材、墙面吸音板(聚酯纤维、竹木复合冲孔板、碳晶板等）、墙面软包、墙面白板玻璃、墙面镜子、墙面金属板、墙面砖、墙面壁纸、墙面防火板、墙面护墙板、墙面踢脚（木制、PVC、金属、石材、瓷砖）、固定家俱、钢架(加固、楼梯、基层等)、墙面硬包/软木、水泥漆、硅藻泥、马来漆、艺术漆等、乐高集成墙面、防火挡烟垂壁、护角条、地面石材、地面砖、地面垫层、地面防水(含墙面)、自流平、地坪漆、胶地板、地毯、木地板、架空地板、钢架(加固、基层等)、水磨石（现浇、块贴）、分割条/收口条（金属、PVC）、车位划线、成品灯箱、玻璃贴膜、标识、五金、窗帘、系统家俱、配电箱元器件供应及、控制电箱元器件更换及、UPS供应及、A型集中电源供应及、强弱电管槽、电线电缆供应及、接地系统供应及、灯具供应及、开关/插座面板、应急电源、风机盘管供应及、VRV空调设备供应及、VAV BOX供应及、AHU供应及、机房精密空调供应及、新风机供应及、排风机供应及、水泵供应及、冷却塔供应及、冷水机组供应及、热水锅炉供应及、空调百叶风口类供应及(送风口／回风口／防雨百叶)、空调风系统过虑净化器供应及(初／中效过虑网/PM2.5)、空调送回风软管供应及(铝箔软管／帆布软接头)、通风管道风阀类供应及(调节阀／止回阀／防火阀)、通风管道风管供应及(金属钢板风管／玻璃钢风管／玻镁复合风管)、空调水管供应及(焊接钢管／镀锌钢管／无缝钢管)、空调水系统阀门类供应及(闸阀／截止阀／调节阀／单向阀／排气阀／泄水阀)、空调水系统过虑器供应及(过虑器／排污阀)、空调水系统柔性接头供应及(金属软接头／橡胶软接头)、空调水系统仪表类供应及(压力表／温度表)、冷媒铜管供应及、保温材料供应及(橡塑保温／玻璃棉保温)、温度控制器供应及、喷淋头供应及、烟感探测器供应及、温感探测器供应及、可燃气体探测器供应及、消防栓供应及、消防广播供应及、声光报警器供应及、手动报警器供应及、消防模块供应及、防火门监控系统供应及、消防电源监控报警系统供应及、电气火灾报警系统供应及、早期烟雾报警系统供应及、气体灭火系统供应及、热水锅炉供应及、热水循环泵供应及、补水定压机组供应及、水管供应及(不锈钢管／铜管／镀锌管／PPR管／U-PVC 管)、水管保温供应(橡塑保温棉／玻璃棉保温)、洁具供应及、漏水报警系统、全自动提升泵供应及、热水器供应及、弱电布线(IT、AV、CCTV)、弱电面板(IT、AV、CCTV)、机房设备(IT、AV、CCTV)、智能系统布线、智能未端设备、智能控制面板、智能控制模块'
  },
  '局部小维修的环境控制': {
    trigger: '3天以下“维修”立项触发',
    check: '项目组及上级主管领导现场履职检查、环境周报评价、平台标准化日报检查、平台标准化检查团队现场巡检。',
    reference: '《环境管理手册》\n第四节 环境实施措施。',
    rules: [
      '小维修现场禁止任何时间内进行加工作业。',
      '小维修现场须使用效率高且噪声小的电动工具。',
      '小维修现场须采用低噪声的施工工艺和施工技术。',
      '严格控制现场使用稀释剂、有机溶剂，减少使用胶粘式工艺。',
      '禁止使用易挥发、易对人身健康/环境造成损害和污染的化学品和放射性材料。',
      '任何小维修材料使用完毕后及时封闭和撤离。',
      '小维修材料和工具必须集中摆放，且必须摆放在平台用于小型维修作业临边成品保护与防尘的1.5米 * 1.5米保护布之上，严禁材料和工具直接放在现场任何成品上。'
    ]
  },
  '材料控制': {
    trigger: '立项触发',
    check: '项目组及上级主管领导现场履职检查、环境周报评价、平台标准化日报检查、平台标准化检查团队现场巡检、材料进场报验验收。',
    reference: '《环境管理手册》\n第四节 环境实施措施。',
    rules: [
      '所有装饰材料进场前进行检查，检查内容包括合格证、质量检验报告及放射性指标、甲醛含量等检测报告，确保所有装饰材料满足《民用建筑工程室内环境污染控制规范》的相关要求。',
      '严格控制现场使用稀释剂和有机溶剂，尽量采用装配式的施工工艺，减少胶粘式施工工艺。',
      '禁止使用易挥发、易对人身健康/环境造成损害和污染的有害化工原料和放射性材料。',
      '施工中用到的化学材料应设立专门的存放场所，存放点应阴凉、通风、干燥。开启后应尽快投入使用，使用完毕后及时封闭和撤离。'
    ]
  },
  '现场排风机': {
    check: '项目组及上级主管领导现场履职检查、日报、环境周报评价、平台标准化日报检查、平台标准化检查团队现场巡检。',
    reference: '《环境管理手册》\n第四节 环境实施措施。',
    rules: [
      '所有装饰材料进场前进行检查，检查内容包括合格证、质量检验报告及放射性指标、甲醛含量等检测报告，确保所有装饰材料满足《民用建筑工程室内环境污染控制规范》的相关要求。',
      '严格控制现场使用稀释剂和有机溶剂，尽量采用装配式的施工工艺，减少胶粘式施工工艺。',
      '禁止使用易挥发、易对人身健康/环境造成损害和污染的有害化工原料和放射性材料。',
      '施工中用到的化学材料应设立专门的存放场所，存放点应阴凉、通风、干燥。开启后应尽快投入使用，使用完毕后及时封闭和撤离。'
    ],
    longTrigger: '石膏板天花、裸顶喷漆、天花乳胶漆、窗帘盒、投影幕盒、矿棉板天花、硅钙板天花、吸音板天花(聚酯纤维、竹木复合冲孔板、碳晶板等）、PVC、竹木纤维板天花、木饰面天花、石材复合板天花、石膏板隔墙、轻体隔墙砌筑、水泥板隔墙、卫生间隔断、夹心彩钢板隔断、轻质预制板隔断、板材隔墙、墙面乳胶漆、墙面木饰面、门及门套、墙面水泥砂浆找平、墙面石材、墙面吸音板(聚酯纤维、竹木复合冲孔板、碳晶板等）、墙面软包、墙面白板玻璃、墙面砖、墙面防火板、墙面护墙板、墙面踢脚（木制、PVC、金属、石材、瓷砖）、固定家俱、水泥漆、硅藻泥、马来漆、艺术漆等、地面石材、地面砖、地面垫层、地面防水(含墙面)、自流平、地坪漆、胶地板、地毯、木地板、架空地板、水磨石（现浇、块贴）、通风管道风管供应及(金属钢板风管／玻璃钢风管／玻镁复合风管)、空调水管供应及(焊接钢管／镀锌钢管／无缝钢管)、保温材料供应及(橡塑保温／玻璃棉保温)、喷淋头供应及、水管保温供应(橡塑保温棉／玻璃棉保温)'
  },
  // ================= 以下为新增的【安全管控】内容 =================
  '工地守则': {
    trigger: '立项触发',
    check: '项目组及上级主管领导现场履职检查、平台标准化检查团队现场巡检',
    reference: '《安全管理手册》\n第二节 安全标准与规范',
    rules: [
      '话语淫秽或辱骂他人；涉及种族、民族或性别歧视。',
      '行为粗鄙或不道德；性骚扰。',
      '未能执行项目的具体指令或规范。',
      '故意损毁、污损或滥用相关设施或他人财产。',
      '未经授权，私自从现场拿走设施、财物。',
      '使用移动平台、脚手架等登高作业工具,未经专门检查，无看护员，缺少警戒线设置。',
      '超过两米的高空作业不戴安全带或安全带不系挂。',
      '临近或在有危险能源的设备，系统上工作（如配电箱，变压器，带压管线上）不办理工作单及遵守上锁挂标签制度。',
      '使用篡改的或失效的文件（如篡改工作单，提供的证件或者证明资料过期等）。',
      '酒精饮料。',
      '违禁药物。',
      '打架或嬉闹。',
      '贿赂（索取或接受超出100元的财物）。',
      '如果发现任何个人持有酒精饮料和/或违禁药物，将立即被驱离工作现场。',
      '受到酒精、违禁药物或不正确使用处方药物影响的人员，将被驱离作业现场和项目。并且，在项目组规定的时期内，禁止再次进入。',
      '严格禁止所有人员在项目施工区域，在其管控范围内持有违禁药物，或者制造、销售、分发、购买、拥有、传送或使用此种药物。',
      '用别人的通行证或假冒的通行证/或使用访客证进行工作。',
      '禁止携带各类致命和非致命武器，但不包括用于施工作业的小型刀具以及其他手动、电动工具。'
    ]
  },
  '安全管理组织设立': {
    trigger: '7天以上工期项目触发',
    check: '上级主管领导现场履职检查。',
    reference: '《安全管理手册》\n第三节安全管理组织设立。',
    rules: [
      '安全管理是项目各参与方都必须参与的工作，保证了项目各参与方的利益。因此，项目各参与方都必须严格遵守安全管理规章制度。',
      '建立以项目组为现场安全保证体系第一责任人的安全生产领导小组。项目组全权负责，落实好日常安全管理工作，使各参与方理解安全管理规定并贯彻执行，并对实施情况进行跟踪控制。各参与方应保证日常各项安全生产措施的落实，确保所属各级人员严格遵守安全生产管理规定。',
      '根据项目的实际情况及特点，拟定本项目安全管理目标，制定安全保证计划、风险管控工作，并根据其内容做好人员及资源配置，以及后续的落实。'
    ]
  },
  '防护装备管理': {
    trigger: '立项触发',
    check: '项目组及上级主管领导现场履职检查、平台标准化检查团队现场巡检。',
    reference: '《安全管理手册》\n第四节 个人防护装备规定。',
    rules: [
      '安全防护用品的配置由项目各参与方根据工作需要自行购买配置，并由项目组监督发放到操作人。',
      '特种劳动保护用品必须在专门从事劳保用品生产经营的厂家或商家采购。',
      '安全帽、安全带、电工手套等安全防护用品必须具有齐全、合格的质量证明文件。',
      '特殊安全防护用品实行安全标志管理，安全防护用品合格标志包括安全防护用品合格证、安全标志（“LA”）和生产许可证。',
      '项目现场从业人员（师傅）佩戴的防护用品必须符合国家标准和行业标准，并不得超过使用期限。',
      '作业过程中必须按照安全生产规章制度和特种劳动用品使用规则，各级项目参建方必须对从业人员（师傅）进行培训，使其熟知其结构、性能、使用和维护保管方法，正确佩戴和使用安全防护用品，未按规定佩戴和使用安全防护用品者不得上岗作业。',
      '各级项目参建方应根据安全防护用品相关检验标准和使用说明书，定期对现场安全防护用品的使用情况进行检查，如发现不符合要求的应及时要求更换或报废。',
      '各级项目参与方的安全防护用品应由专人保管，并建立发放台帐，库存不足时应及时采购补充。'
    ]
  },
  '防护装备佩戴要求': {
    trigger: '立项触发',
    check: '项目组及上级主管领导现场履职检查、施工日报、安全周报评价、平台标准化日报检查、平台标准化检查团队现场巡检。',
    reference: '《安全管理手册》\n第四节 个人防护装备规定。',
    rules: [
      '参建方师傅在施工前应佩戴至少550防护级白棉防护手套，佩戴平台logo口罩，穿安全鞋，以确保施工安全。',
      '其它的防护用品，如鞋套、安全帽、防护眼镜、防护面罩、耳塞、耳罩、绝缘手套、绝缘鞋等安全防护装备，参建方师傅必须根据作业性质、作业条件等进行正确判断，并选择合适的防护用品正确佩戴/穿戴后方可进入施工区域。',
      '如果当地政府有强制条文规定防护装备佩戴要求，应按所在地规定执行。'
    ]
  },
  '着装要求': {
    trigger: '立项触发',
    check: '项目组及上级主管领导现场履职检查、施工日报、安全周报评价、平台标准化日报检查、平台标准化检查团队现场巡检。',
    reference: '《安全管理手册》\n第四节 个人防护装备规定。',
    rules: [
      '项目各参建方师傅进入施工区域时，应穿戴平台统一定制印有平台logo的工服、工帽、口罩，并且保持仪容仪表干净整洁，给客户留下良好的印象。',
      '维修类项目（1-2天）：佩戴平台统一定制的黄绿色工作帽，登高作业时需要佩戴安全帽，上身穿平台统一定制的反光绿色夹克装（春秋/冬季）、反光绿色T恤（夏季），下身穿平台统一定制的反光黑色工裤或非平台定制蓝色牛仔裤。佩戴550防护纯棉手套、平台白毛巾、平台logo口罩。',
      '维修及小改类项目（3-7天）：佩戴平台统一定制的黄绿色工作帽，登高作业时需要佩戴安全帽，上身穿平台统一定制的反光绿色夹克装（春秋/冬季）、反光绿色T恤（夏季），下身穿平台统一定制的反光黑色工裤或非平台定制蓝色牛仔裤。佩戴550防护纯棉手套、平台白毛巾、平台logo口罩。',
      '新建、改造类项目（7天以上）：统一佩戴黄色安全帽，上身穿平台统一定制的反光绿色夹克装（春秋/冬季）、反光绿色T恤（夏季），下身穿平台统一定制的反光黑色工裤或非平台定制蓝色牛仔裤，穿劳保鞋。佩戴550防护纯棉手套、平台白毛巾、平台logo口罩。'
    ]
  },
  '进场安全教育': {
    trigger: '立项触发',
    check: '项目组及上级主管领导现场履职检查、安全教育报告。',
    reference: '《安全管理手册》\n第五节 进场教育及安全培训',
    rules: [
      '精装/普装/机电/弱电智能化/特种作业的新建/改造项目项目各参建方师傅在开工前须在平台通过观看入场安全教育视频进行三级安全教育和入场培训。',
      '维修项目的师傅入场前须在平台通过观看入场安全教育视频进行二级安全教育。',
      '所有师傅完成入场教育和平台建立安全教育档案后还需参加安全教育考试。考试合格后方可入场作业并在平台内进行每日考勤（也可根据项目所在地管理部门/物业/业主的要求进行线下进场教育，并将安全教育的线下文件上传至平台工程项目管理菜单中的进场教育页面）。',
      '所有师傅均需在平台线上签署入场安全生产责任书。',
      '入场教育培训包含（但不仅限于）下列要点：\n1）国家的安全生产方针、政策。\n2）安全生产法则、标准和法制观念。\n3）施工过程及安全生产规章制度、安全纪律。\n4）近年发生的重大事故及应吸取的教训。\n5）发生事故后如何抢救伤员、排险、保护现场和及时进行。\n6）项目施工特点及现场的主要危险源分布。\n7）项目(包括施工、生产现场)安全生产制度、规定及安全常规知识、注意事项切割打磨作业。\n8）各工种的安全操作技术规程。\n9）高处作业、机械设备、电气安全基础知识。\n10）防护用品发放标准及防护用品、用具使用的基本知识。\n11）各班组作业特点及安全操作规程。\n12）各工种岗位作业环境及使用的机械设备、工具的安全要求。'
    ]
  },
  '专项作业安全培训': {
    trigger: '立项触发',
    check: '项目组及上级主管领导现场履职检查、安全周报评价、平台标准化日报检查、平台标准化检查团队现场巡检。',
    reference: '《安全管理手册》\n第五节 进场教育及安全培训。',
    rules: [
      '依据中国法规要求和现场特殊作业风险评估，项目各参建方必须确保所有施工师傅在进行专业性较强的工作及风险较高工作前均接受过合格的教育培训。',
      '专业安全教育培训包含(但不仅限于)下列要点：\n1）坠落防护(所有脚手架和幕墙施工人员强制受训)。\n2）挂牌上锁(在有能量意外释放可能的系统上工作的施工人员强制受训)。\n3）进入受限空间。\n4）脚手架使用者和搭架者。\n5）吊装作业。\n6）特殊工种（电工、焊工等）。\n7）拆除作业。\n8）项目各参建方安全管理人员培训。\n9）各岗位的操作规程。\n10）危险源的分布和控制。'
    ]
  },
  '每日班前安全注意事项会': {
    trigger: '立项触发',
    check: '项目组及上级主管领导现场履职检查、平台标准化检查团队现场巡检。',
    reference: '《安全管理手册》\n第五节 进场教育及安全培训。',
    rules: [
      '新建、改造的项目，项目参建方各班组长在开始工作前与班组内师傅进行10分钟岗前安全注意事项会，并拍摄带项目信息及日期的早班会照片上传至平台施工日报，由项目组查看及审核。',
      '维修的项目，参建方在开始前提醒和指导其维修师傅们在APP上在线学习岗前安全注意事项。',
      '项目组要经常关注、分析施工现场的安全问题，并定期发送“安全讨论主题”。这些主题应包括当前的安全问题、解决问题的措施、新的安全规定以及安全教育项目。',
      '项目组应定期参加班组安全会议，定期抽查师傅们在线岗前学习情况，表明其对安全计划的参与和支持。'
    ]
  },
  '每周安全培训会议': {
    trigger: '3天以上的工期项目触发',
    check: '项目组及上级主管领导现场履职检查、安全周报评价、平台标准化检查团队现场巡检。',
    reference: '《安全管理手册》\n第五节 进场教育及安全培训。',
    rules: [
      '一周以上精装/普装/机电/弱电智能化/特种作业的新建、改造项目，项目组必须每周举行安全培训会议。安全培训会议必须具体明确，且与施作内容相关。项目组项目主管主持安全培训会议应拍摄带项目信息及日期的会议照片上传至项目周报页面内。',
      '项目组区域经理将出席每周安全培训会议，以监控是否符合平台规定及确保其效率。项目组区域经理参加安全培训会议应拍摄带项目信息及日期的会议照片上传至并在工程项目管理菜单现场履职页面。',
      '项目各参建方负责人及其所有施工人员必须出席每周安全培训会议。'
    ]
  },
  '安全技术交底': {
    trigger: '立项触发',
    check: '项目组及上级主管领导现场履职检查、安全周报评价、平台标准化检查团队现场巡检',
    reference: '《安全管理手册》\n第六节  安全技术交底',
    rules: [
      '精装/普装/机电/弱电智能化/特种作业的新建/改造项目开工前，项目组应根据项目特点就安全方面的注意事项对项目各参建方师傅进行线上和线下相结合的安全技术交底。',
      '现场存在的汽车轮胎式起重机吊装作业、剪刀车登高作业、架子工登高作业、脚手架登高作业等危险性较大的施工活动，项目组除了需要在平台工程现场管理菜单安全技术交底页面对项目各参建方施工人员及平台师傅进行线上安全交底外，还必须进行线下安全交底，并由双方签字确认后将交底记录上传至平台安全技术交底页面后方可进行施工操作。',
      '一般情况下安全技术交底应包含以下内容及要求：\n1）安全交底的内容应针对现场施工作业给作业人员带来的潜在危险因素和存在问题。\n2）应优先采用新的安全技术措施。\n3）特殊作业安全技术措施。\n4）项目组必须监督服务商将工程概况、施工方法、施工程序、安全技术措施等向班组长进行详细交底。\n5）项目组必须监督服务商实行逐级安全技术交底制度，纵向延伸到班组全体作业人员。\n6）安全交底必须具体、明确、针对性强。\n7）定期向由两个以上工种或班组交叉施工的作业队伍进行书面交底。\n8）安全交底应由交底双方签字并留存。'
    ]
  },
  '安全巡查': {
    trigger: '立项触发',
    check: '项目组及上级主管领导现场履职检查、平台标准化检查团队现场巡检',
    reference: '《安全管理手册》\n第七节 安全巡查及安全隐患整改',
    rules: [
      '安全巡查的主要内容：安全巡查是现场施工中重要的安全管理手段，安全巡查主要内容为安全管理制度的执行情况，安全管理措施的制定与落实情况，重点部位及重点设施危险控制情况，员工的安全健康意识与安全健康行为能力情况，现场存在的其他安全隐患及问题。',
      '安全巡查的形式：主要通过经常性现场检查、节假日施工检查、平台安全日报检查等方式进行。',
      '安全巡查的人员：业主、项目主管领导、（大区）总监、（区域）经理。',
      '安全巡查要点：高风险环境，包括重点项目、重点部位、重点控制的危险源，事故高发、多发环境和区域等。高风险人员与工种，包括本人容易受到伤害和容易给他人造成伤害的施工人员和工种。'
    ]
  },
  '安全隐患整改': {
    trigger: '立项触发',
    check: '项目组及上级主管领导现场履职检查、安全周报评价、平台标准化检查团队现场巡检',
    reference: '《安全管理手册》\n第七节 安全巡查及安全隐患整改',
    rules: [
      '安全隐患整改是问题发现人将发现的问题及时通知到责任人，并由各方互相监督制定整改措施，确定整改责任人和整改完成时间、完成目标，整改完成后应由检查人员进行复查，如果问题普遍存在，应对工作方法进行改进，防止同类问题再次发生。',
      '安全隐患整改监管：项目主管/项目各参建方应根据平台短信/消息提示在平台工程项目管理菜单安全巡检页面查看问题隐患描述及照片、视频，根据问题隐患描述进行整改并将整改完成照片、视频上传，上传后由提出整改的业主、项目主管领导、（大区）总监、（区域）经理、项目主管在平台进行确认整改完成。',
      '各项目参建方应当高度重视，清醒地看到当前安全生产的严峻形势，把组织开展好安全生产巡查工作放在突出位置，要做到加强管理，精心组织、周密部署、确保整改工作落实到位。',
      '强化措施，务求实效，对巡查过程中发现的问题，能立即整改的应在第一时间完成整改，不能立即整改的，要督促落实，确保问题整改完成。',
      '增强员工安全意识，提高主动性和自觉性，积极参与安全管理工作。'
    ]
  },
  '安全日报': {
    trigger: '3天以下项目',
    check: '平台标准化日报检查',
    reference: '《安全管理手册》\n第九节 安全日报与周报',
    rules: [
      '新建、改造、维修的项目，项目各参建方每天应根据当日安全标准化检查内容和频次要求，拍摄带项目信息及日期的现场标准化实施图像、视频上传至平台标准化检查日报页面，由项目组/平台查看及审核。',
      '重要精装/普装/机电/弱电智能化/特种作业的新建、改造项目，需每天两次、每次间隔4小时检查现场安全标准化执行情况，并按上述1）将检查的图像、视频记录反馈给平台。',
      '确定为每日两检项目的平台指令由总包（大区）总监或区域经理在审核项目立项时根据项目特性发出。'
    ]
  },
  '安全与周报': {
    trigger: '3天以上项目',
    check: '项目组及上级主管领导安全周报评价、平台标准化日报检查',
    reference: '《安全管理手册》\n第九节 安全日报与周报',
    rules: [
      '新建、改造、维修的项目，项目各参建方每天应根据当日安全标准化检查内容和频次要求，拍摄带项目信息及日期的现场标准化实施图像、视频上传至平台标准化检查日报页面，由项目组/平台查看及审核。',
      '重要精装/普装/机电/弱电智能化/特种作业的新建、改造项目，需每天两次、每次间隔4小时检查现场安全标准化执行情况，并按上述1）将检查的图像、视频记录反馈给平台。',
      '确定为每日两检项目的平台指令由总包（大区）总监或区域经理在审核项目立项时根据项目特性发出。',
      '项目组必须按时完成安全周报，并在平台项目管理菜单内周报页面提交安全周报内容。编写安全周报时，应确保内容真实、准确、完整，语言简洁明了，以便于阅读和理解。同时，周报应作为安全管理的重要工具，用于持续改进和提升安全管理水平。安全周报的内容编写应包含以下几个关键部分：\n1）安全工作总结：概述本周内开展的安全活动、检查及整改情况，包括但不限于特殊作业类型、安全教育记录、隐患排查记录、应急演练（100万以上工程）记录等。\n2）安全检查与隐患排查：详细记录本周内进行的安全检查情况，包括检查的频率、发现的问题及整改措施，确保安全隐患得到及时处理。\n3）安全教育与培训：介绍本周内入场教育参与人数、专项教育参与人数、班前安全教育参与人数、安全技术交底参与人数并提交带项目信息及日期的教育/交底照片。\n4）不安全事件记录：记录本周内发生的不安全事件，包括事件原因、处理措施及结果，分析事件原因并提出预防措施。\n5）下周工作计划：提前规划下一周的安全活动，包括特殊作业类型、安全检查计划、培训安排、应急演练等，确保安全管理工作持续有效。\n6）其他重要事项：如有必要，可以包含其他与安全生产相关的信息，如政策法规变化、客户重要人物来访、新设备引进、即将进行的危险作业等。'
    ]
  },
  '高危作业技术方案编制与审批': {
    check: '大区总监/片区总监平台审批、项目组及上级主管领导现场履职检查',
    reference: '《安全管理手册》\n第十节 现场安全管理要求',
    rules: [
      '大区总监/片区总监应根据项目组提交的项目立项信息中涉及到的高危作业（起重机吊装作业、脚手架高空作业等），在平台工程项目管理菜单安全管理页面下发需要由项目组编制的专项技术方案指令。项目组根据指令编制专项技术方案后上传至安全管理页面，经大区总监/片区总监审核通过后方可进行现场作业。'
    ],
    longTrigger: '天花钢架(加固、转换层等)、钢架(加固、楼梯、基层等)、空调外机、外立面、幕墙清洗、维修、冷却塔供应'
  },
  '特种作业审批': {
    check: '大区总监/片区总监平台审批、项目组及上级主管领导现场履职检查',
    reference: '《安全管理手册》\n第十节 现场安全管理要求',
    rules: [
      '项目组在项目实施过程中，必须根据施工进度及现场实际情况在进行动火/切割等特殊工种作业前在平台工程项目管理菜单安全管理页面，向大区总监/片区总监提交动火/切割等特种作业申请，经大区总监/片区总监审核通过后方可进行现场作业。',
      '同时向业主、物业申请特种作业许可，并获得批准证明后方可进行现场作业。'
    ],
    longTrigger: '石膏板吊顶、软膜天花、天花钢架(加固、转换层等)、窗帘盒、投影幕盒、石膏板隔墙、轻体隔墙砌筑、水泥板隔墙、卫生间隔断、活动隔断、钢架隔断、墙面乳胶漆、墙面水泥砂浆找平、墙面吸音板、墙面软包、墙面白板玻璃、墙面镜子、墙面金属板、墙面木饰面、墙面石材、墙面砖、墙面壁纸、墙面防火板、墙面护墙板、墙面踢脚、固定家俱、门及门套、钢架(加固、楼梯、基层等)、钢架(加固、基层等)、成品灯箱、玻璃贴膜、标识、窗帘(卷帘、布帘、纱帘、隔帘)、吊顶拆除(含石膏板、矿棉板、金属板、玻璃板等各类材料吊顶)、钢架拆除(加固、楼梯、基层、转换层等)、石膏板隔墙拆除、轻体砌筑隔墙拆除、玻璃隔断拆除、成品隔断拆除、墙饰面拆除(木饰面、金属板、软包、吸音板、玻璃、镜子等)、基础拆除(含水泥、木板、石膏板或其它材质)、墙地面线管开槽拆除、高架地板拆除、门窗拆除'
  },
  '化学品作业审批': {
    check: '大区总监/片区总监平台审批、项目组及上级主管领导现场履职检查',
    reference: '《安全管理手册》\n第十节 现场安全管理要求',
    rules: [
      '项目组在项目实施过程中，必须根据施工进度及现场实际情况进行化学品作业前在平台工程项目管理菜单安全管理页面，向大区总监/片区总监/区域经理提交化学品作业申请，经大区总监/片区总监/区域经理审核通过后方可进行现场作业。'
    ],
    longTrigger: '裸顶喷漆、天花乳胶漆、墙面乳胶漆、保温、水泥漆、硅藻泥、马来漆、艺术漆等、保温材料供应及(橡塑保温/玻璃棉保温)、水管保温供应(橡塑保温棉/玻璃棉保温)、石材结晶'
  },
  '梯子的使用': {
    check: '项目组及上级主管领导现场履职检查、平台标准化日报检查、平台标准化检查团队现场巡检',
    reference: '《安全管理手册》\n第十节 现场安全管理要求',
    rules: [
      '所有在项目上使用的梯子均需是正规厂家生产的带有平台logo的黄色金属梯，施工现场严禁使用木梯，并按照中国国标《便携式金属梯安全要求》GB12142‐2007的规定使用梯子。',
      '1）项目各参建方必须具有梯子使用情况的检查机制。有缺陷的梯子必须注上标记，立即停止使用。\n2）便携式梯的底部必须防滑垫。梯子的底部置于稳固基础上，其顶部及底部周围无障碍物。\n3）梯子的横档处必须采用硬质链接片进行链接。\n4）梯子不得超出3米高，且只能作通道使用，但因为作业区进出限制，无法使用剪刀车或移动式工作平台的情况，方可使用2米限高梯子作业。\n5）人字梯的使用注意事项：\n（1）禁止使用人字梯的最高两级踏板。\n（2）除非门上锁或有人监看，否则人字梯不得放置在门向开往人字梯的地方。\n（3）使用人字梯时，永远是二人一组，一人在梯子上，另一人在地面扶稳梯子。\n（4）禁止使用梯子搬运物料上下。\n（5）导电的梯子，例如金属类梯子，不得在带电的电缆、桥架附近使用，以及在电气室或机柜内使用。\n（6）每次使用前和每月例行检查梯子是否损坏。禁止使用损坏的梯子，而且要清离现场。严禁人站在梯子上骑行。'
    ],
    longTrigger: '石膏板吊顶、软膜天花、裸顶喷漆、天花乳胶漆、天花钢架(加固、转换层等)、窗帘盒、投影幕盒、石膏板隔墙、轻体隔墙砌筑、水泥板隔墙、玻璃隔墙、卫生间隔断、活动隔断、钢架隔断、墙面乳胶漆、墙面水泥砂浆找平、墙面吸音板、墙面软包、墙面白板玻璃、墙面镜子'
  },
  '消防管理': {
    trigger: '3天以上项目触发',
    check: '项目组及上级主管领导现场履职检查、平台标准化日报检查、平台标准化检查团队现场巡检',
    reference: '《安全管理手册》\n第十节 现场安全管理要求',
    rules: [
      '现场一些要求防火的区域必须悬挂“严禁烟火”的标志，并严禁任何人在这些区域吸烟！',
      '所有施工参与方人员应接受火灾警报和疏散程序的教育。',
      '现场及周边任何区域禁止抽烟。',
      '现场张贴逃生指示图，并要求所有人员需要逃生方向。',
      '施工如动火作业，应依规定单独额外配备灭火器。对于现场特定地点安置以供紧急之用的灭火器，任何人员不得搬移。',
      '肮脏和油腻布料应放入自动关闭盖且有防火标志的金属容器内，并且每日清离工区。',
      '不论任何情况，紧急逃生门、电气或电梯箱、灭火器或其它紧急设备的通道皆不得阻塞。',
      '临时性的建筑物、仓库以及正在修建的建（构）筑物，都应该设置适当种类和数量的灭火工具。消防设备和灭火工具，要布置在明显和便于取用的地点。现场消防重点部位应增加灭火器材如：仓库、电箱位置、可燃材料、办公室等。',
      '可燃材料集中存放，并把每天产生的可燃垃圾及时清理。'
    ]
  },
  '安全用电': {
    trigger: '立项触发',
    check: '项目组及上级主管领导现场履职检查、平台标准化日报检查、平台标准化检查团队现场巡检',
    reference: '《安全管理手册》\n第十节 现场安全管理要求',
    rules: [
      '一、用电管理\n1）临时用电设备在5台以上或设备总容量在50KW及以上的，应编制临时用电方案。\n2）临时用电设备在5台以下和设备总容量在50KW 以下的，应制定安全用电技术措施和电气防火措施。\n3）安装、维修或拆除临时用电工程，必须由持证电工完成。\n4）现场所有临时用电的维修、接线和拆线必须由持证电工完成，其他任何人都无权做此项操作。服务商及接单师傅必须按照有关规定为电工配备劳动防护用品和电工工具，并应配齐万用表、兆欧表、接地电阻测试仪、漏电保护器检测仪。',
      '二、接地保护\n1）电机、电器、照明器具、手持电动工具、配电箱的金属外壳必须设置接地保护。',
      '三、配电线路\n1）施工现场必须采用 TN‐S系统配电，即三相五线制配电。严禁使用四芯电缆外加一根电缆替代五芯电缆。\n2）按照中国国标《施工现场临时用电安全技术规范》JGJ46—2005，现场电缆应符合要求。\n3）总配电箱（配电柜）至分配电箱必须使用五芯电缆。\n4）分配电箱至开关箱与开关箱至用电设备的相数和线数应保持一致。动力与照明分别设置时，三相设备线路可采用四芯电缆，单相设备和一般照明线路可采用三芯电缆。\n5）电缆不能老化、破皮，电缆过通路时须采取保护措施。\n6）电缆必须做好绝缘架空或埋地敷设。',
      '四、配电箱、开关箱\n1）严格做到“三级配电，两级漏电保护”，严格做到“一机一闸，一漏一箱”。 开关箱内必须有漏电开关。\n2）总配电箱、分配电箱的每个回路须安装隔离开关。\n3）动力配电箱与照明配电箱宜分别设置。当合并设置为同一配电箱时，动力和照明应分路配电；动力开关箱和照明开关箱必须分设。\n4）总配电箱中漏电保护器的额定漏电动作电流应大于30mA，额定漏电动作时间应大于0.1s，但其额定漏电动作电流与额定漏电动作时间的乘积不应大于30mA·s。\n5）开关箱的漏电保护器的额定漏电动作电流不应大于30mA， 额定漏电动作时间不应大于0.1s。\n6）电箱内电气元件应完好无损。\n7）配电箱内多路配电应有清晰的标记。\n8）电箱应有门、有锁、安装在室外的配电箱要有防雨措施。\n9）分配电箱与开关箱的距离不得超过30m，开关箱与其控制的固定式用电设备的水平距离不宜超过 3m。\n10）对配电箱、开关箱进行定期维修、检查时，必须将其前一级相应的电源隔离开关分闸断电，并悬挂“禁止合闸、有人工作”停电标志牌，严禁带电作业。\n11）所有插座必须使用防水等级在防护等级IP44级以上的工业插座。',
      '五、配电箱的维护\n1）进入项目现场的配电箱、开关箱应有名称、用途、分路标记及系统接线图，在进场检查时张贴检查合格标签。\n2）总配电箱及室外的二级配电箱全部搭设设门锁进行锁闭。\n3）专职电工进行日常管理。\n4）漏电保护器每天使用前应启动漏电试验按钮试跳一次，不正常时严禁继续使用。\n5）配电箱旁要放置足量的干粉灭火器，并定期检查。',
      '六、现场照明\n1）一般场所选用额定电压为220V的照明专用回路。照明专用回路须装有漏电保护器，灯具金属外壳作保护接零。室内灯具装设不得低于2.4m，室外灯具距地面不得低于3m。\n2）所有的临时照明灯具都应为带有防护罩的灯具。\n3）所有的灯具和电缆应架空或利用吊杆固定在天花上。\n4）在地下室潮湿地区或当地政府、业主、客户有要求现场照明必须采用36V的需按照以下措施：\n(1).必须使用36V低压照明并设立单独电源箱。照明线路不能拴在金属脚手架、龙门架上。灯具实在需要安装在金属脚手架、龙门架上时，线路和灯具必须用绝缘物与其隔离开。\n(2).使用36V高光效、长寿命的节能照明光源及LED灯带，不得使用绝缘老化或破损的照明器材。'
    ]
  },
  '安全带使用': {
    check: '项目组及上级主管领导现场履职检查、平台标准化日报检查、平台标准化检查团队现场巡检',
    reference: '《安全管理手册》\n第十节 现场安全管理要求',
    rules: [
      '平台各类订单服务过程中如有高处作业，必须佩戴安全带。',
      '安全带必须为合格的五点式安全带。',
      '安全带应高挂抵用，并注意防止摆动碰撞。',
      '禁止将安全绳用作悬吊绳。',
      '安全带严禁擅自接长使用，不得随意拆除安全带各部件。',
      '安全绳的长度应为1.5~2m，使用3m以上安全绳应增加缓冲器，不准将绳打结使用。',
      '频繁使用的安全绳，应定期进行检查，发现异常时应提前报废。'
    ],
    longTrigger: '石膏板吊顶、软膜天花、裸顶喷漆、天花乳胶漆、天花钢架(加固、转换层等)、窗帘盒、投影幕盒、成品灯箱、标识、强弱电管槽、电线电缆、灯具、应急电源、空调内机、空调外机、排风机、新风机、净化机、管道、风道、保温、风口、空调控制线、喷淋改造、烟感改造、消防栓改造、消防广播改造、联动未端设备改造、水管、弱电布线(IT、AV、CCTV）、智能系统布线、智能未端设备、智能控制面板、智能控制模块、电气管槽拆除、灯具拆除、电线电缆拆除、电箱拆除、空调设备拆除、空调楼顶设备拆除、空调管道拆除、水管道拆除、消防联动设备拆除、弱电智能线缆拆除、智能未端设备、办公室常规巡检、灯具更换、幕墙清洗、外立面维修、电梯检修、气体灭火、铝格栅、铝板吊顶、矿棉板天花、硅钙板天花、钢丝网天花、吸音板天花(聚酯纤维、竹木复合冲孔板、碳晶板等)、不锈钢板天花、PVC、竹木纤维板天花、玻璃、镜子天花、木饰面天花、石材复合板天花、遮阳帘天花、防火挡烟垂壁、电线电缆供应及、灯具供应及、应急电源、风机盘管供应及、VRV空调设备供应及、VAV BOX供应及、AHU供应及、机房精密空调供应及安装、新风机供应及、排风机供应及、水泵供应及、冷却塔供应及、冷水机组供应及、热水锅炉供应及、空调百叶风口类供应及(送风口/回风口/防雨百叶)、空调风系统过虑净化器供应及(初/中效过虑网)、空调送回风软管供应及(铝箔软管/帆布软接头)、通风管道风阀类供应及(调节阀/止回阀/防火阀)、通风管道风管供应及(金属钢板风管/玻璃钢风管/玻镁复合风管)、空调水管供应及(焊接钢管/镀锌钢管/无缝钢管)、空调水系统阀门类供应及(闸阀/截止阀/调节阀/单向阀/排气阀/泄水阀)、空调水系统过虚器供应及(过虚器/排污阀)、空调水系统柔性接头供应及(金属软接头/橡胶软接头)、空调水系统仪表类供应及(压力表/温度表)、冷媒铜管供应及、保温材料供应及(橡塑保温/玻璃棉保温)、喷淋头供应及、烟感探测器供应及、温感探测器供应及、可燃气体探测器供应及、消防栓供应及、消防广播供应及、声光报警器供应及、手动报警器供应及、消防模块供应及、防火门监控系统供应及、消防电源监控报警系统供应及、电气火灾报警系统供应及安装、早期烟雾报警系统供应及、气体灭火系统供应及、水管供应及(不锈钢管/铜管/镀锌管/PPR管/U-PVC 管)、水管保温供应(橡塑保温棉/玻璃棉保温)、雨棚、遮阳棚、强弱管槽维护检修、电线电缆检查维护、配电箱检查维护、控制电箱检查维护、灯具检查维护、全自动提升泵检查维护、应急电源检查维护、消防排烟设备拆除、应急照明灯、疏散指示标识、应急电源、调试与连接、通讯设备、播放器与调试、显示设备与调试、控制设备与调试、音频线缆与调试、灯光控制台与调试、调光设备与调试、特效设备与调试、智能控制系统与调试、智能系统布线、智能未端设备与调试、智能控制面板与调试、智能控制模版与调试'
  },
  '孔洞防护': {
    check: '项目组及上级主管领导现场履职检查、平台标准化日报检查、平台标准化检查团队现场巡检',
    reference: '《安全管理手册》\n第十节 现场安全管理要求',
    rules: [
      '浇筑混凝土后，所有地板孔洞必须有结实的覆盖防止人员或材料掉落。覆盖的结构应使它们不存在绊倒危险。',
      '所有洞盖子都要固定牢靠（螺丝或螺钉拧紧，而不是钉住），以防止脱落或者被轻易移动。',
      '孔盖上应喷有“下有洞，危险”的字样，或工地根据实际情况确定用何种语言书写。',
      '硬式的边缘围护应为上栏杆在1000mm—1200mm之间，中栏杆在上栏杆高度的一半，和(至少有)150mm 的踢脚板。',
      '在混凝土楼板开孔或是切开钢筋网之前，工作许可证必须得到项目主管的批准后方可开始工作。',
      '所有孔洞保护设施都要在每周一次的工地检查中接受检查。不符合的状况和所采取的行动都必须加以纪录。'
    ],
    longTrigger: '天花钢架(加固、转换层、钢架(加固、楼梯、基层、地面垫层、地面防水(含墙面)、钢架(加固、基层等)、钢架拆除(加固、楼梯、基层、转换层等)、基础拆除(含水泥、木板、石青板或其它材质)、墙地面线管开槽拆除、强弱电管槽、管道、消防栓改造、水管、电气管槽拆除、水管道拆除、强弱电管槽、空调水管供应及(焊接钢管镀锌钢管/无缝钢管)、消防栓供应及、水管供应及(不锈钢管/铜管/镀锌管/PPR管/U-PVC 管)'
  },
  '起重吊装要求': {
    check: '项目组及上级主管领导现场履职检查、平台标准化日报检查、平台标准化检查团队现场巡检',
    reference: '《安全管理手册》\n第十节 现场安全管理要求',
    rules: [
      '任何使用吊车进行吊装作业前，项目组应编制安全施工方案并提交平台的安全管理页面，经大区总监/片区总监审核通过后方可进行现场作业。',
      '一、移动吊车\n1）所有的移动吊车第一次进入现场时，必须向项目经理（或安全人员）报告。每个吊车必须具有“年检合格证”，才能进入现场。\n2）吊车需配备过载警报器。\n3）只有经过培训并取得操作许可证的吊车操作员和指挥员方可担任指挥操作工作。\n4）所有吊车司机及操作人员必须经项目部教育培训后才能进入现场操作，教育培训的程序由安全主管实施。\n5）所有吊车司机及操作人员的个人防护用品应该和现场的规定一致。\n6）小心高空电线或者吊车的高空轨道。吊车的任何部分都不能靠近电力设备处工作。',
      '二、起重吊装\n1）起重吊装工作前，须办理工作许可证，并将其张贴在吊装区域附近的显著位置吊装区域围护，严禁无关人员进入。\n2）只有经授权人员才能进入起重吊装区。\n3）必须使用溜绳来控制吊物摆动。\n4）吊装前须确保机械处于良好正常状态，确保钢丝绳、链条完好无损。\n5）吊装时必须保持良好的光线，确保安全装置能正常使用。\n6）在吊重的、高的或大半径的货物前，在项目组彻底检查了服务商的现场安全措施与专项技术方案一致并批准后，服务商才可进行货物的吊运。\n7）当现场周围和/ 或在桥或别的结构下有移动设备时，必须尤其注意，防止对人员和交通 工具等造成危险。\n8）操作前设备检查，操作时遵守操作规程。如起重“十不吊”规定：\n（1）起重臂和吊起的重物下面有人停留或行走不准吊。\n（2）起重指挥应由技术培训合格的专职人员担任，无指挥或信号不清不准吊。\n（3）起重指挥应由技术培训合格的专职人员担任，无指挥或信号不清不准吊。\n（4）带棱角快口物件尚未垫好（防止钢丝绳磨损或割断）不准吊。\n（5）吊物上站人或吊物上浮放有活动物件的不准吊。\n（6）拉斜挂不准吊。\n（7）吊物埋在地下的物体不准吊。\n（8）超过额定负荷不准吊。 \n（9）吊物重量不明，吊索具不符合规定不准吊。\n（10）恶劣天气或六级以上强风不准吊。'
    ],
    longTrigger: '空调外机、水泵供应及、冷却塔供应及、热水锅炉供应及'
  },
  '高空作业': {
    check: '项目组及上级主管领导现场履职检查、平台标准化日报检查、平台标准化检查团队现场巡检',
    reference: '《安全管理手册》\n第十节 现场安全管理要求',
    rules: [
      '一、人员管理\n1）所有高空作业人员必须经过专业培训，并取得高空作业操作证，严禁无证上岗。\n2）高空作业者必须身体健康，无高血压、心脏病、癫痫等不适合高空作业的疾病。\n3）作业前必须对所有高空作业人员进行安全技术交底，明确作业内容、危险源、安全措施和应急处理方法。\n4）严格按照平台标准，正确佩戴和使用合格的安全帽、安全带、防滑鞋等个人防护用品。\n5）严禁酒后作业、疲劳作业、冒险作业，作业过程中严禁嬉戏打闹。',
      '二、现场管理\n1）在高空作业区域设置明显的安全警戒线、警示标志，禁止无关人员进入作业区域。\n2）作业中涉及脚手架、吊兰等作业平台，必须有专业人员搭设，经验收合格后方可使用。\n3）高空作业时使用的材料、工具必须妥善放置，防止坠落伤人。\n4）密切关注天气变化，如遇大风、大雾、暴雨、等恶劣天气，应立即停止作业。\n5）制定高空作业应急预案，配备必要的应急救援器材。\n6）指定专职安全员负责高空作业的安全监督及管理工作。\n7）加强对高空作业现场的日常巡查，及时发现并消除安全隐患。\n8）作业结束后及时清理现场，确保现场干净、整洁。'
    ],
    longTrigger: '石青板吊顶、软膜天花、裸顶喷漆、天花乳胶漆、天花钢架(加固、转换层等)、裔帘盒、投影幕盒、石膏板隔墙、轻体隔墙砌筑、水泥板隔墙、玻璃隔墙、卫生间隔断、活动隔断、钢架隔断、墙面乳胶漆、墙面水泥砂浆找平、石膏板隔墙拆除、轻体砌筑隔墙拆除、玻璃隔断拆除、成品隔断拆除、墙饰面拆除(木饰面、金属板、软包、吸音板、玻璃、镜子等)、基础拆除(含水泥、木板石青板或其它材质)、高架地板拆除、配电箱(含改造)、强弱电管槽、电线电缆、灯具、应急电源、空调内机、空调外机、排风机、新风机'
  },
  '电焊气割作业': {
    check: '项目组及上级主管领导现场履职检查、平台标准化日报检查、平台标准化检查团队现场巡检',
    reference: '《安全管理手册》\n第十节 现场安全管理要求',
    rules: [
      '电焊、气割作业必须由持证电焊工完成。',
      '进行电焊、气割等动火作业前项目组必须在平台安全管理页面提交申请，经大区总监/片区总监通过后，并得到业主方许可证后才能进行动火作业，动火许可证必须张贴在动火区域的显著位置。',
      '电焊、气割作业前，必须清理该区域的易燃物。在任何有易燃物的工作区域内必须始终保持清洁，在工作完成后必须进行彻底的检查，确保任何易燃材料残留在现场上或者确保没有任何会造成火灾或事故的条件存在。',
      '如果热铁或火星会溅到人行道、无法移走的易燃区域、电缆梯子、电设备上，那么就不可在这些地点进行焊接和切割。在焊接和切割开始之前，应先放置好防火毯(如石棉布)，以免热铁或火星溅出。尤其要注意在电缆上工作是必须充分盖好。',
      '电焊或气割区域（包括其他防火区域）必须按规定配置符合要求的灭火器。',
      '进行电焊及气割工作时应提供不燃或阻燃材料的屏蔽，保护员工不受直接光辐射影响。',
      '焊把或焊枪应保持良好状态，当无人照看时，电焊条应从焊把上取下，焊把应放好，不使电极接触到人或导体。',
      '所有的电焊线应妥善保管，并且完全绝缘。焊把3米内应无修补，除非搭接绝缘与电缆一致。有缺陷的电缆应予以修补或替换。接地电缆应尽可能与工作场所连接。',
      '乙炔软管与氧气软管应为批准的类型，易于辨认，不应互换。每日工作前应对软管进行检查，如有缺陷应予以修补或替换。',
      '应提供使用适当保护设施防止对人员造成伤害。',
      '高处作业、受限空间内和其它危险区域的动火作业如电焊、气割，必须配置专职的监护人员。',
      '电焊作业必须穿戴好防护服和防护面罩。',
      '气割作业人员应戴好防护眼镜。',
      '现场氧气、乙炔（或丙烷）的管理。',
      '所有氧气、乙炔、丙烷、液化石油气、氮气、二氧化碳气罐必须垂直使用和贮存，并保证不翻倒。',
      '氧气瓶与乙炔瓶使用时要保持5米以上的距离，与明火的距离相距10米以上。',
      '确保氧气乙炔皮管有回火防止装置，防止回火至瓶，检查是否有漏气时决不能使用明火。',
      '氧气存储不应离乙炔或任何气体压缩易燃气体或液体罐太靠近。当需要把罐子从一地移至另一地时，应确保没有损害或处置不当。如果罐子移动时没有适应的卡车或推车，关闭阀门，卸掉调节阀。不能利用磁盘吊车运输气罐。不要使用钢吊索。即使清楚表明罐子是空的也决不能让气罐在地上滚动。',
      '确保气罐不和电路接触，如电焊线。',
      '施工完成后，气罐、软管和设备必须移出工作区域或者通道，避免危及人员安全或者造成任何障碍。',
      '在受限空间内使用气罐和设备之前，必须彻底检查是否有损坏和漏气。如有可能，气罐必须放置在受限空间外。如果气罐放置一段时间不用，应确保不漏气，不会造成伤害或火灾。'
    ],
    longTrigger: '天花钢架(加固、转换层等)、活动隔断、钢架隔断、钢架(加固、楼梯、基层、钢架(加固、基层等)、空调水管供应及(焊接钢管镀锌钢管/无缝钢管)、夹心彩钢隔断、电动移门、手动移门'
  },
  '围护、作业公告牌及警示标识': {
    trigger: '3天以上项目触发',
    check: '项目组及上级主管领导现场履职检查平台标准化日报检查、平台标准化检查团队现场巡检',
    reference: '《安全管理手册》\n第十节 现场安全管理要求',
    rules: [
      '一、危险施工区域围护、作业公告牌、安全警示标识的要求\n围护、作业公告牌、安全警示标识对项目现场安全控制十分重要，其提醒人们意识到潜在风险，从而避免人员伤害及财产损坏。项目组、项目各参建方必须做到：\n1）项目各参建方工程施工开工前应该负责规划必要的围护、安全警示带、作业公告牌和安全警示标识，为现场人员提供安全保障措施。\n2）相关项目参建方应该环绕开挖区域、公共设施检修孔、地板开口、屋顶、高架平台、某些类型的高处作业区，设置符合标准的硬式围护、安全警示带、作业公告牌、安全警示标识，提示人们防范坠落或其它危险。硬式的边缘围护应为上栏杆在1000mm—1200mm之间，中栏杆在上栏杆高度的一半，和(至少有)150mm 的踢脚板。\n3）在禁止进入的区域，应该使用安全警示带进行封闭围护，并设置“危险！禁止进入！”警示标识。任何人未经许可不得进入采用警示标识牌/安全警示带封闭的任何区域。安全警示带采用可伸缩1米隔离带。\n4）危险作业区域应该考虑沿着围护，设置适当的照明和警示标识，提醒人们注意交通安全。\n5）一旦发现风险存在，计划和操作此项工作的人员应负责放置适当的警告标识来警告操作人员和在临近作业区域工作的人员危险的存在。\n6）如果作业区域存在危险并且需要避免无关人员接近该区域，则将设立安全警示带。例如，如果需要空中作业，并且可能会发生物体跌落，则作业区域下方应设置安全警示带封锁该区域。\n7）负责设置安全警示带的人员应确保警示带能够完全覆盖危险区域。\n8）当设置安全警示带时，应考虑提供给其他人员到达现场其它作业区域的紧急、进出通道。如果没有紧急通道，应有另外的工作人员在警示带旁保护现场，叫停施工，指引其他人员通过危险区域。当施工结束并且工作区域已经安全，负责设置警示带的人员应负责将其解除。\n9）对于现场用电设备，必须有明确标识是否在维修或可以正常使用。\n10）对于现场搭设的脚手架必须有明确标识是否已通过安全部门检查许可。',
      '二、作业公告牌和警示标识的设置要求\n1）作业公告牌和警示标识采用平台统一模板，位置应设立在醒目、明亮的地方，有足够的时间来注意它表示的内容。公告牌和警示标识的平面与视线夹角应接近90°，观察者最大观看距离时，最小夹角不得低于75°；不得放在移动物体上，公告牌和警示标识前不得有障碍物；多个公告牌和警示标识在一起设置时，应按警告、禁止、指令、提示类型的顺序，先左后右、先上后下的原则排列。\n2）如果客户有特殊要求，需根据客户要求调整。',
      '三、警示标识的内容要求\n施工过程中，一定程度的危险是不可避免的。对于存在危险的地方和危险的行为，必须使用足够的警示标识警告进入施工场地的人员。这些警示标识应包括人身防护设备的要求、危险警告、紧急逃生路线等。除文字外，这些警示标识应包含图形来传达警告信息，特别是对于孔洞，高空作业，脚手架等特别危险的作业区域。警示标识应该包括：\n1）现场入口处应粘贴九牌一图。\n2）现场明显处都应粘贴佩戴安全防护设备标识。\n3）现场配电箱都应粘贴当心触电标识，及电箱看管人姓名及联系方式。\n4）办公室及库房等独立区域、敞开区间隔15m都应粘贴禁止吸烟的标识。\n5）灭火器固定点应粘贴消防器材禁止移动的标识。\n6）高空作业区应粘贴当心坠落及高空作业必须佩带安全带的标识。\n7）配电房等重要设备间施工时应挂牌“施工中，非专业人员禁止入内”。\n8）结合现场施工环境与施工内容情况张贴和放置平台标准的适当警示标识。'
    ]
  },
  '文明施工': {
    trigger: '立项触发',
    check: '项目组及上级主管领导现场履职检查、平台标准化日报检查、平台标准化检查团队现场巡检',
    reference: '《安全管理手册》\n第十节 现场安全管理要求',
    rules: [
      '1）项目各参建方应该在新建、改造、拆迁、维修过程中，在所有的支持区域和作业区域保持整洁。',
      '2）项目各参建方的师傅必须保持通道和作业区域整洁，不存在障碍物和碎屑。',
      '3）通道不得存在绳索或钢丝绳，以避免绊倒行人。',
      '4）在施工过程中，应该每天清除可燃废料、杂物、垃圾和非必要化学品。',
      '5）作业区域、通道和楼梯内不得存在带有突出钉子的木材、木材碎片以及其他杂物。',
      '6）每个班次结束之前进行现场清理。',
      '7）持续控制粉尘，持续进行地面除尘、设备设施面层除尘、成品面层除尘工作（新建、改造的项目须设专人负责持续除尘工作）。',
      '8）在批准的适当容器中处理所有的垃圾，包括废油漆、废溶剂、废机油等。含油的抹布必须在防火容器中进行处理。',
      '9）妥善布置电源延长线、电缆和软管，以尽量降低绊倒风险。',
      '10）堆垛材料应该远离围栏。 应该保证在堆垛倾倒的情况下，不会有任何物品越过围栏，以免伤及围栏外面的人员。',
      '11）施工区域入口处要张贴施工铭牌（平台标准模板），施工区域内要张贴平台安全警示牌和标识（平台标准模板）。',
      '12）施工区域内根据项目情况设置警示带以区分材料、废料、成品及其它必要的区域。',
      '13）移动电箱与电动工具末端接驳口采用防爆插口，较大型项目二级电箱也采用防爆插口与移动电箱接驳。',
      '14）高空作业（超过2米）时，需采用门式脚手架、移动式平台、盘扣式脚手架作业，且作业人员必须要佩戴五点式双沟带缓冲式的安全带。'
    ]
  },
  '材料运输': {
    trigger: '3天以上工期项目触发',
    check: '现场履职及现场巡检检查及标准化日报检查',
    reference: '《安全管理手册》\n第十节 现场安全管理要求',
    rules: [
      '一、车辆进场要求\n1）机动车停车必须停在指定停车位或卸货位，严禁占用通道。\n2）机动车驾驶员必须拥有与所驾车型匹配的驾驶证件，离开驾驶室必须关闭发动机。\n3）园区/现场内限速10km/h。\n4）车辆必须遵守现场安全指导，严禁各类不服从管理的行为。\n5）禁止载运过重、过长、过高物品。\n6）如有过重材料运输，事先向物业了解路面承重系数。\n7）超园区路面承载的货物需分次运输进入园区，或在园区外卸货分批搬运。\n8）做好园区/楼内/工区路面地面保护工作。',
      '二、卸货管控\n1）装卸产品及各种材料时，应先检查跳板的牢固性，然后才能工作。\n2）装卸时，应先清理周围的多余物资。若跳板坡度大应铺设防滑材料或钉板条，以保证操作者安全。\n3）卸货时，面对已选定的卸货地点，工作人员应曲膝缓慢降低货物。\n4）卸货时，搬运人员需先将手指从底部移开，再将货物放在存放处边缘，慢慢推进。',
      '三、人员搬运要求\n1）搬运特大重物时，必须先了解物件的重量、形状及所需搬运的方法，防止因搬运方法不当造成人身事故。\n2）两人抬运过重的物品时，物品不得超过50公斤，以防造成扭伤事故。\n3）搬运货物超过20公斤时，必须借助叉车、铰链等机械辅助。\n4）抬起和搬运货物时，搬运工需曲膝但不可弯腰。\n5）抬起和搬运货物时搬运工需将货物紧靠身体以便更好用力，减少扭伤。\n6）抬起货物时应该借助腿部力量将货物抬起。\n7）搬运货物时搬运工应能看见前方，放慢步伐。\n8）搬运货物时一般严禁搬运工转身，如果必须改变方向时，应先移开脚。',
      '四、材料堆放材料储存\n1）材料必须在指定区域合理堆放，并设置警示标识。材料底部应当干净。\n2）材料堆放时一定要防止倒塌。堆放高度不能大于1.2米。\n3）敏感原料必须放置在有警示标识的限制空间内。危险材料必须放置在指定仓库。\n4）易燃材料周围应放置足够的灭火器。\n5）原料的包装是其最后一道防线，因此，直到最后安装时才能拆去原料包装。'
    ]
  },
  '现场接收': {
    trigger: '3天以上工期项目触发',
    check: '项目组及上级主管领导现场履职检查、平台标准化检查团队现场巡检',
    reference: '《安全管理手册》\n第十节 现场安全管理要求',
    rules: [
      '1）现场接收查验时揭开地面装饰物如地毯，对施工现场结构地面进行仔细检查，发现之前施工遗留的楼板孔洞必须在作业前修补好。',
      '2）所有孔洞都要固定牢靠，以防止脱落或者被轻易移动。',
      '3）孔洞区域应张贴“小心洞口、严禁踩踏”等相关标识。',
      '4）仔细检查现场遗留的电线/电缆是否出现磨损、损伤、绝缘，或者是否出现裸露电线。发现此类情况及时安排电工进行处理，保证施工环境安全。',
      '5）现场接收单中须详细记录安全隐患，须接收各方签字确认，现场接收单须上传平台。'
    ]
  },
  '移动脚手架使用要求': {
    check: '项目组及上级主管领导现场履职检查、平台标准化日报检查、平台标准化检查团队现场巡检',
    reference: '《环境健康管理手册》\n第十节 现场安全管理要求',
    rules: [
      '1）.超过2米高的移动脚手架宽度不小于900mm和长度不小于1700mm；或者宽度不小于900mm和面积不小于1.8m2。',
      '2）.移动脚手架的高度和底面窄边的宽度比一般不超过3:1。',
      '3）.移动脚手架高度不超过5米，超过5米高的移动脚手架必须经项目组和服务商共同验收通过，并挂牌使用。否则禁止在现场使用此类移动脚手架。',
      '4）.如果移动脚手架装有轮子，轮子应该有抱闸装置，而且移动脚手架被移动到施工位置时，刹车应该被刹住。',
      '5）.移动脚手架，上部操作平台必须有防护栏杆，防护栏杆约1.2米高。',
      '6）.特别强调，当移动超过2米高的移动脚手架时，脚手架上不能有任何材料、工具等无物品，尤其是不能有人在脚手架上就移动脚手架。',
      '7）工作在超过 2米高的移动脚手架上时应该戴好安全带。'
    ],
    longTrigger: '石膏板吊顶、软膜天花、裸顶喷漆、天花乳胶漆、天花钢架(加固、转换层等)、窗帘盒、投影幕盒、成品灯箱、标识、强弱电管槽、电线电缆、灯具、应急电源、空调内机、空调外机、排风机、新风机、净化机、管道、风道、保温、风口、空调控制线、喷淋改造、烟感改造、消防栓改造、消防广播改造、联动未端设备改造、水管、弱电布线(IT、AV、CCTV）、智能系统布线、智能未端设备、智能控制面板、智能控制模块、电气管槽拆除、灯具拆除、电线电缆拆除、电箱拆除、空调设备拆除、空调楼顶设备拆除、空调管道拆除、水管道拆除、消防联动设备拆除、弱电智能线缆拆除、智能未端设备、办公室常规巡检、灯具更换、幕墙清洗、外立面维修、电梯检修、气体灭火、铝格栅、铝板吊顶、矿棉板天花、硅钙板天花、钢丝网天花、吸音板天花(聚酯纤维、竹木复合冲孔板、碳晶板等)、不锈钢板天花、PVC、竹木纤维板天花、玻璃、镜子天花、木饰面天花、石材复合板天花、遮阳帘天花、防火挡烟垂壁、电线电缆供应及、灯具供应及、应急电源、风机盘管供应及、VRV空调设备供应及、VAV BOX供应及、AHU供应及、机房精密空调供应及安装、新风机供应及、排风机供应及、水泵供应及、冷却塔供应及、冷水机组供应及、热水锅炉供应及、空调百叶风口类供应及(送风口/回风口/防雨百叶)、空调风系统过虑净化器供应及(初/中效过虑网)、空调送回风软管供应及(铝箔软管/帆布软接头)、通风管道风阀类供应及(调节阀/止回阀/防火阀)、通风管道风管供应及(金属钢板风管/玻璃钢风管/玻镁复合风管)、空调水管供应及(焊接钢管/镀锌钢管/无缝钢管)、空调水系统阀门类供应及(闸阀/截止阀/调节阀/单向阀/排气阀/泄水阀)、空调水系统过虚器供应及(过虚器/排污阀)、空调水系统柔性接头供应及(金属软接头/橡胶软接头)、空调水系统仪表类供应及(压力表/温度表)、冷媒铜管供应及、保温材料供应及(橡塑保温/玻璃棉保温)、喷淋头供应及、烟感探测器供应及、温感探测器供应及、可燃气体探测器供应及、消防栓供应及、消防广播供应及、声光报警器供应及、手动报警器供应及、消防模块供应及、防火门监控系统供应及、消防电源监控报警系统供应及、电气火灾报警系统供应及安装、早期烟雾报警系统供应及、气体灭火系统供应及、水管供应及(不锈钢管/铜管/镀锌管/PPR管/U-PVC 管)、水管保温供应(橡塑保温棉/玻璃棉保温)、雨棚、遮阳棚、强弱管槽维护检修、电线电缆检查维护、配电箱检查维护、控制电箱检查维护、灯具检查维护、全自动提升泵检查维护、应急电源检查维护、消防排烟设备拆除、应急照明灯、疏散指示标识、应急电源、调试与连接、通讯设备、播放器与调试、显示设备与调试、控制设备与调试、音频线缆与调试、灯光控制台与调试、调光设备与调试、特效设备与调试、智能控制系统与调试、智能系统布线、智能未端设备与调试、智能控制面板与调试、智能控制模版与调试'
  },
  // ================= 健康管控 =================
  '岗前培训': {
    trigger: '立项立即触发',
    check: '项目组及上级主管领导现场履职，检查环境周报评价',
    reference: '《健康管理手册》\n第二节 健康管理目标与要求',
    rules: [
      '为了确保施工人员的安全和健康，服务商必须提供必要的岗前培训。培训包括以下几方面:',
      '使用个人防护装备的正确方法。',
      '安全操作规程。',
      '急救和灭火技能。',
      '职业健康知识。'
    ]
  },
  '医药箱配置': {
    trigger: '7天以上的项目',
    check: '项目组及上级主管领导现场履职检查、平台标准化日报检查、平台标准化检查团队现场巡检',
    reference: '《健康管理手册》\n第二节 健康管理目标与要求',
    rules: [
      '施工现场应当备有应急医药箱。医药箱的配置应当根据工程实际情况和危险性等级确定，一般应包括以下基本内容:',
      '消毒器具: 如酒精、棉球、纱布等。',
      '创口贴: 可根据需求选用不同规格和型号，不少于50片。',
      '医用胶布: 一般可选择不同规格的膏药和胶布各一盒。',
      '常用药品: 如感冒药、止痛药、解热药等常见药品。',
      '救护药品: 如红霉素眼膏、烧伤膏等应急救护药品。',
      '防暑药品: 如人丹、藿香正气水、风油精。'
    ]
  },
  '健康管控日报': {
    trigger: '3天以下的项目立项触发',
    check: '项目组及上级主管领导现场环境/健康周报评价、平台标准化日报检查',
    reference: '《健康管理手册》\n第三节 职业健康防范措施',
    rules: [
      '新建、改造、维修的项目，每天应根据当日健康标准化检查内容和频次要求，拍摄带项目信息及日期的现场标准化实施图像、视频上传至平台标准化检查日报页面。'
    ]
  },
  '健康管控周报': {
    trigger: '3天以上的项目立项触发',
    check: '项目组及上级主管领导现场环境/健康周报评价、平台标准化日报检查',
    reference: '《健康管理手册》\n第三节 职业健康防范措施',
    rules: [
      '一周以上精装/普装/机电/弱电智能化/特种作业的新建、改造项目，必须按时完成健康管控周报，并在平台项目管理菜单内周报页面提交健康管控周报内容。周报的内容编写应包含以下几个关键部分：\n\n1）概述本周内开展的有害健康的施工作业情况，包括但不限于噪音/粉尘/气味/高温/振动/有毒/辐射/烟尘作业等，概述现场健康管控的措施实施情况。\n2）检查与整改：详细记录本周内进行的健康检查情况，包括检查的频率、发现的问题及整改措施，确保整改得到及时处理。\n3）下周工作计划：提前规划下一周的健康管控措施与培训，确保现场健康管理工作持续有效。\n4）其他重要事项：如即将进行的大规模有害健康的噪音、粉尘作业等。'
    ]
  },
  '粉尘控制': {
    check: '项目组及上级主管领导现场履职检查、环境/健康周报评价、平台标准化日报检查、平台标准化检查团队现场巡检',
    reference: '《健康管理手册》\n第三节 职业健康防范措施',
    rules: [
      '一、基础装修作业管控措施：\n1）必须随时随地设专人用水湿润拖地，做到作业区干净整洁。\n2）严格控制有尘作业，用户工作时间严禁进行强尘作业。\n3）严格执行平台《成品保护规范》的规定。\n4）桌面、装饰物、地毯、成品保护层产生的少量粉尘立即使用随身白毛巾去尘。\n5）桌面、装饰物、地毯、成品保护层产生的多量粉尘立即使用强力吸尘器吸尘。\n6）硬装地面产生的粉尘立即使用推尘拖把清理，严禁使用扫把清理。\n7）每天作业结束后对室内的天花、墙面、地面的灰尘进行彻底的吸尘，确保室内空气达到空气品质的要求。',
      '二、材料储运作业\n1）施工现场内容易产生粉尘的材料（成袋水泥、易飞扬物、细颗粒散体材料），运输时要防止遗洒、飞扬，卸运时要采取码放措施，存放时要安排在库内或严密遮盖，减少污染。\n2）现场施工垃圾全部采用袋装，施工垃圾分类装袋并及时清运出场，从事施工垃圾运输车采用密闭式运输车辆或采取覆盖措施。',
      '三、喷漆/打磨作业\n1）对于只能在现场完成的墙面/天花批灰的打磨，首先要求墙面/天花基层尽可能减低批灰的厚度，其次打磨施工时，应按逐个区域进行，以免造成对其它区域的污染。\n2）喷漆/打磨产生的粉尘立即安排专人用水湿润清理。\n3）在作业现场防尘、降尘措施难以使粉尘浓度降至符合作业场所卫生标准的条件下，施工师傅一定要佩戴防尘护具，现场其它人员避免进入。',
      '四、拆除作业\n1）拆除作业前依据《成品保护规范》规定的隔挡搭建标准对拆除区域进行隔离封闭。\n2）作业前用水湿润地面和即将拆除物，避免扬尘。\n3）作业中随时随地用水湿润整个作业区域，迅速降低扬尘。\n4）作业后迅速清理移除拆除废物，清理时用水湿润整个作业区域，避免扬尘。\n5）在作业现场防尘、降尘措施难以使粉尘浓度降至符合作业场所卫生标准的条件下，施工师傅一定要佩戴防尘护具，现场其它人员避免进入。',
      '五、切割作业\n1）根据施工内容建立独立的切割作业车间（或独立区域）。\n2）采用有吸尘功能的切割工具。\n3）作业前用水湿润地面。\n4）作业后迅速清理移除切割物，清理时用水湿润整个作业区域，避免扬尘。',
      '六、空调作业\n在空调、通风系统进行试运行前对风管进行吹扫，将风管内的灰尘吹净，所有的风机盘管、空气调节器、风机在试运行前，均应吹净内部的灰尘，使新风达到国家有关室内空气品质标准的要求，并通过国家有关检测部门的检测。'
    ],
    longTrigger: '石膏板吊顶、软膜天花、裸顶喷漆、天花乳胶漆、窗帘盒、投影幕盒、矿棉板天花、硅钙板天花、吸音板天花(聚酯纤维、竹木复合冲孔板、碳晶板等）、PVC、竹木纤维板天花、木饰面天花、石材复合板天花、石膏板隔墙、轻体隔墙砌筑、水泥板隔墙、卫生间隔断、夹心彩钢板隔断、轻质预制板隔断、板材隔墙、墙面乳胶漆、墙面木饰面、门及门套、墙面水泥砂浆找平、墙面石材、墙面吸音板(聚酯纤维、竹木复合冲孔板、碳晶板等）、墙面砖、墙面防火板、墙面踢脚（木制、PVC、金属、石材、瓷砖）、水泥漆、硅藻泥、马来漆、艺术漆等、地面石材、地面砖、地面垫层、自流平、地坪漆、木地板、架空地板、水磨石（现浇、块贴）、吊顶拆除(含石膏板、矿棉板、金属板、玻璃板等各类材料吊顶)、石膏板隔墙拆除、砌筑隔墙拆除、墙饰面拆除(木饰面、金属板、软包、吸音板、玻璃、镜子等)、墙地面线管开槽拆除、高架地板拆除、墙地面石材拆除、地毯、胶地板拆除、墙地面砖拆除、基础拆除(含水泥、木板、石膏板或其它材质)、地面找平层拆除、固定家俱拆除、系统家俱拆除、通风管道风管供应及(金属钢板风管／玻璃钢风管／玻镁复合风管)、空调水管供应及(焊接钢管／镀锌钢管／无缝钢管)、保温材料供应及(橡塑保温／玻璃棉保温)、水管保温供应(橡塑保温棉／玻璃棉保温)、电箱及电气设备类拆除、电气管槽拆除、空调内机类/风机类设备拆除、空调风管道及相关风阀附件类拆除、消防排烟类设备拆除、石材结晶'
  },
  '健康管控噪音控制': {
    displayName: '噪音控制',
    check: '项目组及上级主管领导现场履职检查、环境/健康周报评价、平台标准化日报检查、平台标准化检查团队现场巡检',
    reference: '《健康管理手册》\n第三节 职业健康防范措施',
    rules: [
      '1）严禁施工现场大声喧哗、起哄，严控各种可能对非施工区域产生影响的噪声源。',
      '2）对于会产生噪声且可以在施工现场以外完成的加工作业内容，要求在场外加工作业。',
      '3）对于需批量制作且不宜场外加工的割噪声作业，集中在用户非工作时间进行作业。并采取必要的隔声减噪措施，选定独立区域进行施工作业。',
      '4）施工现场使用效率高且噪声小的电动工具。',
      '5）施工现场采用低噪声的施工工艺和施工技术。',
      '6）噪声级大于85dba的作业，作业师傅须佩戴好防护耳塞，并在该区域内设置噪音施工中请佩戴防护耳塞的警示标牌。',
      '7）对暴露于过量噪音的施工师傅，上岗前须听力测试检查，严禁不具备正常听力的师傅上岗。'
    ],
    longTrigger: '石膏板吊顶、软膜天花、天花钢架(加固、转换层等)、窗帘盒、投影幕盒、铝格栅、铝板吊顶、矿棉板天花、硅钙板天花、钢丝网天花、吸音板天花(聚酯纤维、竹木复合冲孔板、碳晶板等）、不锈钢板天花、PVC、竹木纤维板天花、玻璃、镜子天花、木饰面天花、石材复合板天花、遮阳帘天花、石膏板隔墙、水泥板隔墙、玻璃隔墙、卫生间隔断、活动隔断、夹心彩钢板隔断、玻璃砖隔断、轻质预制板隔断、板材隔墙、墙面木饰面、门及门套、墙面石材、墙面吸音板(聚酯纤维、竹木复合冲孔板、碳晶板等）、墙面软包、墙面白板玻璃、墙面金属板、墙面砖、墙面防火板、墙面护墙板、墙面踢脚（木制、PVC、金属、石材、瓷砖）、固定家俱、钢架(加固、楼梯、基层等)、墙面硬包/软木、地面石材、地面砖、木地板、架空地板、钢架(加固、基层等)、水磨石（现浇、块贴）、成品灯箱、标识、五金、窗帘、系统家俱、吊顶拆除(含石膏板、矿棉板、金属板、玻璃板等各类材料吊顶)、钢架拆除(加固、楼梯、基层、转换层等)、石膏板隔墙拆除、砌筑隔墙拆除、玻璃隔断拆除、成品隔断拆除、墙地面线管开槽拆除、墙地面石材拆除、墙地面砖拆除、基础拆除(含水泥、木板、石膏板或其它材质)、地面找平层拆除、门窗拆除、固定家俱拆除、系统家俱拆除、通风管道风管供应及(金属钢板风管／玻璃钢风管／玻镁复合风管)、空调水管供应及(焊接钢管／镀锌钢管／无缝钢管)、电箱及电气设备类拆除、电气管槽拆除、空调外机及冷却塔等楼顶类设备拆除、空调内机类/风机类设备拆除、空调风管道及相关风阀附件类拆除、空调水/冷媒管道及相关水阀附件类拆除、通风风口类拆除、消防水系统设备类拆除(水箱/水泵/水管/消火栓/喷淋头)、消防排烟类设备拆除、水管道及相关阀门类拆除、石材结晶'
  },
  '异味控制': {
    check: '项目组及上级主管领导现场履职检查、平台标准化日报检查、平台标准化检查团队现场巡检',
    reference: '《健康管理手册》\n第三节 职业健康防范措施',
    rules: [
      '1）定期地对施工现场的空气污浊物、气味进行监控。',
      '2）使用绿色环保的材料，采用低异味的施工工艺和施工技术。',
      '3）木作/油漆工作须在场外工厂完成，到现场进行拼装。',
      '4）必须在现场完成的木作/油漆工作，设置独立加工区，并安装排风扇进行排风。',
      '5）对施工现场采取必要的通风除味措施。开启施工场所的排风设备，必要时增设临时通排风设备。',
      '6）在用户非工作时间进行有气味的作业。',
      '7）油漆、配料等各种会产生异味的物品应集中存放在指定地点并密封保存。每次调配量不超过半天的使用量，使用完后应立即密闭并集中妥善保管。',
      '8）有效隔离异味传播的主要途径。对施工现场进行相对的隔离封闭，封闭施工现场风口风道。'
    ],
    longTrigger: '石膏板吊顶、软膜天花、裸顶喷漆、天花乳胶漆、窗帘盒、投影幕盒、矿棉板天花、硅钙板天花、吸音板天花(聚酯纤维、竹木复合冲孔板、碳晶板等）、PVC、竹木纤维板天花、木饰面天花、石材复合板天花、石膏板隔墙、轻体隔墙砌筑、水泥板隔墙、卫生间隔断、夹心彩钢板隔断、轻质预制板隔断、板材隔墙、墙面乳胶漆、墙面木饰面、门及门套、墙面水泥砂浆找平、墙面石材、墙面吸音板(聚酯纤维、竹木复合冲孔板、碳晶板等）、墙面砖、墙面防火板、墙面踢脚（木制、PVC、金属、石材、瓷砖）、水泥漆、硅藻泥、马来漆、艺术漆等、地面石材、地面砖、地面垫层、自流平、地坪漆、木地板、架空地板、水磨石（现浇、块贴）、吊顶拆除(含石膏板、矿棉板、金属板、玻璃板等各类材料吊顶)、石膏板隔墙拆除、砌筑隔墙拆除、墙饰面拆除(木饰面、金属板、软包、吸音板、玻璃、镜子等)、墙地面线管开槽拆除、高架地板拆除、墙地面石材拆除、地毯、胶地板拆除、墙地面砖拆除、基础拆除(含水泥、木板、石膏板或其它材质)、地面找平层拆除、固定家俱拆除、系统家俱拆除、通风管道风管供应及(金属钢板风管／玻璃钢风管／玻镁复合风管)、空调水管供应及(焊接钢管／镀锌钢管／无缝钢管)、保温材料供应及(橡塑保温／玻璃棉保温)、水管保温供应(橡塑保温棉／玻璃棉保温)、电箱及电气设备类拆除、电气管槽拆除、空调内机类/风机类设备拆除、空调风管道及相关风阀附件类拆除、消防排烟类设备拆除、石材结晶'
  },
  '高温预防': {
    trigger: '项目主管立项手动选择',
    check: '项目组及上级主管领导现场履职检查、平台标准化检查团队现场巡检',
    reference: '《健康管理手册》\n第三节 职业健康防范措施',
    rules: [
      '1）合理安排作息时间。要密切关注有关高温天气的气象预报，日最高气温大于或等于35摄氏度定义为"高温日"，连续5天以上"高温日"称作"持续高温"。遇到持续高温时，适当调整夏季高温作业劳动和休息制度，减轻劳动强度，严禁加班作业。',
      '2）加强工作中的轮换休息。根据施工的工艺过程，采取勤倒班的方式，缩短一次连续作业时间，加强工作中的轮换休息。',
      '3）保证师傅们休息时间。所有服务商在安排生产任务时，要充分考虑作业人员的休息时间和劳动强度。应该适当的控制师傅上班时间，特别时夜间加班时间，原则上晚上加班不超过22：00，保证师傅有充足的休息时间。',
      '4）保证现场饮水供应充足。现场设置饮水点，保证每天的供水，必要时在办公室储备桶装水以备不时之需。',
      '5）落实防暑降温物品。加强对防暑降温知识的宣传，项目组/服务商需准备好防暑降温的药品，如：人丹、藿香正气水、风油精等，采取发放到人和医药箱领取两种方式相结合，确保师傅能够及时的获取药品。',
      '6）积极改善建筑工地生产生活环境。要认真落实建筑施工现场管理规定，现场采取设置适当数量的立式排风扇的通风措施，加强通风降温。'
    ]
  },
  '振动控制': {
    check: '项目组及上级主管领导现场履职检查、环境/健康周报评价、平台标准化日报检查、平台标准化检查团队现场巡检',
    reference: '《健康管理手册》\n第三节 职业健康防范措施',
    rules: [
      '1）使用低噪音、低振动的机具。采取必要的隔音与隔振措施，避免或减少施工噪音和振动。',
      '2）手持振动工具应安装防振手柄。',
      '3）使用较重振动工具时，避免手臂上举姿势的振动作业。',
      '4）防止强迫体位，以减轻肌肉负荷和静力紧张。',
      '5）采取轮流进行振动作业方式，减少接触振动的时间。',
      '6）对施工物品的搬运通道、施工机械设备及施工场所关键部位采取必要的防撞、减振等措施。'
    ],
    longTrigger: '石膏板吊顶、软膜天花、裸顶喷漆、天花乳胶漆、窗帘盒、投影幕盒、矿棉板天花、硅钙板天花、吸音板天花(聚酯纤维、竹木复合冲孔板、碳晶板等）、PVC、竹木纤维板天花、木饰面天花、石材复合板天花、石膏板隔墙、轻体隔墙砌筑、水泥板隔墙、卫生间隔断、夹心彩钢板隔断、轻质预制板隔断、板材隔墙、墙面乳胶漆、墙面木饰面、门及门套、墙面水泥砂浆找平、墙面石材、墙面吸音板(聚酯纤维、竹木复合冲孔板、碳晶板等）、墙面砖、墙面防火板、墙面踢脚（木制、PVC、金属、石材、瓷砖）、水泥漆、硅藻泥、马来漆、艺术漆等、地面石材、地面砖、地面垫层、自流平、地坪漆、木地板、架空地板、水磨石（现浇、块贴）、吊顶拆除(含石膏板、矿棉板、金属板、玻璃板等各类材料吊顶)、石膏板隔墙拆除、砌筑隔墙拆除、墙饰面拆除(木饰面、金属板、软包、吸音板、玻璃、镜子等)、墙地面线管开槽拆除、高架地板拆除、墙地面石材拆除、地毯、胶地板拆除、墙地面砖拆除、基础拆除(含水泥、木板、石膏板或其它材质)、地面找平层拆除、固定家俱拆除、系统家俱拆除、通风管道风管供应及(金属钢板风管／玻璃钢风管／玻镁复合风管)、空调水管供应及(焊接钢管／镀锌钢管／无缝钢管)、保温材料供应及(橡塑保温／玻璃棉保温)、水管保温供应(橡塑保温棉／玻璃棉保温)、电箱及电气设备类拆除、电气管槽拆除、空调内机类/风机类设备拆除、空调风管道及相关风阀附件类拆除、消防排烟类设备拆除、石材结晶'
  },
  '毒物控制': {
    check: '项目组及上级主管领导现场履职检查、环境/健康周报评价、平台标准化日报检查、平台标准化检查团队现场巡检',
    reference: '《健康管理手册》\n第三节 职业健康防范措施',
    rules: [
      '1）化学品作业前在平台工程项目管理菜单安全管理页面，向平台发起作业申请，待平台审核通过后方可进行现场作业。',
      '2）所有的油漆类材料入场前，必须在平台提交有害化学品的材料安全数据清单和化学品安全技术说明书（即MSDS报告）。',
      '3）无化学品材料安全数据清单的有害化学品禁止进入现场。有害化学品进场数量以当日使用量为准。',
      '4）有害化学品必须放置在专用防溅落容器和指定地点，并在现场张贴化学品材料安全数据清单。',
      '5）每位处理有害化学品的师傅需接受相关培训，需配备合格的个人防护用品。',
      '6）通风不良的地下室、污水池内涂刷各种防腐涂料或环氧树脂玻璃钢等作业，必须根据场地大小，采取多台抽风机把苯等有害气体抽出室外，以防止急性苯中毒。',
      '7）施工现场油漆配料时，应改善自然通风条件，减少连续配料时间，防止发生苯中毒和铅中毒。',
      '8）发生急性毒物中毒，要立即前往就近的三甲级医院就医。',
      '9）师傅严格执行操作规程，熟练掌握操作方法，严禁错误操作。'
    ],
    longTrigger: '裸顶喷漆、天花乳胶漆、矿棉板天花、墙面乳胶漆、墙面木饰面、门及门套、墙面石材、墙面吸音板(聚酯纤维、竹木复合冲孔板、碳晶板等）、墙面软包、墙面白板玻璃、墙面壁纸、墙面防火板、水泥漆、硅藻泥、马来漆、艺术漆等、地坪漆、胶地板、地毯、车位划线'
  },
  '弧光辐射、电焊烟尘控制': {
    check: '项目组及上级主管领导现场履职检查、环境/健康周报评价、平台标准化日报检查、平台标准化检查团队现场巡检',
    reference: '《健康管理手册》\n第三节 职业健康防范措施',
    rules: [
      '1）动火/切割等特殊工种作业前在平台工程项目管理菜单安全管理页面，向平台提交特种作业申请，经平台审核通过后方可进行现场作业。',
      '2）焊机应设在干燥的地方，要平稳牢固。',
      '3）焊工在金属容器内、地下、地沟或窄小、潮湿等处施焊时，要设监护人员。监护人员必须认真负责，且熟知焊接操作规程和应急抢救方法。',
      '4）电焊工作业时必须戴绝缘手套、穿绝缘鞋和焊工服，使用护目镜和面罩。',
      '5）改善作业场所的通风状况，封闭或半封闭结构内焊接时，必须有机械通风措施。',
      '6）加强岗前、岗中职业健康体检及作业环境监测工作，提前预防和控制职业病。',
      '7）提高焊接技术，改进焊接工艺和材料。'
    ],
    longTrigger: '石膏板吊顶、窗帘盒、投影幕盒、铝格栅、铝板吊顶、矿棉板天花、硅钙板天花、钢丝网天花、吸音板天花(聚酯纤维、竹木复合冲孔板、碳晶板等）、不锈钢板天花、PVC、竹木纤维板天花、石材复合板天花、遮阳帘天花、石膏板隔墙、水泥板隔墙、玻璃隔墙、卫生间隔断、活动隔断、夹心彩钢板隔断、轻质预制板隔断、板材隔墙、墙面木饰面、门及门套、墙面石材、墙面吸音板(聚酯纤维、竹木复合冲孔板、碳晶板等）、墙面白板玻璃、墙面金属板、墙面砖、墙面护墙板、墙面踢脚（木制、PVC、金属、石材、瓷砖）、固定家俱、护角条、地面石材、地面砖、木地板、架空地板、水磨石（现浇、块贴）、分割条/收口条（金属、PVC）、钢架拆除(加固、楼梯、基层、转换层等)、石膏板隔墙拆除、玻璃隔断拆除、成品隔断拆除、基础拆除(含水泥、木板、石膏板或其它材质)、强弱电管槽、冷却塔供应及、冷水机组供应及、热水锅炉供应及、冷媒铜管供应及、喷淋头供应及、水管供应及(不锈钢管／铜管／镀锌管／PPR管／U-PVC 管)、电箱及电气设备类拆除、电气管槽拆除、空调外机及冷却塔等楼顶类设备拆除、空调内机类/风机类设备拆除、空调风管道及相关风阀附件类拆除、空调水/冷媒管道及相关水阀附件类拆除、消防水系统设备类拆除(水箱/水泵/水管/消火栓/喷淋头)、消防排烟类设备拆除、水管道及相关阀门类拆除'
  },
  // ================= 卫生保洁 =================
  '施工保洁员': {
    trigger: '立项触发',
    check: '项目组及上级主管领导现场履职检查、日报、环境周报评价、平台标准化日报检查、平台标准化检查团队现场巡检',
    reference: '《环境管理手册》\n第六节 现场卫生保洁措施',
    rules: [
      '1）新建及改造项目，施工期间必须配置专职保洁员，每日对施工区域及周边环境进行清理保洁。保洁员数量根据项目规模进行配置，对作业区域进行成品保护与巡视，发现问题及时处理。',
      '2）新建、改造项目须采用独立聘用专职保洁员或保洁班组负责施工区域卫生工作，不得由作业人员兼任。',
      '3）保洁员应在开工前对现场进行第一次全面保洁，在每日作业前后对施工区域进行例行清洁，保持现场地面、墙面、通道及施工设施整洁有序。',
      '4）保洁员应配备必要的清洁工具及用品，包括清洁剂、垃圾袋、垃圾桶、拖把等，做到随手清、随手整理，杜绝临时堆放垃圾。',
      '5）保洁员对垃圾、废料应按规定区域分类堆放和装袋，严禁随意堆放或从高处抛掷，严禁将垃圾、废料、污水等倾倒至非指定区域。',
      '6）保洁员须配合项目组对成品保护情况进行巡查和记录，对发现的污染、破损应及时报告并协助整改。'
    ]
  },
  '卫生除尘措施': {
    trigger: '立项触发',
    check: '项目组及上级主管领导现场履职检查、日报、环境周报评价、平台标准化日报检查、平台标准化检查团队现场巡检',
    reference: '《环境管理手册》\n第六节 现场卫生保洁措施',
    rules: [
      '1）开作业前需对作业区域地面进行全面清理，移除堆积的杂物、办公物品等，并按照平台《成品保护规范》对无法移动的设施进行遮盖和保护，避免灰尘污染。',
      '2）作业区应依照《成品保护规范》对地面、墙面、家具、设备进行铺设成品保护层，防止施工灰尘及污物对成品造成污染。',
      '3）对于易积尘的部位（如风口、灯具、线槽、窗台等），应在施工过程中定期使用吸尘器或湿抹布清理，避免灰尘长时间堆积。',
      '4）施工期间严禁使用传统扫帚大面积干扫，应采用推尘拖把、吸尘器等工具进行除尘作业，减少扬尘。',
      '5）在钻孔、切割等产生大量粉尘的工序前，应提前采取遮挡、封闭和局部抽风措施，并在作业结束后立即进行湿式清理。',
      '6）每次作业结束后，应对通道、楼梯间、电梯厅等公共区域进行保洁，确保无可见尘土和遗留物，为客户提供干净整洁的通行环境。',
      '7）遇雨雪、大风等特殊天气时，应加密除尘和清扫频次，防止泥沙、水渍被带入施工区域。'
    ]
  },
  '废料垃圾清除': {
    trigger: '立项触发',
    check: '项目组及上级主管领导现场履职检查、日报、环境周报评价、平台标准化日报检查、平台标准化检查团队现场巡检',
    reference: '《环境管理手册》\n第六节 现场卫生保洁措施',
    rules: [
      '1）现施工区域内的施工垃圾全部采用袋装，施工垃圾分类装袋，现场应配备数量充足的垃圾袋和清理工具。',
      '2）地面保洁要做到随干随清，清扫和工序交叉施工时要采用随清随运的作业方式，碎屑、废料、边角料等施工垃圾不得长时间堆积。',
      '3）不得在厅内、走廊、主要通道、楼梯口等公共区域长期堆放垃圾和废料，避免影响客户正常通行及现场形象。',
      '4）对随意丢弃的食品包装、饮料瓶、塑料袋等生活垃圾，应及时收集并放入垃圾袋内，严禁乱扔、乱弃。',
      '5）严禁将油漆、稀释剂、机油等有害物质直接倒入下水道或非指定容器，应放入专用容器中并按危险废物要求处置。',
      '6）对已装袋的垃圾，应根据项目规模和物业要求设置临时堆放点，并在规定时间内外运至指定消纳场所，不得在建筑物内长期堆放。',
      '7）垃圾外运应尽量安排在客户非工作时间进行，运输路线和电梯应按《成品保护规范》进行成品保护，作业完成后立即清扫通道及电梯间。',
      '8）2日以上新建/改造/维修等项目，施工现场应每天至少一次将集中堆放的垃圾清运至物业指定区域或消纳场所，严禁超期堆放。',
      '9）项目完工前，应对所有施工垃圾进行最终清运，确保现场无任何遗留的垃圾、废弃物和包装材料。'
    ]
  },
  '完工保洁': {
    trigger: '立项触发',
    check: '项目组及上级主管领导现场履职检查、日报、环境周报评价、平台标准化日报检查、平台标准化检查团队现场巡检',
    reference: '《环境管理手册》\n第六节 现场卫生保洁措施',
    rules: [
      '1）工作结束后，须对工作区域及周边进行全面清洁，包括地面、墙面、天花等设施设备，对已移除的家具和设备安放位也要进行保洁。',
      '2）3天以下新建/改造/维修项目，在完工当天应完成现场的全面清扫和除尘，确保次日交付前场地整洁有序。',
      '3）3天以上新建/改造/维修项目，应在每个阶段节点完成阶段性保洁，最终完工前再进行一次系统的总保洁。',
      '4）完工保洁应重点检查天花板、灯具、风口、墙角、踢脚线、地面缝隙等易积尘和藏污部位，确保无残留灰尘和污渍。',
      '5）卫生间、茶水间、机房等重点区域，应采用专用清洁工具和清洁剂，做到无异味、无水渍、无污迹。',
      '6）项目完工后，所有保护材料和临时设施应全部拆除并清运，保留场地原有设施完好无损，为客户提供干净、整洁、可直接投入使用的作业空间。'
    ]
  },
  '洒水降尘措施': {
    check: '项目组及上级主管领导现场履职检查、日报、环境周报评价、平台标准化日报检查、平台标准化检查团队现场巡检',
    reference: '《环境管理手册》\n第六节-现场卫生保洁措施',
    rules: [
      '1）根据施工进度和扬尘状况合理确定每日洒水次数，确保地面始终处于湿润状态，还应避免积水情况的发生，如有积水，要及时使用拖布将积水散开。',
      '2）拆除作业前用水湿润地面和即将拆除物，避免扬尘。',
      '3）拆除作业中随时随地用水湿润整个作业区域，迅速降低扬尘。',
      '4）拆除作业后迅速清理移除拆除废物，清理时用水湿润整个作业区域，避免扬尘。',
      '5）喷漆/打磨/切割等产生粉尘的作业，必须采取相应的降尘措施，如湿法作业、保洁员用水湿润清理、使用吸尘器吸走粉尘等方法。'
    ],
    longTrigger: '石膏板吊顶、天花钢架(加固、转换层等)、窗帘盒、投影幕盒、石膏板隔墙、轻体隔墙砌筑、水泥板隔墙、卫生间隔断、活动隔断、钢架隔断、墙面水泥砂浆找平、墙面软包、墙面木饰面、墙面石材、墙面砖、墙面防火板、墙面护墙板、墙面踢脚、固定家俱、门及门套、钢架(加固、楼梯、基层等)、地面1:1分色放线、地面石材、地面砖、地面垫层、自流平、地坪漆、木地板、架空地板、钢架(加固、基层)、系统家俱、吊顶拆除(含石膏板、矿棉板、金属板、玻璃板等各类材料吊顶)、钢架拆除(加固、楼梯、基层、转换层等)、石膏板隔墙拆除、轻体砌筑隔墙拆除、成品隔断拆除、墙饰面拆除(木饰面、金属板、软包、吸音板、玻璃、镜子等)、基础拆除(含水泥、木板、石膏板或其它材质)、墙地面线管开槽拆除、高架地板拆除、墙地面砖拆除、卫生间隔断拆除、地面找平层拆除、门窗拆除、固定家俱拆除、系统家俱拆除、电气管槽拆除、电箱拆除、空调设备拆除、空调管道拆除、硅钙板天花、PVC、竹木纤维板天花、石材复合板天花、墙面硬包/软木、防火挡烟垂壁、护角条、水磨石(现浇、块贴)、分割条/收口条(金属、PVC)、轻质预制板隔断、板材隔墙、系统家具、展柜、橱柜'
  },
  // ================= 成品管控 =================
  '非独立作业区隔挡': {
    trigger: '7天以上的项目立项触发',
    check: '项目组及上级主管领导现场履职检查、平台标准化日报检查、平台标准化检查团队现场巡检',
    reference: '《成品保护规范》\n第四节 成品保护方案与措施',
    rules: [
      '1）新建、改造、定制装修项目，采用18mm白色三聚氰胺板搭建全封闭隔挡。',
      '2）根据现场情况对构件进行固定、连接。',
      '3）隔挡板内侧板缝用黄黑塑料胶带封贴。',
      '4）隔挡板外侧张贴平台或客户全幅海报。'
    ]
  },
  '小型非独立作业区隔挡': {
    trigger: '3天以上不足7天的项目立项触发（含3天）',
    check: '项目组及上级主管领导现场履职检查、平台标准化日报检查、平台标准化检查团队现场巡检',
    reference: '《成品保护规范》\n第四节 成品保护方案与措施',
    rules: [
      '1）小型新建、改造项目采用18mm白色三聚氰胺板或平台标准0.12mm厚双层聚乙烯透明保护膜搭建全封闭隔挡。',
      '2）临时扬尘维修采用平台标准双层加厚防尘遮蔽膜对非作业区进行局部围挡隔离。'
    ]
  },
  '物料清运通道地面': {
    trigger: '3天以上的项目立项触发',
    check: '项目组及上级主管领导现场履职检查、平台标准化日报检查、平台标准化检查团队现场巡检',
    reference: '《成品保护规范》\n第四节 成品保护方案与措施',
    rules: [
      '1）新建、改造、定制装修、小维改项目采用平台标准4mm厚无印刷黄色PVC针织棉保护膜对地面进行围挡保护，连接处用黄黑塑料胶带。',
      '2）临时扬尘物料清运及维修采用平台标准1.5mm厚无印刷黄色PVC针织棉保护膜或0.12mm厚双层聚乙烯透明保护膜对地面进行局部围挡保护。',
      '3）每次物料清运及垃圾袋搬运后，用吸尘器清理通道内残留物，确保通道随时保持干净整洁。'
    ]
  },
   '电梯': {
  trigger: '立项触发',
  check: '项目组及上级主管领导现场履职检查、平台标准化日报检查、平台标准化检查团队现场巡检',
  reference: '《成品保护规范》\n第四节 成品保护方案与措施',
  rules: [
    '1）3天内新建、改造、定制装修、小型维改项目采用平台标准的1.5毫米厚无印字黄色PVC针织棉保护膜封闭保护电梯轿厢内部，需先将轿厢扶手拆除后保护，连接处使用黄黑间色塑料胶带。3天以上项目遵循物业标准。',
    '2）临时性有尘运料维修，采用平台标准0.12毫米厚双层聚乙烯透明塑料保护膜局部封闭保护。',
    '3）每次搬运材料和垃圾袋完成后需要用吸尘器清理轿厢内残留物，随时保持电梯轿厢干净整洁。'
  ]
}
};


function StandardsPage({ onNavigate }) {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const [activeCategory, setActiveCategory] = useState(null);
  const [activeSubItem, setActiveSubItem] = useState(null);

  const categories = [
    {
      name: '环境管控',
      sub: [
        '环境管理组织', '环境管控日报', '环境管控周报', '噪音控制', 
        '气味控制', '废料与垃圾管理', '个人物品和食物管理', 
        '局部小维修的环境控制', '材料控制', '现场排风机'
      ]
    },
    { 
      name: '安全管控', 
      sub: [
        '工地守则', '安全管理组织设立', '防护装备管理', '防护装备佩戴要求', '着装要求',
        '进场安全教育', '专项作业安全培训', '每日班前安全注意事项会', '每周安全培训会议',
        '安全技术交底', '安全巡查', '安全隐患整改', '安全日报', '安全与周报',
        '高危作业技术方案编制与审批', '特种作业审批', '化学品作业审批', '梯子的使用',
        '消防管理', '安全用电', '安全带使用', '孔洞防护', '起重吊装要求', '高空作业',
        '电焊气割作业', '围护、作业公告牌及警示标识', '文明施工', '材料运输',
        '现场接收', '移动脚手架使用要求'
      ] 
    },
    { name: '健康管控', sub: ['健康管控日报', '健康管控周报', '岗前培训', '医药箱配置', '粉尘控制', { key: '健康管控噪音控制', name: '噪音控制' }, '异味控制', '高温预防', '振动控制', '毒物控制', '弧光辐射、电焊烟尘控制'] },
    { name: '成品管控', sub: ['非独立作业区隔挡', '小型非独立作业区隔挡', '物料清运通道地面', '电梯'] },
    { name: '卫生保洁', sub: ['施工保洁员', '卫生除尘措施', '废料垃圾清除', '完工保洁', '洒水降尘措施'] },
    { name: '风险管控', sub: [] }
  ];

  return (
    <div className="bg-white min-h-screen text-gray-900 font-sans selection:bg-[#A1D573] selection:text-white flex flex-col">
      {/* 顶部返回按钮与简易Header */}
      <header className="h-20 flex items-center px-6 border-b border-gray-100 shrink-0 sticky top-0 bg-white/95 backdrop-blur z-50">
        <button 
          onClick={() => onNavigate('home')} 
          className="p-2 rounded-full hover:bg-gray-100 transition-colors mr-4 group"
        >
          <ArrowLeft className="text-gray-600 group-hover:text-gray-900 transition-colors" size={24} />
        </button>
        <span className="font-bold text-xl tracking-tighter">JustPai Standards</span>
      </header>

      {/* 页面主体内容区：左侧目录 + 右侧内容 */}
      <div className="flex-1 flex w-full max-w-[1440px] mx-auto relative">
        
        {/* 左侧侧边栏 (导航目录) */}
        <aside className="w-72 shrink-0 border-r border-gray-100 py-10 px-6 hidden lg:block sticky top-20 h-[calc(100vh-80px)] overflow-y-auto no-scrollbar">
          <nav className="space-y-6">
            {categories.map((category) => (
              <div key={category.name}>
                <button 
                  onClick={() => setActiveCategory(activeCategory === category.name ? null : category.name)}
                  className={`flex items-center justify-between w-full text-left font-bold text-lg mb-2 transition-colors ${activeCategory === category.name ? 'text-gray-900' : 'text-gray-400 hover:text-gray-700'}`}
                >
                  <span>{category.name}</span>
                  <ChevronDown size={18} className={`transition-transform duration-300 ${activeCategory === category.name ? 'rotate-180 text-gray-900' : 'text-gray-300'}`} />
                </button>
                {/* 二级菜单 (仅在选中项展开，可滚动显示全部子项) */}
                <div className={`overflow-hidden transition-all duration-300 ${activeCategory === category.name ? 'max-h-[70vh] opacity-100 overflow-y-auto' : 'max-h-0 opacity-0'}`}>
                  <ul className="pl-4 space-y-3 py-2 border-l-2 border-[#A1D573]/30">
                    {category.sub.map((subItem) => {
                      const itemKey = typeof subItem === 'string' ? subItem : subItem.key;
                      const itemName = typeof subItem === 'string' ? subItem : subItem.name;
                      return (
                        <li key={itemKey}>
                          <button 
                            onClick={() => setActiveSubItem(itemKey)}
                            className={`text-sm text-left w-full transition-colors ${activeSubItem === itemKey ? 'text-[#A1D573] font-bold' : 'text-gray-500 hover:text-gray-900 hover:font-medium'}`}
                          >
                            {itemName}
                          </button>
                        </li>
                      );
                    })}
                    {category.sub.length === 0 && (
                      <li><span className="text-sm text-gray-300 italic">内容建设中...</span></li>
                    )}
                  </ul>
                </div>
              </div>
            ))}
          </nav>
        </aside>

        {/* 右侧主内容区 */}
        <main className="flex-1 py-16 px-8 lg:px-24">
          {activeSubItem ? (
             /* 当选中了二级子项目时，展示具体条款界面 */
             <div className="max-w-4xl animate-fade-in-up">
                <h1 className="text-4xl lg:text-5xl font-black text-gray-900 mb-6 tracking-tight">
                  {STANDARDS_DB[activeSubItem]?.displayName ?? activeSubItem}
                </h1>
                
                <h2 className="text-xl text-gray-800 font-medium mb-12 leading-relaxed border-l-4 border-[#A1D573] pl-6">
                  关于“{STANDARDS_DB[activeSubItem]?.displayName ?? activeSubItem}”维度的详细管控标准、执行规范与审查红线。
                </h2>

                {/* 针对不同子项渲染具体内容 */}
                {STANDARDS_DB[activeSubItem] ? (
                  <div className="space-y-12">
                    
                    {/* Meta 信息卡片区 (根据是否有长触发条件，动态切换显示 2 个还是 3 个列) */}
                    <div className={`grid grid-cols-1 ${STANDARDS_DB[activeSubItem].longTrigger ? 'md:grid-cols-2' : 'md:grid-cols-3'} gap-6`}>
                      
                      {/* 如果没有配置超长触发条件，则正常渲染顶部的触发卡片 */}
                      {!STANDARDS_DB[activeSubItem].longTrigger && (
                        <div className="p-6 rounded-2xl bg-gray-50 border border-gray-100 flex flex-col gap-4 hover:shadow-md transition-shadow">
                          <div className="flex items-center gap-2 text-gray-500 font-medium">
                            <Zap size={18} className="text-yellow-500" />
                            <span className="text-sm tracking-wide uppercase">触发条件</span>
                          </div>
                          <p className="text-gray-900 font-bold leading-snug whitespace-pre-wrap">{STANDARDS_DB[activeSubItem].trigger}</p>
                        </div>
                      )}
                      
                      <div className="p-6 rounded-2xl bg-gray-50 border border-gray-100 flex flex-col gap-4 hover:shadow-md transition-shadow">
                        <div className="flex items-center gap-2 text-gray-500 font-medium">
                          <Activity size={18} className="text-blue-500" />
                          <span className="text-sm tracking-wide uppercase">过程检查</span>
                        </div>
                        <p className="text-gray-900 font-bold leading-snug whitespace-pre-wrap">{STANDARDS_DB[activeSubItem].check}</p>
                      </div>

                      <div className="p-6 rounded-2xl bg-gray-50 border border-gray-100 flex flex-col gap-4 hover:shadow-md transition-shadow">
                        <div className="flex items-center gap-2 text-gray-500 font-medium">
                          <FileText size={18} className="text-[#A1D573]" />
                          <span className="text-sm tracking-wide uppercase">执行标准</span>
                        </div>
                        <p className="text-gray-900 font-bold leading-snug whitespace-pre-wrap">{STANDARDS_DB[activeSubItem].reference}</p>
                      </div>
                    </div>

                    {/* 具体标准条款列表 */}
                    <div>
                      <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3 border-b border-gray-100 pb-4">
                        <Layers size={24} className="text-[#A1D573]" />
                        管理标准细则
                      </h3>
                      
                      <div className="space-y-5">
                        {(() => {
                          const rules = STANDARDS_DB[activeSubItem].rules;
                          const isLadder = activeSubItem === '梯子的使用';
                          const introSubList = ['岗前培训', '医药箱配置'];
                          const useIntroSub = introSubList.includes(activeSubItem) && rules.length > 1;

                          const blocks = [];
                          let primaryNum = 0;

                          if (isLadder) {
                            const fullRule = rules.join('\n');
                            const segments = fullRule.split(/\n(?=\d+）)/);
                            for (const seg of segments) {
                              if (!seg.trim()) continue;
                              if (/（\d+）/.test(seg)) {
                                const subParts = seg.split(/\n(?=（\d+）)/);
                                blocks.push({ type: 'primary', number: ++primaryNum, text: subParts[0].trim() });
                                for (let j = 1; j < subParts.length; j++) {
                                  if (subParts[j].trim()) blocks.push({ type: 'secondary', text: subParts[j].trim() });
                                }
                              } else {
                                blocks.push({ type: 'primary', number: ++primaryNum, text: seg.trim() });
                              }
                            }
                          } else {
                            for (let i = 0; i < rules.length; i++) {
                              const rule = rules[i];
                              if (useIntroSub) {
                                if (i === 0) {
                                  blocks.push({ type: 'primary', number: 1, text: rule });
                                } else {
                                  blocks.push({ type: 'secondary', text: rule });
                                }
                                continue;
                              }
                              const parts = rule.split(/\n(?=\d+）)/);
                              if (parts.length > 1) {
                                blocks.push({ type: 'primary', number: ++primaryNum, text: parts[0].trim() });
                                for (let j = 1; j < parts.length; j++) {
                                  blocks.push({ type: 'secondary', text: parts[j].trim() });
                                }
                              } else {
                                blocks.push({ type: 'primary', number: ++primaryNum, text: rule.trim() });
                              }
                            }
                          }

                          return blocks.map((block, idx) => {
                            const isSub = block.type === 'secondary';
                            return (
                              <div
                                key={idx}
                                className={`flex items-start gap-5 border border-gray-100 shadow-[0_4px_20px_rgba(0,0,0,0.02)] bg-white hover:border-[#A1D573]/50 transition-all ${isSub ? 'p-4 rounded-xl ml-10 md:ml-14' : 'p-6 rounded-2xl'}`}
                              >
                                {!isSub && (
                                  <div className="w-10 h-10 rounded-full flex items-center justify-center font-bold text-lg shrink-0 mt-0.5 bg-[#A1D573]/10 text-[#A1D573]">
                                    {block.number}
                                  </div>
                                )}
                                <div className="flex-1 min-w-0">
                                  <p className={`text-gray-700 leading-relaxed m-0 whitespace-pre-wrap ${isSub ? 'text-base' : 'text-lg'}`}>
                                    {isSub ? block.text : block.text.replace(/^[一二三四五六七八九十]+、\s*/, '').replace(/^\d+[）)]\s*/, '').trim()}
                                  </p>
                                </div>
                              </div>
                            );
                          });
                        })()}
                      </div>
                    </div>

                    {/* 如果配置了长字符串版本的触发条件，则在页面最底端展示 */}
                    {STANDARDS_DB[activeSubItem].longTrigger && (
                      <div className="mt-16 pt-8 border-t border-gray-100">
                        <p className="text-sm text-gray-400 mb-2 font-bold tracking-wide">触发条件</p>
                        <p className="text-sm text-gray-500 leading-relaxed text-justify break-all">
                          {STANDARDS_DB[activeSubItem].longTrigger}
                        </p>
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="prose prose-lg max-w-none text-gray-600">
                     <div className="h-[500px] w-full bg-gray-50 rounded-3xl border border-dashed border-gray-200 flex flex-col items-center justify-center gap-4">
                        <FileText size={48} className="text-gray-300" />
                        <p className="text-gray-400 font-mono text-sm">{activeSubItem} 的具体业务标准与图文条例正在录入中...</p>
                     </div>
                  </div>
                )}
             </div>
          ) : (
             /* 当没有选中具体项时，展示默认的企业标准宣言 (漂亮话) */
             <div className="max-w-4xl animate-fade-in-up">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gray-100 border border-gray-200 mb-8">
                  <ShieldCheck size={16} className="text-[#A1D573]" />
                  <span className="text-xs font-bold text-gray-600 tracking-wide uppercase">JustPai Standards System</span>
                </div>
                
                <h1 className="text-5xl lg:text-7xl font-black text-gray-900 mb-8 uppercase tracking-tight">
                  极致标准，<br/>
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#A1D573] to-[#8BC34A]">铸就极致服务。</span>
                </h1>
                
                <h2 className="text-2xl text-gray-800 font-medium mb-12 leading-relaxed border-l-4 border-[#A1D573] pl-6">
                  标准，是 JustPai 兑现卓越交付的基石。我们不依赖个人的经验主义，我们以极致的严谨，重新定义工程与运维规范。
                </h2>

                <div className="prose prose-lg max-w-none text-gray-600 space-y-6">
                   <p>
                     在复杂的办公基础设施与园区运维环境中，任何微小的疏漏都可能带来不可估量的损失。JustPai 深知，企业客户需要的不仅仅是问题的解决，更是过程的完全透明与结果的绝对确定性。
                   </p>
                   <p>
                     我们的《全域智能服务管控标准》历经数百个标杆项目的实战打磨，涵盖了从 <strong>环境保护、安全生产</strong> 到 <strong>健康管理、工艺质量</strong> 的每一个核心控制点。这不仅仅是一份写在纸上的文档，它更是 1000+ JustPai 资深工程师日复一日的行动纲领，是我们对“不留死角、不留隐患”的庄严承诺。
                   </p>
                   
                   <div className="bg-gray-50 p-8 rounded-3xl border border-gray-100 mt-12 shadow-sm">
                      <h4 className="font-bold text-gray-900 text-lg mb-6 flex items-center gap-2">
                         核心管控维度概览
                      </h4>
                      <ul className="grid grid-cols-1 md:grid-cols-2 gap-6 list-none pl-0">
                         <li className="flex items-center gap-3 font-medium text-gray-700 m-0"><div className="w-2 h-2 rounded-full bg-[#FFEB69]"></div> 零隐患安全生产机制</li>
                         <li className="flex items-center gap-3 font-medium text-gray-700 m-0"><div className="w-2 h-2 rounded-full bg-[#A1D573]"></div> 医疗级环境保护策略</li>
                         <li className="flex items-center gap-3 font-medium text-gray-700 m-0"><div className="w-2 h-2 rounded-full bg-blue-400"></div> 无尘无痕卫生保洁体系</li>
                         <li className="flex items-center gap-3 font-medium text-gray-700 m-0"><div className="w-2 h-2 rounded-full bg-purple-400"></div> 全链条成品与物料保护</li>
                      </ul>
                   </div>

                   <div className="mt-12 p-6 bg-white border border-gray-100 shadow-[0_8px_30px_rgba(0,0,0,0.04)] rounded-2xl flex items-start gap-4">
                      <div className="p-3 bg-[#A1D573]/10 rounded-xl text-[#A1D573]">
                        <Menu size={24} />
                      </div>
                      <div>
                        <h4 className="font-bold text-gray-900 text-base mb-1">开始查阅标准档案</h4>
                        <p className="text-sm text-gray-500 m-0">请在左侧目录点击展开您关心的一级管控领域，并选择具体的子类目以查阅详细的执行规范、操作流程与现场审查红线。</p>
                      </div>
                   </div>
                </div>
             </div>
          )}
        </main>

      </div>
    </div>
  );
}

// ================= 子页面组件 =================

function HomePage({ onNavigate }) {
  // 首页卡片：按时间排序后取最新 4 条
  const featuredCases = [...ALL_CASES].sort((a, b) => new Date(b.date) - new Date(a.date)).slice(0, 4);
  const featuredNews = [...ALL_NEWS].sort((a, b) => new Date(b.date) - new Date(a.date)).slice(0, 4);

  return (
    <>
      <section className="relative pt-40 pb-10 md:pt-48 md:pb-20 px-6 bg-white z-10">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] pointer-events-none z-0">
           <div className="w-full h-full bg-[#A1D573] rounded-full blur-[120px] opacity-20 animate-glow-1"></div>
        </div>
        <div className="absolute bottom-0 right-0 w-[600px] h-[400px] pointer-events-none z-0">
           <div className="w-full h-full bg-[#FFEB69] rounded-full blur-[100px] opacity-30 animate-glow-2"></div>
        </div>

        <div className="max-w-7xl mx-auto relative z-10 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-gray-200 bg-white/50 backdrop-blur-sm mb-8 shadow-sm animate-fade-in-up">
            <span className={`w-2 h-2 rounded-full ${BRAND_GRADIENT}`}></span>
            <span className="text-xs font-mono text-gray-500 tracking-wider">SMART INFRASTRUCTURE V2.0</span>
          </div>
          
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight mb-8 leading-[1.1] text-gray-900">
            重塑你的 <br className="hidden md:block"/>
            <span className="relative inline-block">
              <span className="relative z-10">办公基础设施</span>
              <span className="absolute bottom-2 left-0 w-full h-4 bg-[#FFEB69] -z-10 opacity-60 rounded-sm"></span>
            </span>
          </h1>
          
          <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto mb-10 leading-relaxed">
            JustPai 将传统的设施运维转化为可视化的数字资产。
            通过智能网点管理，让您的办公空间更智能、更高效、更具未来感。
          </p>
          
          <div className="flex flex-col md:flex-row items-center justify-center gap-4 mb-20">
            <button className={`${BRAND_GRADIENT} text-gray-900 text-lg px-8 py-4 rounded-full font-bold flex items-center gap-2 hover:shadow-lg hover:shadow-[#A1D573]/30 transition-all hover:scale-105`}>
              启动智能改造 <ArrowRight size={20} />
            </button>
            <button 
              onClick={() => onNavigate('standards')}
              className={`border border-gray-200 bg-white text-gray-900 text-lg px-8 py-4 rounded-full font-bold flex items-center gap-2 hover:shadow-lg hover:scale-105 transition-all hover-rhythm`}
            >
              我们的标准
            </button>
          </div>

          <div className="border-t border-gray-100 pt-10" id="ecosystem">
            <p className="text-sm text-gray-400 uppercase tracking-widest mb-8">Trusted By Industry Leaders</p>
            <div 
              className="relative flex overflow-hidden w-full"
              style={{
                WebkitMaskImage: 'linear-gradient(to right, transparent, black 10%, black 90%, transparent)',
                maskImage: 'linear-gradient(to right, transparent, black 10%, black 90%, transparent)'
              }}
            >
               <div className="flex animate-marquee whitespace-nowrap py-4 items-center">
                  {[...CLIENTS, ...CLIENTS].map((client, index) => (
                    <div key={index} className="mx-8 flex items-center justify-center min-w-[100px]">
                       <img src={client.src} alt={client.name} className="h-16 w-16 md:h-20 md:w-20 object-contain rounded-lg grayscale hover:grayscale-0 hover:opacity-100 transition-all duration-300 cursor-default filter opacity-60" />
                    </div>
                  ))}
               </div>
            </div>
          </div>
        </div>
      </section>

      <section id="features" className="py-24 px-6 relative bg-white overflow-hidden z-0">
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold mb-4 text-gray-900">智能运维矩阵</h2>
            <p className="text-gray-500">抛弃陈旧的报修单，拥抱数据驱动的空间管理。</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className={`col-span-1 md:col-span-2 rounded-3xl p-8 group relative overflow-hidden ${CARD_THEME_GLOW}`}>
              <div className="p-3 bg-gray-50 rounded-xl text-gray-900 group-hover:bg-[#FFEB69] transition-colors inline-block mb-8">
                <Cpu size={32} />
              </div>
              <h3 className="text-2xl font-bold mb-3 text-gray-900">IoT 智能硬件托管</h3>
              <p className="text-gray-500 max-w-md">我们将传统的空调、照明、门禁系统接入 JustPai 智能网络。实时监控设备健康状态，实现预测性维护，彻底告别设备停机。</p>
            </div>

            <div className={`rounded-3xl p-8 group ${CARD_THEME_GLOW}`}>
              <div className="p-3 bg-gray-50 rounded-xl text-gray-900 group-hover:bg-[#A1D573] transition-colors inline-block mb-8">
                <Activity size={32} />
              </div>
              <h3 className="text-xl font-bold mb-2 text-gray-900">极速响应协议</h3>
              <p className="text-gray-500 text-sm">基于位置服务的智能派单系统，工程师如同网络终端，最快30分钟内抵达现场。</p>
            </div>

            <div className={`rounded-3xl p-8 group ${CARD_THEME_GLOW}`}>
              <div className="p-3 bg-gray-50 rounded-xl text-gray-900 group-hover:bg-[#FFEB69] transition-colors inline-block mb-8">
                <Zap size={32} />
              </div>
              <h3 className="text-xl font-bold mb-2 text-gray-900">能源优化与碳积分</h3>
              <p className="text-gray-500 text-sm">通过AI算法优化电力消耗，为您节省成本的同时，记录企业的绿色碳足迹。</p>
            </div>

             <div className={`col-span-1 md:col-span-2 rounded-3xl p-8 group relative overflow-hidden ${CARD_THEME_GLOW}`}>
              <div className="p-3 bg-gray-50 rounded-xl text-gray-900 group-hover:bg-[#A1D573] transition-colors inline-block mb-8">
                <Layers size={32} />
              </div>
              <h3 className="text-2xl font-bold mb-3 text-gray-900">全生命周期资产管理</h3>
              <p className="text-gray-500 max-w-md">从设备采购到报废回收，每一笔资产流转都清晰可查。为您的企业建立透明、可溯源的固定资产账本。</p>
            </div>
          </div>
        </div>
      </section>

      <section id="solutions" className="py-24 px-6 bg-white">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-16">
          <div className="flex-1 relative">
             <div className="relative bg-white border border-gray-100 rounded-2xl p-8 aspect-square flex flex-col justify-center overflow-hidden shadow-2xl">
                <div className="absolute top-8 left-8 right-8 bottom-0 bg-gray-50 rounded-t-xl border-t border-l border-r border-gray-200 p-4 shadow-[0_10px_40px_-10px_rgba(0,0,0,0.1)]">
                   <div className="flex gap-2 mb-4">
                      <div className="w-3 h-3 rounded-full bg-red-400"></div>
                      <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
                      <div className="w-3 h-3 rounded-full bg-green-400"></div>
                   </div>
                   <div className="grid grid-cols-2 gap-4">
                      <div className="bg-white h-24 rounded-lg shadow-sm border border-gray-100"></div>
                      <div className="bg-white h-24 rounded-lg shadow-sm border border-gray-100"></div>
                      <div className="bg-white h-32 col-span-2 rounded-lg mt-2 border border-[#A1D573]/30 relative overflow-hidden">
                        <div className="absolute inset-x-0 bottom-0 h-1 bg-[#A1D573]"></div>
                      </div>
                   </div>
                </div>
             </div>
          </div>
          
          <div className="flex-1 space-y-8">
             <h2 className="text-3xl md:text-5xl font-bold text-gray-900">不仅是维修，<br/>更是<span className="text-[#A1D573]">全域智能</span></h2>
             <p className="text-gray-500 text-lg">JustPai 提供的不仅仅是随叫随到的维修师傅。我们将每一次服务数字化，为您生成可视化的空间健康报告。</p>
             
             <ul className="space-y-6">
                <li className="flex items-start gap-4">
                   <div className="p-2 rounded-lg bg-gray-50 text-gray-900">
                      <BarChart3 size={20} />
                   </div>
                   <div>
                      <h4 className="font-bold text-gray-900">实时数据看板</h4>
                      <p className="text-gray-500 text-sm mt-1">随时掌握办公室能耗、设备状态与维护成本。</p>
                   </div>
                </li>
                <li className="flex items-start gap-4">
                   <div className="p-2 rounded-lg bg-gray-50 text-gray-900">
                      <ShieldCheck size={20} />
                   </div>
                   <div>
                      <h4 className="font-bold text-gray-900">合规与安全审计</h4>
                      <p className="text-gray-500 text-sm mt-1">自动生成消防、电力安全巡检报告，符合ISO标准。</p>
                   </div>
                </li>
                <li className="flex items-start gap-4">
                   <div className="p-2 rounded-lg bg-gray-50 text-gray-900">
                      <Globe size={20} />
                   </div>
                   <div>
                      <h4 className="font-bold text-gray-900">多站点统一管理</h4>
                      <p className="text-gray-500 text-sm mt-1">无论您在上海、北京还是深圳，通过一个Dashboard管理所有办公室。</p>
                   </div>
                </li>
             </ul>
          </div>
        </div>
      </section>

      <section className="py-24 px-6 bg-white">
         <div className="max-w-7xl mx-auto">
            <div className="flex justify-between items-end mb-12">
               <div>
                  <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">标杆合作案例</h2>
                  <p className="text-gray-500">赋能各行业头部企业，打造智慧空间新标准</p>
               </div>
               <button onClick={() => onNavigate('news')} className="text-sm font-bold text-[#A1D573] hover:underline flex items-center gap-1 group">
                  新闻中心 <ChevronRight size={16} className="group-hover:translate-x-1 transition-transform"/>
               </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
               {featuredCases.map((item, idx) => (
                  <div 
                    key={idx} 
                    onClick={() => onNavigate('detail', item)} 
                    className={`rounded-2xl overflow-hidden cursor-pointer group ${CARD_THEME_GLOW}`}
                  >
                     <div className="h-48 overflow-hidden relative rounded-t-2xl">
                        <img src={item.img} alt={item.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-60"></div>
                     </div>
                     <div className="p-6">
                        <h3 className="font-bold text-lg text-gray-900 mb-2 line-clamp-1 group-hover:text-[#A1D573] transition-colors">{item.title}</h3>
                        <p className="text-sm text-gray-500 leading-relaxed line-clamp-3 mb-4">
                           {item.desc}
                        </p>
                     </div>
                  </div>
               ))}
            </div>
         </div>
      </section>
      
      <section className="py-24 px-6 relative overflow-hidden bg-white">
         <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#A1D573]/5 to-transparent pointer-events-none"></div>
         <div className="max-w-4xl mx-auto text-center relative z-10">
            <h2 className="text-4xl md:text-6xl font-bold mb-8 text-gray-900">准备好升级您的<br/>办公空间了吗？</h2>
            <p className="text-gray-500 text-lg mb-12 max-w-2xl mx-auto">加入数百家前瞻性企业，体验 JustPai 带来的无感式智能运维服务。现在注册，即可获得免费的“空间健康诊断”。</p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
               <button className={`${BRAND_GRADIENT} text-gray-900 font-bold px-12 py-4 rounded-full text-lg shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300`}>
                  立即注册
               </button>
               <button className={`border border-gray-200 bg-white text-gray-900 font-bold px-12 py-4 rounded-full text-lg hover:scale-105 transition-all duration-300 hover-rhythm`}>
                  登录
               </button>
            </div>
         </div>
      </section>

      <section className="py-24 px-6 bg-white border-t border-gray-50">
         <div className="max-w-7xl mx-auto">
            <div className="flex justify-between items-end mb-12">
               <div>
                  <h2 className="text-3xl font-bold text-gray-900 mb-2">最新动态</h2>
                  <p className="text-gray-500">洞察行业趋势，了解 JustPai 最新进展</p>
               </div>
               <button onClick={() => onNavigate('news')} className="text-sm font-bold text-[#A1D573] hover:underline flex items-center gap-1 group">
                  新闻中心 <ChevronRight size={16} className="group-hover:translate-x-1 transition-transform"/>
               </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
               {featuredNews.map((item, idx) => (
                  <div 
                    key={idx} 
                    onClick={() => onNavigate('detail', item)} 
                    className={`rounded-2xl overflow-hidden cursor-pointer group ${CARD_THEME_GLOW}`}
                  >
                     <div className="h-48 overflow-hidden relative rounded-t-2xl">
                        <img src={item.img} alt={item.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                     </div>
                     <div className="p-6">
                        <div className="text-xs text-gray-400 mb-2 flex items-center gap-1">
                           <Calendar size={12} />
                           {item.date}
                        </div>
                        <h3 className="font-bold text-gray-900 leading-snug line-clamp-2 group-hover:text-[#A1D573] transition-colors">
                           {item.title}
                        </h3>
                     </div>
                  </div>
               ))}
            </div>
         </div>
      </section>
    </>
  );
}

function NewsPage({ onNavigate }) {
  // 新闻中心卡片：按时间排序后取最新 4 条
  const featuredCases = [...ALL_CASES].sort((a, b) => new Date(b.date) - new Date(a.date)).slice(0, 4);
  const featuredNews = [...ALL_NEWS].sort((a, b) => new Date(b.date) - new Date(a.date)).slice(0, 4);

  return (
    <div className="animate-fade-in-up">
      <section className="relative pt-40 pb-20 px-6 bg-white border-b border-gray-100 z-10">
         <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] pointer-events-none z-0">
            <div className="w-full h-full bg-[#A1D573] rounded-full blur-[120px] opacity-20 animate-glow-1"></div>
         </div>
         <div className="absolute bottom-0 right-0 w-[600px] h-[400px] pointer-events-none z-0">
            <div className="w-full h-full bg-[#FFEB69] rounded-full blur-[100px] opacity-30 animate-glow-2"></div>
         </div>

         <div className="max-w-4xl mx-auto text-center relative z-10">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-gray-200 shadow-sm mb-6">
               <Newspaper size={16} className="text-[#A1D573]" />
               <span className="text-xs font-bold text-gray-600 tracking-wide">NEWS CENTER</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">新闻中心</h1>
            <p className="text-gray-500 text-lg">JustPai 最新资讯、行业动态与标杆案例</p>
         </div>
      </section>

      <section className="py-24 px-6 bg-white z-0 relative">
         <div className="max-w-7xl mx-auto">
            <div className="flex justify-between items-end mb-12">
               <h2 className="text-3xl font-bold text-gray-900">最新动态</h2>
               <button onClick={() => onNavigate('news-list')} className="text-sm font-bold text-[#A1D573] flex items-center gap-1 hover:underline">
                  查看更多 <ChevronRight size={16} />
               </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
               {featuredNews.map((item, idx) => (
                  <div key={idx} onClick={() => onNavigate('detail', item)} className={`rounded-2xl overflow-hidden cursor-pointer group ${CARD_THEME_GLOW}`}>
                     <div className="h-48 overflow-hidden relative rounded-t-2xl">
                        <img src={item.img} alt={item.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                     </div>
                     <div className="p-6">
                        <div className="text-xs text-gray-400 mb-2 flex items-center gap-1">
                           <Calendar size={12} />
                           {item.date}
                        </div>
                        <h3 className="font-bold text-gray-900 leading-snug line-clamp-2 group-hover:text-[#A1D573] transition-colors">
                           {item.title}
                        </h3>
                     </div>
                  </div>
               ))}
            </div>
         </div>
      </section>

      <section className="py-24 px-6 bg-gray-50">
         <div className="max-w-7xl mx-auto">
            <div className="flex justify-between items-end mb-12">
               <h2 className="text-3xl font-bold text-gray-900">标杆合作案例</h2>
               <button onClick={() => onNavigate('cases-list')} className="text-sm font-bold text-[#A1D573] flex items-center gap-1 hover:underline">
                  查看更多 <ChevronRight size={16} />
               </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
               {featuredCases.map((item, idx) => (
                  <div key={idx} onClick={() => onNavigate('detail', item)} className={`rounded-2xl overflow-hidden group ${CARD_THEME_GLOW}`}>
                     <div className="h-48 overflow-hidden relative rounded-t-2xl">
                        <img src={item.img} alt={item.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-60"></div>
                     </div>
                     <div className="p-6">
                        <h3 className="font-bold text-lg text-gray-900 mb-2 line-clamp-1 group-hover:text-[#A1D573] transition-colors">{item.title}</h3>
                        <p className="text-sm text-gray-500 leading-relaxed line-clamp-3 mb-4">
                           {item.desc}
                        </p>
                     </div>
                  </div>
               ))}
            </div>
         </div>
      </section>
    </div>
  );
}

function NewsListPage({ onNavigate }) {
  return (
    <div className="animate-fade-in-up">
      <section className="pt-40 pb-16 px-6 bg-white border-b border-gray-100 z-10 relative">
         <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] pointer-events-none z-0">
            <div className="w-full h-full bg-[#A1D573] rounded-full blur-[120px] opacity-20 animate-glow-1"></div>
         </div>
         
         <div className="max-w-4xl mx-auto text-center relative z-10">
            <h1 className="text-3xl md:text-5xl font-bold text-gray-900 mb-6">全部动态</h1>
         </div>
      </section>
      <section className="py-16 px-6 bg-white min-h-[60vh] relative z-0">
         <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[...ALL_NEWS].sort((a, b) => new Date(b.date) - new Date(a.date)).map((item, idx) => (
                <div key={item.id} onClick={() => onNavigate('detail', item)} className={`rounded-2xl overflow-hidden cursor-pointer group ${CARD_THEME_GLOW}`}>
                  <div className="h-56 overflow-hidden relative rounded-t-2xl">
                    <img src={item.img} alt={item.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  </div>
                  <div className="p-6">
                    <div className="text-xs text-gray-400 mb-2 flex items-center gap-1">
                        <Calendar size={12} />
                        {item.date}
                    </div>
                    <h3 className="font-bold text-gray-900 text-lg leading-snug group-hover:text-[#A1D573] transition-colors">
                        {item.title}
                    </h3>
                  </div>
                </div>
            ))}
         </div>
      </section>
    </div>
  );
}

function CaseListPage({ onNavigate }) {
  return (
    <div className="animate-fade-in-up">
      <section className="pt-40 pb-16 px-6 bg-white border-b border-gray-100 relative z-10">
         <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] pointer-events-none z-0">
            <div className="w-full h-full bg-[#A1D573] rounded-full blur-[120px] opacity-20 animate-glow-1"></div>
         </div>

         <div className="max-w-4xl mx-auto text-center relative z-10">
            <h1 className="text-3xl md:text-5xl font-bold text-gray-900 mb-6">全部合作案例</h1>
         </div>
      </section>
      <section className="py-16 px-6 bg-white min-h-[60vh] relative z-0">
         <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[...ALL_CASES].sort((a, b) => new Date(b.date) - new Date(a.date)).map((item, idx) => (
                <div key={item.id} onClick={() => onNavigate('detail', item)} className={`rounded-2xl overflow-hidden cursor-pointer group ${CARD_THEME_GLOW}`}>
                  <div className="h-56 overflow-hidden relative rounded-t-2xl">
                    <img src={item.img} alt={item.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-60"></div>
                  </div>
                  <div className="p-6">
                    <h3 className="font-bold text-xl text-gray-900 mb-3 group-hover:text-[#A1D573] transition-colors">{item.title}</h3>
                    <p className="text-sm text-gray-500 leading-relaxed">
                        {item.desc}
                    </p>
                  </div>
                </div>
            ))}
         </div>
      </section>
    </div>
  );
}

function AboutPage() {
  return (
    <div className="animate-fade-in-up">
      <section className="relative pt-40 pb-24 px-6 bg-white border-b border-gray-100 z-10">
         <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] pointer-events-none z-0">
            <div className="w-full h-full bg-[#A1D573] rounded-full blur-[120px] opacity-20 animate-glow-1"></div>
         </div>
         <div className="absolute bottom-0 right-0 w-[600px] h-[400px] pointer-events-none z-0">
            <div className="w-full h-full bg-[#FFEB69] rounded-full blur-[100px] opacity-30 animate-glow-2"></div>
         </div>

         <div className="absolute inset-0 opacity-40 pointer-events-none">
            <div className="absolute right-0 top-0 w-1/2 h-full bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px] [mask-image:linear-gradient(to_left,white,transparent)]"></div>
         </div>
         <div className="max-w-7xl mx-auto relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
               <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-gray-200 shadow-sm mb-6">
                  <Building2 size={16} className="text-[#A1D573]" />
                  <span className="text-xs font-bold text-gray-600 tracking-wide">ABOUT US</span>
               </div>
               <h1 className="text-5xl md:text-6xl font-bold text-gray-900 leading-tight mb-6">
                  专注企业 <br/>
                  <span className="relative z-10 inline-block">
                     快速工程服务
                     <span className="absolute bottom-2 left-0 w-full h-3 bg-[#FFEB69] -z-10 opacity-60"></span>
                  </span>
               </h1>
               <p className="text-xl text-gray-600 leading-relaxed max-w-lg">
                  那就这么派，是一家极具创造力的互联网快速工程服务提供商。借助超前的“线上线下一体化”商业模式，为企业提供快速、敏捷、专业的工程服务。
               </p>
            </div>
            <div className="relative h-64 lg:h-96 w-full hidden lg:block">
               <div className={`absolute top-10 right-10 w-64 h-64 rounded-full ${BG_GRADIENT_LIGHT} blur-3xl`}></div>
               <div className="absolute top-0 right-0 w-full h-full flex items-center justify-center">
                  <div className="grid grid-cols-2 gap-4">
                     <div className="w-40 h-48 bg-white rounded-2xl shadow-xl border border-gray-100 p-6 flex flex-col justify-between transform translate-y-8">
                        <Users className="text-[#A1D573] w-10 h-10" />
                        <div>
                           <div className="text-3xl font-bold text-gray-900">1000+</div>
                           <div className="text-sm text-gray-500">专业师傅</div>
                        </div>
                     </div>
                     <div className="w-40 h-48 bg-gray-900 rounded-2xl shadow-xl p-6 flex flex-col justify-between">
                        <MapPin className="text-[#FFEB69] w-10 h-10" />
                        <div>
                           <div className="text-3xl font-bold text-white">150+</div>
                           <div className="text-sm text-gray-400">服务城市</div>
                        </div>
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </section>

      <section className="py-24 px-6 relative bg-white z-0">
         <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
               <h2 className="text-3xl font-bold text-gray-900">我们的核心优势</h2>
               <p className="text-gray-500 mt-2">构建“平台+网络+服务”的完整生态闭环</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
               {[
                  { title: "线上数字化平台", icon: Smartphone, desc: "500+标准化快速工程及运维产品，客户可在线咨询、下单。全流程透明化管理，让工程服务像网购一样便捷。" },
                  { title: "全国服务网络", icon: MapPin, desc: "线下服务网络覆盖全国56+核心城市，划分华北、华东、华南、华西十大业务区域，服务能力下沉至4线城市。" },
                  { title: "敏捷交付服务", icon: Clock, desc: "提供年度框架服务及六大类标准化服务。依托全国供应链生态，实现“所需即所得”的高效交付体验。" }
               ].map((item, i) => (
                  <div key={i} className={`rounded-3xl p-8 group ${CARD_THEME_GLOW}`}>
                     <div className={`w-14 h-14 rounded-2xl ${BG_GRADIENT_LIGHT} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                        <item.icon size={28} className="text-gray-900" />
                     </div>
                     <h3 className="text-xl font-bold text-gray-900 mb-3">{item.title}</h3>
                     <p className="text-gray-500 leading-relaxed text-sm">{item.desc}</p>
                  </div>
               ))}
            </div>
         </div>
      </section>

      <section className="py-24 px-6 bg-gray-50">
         <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-900 mb-16 text-center">企业发展里程碑</h2>
            <div className="relative pl-8 md:pl-0">
               <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-px bg-gray-200 -translate-x-1/2 hidden md:block"></div>
               <div className="absolute left-8 top-0 bottom-0 w-px bg-gray-200 md:hidden"></div>

               <div className="space-y-12">
                  {HISTORY.map((item, index) => (
                     <div key={index} className={`relative flex flex-col md:flex-row items-center ${index % 2 === 0 ? '' : 'md:flex-row-reverse'}`}>
                        
                        <div className="absolute left-8 md:left-1/2 w-4 h-4 bg-white border-4 border-[#A1D573] rounded-full -translate-x-1/2 z-10 shadow-[0_0_0_4px_rgba(255,255,255,0.5)]"></div>

                        <div className={`hidden md:block w-1/2 px-12 ${index % 2 === 0 ? 'text-right' : 'text-left'}`}>
                           <span className="text-5xl font-bold text-gray-200">{item.year}</span>
                        </div>

                        <div className="w-full md:w-1/2 pl-12 md:pl-0 md:px-12">
                           <div className={`p-6 rounded-2xl relative ${CARD_THEME_GLOW}`}>
                              <span className="md:hidden text-4xl font-bold text-gray-100 absolute right-4 top-4">{item.year}</span>
                              
                              <h3 className="text-lg font-bold text-gray-900 mb-2 flex items-center gap-2">
                                 {item.title}
                              </h3>
                              <p className="text-sm text-gray-500 leading-relaxed text-justify">
                                 {item.desc}
                              </p>
                           </div>
                        </div>
                     </div>
                  ))}
               </div>
            </div>
         </div>
      </section>

      <section className="py-24 px-6 bg-white">
         <div className="max-w-6xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-16">全场景工程服务能力</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6">
               {SERVICE_ICONS.map((service, idx) => (
                  <div key={idx} className="group bg-white p-6 rounded-2xl border border-gray-100 hover:border-[#FFEB69] hover:shadow-lg transition-all flex flex-col items-center justify-center aspect-square">
                     <div className="w-12 h-12 rounded-full bg-gray-50 flex items-center justify-center text-gray-400 mb-4 group-hover:bg-[#FFEB69]/20 group-hover:text-black transition-colors">
                        <service.icon size={24} strokeWidth={1.5} />
                     </div>
                     <span className="font-bold text-gray-700 text-sm group-hover:text-black">{service.name}</span>
                  </div>
               ))}
               <div className="group bg-gray-50 p-6 rounded-2xl border border-dashed border-gray-200 hover:border-gray-400 transition-all flex flex-col items-center justify-center aspect-square cursor-pointer">
                  <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center text-gray-400 mb-4">
                     <ChevronRight size={24} />
                  </div>
                  <span className="font-bold text-gray-500 text-sm">查看更多</span>
               </div>
            </div>
         </div>
      </section>
    </div>
  );
}

function JoinPage() {
   return (
     <div className="animate-fade-in-up">
       <section className="relative pt-40 pb-24 px-6 bg-white border-b border-gray-100 z-10">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] pointer-events-none z-0">
             <div className="w-full h-full bg-[#A1D573] rounded-full blur-[120px] opacity-20 animate-glow-1"></div>
          </div>
          <div className="absolute bottom-0 right-0 w-[600px] h-[400px] pointer-events-none z-0">
             <div className="w-full h-full bg-[#FFEB69] rounded-full blur-[100px] opacity-30 animate-glow-2"></div>
          </div>
          
          <div className="absolute inset-0 opacity-40 pointer-events-none">
            <div className="absolute right-0 top-0 w-1/2 h-full bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px] [mask-image:linear-gradient(to_left,white,transparent)]"></div>
          </div>

          <div className="max-w-7xl mx-auto relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
             <div>
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-gray-200 shadow-sm mb-6">
                   <UserPlus size={16} className="text-[#A1D573]" />
                   <span className="text-xs font-bold text-gray-600 tracking-wide">CAREERS & PARTNERSHIP</span>
                </div>
                <h1 className="text-5xl md:text-6xl font-bold text-gray-900 leading-tight mb-6">
                   共建未来 <br/>
                   <span className="relative z-10 inline-block">
                      智能服务生态
                      <span className="absolute bottom-2 left-0 w-full h-3 bg-[#FFEB69] -z-10 opacity-60"></span>
                   </span>
                </h1>
                <p className="text-xl text-gray-600 leading-relaxed max-w-lg">
                   无论是寻找职业发展的新机遇，还是寻求商业合作的新可能，JustPai 都是您值得信赖的伙伴。加入我们，共同推动中国新运维产业的发展。
                </p>
             </div>
             <div className="hidden lg:block w-full h-64 lg:h-96"></div>
          </div>
       </section>
 
       <section className="py-24 px-6 relative z-0 bg-white">
          <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
             
             <div className={`rounded-[32px] p-8 md:p-10 flex flex-col group ${CARD_THEME_GLOW}`}>
                <div className="flex items-center gap-3 mb-6">
                   <h2 className="text-3xl font-bold text-gray-900">加入 <span className={PAI_GRADIENT_TEXT}>Pai</span> 团队</h2>
                </div>
                <p className="text-gray-600 leading-relaxed text-lg flex-1 mb-8">
                   这么派平台为优秀人才提供了更丰富的机会、更广阔的发展空间，欢迎大家与我们一起在多元的业务场景中学习成长，不断为客户创造价值和为充实提高自己而做出的努力！
                </p>
                <div className="flex items-center gap-3 mt-auto pt-6 border-t border-gray-50">
                   <div className="p-3 bg-blue-50 rounded-full text-blue-500">
                      <Phone size={24} />
                   </div>
                   <div>
                      <div className="text-xs text-gray-400 font-bold uppercase tracking-wider">联系电话</div>
                      <div className="text-xl font-bold text-gray-900">400-668-1997</div>
                   </div>
                </div>
             </div>
 
             <div className={`rounded-[32px] p-8 md:p-10 flex flex-col group ${CARD_THEME_GLOW}`}>
                <div className="flex items-center gap-3 mb-6">
                   <h2 className="text-3xl font-bold text-gray-900">成为 <span className="text-[#A1D573]">平台合作伙伴</span></h2>
                </div>
                <p className="text-gray-600 leading-relaxed text-lg flex-1 mb-8">
                   欢迎携手融入强大的“这么派”平台全国供应链生态圈，借助平台线上线下服务体系，拓展业务、实现更大商业价值。让我们一起赋能企业园区与商业楼宇，提升资产价值！
                </p>
                <div className="flex items-center gap-3 mt-auto pt-6 border-t border-gray-50">
                    <div className="p-3 bg-[#A1D573]/10 rounded-full text-[#A1D573]">
                      <Mail size={24} />
                   </div>
                   <div>
                      <div className="text-xs text-gray-400 font-bold uppercase tracking-wider">合作邮箱</div>
                      <div className="text-xl font-bold text-gray-900">service@justpai.com</div>
                   </div>
                </div>
             </div>
          </div>
       </section>
 
       <section className="py-24 px-6 bg-gray-50">
          <div className="max-w-7xl mx-auto text-center">
             <div className="inline-block mb-12">
                <h2 className="text-3xl font-bold text-gray-900 mb-2">我们的核心价值观</h2>
                <div className="h-1 w-20 bg-[#A1D573] mx-auto rounded-full"></div>
             </div>
             
             <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
                {[
                   { name: "以客户为中心", icon: Heart, color: "text-red-500" },
                   { name: "拥抱挑战", icon: Target, color: "text-blue-500" },
                   { name: "以奋斗者为本", icon: Users, color: "text-orange-500" },
                   { name: "诚信", icon: ShieldCheck, color: "text-green-500" },
                   { name: "团队合作", icon: Handshake, color: "text-purple-500" },
                   { name: "负责", icon: CheckCircle2, color: "text-indigo-500" },
                ].map((value, i) => (
                   <div key={i} className={`p-6 flex flex-col items-center justify-center rounded-2xl ${CARD_THEME_GLOW}`}>
                      <div className={`w-12 h-12 rounded-full bg-gray-50 flex items-center justify-center mb-4 ${value.color}`}>
                         <value.icon size={24} />
                      </div>
                      <span className="font-bold text-gray-900">{value.name}</span>
                   </div>
                ))}
             </div>
          </div>
       </section>
     </div>
   );
}

function HelpPage() {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleQuestion = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="animate-fade-in-up">
      <section className="relative pt-40 pb-16 px-6 bg-white border-b border-gray-100 z-10">
         <div className="absolute top-[-150px] left-[-250px] w-[800px] h-[500px] pointer-events-none z-0">
            <div className="w-full h-full bg-[#A1D573] rounded-full blur-[120px] opacity-20 animate-glow-1"></div>
         </div>
         <div className="absolute bottom-[-200px] right-[-250px] w-[600px] h-[400px] pointer-events-none z-0">
            <div className="w-full h-full bg-[#FFEB69] rounded-full blur-[100px] opacity-30 animate-glow-2"></div>
         </div>

         <div className="max-w-4xl mx-auto text-center relative z-10">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-gray-200 shadow-sm mb-6">
               <HelpCircle size={16} className="text-[#A1D573]" />
               <span className="text-xs font-bold text-gray-600 tracking-wide">HELP CENTER</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">帮助中心</h1>
            <p className="text-gray-500 text-lg">常见问题解答与服务指南</p>
         </div>
      </section>

      <section className="py-16 px-6 min-h-[60vh] bg-white relative z-0">
         <div className="max-w-4xl mx-auto">
            <div className="space-y-4">
               {FAQ_DATA.map((question, index) => (
                  <div key={index} className="border border-gray-100 rounded-xl overflow-hidden hover:border-gray-300 transition-colors bg-white">
                     <button 
                        onClick={() => toggleQuestion(index)}
                        className="w-full flex items-center justify-between p-6 text-left focus:outline-none"
                     >
                        <span className={`font-bold text-lg ${openIndex === index ? 'text-[#A1D573]' : 'text-gray-900'}`}>
                           {question}
                        </span>
                        <ChevronDown 
                           size={20} 
                           className={`text-gray-400 transition-transform duration-300 ${openIndex === index ? 'rotate-180' : ''}`} 
                        />
                     </button>
                     
                     <div 
                        className={`overflow-hidden transition-all duration-300 ease-in-out ${openIndex === index ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}
                     >
                        <div className="px-6 pb-6 text-gray-600 leading-relaxed bg-gray-50/50 pt-2 border-t border-gray-50">
                           {/* 占位符文字 */}
                           xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
                        </div>
                     </div>
                  </div>
               ))}
            </div>
         </div>
      </section>
    </div>
  );
}