import type {
  ConsultationRecord,
  DocumentRecord,
  PropertyRecord,
  RequirementRecord,
  RentalRequestRecord,
  SettingsRecord,
  TenantRecord,
  UserRecord,
  VerificationConfig
} from "./models";

export const DEFAULT_SETTINGS: SettingsRecord = {
  name: "Servicios Inmobiliarios RAIES",
  email: "contacto@raies.com",
  phone: "+54 11 5555-0123",
  address: "Av. Mitre 1200, Caseros",
  whatsapp: "5491155550123"
};

export const DEFAULT_REQUIREMENTS: RequirementRecord[] = [
  {
    label: "Recibo de sueldo (últimos 3 meses)",
    desc: "El ingreso debe superar 3× el valor del alquiler.",
    on: true
  },
  {
    label: "Garantía propietaria",
    desc: "Propiedad a nombre del garante en la misma ciudad.",
    on: true
  },
  {
    label: "DNI vigente",
    desc: "Frente y dorso, legible.",
    on: true
  },
  {
    label: "Constancia de CUIL / CUIT",
    desc: "Situación fiscal activa.",
    on: true
  },
  {
    label: "Antecedentes comerciales",
    desc: "Consulta Veraz / BCRA sin deudas.",
    on: false
  },
  {
    label: "Comprobante de domicilio",
    desc: "Recibo de servicio a nombre del solicitante.",
    on: true
  }
];

export const DEFAULT_SERVICES: string[] = [
  "Agua corriente",
  "Gas natural",
  "Luz",
  "Internet fibra",
  "Expensas incluidas",
  "Seguridad 24h"
];

export const DEFAULT_DOCS: string[] = [
  "DNI (frente y dorso)",
  "Recibo de sueldo (últimos 3)",
  "Garantía propietaria",
  "Constancia de CUIL"
];

export const DEFAULT_VERIFICATION_CONFIG: VerificationConfig = {
  options: [
    {
      key: "op1",
      title: "Opción 1",
      tenantPayslipRequired: true,
      guarantorPayslipsMin: 4,
      guarantorSeniorityYearsMin: 3,
      deedRequired: false,
      deedLocationLabel: "Venado Tuerto"
    },
    {
      key: "op2",
      title: "Opción 2",
      tenantPayslipRequired: true,
      guarantorPayslipsMin: 2,
      guarantorSeniorityYearsMin: 3,
      deedRequired: true,
      deedLocationLabel: "Venado Tuerto"
    }
  ],
  preApprovedMessage:
    "PreAprobado. Te invitamos a presentar la documentación en la Inmobiliaria para continuar."
};

export const DEFAULT_FEATURES: { icon: string; label: string; val: string }[] = [
  { icon: "bed", label: "Ambientes", val: "3" },
  { icon: "bathtub", label: "Baños", val: "1" },
  { icon: "straighten", label: "Superficie", val: "85 m²" },
  { icon: "yard", label: "Patio", val: "Sí" },
  { icon: "garage", label: "Garage", val: "No" },
  { icon: "pool", label: "Pileta", val: "No" },
  { icon: "pets", label: "Mascotas", val: "Permitidas" },
  { icon: "stairs", label: "Planta", val: "Alta" }
];

export const FALLBACK_PROPERTIES: PropertyRecord[] = [
  {
    id: "prop-1",
    title: "Departamento 2 dorm.",
    address: "Catamarca 950C, Planta Alta",
    price: 450000,
    beds: 2,
    baths: 1,
    area: 85,
    type: "Departamento",
    status: "Disponible",
    featured: true,
    neighborhood: "Centro",
    city: "Caseros",
    description:
      "Luminoso departamento de 2 dormitorios en planta alta, ubicado en pleno centro de Caseros. Cuenta con living-comedor amplio, cocina integrada totalmente equipada y balcón con vista abierta. Ideal para parejas o familias que buscan comodidad y excelente conectividad. Edificio con seguridad y bajas expensas.",
    services: DEFAULT_SERVICES,
    docs: DEFAULT_DOCS,
    features: DEFAULT_FEATURES,
    images: [
      { label: "FOTO · LIVING" },
      { label: "FOTO · COCINA" },
      { label: "FOTO · DORMITORIO" },
      { label: "FOTO · BAÑO" },
      { label: "FOTO · PATIO" }
    ]
  },
  {
    id: "prop-2",
    title: "Casa 2 dormitorios",
    address: "B° Parque Norte",
    price: 550000,
    beds: 2,
    baths: 1,
    area: 120,
    type: "Casa",
    status: "Disponible",
    featured: true,
    neighborhood: "Zona Norte",
    city: "Caseros",
    description:
      "Casa cómoda, con patio, ventilación cruzada y excelente acceso. Ideal para familias que buscan amplitud y tranquilidad.",
    services: DEFAULT_SERVICES,
    docs: DEFAULT_DOCS,
    features: DEFAULT_FEATURES,
    images: [{ label: "FOTO · FACHADA" }, { label: "FOTO · COCINA" }, { label: "FOTO · LIVING" }]
  },
  {
    id: "prop-3",
    title: "Departamento 1 dorm.",
    address: "Centro, Caseros",
    price: 320000,
    beds: 1,
    baths: 1,
    area: 48,
    type: "Departamento",
    status: "Disponible",
    featured: false,
    neighborhood: "Centro",
    city: "Caseros",
    description:
      "Unidad funcional para una o dos personas, con excelente conectividad y muy bajo costo de mantenimiento.",
    services: DEFAULT_SERVICES,
    docs: DEFAULT_DOCS,
    features: DEFAULT_FEATURES,
    images: [{ label: "FOTO · COCINA" }, { label: "FOTO · DORMITORIO" }]
  },
  {
    id: "prop-4",
    title: "PH 2 dormitorios",
    address: "Zona Sur",
    price: 430000,
    beds: 2,
    baths: 1,
    area: 90,
    type: "PH",
    status: "Disponible",
    featured: false,
    neighborhood: "Zona Sur",
    city: "Caseros",
    description:
      "PH con patio y distribución funcional, ideal para quienes priorizan espacios exteriores y privacidad.",
    services: DEFAULT_SERVICES,
    docs: DEFAULT_DOCS,
    features: DEFAULT_FEATURES,
    images: [{ label: "FOTO · PATIO" }, { label: "FOTO · LIVING" }]
  }
];

