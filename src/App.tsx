/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useScroll, useTransform } from "motion/react";
import { 
  Navigation, 
  MapPin, 
  Compass, 
  Camera, 
  Calendar, 
  Users, 
  ChevronRight, 
  Menu, 
  X, 
  ArrowRight,
  Instagram,
  Facebook,
  Twitter,
  ShieldCheck,
  Zap,
  Leaf
} from "lucide-react";

// --- Types ---

interface Park {
  id: string;
  name: string;
  description: string;
  image: string;
  animals: string[];
}

interface Package {
  id: string;
  name: string;
  duration: string;
  price: string;
  park: string;
  includes: string[];
}

// --- Data ---

const PARKS: Park[] = [
  {
    id: "yala",
    name: "Yala National Park",
    description: "The crown jewel of Sri Lankan safaris, famous for its high density of leopards and diverse ecosystems.",
    image: "https://images.unsplash.com/photo-1743014118271-415197f9b0ef?q=80&w=1332&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    animals: ["Leopard", "Elephant", "Sloth Bear"]
  },
  {
    id: "udawalawe",
    name: "Udawalawe National Park",
    description: "Best known for its massive herds of wild elephants and the Elephant Transit Home.",
    image: "https://images.unsplash.com/photo-1726582573735-776cbbb94c38?q=80&w=1171&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    animals: ["Elephant", "Water Buffalo", "Peacock"]
  },
  {
    id: "wilpattu",
    name: "Wilpattu National Park",
    description: "The largest park in Sri Lanka, unique for its natural lakes known as 'villus' and serene wilderness.",
    image: "https://plus.unsplash.com/premium_photo-1730078557257-e05c86054e2e?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    animals: ["Leopard", "Spotted Deer", "Barking Deer"]
  },
  {
    id: "minneriya",
    name: "Minneriya National Park",
    description: "Famous for 'The Gathering' – the largest seasonal meeting of Asian elephants in the world.",
    image: "https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?auto=format&fit=crop&q=80&w=800",
    animals: ["Elephant", "Crocodile", "Monkey"]
  }
];

const PACKAGES: Package[] = [
  {
    id: "1",
    name: "The Explorer Half-Day",
    duration: "4 Hours",
    price: "$65",
    park: "Yala",
    includes: ["Jeep & Fuel", "Park Entry", "Bottle of Water", "Expert Tracker"]
  },
  {
    id: "2",
    name: "The Wildlife Enthusiast",
    duration: "Full Day",
    price: "$120",
    park: "Wilpattu",
    includes: ["Gourmet Lunch", "Premium Jeep", "Binoculars", "Senior Guide"]
  },
  {
    id: "3",
    name: "The Elephant Migration",
    duration: "5 Hours",
    price: "$85",
    park: "Minneriya",
    includes: ["Group Transfer", "Elephant Focus", "Photography Tips"]
  }
];

