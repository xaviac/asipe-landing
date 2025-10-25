import React, { useState } from "react";

// ASIPE — Landing v1 (single-file React component)
// TailwindCSS utility classes are used for styling.
// This file is self‑contained and ready to preview.

const brand = {
  // light / default logo
  logoPrimary: "/assets/ASIPE.jpg",
  // dark-mode logo (if you provide a PNG named asipe_dark.png it will be used)
  logoPrimaryDark: "/assets/asipe_dark.png",
  logoMark: "/assets/asipe-mark.svg",
  // color palettes for light and dark themes
  themes: {
    light: {
      primary: "#242752",
      primaryDark: "#1b1e4b",
      accent: "#232651",
      neutral: "#1f224e",
      light: "#d2d6dd",
    },
    dark: {
      primary: "#0b1228",
      primaryDark: "#04060b",
      accent: "#4760ff",
      neutral: "#e6e9f2",
      light: "#0f1724",
    },
  },
};

const services = [
  {
    id: "inversiones",
    title: "Inversiones",
    blurb:
      "Opciones en mercados nacionales e internacionales, criptoactivos y sesiones de asesoría personalizada.",
    bullets: [
      "Portafolios a medida (perfil conservador a agresivo)",
      "Mercado local e internacional",
      "Criptomonedas: educación, riesgos y buenas prácticas",
      "Acompañamiento y rebalanceo periódico",
    ],
  },
  {
    id: "creditos",
    title: "Créditos",
    blurb:
      "Alternativas según tu estado y perfil: personales, PyME, pensionados IMSS y con garantía hipotecaria.",
    bullets: [
      "Crédito personal y de nómina",
      "Financiamiento para PyME",
      "Créditos para pensionados IMSS",
      "Esquemas con garantía hipotecaria",
    ],
  },
  {
    id: "seguros",
    title: "Seguros",
    blurb:
      "Salud, Gastos Médicos Mayores y pólizas colectivas para empresas y escuelas.",
    bullets: [
      "Salud y accidentes",
      "Gastos Médicos Mayores",
      "Colectivos empresariales y escolares",
      "Gestión de siniestros y renovaciones",
    ],
  },
  {
    id: "ingenieria-fiscal",
    title: "Ingeniería Fiscal",
    blurb:
      "Asesoría estratégica por contadores certificados para optimizar impuestos con pleno cumplimiento normativo.",
    bullets: [
      "Diagnóstico fiscal y planeación anual",
      "Cumplimiento y mitigación de riesgos",
      "Automatización de facturación y conciliaciones",
      "Acompañamiento en revisiones y auditorías",
    ],
  },
  {
    id: "pensiones",
    title: "Pensiones",
    blurb:
      "Análisis de casos IMSS e ISSSTE: subcuenta de vivienda, años de servicio y régimen aplicable.",
    bullets: [
      "IMSS e ISSSTE: régimen Ley 73/97 y equivalentes",
      "Recuperación/uso de subcuenta de vivienda (caso a caso)",
      "Cálculo de semanas y proyecciones",
      "Estrategias de transición y trámite",
    ],
  },
];

const faqs = [
  {
    q: "¿Trabajan en toda la República Mexicana?",
    a: "Damos servicio remoto a todo México y presencial en zonas disponibles. Las condiciones de crédito pueden variar según el estado.",
  },
  {
    q: "¿Gestionan inversiones en criptomonedas?",
    a: "Ofrecemos asesoría educativa y de riesgos. La decisión final y la custodia son del cliente; priorizamos diversificación y controles.",
  },
  {
    q: "¿Qué implica la ingeniería fiscal?",
    a: "Planeación y optimización fiscal dentro del marco legal, elaborada por contadores. No promovemos esquemas para evadir obligaciones.",
  },
  {
    q: "¿Pueden apoyar trámites de pensión IMSS/ISSSTE?",
    a: "Sí. Analizamos régimen, semanas, subcuentas y preparamos un plan de acción con checklist y tiempos tentativos.",
  },
];

