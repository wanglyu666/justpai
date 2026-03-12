import React, { useState, useEffect } from 'react';
import { Routes, Route, useNavigate, useLocation, useParams, Navigate } from 'react-router-dom';
import { Menu, X, ArrowRight, Activity, Zap, Layers, BarChart3, ShieldCheck, Globe, Cpu, Download, Users, User, UserPlus, Building2, Smartphone, MapPin, Clock, Wrench, PenTool, Sofa, Droplets, Fan, Leaf, Trash2, FileText, Router, ChevronRight, CheckCircle2, Heart, Handshake, Phone, Mail, HelpCircle, ChevronDown, ChevronLeft, Calendar, Newspaper, ArrowLeft, Target, Share2, Facebook, Twitter, Linkedin, AlertTriangle } from 'lucide-react';
import STANDARDS_DB from './data/standards';
import { ALL_CASES, ALL_NEWS } from './data/content';
import { BRAND_GRADIENT, PAI_GRADIENT_TEXT, BG_GRADIENT_LIGHT, CARD_THEME_GLOW } from './constants/theme';

// --- 其他数据 ---
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

function buildNavigate(navigate, setMobileMenuOpen) {
  return (page, data = null) => {
    setMobileMenuOpen(false);
    if (page === 'detail' && data) {
      const isNews = ALL_NEWS.some((n) => n.id === data.id);
      navigate(isNews ? `/news/${data.id}` : `/cases/${data.id}`);
    } else {
      const pathMap = { home: '/', news: '/news', 'news-list': '/news-list', 'cases-list': '/cases-list', standards: '/standards', about: '/about', join: '/join', help: '/help' };
      navigate(pathMap[page] || '/');
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };
}

function isNewsCenter(pathname) {
  return pathname === '/news' || pathname === '/news-list' || pathname === '/cases-list' || pathname.startsWith('/news/') || pathname.startsWith('/cases/');
}

export default function App() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const pathname = location.pathname;
  const navigateTo = buildNavigate(navigate, setMobileMenuOpen);

  return (
    <div className="min-h-screen bg-white text-gray-900 font-sans selection:bg-[#A1D573] selection:text-white overflow-x-hidden relative">
      
      {/* 顶部悬浮毛玻璃导航栏 (在 standards 页面隐藏) */}
      {pathname !== '/standards' && (
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
              <button onClick={() => navigateTo('home')} className={`whitespace-nowrap transition-colors ${pathname === '/' ? 'text-gray-900 font-bold' : 'text-gray-500 hover:text-gray-900'}`}>首页</button>
              <button onClick={() => navigateTo('news')} className={`whitespace-nowrap transition-colors ${isNewsCenter(pathname) ? 'text-gray-900 font-bold' : 'text-gray-500 hover:text-gray-900'}`}>新闻中心</button>
              <button onClick={() => navigateTo('about')} className={`whitespace-nowrap transition-colors ${pathname === '/about' ? 'text-gray-900 font-bold' : 'text-gray-500 hover:text-gray-900'}`}>关于我们</button>
              <button onClick={() => navigateTo('join')} className={`whitespace-nowrap transition-colors ${pathname === '/join' ? 'text-gray-900 font-bold' : 'text-gray-500 hover:text-gray-900'}`}>加入我们</button>
              <button onClick={() => navigateTo('help')} className={`whitespace-nowrap transition-colors flex items-center gap-1 ${pathname === '/help' ? 'text-gray-900 font-bold' : 'text-gray-500 hover:text-gray-900'}`}>帮助中心</button>
            </div>

            <button className="md:hidden text-gray-900 shrink-0" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </nav>
        </div>
      )}

      {mobileMenuOpen && pathname !== '/standards' && (
        <div className="md:hidden fixed top-24 left-1/2 -translate-x-1/2 w-[90%] max-w-sm bg-gray-100/90 backdrop-blur-xl border border-white/60 rounded-3xl p-6 flex flex-col gap-6 shadow-2xl z-[90]">
          <button onClick={() => navigateTo('home')} className="text-lg text-left text-gray-600 hover:text-gray-900 font-medium">首页</button>
          <button onClick={() => navigateTo('news')} className="text-lg text-left text-gray-600 hover:text-gray-900 font-medium">新闻中心</button>
          <button onClick={() => navigateTo('about')} className="text-lg text-left text-gray-600 hover:text-gray-900 font-medium">关于我们</button>
          <button onClick={() => navigateTo('join')} className="text-lg text-left text-gray-600 hover:text-gray-900 font-medium">加入我们</button>
          <button onClick={() => navigateTo('help')} className="text-lg text-left text-gray-600 hover:text-gray-900 font-medium">帮助中心</button>
        </div>
      )}

      {/* 页面内容路由 (URL 可分享：/news/1、/cases/2 等) */}
      <main>
        <Routes>
          <Route path="/" element={<HomePage onNavigate={navigateTo} />} />
          <Route path="/news" element={<NewsPage onNavigate={navigateTo} />} />
          <Route path="/news-list" element={<NewsListPage onNavigate={navigateTo} />} />
          <Route path="/cases-list" element={<CaseListPage onNavigate={navigateTo} />} />
          <Route path="/news/:id" element={<DetailPage onNavigate={navigateTo} />} />
          <Route path="/cases/:id" element={<DetailPage onNavigate={navigateTo} />} />
          <Route path="/standards" element={<StandardsPage onNavigate={navigateTo} />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/join" element={<JoinPage />} />
          <Route path="/help" element={<HelpPage />} />
        </Routes>
      </main>

      {/* 公共页脚 (在 standards 页面隐藏) */}
      {pathname !== '/standards' && (
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

// ================= 通用内容详情页 (DetailPage，支持 URL /news/:id、/cases/:id 分享) =================
function DetailPage({ data: dataProp, onNavigate }) {
  const { id: idParam } = useParams();
  const { pathname } = useLocation();
  const dataFromUrl = (() => {
    if (dataProp) return dataProp;
    if (!idParam) return null;
    const isNews = pathname.startsWith('/news');
    const list = isNews ? ALL_NEWS : ALL_CASES;
    const item = list.find((i) => String(i.id) === String(idParam));
    return item || null;
  })();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [dataFromUrl]);

  if (!dataFromUrl) {
    return <Navigate to={pathname.startsWith('/news') ? '/news' : '/cases-list'} replace />;
  }
  const data = dataFromUrl;

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
    { 
      name: '成品管控', 
      sub: [
        '非独立作业区隔挡',
        '小型非独立作业区隔挡',
        '物料清运通道地面',
        '电梯',
        '软装饰地面',
        '墙面',
        '石材、人造石台面',
        '普通设备',
        '家具',
        '软硬包、吸音板',
        '门/窗/柜',
        '硬装饰地面',
        '打胶',
        '玻璃饰面',
        '洁具/卫浴',
        '标识、标牌、艺术陈列品',
        '玻璃幕墙、玻璃隔断',
        '金属型材',
        '柔性天花',
        '空调机组安装成品保护',
        '柴油发电机组安装成品保护',
        '水泵安装成品保护',
        '风机、风口安装成品保护',
        '不锈钢水箱安装成品保护',
        '防雷接地安装成品保护',
        '管道安装成品保护',
        '阀门安装成品保护',
        '地漏安装成品保护',
        '信息弱电系统作业成品保护',
        '消防系统作业成品保护',
        '管道作业成品保护',
        '电气系统作业成品保护',
        '空调作业成品保护',
        '给水、排水作业成品保护',
        '室外、管线作业成品保护',
        '精密设备设备成品保护'
      ] 
    },
    { name: '卫生保洁', sub: ['施工保洁员', '卫生除尘措施', '废料垃圾清除', '完工保洁', '洒水降尘措施'] },
    { 
      name: '风险管控', 
      sub: [
        '人员出入风险', 
        '工程/材料出入口风险',
        { key: '孔洞防护风险管控', name: '孔洞防护' },
        '临时用电',
        '高空作业',
        '切割作业',
        '电动工具使用',
        '异味作业',
        '粉尘工作',
        '玻璃纤维作业',
        '噪音工作',
        '动火作业',
        '环境风险',
        '管道断水及打压',
        '拆除作业',
        '起重吊装',
        '消防器材',
        '外墙作业',
        '玻璃作业',
        '机电检修作业'
      ] 
    }
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
                    {(() => {
                      const current = STANDARDS_DB[activeSubItem];
                      const isRisk = current && current.risk;
                      const hasLongTrigger = isRisk && !!current.longTrigger;

                      if (isRisk) {
                        return (
                          <>
                            {/* 风险管控头部属性卡片（如存在 longTrigger，则只展示 3 张卡片） */}
                            <div className={`grid grid-cols-2 ${hasLongTrigger ? 'md:grid-cols-3' : 'md:grid-cols-4'} gap-4`}>
                              {/* 风险值 */}
                              <div className="p-5 rounded-2xl bg-orange-50 border border-orange-100 flex flex-col gap-3 hover:shadow-md transition-shadow">
                                <div className="flex items-center gap-2 text-orange-600 font-medium">
                                  <AlertTriangle size={16} />
                                  <span className="text-xs uppercase tracking-wider font-bold">风险值</span>
                                </div>
                                <p className="text-orange-900 font-bold text-lg">
                                  {current.riskValue || '—'}
                                </p>
                              </div>

                              {/* 发生频率 */}
                              <div className="p-5 rounded-2xl bg-gray-50 border border-gray-100 flex flex-col gap-3 hover:shadow-md transition-shadow">
                                <div className="flex items-center gap-2 text-gray-500 font-medium">
                                  <Activity size={16} className="text-blue-500" />
                                  <span className="text-xs uppercase tracking-wider font-bold">发生频率</span>
                                </div>
                                <p className="text-gray-900 font-bold text-lg">
                                  {current.riskFrequency || '—'}
                                </p>
                              </div>

                              {/* 承受风险方 */}
                              <div className="p-5 rounded-2xl bg-gray-50 border border-gray-100 flex flex-col gap-3 hover:shadow-md transition-shadow">
                                <div className="flex items-center gap-2 text-gray-500 font-medium">
                                  <Users size={16} className="text-purple-500" />
                                  <span className="text-xs uppercase tracking-wider font-bold">承受风险方</span>
                                </div>
                                <p className="text-gray-900 font-bold text-base leading-snug whitespace-pre-wrap">
                                  {current.riskOwner || '—'}
                                </p>
                              </div>

                              {/* 触发条件：仅当不存在 longTrigger 时在卡片中展示 */}
                              {!hasLongTrigger && (
                                <div className="p-5 rounded-2xl bg-gray-50 border border-gray-100 flex flex-col gap-3 hover:shadow-md transition-shadow">
                                  <div className="flex items-center gap-2 text-gray-500 font-medium">
                                    <Zap size={16} className="text-yellow-500" />
                                    <span className="text-xs uppercase tracking-wider font-bold">触发条件</span>
                                  </div>
                                  <p className="text-gray-900 font-bold text-base leading-snug whitespace-pre-wrap">
                                    {current.riskTrigger || '—'}
                                  </p>
                                </div>
                              )}
                            </div>

                            {/* 中部高危提示区域 */}
                            <div className="flex flex-col md:flex-row gap-8 p-8 rounded-3xl bg-red-50/50 border border-red-100 shadow-[0_4px_20px_rgba(255,0,0,0.02)] mt-6">
                              {/* 左侧：可能发生的风险 */}
                              <div className="flex-1">
                                <h4 className="text-red-800 font-bold mb-3 flex items-center gap-2 text-lg">
                                  <div className="w-2 h-2 rounded-full bg-red-500"></div>
                                  可能发生的风险
                                </h4>
                                <p className="text-red-900/80 leading-relaxed font-medium text-lg whitespace-pre-wrap">
                                  {current.riskPossible || '—'}
                                </p>
                              </div>

                              {/* 分割线（响应式） */}
                              <div className="hidden md:block w-px bg-red-200/50"></div>
                              <div className="md:hidden h-px w-full bg-red-200/50"></div>

                              {/* 右侧：不管控的后果 */}
                              <div className="flex-1">
                                <h4 className="text-red-800 font-bold mb-3 flex items-center gap-2 text-lg">
                                  <div className="w-2 h-2 rounded-full bg-red-500"></div>
                                  不管控的后果
                                </h4>
                                <p className="text-red-900/80 leading-relaxed font-medium text-lg whitespace-pre-wrap">
                                  {current.riskOutcome || '—'}
                                </p>
                              </div>
                            </div>
                          </>
                        );
                      }

                      // 非风险项：根据是否有 trigger 决定是否展示第三张“触发条件”卡片
                      const hasTriggerMeta = !!current.trigger && !current.hideTriggerCard;

                      return (
                        <div className={`grid grid-cols-1 ${hasTriggerMeta ? 'md:grid-cols-3' : 'md:grid-cols-2'} gap-6`}>
                          {hasTriggerMeta && (
                            <div className="p-6 rounded-2xl bg-gray-50 border border-gray-100 flex flex-col gap-4 hover:shadow-md transition-shadow">
                              <div className="flex items-center gap-2 text-gray-500 font-medium">
                                <Zap size={18} className="text-yellow-500" />
                                <span className="text-sm tracking-wide uppercase">触发条件</span>
                              </div>
                              <p className="text-gray-900 font-bold leading-snug whitespace-pre-wrap">
                                {current.trigger}
                              </p>
                            </div>
                          )}

                          <div className="p-6 rounded-2xl bg-gray-50 border border-gray-100 flex flex-col gap-4 hover:shadow-md transition-shadow">
                            <div className="flex items-center gap-2 text-gray-500 font-medium">
                              <Activity size={18} className="text-blue-500" />
                              <span className="text-sm tracking-wide uppercase">过程检查</span>
                            </div>
                            <p className="text-gray-900 font-bold leading-snug whitespace-pre-wrap">{current.check}</p>
                          </div>

                          <div className="p-6 rounded-2xl bg-gray-50 border border-gray-100 flex flex-col gap-4 hover:shadow-md transition-shadow">
                            <div className="flex items-center gap-2 text-gray-500 font-medium">
                              <FileText size={18} className="text-[#A1D573]" />
                              <span className="text-sm tracking-wide uppercase">执行标准</span>
                            </div>
                            <p className="text-gray-900 font-bold leading-snug whitespace-pre-wrap">{current.reference}</p>
                          </div>
                        </div>
                      );
                    })()}

                    {/* 具体标准 / 管控措施条款列表 */}
                    <div>
                      <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3 border-b border-gray-100 pb-4">
                        {STANDARDS_DB[activeSubItem]?.risk ? (
                          <>
                            <ShieldCheck size={24} className="text-[#A1D573]" />
                            管控措施细则
                          </>
                        ) : (
                          <>
                            <Layers size={24} className="text-[#A1D573]" />
                            管理标准细则
                          </>
                        )}
                      </h3>
                      
                      <div className="space-y-5">
                        {(() => {
                          const current = STANDARDS_DB[activeSubItem];
                          if (!current) return null;

                          const rules = current.rules || [];
                          const isRisk = !!current.risk;
                          const hasSubStructure = rules.some((rule) => /\n\d+[)）]/.test(rule || ''));

                          // 风险管控且无 1）2）子条款：保持简单卡片列表，并去掉文字前缀序号
                          if (isRisk && !hasSubStructure) {
                            return rules.map((rule, idx) => {
                              const cleaned = (rule || '')
                                .replace(/^\d+[）\).、]\s*/, '')
                                .trim();
                              return (
                                <div
                                  key={idx}
                                  className="flex items-start gap-5 p-6 rounded-2xl border border-gray-100 shadow-[0_4px_20px_rgba(0,0,0,0.02)] bg-white hover:border-[#A1D573]/50 transition-all"
                                >
                                  <div className="w-10 h-10 rounded-full bg-[#A1D573]/10 text-[#A1D573] flex items-center justify-center font-bold text-lg shrink-0 mt-0.5">
                                    {idx + 1}
                                  </div>
                                  <div className="flex-1">
                                    <p className="text-gray-700 leading-relaxed text-lg m-0 whitespace-pre-wrap">
                                      {cleaned}
                                    </p>
                                  </div>
                                </div>
                              );
                            });
                          }

                          // 其它情况（包括健康/安全管控，以及带 1）2）子条款的风险管控）：
                          // 使用“一级+二级”条款解析逻辑，缩进样式与“粉尘控制”等保持一致
                          const isLadder = activeSubItem === '梯子的使用';
                          const introSubList = ['岗前培训', '医药箱配置'];
                          const useIntroSub = introSubList.includes(activeSubItem) && rules.length > 1;

                          const blocks = [];
                          let primaryNum = 0;

                          if (isLadder) {
                            const fullRule = rules.join('\n');
                            const segments = fullRule.split(/\n(?=\d+[)）])/);
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
                              const parts = rule.split(/\n(?=\d+[)）])/);
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
                            const shouldStripPrefix = !isRisk; // 仅非风险项去掉开头的“一、”“1）”等前缀
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
                                    {isSub
                                      ? block.text
                                      : (shouldStripPrefix
                                          ? block.text
                                              .replace(/^[一二三四五六七八九十]+、\s*/, '')
                                              .replace(/^\d+[）)]\s*/, '')
                                              .trim()
                                          : block.text)}
                                  </p>
                                </div>
                              </div>
                            );
                          });
                        })()}
                      </div>

                      {/* 如果存在 longTrigger，则在所有条款列表之后统一展示触发条件说明 */}
                      {STANDARDS_DB[activeSubItem]?.longTrigger && (
                        <div className="mt-10 pt-6 border-t border-gray-100">
                          <p className="text-xs font-bold text-gray-400 mb-2 tracking-wide uppercase">
                            触发条件
                          </p>
                          <p className="text-sm text-gray-600 leading-relaxed whitespace-pre-wrap">
                            {STANDARDS_DB[activeSubItem].longTrigger}
                          </p>
                        </div>
                      )}
                    </div>

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
