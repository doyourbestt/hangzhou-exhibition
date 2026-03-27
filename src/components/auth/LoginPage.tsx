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
    <div className="min-h-screen bg-white flex">
      {/* 左侧品牌区 - PC端显示 */}
      <div className="hidden md:flex md:w-1/2 bg-gradient-to-br from-[#F8F6F3] to-[#F0EDE8] items-center justify-center relative overflow-hidden">
        {/* 装饰圆形 */}
        <motion.div 
          animate={{ rotate: 360 }}
          transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
          className="absolute w-[500px] h-[500px] rounded-full"
          style={{
            background: 'conic-gradient(from 0deg, #E07A5F, #F4A261, #E9C46A, #2A9D8F, #E07A5F)',
            opacity: 0.15
          }}
        />
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="relative z-10 text-center px-12"
        >
          <div className="w-20 h-20 mx-auto mb-8 mt-[-40px] bg-gradient-to-br from-[#E07A5F] to-[#D4715E] rounded-2xl flex items-center justify-center shadow-lg shadow-[#E07A5F]/20">
            <span className="text-white text-3xl font-bold">艺</span>
          </div>
          <h2 className="text-3xl font-bold text-gray-800 mb-4">艺起逛杭州</h2>
          <p className="text-base text-gray-500 leading-relaxed">
            发现杭州之美<br/>
            支持你喜欢的领队队长
          </p>
        </motion.div>
      </div>

      {/* 右侧登录区 */}
      <div className="w-full md:w-1/2 flex items-center justify-center p-8">
        <div className="w-full max-w-[352px]">
          {/* Logo - 移动端显示 */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="md:hidden text-center mb-12 mt-[-40px]"
          >
            <div className="inline-flex items-center gap-2">
              <Heart className="w-4 h-4 text-[#E07A5F]" fill="#E07A5F" />
              <span className="text-sm text-gray-500 tracking-wider">艺起逛杭州</span>
            </div>
          </motion.div>

          {/* 标题 */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-10"
          >
            <h1 className="text-2xl font-bold text-gray-900 mb-2">欢迎回来</h1>
            <p className="text-sm text-gray-500">完成轻登录，开始你的支持之旅</p>
          </motion.div>

          {/* 表单 */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="space-y-5"
          >
            {/* 邀请码 */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">邀请码</label>
              <input
                type="text"
                value={inviteCode}
                onChange={(e) => setInviteCode(e.target.value)}
                placeholder="请输入参展码"
                className="w-full px-4 py-4 text-base text-gray-800 bg-gray-50 rounded-2xl outline-none transition-all"
                style={{
                  boxShadow: 'inset 0 0 0 30px #f5f5f5'
                }}
              />
            </div>

            {/* 昵称 */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">群昵称</label>
              <input
                type="text"
                value={nickname}
                onChange={(e) => setNickname(e.target.value)}
                placeholder="请输入你的昵称"
                className="w-full px-4 py-4 text-base text-gray-800 bg-gray-50 rounded-2xl outline-none transition-all"
                style={{
                  boxShadow: 'inset 0 0 0 30px #f5f5f5'
                }}
              />
            </div>

            {/* 协议 - 勾选框始终显示 */}
            <div 
              className="flex items-start gap-3 cursor-pointer select-none"
              onClick={() => setAgreed(!agreed)}
            >
              <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all mt-0.5 flex-shrink-0 ${
                agreed 
                  ? 'bg-[#E07A5F] border-[#E07A5F]' 
                  : 'border-gray-300 bg-white'
              }`}>
                {agreed && <Check className="w-3 h-3 text-white" strokeWidth={3} />}
              </div>
              <p className="text-xs text-gray-500 leading-relaxed">
                我已阅读并同意
                <span className="text-[#E07A5F]">《微信群群规》</span>
              </p>
            </div>

            {/* 主按钮 - 高度和字体增大 */}
            <button
              onClick={handleSubmit}
              disabled={!isValid || !agreed || isSubmitting}
              className={`w-full py-8 text-lg font-bold rounded-full transition-all flex items-center justify-center gap-2 ${
                isValid && agreed && !isSubmitting
                  ? 'bg-black text-white active:scale-[0.98]'
                  : 'bg-gray-100 text-gray-400'
              }`}
            >
              {isSubmitting ? (
                <>
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  <span>登录中...</span>
                </>
              ) : (
                <span>登录</span>
              )}
            </button>
          </motion.div>

          {/* 底部说明 */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-center text-xs text-gray-400 mt-8"
          >
            仅用于本次活动互动 · 保护你的隐私
          </motion.p>
        </div>
      </div>
    </div>
  );
};