const inputBase =
  "block w-full rounded-xl border border-gray-300 bg-white/70 px-4 py-3 text-gray-900 placeholder-gray-500 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-200";

export default function Site() {
  const [form, setForm] = useState({ nombre: "", email: "", telefono: "", mensaje: "" });
  const [sent, setSent] = useState(false);

  const onSubmit = (e) => {
    e.preventDefault();
    // TODO: Integrar con backend/CRM
    console.log("Lead ASIPE", form);
    setSent(true);
  };

    const [theme, setTheme] = React.useState(() => {
      try {
        return localStorage.getItem("asipe-theme") || "light";
      } catch (e) {
        return "light";
      }
    });

    // Keep brand.colors in sync with the selected theme so existing components
    // that reference `brand.colors.*` continue to work without changing all call sites.
    brand.colors = brand.themes[theme];

    React.useEffect(() => {
      try {
        localStorage.setItem("asipe-theme", theme);
      } catch (e) {
        // ignore
      }
    }, [theme]);

    return (
      <div className={`antialiased ${theme === "dark" ? "bg-slate-900 text-white" : "text-slate-900"}`}>
        <Header theme={theme} setTheme={setTheme} />
        <main>
          <Hero />
          <Trust />
          <Services />
          <ValueProps />
          <Process />
          <CTA />
          <Contact form={form} setForm={setForm} onSubmit={onSubmit} sent={sent} />
          <FAQ />
          <SocialProof />
        </main>
        <Footer />
      </div>
    );
}

function Header({ theme, setTheme }) {
  const logoSrc = theme === "dark" && brand.logoPrimaryDark ? brand.logoPrimaryDark : brand.logoPrimary;
  const headerBg = theme === "dark" ? "rgba(6,8,12,0.6)" : "rgba(255,255,255,0.75)";

  return (
    <header
      className="sticky top-0 z-40 backdrop-blur border-b"
      style={{ background: headerBg, borderColor: theme === "dark" ? "rgba(255,255,255,0.06)" : "#E5E7EB" }}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <a href="#" className="flex items-center gap-3">
          <img
            src={logoSrc}
            alt="ASIPE"
            className="h-9 w-auto object-contain rounded-sm"
            onError={(e) => {
              try {
                e.currentTarget.src = brand.logoPrimary;
              } catch (err) {}
            }}
          />
          <span className="font-bold text-xl tracking-tight" style={{ color: brand.colors.primary }}>
            ASIPE
          </span>
        </a>
        <nav className="hidden md:flex items-center gap-6 text-sm">
          <a href="#servicios" className="hover:underline" style={{ color: brand.colors.neutral }}>
            Servicios
          </a>
          <a href="#proceso" className="hover:underline" style={{ color: brand.colors.neutral }}>
            Proceso
          </a>
          <a href="#contacto" className="hover:underline" style={{ color: brand.colors.neutral }}>
            Contacto
          </a>
          <a href="#faq" className="hover:underline" style={{ color: brand.colors.neutral }}>
            FAQ
          </a>
        </nav>
        <div className="flex items-center gap-2">
          <a
            href="#contacto"
            className="inline-flex items-center rounded-2xl px-4 py-2 text-white font-medium shadow transition"
            style={{ backgroundColor: brand.colors.primary }}
          >
            Solicitar asesoría
          </a>
          <a
            href="https://wa.me/525519416141"
            className="hidden sm:inline-flex items-center rounded-2xl px-3 py-2 font-medium border transition"
            style={{ borderColor: brand.colors.primary, color: brand.colors.primary }}
          >
            WhatsApp
          </a>
          <button
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            aria-label="Cambiar tema"
            className="ml-2 inline-flex items-center justify-center h-9 w-9 rounded-full border"
            style={{ borderColor: brand.colors.light, color: brand.colors.primary, background: "transparent" }}
            title={theme === "dark" ? "Modo claro" : "Modo oscuro"}
          >
            {theme === "dark" ? (
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                <path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z" fill="currentColor" />
              </svg>
            ) : (
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                <path d="M12 3v2M12 19v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="1.6" />
              </svg>
            )}
          </button>
        </div>
      </div>
    </header>
  );
}

