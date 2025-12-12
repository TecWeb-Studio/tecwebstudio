"use client";

import { useState, useCallback, useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import useEmblaCarousel from "embla-carousel-react";
import { supabase } from "@/lib/supabase";
import { Button } from "@/app/components/ui/Button";
import { Card, CardTitle, CardDescription } from "@/app/components/ui/Card";
import { Badge } from "@/app/components/ui/Badge";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogBody,
} from "@/app/components/ui/Dialog";
import { Mail, Phone, Linkedin, Github, Star, Globe } from "lucide-react";

export default function Home() {
  const { t, i18n } = useTranslation();

  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [contactForm, setContactForm] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [formStatus, setFormStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");
  const [languageOpen, setLanguageOpen] = useState(false);

  // Embla Carousels
  const [servicesEmblaRef, servicesEmblaApi] = useEmblaCarousel({
    align: "start",
    skipSnaps: false,
    dragFree: true,
  });

  const [portfolioEmblaRef, portfolioEmblaApi] = useEmblaCarousel({
    align: "start",
    skipSnaps: false,
    dragFree: true,
  });

  // Section refs for smooth scrolling
  const servicesSectionRef = useRef<HTMLElement>(null);
  const portfolioSectionRef = useRef<HTMLElement>(null);
  const teamSectionRef = useRef<HTMLElement>(null);
  const contactSectionRef = useRef<HTMLElement>(null);

  // Smooth scroll handler for navigation
  const scrollToSection = (ref: React.RefObject<HTMLElement | null>) => {
    ref.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const languages = [
    { name: "English", flag: "🇬🇧", code: "en" as const },
    { name: "Italian", flag: "🇮🇹", code: "it" as const },
    { name: "German", flag: "🇩🇪", code: "de" as const },
    { name: "French", flag: "🇫🇷", code: "fr" as const },
  ];

  const handleLanguageChange = (code: "en" | "it" | "de" | "fr") => {
    i18n.changeLanguage(code);
    setLanguageOpen(false);
  };

  const projects = [
    {
      id: 1,
      titleKey: "portfolio.projects.tecwebPortfolio.title",
      categories: ["management"],
      descriptionKey: "portfolio.projects.tecwebPortfolio.description",
      clientKey: "",
      image: "📊",
      tags: ["React", "Framer Motion", "shadcn/ui"],
      results: ["Real-time data sync", "Enhanced user engagement"],
      featured: true,
    },
    {
      id: 2,
      titleKey: "portfolio.projects.newBodyLine.title",
      categories: ["management", "body"],
      descriptionKey: "portfolio.projects.newBodyLine.description",
      clientKey: "portfolio.projects.newBodyLine.client",
      image: "🏋️",
      tags: ["CMS", "MongoDB", "Real-time"],
      results: ["Increased membership sign-ups", "Streamlined class bookings"],
      featured: false,
    },
    {
      id: 3,
      titleKey: "portfolio.projects.nextHouse.title",
      categories: ["saas"],
      descriptionKey: "portfolio.projects.nextHouse.description",
      clientKey: "",
      image: "🏠",
      tags: ["JS", "AI Powered"],
      results: ["Increased home efficiency", "Remote control access"],
      featured: true,
    },
    {
      id: 4,
      titleKey: "portfolio.projects.utopia1.title",
      categories: ["corporate", "ecommerce"],
      descriptionKey: "portfolio.projects.utopia1.description",
      clientKey: "portfolio.projects.utopia1.client",
      image: "🏕️",
      tags: ["E-Commerce", "CMS", "SEO"],
      results: ["40% increase in leads", "Top 1 Google ranking"],
      featured: false,
    },
    {
      id: 5,
      titleKey: "portfolio.projects.sleepingCycles.title",
      categories: ["body"],
      descriptionKey: "portfolio.projects.sleepingCycles.description",
      clientKey: "",
      image: "⏰",
      tags: ["JS", "AI Powered", "Mobile"],
      results: [""],
      featured: false,
    },
  ];

  // const testimonials = [
  //   {
  //     id: 1,
  //     name: "Marco Rossi",
  //     role: "CEO, Fashion Boutique Milano",
  //     content:
  //       "TecWeb transformed our online presence. The website increased our sales by 350% in just 6 months!",
  //     rating: 5,
  //     image: "👨‍💼",
  //   },
  //   {
  //     id: 2,
  //     name: "Giulia Bianchi",
  //     role: "Founder, TechCorp Solutions",
  //     content:
  //       "Two talented students with professional expertise. They delivered beyond expectations.",
  //     rating: 5,
  //     image: "👩‍💼",
  //   },
  //   {
  //     id: 3,
  //     name: "Andrea Ventura",
  //     role: "Director, Consulting Firm Italia",
  //     content:
  //       "The team understood our vision perfectly and executed it flawlessly. Highly recommended!",
  //     rating: 5,
  //     image: "👨‍💼",
  //   },
  // ];

  const teamMembers = [
    {
      id: 1,
      nameKey: "team.members.stefano.name",
      subtitleKey: "team.members.stefano.subtitle",
      roleKey: "team.members.stefano.role",
      schoolKey: "team.members.stefano.school",
      skills: ["React", "Next.js", "TypeScript", "Tailwind CSS", "Node.js"],
      image: (
        <img
          src="https://github.com/khr0me.png"
          alt="khr0me avatar"
          className="w-18 h-18 rounded-full"
        />
      ),
      achievementKeys: [
        "team.members.stefano.achievement1",
        "team.members.stefano.achievement2",
        "team.members.stefano.achievement3",
        "team.members.stefano.achievement4",
      ],
    },
    {
      id: 2,
      nameKey: "team.members.toselli.name",
      subtitleKey: "team.members.toselli.subtitle",
      roleKey: "team.members.toselli.role",
      schoolKey: "team.members.toselli.school",
      skills: ["Vue.js", "React", "shadcn/ui", "Framer Motion"],
      image: (
        <img
          src="https://github.com/marcoice.png"
          alt="marcoice avatar"
          className="w-18 h-18 rounded-full"
        />
      ),
      achievementKeys: [
        "team.members.toselli.achievement1",
        "team.members.toselli.achievement2",
        "team.members.toselli.achievement3",
        "team.members.toselli.achievement4",
      ],
    },
  ];

  const categoryLabels: Record<string, string> = {
    all: t("portfolio.categories.all"),
    ecommerce: t("portfolio.categories.ecommerce"),
    saas: t("portfolio.categories.saas"),
    corporate: t("portfolio.categories.corporate"),
    management: t("portfolio.categories.management"),
    body: t("portfolio.categories.body"),
  };

  const stats = [
    { value: "5+", labelKey: "stats.yearsExperience", icon: "⚡" },
    { value: "Fast", labelKey: "stats.fastDevelopment", icon: "🚀" },
    { value: "50k+", labelKey: "stats.codeLines", icon: "💻" },
  ];

  // Servizi Completi
  const services = [
    {
      id: 1,
      title: t("services.webDesign.title"),
      description: t("services.webDesign.description"),
      icon: "✨",
      features: [
        t("services.feature.customUI"),
        t("services.feature.responsive"),
        t("services.feature.brandStrategy"),
      ],
    },
    {
      id: 2,
      title: t("services.development.title"),
      description: t("services.development.description"),
      icon: "⚡",
      features: [
        t("services.feature.fullStack"),
        t("services.feature.performance"),
        t("services.feature.security"),
      ],
    },
    // {
    //   id: 3,
    //   title: t("services.ecommerce.title"),
    //   description: t("services.ecommerce.description"),
    //   icon: "🛒",
    //   features: [
    //     t("services.feature.paymentIntegration"),
    //     t("services.feature.inventory"),
    //     t("services.feature.analytics"),
    //   ],
    // },
    {
      id: 4,
      title: t("services.seo.title"),
      description: t("services.seo.description"),
      icon: "🚀",
      features: [
        t("services.feature.seoStrategy"),
        t("services.feature.performance"),
        t("services.feature.analytics"),
      ],
    },
    {
      id: 5,
      title: t("services.mobile.title"),
      description: t("services.mobile.description"),
      icon: "📱",
      features: [
        t("services.feature.responsive"),
        t("services.feature.fastLoading"),
        t("services.feature.touchFriendly"),
      ],
    },
    {
      id: 6,
      title: t("services.support.title"),
      description: t("services.support.description"),
      icon: "🤝",
      features: [
        t("services.feature.availability"),
        t("services.feature.updates"),
        t("services.feature.security"),
      ],
    },
  ];

  const filteredProjects =
    selectedCategory === "all"
      ? projects
      : projects.filter((p) => p.categories.includes(selectedCategory));

  const handleContactSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormStatus("loading");

    try {
      // Validate form data
      if (!contactForm.name || !contactForm.email || !contactForm.message) {
        setFormStatus("error");
        setTimeout(() => setFormStatus("idle"), 3000);
        return;
      }

      // Check if Supabase is configured
      const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
      const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
      
      if (!supabaseUrl || !supabaseKey) {
        console.error("Supabase is not configured. Please set NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY in your .env.local file");
        setFormStatus("error");
        setTimeout(() => setFormStatus("idle"), 3000);
        return;
      }

      // Insert form data into Supabase
      const { error } = await supabase
        .from("contact_submissions")
        .insert([
          {
            name: contactForm.name,
            email: contactForm.email,
            message: contactForm.message,
            created_at: new Date().toISOString(),
          },
        ]);

      if (error) {
        console.error("Supabase insert error:", error);
        setFormStatus("error");
        setTimeout(() => setFormStatus("idle"), 3000);
        return;
      }

      // Success
      setFormStatus("success");
      setContactForm({ name: "", email: "", message: "" });
      setTimeout(() => setFormStatus("idle"), 3000);
    } catch (err) {
      console.error("Form submission error:", err);
      setFormStatus("error");
      setTimeout(() => setFormStatus("idle"), 3000);
    }
  };

  return (
    <div className="w-full">
      {/* Hero Section */}
      <section className="relative min-h-screen w-full overflow-hidden pt-20">
        <div className="absolute inset-0 overflow-hidden">
          <motion.div
            className="absolute top-0 left-1/4 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl"
            animate={{ opacity: [0.3, 0.8, 0.3] }}
            transition={{ duration: 4, repeat: Infinity }}
          ></motion.div>
          <motion.div
            className="absolute bottom-0 right-1/4 w-96 h-96 bg-green-500/10 rounded-full blur-3xl"
            animate={{ opacity: [0.3, 0.8, 0.3] }}
            transition={{ duration: 4, repeat: Infinity, delay: 1 }}
          ></motion.div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 h-full flex items-center justify-center">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              className="space-y-8"
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <div className="space-y-4">
                <Badge>{t("hero.badge")}</Badge>
                <motion.h1
                  className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.1 }}
                  viewport={{ once: true }}
                >
                  {t("hero.title.part1")}{" "}
                  <span className="bg-gradient-to-r from-emerald-400 via-green-400 to-emerald-400 bg-clip-text text-transparent">
                    {t("hero.title.part2")}
                  </span>
                </motion.h1>
              </div>

              <motion.p
                className="text-base sm:text-lg text-slate-300 leading-relaxed max-w-lg"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                viewport={{ once: true }}
              >
                {t("hero.description")}
              </motion.p>

              <motion.div
                className="flex flex-col gap-3 pt-4"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                viewport={{ once: true }}
              >
                <Button
                  size="lg"
                  className="w-full sm:w-auto cursor-pointer"
                  onClick={() => scrollToSection(contactSectionRef)}
                >
                  {t("hero.cta.start")}
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  className="w-full sm:w-auto cursor-pointer"
                  onClick={() => scrollToSection(portfolioSectionRef)}
                >
                  {t("hero.cta.viewWork")}
                </Button>
              </motion.div>

              <motion.div
                className="flex flex-col sm:flex-row sm:items-center gap-4 pt-4"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                viewport={{ once: true }}
              >
                <div className="flex -space-x-3">
                  {["👨‍💼", "👩‍💼", "👨‍💻", "👩‍💻"].map((emoji, i) => (
                    <motion.div
                      key={i}
                      className="w-10 h-10 rounded-full bg-gradient-to-br from-emerald-400 to-green-500 border-2 border-slate-900 flex items-center justify-center text-lg"
                      whileHover={{ scale: 1.1, y: -5 }}
                      transition={{ type: "spring", stiffness: 300 }}
                    >
                      {emoji}
                    </motion.div>
                  ))}
                </div>
                <p className="text-slate-400">{t("hero.trusted")}</p>
              </motion.div>
            </motion.div>

            <motion.div
              className="relative hidden lg:block"
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/20 to-green-500/20 rounded-2xl blur-2xl"></div>
              <div className="relative bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-xl border border-emerald-500/30 rounded-2xl p-8 space-y-6">
                <motion.div
                  className="text-5xl text-center mb-6"
                  animate={{ y: [0, -10, 0] }}
                  transition={{ duration: 3, repeat: Infinity }}
                >
                  🚀
                </motion.div>
                <div className="space-y-3">
                  <div className="h-3 w-20 bg-emerald-400/40 rounded animate-pulse"></div>
                  <div className="h-2 w-full bg-emerald-400/20 rounded"></div>
                  <div className="h-2 w-3/4 bg-emerald-400/20 rounded"></div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  {[1, 2, 3, 4].map((i) => (
                    <motion.div
                      key={i}
                      className="h-20 bg-emerald-500/10 border border-emerald-500/20 rounded-lg hover:border-emerald-400/50 transition-colors"
                      whileHover={{ scale: 1.05 }}
                      transition={{ type: "keyframes", stiffness: 300 }}
                    ></motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Portfolio Section, Featured Projects */}
      <section
        id="portfolio-section"
        ref={portfolioSectionRef}
        className="relative z-10 py-24 border-t border-emerald-500/10"
      >
        <div className="max-w-7xl mx-auto px-6">
          <motion.div   
            className="text-center mb-8 sm:mb-12 lg:mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <Badge className="inline-block mb-4">{t("portfolio.badge")}</Badge>
            <h2 className="text-4xl lg:text-5xl font-bold text-white">
              {t("portfolio.title")}
            </h2>
            <p className="text-slate-400 mt-6 max-w-2xl mx-auto text-lg">
              {t("portfolio.description")}
            </p>
          </motion.div>

          <div className="flex flex-wrap gap-2 mb-12 justify-center">
            {[
              "all",
              "ecommerce",
              "saas",
              "corporate",
              "management",
              "body",
            ].map((cat) => (
              <Button
                key={cat}
                variant={selectedCategory === cat ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedCategory(cat)}
                className="text-xs sm:text-sm cursor-pointer"
              >
                {categoryLabels[cat as keyof typeof categoryLabels]}
              </Button>
            ))}
          </div>

          <div className="relative">
            <div className="overflow-hidden rounded-lg" ref={portfolioEmblaRef}>
              <div className="flex gap-4 sm:gap-6">
                {filteredProjects.map((project, index) => (
                  <motion.div
                    key={project.id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.05 }}
                    viewport={{ once: true }}
                    className="flex-shrink-0 w-80 cursor-pointer"
                  >
                    <Card
                      variant={project.featured ? "elevated" : "default"}
                      className="group overflow-hidden relative h-full flex flex-col p-4 sm:p-6"
                    >
                      {project.featured && (
                        <div className="absolute -top-2 -right-2 bg-gradient-to-br from-emerald-400 to-green-500 rounded-full w-32 h-32 blur-2xl opacity-20"></div>
                      )}

                      <div className="relative z-10 flex flex-col flex-grow">
                        <div className="flex items-start justify-between mb-2 sm:mb-2">
                          <motion.div
                            className="text-3xl sm:text-4xl flex-shrink-0"
                            whileHover={{ scale: 1.1, rotate: 5 }}
                            transition={{ type: "spring", stiffness: 300 }}
                          >
                            {project.image}
                          </motion.div>
                          {project.featured && (
                            <Badge variant="success" className="text-xs">
                              ⭐
                            </Badge>
                          )}
                        </div>

                        <CardTitle className="group-hover:text-emerald-400 transition-colors text-sm sm:text-base lg:text-base overflow-hidden text-ellipsis leading-tight line-clamp-2">
                          {t(project.titleKey)}
                        </CardTitle>

                        <p className="text-slate-300 mt-2 sm:mt-2 mb-2 sm:mb-2 flex-grow text-xs sm:text-sm line-clamp-2">
                          {t(project.descriptionKey)}
                        </p>

                        <div className="flex flex-wrap gap-1 mt-2 sm:mt-2">
                          {project.tags.map((tag, i) => (
                            <Badge
                              key={i}
                              variant="default"
                              className="text-xs"
                            >
                              {tag}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Arrow Buttons */}
            <div className="flex gap-2 mt-4 mb-0">
              <button
                onClick={() => portfolioEmblaApi?.scrollPrev()}
                className="p-3 rounded-lg bg-emerald-500/20 hover:bg-emerald-500/40 text-emerald-400 transition-colors hover:scale-110 duration-200 cursor-pointer"
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 19l-7-7 7-7"
                  />
                </svg>
              </button>
              <button
                onClick={() => portfolioEmblaApi?.scrollNext()}
                className="p-3 rounded-lg bg-emerald-500/20 hover:bg-emerald-500/40 text-emerald-400 transition-colors hover:scale-110 duration-200 cursor-pointer"
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      {/* <section className="relative z-10 py-20 border-t border-emerald-500/10">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col lg:flex-row items-center justify-center gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                className="w-full lg:w-80"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <div className="bg-slate-800/40 border border-emerald-500/10 rounded-xl p-6 flex flex-col items-center gap-2 h-full">
                  <div className="text-3xl">{stat.icon}</div>
                  <div className="text-6xl lg:text-7xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-emerald-400 to-green-400">
                    {stat.value}
                  </div>
                  <div className="mt-2 text-slate-300 text-sm uppercase tracking-wide text-center">
                    {t(stat.labelKey)}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section> */}

      {/* Services Section */}
      <section
        id="services-section"
        ref={servicesSectionRef}
        className="relative z-10 py-24 border-t border-emerald-500/10"
      >
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            className="text-center mb-8 sm:mb-12 lg:mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <Badge className="inline-block mb-4">{t("services.badge")}</Badge>
            <h2 className="text-4xl lg:text-5xl font-bold text-white">
              {t("services.title")}
            </h2>
            <p className="text-slate-400 mt-6 max-w-2xl mx-auto text-lg">
              {t("services.description")}
            </p>
          </motion.div>

          <div className="relative">
            <div className="overflow-hidden rounded-lg" ref={servicesEmblaRef}>
              <div className="flex gap-6 sm:gap-8">
                {services.map((service, index) => (
                  <motion.div
                    key={service.id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className="flex-shrink-0 w-80"
                  >
                    <Card
                      variant="elevated"
                      className="group hover:shadow-emerald-500/20 h-full flex flex-col"
                    >
                      <div className="text-5xl mb-3 sm:mb-4">
                        {service.icon}
                      </div>
                      <CardTitle className="group-hover:text-emerald-400 transition-colors text-sm sm:text-base lg:text-lg overflow-hidden text-ellipsis leading-tight">
                        {service.title}
                      </CardTitle>
                      <CardDescription className="mt-2 sm:mt-3 flex-grow text-xs sm:text-sm">
                        {service.description}
                      </CardDescription>
                      <div className="mt-3 sm:mt-4 flex flex-wrap gap-2">
                        {service.features.map((feature, i) => (
                          <Badge key={i} variant="info" className="text-xs">
                            {feature}
                          </Badge>
                        ))}
                      </div>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Arrow Buttons */}
            <div className="flex gap-2 mt-4 mb-0">
              <button
                onClick={() => servicesEmblaApi?.scrollPrev()}
                className="p-3 rounded-lg bg-emerald-500/20 hover:bg-emerald-500/40 text-emerald-400 transition-colors hover:scale-110 duration-200 cursor-pointer"
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 19l-7-7 7-7"
                  />
                </svg>
              </button>
              <button
                onClick={() => servicesEmblaApi?.scrollNext()}
                className="p-3 rounded-lg bg-emerald-500/20 hover:bg-emerald-500/40 text-emerald-400 transition-colors hover:scale-110 duration-200 cursor-pointer"
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section
        id="team-section"
        ref={teamSectionRef}
        className="relative z-10 py-24 border-t border-emerald-500/10"
      >
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            className="text-center mb-8 sm:mb-12 lg:mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <Badge className="inline-block mb-4">{t("team.badge")}</Badge>
            <h2 className="text-4xl lg:text-5xl font-bold text-white">
              {t("team.title")}
            </h2>
            <p className="text-slate-400 mt-6 max-w-2xl mx-auto text-lg">
              {t("team.description")}
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
            {teamMembers.map((member, index) => (
              <motion.div
                key={member.id}
                initial={{ opacity: 0, x: index === 0 ? -30 : 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
              >
                <Card variant="glass">
                  <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                    <motion.div
                      className="text-5xl sm:text-6xl flex-shrink-0"
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      transition={{ type: "spring", stiffness: 300 }}
                    >
                      {member.image}
                    </motion.div>
                    <div className="flex-1 min-w-0">
                      <CardTitle className="text-base sm:text-xl lg:text-2xl break-words leading-snug">
                        {t(member.nameKey)}
                      </CardTitle>
                      {member.subtitleKey && (
                        <p className="text-slate-400 text-xs sm:text-sm">
                          {t(member.subtitleKey)}
                        </p>
                      )}
                      <p className="text-emerald-400 font-semibold text-xs sm:text-sm truncate">
                        {t(member.roleKey)}
                      </p>
                      <p className="text-slate-400 text-xs sm:text-sm mt-1 truncate">
                        {t(member.schoolKey)}
                      </p>

                      <div className="mt-2 sm:mt-3">
                        <p className="text-slate-300 text-xs sm:text-sm font-semibold mb-1 sm:mb-2">
                          {t("team.skills")}:
                        </p>
                        <div className="flex flex-wrap gap-1">
                          {member.skills.map((skill, i) => (
                            <Badge
                              key={i}
                              variant="info"
                              className="text-xs whitespace-nowrap"
                            >
                              {skill}
                            </Badge>
                          ))}
                        </div>
                      </div>

                      <div className="mt-2 sm:mt-3">
                        <p className="text-slate-300 text-xs sm:text-sm font-semibold mb-1 sm:mb-2">
                          {t("team.achievements")}:
                        </p>
                        <ul className="space-y-0.5">
                          {member.achievementKeys.map((achievementKey, i) => (
                            <li
                              key={i}
                              className="text-xs text-slate-400 truncate"
                            >
                              ✓ {t(achievementKey)}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      {/*<section className="relative z-10 py-24 border-t border-emerald-500/10">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <Badge className="inline-block mb-4">
              {t("testimonials.badge")}
            </Badge>
            <h2 className="text-4xl lg:text-5xl font-bold text-white">
              {t("testimonials.title")}
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial) => (
              <Card key={testimonial.id} variant="elevated">
                <div className="flex items-center gap-3 mb-4">
                  <div className="text-4xl">{testimonial.image}</div>
                  <div>
                    <h4 className="text-white font-bold">{testimonial.name}</h4>
                    <p className="text-slate-400 text-sm">{testimonial.role}</p>
                  </div>
                </div>

                <div className="flex gap-1 mb-3">
                  {Array.from({ length: testimonial.rating }).map((_, i) => (
                    <Star
                      key={i}
                      className="w-4 h-4 fill-yellow-400 text-yellow-400"
                    />
                  ))}
                </div>

                <p className="text-slate-300 italic">"{testimonial.content}"</p>
              </Card>
            ))}
          </div>
        </div>
      </section> */}

      {/* Contact Section */}
      <section
        id="contact-section"
        ref={contactSectionRef}
        className="relative z-10 py-24 border-t border-emerald-500/10"
      >
        <div className="max-w-4xl mx-auto px-6">
          <motion.div
            className="text-center mb-8 sm:mb-12 lg:mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <Badge className="inline-block mb-4">{t("contact.badge")}</Badge>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white">
              {t("contact.title")}
            </h2>
            <p className="text-slate-400 mt-6 text-sm sm:text-base lg:text-lg">
              {t("contact.description")}
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 mb-12">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <Card variant="glass" className="h-full">
                <div className="flex flex-col justify-between h-full gap-1.5">
                  {/* REMOVE THE H-FULL TO CROP THE ITEMS */}
                  <div className="flex items-start gap-3 sm:gap-4">
                    <Mail className="w-5 h-5 sm:w-6 sm:h-6 text-emerald-400 flex-shrink-0 mt-0.5 sm:mt-1" />
                    <div>
                      <h4 className="text-white font-bold text-sm sm:text-base">
                        {t("contact.email")}
                      </h4>
                      <p className="text-slate-400 text-xs sm:text-sm">
                        support@tecwebstudio.it
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 sm:gap-4">
                    <Phone className="w-5 h-5 sm:w-6 sm:h-6 text-emerald-400 flex-shrink-0 mt-0.5 sm:mt-1" />
                    <div>
                      <h4 className="text-white font-bold text-sm sm:text-base">
                        {t("contact.phone")}
                      </h4>
                      <p className="text-slate-400 text-xs sm:text-sm">
                        +39 (XXX) XXX-XXXX
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 sm:gap-4">
                    <Linkedin className="w-5 h-5 sm:w-6 sm:h-6 text-emerald-400 flex-shrink-0 mt-0.5 sm:mt-1" />
                    <div>
                      <h4 className="text-white font-bold text-sm sm:text-base">
                        {t("contact.linkedin")}
                      </h4>
                      <p className="text-slate-400 text-xs sm:text-sm">
                        {t("contact.connectWithUs")}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 sm:gap-4">
                    <Github className="w-5 h-5 sm:w-6 sm:h-6 text-emerald-400 flex-shrink-0 mt-0.5 sm:mt-1" />
                    <div>
                      <h4 className="text-white font-bold text-sm sm:text-base">
                        {t("contact.github")}
                      </h4>
                      <div className="text-slate-400 text-xs sm:text-sm space-y-2">
                        {/* khr0me */}
                        <div className="flex items-center gap-2">
                          <img
                            src="https://github.com/khr0me.png"
                            alt="khr0me avatar"
                            className="w-6 h-6 rounded-full"
                          />
                          <a
                            href="https://github.com/khr0me"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="underline hover:text-slate-300"
                          >
                            khr0me
                          </a>
                        </div>

                        {/* marcoice */}
                        <div className="flex items-center gap-2">
                          <img
                            src="https://github.com/marcoice.png"
                            alt="marcoice avatar"
                            className="w-6 h-6 rounded-full"
                          />
                          <a
                            href="https://github.com/marcoice"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="underline hover:text-slate-300"
                          >
                            marcoice
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <Card variant="glass">
                <form onSubmit={handleContactSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-white font-semibold mb-2 text-xs sm:text-sm">
                        {t("contact.form.name")}
                      </label>
                      <input
                        type="text"
                        value={contactForm.name}
                        onChange={(e) =>
                          setContactForm({
                            ...contactForm,
                            name: e.target.value,
                          })
                        }
                        className="w-full px-3 sm:px-4 py-2 rounded-lg bg-slate-800/50 border border-emerald-500/20 text-white placeholder-slate-500 text-sm focus:border-emerald-400 focus:outline-none transition-colors"
                        placeholder={t("contact.form.namePlaceholder")}
                      />
                    </div>

                    <div>
                      <label className="block text-white font-semibold mb-2 text-xs sm:text-sm">
                        {t("contact.form.email")}
                      </label>
                      <input
                        type="email"
                        value={contactForm.email}
                        onChange={(e) =>
                          setContactForm({
                            ...contactForm,
                            email: e.target.value,
                          })
                        }
                        className="w-full px-3 sm:px-4 py-2 rounded-lg bg-slate-800/50 border border-emerald-500/20 text-white placeholder-slate-500 text-sm focus:border-emerald-400 focus:outline-none transition-colors"
                        placeholder={t("contact.form.emailPlaceholder")}
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-white font-semibold mb-2 text-xs sm:text-sm">
                      {t("contact.form.message")}
                    </label>
                    <textarea
                      value={contactForm.message}
                      onChange={(e) =>
                        setContactForm({
                          ...contactForm,
                          message: e.target.value,
                        })
                      }
                      className="w-full px-3 sm:px-4 py-2 rounded-lg bg-slate-800/50 border border-emerald-500/20 text-white placeholder-slate-500 text-sm focus:border-emerald-400 focus:outline-none transition-colors resize-none h-24 sm:h-32"
                      placeholder={t("contact.form.messagePlaceholder")}
                    ></textarea>
                  </div>

                  {formStatus === "success" && (
                    <p className="text-green-400 text-xs sm:text-sm font-semibold">
                      ✓ {t("contact.form.success")}
                    </p>
                  )}
                  {formStatus === "error" && (
                    <p className="text-red-400 text-xs sm:text-sm font-semibold">
                      ✗ {t("contact.form.error")}
                    </p>
                  )}

                  <Button
                    type="submit"
                    size="md"
                    className="w-full text-sm sm:text-base"
                    isLoading={formStatus === "loading"}
                  >
                    {formStatus === "loading"
                      ? t("contact.form.sending")
                      : t("contact.form.submit")}
                  </Button>
                </form>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative z-10 py-24 border-t border-emerald-500/10">
        <div className="max-w-4xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <Card variant="elevated" className="overflow-hidden relative">
              <div className="absolute -top-20 -right-20 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl"></div>

              <div className="relative z-10 text-center space-y-8">
                <h2 className="text-3xl lg:text-4xl font-bold text-white">
                  {t("cta.title")}
                </h2>
                <p className="text-lg text-slate-300 max-w-2xl mx-auto">
                  {t("cta.description")}
                </p>
                <motion.div
                  className="flex flex-col sm:flex-row gap-4 justify-center pt-4"
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  viewport={{ once: true }}
                >
                  <Button
                    size="lg"
                    onClick={() => scrollToSection(contactSectionRef)}
                  >
                    {t("cta.startProject")}
                  </Button>
                  <Button variant="outline" size="lg">
                    {t("cta.scheduleCall")}
                  </Button>
                </motion.div>
              </div>
            </Card>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <section className="relative z-10 border-t border-emerald-500/10 py-12">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 mb-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <h3 className="text-white font-bold mb-4 text-base sm:text-lg">
                TecWeb Studio
              </h3>
              <p className="text-slate-400 text-xs sm:text-sm">
                {t("footer.description")}
              </p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              viewport={{ once: true }}
            >
              <h4 className="text-white font-semibold mb-4 text-sm sm:text-base">
                {t("footer.services")}
              </h4>
              <ul className="space-y-2 text-slate-400 text-xs sm:text-sm">
                <li>
                  <a
                    href="#"
                    className="hover:text-emerald-400 transition-colors"
                  >
                    {t("footer.webDesign")}
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="hover:text-emerald-400 transition-colors"
                  >
                    {t("footer.development")}
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="hover:text-emerald-400 transition-colors"
                  >
                    {t("footer.ecommerce")}
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="hover:text-emerald-400 transition-colors"
                  >
                    {t("footer.seo")}
                  </a>
                </li>
              </ul>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <h4 className="text-white font-semibold mb-4 text-sm sm:text-base">
                {t("footer.company")}
              </h4>
              <ul className="space-y-2 text-slate-400 text-xs sm:text-sm">
                <li>
                  <a
                    href="#"
                    className="hover:text-emerald-400 transition-colors"
                  >
                    {t("footer.about")}
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="hover:text-emerald-400 transition-colors"
                  >
                    {t("footer.portfolio")}
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="hover:text-emerald-400 transition-colors"
                  >
                    {t("footer.contact")}
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="hover:text-emerald-400 transition-colors"
                  >
                    {t("footer.blog")}
                  </a>
                </li>
              </ul>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              viewport={{ once: true }}
            >
              <h4 className="text-white font-semibold mb-4 text-sm sm:text-base">
                {t("footer.connect")}
              </h4>
              <div className="flex gap-4">
                <a
                  href="#"
                  className="text-slate-400 hover:text-emerald-400 transition-colors text-xs sm:text-sm"
                >
                  GitHub
                </a>
                <a
                  href="#"
                  className="text-slate-400 hover:text-emerald-400 transition-colors text-xs sm:text-sm"
                >
                  LinkedIn
                </a>
                <a
                  href="#"
                  className="text-slate-400 hover:text-emerald-400 transition-colors text-xs sm:text-sm"
                >
                  Twitter
                </a>
              </div>
            </motion.div>
          </div>

          <div className="border-t border-emerald-500/10 pt-8 text-center text-slate-500 text-xs sm:text-sm">
            <p>{t("footer.copyright")}</p>
          </div>
        </div>
      </section>

      {/* Language Switcher Button */}
      <motion.button
        onClick={() => setLanguageOpen(true)}
        className="fixed bottom-8 right-8 z-50 w-12 h-12 rounded-full bg-gradient-to-br from-emerald-400 to-green-500 hover:from-emerald-300 hover:to-green-400 text-white font-bold shadow-lg hover:shadow-emerald-500/50 transition-all duration-200 flex items-center justify-center text-xl cursor-pointer"
        title="Change Language"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        transition={{ type: "spring", stiffness: 300 }}
      >
        🌐
      </motion.button>

      {/* Language Dialog */}
      <Dialog open={languageOpen} onOpenChange={setLanguageOpen}>
        <DialogContent onClose={() => setLanguageOpen(false)}>
          <DialogHeader>
            <DialogTitle>Select Language / Seleziona Lingua</DialogTitle>
          </DialogHeader>
          <DialogBody>
            <div className="space-y-2">
              {languages.map((lang, index) => (
                <motion.button
                  key={lang.code}
                  onClick={() => handleLanguageChange(lang.code)}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 cursor-pointer ${
                    i18n.language === lang.code
                      ? "bg-emerald-500/30 border border-emerald-400 text-emerald-300"
                      : "bg-slate-700/30 border border-slate-600/30 text-slate-300 hover:bg-slate-700/50 hover:border-emerald-500/50"
                  }`}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                >
                  <span className="text-2xl">{lang.flag}</span>
                  <span className="font-semibold">{lang.name}</span>
                </motion.button>
              ))}
            </div>
          </DialogBody>
        </DialogContent>
      </Dialog>

      {/* Chat Widget removed */}
    </div>
  );
}
