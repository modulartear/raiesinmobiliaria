import { useEffect, useMemo, useRef, useState } from "react";
import type { CSSProperties } from "react";
import type { ScreenKey } from "./components/AppSwitcher";
import ActionModal, { ActionFormState, ActionModalKind } from "./components/ActionModal";
import LoginModal from "./components/LoginModal";
import Toast from "./components/Toast";
import LandingScreen from "./screens/LandingScreen";
import PropertyScreen from "./screens/PropertyScreen";
import DashboardScreen from "./screens/DashboardScreen";
import { initFirebase } from "./firebase/firebase";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  serverTimestamp,
  setDoc,
  Timestamp
} from "firebase/firestore";
import {
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  User
} from "firebase/auth";
import { getDownloadURL, ref as storageRef, uploadBytes } from "firebase/storage";
import {
  DEFAULT_DOCS,
  DEFAULT_FEATURES,
  DEFAULT_REQUIREMENTS,
  DEFAULT_SERVICES,
  DEFAULT_SETTINGS,
  FALLBACK_CONSULTATIONS,
  FALLBACK_DOCUMENTS,
  FALLBACK_PROPERTIES,
  FALLBACK_REQUESTS,
  FALLBACK_TENANTS,
  FALLBACK_USERS
} from "./data/defaults";
import type {
  ConsultationRecord,
  DocumentRecord,
  PropertyRecord,
  RequirementRecord,
  RentalRequestRecord,
  SettingsRecord,
  TenantRecord,
  UserRecord
} from "./data/models";
import { formatCurrency, formatDate, formatRelative } from "./lib/format";
import { badgeStyle, statusKind } from "./lib/ui";

const FALLBACK_GRADIENTS = [
  "linear-gradient(150deg,#2d5a48,#16382c)",
  "linear-gradient(150deg,#3a4a44,#1c2b26)",
  "linear-gradient(150deg,#46604f,#22352b)",
  "linear-gradient(150deg,#54473a,#2a2018)",
  "linear-gradient(150deg,#26795c,#143a2c)"
];

function bgFromImage(imageUrl: string | undefined, index: number): string {
  const fallback = FALLBACK_GRADIENTS[index % FALLBACK_GRADIENTS.length];
  if (!imageUrl) return fallback;
  return `linear-gradient(180deg,rgba(12,37,29,.18),rgba(12,37,29,.18)),url(${imageUrl}) center/cover no-repeat`;
}

function asDate(value: any): Date {
  if (!value) return new Date();
  if (value instanceof Date) return value;
  if (value instanceof Timestamp) return value.toDate();
  if (typeof value?.toDate === "function") return value.toDate();
  const d = new Date(value);
  return Number.isNaN(d.getTime()) ? new Date() : d;
}

function normalizeProperties(list: PropertyRecord[]) {
  return list.map((raw, idx) => {
    const images = raw.images?.length ? raw.images : [{ label: "FOTO · PROPIEDAD" }];
    const first = images[0] || {};
    return {
      ...raw,
      bedsLabel: String(raw.beds ?? 0),
      bathsLabel: String(raw.baths ?? 0),
      areaLabel: `${raw.area ?? 0} m²`,
      priceLabel: formatCurrency(raw.price ?? 0),
      bg: bgFromImage(first.url, idx),
      photoLabel: first.label || "FOTO · PROPIEDAD",
      breadcrumb: `Propiedades · ${raw.type || "Departamento"} · ${raw.neighborhood || "Centro"}`,
      locationLabel: `${raw.address || "Sin dirección"} · ${raw.city || "Caseros"}`,
      statusKind: statusKind(raw.status || "Disponible")
    };
  });
}

type PropertyUi = ReturnType<typeof normalizeProperties>[number];

type UserProfile = {
  uid: string;
  name: string;
  email: string;
  rol: string;
  estado: string;
  notif: boolean[];
};

function defaultActionForm(): ActionFormState {
  return { name: "", email: "", phone: "", monthlyIncome: "", message: "" };
}

function canManage(profile: UserProfile | null) {
  if (!profile) return false;
  const role = String(profile.rol || "").toLowerCase();
  return role.includes("admin") || role.includes("administrador");
}

