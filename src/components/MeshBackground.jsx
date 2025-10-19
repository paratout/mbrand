export default function MeshBackground({ variant = 'primary' }) {
  const variants = {
    primary: 'from-blue-400/20 via-indigo-400/20 to-purple-400/20',
    secondary: 'from-orange-300/20 via-rose-300/20 to-pink-300/20',
    success: 'from-emerald-300/20 via-teal-300/20 to-cyan-300/20',
    info: 'from-sky-300/20 via-blue-300/20 to-indigo-300/20',
    warning: 'from-amber-300/20 via-orange-300/20 to-red-300/20',
    purple: 'from-purple-300/20 via-fuchsia-300/20 to-pink-300/20',
  };

  return (
    <>
      {/* Animated mesh gradient background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className={`absolute inset-0 bg-gradient-to-br ${variants[variant]}`}></div>
        
        {/* Animated blobs */}
        <div className="absolute top-0 -left-4 w-72 h-72 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
        <div className="absolute top-0 -right-4 w-72 h-72 bg-yellow-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-8 left-20 w-72 h-72 bg-pink-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>
      </div>

      {/* Mesh overlay pattern */}
      <div className="absolute inset-0 opacity-10">
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="mesh-pattern" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
              <circle cx="20" cy="20" r="1" fill="currentColor" className="text-slate-900" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#mesh-pattern)" />
        </svg>
      </div>

      <style>{`
        @keyframes blob {
          0% {
            transform: translate(0px, 0px) scale(1);
          }
          33% {
            transform: translate(30px, -50px) scale(1.1);
          }
          66% {
            transform: translate(-20px, 20px) scale(0.9);
          }
          100% {
            transform: translate(0px, 0px) scale(1);
          }
        }
        .animate-blob {
          animation: blob 7s infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
      `}</style>
    </>
  );
}
