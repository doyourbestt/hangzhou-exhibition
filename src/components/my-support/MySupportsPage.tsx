import { motion } from 'framer-motion';
import { Heart, Sparkles } from 'lucide-react';

interface MySupportsPageProps {
  currentUser: {
    nickname: string;
    avatar: string;
  } | null;
}

export const MySupportsPage = ({ currentUser }: MySupportsPageProps) => {
  if (!currentUser) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-[#FAF8F5] to-[#F5F3EE] flex items-center justify-center">
        <p className="text-gray-500">请先登录</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#FAF8F5] to-[#F5F3EE] pb-20">
      {/* 顶部区域 */}
      <div className="px-5 pt-8 pb-6">
        <div className="text-center mb-6">
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="inline-flex items-center gap-1.5 px-3 py-1 bg-white/70 backdrop-blur-sm rounded-full shadow-sm mb-4"
          >
            <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500" />
            <span className="text-xs font-medium text-gray-600">我的支持</span>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="flex items-center justify-center gap-3 mb-2"
          >
            <img
              src={currentUser.avatar}
              alt={currentUser.nickname}
              className="w-14 h-14 rounded-2xl object-cover shadow-md"
            />
            <div className="text-left">
              <h2 className="text-lg font-medium text-gray-800">{currentUser.nickname}</h2>
              <p className="text-xs text-gray-500">感谢你的支持</p>
            </div>
          </motion.div>
        </div>
      </div>

      {/* 空白状态 */}
      <div className="px-5">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-2xl border border-gray-100 p-8 text-center shadow-sm"
        >
          <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-br from-rose-50 to-pink-50 flex items-center justify-center">
            <Sparkles className="w-8 h-8 text-rose-300" />
          </div>
          <h3 className="text-base font-medium text-gray-700 mb-2">还没有支持任何人</h3>
          <p className="text-sm text-gray-500 mb-4">去榜单页支持你喜欢的领队队长吧</p>
        </motion.div>
      </div>
    </div>
  );
};
