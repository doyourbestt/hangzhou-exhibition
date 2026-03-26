import { motion } from 'framer-motion';

interface TopRankBadgeProps {
  rank: number;
}

export const TopRankBadge = ({ rank }: TopRankBadgeProps) => {
  if (rank > 3) return null;

  const badges = {
    1: {
      bg: 'bg-gradient-to-br from-amber-50 to-yellow-50',
      border: 'border-amber-200',
      text: 'text-amber-600',
      label: 'TOP 1',
    },
    2: {
      bg: 'bg-gradient-to-br from-gray-50 to-slate-50',
      border: 'border-gray-200',
      text: 'text-slate-500',
      label: 'TOP 2',
    },
    3: {
      bg: 'bg-gradient-to-br from-orange-50 to-amber-50',
      border: 'border-orange-200',
      text: 'text-orange-500',
      label: 'TOP 3',
    },
  };

  const badge = badges[rank as keyof typeof badges];

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
      className={`absolute -left-2 top-3 ${badge.bg} ${badge.border} border px-2 py-0.5 rounded-full shadow-sm`}
    >
      <span className={`text-xs font-semibold ${badge.text} tracking-wide`}>
        {badge.label}
      </span>
    </motion.div>
  );
};