export const FALLBACK_CONSULTATIONS: ConsultationRecord[] = [
  {
    id: "con-1",
    name: "Lucía Fernández",
    email: "lucia@email.com",
    phone: "+54 11 1234 5678",
    msg: "Hola, ¿el depto de Centro sigue disponible?",
    canal: "WhatsApp",
    estado: "Nueva",
    propertyTitle: "Departamento 2 dorm.",
    createdAt: new Date(Date.now() - 5 * 60 * 1000)
  },
  {
    id: "con-2",
    name: "Pedro Sosa",
    email: "pedro@email.com",
    phone: "",
    msg: "¿Tienen casas de 2 dormitorios en Zona Norte?",
    canal: "RAIES BOT",
    estado: "Respondida",
    propertyTitle: "Casa 2 dormitorios",
    createdAt: new Date(Date.now() - 15 * 60 * 1000)
  }
];

export const FALLBACK_REQUESTS: RentalRequestRecord[] = [
  {
    id: "req-1",
    name: "María González",
    email: "maria@email.com",
    phone: "+543462111111",
    propertyTitle: "Departamento 2 dorm. - Centro",
    fecha: "29/06/2026",
    ingreso: "$1.450.000",
    status: "En revisión"
  },
  {
    id: "req-2",
    name: "Juan Pérez",
    email: "juan@email.com",
    phone: "+543462222222",
    propertyTitle: "Casa 2 dorm. - Zona Norte",
    fecha: "28/06/2026",
    ingreso: "$1.980.000",
    status: "Verificado"
  },
  {
    id: "req-3",
    name: "Ana López",
    email: "ana@email.com",
    phone: "+543462333333",
    propertyTitle: "PH 2 dorm. - Zona Sur",
    fecha: "27/06/2026",
    ingreso: "$1.200.000",
    status: "Pendiente"
  }
];

export const FALLBACK_TENANTS: TenantRecord[] = [
  {
    id: "ten-1",
    name: "María González",
    dni: "32.456.789",
    prop: "Departamento 2 dorm. - Centro",
    desde: "Mar 2025",
    estado: "Activo"
  },
  {
    id: "ten-2",
    name: "Juan Pérez",
    dni: "28.123.456",
    prop: "Casa 2 dorm. - Zona Norte",
    desde: "Ene 2025",
    estado: "Activo"
  }
];

export const FALLBACK_DOCUMENTS: DocumentRecord[] = [
  {
    id: "doc-1",
    inquilino: "María González",
    doc: "DNI (frente y dorso)",
    fecha: "12/06/2026",
    estado: "Verificado",
    icon: "badge"
  },
  {
    id: "doc-2",
    inquilino: "Ana López",
    doc: "Garantía propietaria",
    fecha: "28/06/2026",
    estado: "En revisión",
    icon: "gavel"
  }
];

export const FALLBACK_USERS: UserRecord[] = [
  {
    id: "usr-admin",
    name: "Admin RAIES",
    email: "admin@raies.com",
    rol: "Administrador",
    estado: "Activo",
    notif: [true, true, false, true]
  },
  {
    id: "usr-1",
    name: "Sofía Méndez",
    email: "sofia@raies.com",
    rol: "Agente",
    estado: "Activo",
    notif: [true, true, true, false]
  }
];
