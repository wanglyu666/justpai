import React, { useState, useEffect } from 'react';
import { Routes, Route, useNavigate, useLocation, useParams, Navigate } from 'react-router-dom';
import { Menu, X, ArrowRight, Activity, Zap, Layers, BarChart3, ShieldCheck, Globe, Cpu, Download, Users, User, UserPlus, Building2, Smartphone, MapPin, Clock, Wrench, PenTool, Sofa, Droplets, Fan, Leaf, Trash2, FileText, Router, ChevronRight, CheckCircle2, Heart, Handshake, Phone, Mail, HelpCircle, ChevronDown, ChevronLeft, Calendar, Newspaper, ArrowLeft, Target, Share2, Facebook, Twitter, Linkedin, AlertTriangle } from 'lucide-react';
import STANDARDS_DB from './data/standards';
import { STANDARD_SLUGS, getCategoryAndKeyBySlug } from './data/standardSlugs';
import { ALL_CASES, ALL_NEWS } from './data/content';
import { contentImageSrc } from './data/contentApi';
import { useContent } from './context/ContentContext';
import { HeroParallax } from './components/HeroParallax';
import ScrollVelocity from './components/ScrollVelocity';
import { BRAND_GRADIENT, PAI_GRADIENT_TEXT, BG_GRADIENT_LIGHT, CARD_THEME_GLOW } from './constants/theme';

// --- 其他数据 ---
// 客户 LOGO 轮播：使用本地 client logo 文件夹中的实际 Logo，尺寸仍按组件样式约束为 100x100
const CLIENTS = [
  { name: 'Nestle', src: '/client logo/nestle-logo-2.svg' },
  { name: 'Siemens', src: '/client logo/siemens.svg' },
  { name: 'BMW', src: '/client logo/bmw-10.svg' },
  { name: 'Huawei', src: '/client logo/huawei-pure-.svg' },
  { name: 'Xiaomi', src: '/client logo/xiaomi-3.svg' },
  { name: 'Meituan', src: '/client logo/Meituan_idd2w_6T97_0.svg' },
  { name: 'Kongsberg', src: '/client logo/kongsberg.svg' },
  { name: 'Novo Nordisk', src: '/client logo/novo-nordisk-1.svg' },
  { name: 'ISS', src: '/client logo/iss-4.svg' },
  { name: 'Sodexo', src: '/client logo/sodexo-1.svg' },
  { name: 'Continental', src: '/client logo/continental-2-1.svg' },
  { name: 'British', src: '/client logo/british.svg' },
  { name: 'Omron', src: '/client logo/omron.svg' },
];

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
  { question: "我们能提供什么服务？", answer: "平台提供设施运维、空间改造、机电改造、弱电改造、场所智能改造、地网建设、商办空间设计及定制服务等8大工程服务类别。商店包含平台提供的300余种单项运维和工程产品，通常由1个或多个产品组合形成1项服务，客户可自行选择，也可由平台客服协助搭配。" },
  { question: "购物车中为什么有普通产品和定制产品，有什么区别？", answer: "普通产品指品牌、型号、计量价格及服务内容明确的标准产品；定制产品则由平台根据您的需求，对形状、颜色、规格、材料等进行个性化加工。定制产品因无法二次销售，不支持退换货，但同样享有1年保修服务。" },
  { question: "我们的服务范围？", answer: "我们的服务范围目前涵盖以下城市：哈尔滨、长春、吉林、沈阳、大连、苏州、南京、无锡、常州、泰州、南通、常熟、张家港、太仓、昆山、吴江、杭州、宁波、绍兴、温州、嘉兴、金华、台州、厦门、福州、广州、深圳、东莞、佛山、珠海、中山、江门、南宁、海口、三亚、北京、天津、石家庄、唐山、太原、上海、郑州、青岛、济南、成都、贵阳、昆明、合肥、芜湖、武汉、南昌、长沙、重庆、西安、咸阳。如果您有其他城市的服务需求，欢迎联系客服，我们将尽力为您安排。" },
  { question: "商店的价格包括什么？", answer: "商店中的价格中包含产品采购、运输与仓储、安装与调试、保修与保险、成品保护与保洁等直接和间接成本，保证全国一致的客户体验。" },
  { question: "商店中默认的起订量为什么不是1，需求量低于起订量怎么下单？", answer: "起订量用于合理分摊运输、仓储、安装、调试、保修、保险及现场保护保洁等成本。若未达到起订量，欢迎致电客服热线 4006-681997，我们将根据您的实际需求协助组合选购两种及以上产品并完成下单。" },
  { question: "这么派平台有几种注册方式？有什么区别？", answer: "这么派平台提供快速注册与企业认证两种客户注册方式。快速注册仅需填写用户名、联系电话、电子邮箱等基本信息，即可浏览平台；企业认证需提交营业执照、银行账户、授权书等资料，认证后可享受平台浏览、在线咨询、产品下单、线下签约及数据报表等线上线下一体化服务。" },
  { question: "我是新手，不会下单，怎么办？", answer: "如您有下单需求，欢迎致电客服热线 4006-681997，我们将根据您的实际需求为您提供专业咨询与下单指导。您也可在平台填写咨询单，待我们与您确认订单信息后，即可协助您完成下单。" },
  { question: "想在商店中订购需要企业注册吗？", answer: "目前平台部分功能需要客户先进行企业认证才可开放，如果您想了解“派产品”的价格和在线订购产品，需要先进行企业认证，平台审核通过后即可使用相关功能。" },
  { question: "平台对订单服务执行过程中是如何管理的？", answer: "平台对订单服务执行全过程实施管理，从下单（非平台订单以立项为起点）至质保期结束。管理内容包括服务立项（设定进度、材料、质量、EHS等目标）及全过程标准化执行监管，确保现场服务规范有序。用户可通过平台或APP在线查看过程资料、参与节点验收，并进行报修、意见反馈与评价等操作。" },
  { question: "你们是中介平台吗？", answer: "我们不是中介平台。我们是一家专注于工程领域的全链条服务自营平台，致力于为客户提供从项目建设到运维的一站式服务。与以解决用工需求、管理人力资源为核心的服务平台不同，我们始终围绕工程业务全流程，自主把控服务标准与交付质量。" },
];