export default function App() {
  const services = useMemo(() => initFirebase(), []);

  const [screen, setScreen] = useState<ScreenKey>("landing");
  const [tab, setTab] = useState<string>("Dashboard");
  const [hover, setHover] = useState<number>(-1);
  const [lightbox, setLightbox] = useState<number>(-1);
  const [calcMonths, setCalcMonths] = useState<number>(12);

  const [properties, setProperties] = useState<PropertyUi[]>(() =>
    normalizeProperties(FALLBACK_PROPERTIES)
  );
  const [selectedPropertyId, setSelectedPropertyId] = useState<string>(
    FALLBACK_PROPERTIES[0]?.id || "prop-1"
  );

  const [consultations, setConsultations] = useState<ConsultationRecord[]>(() =>
    FALLBACK_CONSULTATIONS
  );
  const [requests, setRequests] = useState<RentalRequestRecord[]>(() => FALLBACK_REQUESTS);
  const [tenants, setTenants] = useState<TenantRecord[]>(() => FALLBACK_TENANTS);
  const [documents, setDocuments] = useState<DocumentRecord[]>(() => FALLBACK_DOCUMENTS);
  const [users, setUsers] = useState<UserRecord[]>(() => FALLBACK_USERS);

  const [settings, setSettings] = useState<SettingsRecord>(() => DEFAULT_SETTINGS);
  const [requirements, setRequirements] = useState<RequirementRecord[]>(
    () => DEFAULT_REQUIREMENTS
  );
  const [notif, setNotif] = useState<boolean[]>(() => [true, true, false, true]);

  const [searchQuery, setSearchQuery] = useState("");
  const [searchLocation, setSearchLocation] = useState("");
  const [searchType, setSearchType] = useState("Todos los tipos");
  const [searchMin, setSearchMin] = useState("");
  const [searchMax, setSearchMax] = useState("");

  const [chatOpen, setChatOpen] = useState(true);
  const [chatDraft, setChatDraft] = useState("");

  const [loginOpen, setLoginOpen] = useState(false);
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [loginLoading, setLoginLoading] = useState(false);

  const [actionKind, setActionKind] = useState<ActionModalKind | "">("");
  const [actionLoading, setActionLoading] = useState(false);
  const [actionForm, setActionForm] = useState<ActionFormState>(() => defaultActionForm());

  const [appError, setAppError] = useState("");
  const [appNotice, setAppNotice] = useState(
    services.ready
      ? ""
      : services.error || "Modo demo activo. Configurá Firebase para persistencia."
  );
  const [modeLabel, setModeLabel] = useState(services.ready ? "Firebase" : "Demo");

  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [currentProfile, setCurrentProfile] = useState<UserProfile | null>(null);

  const [propFormOpen, setPropFormOpen] = useState(false);
  const [propDraft, setPropDraft] = useState(() => ({
    id: "",
    title: "",
    type: "Departamento",
    address: "",
    price: "",
    beds: "",
    baths: "",
    area: "",
    description: "",
    featured: true,
    services: DEFAULT_SERVICES.slice(0, 3)
  }));
  const [propertySearch, setPropertySearch] = useState("");
  const [tenantSearch, setTenantSearch] = useState("");
  const [userSearch, setUserSearch] = useState("");
  const [propertyUploadPreview, setPropertyUploadPreview] = useState<
    { file: File; url: string; label: string }[]
  >([]);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [savingProperty, setSavingProperty] = useState(false);
  const [savingRequirements, setSavingRequirements] = useState(false);
  const [savingSettings, setSavingSettings] = useState(false);

  useEffect(() => {
    if (!services.ready) return;
    const auth = services.auth;
    const db = services.db;
    if (!auth || !db) return;
    const unsub = onAuthStateChanged(auth, async (user) => {
      setCurrentUser(user);
      if (!user) {
        setCurrentProfile(null);
        setNotif([true, true, false, true]);
        return;
      }
      try {
        const snap = await getDoc(doc(db, "users", user.uid));
        const data = (snap.exists() ? snap.data() : {}) as any;
        const profile: UserProfile = {
          uid: user.uid,
          name:
            data.name ||
            user.displayName ||
            (user.email ? user.email.split("@")[0] : "Admin RAIES"),
          email: data.email || user.email || "",
          rol: data.rol || "Administrador",
          estado: data.estado || "Activo",
          notif: Array.isArray(data.notif) ? data.notif : [true, true, false, true]
        };
        setCurrentProfile(profile);
        setNotif(profile.notif);
        if (!snap.exists()) {
          await setDoc(
            doc(db, "users", user.uid),
            {
              name: profile.name,
              email: profile.email,
              rol: profile.rol,
              estado: profile.estado,
              notif: profile.notif
            },
            { merge: true }
          );
        }
        await loadPrivateData();
      } catch (e: any) {
        setAppError(e?.message || String(e));
      }
    });
    return () => unsub();
  }, [services.ready, services.auth, services.db]);

  useEffect(() => {
    void loadPublicData();
  }, [services.ready]);

  useEffect(() => {
    if (!appError) return;
    const t = window.setTimeout(() => setAppError(""), 3500);
    return () => window.clearTimeout(t);
  }, [appError]);

  async function loadPublicData() {
    if (!services.ready || !services.db) {
      setModeLabel("Demo");
      setAppNotice(
        services.error ? "Firebase no configurado. Modo demo activo." : "Modo demo activo."
      );
      return;
    }
    try {
      const [propsSnap, settingsSnap, reqSnap] = await Promise.all([
        getDocs(collection(services.db, "properties")),
        getDoc(doc(services.db, "settings", "general")),
        getDoc(doc(services.db, "settings", "requirements"))
      ]);

      const props = propsSnap.docs.map((d) => ({ id: d.id, ...(d.data() as any) })) as PropertyRecord[];
      const normalized = normalizeProperties(props.length ? props : FALLBACK_PROPERTIES);
      setProperties(normalized);
      setSelectedPropertyId(normalized[0]?.id || selectedPropertyId);

      setSettings(
        settingsSnap.exists()
          ? { ...DEFAULT_SETTINGS, ...(settingsSnap.data() as any) }
          : DEFAULT_SETTINGS
      );

      const reqItems = (reqSnap.exists() ? (reqSnap.data() as any).items : null) as any;
      setRequirements(Array.isArray(reqItems) ? reqItems : DEFAULT_REQUIREMENTS);
      setModeLabel("Firebase");
      setAppNotice("");
    } catch (e: any) {
      setModeLabel("Demo");
      setAppNotice("No se pudo cargar Firestore. Modo demo activo.");
      setAppError(e?.message || String(e));
    }
  }

  async function loadPrivateData() {
    if (!services.ready || !services.db) return;
    const [consSnap, reqSnap, tenSnap, docSnap, usrSnap] = await Promise.all([
      getDocs(collection(services.db, "consultations")),
      getDocs(collection(services.db, "rental_requests")),
      getDocs(collection(services.db, "tenants")),
      getDocs(collection(services.db, "documents")),
      getDocs(collection(services.db, "users"))
    ]);

    setConsultations(
      consSnap.docs.map((d) => {
        const data = d.data() as any;
        return {
          id: d.id,
          name: data.name || "Sin nombre",
          email: data.email || "",
          phone: data.phone || "",
          msg: data.message || data.msg || "",
          canal: data.channel || data.canal || "Web",
          estado: data.status || data.estado || "Nueva",
          propertyTitle: data.propertyTitle || "Consulta general",
          createdAt: asDate(data.createdAt)
        };
      })
    );

    setRequests(
      reqSnap.docs.map((d) => {
        const data = d.data() as any;
        return {
          id: d.id,
          name: data.name || "Sin nombre",
          propertyTitle: data.propertyTitle || "Propiedad",
          fecha: formatDate(asDate(data.createdAt)),
          ingreso: formatCurrency(Number(data.monthlyIncome || 0)),
          status: data.status || "En revisión"
        };
      })
    );

    setTenants(
      tenSnap.docs.map((d) => {
        const data = d.data() as any;
        return {
          id: d.id,
          name: data.name || "Sin nombre",
          dni: data.dni || "Sin DNI",
          prop: data.propertyTitle || "Sin propiedad",
          desde: data.since || "—",
          estado: data.status || "Activo"
        };
      })
    );

    setDocuments(
      docSnap.docs.map((d) => {
        const data = d.data() as any;
        return {
          id: d.id,
          inquilino: data.tenantName || "Sin inquilino",
          doc: data.name || "Documento",
          fecha: formatDate(asDate(data.createdAt)),
          estado: data.status || "Pendiente",
          icon: data.icon || "description"
        };
      })
    );

    setUsers(
      usrSnap.docs.map((d) => {
        const data = d.data() as any;
        return {
          id: d.id,
          name: data.name || "Usuario",
          email: data.email || "",
          rol: data.rol || "Agente",
          estado: data.estado || "Activo",
          notif: Array.isArray(data.notif) ? data.notif : [true, true, false, true]
        };
      })
    );
  }

  function requireAdmin(next: () => void) {
    if (canManage(currentProfile)) {
      next();
      return;
    }
    setLoginOpen(true);
    setAppError("Iniciá sesión con un usuario administrador para continuar.");
  }

  async function handleLogin() {
    if (!services.ready || !services.auth) {
      setAppError("Configurá Firebase antes de iniciar sesión.");
      return;
    }
    if (!loginEmail.trim() || !loginPassword) {
      setAppError("Completá email y contraseña.");
      return;
    }
    setLoginLoading(true);
    try {
      await signInWithEmailAndPassword(services.auth, loginEmail.trim(), loginPassword);
      setLoginOpen(false);
      setLoginPassword("");
      setScreen("dashboard");
    } catch (e: any) {
      setAppError(e?.message || String(e));
    } finally {
      setLoginLoading(false);
    }
  }

  async function handleLogout() {
    if (services.ready && services.auth) {
      await signOut(services.auth);
    }
    setScreen("landing");
    setCurrentProfile(null);
    setCurrentUser(null);
  }

  const selectedProperty = useMemo(() => {
    return (
      properties.find((p) => p.id === selectedPropertyId) ||
      properties[0] ||
      normalizeProperties(FALLBACK_PROPERTIES)[0]
    );
  }, [properties, selectedPropertyId]);

  const filteredProperties = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    const loc = searchLocation.trim().toLowerCase();
    const min = Number(String(searchMin || "").replace(/[^\d]/g, "")) || 0;
    const max = Number(String(searchMax || "").replace(/[^\d]/g, "")) || 0;
    return properties.filter((p) => {
      const hay = [p.title, p.address, p.neighborhood, p.city, p.description].join(" ").toLowerCase();
      if (q && !hay.includes(q)) return false;
      if (loc) {
        const lhay = [p.address, p.neighborhood, p.city].join(" ").toLowerCase();
        if (!lhay.includes(loc)) return false;
      }
      if (searchType && searchType !== "Todos los tipos" && p.type !== searchType) return false;
      if (min && (p.price ?? 0) < min) return false;
      if (max && (p.price ?? 0) > max) return false;
      return true;
    });
  }, [properties, searchQuery, searchLocation, searchType, searchMin, searchMax]);

  function applySearch() {
    const matches = filteredProperties;
    if (matches.length) {
      setSelectedPropertyId(matches[0].id);
      setScreen("property");
      window.scrollTo(0, 0);
      return;
    }
    setAppError("No encontramos propiedades con esos filtros.");
  }

  function openProperty(id: string) {
    setSelectedPropertyId(id);
    setScreen("property");
    setCalcMonths(12);
    window.scrollTo(0, 0);
  }

  const landingPropertyCards = useMemo(() => {
    const list = (filteredProperties.length ? filteredProperties : properties).slice(0, 4);
    return list.map((p, idx) => ({
      id: p.id,
      title: p.title,
      address: p.address,
      beds: p.bedsLabel,
      baths: p.bathsLabel,
      area: p.areaLabel,
      price: p.priceLabel,
      bg: p.bg,
      photoLabel: p.photoLabel,
      onEnter: () => setHover(idx),
      onLeave: () => setHover(-1),
      onOpen: () => openProperty(p.id),
      cardStyle: {
        cursor: "pointer",
        background: "#fff",
        borderRadius: "16px",
        overflow: "hidden",
        border: "1px solid rgba(18,58,47,.07)",
        transition: ".25s cubic-bezier(.2,.8,.2,1)",
        boxShadow:
          hover === idx
            ? "0 30px 60px -24px rgba(18,58,47,.4)"
            : "0 8px 24px -16px rgba(18,58,47,.3)",
        transform: hover === idx ? "translateY(-6px)" : "none"
      }
    }));
  }, [properties, filteredProperties, hover]);

  const gallery = useMemo(() => {
    const imgs = selectedProperty.images?.length
      ? selectedProperty.images
      : [{ label: "FOTO · PROPIEDAD" }];
    return imgs.slice(0, 5).map((img, idx) => ({
      label: img.label || "FOTO · PROPIEDAD",
      bg: bgFromImage(img.url, idx),
      span: idx === 0 ? "span 2" : "span 1",
      onOpen: () => setLightbox(idx)
    }));
  }, [selectedProperty]);

  const similar = useMemo(() => {
    return properties
      .filter((p) => p.id !== selectedProperty.id)
      .slice(0, 3)
      .map((p) => ({
        title: p.title,
        address: p.address,
        price: p.priceLabel,
        bg: p.bg,
        photoLabel: p.photoLabel,
        onOpen: () => openProperty(p.id)
      }));
  }, [properties, selectedProperty.id]);

  const actionModalTitle = useMemo(() => {
    if (actionKind === "request") return "Solicitar alquiler";
    if (actionKind === "verification") return "Comenzar verificación";
    return "Enviar consulta";
  }, [actionKind]);
  const actionModalSubtitle = useMemo(() => {
    if (actionKind === "request") return "Completá tus datos para registrar la solicitud en Firestore.";
    if (actionKind === "verification") return "Registramos tu verificación para seguimiento del equipo.";
    return "La consulta quedará guardada en Firebase.";
  }, [actionKind]);

  async function submitAction() {
    if (!actionForm.name.trim() || !actionForm.email.trim()) {
      setAppError("Completá nombre y email.");
      return;
    }

    setActionLoading(true);
    try {
      const monthlyIncome =
        Number(String(actionForm.monthlyIncome || "").replace(/[^\d]/g, "")) || 0;
      const payload: any = {
        name: actionForm.name,
        email: actionForm.email,
        phone: actionForm.phone,
        message: actionForm.message || "",
        propertyId: selectedProperty.id,
        propertyTitle: selectedProperty.title,
        monthlyIncome,
        status: "Nueva",
        channel: actionKind === "chat" ? "RAIES BOT" : "Web",
        createdAt: services.ready ? serverTimestamp() : new Date()
      };

      if (services.ready && services.db) {
        const target =
          actionKind === "request" || actionKind === "verification"
            ? "rental_requests"
            : "consultations";
        await addDoc(collection(services.db, target), payload);
        if (currentUser) await loadPrivateData();
      } else {
        if (actionKind === "request" || actionKind === "verification") {
          setRequests((prev) => [
            {
              id: `local-${Date.now()}`,
              name: payload.name,
              propertyTitle: payload.propertyTitle,
              fecha: formatDate(new Date()),
              ingreso: formatCurrency(payload.monthlyIncome),
              status: "En revisión"
            },
            ...prev
          ]);
        } else {
          setConsultations((prev) => [
            {
              id: `local-${Date.now()}`,
              name: payload.name,
              email: payload.email,
              phone: payload.phone,
              msg: payload.message,
              canal: payload.channel,
              estado: "Nueva",
              propertyTitle: payload.propertyTitle,
              createdAt: new Date()
            },
            ...prev
          ]);
        }
      }

      setActionKind("");
      setActionForm(defaultActionForm());
    } catch (e: any) {
      setAppError(e?.message || String(e));
    } finally {
      setActionLoading(false);
    }
  }

  function openWhatsapp() {
    const phone = String(settings.whatsapp || "").replace(/\D/g, "");
    if (!phone) {
      setAppError("Configura el teléfono de WhatsApp en Configuración.");
      return;
    }
    const text = encodeURIComponent(`Hola, quiero consultar por ${selectedProperty.title}.`);
    window.open(`https://wa.me/${phone}?text=${text}`, "_blank");
  }

  async function saveRequirements() {
    setSavingRequirements(true);
    try {
      if (services.ready && services.db) {
        await setDoc(doc(services.db, "settings", "requirements"), { items: requirements });
      }
    } catch (e: any) {
      setAppError(e?.message || String(e));
    } finally {
      setSavingRequirements(false);
    }
  }

  async function saveSettings() {
    setSavingSettings(true);
    try {
      if (services.ready && services.db) {
        await setDoc(doc(services.db, "settings", "general"), settings, { merge: true });
        if (currentUser) {
          await setDoc(doc(services.db, "users", currentUser.uid), { notif }, { merge: true });
        }
      }
    } catch (e: any) {
      setAppError(e?.message || String(e));
    } finally {
      setSavingSettings(false);
    }
  }

  function triggerUpload() {
    const input = fileInputRef.current || (document.getElementById("raies-property-images-react") as HTMLInputElement | null);
    input?.click();
  }

  function receiveUpload(files: FileList | null) {
    if (!files) return;
    const list = Array.from(files).slice(0, 10);
    Promise.all(
      list.map(
        (file) =>
          new Promise<{ file: File; url: string; label: string }>((resolve) => {
            const reader = new FileReader();
            reader.onload = (e) => resolve({ file, url: String(e.target?.result || ""), label: file.name });
            reader.readAsDataURL(file);
          })
      )
    ).then(setPropertyUploadPreview);
  }

  async function submitProperty() {
    requireAdmin(async () => {
      if (!propDraft.title.trim() || !propDraft.address.trim() || !propDraft.price.trim()) {
        setAppError("Completá título, dirección y precio para publicar.");
        return;
      }
      setSavingProperty(true);
      try {
        const propertyId = propDraft.id || `prop-${Date.now()}`;
        let images: { url?: string; path?: string; label?: string }[] = [];

        if (services.ready && services.storage && propertyUploadPreview.length) {
          for (let i = 0; i < propertyUploadPreview.length; i += 1) {
            const it = propertyUploadPreview[i];
            const path = `properties/${propertyId}/${Date.now()}-${it.file.name}`;
            const r = storageRef(services.storage, path);
            await uploadBytes(r, it.file);
            const url = await getDownloadURL(r);
            images.push({ url, path, label: `FOTO · ${i + 1}` });
          }
        }

        const payload: Omit<PropertyRecord, "id"> = {
          title: propDraft.title,
          type: propDraft.type,
          address: propDraft.address,
          price: Number(String(propDraft.price).replace(/[^\d]/g, "")) || 0,
          beds: Number(propDraft.beds) || 0,
          baths: Number(propDraft.baths) || 0,
          area: Number(propDraft.area) || 0,
          description: propDraft.description,
          status: "Disponible",
          featured: Boolean(propDraft.featured),
          neighborhood: propDraft.address,
          city: "Caseros",
          services: Array.isArray((propDraft as any).services)
            ? (propDraft as any).services
            : DEFAULT_SERVICES,
          docs: DEFAULT_DOCS,
          features: [
            { icon: "bed", label: "Ambientes", val: String(Number(propDraft.beds) || 0) },
            { icon: "bathtub", label: "Baños", val: String(Number(propDraft.baths) || 0) },
            { icon: "straighten", label: "Superficie", val: `${Number(propDraft.area) || 0} m²` }
          ],
          images
        };

        if (services.ready && services.db) {
          await setDoc(
            doc(services.db, "properties", propertyId),
            { ...payload, updatedAt: serverTimestamp(), createdAt: serverTimestamp() } as any,
            { merge: true }
          );
          await loadPublicData();
        } else {
          const next = normalizeProperties([{ id: propertyId, ...payload }, ...properties] as any);
          setProperties(next);
        }

        setPropFormOpen(false);
        setPropDraft({
          id: "",
          title: "",
          type: "Departamento",
          address: "",
          price: "",
          beds: "",
          baths: "",
          area: "",
          description: "",
          featured: true,
          services: DEFAULT_SERVICES.slice(0, 3)
        });
        setPropertyUploadPreview([]);
      } catch (e: any) {
        setAppError(e?.message || String(e));
      } finally {
        setSavingProperty(false);
      }
    });
  }

  async function removeProperty(id: string) {
    requireAdmin(async () => {
      const ok = window.confirm("¿Eliminar esta propiedad?");
      if (!ok) return;
      try {
        if (services.ready && services.db) {
          await deleteDoc(doc(services.db, "properties", id));
          await loadPublicData();
          return;
        }
        setProperties((prev) => prev.filter((p) => p.id !== id));
      } catch (e: any) {
        setAppError(e?.message || String(e));
      }
    });
  }

  const sidebarItems = useMemo(() => {
    const items = [
      { label: "Dashboard", icon: "dashboard" },
      { label: "Propiedades", icon: "apartment" },
      { label: "Solicitudes", icon: "description" },
      { label: "Inquilinos", icon: "group" },
      { label: "Documentación", icon: "folder" },
      { label: "Requisitos", icon: "checklist" },
      { label: "Consultas", icon: "forum" },
      { label: "Usuarios", icon: "manage_accounts" },
      { label: "Configuración", icon: "settings" }
    ];
    return items.map((it) => ({
      ...it,
      onClick: () => setTab(it.label),
      style: {
        display: "flex",
        alignItems: "center",
        gap: "13px",
        padding: "12px 16px",
        borderRadius: "11px",
        cursor: "pointer",
        fontWeight: 600,
        fontSize: "14px",
        fontFamily: "'Plus Jakarta Sans'",
        transition: ".16s",
        background: tab === it.label ? "rgba(201,163,77,.16)" : "transparent",
        color: tab === it.label ? "#E7CE92" : "rgba(255,255,255,.7)",
        boxShadow: tab === it.label ? "inset 3px 0 0 #C9A34D" : "none"
      }
    }));
  }, [tab]);

  const tabSubtitle = useMemo(() => {
    const subtitles: Record<string, string> = {
      Dashboard: "Bienvenido de nuevo, administrá tu inmobiliaria",
      Propiedades: "Gestioná tu cartera de propiedades",
      Solicitudes: "Solicitudes de alquiler recibidas",
      Inquilinos: "Inquilinos activos y en proceso",
      Documentación: "Documentos cargados y su verificación",
      Requisitos: "Configurá los requisitos para alquilar",
      Consultas: "Bandeja de consultas de clientes",
      Usuarios: "Gestión de usuarios y permisos",
      Configuración: "Preferencias de la cuenta y la inmobiliaria"
    };
    return subtitles[tab] || "";
  }, [tab]);

  const dashStats = useMemo(() => {
    return [
      { label: "Total propiedades", val: String(properties.length), delta: modeLabel, sub: "fuente de datos", icon: "apartment" },
      { label: "Consultas", val: String(consultations.length), delta: "Firestore", sub: "leads acumulados", icon: "forum" },
      { label: "Solicitudes", val: String(requests.length), delta: "Storage", sub: "formularios", icon: "description" },
      { label: "Usuarios", val: String(users.length), delta: currentUser ? "Online" : "Sin sesión", sub: "Auth activo", icon: "verified" }
    ];
  }, [properties.length, consultations.length, requests.length, users.length, modeLabel, currentUser]);

  const consultasPreview = useMemo(() => {
    return consultations.slice(0, 4).map((c) => ({
      txt: `${c.propertyTitle}: ${c.msg}`,
      time: formatRelative(c.createdAt)
    }));
  }, [consultations]);

  const solicitudesPreview = useMemo(() => {
    return requests.slice(0, 3).map((r) => ({
      name: r.name,
      prop: r.propertyTitle,
      status: r.status,
      badgeStyle: badgeStyle(statusKind(r.status))
    }));
  }, [requests]);

  const dashProps = useMemo(() => {
    return properties.slice(0, 3).map((p) => ({
      title: p.title,
      address: p.address,
      price: p.priceLabel,
      bg: p.bg
    }));
  }, [properties]);

  const quickActions = useMemo(() => {
    return [
      { label: "Ver solicitudes", icon: "description", onClick: () => setTab("Solicitudes") },
      { label: "Ver consultas", icon: "forum", onClick: () => setTab("Consultas") },
      { label: "Gestionar requisitos", icon: "checklist", onClick: () => setTab("Requisitos") }
    ];
  }, []);

  const allPropertiesRows = useMemo(() => {
    const term = propertySearch.trim().toLowerCase();
    return properties
      .filter((p) => !term || [p.title, p.address, p.type].join(" ").toLowerCase().includes(term))
      .map((p) => ({
        id: p.id,
        title: p.title,
        tipo: p.type,
        address: p.address,
        price: p.priceLabel,
        estado: p.status,
        badge: badgeStyle(p.statusKind),
        bg: p.bg,
        onEdit: () => {
          setTab("Propiedades");
          setPropFormOpen(true);
          setPropDraft({
            id: p.id,
            title: p.title,
            type: p.type,
            address: p.address,
            price: String(p.price),
            beds: String(p.beds),
            baths: String(p.baths),
            area: String(p.area),
            description: p.description || "",
            featured: p.featured,
            services: p.services?.slice?.() || DEFAULT_SERVICES.slice(0, 3)
          });
          setPropertyUploadPreview([]);
        },
        onRemove: () => void removeProperty(p.id)
      }));
  }, [properties, propertySearch]);

  const solicitudesFull = useMemo(() => {
    return requests.map((r) => ({
      initial: r.name[0] || "S",
      name: r.name,
      prop: r.propertyTitle,
      fecha: r.fecha,
      ingreso: r.ingreso,
      status: r.status,
      badge: badgeStyle(statusKind(r.status))
    }));
  }, [requests]);

  const tenantRows = useMemo(() => {
    const term = tenantSearch.trim().toLowerCase();
    return tenants
      .filter((t) => !term || [t.name, t.prop, t.dni].join(" ").toLowerCase().includes(term))
      .map((t) => ({
        initial: t.name[0] || "I",
        name: t.name,
        dni: t.dni,
        prop: t.prop,
        desde: t.desde,
        estado: t.estado,
        badge: badgeStyle(statusKind(t.estado))
      }));
  }, [tenants, tenantSearch]);

  const documentRows = useMemo(() => {
    return documents.map((d) => ({
      inquilino: d.inquilino,
      doc: d.doc,
      fecha: d.fecha,
      estado: d.estado,
      badge: badgeStyle(statusKind(d.estado)),
      icon: d.icon
    }));
  }, [documents]);

  const requirementRows = useMemo(() => {
    return requirements.map((r, idx) => {
      const on = r.on;
      return {
        label: r.label,
        desc: r.desc,
        onToggle: () =>
          setRequirements((prev) => {
            const next = [...prev];
            next[idx] = { ...next[idx], on: !next[idx].on };
            return next;
          }),
        switchStyle: {
          width: "44px",
          height: "26px",
          borderRadius: "999px",
          background: on ? "#205843" : "#cdd2d3",
          position: "relative",
          cursor: "pointer",
          flex: "none"
        },
        knobStyle: {
          position: "absolute",
          top: "3px",
          left: on ? "21px" : "3px",
          width: "20px",
          height: "20px",
          borderRadius: "50%",
          background: "#fff",
          boxShadow: "0 1px 3px rgba(0,0,0,.3)"
        }
      };
    });
  }, [requirements]);

  const consultasInbox = useMemo(() => {
    return consultations.map((c) => ({
      icon: c.canal === "WhatsApp" ? "chat" : c.canal === "Email" ? "mail" : "forum",
      name: c.name,
      canal: c.canal,
      msg: c.msg,
      time: formatRelative(c.createdAt),
      estado: c.estado,
      badge: badgeStyle(statusKind(c.estado))
    }));
  }, [consultations]);

  const userRows = useMemo(() => {
    const term = userSearch.trim().toLowerCase();
    return users
      .filter((u) => !term || [u.name, u.email, u.rol].join(" ").toLowerCase().includes(term))
      .map((u) => ({
        initial: u.name[0] || "U",
        name: u.name,
        email: u.email,
        rol: u.rol,
        estado: u.estado,
        badge: badgeStyle(statusKind(u.estado))
      }));
  }, [users, userSearch]);

  const notifRows = useMemo(() => {
    const labels = ["Nuevas consultas", "Nuevas solicitudes", "Documentación verificada", "Resumen semanal"];
    return labels.map((label, idx) => {
      const on = Boolean(notif[idx]);
      return {
        label,
        onToggle: () =>
          setNotif((prev) => {
            const next = [...prev];
            next[idx] = !next[idx];
            return next;
          }),
        switchStyle: {
          width: "44px",
          height: "26px",
          borderRadius: "999px",
          background: on ? "#205843" : "#cdd2d3",
          position: "relative",
          cursor: "pointer",
          flex: "none"
        },
        knobStyle: {
          position: "absolute",
          top: "3px",
          left: on ? "21px" : "3px",
          width: "20px",
          height: "20px",
          borderRadius: "50%",
          background: "#fff",
          boxShadow: "0 1px 3px rgba(0,0,0,.3)"
        }
      };
    });
  }, [notif]);

  const propTypes = useMemo(() => {
    const types = ["Departamento", "Casa", "PH", "Local", "Terreno"];
    return types.map((t) => {
      const selected = propDraft.type === t;
      return {
        label: t,
        onClick: () => setPropDraft((p) => ({ ...p, type: t })),
        chipStyle: {
          padding: "10px 16px",
          borderRadius: "10px",
          cursor: "pointer",
          fontWeight: 600,
          fontSize: "13px",
          fontFamily: "'Plus Jakarta Sans'",
          transition: ".16s",
          border: `1.5px solid ${selected ? "#205843" : "#E2E4E6"}`,
          background: selected ? "rgba(32,88,67,.08)" : "#fff",
          color: selected ? "#205843" : "#5a6460"
        }
      };
    });
  }, [propDraft.type]);

  const editableServices = useMemo(() => {
    const selected = new Set(DEFAULT_SERVICES);
    const selectedNow = (propDraft as any).services as string[] | undefined;
    const list = Array.isArray(selectedNow) ? selectedNow : DEFAULT_SERVICES.slice(0, 3);
    return DEFAULT_SERVICES.map((srv) => {
      const on = list.includes(srv);
      return {
        label: srv,
        icon: on ? "check" : "add",
        onClick: () => {
          const next = on ? list.filter((x) => x !== srv) : [...list, srv];
          setPropDraft((p: any) => ({ ...p, services: next }));
        },
        style: {
          display: "inline-flex",
          alignItems: "center",
          gap: "7px",
          padding: "9px 14px",
          borderRadius: "10px",
          border: `1.5px solid ${on ? "#205843" : "#E2E4E6"}`,
          background: on ? "rgba(32,88,67,.08)" : "#fff",
          color: on ? "#205843" : "#5a6460",
          font: "600 12.5px/1 'Plus Jakarta Sans'",
          cursor: "pointer"
        } as any
      };
    });
  }, [propDraft]);

  const uploadThumbs = useMemo(() => {
    return propertyUploadPreview.slice(0, 3).map((p, idx) => ({
      bg: p.url ? `url(${p.url}) center/cover no-repeat` : FALLBACK_GRADIENTS[idx],
      label: p.label
    }));
  }, [propertyUploadPreview]);

  const propertyFeaturedTrack = useMemo<CSSProperties>(
    () => ({
      width: "44px",
      height: "26px",
      borderRadius: "999px",
      background: propDraft.featured ? "#205843" : "#cdd2d3",
      position: "relative",
      flex: "none",
      cursor: "pointer"
    }),
    [propDraft.featured]
  );
  const propertyFeaturedKnob = useMemo<CSSProperties>(
    () => ({
      position: "absolute",
      top: "3px",
      left: propDraft.featured ? "21px" : "3px",
      width: "20px",
      height: "20px",
      borderRadius: "50%",
      background: "#fff",
      boxShadow: "0 1px 3px rgba(0,0,0,.3)"
    }),
    [propDraft.featured]
  );

  const nav = useMemo(
    () => [
      { label: "Inicio", active: true },
      { label: "Propiedades" },
      { label: "Requisitos" },
      { label: "Cómo alquilar" },
      { label: "Contacto" }
    ],
    []
  );

  const heroCards = useMemo(
    () => [
      { icon: "verified_user", title: "Alquiler seguro", body: "Verificamos inquilinos y documentación." },
      { icon: "forum", title: "Consultas en tiempo real", body: "Centralizá formularios, bot y leads." },
      { icon: "home_work", title: "Publicaciones administrables", body: "Subí propiedades e imágenes con Storage." }
    ],
    []
  );

  const steps = useMemo(
    () => [
      { icon: "badge", title: "1. Completá tu información", body: "Ingresá tus datos personales y laborales." },
      { icon: "upload_file", title: "2. Subí tu documentación", body: "Adjuntá los documentos solicitados." },
      { icon: "manage_search", title: "3. Verificación", body: "El equipo revisa tu documentación desde el dashboard." },
      { icon: "schedule", title: "4. Seguimiento", body: "Todo queda registrado y trazable." }
    ],
    []
  );

  const quickReplies = useMemo(() => {
    return [
      { label: "Departamentos", onClick: () => setSearchType("Departamento") },
      { label: "Casas", onClick: () => setSearchType("Casa") },
      { label: "Zonas", onClick: () => setSearchLocation("Caseros") },
      { label: "Consultar requisitos", onClick: () => setActionKind("verification") }
    ];
  }, []);

  const authPrimaryLabel = currentUser ? "Dashboard" : "Iniciar sesión";

  return (
    <div style={{ minHeight: "100vh" }}>
      {screen === "landing" && (
        <LandingScreen
          nav={nav}
          heroCards={heroCards}
          properties={landingPropertyCards as any}
          steps={steps}
          quickReplies={quickReplies}
          searchQuery={searchQuery}
          searchLocation={searchLocation}
          searchType={searchType}
          searchMin={searchMin}
          searchMax={searchMax}
          onSearchQuery={setSearchQuery}
          onSearchLocation={setSearchLocation}
          onSearchType={setSearchType}
          onSearchMin={setSearchMin}
          onSearchMax={setSearchMax}
          onApplySearch={applySearch}
          onGoProperty={() => setScreen("property")}
          onGoDashboard={() => requireAdmin(() => setScreen("dashboard"))}
          authPrimaryLabel={authPrimaryLabel}
          onAuthPrimaryAction={() => {
            if (currentUser) {
              requireAdmin(() => setScreen("dashboard"));
              return;
            }
            setLoginOpen(true);
          }}
          onOpenVerification={() => setActionKind("verification")}
          settings={settings}
          onOpenWhatsapp={openWhatsapp}
          chatOpen={chatOpen}
          chatIcon={chatOpen ? "close" : "chat"}
          onToggleChat={() => setChatOpen((v) => !v)}
          chatDraft={chatDraft}
          onChatDraft={setChatDraft}
          onSubmitChat={() => {
            setActionKind("chat");
            setActionForm((p) => ({ ...p, message: chatDraft || "Consulta desde el chat" }));
          }}
        />
      )}

      {screen === "property" && (
        <PropertyScreen
          nav={nav}
          onGoLanding={() => setScreen("landing")}
          breadcrumb={selectedProperty.breadcrumb}
          title={selectedProperty.title}
          status={selectedProperty.status}
          statusStyle={badgeStyle(selectedProperty.statusKind)}
          address={selectedProperty.locationLabel}
          gallery={gallery}
          description={selectedProperty.description || ""}
          features={selectedProperty.features?.length ? selectedProperty.features : DEFAULT_FEATURES}
          services={selectedProperty.services?.length ? selectedProperty.services : DEFAULT_SERVICES}
          docs={selectedProperty.docs?.length ? selectedProperty.docs : DEFAULT_DOCS}
          similar={similar}
          price={selectedProperty.priceLabel}
          months={calcMonths}
          total={formatCurrency((selectedProperty.price || 0) * calcMonths)}
          onDecMonths={() => setCalcMonths((m) => Math.max(1, m - 1))}
          onIncMonths={() => setCalcMonths((m) => Math.min(36, m + 1))}
          onOpenRequest={() => setActionKind("request")}
          onOpenConsult={() => setActionKind("consult")}
          onOpenWhatsapp={openWhatsapp}
          lightboxOpen={lightbox >= 0}
          lightboxBg={gallery[lightbox]?.bg || gallery[0]?.bg || ""}
          lightboxLabel={gallery[lightbox]?.label || gallery[0]?.label || ""}
          onCloseLightbox={() => setLightbox(-1)}
          onPrevImg={() => setLightbox((v) => (v + gallery.length - 1) % gallery.length)}
          onNextImg={() => setLightbox((v) => (v + 1) % gallery.length)}
          chatOpen={chatOpen}
          chatIcon={chatOpen ? "close" : "chat"}
          onToggleChat={() => setChatOpen((v) => !v)}
        />
      )}

      {screen === "dashboard" && (
        <DashboardScreen
          sidebarItems={sidebarItems as any}
          activeTab={tab}
          tabSubtitle={tabSubtitle}
          adminInitial={currentProfile?.name?.[0] || "A"}
          adminName={currentProfile?.name || "Admin RAIES"}
          adminRole={currentProfile?.rol?.toLowerCase() || "administrador"}
          onLogout={handleLogout}
          stats={dashStats}
          consultas={consultasPreview}
          solicitudes={solicitudesPreview}
          dashProps={dashProps}
          quickActions={quickActions}
          tabDashboard={tab === "Dashboard"}
          tabPropiedades={tab === "Propiedades"}
          tabSolicitudes={tab === "Solicitudes"}
          tabInquilinos={tab === "Inquilinos"}
          tabDocumentacion={tab === "Documentación"}
          tabRequisitos={tab === "Requisitos"}
          tabConsultas={tab === "Consultas"}
          tabUsuarios={tab === "Usuarios"}
          tabConfig={tab === "Configuración"}
          propertySearch={propertySearch}
          onPropertySearch={setPropertySearch}
          onOpenPropForm={() => requireAdmin(() => setPropFormOpen(true))}
          propFormOpen={propFormOpen}
          onClosePropForm={() => setPropFormOpen(false)}
          propTypes={propTypes as any}
          propDraft={propDraft}
          onPropDraft={(patch) => setPropDraft((p) => ({ ...p, ...patch }))}
          editableServices={editableServices as any}
          onToggleService={() => {}}
          propertyUploadPreview={uploadThumbs}
          onTriggerUpload={triggerUpload}
          onReceiveUpload={(files) => receiveUpload(files)}
          propertyFeaturedTrack={propertyFeaturedTrack}
          propertyFeaturedKnob={propertyFeaturedKnob}
          onToggleFeatured={() => setPropDraft((p) => ({ ...p, featured: !p.featured }))}
          submitPropertyLabel={savingProperty ? "Guardando..." : "Publicar propiedad"}
          onSubmitProperty={submitProperty}
          allProperties={allPropertiesRows as any}
          solicitudesFull={solicitudesFull as any}
          tenantSearch={tenantSearch}
          onTenantSearch={setTenantSearch}
          inquilinos={tenantRows as any}
          documentacion={documentRows as any}
          requisitos={requirementRows as any}
          saveRequirementsLabel={savingRequirements ? "Guardando..." : "Guardar cambios"}
          onSaveRequirements={() => requireAdmin(() => void saveRequirements())}
          consultasInbox={consultasInbox as any}
          userSearch={userSearch}
          onUserSearch={setUserSearch}
          usuarios={userRows as any}
          notif={notifRows as any}
          settings={settings}
          onSettings={(patch) => setSettings((s) => ({ ...s, ...patch }))}
          saveSettingsLabel={savingSettings ? "Guardando..." : "Guardar cambios"}
          onSaveSettings={() => requireAdmin(() => void saveSettings())}
        />
      )}

      <LoginModal
        open={loginOpen}
        email={loginEmail}
        password={loginPassword}
        onEmailChange={setLoginEmail}
        onPasswordChange={setLoginPassword}
        onClose={() => setLoginOpen(false)}
        onSubmit={handleLogin}
        submitLabel={loginLoading ? "Ingresando..." : "Ingresar"}
      />

      <ActionModal
        open={Boolean(actionKind)}
        title={actionModalTitle}
        subtitle={actionModalSubtitle}
        form={actionForm}
        onChange={(patch) => setActionForm((p) => ({ ...p, ...patch }))}
        onClose={() => setActionKind("")}
        onSubmit={submitAction}
        submitLabel={actionLoading ? "Enviando..." : "Enviar"}
      />

      <Toast message={appError} kind="error" />
      <Toast message={appNotice ? `Estado ${modeLabel} · ${appNotice}` : ""} kind="notice" />
    </div>
  );
}