function Hero() {
  return (
    <section className="relative overflow-hidden">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-20 sm:py-28">
        <div className="grid lg:grid-cols-2 gap-10 items-center">
          <div>
            <h1
              className="text-4xl sm:text-5xl font-extrabold leading-tight"
              style={{ color: brand.colors.neutral }}
            >
              Finanzas claras. Decisiones seguras.
            </h1>
            <p className="mt-4 text-lg text-gray-700">
              En ASIPE acompañamos tu patrimonio con soluciones de inversión, crédito, seguros, ingeniería fiscal y pensiones.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href="#servicios"
                className="rounded-2xl text-white px-5 py-3 font-medium shadow transition"
                style={{ backgroundColor: brand.colors.neutral }}
              >
                Ver servicios
              </a>
              <a
                href="#contacto"
                className="rounded-2xl border px-5 py-3 font-medium transition"
                style={{ borderColor: brand.colors.primary, color: brand.colors.primary }}
              >
                Habla con un asesor
              </a>
            </div>
            <div className="mt-6 flex items-center gap-4 text-sm text-gray-600">
              <span className="inline-flex items-center gap-2">
                <ShieldIcon /> Regulado y con buenas prácticas
              </span>
              <span className="inline-flex items-center gap-2">
                <StarIcon /> Asesoría personalizada
              </span>
            </div>
          </div>
          <div className="relative">
            <div
              className="aspect-[4/3] w-full rounded-3xl border shadow-xl p-4"
              style={{
                background: `linear-gradient(135deg, ${brand.colors.light}, #fff)`,
                borderColor: "#E5E7EB",
              }}
            >
              <div className="h-full w-full rounded-2xl bg-white/70 backdrop-blur flex items-center justify-center">
                <div className="grid grid-cols-2 gap-4 w-full max-w-md">
                  <Stat label="Clientes" value="+1,200" />
                  <Stat label="Años de experiencia" value="10+" />
                  <Stat label="Productos" value="25+" />
                  <Stat label="Estados" value="32" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <BackgroundDecor />
    </section>
  );
}

function Stat({ label, value }) {
  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-4 text-center shadow-sm">
      <div className="text-2xl font-bold">{value}</div>
      <div className="text-xs text-gray-600">{label}</div>
    </div>
  );
}

function Trust() {
  return (
    <section className="py-10">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <p className="text-center text-sm text-gray-600">Socios de confianza y plataformas líderes</p>
        <div className="mt-6 grid grid-cols-2 sm:grid-cols-4 gap-4 opacity-80">
          <LogoBadge label="Bancos" />
          <LogoBadge label="Aseguradoras" />
          <LogoBadge label="Fondos de Inversión" />
          <LogoBadge label="Afores" />
        </div>
      </div>
    </section>
  );
}

