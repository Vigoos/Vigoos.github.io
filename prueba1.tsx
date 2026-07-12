import React, { useState, useEffect, useRef } from 'react';
import { 
  ShieldCheck, 
  Snowflake, 
  FileCheck, 
  ArrowRight, 
  Menu, 
  X, 
  Target, 
  Eye, 
  Heart,
  ChevronRight,
  Phone,
  Mail,
  Dna,
  Activity
} from 'lucide-react';

const AbstractNetworkCanvas = () => {
  const canvasRef = useRef(null);
  const containerRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let animationFrameId;
    let particles = [];
    
    // Configuración de rendimiento según dispositivo
    const particleCount = window.innerWidth < 768 ? 40 : 80; // Reducido ligeramente para asegurar 60fps
    const connectionDistance = 150;
    // OPTIMIZACIÓN 1: Precalcular la distancia al cuadrado para evitar Math.sqrt en el bucle
    const connDistSq = connectionDistance * connectionDistance; 
    let mouse = { x: null, y: null, radius: 200 };

    const initParticles = () => {
      particles = [];
      for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle());
      }
    };

    class Particle {
      constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 2 + 0.5;
        this.density = (Math.random() * 30) + 1;
        this.vx = (Math.random() - 0.5) * 0.5;
        this.vy = (Math.random() - 0.5) * 0.5;
      }

      draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.closePath();
        ctx.fill();
      }

      update() {
        this.x += this.vx;
        this.y += this.vy;

        if (this.x < 0 || this.x > canvas.width) this.vx = -this.vx;
        if (this.y < 0 || this.y > canvas.height) this.vy = -this.vy;

        if (mouse.x != null && mouse.y != null) {
          let dx = mouse.x - this.x;
          let dy = mouse.y - this.y;
          let distance = Math.sqrt(dx * dx + dy * dy); // Aquí sí es necesario para la física suave
          
          if (distance < mouse.radius) {
            const forceDirectionX = dx / distance;
            const forceDirectionY = dy / distance;
            const force = (mouse.radius - distance) / mouse.radius;
            const directionX = forceDirectionX * force * this.density * 0.6;
            const directionY = forceDirectionY * force * this.density * 0.6;
            
            this.x -= directionX;
            this.y -= directionY;
          }
        }
      }
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = 'rgba(20, 184, 166, 0.8)'; // Teal-500
      
      for (let i = 0; i < particles.length; i++) {
        particles[i].update();
        particles[i].draw();
        
        for (let j = i + 1; j < particles.length; j++) {
          let dx = particles[i].x - particles[j].x;
          let dy = particles[i].y - particles[j].y;
          // OPTIMIZACIÓN 1: Comparar cuadrados. Evita miles de raíces cuadradas por frame.
          let distSq = dx * dx + dy * dy;
          
          if (distSq < connDistSq) {
            // Opacidad no lineal (cuadrática), se ve más fluido y es más rápido de calcular
            let opacity = 1 - (distSq / connDistSq);
            ctx.strokeStyle = `rgba(14, 165, 233, ${opacity * 0.4})`; // Sky-500
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }
      }
      animationFrameId = requestAnimationFrame(animate);
    };

    // OPTIMIZACIÓN 2: ResizeObserver reemplaza a window.resize para precisión de contenedor
    const resizeObserver = new ResizeObserver(entries => {
      for (let entry of entries) {
        if (entry.contentBoxSize) {
          canvas.width = entry.contentRect.width;
          canvas.height = entry.contentRect.height;
          // Reposicionar partículas si salen del nuevo borde
          particles.forEach(p => {
             if (p.x > canvas.width) p.x = canvas.width - 10;
             if (p.y > canvas.height) p.y = canvas.height - 10;
          });
        }
      }
    });

    if (containerRef.current) {
      // Configuramos el tamaño inicial y comenzamos la observación
      canvas.width = containerRef.current.clientWidth;
      canvas.height = containerRef.current.clientHeight;
      resizeObserver.observe(containerRef.current);
    }
    
    initParticles();
    animate();

    const handleMouseMove = (e) => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
    };
    const handleMouseLeave = () => {
      mouse.x = null;
      mouse.y = null;
    };

    canvas.addEventListener('mousemove', handleMouseMove);
    canvas.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      resizeObserver.disconnect();
      canvas.removeEventListener('mousemove', handleMouseMove);
      canvas.removeEventListener('mouseleave', handleMouseLeave);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div ref={containerRef} className="absolute inset-0 w-full h-full z-0 overflow-hidden">
      <canvas 
        ref={canvasRef} 
        className="w-full h-full pointer-events-auto block"
        style={{ background: 'linear-gradient(to bottom right, #020617, #0f172a, #082f49)' }} 
      />
    </div>
  );
};

