import { motion } from 'framer-motion';
import { Info } from 'lucide-react';

export const FooterNote = () => {
  return (
    <motion.footer
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.6, duration: 0.5 }}
      className="px-6 py-8 text-center"
    >
      <div className="inline-flex items-center gap-2 text-xs text-gray-400">
        <Info className="w-3 h-3" />
        <span>榜单实时更新，请为你支持的领队队长点赞</span>
      </div>
      <p className="text-xs text-gray-400 mt-2 opacity-70">
        每次点赞都会即时计入榜单
      </p>
    </motion.footer>
  );
};