function formatDate(value) {
  if (!value) return '—';
  const d = new Date(value);
  if (Number.isNaN(d.getTime())) return value;
  return d.toISOString().slice(0, 10);
}

// --- 主组件 ---

function buildNavigate(navigate, setMobileMenuOpen, news, cases) {
  return (page, data = null) => {
    setMobileMenuOpen(false);
    if (page === 'detail' && data) {
      const isNews = (news || ALL_NEWS).some((n) => n.id === data.id);
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
  const { news, cases } = useContent();
  const navigateTo = buildNavigate(navigate, setMobileMenuOpen, news, cases);

  return (
    <div className="min-h-screen bg-white text-gray-900 font-sans selection:bg-[#A1D573] selection:text-white overflow-x-hidden relative">
      
      {/* 顶部悬浮毛玻璃导航栏 (在 standards 页面隐藏) */}
      {!pathname.startsWith('/standards') && (
        <div className="fixed top-6 left-1/2 -translate-x-1/2 z-[100] w-auto max-w-[95%] pointer-events-none">
          <nav className="pointer-events-auto bg-gray-200/50 backdrop-blur-md border border-white/60 rounded-full px-8 py-3.5 flex items-center justify-center gap-10 shadow-[0_8px_32px_rgba(0,0,0,0.08)] transition-all duration-300">
            
            <div className="flex items-center gap-3 cursor-pointer group shrink-0" onClick={() => navigateTo('home')}>
              <img src="/justpai-logo-darkgreen-1.png" alt="这么派" className="w-8 h-8 object-contain group-hover:opacity-90 transition-opacity" aria-hidden />
            </div>

            <div className="hidden md:flex items-center gap-12 text-sm font-medium shrink-0">
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

      {mobileMenuOpen && !pathname.startsWith('/standards') && (
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
          <Route path="/standards/:slug" element={<StandardsPage onNavigate={navigateTo} />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/join" element={<JoinPage />} />
          <Route path="/help" element={<HelpPage />} />
        </Routes>
      </main>

      {/* 公共页脚 (在 standards 页面隐藏) */}
      {!pathname.startsWith('/standards') && (
        <footer className="bg-gray-900 border-t border-gray-800 pt-20 pb-10 px-6 text-white relative z-20">
           <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12 mb-16">
              <div className="col-span-1 md:col-span-1">
                 <div className="flex items-center gap-2 mb-6">
                    <img src="/justpai-logo-darkgreen-2.png" alt="这么派" className="w-8 h-8 object-contain" />
                    <span className="text-xl font-bold">这么派</span>
                 </div>
                 <p className="text-gray-400 text-sm">
                    专注企业快速工程服务<br/>
                    Just better, Just pai.
                 </p>
              </div>
              
              <div>
                 <h4 className="font-bold text-white mb-6">公司</h4>
                 <ul className="space-y-4 text-gray-400 text-sm">
                    <li><button onClick={() => navigateTo('about')} className="hover:text-[#A1D573] transition-colors">关于我们</button></li>
                    <li><button onClick={() => navigateTo('join')} className="hover:text-[#A1D573] transition-colors">加入我们</button></li>
                    <li><button onClick={() => navigateTo('news')} className="hover:text-[#A1D573] transition-colors">新闻中心</button></li>
                    <li><button onClick={() => navigateTo('help')} className="hover:text-[#A1D573] transition-colors">帮助中心</button></li>
                 </ul>
              </div>

              <div>
                 <h4 className="font-bold text-white mb-6">联系</h4>
                 <ul className="space-y-4 text-gray-400 text-sm">
                    <li>北京市：朝阳区住邦2000商务中心4号楼</li>
                    <li>上海市：普陀区长寿路587号沙田大厦25层</li>
                    <li>深圳市：龙华区民治街道秋瑞大厦3层</li>
                    <li>service@justpai.com</li>
                    <li>4006-681997</li>
                 </ul>
              </div>
           </div>
           
           <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center pt-8 border-t border-gray-800 text-xs text-gray-500">
              <p>&copy; 2026 JustPai Technology. All rights reserved.  ICP证：京ICP备2023009635号 京公网安备11010502056416号 京B2-20232412</p>
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
  const { news, cases } = useContent();
  const dataFromUrl = (() => {
    if (dataProp) return dataProp;
    if (!idParam) return null;
    const isNews = pathname.startsWith('/news');
    const list = isNews ? news : cases;
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
          
          <div className="flex items-center gap-6 text-sm text-gray-500 mb-8 pb-8 border-b border-gray-100 flex-wrap">
            <div className="flex items-center gap-2">
              <Calendar size={16} />
              {formatDate(data.date) || 'Unknown Date'}
            </div>
            <div className="flex items-center gap-2">
              <User size={16} />
              {data.author || 'JustPai Official'}
            </div>
            {data.category && (
              <div className="flex items-center gap-2">
                <span className="px-2 py-0.5 rounded bg-gray-100 text-gray-700">{data.category}</span>
              </div>
            )}
          </div>

          {data.desc && (
            <div className="bg-gray-50 border-l-4 border-[#A1D573] p-6 mb-10 rounded-r-lg">
              <p className="text-lg text-gray-700 italic font-medium leading-relaxed">
                {data.desc}
              </p>
            </div>
          )}

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
                      <img src={contentImageSrc(block.value)} alt="Content" className="rounded-xl shadow-md w-full" />
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
                  const isFromNews = news.some((n) => n.id === data.id);
                  const sourceList = isFromNews ? news : cases;
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
  const { slug } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const [activeCategory, setActiveCategory] = useState(null);
  const [activeSubItem, setActiveSubItem] = useState(null);
  const [activeStandardIntro, setActiveStandardIntro] = useState('质量标准化');

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

  // 根据 URL slug 定位到对应分类与子项（分享链接或刷新时）
  useEffect(() => {
    if (!slug) return;
    const found = getCategoryAndKeyBySlug(slug, categories);
    if (found) {
      setActiveCategory(found.categoryName);
      setActiveSubItem(found.itemKey);
    }
  }, [slug]);

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
                      const standardSlug = STANDARD_SLUGS[itemKey];
                      return (
                        <li key={itemKey}>
                          <button 
                            onClick={() => {
                              setActiveCategory(category.name);
                              setActiveSubItem(itemKey);
                              if (standardSlug) navigate(`/standards/${standardSlug}`);
                            }}
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

                   {/* 五大标准化体系介绍区块 */}
                   <div className="mt-16 mb-12">
                     <h3 className="text-2xl font-bold text-gray-900 mb-8 flex items-center gap-3">
                       <Layers className="text-[#FFEB69]" size={28} />
                       全维标准化驱动体系
                     </h3>

                     <div className="flex flex-col md:flex-row gap-8 bg-gray-50/50 p-2 rounded-3xl border border-gray-100">
                       {/* 左侧竖向导航 */}
                       <div className="flex md:flex-col gap-2 overflow-x-auto no-scrollbar md:w-1/3 shrink-0 p-4">
                         {['质量标准化', '服务标准化', '流程标准化', 'EHS标准化', '产品标准化'].map((std) => (
                           <button
                             key={std}
                             onClick={() => setActiveStandardIntro(std)}
                             className={`text-left px-5 py-4 rounded-xl transition-all duration-300 font-bold whitespace-nowrap ${
                               activeStandardIntro === std
                                 ? 'bg-white text-gray-900 shadow-[0_4px_20px_rgba(0,0,0,0.05)] border border-gray-100 scale-105 md:scale-100 md:translate-x-2'
                                 : 'text-gray-500 hover:bg-gray-100 hover:text-gray-700'
                             }`}
                           >
                             {std}
                           </button>
                         ))}
                       </div>

                       {/* 右侧内容展示区 */}
                       <div className="flex-1 bg-white p-8 rounded-2xl shadow-sm border border-gray-100 relative overflow-hidden min-h-[300px] flex flex-col justify-center">
                         {/* 装饰性背景发光 */}
                         <div className="absolute -top-12 -right-12 w-40 h-40 bg-[#A1D573] rounded-full blur-[80px] opacity-10"></div>

                         {activeStandardIntro === '质量标准化' && (
                           <div className="animate-fade-in-up">
                             <h4 className="text-xl font-bold text-gray-900 mb-4">杜绝参差不齐，交付即是标杆</h4>
                             <p className="text-gray-600 leading-relaxed">
                               我们摒弃了传统工程行业“看师傅手艺”的盲盒模式。通过建立详尽的工艺工法库、节点验收规范和防错机制，确保我们在全国的每一处施工都符合统一的工业级要求。无论是百平米的微改，还是万平米的整装，JustPai的质量输出始终如一。
                             </p>
                           </div>
                         )}

                         {activeStandardIntro === '服务标准化' && (
                           <div className="animate-fade-in-up">
                             <h4 className="text-xl font-bold text-gray-900 mb-4">有温度的体验，有刻度的规范</h4>
                             <p className="text-gray-600 leading-relaxed">
                             Justpai平台围绕自有师傅管理、全国客服支持与售后巡检机制，建立统一的服务流程与执行规范，并通过数字化平台实现从项目立项、施工交付到评价反馈、售后维护的全流程闭环管理，确保不同地区、不同项目都能为客户提供高效、专业、稳定且有温度的服务体验。
                             </p>
                           </div>
                         )}

                         {activeStandardIntro === '流程标准化' && (
                           <div className="animate-fade-in-up">
                             <h4 className="text-xl font-bold text-gray-900 mb-4">数字闭环，让运维更透明</h4>
                             <p className="text-gray-600 leading-relaxed">
                               依托 JustPai 最新的月海1.0运维面板系统，我们将复杂的工程运维切分为标准的SOP节点。从需求发起、智能派单、现场签到、过程记录到最终验收验收评价，所有流程线上流转、不可逆、防篡改。让进度100%透明，让管理成本降至最低。
                             </p>
                           </div>
                         )}

                         {activeStandardIntro === 'EHS标准化' && (
                           <div className="animate-fade-in-up">
                             <h4 className="text-xl font-bold text-gray-900 mb-4">安全生产，守护绿色底线</h4>
                             <p className="text-gray-600 leading-relaxed">
                               EHS (Environment, Health, Safety) 是我们一切工作的前提。我们依据国家现行施工环境、健康、安全规范及行业标准，制定了极其严苛的环保与安全双轨红线。从噪音与粉尘的源头抑制、有毒有害物质的零容忍，到高空与动火作业的强制审批，JustPai 致力于打造零伤害、零污染的施工运维环境。
                             </p>
                           </div>
                         )}

                         {activeStandardIntro === '产品标准化' && (
                           <div className="animate-fade-in-up">
                             <h4 className="text-xl font-bold text-gray-900 mb-4">像点外卖一样采购工程服务</h4>
                             <p className="text-gray-600 leading-relaxed">
                               我们将极度非标的工程与运维服务，解构成500+项可直接“加入购物车”的标准化产品（SKU）。清晰的计价模型、明确的交付边界和承诺的服务SLA，让企业客户彻底告别黑箱报价和扯皮扯筋，实现“所需即所得”。
                             </p>
                           </div>
                         )}
                       </div>
                     </div>
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
  const { news, cases } = useContent();
  const featuredCases = [...(cases || ALL_CASES)].sort((a, b) => new Date(b.date) - new Date(a.date)).slice(0, 4);
  const featuredNews = [...(news || ALL_NEWS)].sort((a, b) => new Date(b.date) - new Date(a.date)).slice(0, 4);

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
            重塑您的 <br className="hidden md:block"/>
            <span className="relative inline-block">
              <span className="relative z-10">办公基础设施</span>
              <span className="absolute bottom-2 left-0 w-full h-4 bg-[#FFEB69] -z-10 opacity-60 rounded-sm"></span>
            </span>
          </h1>
          
          <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto mb-10 leading-relaxed">
            JustPai 将传统的装饰工程与设施运维转化为可视化的数字资产。
            通过智能平台管理，让您的办公空间更智能、更高效、更具未来感。
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
                      <img
                        src={client.src}
                        alt={client.name}
                        className="h-16 w-16 md:h-20 md:w-20 object-contain rounded-lg transition-transform duration-300 cursor-default"
                      />
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
              <h3 className="text-2xl font-bold mb-3 text-gray-900">一站式智能驱动工程服务平台</h3>
              <p className="text-gray-500 max-w-md">以智能科技重构工程服务，通过数字化系统整合产品商城、项目管理及全国供应链，实现全链条的标准化与透明化管理。</p>
            </div>

            <div className={`rounded-3xl p-8 group ${CARD_THEME_GLOW}`}>
              <div className="p-3 bg-gray-50 rounded-xl text-gray-900 group-hover:bg-[#A1D573] transition-colors inline-block mb-8">
                <Activity size={32} />
              </div>
              <h3 className="text-xl font-bold mb-2 text-gray-900">极速响应网络</h3>
              <p className="text-gray-500 text-sm">200城+3000服务商，全国覆盖的敏捷工程服务。</p>
            </div>

            <div className={`rounded-3xl p-8 group ${CARD_THEME_GLOW}`}>
              <div className="p-3 bg-gray-50 rounded-xl text-gray-900 group-hover:bg-[#FFEB69] transition-colors inline-block mb-8">
                <Zap size={32} />
              </div>
              <h3 className="text-xl font-bold mb-2 text-gray-900">智慧协同生态闭环</h3>
              <p className="text-gray-500 text-sm">打通需求、交付、运维全流程，构建多方高效协同的工程服务生态，降本增效，赋能企业长效发展。 </p>
            </div>

             <div className={`col-span-1 md:col-span-2 rounded-3xl p-8 group relative overflow-hidden ${CARD_THEME_GLOW}`}>
              <div className="p-3 bg-gray-50 rounded-xl text-gray-900 group-hover:bg-[#A1D573] transition-colors inline-block mb-8">
                <Layers size={32} />
              </div>
              <h3 className="text-2xl font-bold mb-3 text-gray-900">全生命周期数字化管理</h3>
              <p className="text-gray-500 max-w-md">一体化智能管理，透明可溯的固定资产账本，让企业工程运维更高效、更可控。</p>
            </div>
          </div>
        </div>
      </section>

      <section id="solutions" className="bg-white">
        <HeroParallax
          heading={(
            <>
              最新升级
              <br />
              运维面板<span className="text-[#A1D573]">月海1.0</span>
            </>
          )}
          description="JustPai 提供的不仅仅是随叫随到的维修师傅。我们将每一次服务数字化，为您生成可视化的空间健康报告。"
        />
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
                        <img src={contentImageSrc(item.img)} alt={item.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-60"></div>
                     </div>
                     <div className="p-6">
                        <div className="text-xs text-gray-400 mb-2 flex items-center gap-1">
                           <Calendar size={12} />
                           {formatDate(item.date)}
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
      
      {/* 滚动字体效果：两行 justpai，上左滚下右滚，横跨整个视口宽度
          手动修改位置（本段）：
          - 字体内容：改 texts 数组，两项对应上下两行，每项会重复滚动显示
          - 字体大小：改 scrollerClassName，如 text-lg md:text-2xl（更小）或 text-2xl md:text-4xl（更大）
          - 滚动速度：改 velocity，数值越大越快，如 140、180、220 */}
      <section className="py-16 px-0 bg-white border-t border-gray-50">
        <ScrollVelocity
          texts={['Justpai ', '这么派 ']}
          velocity={100}
          numCopies={20}  // 副本数量越多，整条跑马灯越长，左右更不容易留空
          scrollerClassName="text-lg md:text-4xl font-bold tracking-[-0.02em] px-6"
          scrollerStyle={{ color: '#163300' }}
          parallaxClassName="py-4 w-full"
        />
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
                        <img src={contentImageSrc(item.img)} alt={item.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                     </div>
                     <div className="p-6">
                        <div className="text-xs text-gray-400 mb-2 flex items-center gap-1">
                           <Calendar size={12} />
                           {formatDate(item.date)}
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
  const { news, cases } = useContent();
  const featuredCases = [...(cases || ALL_CASES)].sort((a, b) => new Date(b.date) - new Date(a.date)).slice(0, 4);
  const featuredNews = [...(news || ALL_NEWS)].sort((a, b) => new Date(b.date) - new Date(a.date)).slice(0, 4);

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
                        <img src={contentImageSrc(item.img)} alt={item.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                     </div>
                     <div className="p-6">
                        <div className="text-xs text-gray-400 mb-2 flex items-center gap-1">
                           <Calendar size={12} />
                           {formatDate(item.date)}
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
                        <img src={contentImageSrc(item.img)} alt={item.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-60"></div>
                     </div>
                     <div className="p-6">
                        <div className="text-xs text-gray-400 mb-2 flex items-center gap-1">
                           <Calendar size={12} />
                           {formatDate(item.date)}
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
    </div>
  );
}

function NewsListPage({ onNavigate }) {
  const { news } = useContent();
  const list = [...(news || ALL_NEWS)].sort((a, b) => new Date(b.date) - new Date(a.date));
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
            {list.map((item, idx) => (
                <div key={item.id} onClick={() => onNavigate('detail', item)} className={`rounded-2xl overflow-hidden cursor-pointer group ${CARD_THEME_GLOW}`}>
                  <div className="h-56 overflow-hidden relative rounded-t-2xl">
                    <img src={contentImageSrc(item.img)} alt={item.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  </div>
                  <div className="p-6">
                    <div className="text-xs text-gray-400 mb-2 flex items-center gap-1 flex-wrap">
                        <Calendar size={12} />
                        {formatDate(item.date)}
                        {item.category && <span className="ml-2 px-1.5 py-0.5 rounded bg-gray-100 text-gray-500">{item.category}</span>}
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
  const { cases } = useContent();
  const list = [...(cases || ALL_CASES)].sort((a, b) => new Date(b.date) - new Date(a.date));
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
            {list.map((item, idx) => (
                <div key={item.id} onClick={() => onNavigate('detail', item)} className={`rounded-2xl overflow-hidden cursor-pointer group ${CARD_THEME_GLOW}`}>
                  <div className="h-56 overflow-hidden relative rounded-t-2xl">
                    <img src={contentImageSrc(item.img)} alt={item.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-60"></div>
                  </div>
                  <div className="p-6">
                    {item.category && <span className="text-xs text-gray-500 mb-2 block">{item.category}</span>}
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
                     <div className="w-40 h-48 bg-[#3A341C]/50 rounded-2xl shadow-xl border border-gray-100 p-6 flex flex-col justify-between transform translate-y-8">
                        <Users className="text-[#FFEB69] w-10 h-10" />
                        <div>
                           <div className="text-3xl font-bold text-[#FFEB69]">1000+</div>
                           <div className="text-sm text-[#FFEB69]">专业师傅</div>
                        </div>
                     </div>
                     <div className="w-40 h-48 bg-[#A1D573]/50 rounded-2xl shadow-xl p-6 flex flex-col justify-between">
                        <MapPin className="text-[#163300] w-10 h-10" />
                        <div>
                           <div className="text-3xl font-bold text-[#163300]">150+</div>
                           <div className="text-sm text-[#163300]">服务城市</div>
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
               <div className="group bg-white p-6 rounded-2xl border border-gray-100 hover:border-[#FFEB69] hover:shadow-lg transition-all flex flex-col items-center justify-center aspect-square cursor-pointer">
                  <div className="w-12 h-12 rounded-full bg-gray-50 flex items-center justify-center text-gray-400 mb-4 group-hover:bg-[#FFEB69]/20 group-hover:text-black transition-colors">
                     <ShieldCheck size={24} strokeWidth={1.5} />
                  </div>
                  <span className="font-bold text-gray-700 text-sm group-hover:text-black">认证检测</span>
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
                   <h2 className="text-3xl font-bold text-gray-900">
                      加入 <span className="font-bold" style={{ color: '#FFEB69' }}>派</span> 队
                   </h2>
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
               {FAQ_DATA.map((item, index) => (
                  <div key={index} className="border border-gray-100 rounded-xl overflow-hidden hover:border-gray-300 transition-colors bg-white">
                     <button 
                        onClick={() => toggleQuestion(index)}
                        className="w-full flex items-center justify-between p-6 text-left focus:outline-none"
                     >
                        <span className={`font-bold text-lg ${openIndex === index ? 'text-[#A1D573]' : 'text-gray-900'}`}>
                           {item.question}
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
                           {item.answer}
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
