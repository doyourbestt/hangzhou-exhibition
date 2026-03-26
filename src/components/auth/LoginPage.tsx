import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Check } from 'lucide-react';

interface LoginPageProps {
  onLogin: (inviteCode: string, nickname: string) => void;
}

export const LoginPage = ({ onLogin }: LoginPageProps) => {
  const [inviteCode, setInviteCode] = useState('');
  const [nickname, setNickname] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [agreed, setAgreed] = useState(false);

  const handleSubmit = () => {
    if (!isValid || !agreed) return;
    
    setIsSubmitting(true);
    setTimeout(() => {
      onLogin(inviteCode.trim(), nickname.trim());
      setIsSubmitting(false);
    }, 800);
  };

  const isValid = inviteCode.length >= 4 && nickname.length >= 2;

  return (
    <div className="min-h-screen bg-[#FEFCFB] flex flex-col">
      {/* 顶部安全区适配 */}
      <div className="h-[env(safe-area-inset-top)] bg-[#FEFCFB]" />
      
      {/* 主内容区 */}
      <div className="flex-1 flex flex-col px-5">
        {/* Logo区 */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="pt-12 pb-8"
        >
          <div className="flex items-center gap-2 mb-3">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#FF6154] to-[#FF2442] flex items-center justify-center shadow-lg shadow-red-100">
              <span className="text-white text-lg font-bold">艺</span>
            </div>
            <span className="text-xl font-bold text-gray-800">艺起逛杭州</span>
          </div>
          <p className="text-sm text-gray-500">发现杭州之美，支持你喜欢的领队</p>
        </motion.div>

        {/* 表单区 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="space-y-4"
        >
          {/* 邀请码输入 */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">邀请码</label>
            <div className="relative">
              <input
                type="text"
                value={inviteCode}
                onChange={(e) => setInviteCode(e.target.value)}
                placeholder="请输入参展码"
                maxLength={20}
                className="w-full px-4 py-3.5 bg-white border border-gray-200 rounded-xl text-base text-gray-800 placeholder-gray-400 outline-none focus:border-red-300 focus:ring-2 focus:ring-red-100 transition-all"
              />
              {inviteCode.length > 0 && (
                <button
                  onClick={() => setInviteCode('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 rounded-full bg-gray-200 flex items-center justify-center hover:bg-gray-300 transition-colors"
                >
                  <span className="text-gray-500 text-xs">✕</span>
                </button>
              )}
            </div>
          </div>

          {/* 昵称输入 */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">昵称</label>
            <div className="relative">
              <input
                type="text"
                value={nickname}
                onChange={(e) => setNickname(e.target.value)}
                placeholder="请输入你的昵称"
                maxLength={10}
                className="w-full px-4 py-3.5 bg-white border border-gray-200 rounded-xl text-base text-gray-800 placeholder-gray-400 outline-none focus:border-red-300 focus:ring-2 focus:ring-red-100 transition-all"
              />
              {nickname.length > 0 && (
                <button
                  onClick={() => setNickname('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 rounded-full bg-gray-200 flex items-center justify-center hover:bg-gray-300 transition-colors"
                >
                  <span className="text-gray-500 text-xs">✕</span>
                </button>
              )}
            </div>
          </div>

          {/* 协议勾选 */}
          <div 
            className="flex items-start gap-3 pt-1 cursor-pointer"
            onClick={() => setAgreed(!agreed)}
          >
            <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all mt-0.5 ${
              agreed 
                ? 'bg-red-500 border-red-500' 
                : 'border-gray-300 bg-white'
            }`}>
              <AnimatePresence>
                {agreed && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    exit={{ scale: 0 }}
                    transition={{ duration: 0.15 }}
                  >
                    <Check className="w-3 h-3 text-white" strokeWidth={3} />
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
            <p className="text-xs text-gray-500 leading-relaxed flex-1">
              我已阅读并同意
              <span className="text-red-500">《用户协议》</span>
              和
              <span className="text-red-500">《隐私政策》</span>
            </p>
          </div>

          {/* 登录按钮 */}
          <motion.button
            onClick={handleSubmit}
            disabled={!isValid || !agreed || isSubmitting}
            whileTap={{ scale: 0.98 }}
            className={`w-full py-3.5 rounded-xl font-medium text-sm flex items-center justify-center gap-2 transition-all mt-2 ${
              isValid && agreed && !isSubmitting
                ? 'bg-gradient-to-r from-[#FF6154] to-[#FF2442] text-white shadow-lg shadow-red-200 active:shadow-md'
                : 'bg-gray-100 text-gray-400'
            }`}
          >
            {isSubmitting ? (
              <>
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 0.8, repeat: Infinity, ease: 'linear' }}
                  className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full"
                />
                <span>登录中...</span>
              </>
            ) : (
              <>
                <span>进入活动</span>
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </motion.button>
        </motion.div>

        {/* 底部装饰 */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="mt-auto pt-8 pb-4"
        >
          <p className="text-center text-xs text-gray-400">
            登录即表示你同意我们的条款和条件
          </p>
        </motion.div>
      </div>

      {/* 底部安全区适配 */}
      <div className="h-[env(safe-area-inset-bottom)] bg-[#FEFCFB]" />
    </div>
  );
};
