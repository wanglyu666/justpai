/**
 * 每个标准项对应的唯一 URL slug，用于 /standards/:slug 分享。
 * 重名或易冲突的项在 slug 上做区分（如 噪音控制 vs 健康管控噪音控制）。
 */
export const STANDARD_SLUGS = {
  // 环境管控
  '环境管理组织': 'environment-management-organization',
  '环境管控日报': 'environment-daily-report',
  '环境管控周报': 'environment-weekly-report',
  '噪音控制': 'noise-control',
  '气味控制': 'odor-control',
  '废料与垃圾管理': 'waste-garbage-management',
  '个人物品和食物管理': 'personal-items-food-management',
  '局部小维修的环境控制': 'minor-repair-environment-control',
  '材料控制': 'material-control',
  '现场排风机': 'site-exhaust-fan',
  // 安全管控
  '工地守则': 'site-rules',
  '安全管理组织设立': 'safety-organization',
  '防护装备管理': 'ppe-management',
  '防护装备佩戴要求': 'ppe-wearing-requirements',
  '着装要求': 'dress-code',
  '进场安全教育': 'entry-safety-education',
  '专项作业安全培训': 'specialized-safety-training',
  '每日班前安全注意事项会': 'daily-pre-shift-safety-meeting',
  '每周安全培训会议': 'weekly-safety-training',
  '安全技术交底': 'safety-technical-briefing',
  '安全巡查': 'safety-inspection',
  '安全隐患整改': 'safety-hazard-rectification',
  '安全日报': 'safety-daily-report',
  '安全与周报': 'safety-weekly-report',
  '高危作业技术方案编制与审批': 'high-risk-work-plan-approval',
  '特种作业审批': 'special-work-approval',
  '化学品作业审批': 'chemical-work-approval',
  '梯子的使用': 'ladder-use',
  '消防管理': 'fire-safety-management',
  '安全用电': 'electrical-safety',
  '安全带使用': 'safety-belt-use',
  '孔洞防护': 'hole-protection',
  '起重吊装要求': 'lifting-requirements',
  '高空作业': 'high-altitude-work',
  '电焊气割作业': 'welding-cutting-work',
  '围护、作业公告牌及警示标识': 'barriers-signage-warning',
  '文明施工': 'civilized-construction',
  '材料运输': 'material-transport',
  '现场接收': 'site-handover',
  '移动脚手架使用要求': 'mobile-scaffold-use',
  // 健康管控
  '健康管控日报': 'health-daily-report',
  '健康管控周报': 'health-weekly-report',
  '岗前培训': 'pre-job-training',
  '医药箱配置': 'first-aid-kit-config',
  '粉尘控制': 'dust-control',
  '健康管控噪音控制': 'noise-control-health',
  '异味控制': 'odor-control-health',
  '高温预防': 'heat-stress-prevention',
  '振动控制': 'vibration-control',
  '毒物控制': 'toxic-substance-control',
  '弧光辐射、电焊烟尘控制': 'arc-radiation-welding-fume-control',
  // 成品管控
  '非独立作业区隔挡': 'non-independent-area-partition',
  '小型非独立作业区隔挡': 'small-area-partition',
  '物料清运通道地面': 'material-passage-ground',
  '电梯': 'elevator-protection',
  '软装饰地面': 'soft-floor-protection',
  '墙面': 'wall-protection',
  '石材、人造石台面': 'stone-countertop-protection',
  '普通设备': 'general-equipment-protection',
  '家具': 'furniture-protection',
  '软硬包、吸音板': 'soft-hard-wall-acoustic-board',
  '门/窗/柜': 'door-window-cabinet',
  '硬装饰地面': 'hard-floor-protection',
  '打胶': 'sealant-application',
  '玻璃饰面': 'glass-surface-protection',
  '洁具/卫浴': 'sanitary-ware-protection',
  '标识、标牌、艺术陈列品': 'signage-art-display',
  '玻璃幕墙、玻璃隔断': 'glass-curtain-wall-partition',
  '金属型材': 'metal-profile-protection',
  '柔性天花': 'flexible-ceiling-protection',
  '空调机组安装成品保护': 'hvac-unit-protection',
  '柴油发电机组安装成品保护': 'diesel-generator-protection',
  '水泵安装成品保护': 'pump-installation-protection',
  '风机、风口安装成品保护': 'fan-air-outlet-protection',
  '不锈钢水箱安装成品保护': 'stainless-tank-protection',
  '防雷接地安装成品保护': 'lightning-grounding-protection',
  '管道安装成品保护': 'pipeline-installation-protection',
  '阀门安装成品保护': 'valve-installation-protection',
  '地漏安装成品保护': 'floor-drain-protection',
  '信息弱电系统作业成品保护': 'weak-current-system-protection',
  '消防系统作业成品保护': 'fire-system-protection',
  '管道作业成品保护': 'pipeline-work-protection',
  '电气系统作业成品保护': 'electrical-system-protection',
  '空调作业成品保护': 'hvac-work-protection',
  '给水、排水作业成品保护': 'water-supply-drainage-protection',
  '室外、管线作业成品保护': 'outdoor-pipeline-protection',
  '精密设备设备成品保护': 'precision-equipment-protection',
  // 卫生保洁
  '施工保洁员': 'construction-cleaner',
  '卫生除尘措施': 'dust-removal-measures',
  '废料垃圾清除': 'waste-removal',
  '完工保洁': 'completion-cleaning',
  '洒水降尘措施': 'water-dust-suppression',
  // 风险管控
  '人员出入风险': 'personnel-access-risk',
  '工程/材料出入口风险': 'material-access-risk',
  '孔洞防护风险管控': 'hole-protection-risk',
  '临时用电': 'temporary-electricity',
  '切割作业': 'cutting-work',
  '电动工具使用': 'power-tool-use',
  '异味作业': 'odor-work',
  '粉尘工作': 'dust-work',
  '玻璃纤维作业': 'fiberglass-work',
  '噪音工作': 'noise-work',
  '动火作业': 'hot-work',
  '环境风险': 'environmental-risk',
  '管道断水及打压': 'pipe-shutdown-pressure-test',
  '拆除作业': 'demolition-work',
  '起重吊装': 'lifting-crane-risk',
  '消防器材': 'fire-equipment',
  '外墙作业': 'facade-work',
  '玻璃作业': 'glass-work',
  '机电检修作业': 'mep-maintenance-work',
};

/**
 * 根据 slug 查找所属分类与标准 key。需传入当前 categories 结构以解析。
 * @param {string} slug
 * @param {Array<{ name: string, sub: Array<string|{key:string,name:string}>}>} categories
 * @returns {{ categoryName: string, itemKey: string } | null}
 */
export function getCategoryAndKeyBySlug(slug, categories) {
  if (!slug) return null;
  for (const cat of categories) {
    for (const sub of cat.sub) {
      const itemKey = typeof sub === 'string' ? sub : sub.key;
      if (STANDARD_SLUGS[itemKey] === slug) {
        return { categoryName: cat.name, itemKey };
      }
    }
  }
  return null;
}