// --- Components ---

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? "bg-black/80 backdrop-blur-md py-4" : "bg-transparent py-8"}`}>
      <div className="container mx-auto px-6 flex justify-between items-center">
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="flex items-center gap-2 cursor-pointer"
        >
          <div className="w-8 h-8 bg-brand-accent rounded-full flex items-center justify-center text-brand-bg font-black text-xs">LW</div>
          <span className="text-brand-text font-display text-xl md:text-2xl font-black tracking-tighter uppercase">LankaWild</span>
        </motion.div>

        <motion.div 
          initial="hidden"
          animate="visible"
          variants={{
            hidden: { opacity: 0 },
            visible: { 
              opacity: 1,
              transition: { staggerChildren: 0.1, delayChildren: 0.3 }
            }
          }}
          className="hidden md:flex items-center gap-10"
        >
          {["Tours", "Destinations", "Wildlife", "About"].map((item) => (
            <motion.a 
              key={item} 
              variants={{
                hidden: { opacity: 0, y: -10 },
                visible: { opacity: 1, y: 0 }
              }}
              href={`#${item.toLowerCase()}`} 
              className="text-brand-text/80 hover:text-brand-accent transition-colors text-[10px] uppercase tracking-[0.2em] font-bold"
            >
              {item}
            </motion.a>
          ))}
          <motion.button 
            variants={{
              hidden: { opacity: 0, scale: 0.8 },
              visible: { opacity: 1, scale: 1 }
            }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-brand-accent text-brand-bg px-6 py-2 rounded-full text-[10px] font-black uppercase tracking-widest hover:bg-brand-text hover:text-brand-bg transition-all shadow-lg"
          >
            Book Now
          </motion.button>
        </motion.div>

        <button className="md:hidden text-white" onClick={() => setMobileMenuOpen(true)}>
          <Menu size={24} />
        </button>
      </div>

      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-neutral-950 z-[60] flex flex-col items-center justify-center gap-8 p-6"
          >
            <button className="absolute top-8 right-8 text-white" onClick={() => setMobileMenuOpen(false)}>
              <X size={32} />
            </button>
            {["Tours", "Destinations", "Wildlife", "About"].map((item) => (
              <a 
                key={item} 
                href={`#${item.toLowerCase()}`} 
                onClick={() => setMobileMenuOpen(false)}
                className="text-white text-4xl font-bold uppercase tracking-widest"
              >
                {item}
              </a>
            ))}
            <button className="bg-amber-600 text-white px-12 py-4 rounded-full text-xl font-bold uppercase tracking-widest mt-4">
              Book Safari
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

const HERO_IMAGES = [
  {
    url: "https://images.unsplash.com/photo-1716462033339-e9c7848d7254?q=80&w=1920&auto=format&fit=crop",
    label: "YALA PARK"
  },
  {
    url: "https://images.unsplash.com/photo-1590571281270-5840907baac7?q=80&w=1920&auto=format&fit=crop",
    label: "UDAWALAWE"
  },
  {
    url: "https://images.unsplash.com/photo-1627401099591-4772d63b86a4?q=80&w=1920&auto=format&fit=crop",
    label: "WILPATTU"
  },
  {
    url: "https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?q=80&w=1920&auto=format&fit=crop",
    label: "MINNERIYA"
  }
];

const Hero = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const containerRef = useRef(null);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % HERO_IMAGES.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  const backgroundY = useTransform(scrollYProgress, [0, 1], ["-10%", "10%"]);
  const textY = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const opacityGradient = useTransform(scrollYProgress, [0, 0.8], [1, 0.6]);

  return (
    <section ref={containerRef} className="relative h-screen w-full flex items-start md:items-center justify-center overflow-hidden bg-brand-bg font-sans">
      <motion.div 
        style={{ y: backgroundY }}
        className="absolute -inset-y-20 inset-x-0 z-0"
      >
        <AnimatePresence mode="wait">
          <motion.div
             key={currentImageIndex}
             initial={{ opacity: 0 }}
             animate={{ opacity: 1 }}
             exit={{ opacity: 0 }}
             transition={{ duration: 2 }}
             className="w-full h-full"
          >
            <motion.div
               initial={{ scale: 1.15 }}
               animate={{ scale: 1.05 }}
               transition={{ duration: 10, repeat: Infinity, repeatType: "reverse", ease: "linear" }}
               className="w-full h-full"
            >
              <img 
                src={HERO_IMAGES[currentImageIndex].url} 
                alt={HERO_IMAGES[currentImageIndex].label} 
                className="w-full h-full object-cover opacity-40 grayscale hover:grayscale-0 transition-all duration-1000"
              />
            </motion.div>
          </motion.div>
        </AnimatePresence>
        <motion.div 
          style={{ opacity: opacityGradient }}
          className="absolute inset-0 bg-gradient-to-b from-brand-bg/60 via-transparent to-brand-bg" 
        />
      </motion.div>

      <div className="container relative z-10 mx-auto px-6 pt-28 md:pt-8 flex flex-col items-center md:items-start text-center md:text-left">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="max-w-4xl w-full"
          >
          <motion.span 
            initial={{ opacity: 0, x: -10 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
            className="text-brand-accent font-serif italic text-lg md:text-xl mb-4 md:mb-6 ml-1 block"
          >
            Experience the Untamed
          </motion.span>
          <motion.h1 
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="text-brand-text text-[50px] sm:text-[80px] md:text-[120px] lg:text-[180px] font-serif font-black leading-[0.85] md:leading-[0.8] uppercase tracking-tighter mb-6 md:mb-8 select-none"
          >
            WILD<br />
            <span className="text-transparent text-stroke">LANKA</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 1 }}
            className="text-brand-text/60 max-w-xl mx-auto md:mx-0 text-base md:text-xl font-medium leading-relaxed mb-8 md:mb-10 border-l-0 md:border-l border-brand-accent/30 md:pl-6"
          >
            Journey into the heart of Sri Lanka's pristine national parks. 
            Witness leopards, elephants, and rare wildlife in their natural habitat.
          </motion.p>
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="flex flex-col sm:flex-row items-center justify-center md:justify-start gap-6 sm:gap-8"
          >
            <button className="bg-brand-accent text-brand-bg px-8 py-3 md:px-10 md:py-4 rounded-lg font-black uppercase tracking-widest hover:bg-brand-text transition-all w-auto shadow-2xl active:scale-95 text-xs md:text-sm">
              Start Your Expedition
            </button>
            <div className="flex items-center gap-4 group cursor-pointer group">
               <div className="w-12 h-12 rounded-full border border-brand-text/20 flex items-center justify-center group-hover:border-brand-accent group-hover:bg-brand-accent/10 transition-all">
                  <ArrowRight className="text-brand-text group-hover:text-brand-accent transition-colors" size={20} />
               </div>
               <span className="text-[10px] md:text-xs uppercase font-black tracking-widest text-brand-text/60 group-hover:text-brand-accent transition-colors">Our Fleet</span>
            </div>
          </motion.div>
        </motion.div>
      </div>

      <motion.div 
        initial={{ opacity: 0, x: 100, rotate: 15 }}
        whileInView={{ opacity: 1, x: 0, rotate: 3 }}
        transition={{ duration: 1, delay: 1 }}
        animate={{ y: [0, -10, 0] }}
        className="absolute bottom-12 right-12 hidden lg:block"
      >
        <div className="bg-brand-surface p-8 rounded-2xl border border-brand-border shadow-2xl rotate-3 max-w-[280px]">
           <p className="text-[10px] uppercase tracking-[0.3em] mb-2 text-brand-accent font-black">Next Departure</p>
           <p className="text-3xl font-serif mb-4 leading-none text-brand-text">Oct 24, 2026</p>
           <p className="text-[10px] text-brand-text/40 leading-relaxed font-bold uppercase tracking-widest">Yala South - Leopard Focus Expedition</p>
        </div>
      </motion.div>

      <div className="absolute top-32 right-0 w-full z-10 pointer-events-none hidden md:block">
        <div className="container mx-auto px-6 flex justify-end">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            variants={{
              hidden: { opacity: 0 },
              visible: { opacity: 1, transition: { staggerChildren: 0.1, delayChildren: 1.2 } }
            }}
            className="flex flex-col gap-6 text-brand-text/40 text-[10px] uppercase tracking-[0.3em] font-black items-end pointer-events-auto"
          >
            {HERO_IMAGES.map((img, idx) => (
              <React.Fragment key={img.label}>
                <motion.div 
                  variants={{
                    hidden: { opacity: 0, x: 20 },
                    visible: { opacity: 1, x: 0 }
                  }}
                  className={`flex items-center gap-4 group cursor-pointer transition-all duration-500 ${currentImageIndex === idx ? "text-brand-accent scale-110" : "hover:text-brand-text/80"}`}
                  onClick={() => setCurrentImageIndex(idx)}
                >
                  <span className={currentImageIndex === idx ? "text-brand-accent" : "text-brand-text/20"}>
                    0{idx + 1}
                  </span> 
                  <span className="whitespace-nowrap">{img.label}</span>
                </motion.div>
                {idx < HERO_IMAGES.length - 1 && <motion.div variants={{ hidden: { scaleX: 0 }, visible: { scaleX: 1 } }} className="w-8 h-[1px] bg-brand-text/10 origin-right" />}
              </React.Fragment>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

const ParksSection = () => {
  return (
    <section id="destinations" className="py-24 bg-brand-bg text-brand-text overflow-hidden">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-brand-accent text-xl font-serif italic mb-2">The Destinations</h2>
            <h2 className="text-4xl md:text-6xl font-serif font-black mb-4 tracking-tighter uppercase italic leading-none text-brand-text">LANDS OF THE <br/>MAJESTIC</h2>
            <p className="text-brand-text/40 max-w-xl text-lg font-medium">
              Each park offers a unique ecosystem. From dry zone forests to lush wetlands, 
              discover the diverse landscapes of the island.
            </p>
          </motion.div>
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: false }}
            transition={{ duration: 0.8 }}
            className="flex gap-4"
          >
             <div className="px-8 py-3 border border-brand-text/10 rounded-lg text-[10px] font-black uppercase tracking-widest text-brand-text/40 hover:text-brand-accent hover:border-brand-accent transition-all cursor-pointer">View Map</div>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {PARKS.map((park, index) => (
            <motion.div 
              key={park.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false }}
              transition={{ delay: index * 0.1 }}
              className="group cursor-pointer flex flex-col h-full"
            >
              <div className="relative aspect-[3/4] rounded-2xl overflow-hidden mb-6 border border-brand-border grayscale group-hover:grayscale-0 transition-all duration-500 shadow-xl flex-shrink-0">
                <img 
                  src={park.image} 
                  alt={park.name} 
                  className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-brand-bg via-transparent to-transparent opacity-80 group-hover:opacity-60 transition-opacity" />
                <div className="absolute bottom-8 left-8 right-8">
                  <div className="flex items-center gap-2 text-brand-accent text-[10px] font-black uppercase tracking-[0.2em] mb-2">
                    <MapPin size={10} /> Sanctuary
                  </div>
                  <h3 className="text-3xl font-serif font-black tracking-tight leading-none group-hover:text-brand-accent transition-colors">{park.name}</h3>
                </div>
              </div>
              <div className="flex flex-col flex-grow">
                <p className="text-brand-text/40 text-sm leading-relaxed mb-6 group-hover:text-brand-text transition-colors line-clamp-3 min-h-[4.5em]">
                  {park.description}
                </p>
                <div className="mt-auto flex flex-wrap gap-2">
                  {park.animals.map(animal => (
                    <span key={animal} className="text-[9px] uppercase tracking-[0.2em] font-black px-3 py-1 bg-brand-surface border border-brand-border rounded-lg text-brand-text/40 group-hover:text-brand-accent transition-colors whitespace-nowrap">
                      {animal}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const ExperienceFeature = ({ icon: Icon, title, desc }: { icon: any, title: string, desc: string }) => (
  <motion.div 
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: false }}
    className="p-6 md:p-10 bg-brand-surface border border-brand-border rounded-[2rem] hover:border-brand-accent transition-all hover:translate-y-[-8px] shadow-2xl"
  >
    <div className="w-16 h-16 bg-brand-bg rounded-2xl flex items-center justify-center text-brand-accent mb-6 md:mb-8 border border-brand-border">
      <Icon size={28} />
    </div>
    <h3 className="text-xl md:text-2xl font-serif font-black mb-4 tracking-tight leading-tight">{title}</h3>
    <p className="text-brand-text/40 leading-relaxed text-sm font-medium">{desc}</p>
  </motion.div>
);

const FeaturesSection = () => {
  return (
    <section id="wildlife" className="py-24 bg-brand-bg text-brand-text">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-16 items-start">
          <div className="lg:col-span-1 lg:sticky lg:top-32">
            <motion.h2 
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: false }}
              className="text-brand-accent text-xl font-serif italic mb-2"
            >
              Our Values
            </motion.h2>
            <motion.h2 
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: false }}
              transition={{ delay: 0.1 }}
              className="text-4xl md:text-6xl font-serif font-black mb-8 tracking-tighter leading-none uppercase italic"
            >
              WHY RUN WITH THE PACK?
            </motion.h2>
            <motion.p 
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: false }}
              transition={{ delay: 0.2 }}
              className="text-brand-text/40 text-lg mb-12 font-medium leading-relaxed"
            >
              We provide more than just a drive through the park. We offer a deep connection to the wildlife 
              of Sri Lanka with ethical practices and expert knowledge.
            </motion.p>
            <div className="flex items-center gap-6 p-6 bg-brand-surface rounded-[2rem] border border-brand-border">
              <div className="w-16 h-16 bg-brand-accent rounded-full flex items-center justify-center text-brand-bg font-black text-xl overflow-hidden shadow-xl">
                PG
              </div>
              <div>
                <p className="text-brand-text font-black text-sm uppercase tracking-widest">Pradeep G.</p>
                <p className="text-brand-accent text-[10px] font-black uppercase tracking-[0.2em] mt-1">Lead Tracker • 20yrs Exp</p>
              </div>
            </div>
          </div>
          
          <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-8">
            <ExperienceFeature 
              icon={ShieldCheck} 
              title="Ethical Tracking" 
              desc="We respect the space of the animals. Our guides are trained in non-intrusive wildlife observation techniques."
            />
            <ExperienceFeature 
              icon={Camera} 
              title="Photography Focus" 
              desc="Optimized routes and custom jeep modifications ensure you get the perfect angle for your award-winning shots."
            />
            <ExperienceFeature 
              icon={Zap} 
              title="Custom Fleet" 
              desc="Our 4x4 vehicles are maintained to the highest standards with open sides and raised seating for 360-degree views."
            />
            <ExperienceFeature 
              icon={Leaf} 
              title="Conservation First" 
              desc="Every booking contributes directly to local conservation projects and support for local communities."
            />
          </div>
        </div>
      </div>
    </section>
  );
};

const BookingForm = () => {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-brand-accent p-16 rounded-[3rem] text-center shadow-2xl"
      >
        <div className="w-24 h-24 bg-brand-bg/10 rounded-full flex items-center justify-center mx-auto mb-8">
          <ShieldCheck size={48} className="text-brand-bg" />
        </div>
        <h3 className="text-4xl font-serif font-black mb-4 text-brand-bg leading-none uppercase italic">EXPEDITION <br/>LOCKED!</h3>
        <p className="text-brand-bg/60 mb-10 font-bold uppercase tracking-widest text-xs">Our coordinator will contact you shortly.</p>
        <button 
          onClick={() => setSubmitted(false)}
          className="bg-brand-bg text-brand-text px-12 py-4 rounded-xl font-black uppercase tracking-widest hover:scale-105 transition-all shadow-xl"
        >
          Book Another
        </button>
      </motion.div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="bg-brand-surface border border-brand-border p-6 md:p-10 rounded-[2rem] md:rounded-[3rem] shadow-2xl relative overflow-hidden">
      <div className="absolute top-0 right-0 w-32 h-32 bg-brand-accent/5 rounded-full -translate-y-1/2 translate-x-1/2 blur-2xl" />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
        <div>
          <label className="text-[10px] uppercase font-black text-brand-text/30 tracking-[0.2em] mb-3 block">Full Name</label>
          <input type="text" placeholder="John Doe" className="w-full bg-brand-bg/30 border border-brand-border rounded-xl px-5 py-4 text-brand-text font-medium focus:outline-none focus:border-brand-accent transition-all" required />
        </div>
        <div>
          <label className="text-[10px] uppercase font-black text-brand-text/30 tracking-[0.2em] mb-3 block">Email Address</label>
          <input type="email" placeholder="john@example.com" className="w-full bg-brand-bg/30 border border-brand-border rounded-xl px-5 py-4 text-brand-text font-medium focus:outline-none focus:border-brand-accent transition-all" required />
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
        <div>
          <label className="text-[10px] uppercase font-black text-brand-text/30 tracking-[0.2em] mb-3 block">National Park</label>
          <select className="w-full bg-brand-bg/30 border border-brand-border rounded-xl px-5 py-4 text-brand-text font-medium focus:outline-none focus:border-brand-accent transition-all appearance-none cursor-pointer">
            {PARKS.map(p => <option key={p.id} value={p.id} className="bg-brand-bg">{p.name}</option>)}
          </select>
        </div>
        <div>
          <label className="text-[10px] uppercase font-black text-brand-text/30 tracking-[0.2em] mb-3 block">Booking Date</label>
          <input type="date" className="w-full bg-brand-bg/30 border border-brand-border rounded-xl px-5 py-4 text-brand-text font-medium focus:outline-none focus:border-brand-accent transition-all cursor-pointer" required />
        </div>
      </div>
      <div className="mb-10">
        <label className="text-[10px] uppercase font-black text-brand-text/30 tracking-[0.2em] mb-3 block">Special Interests</label>
        <textarea placeholder="Bird watching, Photography, Leopard focus..." className="w-full bg-brand-bg/30 border border-brand-border rounded-xl px-5 py-4 text-brand-text font-medium h-32 focus:outline-none focus:border-brand-accent transition-all resize-none" />
      </div>
      <button type="submit" className="w-full bg-brand-accent text-brand-bg font-black py-5 rounded-xl uppercase tracking-[0.3em] hover:bg-brand-text transition-all flex items-center justify-center gap-3 shadow-2xl group text-xs">
        Request Secure Reservation <ChevronRight size={18} className="group-hover:translate-x-1 transition-transform" />
      </button>
    </form>
  );
};

const BookingSection = () => {
  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });

  const backgroundX = useTransform(scrollYProgress, [0, 1], ["50%", "30%"]);

  return (
    <section ref={sectionRef} id="tours" className="py-24 bg-brand-bg text-brand-text relative overflow-hidden">
      <motion.div 
        style={{ x: backgroundX }}
        className="absolute top-0 right-0 w-[50%] h-full bg-brand-accent/[0.02] pointer-events-none skew-x-[-15deg]" 
      />
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-start">
          <div className="lg:col-span-1 lg:sticky lg:top-32">
            <span className="text-brand-accent text-xl font-serif italic mb-2 block">Adventure planning</span>
            <h2 className="text-5xl md:text-7xl font-serif font-black mb-12 tracking-tighter leading-[0.9] uppercase italic">RESERVE YOUR <br />WILD SPOT</h2>
            <div className="space-y-8">
              {PACKAGES.map((pkg, idx) => (
                <motion.div 
                  key={pkg.id} 
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: false }}
                  transition={{ delay: idx * 0.1 }}
                  className="group p-8 bg-brand-surface border border-brand-border rounded-[2rem] hover:border-brand-accent/50 transition-all cursor-pointer relative shadow-xl"
                >
                  <div className="flex justify-between items-start mb-6">
                    <div>
                        <h3 className="text-2xl font-serif font-black tracking-tight leading-none group-hover:text-brand-accent transition-colors">{pkg.name}</h3>
                        <div className="flex items-center gap-6 mt-4 text-[10px] uppercase font-black tracking-[0.2em] text-brand-text/30 leading-none">
                            <span className="flex items-center gap-2"><Calendar size={12} /> {pkg.duration}</span>
                            <span className="flex items-center gap-2"><MapPin size={12} /> {pkg.park}</span>
                        </div>
                    </div>
                    <span className="text-brand-accent font-black text-2xl font-serif italic">{pkg.price}</span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {pkg.includes.slice(0, 3).map(item => (
                      <span key={item} className="text-[10px] font-black tracking-widest px-3 py-1 rounded-lg bg-brand-bg/50 text-brand-text/40 border border-brand-border group-hover:border-brand-accent/20">
                          {item}
                      </span>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
          
          <div>
            <BookingForm />
          </div>
        </div>
      </div>
    </section>
  );
};

const Footer = () => {
  return (
    <footer id="about" className="bg-brand-bg text-brand-text pt-24 pb-12 border-t border-brand-border">
      <div className="container mx-auto px-6">
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false }}
          variants={{
            hidden: { opacity: 0 },
            visible: { 
              opacity: 1,
              transition: { staggerChildren: 0.1 }
            }
          }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 mb-20"
        >
          <motion.div 
            variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
            className="lg:col-span-1"
          >
            <div className="flex items-center gap-3 mb-10">
              <div className="w-10 h-10 bg-brand-accent rounded-full flex items-center justify-center font-black text-xs text-brand-bg">LW</div>
              <span className="text-2xl font-serif font-black tracking-tighter uppercase inline-block border-b-2 border-brand-accent">LankaWild</span>
            </div>
            <p className="text-brand-text/40 text-sm leading-relaxed mb-8 font-medium">
              Providing ultra-luxury and ethical safari experiences in the most remote corners of Sri Lanka's wilderness.
            </p>
            <div className="flex gap-4">
               {[
                 { id: 'ig', icon: Instagram, link: 'https://instagram.com' }, 
                 { id: 'fb', icon: Facebook, link: 'https://facebook.com' }, 
                 { id: 'tw', icon: Twitter, link: 'https://twitter.com' }
               ].map(soc => (
                   <a 
                     key={soc.id} 
                     href={soc.link} 
                     target="_blank" 
                     rel="noreferrer"
                     className="w-10 h-10 rounded-full border border-brand-border flex items-center justify-center hover:border-brand-accent transition-colors cursor-pointer text-brand-text/70 hover:text-brand-accent shadow-lg"
                   >
                       <soc.icon size={18} />
                   </a>
               ))}
            </div>
          </motion.div>
          
          <motion.div variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}>
            <h4 className="font-black text-[10px] uppercase tracking-[0.3em] mb-10 text-brand-accent">Destinations</h4>
            <ul className="space-y-6 text-brand-text/30 text-xs font-black uppercase tracking-[0.1em]">
              <li><a href="#" className="hover:text-brand-accent transition-colors">Yala National Park</a></li>
              <li><a href="#" className="hover:text-brand-accent transition-colors">Udawalawe Oasis</a></li>
              <li><a href="#" className="hover:text-brand-accent transition-colors">Wilpattu Deep Forest</a></li>
              <li><a href="#" className="hover:text-brand-accent transition-colors">Minneriya Gathering</a></li>
            </ul>
          </motion.div>
          
          <motion.div variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}>
            <h4 className="font-black text-[10px] uppercase tracking-[0.3em] mb-10 text-brand-accent">Travel Guide</h4>
            <ul className="space-y-6 text-brand-text/30 text-xs font-black uppercase tracking-[0.1em]">
              <li><a href="#" className="hover:text-brand-accent transition-colors">Safari Guide 2026</a></li>
              <li><a href="#" className="hover:text-brand-accent transition-colors">Best Time to Visit</a></li>
              <li><a href="#" className="hover:text-brand-accent transition-colors">Photography Ethics</a></li>
              <li><a href="#" className="hover:text-brand-accent transition-colors">Conservation Efforts</a></li>
            </ul>
          </motion.div>
          
          <motion.div variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}>
            <h4 className="font-black text-[10px] uppercase tracking-[0.3em] mb-10 text-brand-accent">Newsletter</h4>
            <p className="text-xs text-brand-text/40 font-medium mb-6">Join our wild list for updates and exclusive offers.</p>
            <div className="flex bg-brand-surface border border-brand-border rounded-xl overflow-hidden p-1.5 focus-within:border-brand-accent transition-colors shadow-2xl">
              <input type="email" placeholder="YOUR@EMAIL.COM" className="bg-transparent px-4 py-2 text-[10px] font-black flex-grow outline-none border-none placeholder:text-brand-text/20 uppercase tracking-widest" />
              <button className="bg-brand-accent text-brand-bg px-6 py-3 rounded-lg text-[10px] font-black uppercase tracking-widest hover:scale-105 transition-all">JOIN</button>
            </div>
          </motion.div>
        </motion.div>
        
        <div className="pt-12 border-t border-brand-border flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="flex items-center gap-4">
                <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse shadow-[0_0_10px_rgba(34,197,94,0.5)]"></span>
                <span className="text-[10px] font-black uppercase tracking-[0.2em] text-brand-text/40">Guides currently in-field: 14</span>
            </div>
            <p className="text-[9px] font-bold text-brand-text/20 uppercase tracking-[0.4em]">© 2026 LankaWild Safaris • Designed for the wild</p>
        </div>
      </div>
    </footer>
  );
};

