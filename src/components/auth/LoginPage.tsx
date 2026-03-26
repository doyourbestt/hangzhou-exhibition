import { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Lock, Circle, Square, Triangle } from 'lucide-react';

interface LoginPageProps {
  onLogin: (inviteCode: string, nickname: string) => void;
}

export const LoginPage = ({ onLogin }: LoginPageProps) => {
  const [inviteCode, setInviteCode] = useState('');
  const [nickname, setNickname] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (inviteCode.length < 4 || nickname.length < 2) return;
    
    setIsSubmitting(true);
    setTimeout(() => {
      onLogin(inviteCode.trim(), nickname.trim());
      setIsSubmitting(false);
    }, 800);
  };

  const isValid = inviteCode.length >= 4 && nickname.length >= 2;

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#F8F6F3] via-[#FAF8F5] to-[#F5F3EE] relative overflow-hidden">
      {/* 全屏几何装饰层 */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* 左上角圆形装饰 */}
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 120, repeat: Infinity, ease: 'linear' }}
          className="absolute -left-16 -top-16 w-72 h-72 opacity-[0.04]"
        >
          <svg viewBox="0 0 200 200" className="w-full h-full">
            <circle cx="100" cy="100" r="90" fill="none" stroke="#2D2D2D" strokeWidth="1"/>
            <circle cx="100" cy="100" r="70" fill="none" stroke="#2D2D2D" strokeWidth="0.5" strokeDasharray="4 4"/>
            <circle cx="100" cy="100" r="50" fill="none" stroke="#2D2D2D" strokeWidth="0.5"/>
          </svg>
        </motion.div>

        {/* 右下角方形装饰 */}
        <motion.div
          animate={{ rotate: -360 }}
          transition={{ duration: 180, repeat: Infinity, ease: 'linear' }}
          className="absolute -right-20 -bottom-20 w-80 h-80 opacity-[0.03]"
        >
          <svg viewBox="0 0 200 200" className="w-full h-full">
            <rect x="20" y="20" width="160" height="160" fill="none" stroke="#2D2D2D" strokeWidth="1" rx="8"/>
            <rect x="40" y="40" width="120" height="120" fill="none" stroke="#2D2D2D" strokeWidth="0.5" strokeDasharray="6 6" rx="4"/>
          </svg>
        </motion.div>

        {/* 漂浮几何元素 */}
        <motion.div
          animate={{ y: [0, -15, 0], opacity: [0.15, 0.25, 0.15] }}
          transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute top-1/4 left-8"
        >
          <Circle className="w-3 h-3 text-gray-400" />
        </motion.div>

        <motion.div
          animate={{ y: [0, 12, 0], opacity: [0.1, 0.2, 0.1] }}
          transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
          className="absolute top-1/3 right-12"
        >
          <Square className="w-2.5 h-2.5 text-gray-400 transform rotate-45" />
        </motion.div>

        <motion.div
          animate={{ y: [0, -10, 0], opacity: [0.12, 0.22, 0.12] }}
          transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
          className="absolute top-1/2 left-16"
        >
          <Triangle className="w-2 h-2 text-gray-400" />
        </motion.div>

        <motion.div
          animate={{ y: [0, 8, 0], opacity: [0.08, 0.18, 0.08] }}
          transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut', delay: 3 }}
          className="absolute bottom-1/3 right-8"
        >
          <Circle className="w-4 h-4 text-gray-300" />
        </motion.div>

        <motion.div
          animate={{ y: [0, -12, 0], opacity: [0.1, 0.2, 0.1] }}
          transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut', delay: 1.5 }}
          className="absolute top-2/3 left-10"
        >
          <Square className="w-2 h-2 text-gray-300" />
        </motion.div>
      </div>

      {/* 全屏沉浸式内容 */}
      <div className="relative z-10 min-h-screen flex flex-col px-6 py-12">
        {/* 顶部氛围区 - 文艺简约 */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16 mt-8"
        >
          <div className="inline-flex items-center gap-2 mb-6">
            <div className="w-1 h-1 rounded-full bg-[#E07A5F]" />
            <span className="text-xs font-light tracking-[0.3em] text-gray-500 uppercase">艺起逛杭州</span>
            <div className="w-1 h-1 rounded-full bg-[#E07A5F]" />
          </div>
        </motion.div>

        {/* 中间主内容区 */}
        <div className="flex-1 flex flex-col justify-center">
          {/* 主标题 */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="text-center mb-12"
          >
            <h1 className="text-3xl font-light text-gray-800 mb-3 tracking-wide">
              欢迎来到
            </h1>
            <h2 className="text-2xl font-normal text-gray-600">
              艺起逛杭州
            </h2>
          </motion.div>

          {/* 沉浸式表单区 */}
          <motion.form
            initial={{ opacity: 0, y: 40, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            onSubmit={handleSubmit}
            className="space-y-5"
          >
            <div className="space-y-2">
              <label className="text-xs font-light text-gray-400 tracking-wider ml-1">
                活动邀请码
              </label>
              <input
                type="text"
                value={inviteCode}
                onChange={(e) => setInviteCode(e.target.value)}
                placeholder="请输入参展码"
                className="w-full px-5 py-4 bg-white/80 backdrop-blur-sm rounded-2xl text-gray-700 placeholder-gray-300 text-sm outline-none focus:ring-2 focus:ring-[#E07A5F]/20 transition-all border border-gray-100/50 focus:border-[#E07A5F]/30 shadow-sm"
              />
            </div>

            <div className="space-y-2">
              <label className="text-xs font-light text-gray-400 tracking-wider ml-1">
                群昵称
              </label>
              <input
                type="text"
                value={nickname}
                onChange={(e) => setNickname(e.target.value)}
                placeholder="请输入你的昵称"
                className="w-full px-5 py-4 bg-white/80 backdrop-blur-sm rounded-2xl text-gray-700 placeholder-gray-300 text-sm outline-none focus:ring-2 focus:ring-[#E07A5F]/20 transition-all border border-gray-100/50 focus:border-[#E07A5F]/30 shadow-sm"
              />
            </div>

            <motion.button
              type="submit"
              disabled={!isValid || isSubmitting}
              whileTap={{ scale: 0.98 }}
              className={`w-full py-4 rounded-2xl font-light text-sm tracking-wide flex items-center justify-center gap-2 transition-all duration-300 ${
                isValid && !isSubmitting
                  ? 'bg-gray-800 text-white hover:bg-gray-900 shadow-lg shadow-gray-200'
                  : 'bg-gray-100 text-gray-300'
              }`}
            >
              {isSubmitting ? (
                <>
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                    className="w-4 h-4 border border-white/30 border-t-white rounded-full"
                  />
                  <span>正在进入...</span>
                </>
              ) : (
                <>
                  <span>进入点赞榜</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </motion.button>
          </motion.form>
        </div>

        {/* 底部说明 */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="text-center mt-12"
        >
          <div className="inline-flex items-center gap-1.5 text-xs text-gray-400/60">
            <Lock className="w-3 h-3" />
            <span>轻登录 · 仅活动期间使用</span>
          </div>
        </motion.div>
      </div>
    </div>
  );
};
