'use client';
import { motion } from 'framer-motion';
import { MessageCircle } from 'lucide-react';

export default function FloatingWhatsApp({ tooltip }: { tooltip: string }) {
  return (
    <motion.a
      href="https://wa.me/972500000000"
      target="_blank"
      rel="noopener noreferrer"
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      className="fixed bottom-6 right-6 z-50 bg-[#25D366] hover:bg-[#128C7E] text-white p-4 rounded-full shadow-2xl transition-all hover:scale-110 flex items-center justify-center group"
    >
      <MessageCircle size={32} />
      <span className="absolute right-full mr-4 bg-white text-gray-800 text-sm font-bold py-2 px-4 rounded-lg shadow-lg opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all pointer-events-none whitespace-nowrap">
        {tooltip}
      </span>
    </motion.a>
  );
}
