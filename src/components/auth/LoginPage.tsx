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

  const inputStyle: React.CSSProperties = {
    height: '80px',
    padding: '0 24px',
    fontSize: '18px',
    lineHeight: '80px',
    borderWidth: '2px',
    borderStyle: 'solid',
    borderColor: '#e5e7eb',
    borderRadius: '16px',
    outline: 'none',
    backgroundColor: '#f9fafb',
    color: '#1f2937',
    width: '100%',
  };

  const buttonStyle: React.CSSProperties = {
    height: '80px',
    fontSize: '18px',
    fontWeight: 'bold',
    borderRadius: '9999px',
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '8px',
    border: 'none',
    cursor: isValid && agreed && !isSubmitting ? 'pointer' : 'not-allowed',
    transition: 'all 0.2s',
  };

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#ffffff', display: 'flex' }}>
      {/* 左侧品牌区 - PC端 */}
      <div style={{ 
        display: 'none',
        width: '50%',
        background: 'linear-gradient(to bottom right, #F8F6F3, #F0EDE8)',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        overflow: 'hidden'
      }} className="md:flex">
        <motion.div 
          animate={{ rotate: 360 }}
          transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
          style={{
            position: 'absolute',
            width: '500px',
            height: '500px',
            borderRadius: '50%',
            background: 'conic-gradient(from 0deg, #E07A5F, #F4A261, #E9C46A, #2A9D8F, #E07A5F)',
            opacity: 0.15
          }}
        />
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          style={{ position: 'relative', zIndex: 10, textAlign: 'center', padding: '0 48px' }}
        >
          <div style={{
            width: '96px',
            height: '96px',
            margin: '0 auto 40px',
            marginTop: '-80px',
            background: 'linear-gradient(to bottom right, #E07A5F, #D4715E)',
            borderRadius: '24px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 10px 15px -3px rgba(224, 122, 95, 0.2)'
          }}>
            <span style={{ color: 'white', fontSize: '36px', fontWeight: 'bold' }}>艺</span>
          </div>
          <h2 style={{ fontSize: '36px', fontWeight: 'bold', color: '#1f2937', marginBottom: '24px' }}>艺起逛杭州</h2>
          <p style={{ fontSize: '20px', color: '#6b7280', lineHeight: '1.75' }}>
            发现杭州之美<br/>
            支持你喜欢的领队队长
          </p>
        </motion.div>
      </div>

      {/* 右侧登录区 */}
      <div style={{
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '48px',
      }} className="md:w-1/2">
        <div style={{ width: '100%', maxWidth: '400px' }}>
          {/* Logo - 移动端 */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            style={{ textAlign: 'center', marginBottom: '64px' }}
            className="md:hidden"
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', justifyContent: 'center' }}>
              <Heart style={{ width: '20px', height: '20px', color: '#E07A5F', fill: '#E07A5F' }} />
              <span style={{ fontSize: '16px', color: '#6b7280' }}>艺起逛杭州</span>
            </div>
          </motion.div>

          {/* 标题 */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            style={{ marginBottom: '48px' }}
          >
            <h1 style={{ fontSize: '30px', fontWeight: 'bold', color: '#111827', marginBottom: '12px' }}>欢迎回来</h1>
            <p style={{ fontSize: '18px', color: '#6b7280' }}>完成轻登录，开始你的支持之旅</p>
          </motion.div>

          {/* 表单 */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}
          >
            {/* 邀请码 */}
            <div>
              <label style={{ display: 'block', fontSize: '16px', fontWeight: '500', color: '#374151', marginBottom: '12px' }}>邀请码</label>
              <input
                type="text"
                value={inviteCode}
                onChange={(e) => setInviteCode(e.target.value)}
                placeholder="请输入参展码"
                style={inputStyle}
                onFocus={(e) => e.target.style.borderColor = '#E07A5F'}
                onBlur={(e) => e.target.style.borderColor = '#e5e7eb'}
              />
            </div>

            {/* 昵称 */}
            <div>
              <label style={{ display: 'block', fontSize: '16px', fontWeight: '500', color: '#374151', marginBottom: '12px' }}>群昵称</label>
              <input
                type="text"
                value={nickname}
                onChange={(e) => setNickname(e.target.value)}
                placeholder="请输入你的昵称"
                style={inputStyle}
                onFocus={(e) => e.target.style.borderColor = '#E07A5F'}
                onBlur={(e) => e.target.style.borderColor = '#e5e7eb'}
              />
            </div>

            {/* 协议 */}
            <div 
              style={{ display: 'flex', alignItems: 'flex-start', gap: '16px', cursor: 'pointer' }}
              onClick={() => setAgreed(!agreed)}
            >
              <div style={{
                width: '24px',
                height: '24px',
                borderRadius: '50%',
                border: '2px solid',
                borderColor: agreed ? '#E07A5F' : '#d1d5db',
                backgroundColor: agreed ? '#E07A5F' : '#ffffff',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginTop: '2px',
                flexShrink: 0,
                transition: 'all 0.2s'
              }}>
                {agreed && <Check style={{ width: '14px', height: '14px', color: 'white', strokeWidth: 3 }} />}
              </div>
              <p style={{ fontSize: '14px', color: '#6b7280', lineHeight: '1.5' }}>
                我已阅读并同意
                <span style={{ color: '#E07A5F' }}>《微信群群规》</span>
              </p>
            </div>

            {/* 主按钮 */}
            <button
              onClick={handleSubmit}
              disabled={!isValid || !agreed || isSubmitting}
              style={{
                ...buttonStyle,
                backgroundColor: isValid && agreed && !isSubmitting ? '#000000' : '#f3f4f6',
                color: isValid && agreed && !isSubmitting ? '#ffffff' : '#9ca3af',
              }}
            >
              {isSubmitting ? (
                <>
                  <div style={{
                    width: '24px',
                    height: '24px',
                    border: '2px solid rgba(255,255,255,0.3)',
                    borderTopColor: 'white',
                    borderRadius: '50%',
                    animation: 'spin 1s linear infinite'
                  }} />
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
            style={{ textAlign: 'center', fontSize: '14px', color: '#9ca3af', marginTop: '40px' }}
          >
            仅用于本次活动互动 · 保护你的隐私
          </motion.p>
        </div>
      </div>

      <style>{`
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
};
