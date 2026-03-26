import { useState } from 'react';
import { motion } from 'framer-motion';
import { Sparkles, User, Hash, CheckCircle, AlertCircle } from 'lucide-react';

interface LoginPageProps {
  onLogin: (inviteCode: string, nickname: string) => Promise<void>;
}

export const LoginPage = ({ onLogin }: LoginPageProps) => {
  const [inviteCode, setInviteCode] = useState('');
  const [nickname, setNickname] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<{ inviteCode?: string; nickname?: string; general?: string }>({});

  const validateForm = (): boolean => {
    const newErrors: { inviteCode?: string; nickname?: string; general?: string } = {};
    
    if (!inviteCode.trim()) {
      newErrors.inviteCode = '请输入活动邀请码';
    } else if (inviteCode.length < 4) {
      newErrors.inviteCode = '邀请码至少4个字符';
    }
    
    if (!nickname.trim()) {
      newErrors.nickname = '请输入群昵称';
    } else if (nickname.length < 2) {
      newErrors.nickname = '昵称至少2个字符';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setIsSubmitting(true);
    setErrors({});
    
    try {
      await onLogin(inviteCode.trim(), nickname.trim());
    } catch (error: any) {
      console.error('Login error:', error);
      setErrors({
        general: error?.message || '登录失败，请检查网络连接或联系管理员'
      });
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-warm-white to-soft-cream flex items-center justify-center p-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-md"
      >
        <div className="text-center mb-8">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-gentle-coral to-warm-terracotta mb-4"
          >
            <Sparkles className="w-8 h-8 text-white" />
          </motion.div>
          
          <motion.h1
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-2xl font-semibold text-gray-800 mb-2"
          >
            欢迎来到艺起逛杭州
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="text-sm text-gray-500"
          >
            请先完成轻登录，开始你的支持之旅
          </motion.p>
        </div>

        <motion.form
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          onSubmit={handleSubmit}
          className="bg-white rounded-3xl shadow-soft-card p-6 space-y-5"
        >
          {errors.general && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-red-50 border border-red-200 rounded-xl p-3 flex items-center gap-2"
            >
              <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0" />
              <p className="text-sm text-red-600">{errors.general}</p>
            </motion.div>
          )}

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              <div className="flex items-center gap-2">
                <Hash className="w-4 h-4 text-gray-400" />
                <span>活动邀请码</span>
              </div>
            </label>
            <input
              type="text"
              value={inviteCode}
              onChange={(e) => {
                setInviteCode(e.target.value);
                if (errors.inviteCode) {
                  setErrors(prev => ({ ...prev, inviteCode: undefined }));
                }
              }}
              placeholder="请输入参展码/邀请码"
              disabled={isSubmitting}
              className={`w-full px-4 py-3 rounded-xl border ${
                errors.inviteCode 
                  ? 'border-red-300 bg-red-50' 
                  : 'border-gray-200'
              } focus:outline-none focus:ring-2 focus:ring-gentle-coral focus:border-transparent transition-all disabled:opacity-50`}
            />
            {errors.inviteCode && (
              <motion.p
                initial={{ opacity: 0, y: -5 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-xs text-red-500 mt-1"
              >
                {errors.inviteCode}
              </motion.p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              <div className="flex items-center gap-2">
                <User className="w-4 h-4 text-gray-400" />
                <span>群昵称</span>
              </div>
            </label>
            <input
              type="text"
              value={nickname}
              onChange={(e) => {
                setNickname(e.target.value);
                if (errors.nickname) {
                  setErrors(prev => ({ ...prev, nickname: undefined }));
                }
              }}
              placeholder="请输入你在群里的昵称"
              disabled={isSubmitting}
              className={`w-full px-4 py-3 rounded-xl border ${
                errors.nickname 
                  ? 'border-red-300 bg-red-50' 
                  : 'border-gray-200'
              } focus:outline-none focus:ring-2 focus:ring-gentle-coral focus:border-transparent transition-all disabled:opacity-50`}
            />
            {errors.nickname && (
              <motion.p
                initial={{ opacity: 0, y: -5 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-xs text-red-500 mt-1"
              >
                {errors.nickname}
              </motion.p>
            )}
          </div>

          <motion.button
            type="submit"
            disabled={isSubmitting}
            whileTap={{ scale: 0.98 }}
            className="w-full py-3.5 bg-gradient-to-r from-gentle-coral to-warm-terracotta text-white font-medium rounded-xl shadow-lg hover:shadow-xl transition-shadow disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {isSubmitting ? (
              <>
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                  className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
                />
                <span>正在加入...</span>
              </>
            ) : (
              <>
                <CheckCircle className="w-5 h-5" />
                <span>进入活动</span>
              </>
            )}
          </motion.button>
        </motion.form>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
          className="text-center text-xs text-gray-400 mt-6"
        >
          轻登录 · 仅活动期间使用 · 保护您的隐私
        </motion.p>
      </motion.div>
    </div>
  );
};