export default function App() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-800 selection:bg-teal-500 selection:text-white">
      
      {/* Top Bar Discreta */}
      <div className="hidden md:flex justify-between items-center px-8 py-2 bg-slate-950 text-slate-400 text-xs font-medium tracking-wide border-b border-white/5">
        <div className="flex gap-6">
          <span className="flex items-center gap-1 hover:text-teal-400 transition-colors cursor-pointer"><Mail size={12}/> atencion@biadoxidpharma.com</span>
          <span className="flex items-center gap-1"><Phone size={12}/> +591 7000-0000</span>
        </div>
        <div>
          <span className="text-teal-500/80">La Paz, Bolivia | Registro AGEMED Vigente</span>
        </div>
      </div>

      <nav className="absolute top-8 left-0 w-full z-50 px-6 md:px-8 pointer-events-none">
        <div className="max-w-7xl mx-auto bg-slate-900/50 backdrop-blur-xl border border-white/10 rounded-2xl flex justify-between items-center px-6 py-4 shadow-2xl pointer-events-auto">
          {/* Logo Branding */}
          <div className="flex items-center gap-3 cursor-pointer">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-teal-400 to-blue-600 flex items-center justify-center text-white shadow-[0_0_15px_rgba(20,184,166,0.5)]">
              <Dna size={22} />
            </div>
            <div>
              <h1 className="text-xl font-black tracking-tight text-white leading-none">BIADOXID</h1>
              <span className="text-[10px] uppercase tracking-widest text-teal-400 font-bold">Pharma S.R.L.</span>
            </div>
          </div>

          {/* Enlaces Desktop */}
          <div className="hidden lg:flex items-center gap-8 text-sm font-semibold text-slate-300">
            <a href="#" className="text-white border-b-2 border-teal-500 pb-1">Inicio</a>
            <a href="#nosotros" className="hover:text-teal-400 transition-colors pb-1">Identidad</a>
            <a href="#productos" className="hover:text-teal-400 transition-colors pb-1">Portafolio Clínico</a>
            <a href="#logistica" className="hover:text-teal-400 transition-colors pb-1">Logística Integral</a>
          </div>

          {/* Botón CTA Nav */}
          <div className="hidden lg:block">
            <button className="bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/20 text-white px-6 py-2.5 rounded-full text-sm font-bold transition-all shadow-lg flex items-center gap-2 group">
              Acceso Médico <ChevronRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </button>
          </div>

          {/* Mobile Menu Toggle - A11y Optimized */}
          <button 
            className="lg:hidden text-white pointer-events-auto p-2 focus:outline-none focus:ring-2 focus:ring-teal-500 rounded-lg"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-expanded={isMobileMenuOpen}
            aria-label="Abrir menú de navegación"
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu Content */}
        {isMobileMenuOpen && (
          <div className="lg:hidden mt-2 w-full bg-slate-900/95 backdrop-blur-xl border border-white/10 rounded-2xl py-4 px-6 flex flex-col gap-4 shadow-2xl pointer-events-auto transform origin-top transition-all">
            <a href="#" className="text-teal-400 font-semibold text-lg">Inicio</a>
            <a href="#nosotros" className="text-slate-300 font-semibold text-lg hover:text-white">Identidad corporativa</a>
            <a href="#productos" className="text-slate-300 font-semibold text-lg hover:text-white">Portafolio Clínico</a>
            <a href="#logistica" className="text-slate-300 font-semibold text-lg hover:text-white">Logística</a>
          </div>
        )}
      </nav>

      <header className="relative w-full min-h-[90vh] flex items-center justify-center overflow-hidden bg-slate-950">
        {/* Fondo Interactivo */}
        <AbstractNetworkCanvas />
        
        {/* Capa de iluminación sobre el canvas */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-slate-950/40 to-slate-50 pointer-events-none z-0"></div>

        <div className="max-w-7xl mx-auto px-6 md:px-8 relative z-10 w-full mt-24 lg:mt-20 grid lg:grid-cols-12 gap-12 items-center pointer-events-none">
          
          {/* Texto Principal Hero Integrado */}
          <div className="lg:col-span-7 pt-12 md:pt-0 pointer-events-auto">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-teal-500/10 border border-teal-500/30 text-teal-300 text-xs font-bold uppercase tracking-[0.1em] mb-8 backdrop-blur-md">
              <span className="w-2 h-2 rounded-full bg-teal-400 animate-pulse shadow-[0_0_8px_rgba(45,212,191,0.8)]"></span>
              La salud no espera. Nosotros tampoco.
            </div>
            
            <h2 className="text-4xl md:text-6xl lg:text-7xl font-black text-white leading-[1.05] mb-6 tracking-tight">
              Garantizando el acceso a <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-blue-500">medicamentos de alta calidad</span>
            </h2>
            
            <p className="text-lg md:text-xl text-slate-300 mb-10 leading-relaxed max-w-2xl font-light">
              Importación y distribución eficiente de productos farmacéuticos innovadores y seguros a nivel nacional. Representación exclusiva de laboratorios internacionales.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-5">
              <button className="bg-gradient-to-r from-teal-500 to-blue-600 hover:from-teal-400 hover:to-blue-500 text-white px-8 py-4 rounded-full text-base font-bold transition-all shadow-[0_0_20px_rgba(20,184,166,0.3)] hover:shadow-[0_0_30px_rgba(20,184,166,0.5)] flex items-center justify-center gap-3">
                Explorar Productos <ArrowRight size={18} />
              </button>
              <button className="bg-transparent hover:bg-white/5 border border-slate-600 text-white px-8 py-4 rounded-full text-base font-medium transition-all flex items-center justify-center">
                Portal Médico
              </button>
            </div>
          </div>

          {/* Tarjeta de imagen superpuesta adaptada al estilo tecnológico */}
          <div className="lg:col-span-5 relative hidden md:block pointer-events-auto transform hover:-translate-y-2 transition-transform duration-500 mt-10 lg:mt-0">
             <div className="w-full h-96 lg:h-[450px] rounded-[2rem] overflow-hidden shadow-2xl relative border border-white/10 group">
                <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1579684385127-1ef15d508118?q=80&w=2000&auto=format&fit=crop')] bg-cover bg-center opacity-40 mix-blend-luminosity group-hover:opacity-60 transition-opacity duration-700"></div>
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/60 to-transparent"></div>
                
                {/* Glow Effect interno */}
                <div className="absolute -top-10 -right-10 w-40 h-40 bg-teal-500 rounded-full mix-blend-screen filter blur-[60px] opacity-40"></div>
                
                <div className="absolute bottom-6 left-6 right-6 flex flex-col gap-3">
                  <div className="bg-slate-900/80 backdrop-blur-md p-4 rounded-2xl border border-white/10 shadow-lg flex items-center gap-4">
                    <div className="p-2.5 bg-teal-500/20 text-teal-400 border border-teal-500/30 rounded-xl"><Snowflake size={22} /></div>
                    <div>
                      <h4 className="font-bold text-white text-sm leading-tight">Cadena de Frío</h4>
                      <p className="text-xs text-slate-400 mt-0.5">Conservación estricta y monitoreada</p>
                    </div>
                  </div>

                  <div className="bg-slate-900/80 backdrop-blur-md p-4 rounded-2xl border border-white/10 shadow-lg flex items-center gap-4">
                    <div className="p-2.5 bg-blue-500/20 text-blue-400 border border-blue-500/30 rounded-xl"><FileCheck size={22} /></div>
                    <div>
                      <h4 className="font-bold text-white text-sm leading-tight">Certificación AGEMED</h4>
                      <p className="text-xs text-slate-400 mt-0.5">Auditorías rigurosas por lote</p>
                    </div>
                  </div>
                </div>
             </div>
          </div>
        </div>
      </header>

      {}
      <section id="nosotros" className="py-32 bg-slate-50 relative z-20 overflow-hidden">
        {/* Elementos decorativos de fondo */}
        <div className="absolute top-0 right-0 w-full h-full overflow-hidden pointer-events-none opacity-40">
          <div className="absolute -top-[20%] -right-[10%] w-[70%] h-[70%] bg-teal-100/50 rounded-full blur-3xl mix-blend-multiply"></div>
          <div className="absolute top-[40%] -left-[10%] w-[50%] h-[50%] bg-blue-100/50 rounded-full blur-3xl mix-blend-multiply"></div>
        </div>

        <div className="max-w-7xl mx-auto px-6 md:px-8 relative z-10">
          <div className="grid lg:grid-cols-12 gap-16 items-start">
            
            {/* Columna Izquierda - Fija (Sticky) */}
            <div className="lg:col-span-5 lg:sticky lg:top-32">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-slate-200 text-teal-600 text-xs font-bold uppercase tracking-widest mb-6 shadow-sm">
                <Dna size={14} className="animate-pulse" /> ADN Corporativo
              </div>
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-slate-900 leading-[1.1] mb-6 tracking-tight">
                Ciencia aplicada al servicio de la vida.
              </h2>
              <p className="text-slate-600 text-lg leading-relaxed mb-8 border-l-2 border-teal-500 pl-6">
                No somos solo distribuidores; somos el puente vital entre la innovación farmacéutica global y la salud de nuestra comunidad.
              </p>
              
              <div className="hidden lg:flex items-center gap-4 text-sm font-semibold text-slate-500 mt-12">
                <span className="w-12 h-[1px] bg-slate-300"></span> Desliza para explorar
              </div>
            </div>

            {/* Columna Derecha - Tarjetas fluyentes */}
            <div className="lg:col-span-7 space-y-8">
              {/* Tarjeta Misión */}
              <div className="bg-white/80 backdrop-blur-xl p-8 md:p-10 rounded-[2.5rem] shadow-[0_20px_60px_-15px_rgba(0,0,0,0.05)] border border-white hover:-translate-y-2 transition-transform duration-500 group">
                <div className="flex flex-col sm:flex-row gap-8 items-start">
                  <div className="w-20 h-20 shrink-0 bg-blue-50 rounded-3xl flex items-center justify-center text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-colors duration-500 shadow-inner">
                    <Target size={36} strokeWidth={1.5} />
                  </div>
                  <div>
                    <h4 className="text-2xl font-extrabold text-slate-900 mb-4 tracking-tight">Nuestra Misión</h4>
                    <p className="text-slate-600 leading-relaxed text-lg font-light">
                      Garantizar el acceso ininterrumpido a medicamentos de alta especialidad a nivel nacional, mediante una logística implacable y la representación exclusiva de laboratorios que cumplen los estándares más exigentes del mundo.
                    </p>
                  </div>
                </div>
              </div>

              {/* Tarjeta Visión - Estilo Premium Oscuro */}
              <div className="bg-slate-950 p-8 md:p-10 rounded-[2.5rem] shadow-2xl border border-slate-800 hover:border-teal-500/30 hover:-translate-y-2 transition-all duration-500 relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-64 h-64 bg-teal-500/10 rounded-full blur-3xl group-hover:bg-teal-500/20 transition-colors"></div>
                <div className="flex flex-col sm:flex-row gap-8 items-start relative z-10">
                  <div className="w-20 h-20 shrink-0 bg-slate-900 border border-slate-800 rounded-3xl flex items-center justify-center text-teal-400 group-hover:scale-110 transition-transform duration-500">
                    <Eye size={36} strokeWidth={1.5} />
                  </div>
                  <div>
                    <h4 className="text-2xl font-extrabold text-white mb-4 tracking-tight">Nuestra Visión</h4>
                    <p className="text-slate-400 leading-relaxed text-lg font-light">
                      Ser reconocidos no solo como el principal importador de la región, sino como el <span className="text-teal-400 font-medium">socio estratégico número uno</span> del sector médico público y privado, redefiniendo la confiabilidad en la cadena de suministro en salud.
                    </p>
                  </div>
                </div>
              </div>

              {/* Tarjeta Valores */}
              <div className="bg-white/80 backdrop-blur-xl p-8 md:p-10 rounded-[2.5rem] shadow-[0_20px_60px_-15px_rgba(0,0,0,0.05)] border border-white hover:-translate-y-2 transition-transform duration-500 group">
                <div className="flex flex-col sm:flex-row gap-8 items-start">
                  <div className="w-20 h-20 shrink-0 bg-teal-50 rounded-3xl flex items-center justify-center text-teal-600 group-hover:bg-teal-600 group-hover:text-white transition-colors duration-500 shadow-inner">
                    <Heart size={36} strokeWidth={1.5} />
                  </div>
                  <div className="w-full">
                    <h4 className="text-2xl font-extrabold text-slate-900 mb-6 tracking-tight">Valores Inquebrantables</h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="bg-slate-50 p-4 rounded-2xl flex items-center gap-3 border border-slate-100">
                        <div className="w-8 h-8 rounded-full bg-white shadow-sm flex items-center justify-center text-teal-500 font-bold text-xs">01</div>
                        <span className="font-semibold text-slate-700">Calidad Absoluta</span>
                      </div>
                      <div className="bg-slate-50 p-4 rounded-2xl flex items-center gap-3 border border-slate-100">
                        <div className="w-8 h-8 rounded-full bg-white shadow-sm flex items-center justify-center text-teal-500 font-bold text-xs">02</div>
                        <span className="font-semibold text-slate-700">Innovación</span>
                      </div>
                      <div className="bg-slate-50 p-4 rounded-2xl flex items-center gap-3 border border-slate-100">
                        <div className="w-8 h-8 rounded-full bg-white shadow-sm flex items-center justify-center text-teal-500 font-bold text-xs">03</div>
                        <span className="font-semibold text-slate-700">Integridad</span>
                      </div>
                      <div className="bg-slate-50 p-4 rounded-2xl flex items-center gap-3 border border-slate-100">
                        <div className="w-8 h-8 rounded-full bg-white shadow-sm flex items-center justify-center text-teal-500 font-bold text-xs">04</div>
                        <span className="font-semibold text-slate-700">Compromiso</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
            </div>
          </div>
        </div>
      </section>

      {}
      <section id="productos" className="py-32 bg-slate-950 relative overflow-hidden">
        {/* Background Grid Pattern Tecnológico */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>
        <div className="absolute left-0 right-0 top-0 -z-10 m-auto h-[310px] w-[310px] rounded-full bg-blue-500 opacity-20 blur-[100px]"></div>
        
        <div className="max-w-7xl mx-auto px-6 md:px-8 relative z-10">
          
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-20 gap-8">
            <div className="max-w-2xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-blue-900/30 border border-blue-500/30 text-blue-400 text-xs font-mono tracking-widest mb-4">
                [ DATABASE_ACCESSED ]
              </div>
              <h3 className="text-4xl md:text-5xl font-black text-white mb-6 tracking-tight">Portafolio Clínico</h3>
              <p className="text-slate-400 text-lg font-light leading-relaxed">Representación exclusiva de laboratorios de clase mundial. Fármacos aprobados bajo los más rigurosos estándares internacionales de farmacopea.</p>
            </div>
            
            <button className="group flex items-center gap-3 bg-white/5 hover:bg-white/10 border border-white/10 px-6 py-3 rounded-xl text-white font-semibold transition-all backdrop-blur-md">
              <span>Desplegar Catálogo</span>
              <div className="w-8 h-8 rounded-lg bg-teal-500/20 text-teal-400 flex items-center justify-center group-hover:bg-teal-500 group-hover:text-white transition-colors">
                <ChevronRight size={18} />
              </div>
            </button>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            
            {/* Producto 1 - Estilo Panel Científico */}
            <div className="group relative bg-slate-900/50 backdrop-blur-sm border border-slate-800 rounded-3xl p-8 hover:bg-slate-800/50 hover:border-teal-500/50 transition-all duration-500 flex flex-col h-full overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-teal-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              
              <div className="flex justify-between items-start mb-10">
                {/* Badge tipo Tabla Periódica */}
                <div className="w-20 h-20 rounded-2xl border border-slate-700 bg-slate-950 flex flex-col items-center justify-center shadow-lg group-hover:border-teal-500 group-hover:shadow-[0_0_20px_rgba(20,184,166,0.3)] transition-all duration-500">
                  <span className="text-xs text-slate-500 font-mono mb-0.5">Pv</span>
                  <span className="text-2xl font-black text-white">B12</span>
                </div>
                <div className="px-3 py-1 rounded-full border border-slate-700 bg-slate-800/50 text-[10px] uppercase tracking-widest text-slate-400">
                  Suplemento
                </div>
              </div>

              <div className="flex-1">
                <h4 className="text-2xl font-bold text-white mb-3 group-hover:text-teal-400 transition-colors">PROVIT B12</h4>
                <p className="text-slate-400 text-sm leading-relaxed mb-8 font-light">
                  Intervención crucial para el metabolismo celular, formación de glóbulos rojos y mantenimiento óptimo del sistema nervioso central.
                </p>
              </div>

              <div className="border-t border-slate-800 pt-6 mt-auto">
                <button className="w-full flex items-center justify-between text-sm font-mono text-slate-300 group-hover:text-white transition-colors">
                  <span>FICHA_TECNICA.PDF</span>
                  <ArrowRight size={16} className="text-slate-600 group-hover:text-teal-400 group-hover:translate-x-1 transition-all" />
                </button>
              </div>
            </div>

            {/* Producto 2 */}
            <div className="group relative bg-slate-900/50 backdrop-blur-sm border border-slate-800 rounded-3xl p-8 hover:bg-slate-800/50 hover:border-blue-500/50 transition-all duration-500 flex flex-col h-full overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-blue-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              
              <div className="flex justify-between items-start mb-10">
                <div className="w-20 h-20 rounded-2xl border border-slate-700 bg-slate-950 flex flex-col items-center justify-center shadow-lg group-hover:border-blue-500 group-hover:shadow-[0_0_20px_rgba(59,130,246,0.3)] transition-all duration-500">
                  <span className="text-xs text-slate-500 font-mono mb-0.5">Tk</span>
                  <span className="text-2xl font-black text-white">TNK</span>
                </div>
                <div className="px-3 py-1 rounded-full border border-slate-700 bg-slate-800/50 text-[10px] uppercase tracking-widest text-slate-400">
                  Trombolítico
                </div>
              </div>

              <div className="flex-1">
                <h4 className="text-2xl font-bold text-white mb-3 group-hover:text-blue-400 transition-colors">Tenecteplasa (TNK-tPA)</h4>
                <p className="text-slate-400 text-sm leading-relaxed mb-8 font-light">
                  Tratamiento trombolítico de urgencia cardiovascular. Fármaco de alta especialidad exclusivo para uso intrahospitalario y atención crítica.
                </p>
              </div>

              <div className="border-t border-slate-800 pt-6 mt-auto">
                <button className="w-full flex items-center justify-between text-sm font-mono text-slate-300 group-hover:text-white transition-colors">
                  <span>FICHA_TECNICA.PDF</span>
                  <ArrowRight size={16} className="text-slate-600 group-hover:text-blue-400 group-hover:translate-x-1 transition-all" />
                </button>
              </div>
            </div>

            {/* Producto 3 */}
            <div className="group relative bg-slate-900/50 backdrop-blur-sm border border-slate-800 rounded-3xl p-8 hover:bg-slate-800/50 hover:border-slate-300/50 transition-all duration-500 flex flex-col h-full overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-slate-100/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              
              <div className="flex justify-between items-start mb-10">
                <div className="w-20 h-20 rounded-2xl border border-slate-700 bg-slate-950 flex flex-col items-center justify-center shadow-lg group-hover:border-slate-300 group-hover:shadow-[0_0_20px_rgba(255,255,255,0.2)] transition-all duration-500">
                  <span className="text-xs text-slate-500 font-mono mb-0.5">Ar</span>
                  <span className="text-2xl font-black text-white">ARN</span>
                </div>
                <div className="px-3 py-1 rounded-full border border-slate-700 bg-slate-800/50 text-[10px] uppercase tracking-widest text-slate-400">
                  Dermatológico
                </div>
              </div>

              <div className="flex-1">
                <h4 className="text-2xl font-bold text-white mb-3 group-hover:text-slate-200 transition-colors">Arnik Forte Crema</h4>
                <p className="text-slate-400 text-sm leading-relaxed mb-8 font-light">
                  Solución dermatológica avanzada para el bienestar muscular. Calidad comprobada para el alivio rápido y tratamiento focalizado del dolor.
                </p>
              </div>

              <div className="border-t border-slate-800 pt-6 mt-auto">
                <button className="w-full flex items-center justify-between text-sm font-mono text-slate-300 group-hover:text-white transition-colors">
                  <span>FICHA_TECNICA.PDF</span>
                  <ArrowRight size={16} className="text-slate-600 group-hover:text-slate-200 group-hover:translate-x-1 transition-all" />
                </button>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* SECCIÓN LOGÍSTICA - Fondo oscuro corporativo integrando la foto */}
      <section id="logistica" className="py-32 bg-slate-950 text-white relative overflow-hidden">
        {/* Círculo abstracto de fondo */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden opacity-5 pointer-events-none">
          <div className="absolute w-[800px] h-[800px] border-[100px] border-white rounded-full -top-96 -left-48"></div>
        </div>

        <div className="max-w-7xl mx-auto px-6 md:px-8 relative z-10">
          <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
            
            <div className="order-2 lg:order-1 relative">
               <div className="relative h-[500px] rounded-3xl overflow-hidden shadow-[0_0_50px_rgba(0,0,0,0.5)] group">
                  <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1582719471384-894fbb16e074?q=80&w=1000&auto=format&fit=crop')] bg-cover bg-center opacity-50 mix-blend-luminosity group-hover:opacity-70 transition-opacity duration-700 group-hover:scale-105 transform"></div>
                  <div className="absolute inset-0 bg-gradient-to-r from-slate-950/80 to-transparent"></div>
                  <div className="absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-t from-slate-950 to-transparent"></div>
                  
                  {/* Etiqueta flotante */}
                  <div className="absolute bottom-8 left-8 bg-white/10 backdrop-blur-md border border-white/20 p-4 rounded-xl max-w-[200px]">
                    <div className="text-teal-400 font-mono text-sm mb-1">CÁMARA DE FRÍO</div>
                    <div className="text-2xl font-light text-white">2.0°C - 8.0°C</div>
                  </div>
               </div>
               
               {/* Decoración geométrica */}
               <div className="absolute -z-10 -bottom-8 -right-8 w-64 h-64 border border-teal-500/20 rounded-full"></div>
            </div>

            <div className="order-1 lg:order-2">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/30 text-blue-400 text-xs font-bold uppercase tracking-widest mb-6">
                Infraestructura Asegurada
              </div>
              <h3 className="text-4xl md:text-5xl font-black mb-6 leading-tight">Excelencia en cada eslabón de la <span className="text-teal-400">cadena logística.</span></h3>
              <p className="text-slate-400 text-lg mb-12 leading-relaxed">
                Como socios estratégicos de laboratorios internacionales de prestigio, no dejamos margen al error. Aseguramos la integridad absoluta de cada producto biológico y farmacéutico.
              </p>
              
              <div className="space-y-8">
                <div className="flex gap-5 group">
                  <div className="shrink-0 mt-1 w-12 h-12 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-center text-teal-400 group-hover:bg-teal-500 group-hover:text-white transition-colors duration-300">
                    <Snowflake size={24}/>
                  </div>
                  <div>
                    <h4 className="font-bold text-xl text-white mb-2">Cadena de Frío Garantizada</h4>
                    <p className="text-slate-400 leading-relaxed">Monitoreo ininterrumpido de temperatura durante el almacenamiento, transporte e importación, validado con dataloggers.</p>
                  </div>
                </div>
                
                <div className="flex gap-5 group">
                  <div className="shrink-0 mt-1 w-12 h-12 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-center text-blue-400 group-hover:bg-blue-500 group-hover:text-white transition-colors duration-300">
                    <Activity size={24}/>
                  </div>
                  <div>
                    <h4 className="font-bold text-xl text-white mb-2">Experiencia Aduanera Integral</h4>
                    <p className="text-slate-400 leading-relaxed">Gestión ágil y especializada de la internación y despacho aduanero, evitando demoras críticas para medicamentos de urgencia.</p>
                  </div>
                </div>
                
                <div className="flex gap-5 group">
                  <div className="shrink-0 mt-1 w-12 h-12 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-center text-teal-400 group-hover:bg-teal-500 group-hover:text-white transition-colors duration-300">
                    <ShieldCheck size={24}/>
                  </div>
                  <div>
                    <h4 className="font-bold text-xl text-white mb-2">Cumplimiento Normativo (AGEMED)</h4>
                    <p className="text-slate-400 leading-relaxed">Aval gubernamental estricto. Todos nuestros productos cuentan con registro sanitario vigente y trazabilidad documental completa.</p>
                  </div>
                </div>
              </div>
            </div>
            
          </div>
        </div>
      </section>

    </div>
  );
}