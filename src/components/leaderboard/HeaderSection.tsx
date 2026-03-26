import { motion } from 'framer-motion';

export const HeaderSection = () => {
  return (
    <motion.header
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className="text-center px-6 pt-10 pb-8 relative"
    >
      <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-16 h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent opacity-50" />
      
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.2, duration: 0.5 }}
        className="inline-block mb-4"
      >
        <span className="text-xs font-medium tracking-widest text-gray-500 uppercase">
          艺起逛杭州
        </span>
      </motion.div>

      <motion.h1
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.5 }}
        className="text-2xl font-semibold text-gray-800 mb-3 tracking-tight"
      >
        领队队长点赞榜
      </motion.h1>

      <motion.p
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.5 }}
        className="text-sm text-gray-500 leading-relaxed"
      >
        为你喜欢的领队队长送上一颗小心心
      </motion.p>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.6 }}
        className="mt-6 flex justify-center gap-2"
      >
        <div className="w-8 h-px bg-gradient-to-r from-transparent to-gray-300" />
        <div className="w-1 h-1 rounded-full bg-gray-300" />
        <div className="w-8 h-px bg-gradient-to-l from-transparent to-gray-300" />
      </motion.div>
    </motion.header>
  );
};