function Services() {
  return (
    <section id="servicios" className="py-20 bg-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-extrabold tracking-tight">Servicios</h2>
        <p className="mt-3 text-gray-700 max-w-3xl">
          Te ayudamos a comparar, decidir e implementar la solución correcta para tu objetivo financiero.
        </p>
        <div className="mt-10 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((s) => (
            <div
              key={s.id}
              className="group rounded-3xl border border-gray-200 bg-white p-6 shadow-sm hover:shadow-md transition"
            >
              <div className="flex items-center gap-3">
                <ServiceIcon />
                <h3 className="text-xl font-semibold">{s.title}</h3>
              </div>
              <p className="mt-2 text-sm text-gray-700">{s.blurb}</p>
              <ul className="mt-4 space-y-2 text-sm text-gray-700">
                {s.bullets.map((b, i) => (
                  <li key={i} className="flex gap-2">
                    <CheckIcon /> <span>{b}</span>
                  </li>
                ))}
              </ul>
              <a
                href="#contacto"
                className="mt-5 inline-flex items-center gap-2 font-medium hover:underline"
                style={{ color: brand.colors.primary }}
              >
                Quiero más información <ArrowRightIcon />
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function ValueProps() {
  const items = [
    {
      title: "Transparencia",
      desc: "Hablamos claro de costos, comisiones y riesgos. Sin letras chiquitas.",
    },
    { title: "Acompañamiento", desc: "De la simulación al cierre y seguimiento continuo." },
    { title: "Compliance", desc: "Cumplimiento regulatorio y mejores prácticas del sector." },
    { title: "Data‑driven", desc: "Decisiones informadas con análisis y comparativas objetivas." },
  ];
  return (
    <section className="py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-4 gap-6">
          {items.map((it) => (
            <div key={it.title} className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm">
              <div className="text-lg font-semibold">{it.title}</div>
              <p className="mt-2 text-sm text-gray-700">{it.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Process() {
  const steps = [
    { title: "1) Diagnóstico", desc: "Entendemos objetivos, estado y restricciones (15–30 min)." },
    { title: "2) Propuesta", desc: "Te presentamos opciones comparadas con costos, riesgos y tiempos." },
    { title: "3) Implementación", desc: "Trámite y ejecución acompañada hasta el cierre." },
    { title: "4) Seguimiento", desc: "Monitoreo, rebalanceo y renovaciones periódicas." },
  ];
  return (
    <section id="proceso" className="py-20 bg-gradient-to-b from-white to-indigo-50">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-extrabold tracking-tight">Cómo trabajamos</h2>
        <div className="mt-10 grid md:grid-cols-4 gap-6">
          {steps.map((st) => (
            <div key={st.title} className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm">
              <div className="text-lg font-semibold">{st.title}</div>
              <p className="mt-2 text-sm text-gray-700">{st.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function CTA() {
  return (
    <section className="py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div
          className="rounded-3xl border p-10 shadow-xl"
          style={{ background: brand.colors.neutral, borderColor: "#E5E7EB" }}
        >
          <div className="grid md:grid-cols-2 gap-6 items-center">
            <div>
              <h3 className="text-2xl font-bold text-white">Agenda una sesión de diagnóstico sin costo</h3>
              <p className="mt-2 text-gray-300">15–30 minutos para mapear tu situación y próximos pasos.</p>
            </div>
            <div className="flex md:justify-end gap-3">
              <a
                href="#contacto"
                className="rounded-2xl font-medium px-6 py-3 shadow"
                style={{ backgroundColor: "#fff", color: brand.colors.neutral }}
              >
                Quiero agendar
              </a>
              <a
                href="https://wa.me/525519416141"
                className="rounded-2xl font-medium px-6 py-3 border"
                style={{ borderColor: brand.colors.accent, color: "#fff" }}
              >
                WhatsApp
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Contact({ form, setForm, onSubmit, sent }) {
  return (
    <section id="contacto" className="py-20 bg-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-extrabold tracking-tight">Contacto</h2>
        <p className="mt-3 text-gray-700 max-w-2xl">
          Déjanos tus datos y un asesor te contactará. La información se trata con confidencialidad.
        </p>
        <form onSubmit={onSubmit} className="mt-8 grid md:grid-cols-2 gap-6">
          <div>
            <label className="text-sm font-medium">Nombre</label>
            <input
              className={inputBase}
              required
              value={form.nombre}
              onChange={(e) => setForm({ ...form, nombre: e.target.value })}
              placeholder="Tu nombre"
            />
          </div>
          <div>
            <label className="text-sm font-medium">Email</label>
            <input
              type="email"
              className={inputBase}
              required
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              placeholder="tucorreo@ejemplo.com"
            />
          </div>
          <div>
            <label className="text-sm font-medium">Teléfono</label>
            <input
              className={inputBase}
              value={form.telefono}
              onChange={(e) => setForm({ ...form, telefono: e.target.value })}
              placeholder="10 dígitos"
            />
          </div>
          <div className="md:col-span-2">
            <label className="text-sm font-medium">Mensaje</label>
            <textarea
              rows={5}
              className={inputBase}
              value={form.mensaje}
              onChange={(e) => setForm({ ...form, mensaje: e.target.value })}
              placeholder="Cuéntanos tu objetivo (inversión, crédito, seguro, pensión, etc.)"
            />
          </div>
          <div className="md:col-span-2 flex items-center justify-between gap-4">
            <div className="text-xs text-gray-600">
              Al enviar aceptas nuestro aviso de privacidad y uso de datos para contactarte.
            </div>
            <button
              type="submit"
              className="rounded-2xl text-white px-6 py-3 font-medium shadow hover:opacity-90"
              style={{ backgroundColor: brand.colors.primary }}
            >
              Enviar
            </button>
          </div>
          {sent && (
            <div className="md:col-span-2 rounded-2xl border border-green-200 bg-green-50 p-4 text-green-800">
              ¡Gracias! Recibimos tu solicitud. Te contactaremos pronto.
            </div>
          )}
        </form>
      </div>
    </section>
  );
}

function FAQ() {
  return (
    <section id="faq" className="py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-extrabold tracking-tight">Preguntas frecuentes</h2>
        <div className="mt-8 grid md:grid-cols-2 gap-6">
          {faqs.map((f, i) => (
            <div key={i} className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm">
              <div className="font-semibold">{f.q}</div>
              <p className="mt-2 text-sm text-gray-700">{f.a}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="border-t" style={{ borderColor: "#E5E7EB", background: "#fff" }}>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid md:grid-cols-4 gap-8">
          <div className="md:col-span-2">
            <div className="flex items-center gap-2">
              <Logo />
              <span className="font-bold text-lg" style={{ color: brand.colors.primary }}>
                ASIPE
              </span>
            </div>
            <p className="mt-3 text-sm text-gray-700 max-w-md">
              Soluciones financieras integrales con transparencia y cumplimiento.
            </p>
          </div>
          <div>
            <div className="font-semibold mb-3">Enlaces</div>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="#servicios" className="hover:underline">
                  Servicios
                </a>
              </li>
              <li>
                <a href="#proceso" className="hover:underline">
                  Proceso
                </a>
              </li>
              <li>
                <a href="#contacto" className="hover:underline">
                  Contacto
                </a>
              </li>
              <li>
                <a href="#faq" className="hover:underline">
                  FAQ
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline">
                  Aviso de privacidad
                </a>
              </li>
            </ul>
          </div>
          <div>
            <div className="font-semibold mb-3">Legal</div>
            <p className="text-xs text-gray-600">
              La información aquí mostrada tiene fines informativos. Los productos financieros están sujetos a autorización, disponibilidad y evaluación del cliente. ASIPE no promueve prácticas fuera del marco legal.
            </p>
          </div>
        </div>
        <div className="mt-8 text-xs text-gray-500">
          © {new Date().getFullYear()} ASIPE. Todos los derechos reservados.
        </div>
      </div>
    </footer>
  );
}

/* ---------------------------- UI Subcomponents ---------------------------- */

function Logo() {
  return (
    <div className="flex items-center">
      <img src={brand.logoMark} alt="ASIPE" className="h-7 w-7 object-contain" />
    </div>
  );
}

function LogoBadge({ label }) {
  return (
    <div className="rounded-2xl border bg-white p-6 text-center shadow-sm" style={{ borderColor: "#E5E7EB" }}>
      <div
        className="mx-auto w-10 h-10 rounded-full flex items-center justify-center"
        style={{ background: brand.colors.light }}
      >
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" style={{ color: brand.colors.primary }}>
          <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.5" />
          <path d="M6 12h12M12 6v12" stroke="currentColor" strokeWidth="1.5" />
        </svg>
      </div>
      <div className="mt-3 text-xs text-gray-600">{label}</div>
    </div>
  );
}

function ServiceIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" style={{ color: brand.colors.primary }}>
      <rect x="3" y="4" width="18" height="14" rx="2" stroke="currentColor" strokeWidth="1.5" />
      <path d="M3 9h18" stroke="currentColor" strokeWidth="1.5" />
      <circle cx="8" cy="13" r="2" stroke="currentColor" strokeWidth="1.5" />
      <path d="M12 15h6" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      className="mt-0.5 flex-none"
      style={{ color: "#16A34A" }}
    >
      <path d="M20 6L9 17l-5-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function ArrowRightIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" className="flex-none">
      <path d="M5 12h14M13 5l7 7-7 7" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function ShieldIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" className="flex-none">
      <path d="M12 3l8 4v5c0 5-3.5 8.5-8 9-4.5-.5-8-4-8-9V7l8-4z" stroke="currentColor" strokeWidth="1.6" />
      <path d="M9 12l2 2 4-4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function StarIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill={brand.colors.accent} className="flex-none">
      <path d="M12 2l3.09 6.26L22 9.27l-5 4.88L18.18 22 12 18.6 5.82 22 7 14.15l-5-4.88 6.91-1.01L12 2z" />
    </svg>
  );
}

function BackgroundDecor() {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
      <div
        className="absolute -top-24 -right-24 h-72 w-72 rounded-full blur-3xl"
        style={{ background: brand.colors.primary, opacity: 0.15 }}
      />
      <div
        className="absolute top-1/2 -left-24 h-72 w-72 rounded-full blur-3xl"
        style={{ background: brand.colors.accent, opacity: 0.15 }}
      />
    </div>
  );
}

function SocialProof() {
  const quotes = [
    {
      name: "María G.",
      role: "Directora PyME",
      text:
        "Nos ayudaron a comparar opciones de financiamiento y cerramos en 10 días con mejores tasas.",
    },
    {
      name: "Luis R.",
      role: "Profesionista independiente",
      text:
        "La asesoría en pensión IMSS fue clara y práctica; ahora tengo un plan con fechas y documentos.",
    },
    {
      name: "Colegio Atenea",
      role: "Administración",
      text:
        "Implementamos un colectivo de salud para docentes con buena cobertura y costo competitivo.",
    },
  ];
  return (
    <section className="py-20 bg-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-extrabold tracking-tight">Clientes que confían en ASIPE</h2>
        <div className="mt-10 grid md:grid-cols-3 gap-6">
          {quotes.map((q, i) => (
            <div key={i} className="rounded-3xl border bg-white p-6 shadow-sm" style={{ borderColor: "#E5E7EB" }}>
              <div className="text-sm text-gray-700">“{q.text}”</div>
              <div className="mt-4 text-xs text-gray-600">
                {q.name} • {q.role}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// Lightweight runtime checks that do not affect rendering. Useful during dev/preview.
if (typeof window !== "undefined") {
  try {
    console.assert(/^#([0-9a-f]{3}){1,2}$/i.test(brand.colors.primary) || brand.colors.primary.startsWith("rgb"), "brand.primary debe ser un color válido");
    console.assert(brand.logoMark && typeof brand.logoMark === "string", "brand.logoMark debe ser una ruta válida");
    console.assert(typeof Site === "function", "Site debe exportar un componente por defecto");

    console.assert(Array.isArray(services) && services.length > 0, "services debe contener al menos un servicio");
    console.assert(new Set(services.map((s) => s.id)).size === services.length, "Cada servicio debe tener un id único");
    console.assert(typeof brand.colors.accent === "string" && brand.colors.accent.length > 0, "brand.colors.accent debe existir");

    const wa = document.querySelector('a[href^="https://wa.me/"]');
    console.assert(!!wa, "Debería existir un CTA de WhatsApp");
  } catch (e) {
    // no-op
  }
}
