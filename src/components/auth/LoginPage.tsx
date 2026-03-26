import { useState } from 'react';
import { motion } from 'framer-motion';
import { Sparkles, ArrowRight, Lock } from 'lucide-react';

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
    <div className="min-h-screen bg-gradient-to-b from-[#FAF8F5] via-[#F5F3EE] to-[#FAF9F6] relative overflow-hidden">
      {/* 装饰元素 */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 60, repeat: Infinity, ease: 'linear' }}
          className="absolute -top-20 -right-20 w-64 h-64 opacity-[0.03]"
        >
          <svg viewBox="0 0 200 200" className="w-full h-full">
            <circle cx="100" cy="100" r="80" fill="none" stroke="#E07A5F" strokeWidth="0.5" strokeDasharray="4 4"/>
            <circle cx="100" cy="100" r="60" fill="none" stroke="#E07A5F" strokeWidth="0.5"/>
            <circle cx="100" cy="100" r="40" fill="none" stroke="#E07A5F" strokeWidth="0.5" strokeDasharray="8 8"/>
          </svg>
        </motion.div>
        
        <motion.div
          animate={{ y: [0, -10, 0] }}
          transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute top-32 left-6 w-2 h-2 rounded-full bg-[#E8D5A3] opacity-40"
        />
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
          className="absolute top-48 right-10 w-1.5 h-1.5 rounded-full bg-[#D4715E] opacity-30"
        />
        <motion.div
          animate={{ y: [0, -6, 0] }}
          transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
          className="absolute top-64 left-12 w-1 h-1 rounded-full bg-[#C8C8C8] opacity-50"
        />
      </div>

      <div className="relative z-10 px-5 pt-12 pb-8">
        {/* 顶部氛围区 */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-8"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-white/60 backdrop-blur-sm rounded-full shadow-sm mb-6">
            <Sparkles className="w-3.5 h-3.5 text-[#E07A5F]" />
            <span className="text-xs font-medium text-gray-600 tracking-wide">艺起逛杭州</span>
          </div>
        </motion.div>

        {/* 主标题区 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-center mb-10"
        >
          <h1 className="text-2xl font-semibold text-gray-800 mb-2">欢迎来到艺起逛杭州</h1>
          <p className="text-sm text-gray-500">为心仪的领队队长送上你的支持</p>
        </motion.div>

        {/* 登录表单卡片 */}
        <motion.form
          initial={{ opacity: 0, y: 30, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          onSubmit={handleSubmit}
          className="bg-white rounded-3xl shadow-lg shadow-gray-100/50 p-6 space-y-4"
        >
          <div className="space-y-1.5">
            <label className="text-xs font-medium text-gray-500 tracking-wide ml-1">
              活动邀请码
            </label>
            <input
              type="text"
              value={inviteCode}
              onChange={(e) => setInviteCode(e.target.value)}
              placeholder="请输入参展码"
              className="w-full px-4 py-3 bg-[#FAF8F5] rounded-xl text-gray-700 placeholder-gray-400 text-sm outline-none focus:ring-2 focus:ring-[#E07A5F]/20 transition-all border border-transparent focus:border-[#E07A5F]/30"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-medium text-gray-500 tracking-wide ml-1">
              群昵称
            </label>
            <input
              type="text"
              value={nickname}
              onChange={(e) => setNickname(e.target.value)}
              placeholder="请输入你的昵称"
              className="w-full px-4 py-3 bg-[#FAF8F5] rounded-xl text-gray-700 placeholder-gray-400 text-sm outline-none focus:ring-2 focus:ring-[#E07A5F]/20 transition-all border border-transparent focus:border-[#E07A5F]/30"
            />
          </div>

          <motion.button
            type="submit"
            disabled={!isValid || isSubmitting}
            whileTap={{ scale: 0.98 }}
            className={`w-full py-3.5 rounded-xl font-medium text-sm flex items-center justify-center gap-2 transition-all ${
              isValid && !isSubmitting
                ? 'bg-gradient-to-r from-[#E07A5F] to-[#D4715E] text-white shadow-lg shadow-[#E07A5F]/20'
                : 'bg-gray-100 text-gray-400'
            }`}
          >
            {isSubmitting ? (
              <>
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                  className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full"
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

        {/* 底部说明 */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="mt-8 text-center"
        >
          <div className="inline-flex items-center gap-1.5 text-xs text-gray-400">
            <Lock className="w-3 h-3" />
            <span>轻登录 · 仅活动期间使用</span>
          </div>
        </motion.div>
      </div>
    </div>
  );
};