const Gallery = () => {
  const images = [
    "https://images.unsplash.com/photo-1636966338980-e7ebc64d3c99?q=80&w=1332&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "https://images.unsplash.com/photo-1695173987873-6f157a2d6ad1?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "https://images.unsplash.com/photo-1705936981588-a4192f66fcfb?q=80&w=1171&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "https://images.unsplash.com/photo-1621847473222-d85c022cbf07?q=80&w=1325&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?auto=format&fit=crop&q=80&w=800", // Landscape
    "https://images.unsplash.com/photo-1726582573735-776cbbb94c38?q=80&w=1171&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", // Wildlife 5
  ];

  return (
    <section className="py-24 bg-brand-bg relative">
      <div className="absolute top-0 left-0 w-full h-px bg-brand-border" />
      <div className="container mx-auto px-6">
        <h2 className="text-brand-accent text-xl font-serif italic mb-2">Moments in the Wild</h2>
        <h2 className="text-4xl md:text-6xl font-serif font-black mb-16 tracking-tighter uppercase italic leading-none text-brand-text">THE GALLERY</h2>
        <div className="columns-1 md:columns-2 lg:columns-3 gap-8 space-y-8">
          {images.map((src, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: false }}
              transition={{ delay: i * 0.1 }}
              className="relative rounded-[2rem] overflow-hidden group shadow-2xl border border-brand-border grayscale hover:grayscale-0 transition-all duration-700"
            >
              <img 
                src={src} 
                alt={`Wildlife ${i}`} 
                className="w-full object-cover transition-transform duration-1000 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-brand-bg/40 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center">
                <Camera className="text-brand-accent mb-4" size={40} />
                <span className="text-[10px] font-black uppercase tracking-[0.3em] text-brand-text">View Shot</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

// --- Main App ---

export default function App() {
  const { scrollYProgress } = useScroll();
  const watermarkY = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);
  const watermarkRotate = useTransform(scrollYProgress, [0, 1], [-15, -25]);

  return (
    <div className="min-h-screen bg-brand-bg text-brand-text font-sans scroll-smooth selection:bg-brand-accent selection:text-brand-bg">
      <div className="fixed top-0 left-0 w-full h-full pointer-events-none z-0 opacity-[0.02] select-none overflow-hidden">
          <motion.div 
            style={{ y: watermarkY, rotate: watermarkRotate }}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 2 }}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[150px] sm:text-[300px] md:text-[480px] font-black font-serif italic whitespace-nowrap text-brand-text"
          >
              EXPEDITION
          </motion.div>
      </div>
      <Navbar />
      <Hero />
      <ParksSection />
      <Gallery />
      <FeaturesSection />
      <BookingSection />
      <Footer />
    </div>
  );
}
