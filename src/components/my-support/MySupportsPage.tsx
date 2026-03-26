import { motion } from 'framer-motion';
import { Heart, Award } from 'lucide-react';
import type { Leader } from '../../types/user';

interface MySupportsPageProps {
  likedLeaders: Leader[];
  currentUser: {
    nickname: string;
    avatar: string;
  } | null;
  totalSupports: number;
}

export const MySupportsPage = ({ likedLeaders, currentUser, totalSupports }: MySupportsPageProps) => {
  if (!currentUser) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-warm-white to-soft-cream flex items-center justify-center">
        <p className="text-gray-500">请先登录</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-warm-white to-soft-cream">
      <div className="max-w-md mx-auto">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center px-6 pt-10 pb-6"
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="inline-flex items-center gap-2 mb-4"
          >
            <Heart className="w-5 h-5 text-rose-500 fill-rose-500" />
            <span className="text-xs font-medium tracking-widest text-gray-500 uppercase">
              我的支持
            </span>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="flex items-center justify-center gap-3 mb-3"
          >
            <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-gray-200">
              <img
                src={currentUser.avatar}
                alt={currentUser.nickname}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="text-left">
              <h2 className="text-lg font-medium text-gray-800">
                {currentUser.nickname}
              </h2>
              <p className="text-xs text-gray-500">
                已支持 {totalSupports} 位队长
              </p>
            </div>
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="px-6 pb-6"
        >
          {likedLeaders.length === 0 ? (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="bg-white rounded-2xl shadow-soft-card p-8 text-center"
            >
              <Award className="w-12 h-12 text-gray-300 mx-auto mb-3" />
              <h3 className="text-base font-medium text-gray-700 mb-2">
                还没有支持任何人
              </h3>
              <p className="text-sm text-gray-500">
                去榜单页支持你喜欢的领队队长吧
              </p>
            </motion.div>
          ) : (
            <div className="space-y-3">
              <h3 className="text-sm font-medium text-gray-600 mb-3">
                你支持的领队队长
              </h3>
              {likedLeaders.map((leader, index) => (
                <motion.div
                  key={leader.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.5 + index * 0.1 }}
                  className="bg-white rounded-2xl shadow-soft-card p-4 flex items-center gap-4"
                >
                  <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-gray-100">
                    <img
                      src={leader.avatar}
                      alt={leader.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  
                  <div className="flex-1">
                    <h4 className="text-sm font-medium text-gray-800">
                      {leader.name}
                    </h4>
                    <p className="text-xs text-gray-500">
                      {leader.likes} 人支持
                    </p>
                  </div>

                  <div className="flex items-center gap-1.5 text-rose-500">
                    <Heart className="w-4 h-4 fill-rose-500" />
                    <span className="text-xs font-medium">已支持</span>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
};
