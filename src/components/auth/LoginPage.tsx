import { useState } from 'react';
import { motion } from 'framer-motion';
import { Check, Heart } from 'lucide-react';

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
    <div className="min-h-screen bg-gradient-to-b from-[#FDFCFB] to-[#F7F5F3]">
      <div className="max-w-sm mx-auto px-5 pt-20 pb-10">
        {/* 1）顶部品牌区 */}
        <motion.div
          initial={{ opacity: 0, y: -15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2">
            <Heart className="w-4 h-4 text-[#E07A5F]" fill="#E07A5F" />
            <span className="text-sm text-gray-500 tracking-wider">艺起逛杭州</span>
          </div>
        </motion.div>

        {/* 2）欢迎文案区 */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-center mb-10"
        >
          <h1 className="text-2xl font-medium text-gray-800 mb-3">
            欢迎来到艺起逛杭州
          </h1>
          <p className="text-base text-gray-400">
            完成轻登录，开始你的支持之旅
          </p>
        </motion.div>

        {/* 3）登录表单卡片区 */}
        <motion.div
          initial={{ opacity: 0, y: 20, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="bg-white rounded-3xl shadow-sm shadow-gray-100/80 p-6 mb-8"
        >
          {/* A. 邀请码输入 */}
          <div className="mb-6">
            <label className="block text-base text-gray-700 mb-3">邀请码</label>
            <input
              type="text"
              value={inviteCode}
              onChange={(e) => setInviteCode(e.target.value)}
              placeholder="请输入参展码"
              className="w-full px-5 py-5 bg-gray-50 border border-gray-100 rounded-2xl text-base text-gray-700 placeholder-gray-300 outline-none focus:ring-2 focus:ring-[#E07A5F]/20 focus:border-[#E07A5F]/30 transition-all"
            />
          </div>

          {/* B. 群昵称输入 */}
          <div className="mb-6">
            <label className="block text-base text-gray-700 mb-3">群昵称</label>
            <input
              type="text"
              value={nickname}
              onChange={(e) => setNickname(e.target.value)}
              placeholder="请输入你在群里的昵称"
              className="w-full px-5 py-5 bg-gray-50 border border-gray-100 rounded-2xl text-base text-gray-700 placeholder-gray-300 outline-none focus:ring-2 focus:ring-[#E07A5F]/20 focus:border-[#E07A5F]/30 transition-all"
            />
          </div>

          {/* C. 协议勾选 */}
          <div 
            className="flex items-start gap-3 mb-6 cursor-pointer select-none"
            onClick={() => setAgreed(!agreed)}
          >
            <div className={`w-5 h-5 rounded-full border flex items-center justify-center transition-all mt-0.5 flex-shrink-0 ${
              agreed 
                ? 'bg-[#E07A5F] border-[#E07A5F]' 
                : 'border-gray-300 bg-white'
            }`}>
              {agreed && <Check className="w-3 h-3 text-white" strokeWidth={3} />}
            </div>
            <p className="text-xs text-gray-400 leading-relaxed">
              我已阅读并同意
              <span className="text-[#E07A5F]">《微信群群规》</span>
            </p>
          </div>

          {/* D. 主按钮 */}
          <button
            onClick={handleSubmit}
            disabled={!isValid || !agreed || isSubmitting}
            className={`w-full py-5 rounded-2xl text-base font-medium transition-all flex items-center justify-center gap-2 ${
              isValid && agreed && !isSubmitting
                ? 'bg-[#E07A5F] text-white shadow-md shadow-[#E07A5F]/20 active:scale-[0.98]'
                : 'bg-gray-100 text-gray-400'
            }`}
          >
            {isSubmitting ? (
              <>
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                <span>正在进入...</span>
              </>
            ) : (
              <span>进入点赞榜</span>
            )}
          </button>
        </motion.div>

        {/* 4）底部轻说明区 */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="text-center"
        >
          <p className="text-xs text-gray-400">
            仅用于本次活动互动 · 保护你的隐私
          </p>
        </motion.div>
      </div>
    </div>
  );
};
