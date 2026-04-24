import React, { useRef } from 'react';
import { motion, useScroll, useSpring, useTransform } from 'motion/react';

/** 门户首屏产品条：图片来自 public/quickshot（与 admin 端 @quickshot 同源资源） */
export const products = [
  // 首行 flex-row-reverse：从左第 3 格对应本段索引 2，将「首页」图置于此位（与 0 对调）
  { title: '咨询单详情页', thumbnail: '/quickshot/咨询单详情页.png' },
  { title: '咨询与反馈', thumbnail: '/quickshot/咨询与反馈.png' },
  { title: '首页', thumbnail: '/quickshot/首页.png' },
  { title: '订单管理页', thumbnail: '/quickshot/订单管理页.png' },
  { title: '工程项目管理', thumbnail: '/quickshot/工程项目管理.png' },
  { title: '项目详情页', thumbnail: '/quickshot/项目详情页.png' },
  { title: '项目评价', thumbnail: '/quickshot/项目评价.png' },
  { title: '新增维保保修', thumbnail: '/quickshot/新增维保保修.png' },
  { title: '审批流程', thumbnail: '/quickshot/审批流程.png' },
  { title: '审批流程配置', thumbnail: '/quickshot/审批流程配置.png' },
  { title: '成功提交', thumbnail: '/quickshot/成功提交.png' },
  { title: '管理中心', thumbnail: '/quickshot/管理中心.png' },
  { title: '组织与架构', thumbnail: '/quickshot/组织与架构.png' },
  { title: '消息中心', thumbnail: '/quickshot/消息中心.png' },
  { title: '商店', thumbnail: '/quickshot/商店.jpg' },
];

function ProductCard({ product, translate }) {
  return (
    <motion.div
      style={{ x: translate }}
      whileHover={{ y: -20 }}
      key={product.title}
      className="group/product relative h-48 w-[18rem] md:w-[22rem] lg:w-[26rem] shrink-0"
    >
      <div className="block h-full w-full overflow-hidden rounded-2xl shadow-2xl">
        <img
          src={product.thumbnail}
          alt={product.title}
          className="absolute inset-0 h-full w-full object-cover object-left-top transition duration-300 group-hover/product:scale-105"
          loading="lazy"
        />
      </div>
      <div className="pointer-events-none absolute inset-0 rounded-2xl bg-black/0 group-hover/product:bg-black/20 transition duration-300" />
      <h2 className="absolute bottom-4 left-4 text-white opacity-0 group-hover/product:opacity-100 transition duration-300">
        {product.title}
      </h2>
    </motion.div>
  );
}

export function HeroParallax({
  heading = '不仅是维修，更是全域智能',
  description = 'JustPai 提供的不仅仅是随叫随到的维修师傅。我们将每一次服务数字化，为您生成可视化的空间健康报告。',
}) {
  const firstRow = products.slice(0, 5);
  const secondRow = products.slice(5, 10);
  const thirdRow = products.slice(10, 15);
  const ref = useRef(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  });

  const springConfig = { stiffness: 300, damping: 30, bounce: 0 };

  const translateX = useSpring(useTransform(scrollYProgress, [0, 1], [0, 1000]), springConfig);
  const translateXReverse = useSpring(useTransform(scrollYProgress, [0, 1], [0, -1000]), springConfig);
  const rotateX = useSpring(useTransform(scrollYProgress, [0, 0.2], [15, 0]), springConfig);
  const opacity = useSpring(useTransform(scrollYProgress, [0, 0.2], [0.2, 1]), springConfig);
  const rotateZ = useSpring(useTransform(scrollYProgress, [0, 0.2], [20, 0]), springConfig);
  // 保持当前首屏观感不变：仅将“立起来后的横向滚动”位置再下移一点，并拉长过渡区间
  const translateY = useSpring(useTransform(scrollYProgress, [0, 0.01], [-260, 350]), springConfig);

  return (
    <div
      ref={ref}
      className="relative h-[155vh] md:h-[175vh] overflow-hidden bg-white py-24 antialiased [perspective:1000px] [transform-style:preserve-3d]"
    >
      <div className="relative z-30 mx-auto max-w-7xl px-6">
        <h2 className="text-4xl md:text-6xl font-bold text-gray-900 max-w-3xl leading-tight">
          {heading}
        </h2>
        <p className="mt-6 max-w-2xl text-lg text-gray-600">
          {description}
        </p>
      </div>

      <motion.div style={{ rotateX, rotateZ, y: translateY, opacity }} className="relative z-10 mt-24 md:mt-28">
        <motion.div className="mb-8 flex flex-row-reverse space-x-reverse space-x-8">
          {firstRow.map((product) => (
            <ProductCard product={product} translate={translateX} key={product.title} />
          ))}
        </motion.div>
        <motion.div className="mb-8 flex flex-row space-x-8">
          {secondRow.map((product) => (
            <ProductCard product={product} translate={translateXReverse} key={product.title} />
          ))}
        </motion.div>
        <motion.div className="flex flex-row-reverse space-x-reverse space-x-8">
          {thirdRow.map((product) => (
            <ProductCard product={product} translate={translateX} key={product.title} />
          ))}
        </motion.div>
      </motion.div>
    </div>
  );
}

