(function () {
  var REQUIRED_FIREBASE_KEYS = [
    "apiKey",
    "authDomain",
    "projectId",
    "storageBucket",
    "messagingSenderId",
    "appId"
  ];

  var FALLBACK_GRADIENTS = [
    "linear-gradient(150deg,#2d5a48,#16382c)",
    "linear-gradient(150deg,#3a4a44,#1c2b26)",
    "linear-gradient(150deg,#46604f,#22352b)",
    "linear-gradient(150deg,#54473a,#2a2018)",
    "linear-gradient(150deg,#26795c,#143a2c)"
  ];

  var DEFAULT_SETTINGS = {
    name: "Servicios Inmobiliarios RAIES",
    email: "contacto@raies.com",
    phone: "+54 11 5555-0123",
    address: "Av. Mitre 1200, Caseros",
    whatsapp: "5491155550123"
  };

  var DEFAULT_REQUIREMENTS = [
    {
      label: "Recibo de sueldo (ultimos 3 meses)",
      desc: "El ingreso debe superar 3x el valor del alquiler.",
      on: true
    },
    {
      label: "Garantia propietaria",
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
      desc: "Situacion fiscal activa.",
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

  var DEFAULT_FEATURES = [
    { icon: "bed", label: "Ambientes", val: "3" },
    { icon: "bathtub", label: "Banos", val: "1" },
    { icon: "straighten", label: "Superficie", val: "85 m2" },
    { icon: "yard", label: "Patio", val: "Si" },
    { icon: "garage", label: "Garage", val: "No" },
    { icon: "pool", label: "Pileta", val: "No" },
    { icon: "pets", label: "Mascotas", val: "Permitidas" },
    { icon: "stairs", label: "Planta", val: "Alta" }
  ];

  var DEFAULT_SERVICES = [
    "Agua corriente",
    "Gas natural",
    "Luz",
    "Internet fibra",
    "Expensas incluidas",
    "Seguridad 24h"
  ];

  var DEFAULT_DOCS = [
    "DNI (frente y dorso)",
    "Recibo de sueldo (ultimos 3)",
    "Garantia propietaria",
    "Constancia de CUIL"
  ];

  var FALLBACK_PROPERTIES = [
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
        "Luminoso departamento de 2 dormitorios en planta alta, ubicado en pleno centro de Caseros. Cuenta con living-comedor amplio, cocina integrada totalmente equipada y balcon con vista abierta.",
      services: DEFAULT_SERVICES,
      docs: DEFAULT_DOCS,
      features: DEFAULT_FEATURES,
      images: [
        { label: "FOTO · LIVING" },
        { label: "FOTO · COCINA" },
        { label: "FOTO · DORMITORIO" },
        { label: "FOTO · BANO" },
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
        "Casa comoda, con patio, ventilacion cruzada y excelente acceso. Ideal para familias que buscan amplitud y tranquilidad.",
      services: DEFAULT_SERVICES,
      docs: DEFAULT_DOCS,
      features: DEFAULT_FEATURES,
      images: [
        { label: "FOTO · FACHADA" },
        { label: "FOTO · COCINA" },
        { label: "FOTO · LIVING" }
      ]
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
        "PH con patio y distribucion funcional, ideal para quienes priorizan espacios exteriores y privacidad.",
      services: DEFAULT_SERVICES,
      docs: DEFAULT_DOCS,
      features: DEFAULT_FEATURES,
      images: [{ label: "FOTO · PATIO" }, { label: "FOTO · LIVING" }]
    }
  ];

  var FALLBACK_CONSULTATIONS = [
    {
      id: "con-1",
      name: "Lucia Fernandez",
      email: "lucia@email.com",
      phone: "+54 11 1234 5678",
      msg: "Hola, el departamento del centro sigue disponible?",
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
      msg: "Busco casas de 2 dormitorios en Zona Norte.",
      canal: "RAIES BOT",
      estado: "Respondida",
      propertyTitle: "Casa 2 dormitorios",
      createdAt: new Date(Date.now() - 15 * 60 * 1000)
    }
  ];

  var FALLBACK_REQUESTS = [
    {
      id: "req-1",
      name: "Maria Gonzalez",
      propertyTitle: "Departamento 2 dorm. - Centro",
      fecha: "29/06/2026",
      ingreso: "$1.450.000",
      status: "En revision"
    },
    {
      id: "req-2",
      name: "Juan Perez",
      propertyTitle: "Casa 2 dorm. - Zona Norte",
      fecha: "28/06/2026",
      ingreso: "$1.980.000",
      status: "Verificado"
    },
    {
      id: "req-3",
      name: "Ana Lopez",
      propertyTitle: "PH 2 dorm. - Zona Sur",
      fecha: "27/06/2026",
      ingreso: "$1.200.000",
      status: "Pendiente"
    }
  ];

  var FALLBACK_TENANTS = [
    {
      id: "ten-1",
      name: "Maria Gonzalez",
      dni: "32.456.789",
      prop: "Departamento 2 dorm. - Centro",
      desde: "Mar 2025",
      estado: "Activo"
    },
    {
      id: "ten-2",
      name: "Juan Perez",
      dni: "28.123.456",
      prop: "Casa 2 dorm. - Zona Norte",
      desde: "Ene 2025",
      estado: "Activo"
    }
  ];

  var FALLBACK_DOCUMENTS = [
    {
      id: "doc-1",
      inquilino: "Maria Gonzalez",
      doc: "DNI (frente y dorso)",
      fecha: "12/06/2026",
      estado: "Verificado",
      icon: "badge"
    },
    {
      id: "doc-2",
      inquilino: "Ana Lopez",
      doc: "Garantia propietaria",
      fecha: "28/06/2026",
      estado: "En revision",
      icon: "gavel"
    }
  ];

  var FALLBACK_USERS = [
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
      name: "Sofia Mendez",
      email: "sofia@raies.com",
      rol: "Agente",
      estado: "Activo",
      notif: [true, true, true, false]
    }
  ];

  var firebaseCache = {
    initialized: false,
    ready: false,
    error: "",
    app: null,
    auth: null,
    db: null,
    storage: null
  };

  function isFirebaseConfigComplete(config) {
    if (!config) {
      return false;
    }
    for (var i = 0; i < REQUIRED_FIREBASE_KEYS.length; i += 1) {
      if (!String(config[REQUIRED_FIREBASE_KEYS[i]] || "").trim()) {
        return false;
      }
    }
    return true;
  }

  function getFirebaseServices() {
    if (firebaseCache.initialized) {
      return firebaseCache;
    }

    firebaseCache.initialized = true;

    if (!window.firebase) {
      firebaseCache.error = "No se cargaron los SDK de Firebase.";
      return firebaseCache;
    }

    var config = window.RAIES_FIREBASE_CONFIG || {};
    if (!isFirebaseConfigComplete(config)) {
      firebaseCache.error =
        "Completa firebase-config.js con las credenciales de tu proyecto.";
      return firebaseCache;
    }

    try {
      firebaseCache.app = window.firebase.apps.length
        ? window.firebase.app()
        : window.firebase.initializeApp(config);
      firebaseCache.auth = window.firebase.auth();
      firebaseCache.db = window.firebase.firestore();
      firebaseCache.storage = window.firebase.storage();
      firebaseCache.ready = true;
      firebaseCache.error = "";
    } catch (error) {
      firebaseCache.error = error && error.message ? error.message : String(error);
    }

    return firebaseCache;
  }

  function formatCurrency(value) {
    var number = Number(value) || 0;
    return number.toLocaleString("es-AR", {
      style: "currency",
      currency: "ARS",
      maximumFractionDigits: 0
    });
  }

  function formatDate(value) {
    if (!value) {
      return "Sin fecha";
    }

    var date = value && typeof value.toDate === "function" ? value.toDate() : new Date(value);
    if (Number.isNaN(date.getTime())) {
      return "Sin fecha";
    }

    return date.toLocaleDateString("es-AR");
  }

  function formatRelativeDate(value) {
    if (!value) {
      return "Reciente";
    }

    var date = value && typeof value.toDate === "function" ? value.toDate() : new Date(value);
    if (Number.isNaN(date.getTime())) {
      return "Reciente";
    }

    var diff = Math.max(0, Date.now() - date.getTime());
    var minutes = Math.round(diff / 60000);
    if (minutes < 1) {
      return "Ahora";
    }
    if (minutes < 60) {
      return "Hace " + minutes + " min";
    }
    var hours = Math.round(minutes / 60);
    if (hours < 24) {
      return "Hace " + hours + " h";
    }
    var days = Math.round(hours / 24);
    return "Hace " + days + " dia" + (days === 1 ? "" : "s");
  }

  function statusKind(status) {
    var map = {
      "Disponible": "ok",
      "Activo": "ok",
      "Verificado": "ok",
      "Respondida": "ok",
      "Reservado": "warn",
      "En revision": "warn",
      "Pendiente": "danger",
      "Nueva": "warn",
      "Inactivo": "info",
      "Alquilado": "info",
      "En proceso": "warn"
    };
    return map[status] || "info";
  }

  function badgeStyle(kind) {
    var palette = {
      ok: ["#1c7a4d", "rgba(32,120,77,.13)"],
      warn: ["#9a6b12", "rgba(201,163,77,.18)"],
      info: ["#3a564c", "rgba(18,58,47,.08)"],
      danger: ["#b23b3b", "rgba(178,59,59,.12)"]
    };
    var chosen = palette[kind] || palette.info;
    return (
      "display:inline-flex;align-items:center;gap:5px;padding:5px 11px;border-radius:7px;" +
      "font:700 11px/1 'Plus Jakarta Sans';color:" + chosen[0] + ";background:" + chosen[1]
    );
  }

  function getBackgroundFromImage(imageUrl, index) {
    var fallback = FALLBACK_GRADIENTS[index % FALLBACK_GRADIENTS.length];
    if (!imageUrl) {
      return fallback;
    }
    return (
      "linear-gradient(180deg,rgba(12,37,29,.18),rgba(12,37,29,.18)),url(" +
      imageUrl +
      ") center/cover no-repeat"
    );
  }

  function ensureArray(value, fallback) {
    return Array.isArray(value) && value.length ? value : fallback.slice();
  }

  function createPropertyDraft() {
    return {
      id: "",
      title: "",
      type: "Departamento",
      address: "",
      price: "",
      beds: "",
      baths: "",
      area: "",
      description: "",
      status: "Disponible",
      featured: true,
      services: DEFAULT_SERVICES.slice(0, 3),
      images: []
    };
  }

  function createInitialState() {
    return {
      screen: "landing",
      chatOpen: true,
      hover: -1,
      lightbox: -1,
      tab: "Dashboard",
      calcMonths: 12,
      propForm: false,
      propType: "Departamento",
      properties: normalizeProperties(FALLBACK_PROPERTIES),
      consultations: FALLBACK_CONSULTATIONS.slice(),
      requests: FALLBACK_REQUESTS.slice(),
      tenants: FALLBACK_TENANTS.slice(),
      documents: FALLBACK_DOCUMENTS.slice(),
      users: FALLBACK_USERS.slice(),
      settings: copy(DEFAULT_SETTINGS),
      requirements: DEFAULT_REQUIREMENTS.slice(),
      notif: [true, true, false, true],
      selectedPropertyId: "prop-1",
      searchQuery: "",
      searchLocation: "",
      searchType: "Todos los tipos",
      searchMin: "",
      searchMax: "",
      propertySearch: "",
      tenantSearch: "",
      userSearch: "",
      chatDraft: "",
      loginOpen: false,
      loginEmail: "",
      loginPassword: "",
      loginLoading: false,
      authReady: false,
      currentUser: null,
      currentUserProfile: null,
      modeLabel: "Demo",
      appError: "",
      appNotice:
        "Modo demo activo. Configura Firebase para persistencia, auth y storage.",
      actionModal: "",
      actionForm: {
        name: "",
        email: "",
        phone: "",
        message: "",
        monthlyIncome: ""
      },
      actionLoading: false,
      propDraft: createPropertyDraft(),
      propertyUploadPreview: [],
      savingSettings: false,
      savingRequirements: false,
      savingProperty: false
    };
  }

  function copy(obj) {
    return JSON.parse(JSON.stringify(obj));
  }

  function normalizeProperty(docLike, index) {
    var raw = copy(docLike);
    var imageList = ensureArray(raw.images, [{ label: "FOTO · PROPIEDAD" }]);
    var firstImage = imageList[0] || {};
    var priceValue = Number(raw.price) || 0;
    return {
      id: raw.id || "prop-" + (index + 1),
      title: raw.title || "Propiedad",
      address: raw.address || "Sin direccion",
      beds: String(raw.beds || 0),
      baths: String(raw.baths || 0),
      area: String(raw.area || 0),
      areaLabel: String(raw.area || 0) + " m²",
      priceRaw: priceValue,
      price: formatCurrency(priceValue),
      type: raw.type || "Departamento",
      status: raw.status || "Disponible",
      featured: Boolean(raw.featured),
      neighborhood: raw.neighborhood || "Centro",
      city: raw.city || "Caseros",
      description: raw.description || "Sin descripcion",
      services: ensureArray(raw.services, DEFAULT_SERVICES),
      docs: ensureArray(raw.docs, DEFAULT_DOCS),
      features: ensureArray(raw.features, DEFAULT_FEATURES),
      images: imageList,
      bg: getBackgroundFromImage(firstImage.url, index),
      photoLabel: firstImage.label || "FOTO · PROPIEDAD",
      breadcrumb:
        "Propiedades · " + (raw.type || "Departamento") + " · " + (raw.neighborhood || "Centro"),
      locationLabel: (raw.address || "Sin direccion") + " · " + (raw.city || "Caseros"),
      statusKind: statusKind(raw.status || "Disponible")
    };
  }

  function normalizeProperties(list) {
    return (list || []).map(function (item, index) {
      return normalizeProperty(item, index);
    });
  }

  function sanitizeUserProfile(userDoc, user) {
    return {
      uid: user ? user.uid : "",
      name:
        (userDoc && userDoc.name) ||
        (user && (user.displayName || user.email && user.email.split("@")[0])) ||
        "Admin RAIES",
      email: (userDoc && userDoc.email) || (user && user.email) || "",
      rol: (userDoc && userDoc.rol) || "Administrador",
      estado: (userDoc && userDoc.estado) || "Activo",
      notif: ensureArray((userDoc && userDoc.notif) || [], [true, true, false, true])
    };
  }

  async function loadPublicData(component) {
    var services = getFirebaseServices();
    if (!services.ready) {
      component.setState({
        authReady: true,
        modeLabel: "Demo",
        appNotice: services.error
          ? "Firebase no configurado. La interfaz funciona en modo demo."
          : "Modo demo activo."
      });
      return;
    }

    var db = services.db;
    var propSnap = await db.collection("properties").get();
    var settingsSnap = await db.collection("settings").doc("general").get();
    var requirementsSnap = await db.collection("settings").doc("requirements").get();

    var properties = normalizeProperties(
      propSnap.docs.map(function (doc) {
        var data = doc.data() || {};
        data.id = doc.id;
        return data;
      })
    );

    component.setState({
      properties: properties.length ? properties : normalizeProperties(FALLBACK_PROPERTIES),
      selectedPropertyId:
        properties.length ? properties[0].id : component.state.selectedPropertyId,
      settings: settingsSnap.exists
        ? Object.assign(copy(DEFAULT_SETTINGS), settingsSnap.data() || {})
        : copy(DEFAULT_SETTINGS),
      requirements:
        requirementsSnap.exists && Array.isArray((requirementsSnap.data() || {}).items)
          ? requirementsSnap.data().items
          : DEFAULT_REQUIREMENTS.slice(),
      modeLabel: "Firebase",
      appNotice: "",
      authReady: true
    });
  }

  async function loadPrivateData(component, user) {
    var services = getFirebaseServices();
    if (!services.ready || !user) {
      return;
    }

    var db = services.db;
    var userDocSnap = await db.collection("users").doc(user.uid).get();
    var userProfile = sanitizeUserProfile(userDocSnap.exists ? userDocSnap.data() : null, user);

    if (!userDocSnap.exists) {
      await db.collection("users").doc(user.uid).set(
        {
          name: userProfile.name,
          email: userProfile.email,
          rol: userProfile.rol,
          estado: userProfile.estado,
          notif: userProfile.notif
        },
        { merge: true }
      );
    }

    var docs = await Promise.all([
      db.collection("consultations").get(),
      db.collection("rental_requests").get(),
      db.collection("tenants").get(),
      db.collection("documents").get(),
      db.collection("users").get()
    ]);

    component.setState({
      currentUser: user,
      currentUserProfile: userProfile,
      notif: userProfile.notif,
      consultations: docs[0].docs.map(function (doc) {
        var data = doc.data() || {};
        return {
          id: doc.id,
          name: data.name || "Sin nombre",
          email: data.email || "",
          phone: data.phone || "",
          msg: data.message || data.msg || "",
          canal: data.channel || "Web",
          estado: data.status || "Nueva",
          propertyTitle: data.propertyTitle || "Consulta general",
          createdAt: data.createdAt || new Date()
        };
      }),
      requests: docs[1].docs.map(function (doc) {
        var data = doc.data() || {};
        return {
          id: doc.id,
          name: data.name || "Sin nombre",
          propertyTitle: data.propertyTitle || "Propiedad",
          fecha: formatDate(data.createdAt || new Date()),
          ingreso: formatCurrency(data.monthlyIncome || 0),
          status: data.status || "En revision"
        };
      }),
      tenants: docs[2].docs.map(function (doc) {
        var data = doc.data() || {};
        return {
          id: doc.id,
          name: data.name || "Sin nombre",
          dni: data.dni || "Sin DNI",
          prop: data.propertyTitle || "Sin propiedad",
          desde: data.since || "—",
          estado: data.status || "Activo"
        };
      }),
      documents: docs[3].docs.map(function (doc) {
        var data = doc.data() || {};
        return {
          id: doc.id,
          inquilino: data.tenantName || "Sin inquilino",
          doc: data.name || "Documento",
          fecha: formatDate(data.createdAt || new Date()),
          estado: data.status || "Pendiente",
          icon: data.icon || "description"
        };
      }),
      users: docs[4].docs.map(function (doc) {
        var data = doc.data() || {};
        return {
          id: doc.id,
          name: data.name || "Usuario",
          email: data.email || "",
          rol: data.rol || "Agente",
          estado: data.estado || "Activo",
          notif: ensureArray(data.notif, [true, true, false, true])
        };
      })
    });
  }

  async function bootstrap(component) {
    try {
      await loadPublicData(component);
    } catch (error) {
      component.setState({
        authReady: true,
        appError: error && error.message ? error.message : String(error),
        modeLabel: "Demo"
      });
    }

    var services = getFirebaseServices();
    if (!services.ready) {
      return;
    }

    component.__raiesAuthUnsub = services.auth.onAuthStateChanged(async function (user) {
      try {
        if (!user) {
          component.setState({
            currentUser: null,
            currentUserProfile: null,
            notif: [true, true, false, true]
          });
          return;
        }
        await loadPrivateData(component, user);
      } catch (error) {
        component.setState({
          appError: error && error.message ? error.message : String(error)
        });
      }
    });
  }

  function closeTransientFeedback(component) {
    window.setTimeout(function () {
      component.setState({ appError: "" });
    }, 3500);
  }

  function getSelectedProperty(state) {
    var selected = state.properties.find(function (item) {
      return item.id === state.selectedPropertyId;
    });
    return selected || state.properties[0] || normalizeProperties(FALLBACK_PROPERTIES)[0];
  }

  function getFilteredProperties(state) {
    return state.properties.filter(function (item) {
      var query = state.searchQuery.trim().toLowerCase();
      var location = state.searchLocation.trim().toLowerCase();
      var type = state.searchType;
      var min = Number(String(state.searchMin || "").replace(/[^\d]/g, "")) || 0;
      var max = Number(String(state.searchMax || "").replace(/[^\d]/g, "")) || 0;
      var haystack = [item.title, item.address, item.neighborhood, item.city, item.description]
        .join(" ")
        .toLowerCase();

      if (query && haystack.indexOf(query) === -1) {
        return false;
      }
      if (location) {
        var locationTarget = [item.address, item.neighborhood, item.city].join(" ").toLowerCase();
        if (locationTarget.indexOf(location) === -1) {
          return false;
        }
      }
      if (type && type !== "Todos los tipos" && item.type !== type) {
        return false;
      }
      if (min && item.priceRaw < min) {
        return false;
      }
      if (max && item.priceRaw > max) {
        return false;
      }
      return true;
    });
  }

  function canManage(state) {
    if (!state.currentUserProfile) {
      return false;
    }
    var role = String(state.currentUserProfile.rol || "").toLowerCase();
    return role.indexOf("admin") !== -1 || role.indexOf("administrador") !== -1;
  }

  function requireAdmin(component, next) {
    if (canManage(component.state)) {
      next();
      return true;
    }
    component.setState({
      loginOpen: true,
      appError: "Inicia sesion con un usuario administrador para continuar."
    });
    closeTransientFeedback(component);
    return false;
  }

  async function login(component) {
    var state = component.state;
    var services = getFirebaseServices();
    if (!services.ready) {
      component.setState({
        appError: "Configura Firebase antes de iniciar sesion."
      });
      closeTransientFeedback(component);
      return;
    }
    if (!state.loginEmail || !state.loginPassword) {
      component.setState({ appError: "Completa email y contrasena." });
      closeTransientFeedback(component);
      return;
    }
    component.setState({ loginLoading: true, appError: "" });
    try {
      await services.auth.signInWithEmailAndPassword(
        state.loginEmail.trim(),
        state.loginPassword
      );
      component.setState({
        loginOpen: false,
        loginPassword: "",
        loginLoading: false,
        screen: "dashboard"
      });
    } catch (error) {
      component.setState({
        loginLoading: false,
        appError: error && error.message ? error.message : String(error)
      });
      closeTransientFeedback(component);
    }
  }

  async function logout(component) {
    var services = getFirebaseServices();
    if (!services.ready) {
      component.setState({
        screen: "landing",
        currentUser: null,
        currentUserProfile: null
      });
      return;
    }
    await services.auth.signOut();
    component.setState({
      screen: "landing",
      currentUser: null,
      currentUserProfile: null
    });
  }

  async function persistProperty(component) {
    var state = component.state;
    var draft = state.propDraft;
    if (!draft.title || !draft.address || !draft.price) {
      component.setState({
        appError: "Completa titulo, direccion y precio para publicar."
      });
      closeTransientFeedback(component);
      return;
    }

    var propertyId = draft.id || "prop-" + Date.now();
    var images = draft.images ? draft.images.slice() : [];
    var services = getFirebaseServices();

    component.setState({ savingProperty: true, appError: "" });

    try {
      if (services.ready && state.propertyUploadPreview.length) {
        var uploaded = [];
        for (var i = 0; i < state.propertyUploadPreview.length; i += 1) {
          var preview = state.propertyUploadPreview[i];
          if (!preview.file) {
            continue;
          }
          var path = "properties/" + propertyId + "/" + Date.now() + "-" + preview.file.name;
          var ref = services.storage.ref(path);
          await ref.put(preview.file);
          var url = await ref.getDownloadURL();
          uploaded.push({
            url: url,
            path: path,
            label: "FOTO · " + String(i + 1)
          });
        }
        images = images.concat(uploaded);
      }

      var payload = {
        title: draft.title,
        type: draft.type,
        address: draft.address,
        price: Number(String(draft.price).replace(/[^\d]/g, "")) || 0,
        beds: Number(draft.beds) || 0,
        baths: Number(draft.baths) || 0,
        area: Number(draft.area) || 0,
        description: draft.description,
        status: draft.status,
        featured: Boolean(draft.featured),
        neighborhood: draft.address,
        city: "Caseros",
        services: draft.services && draft.services.length
          ? draft.services
          : DEFAULT_SERVICES.slice(),
        docs: DEFAULT_DOCS.slice(),
        features: [
          { icon: "bed", label: "Ambientes", val: String(Number(draft.beds) || 0) },
          { icon: "bathtub", label: "Banos", val: String(Number(draft.baths) || 0) },
          {
            icon: "straighten",
            label: "Superficie",
            val: String(Number(draft.area) || 0) + " m²"
          }
        ],
        images: images,
        updatedAt: services.ready
          ? window.firebase.firestore.FieldValue.serverTimestamp()
          : new Date()
      };

      if (services.ready) {
        await services.db.collection("properties").doc(propertyId).set(
          Object.assign({}, payload, {
            createdAt: draft.id
              ? window.firebase.firestore.FieldValue.serverTimestamp()
              : window.firebase.firestore.FieldValue.serverTimestamp()
          }),
          { merge: true }
        );
        await loadPublicData(component);
      } else {
        var next = component.state.properties.slice();
        var existingIndex = next.findIndex(function (item) {
          return item.id === propertyId;
        });
        var normalized = normalizeProperty(
          Object.assign({}, payload, { id: propertyId }),
          next.length
        );
        if (existingIndex >= 0) {
          next[existingIndex] = normalized;
        } else {
          next.unshift(normalized);
        }
        component.setState({ properties: next });
      }

      component.setState({
        savingProperty: false,
        propForm: false,
        propDraft: createPropertyDraft(),
        propertyUploadPreview: [],
        selectedPropertyId: propertyId
      });
    } catch (error) {
      component.setState({
        savingProperty: false,
        appError: error && error.message ? error.message : String(error)
      });
      closeTransientFeedback(component);
    }
  }

  async function deleteProperty(component, propertyId) {
    var state = component.state;
    if (!window.confirm("Eliminar esta propiedad?")) {
      return;
    }

    var services = getFirebaseServices();
    try {
      if (services.ready) {
        await services.db.collection("properties").doc(propertyId).delete();
        await loadPublicData(component);
      } else {
        component.setState({
          properties: state.properties.filter(function (item) {
            return item.id !== propertyId;
          })
        });
      }
    } catch (error) {
      component.setState({
        appError: error && error.message ? error.message : String(error)
      });
      closeTransientFeedback(component);
    }
  }

  async function persistAction(component) {
    var state = component.state;
    var selectedProperty = getSelectedProperty(state);
    var services = getFirebaseServices();
    var kind = state.actionModal;
    var channel = kind === "verification" ? "Verificacion" : kind === "chat" ? "RAIES BOT" : "Web";

    if (!state.actionForm.name || !state.actionForm.email) {
      component.setState({ appError: "Completa nombre y email." });
      closeTransientFeedback(component);
      return;
    }

    component.setState({ actionLoading: true, appError: "" });

    try {
      var payload = {
        name: state.actionForm.name,
        email: state.actionForm.email,
        phone: state.actionForm.phone,
        message: state.actionForm.message || "",
        propertyId: selectedProperty.id,
        propertyTitle: selectedProperty.title,
        monthlyIncome: Number(String(state.actionForm.monthlyIncome || "").replace(/[^\d]/g, "")) || 0,
        status: "Nueva",
        createdAt: services.ready
          ? window.firebase.firestore.FieldValue.serverTimestamp()
          : new Date(),
        channel: channel
      };

      if (services.ready) {
        var target = kind === "request" || kind === "verification"
          ? "rental_requests"
          : "consultations";
        await services.db.collection(target).add(payload);
        if (state.currentUser) {
          await loadPrivateData(component, state.currentUser);
        }
      } else if (kind === "request" || kind === "verification") {
        component.setState({
          requests: [
            {
              id: "local-" + Date.now(),
              name: payload.name,
              propertyTitle: payload.propertyTitle,
              fecha: formatDate(new Date()),
              ingreso: formatCurrency(payload.monthlyIncome),
              status: "En revision"
            }
          ].concat(component.state.requests)
        });
      } else {
        component.setState({
          consultations: [
            {
              id: "local-" + Date.now(),
              name: payload.name,
              email: payload.email,
              phone: payload.phone,
              msg: payload.message,
              canal: channel,
              estado: "Nueva",
              propertyTitle: payload.propertyTitle,
              createdAt: new Date()
            }
          ].concat(component.state.consultations)
        });
      }

      component.setState({
        actionLoading: false,
        actionModal: "",
        actionForm: {
          name: "",
          email: "",
          phone: "",
          message: "",
          monthlyIncome: ""
        }
      });
    } catch (error) {
      component.setState({
        actionLoading: false,
        appError: error && error.message ? error.message : String(error)
      });
      closeTransientFeedback(component);
    }
  }

  async function saveRequirements(component) {
    var services = getFirebaseServices();
    component.setState({ savingRequirements: true, appError: "" });
    try {
      if (services.ready) {
        await services.db.collection("settings").doc("requirements").set({
          items: component.state.requirements
        });
      }
      component.setState({ savingRequirements: false });
    } catch (error) {
      component.setState({
        savingRequirements: false,
        appError: error && error.message ? error.message : String(error)
      });
      closeTransientFeedback(component);
    }
  }

  async function saveSettings(component) {
    var services = getFirebaseServices();
    component.setState({ savingSettings: true, appError: "" });
    try {
      if (services.ready) {
        await services.db.collection("settings").doc("general").set(component.state.settings, {
          merge: true
        });
        if (component.state.currentUser) {
          await services.db.collection("users").doc(component.state.currentUser.uid).set(
            { notif: component.state.notif },
            { merge: true }
          );
        }
      }
      component.setState({ savingSettings: false });
    } catch (error) {
      component.setState({
        savingSettings: false,
        appError: error && error.message ? error.message : String(error)
      });
      closeTransientFeedback(component);
    }
  }

  function buildScreenHandlers(component) {
    return [
      { key: "landing", label: "Landing", icon: "home" },
      { key: "property", label: "Propiedad", icon: "apartment" },
      { key: "dashboard", label: "Dashboard", icon: "dashboard" }
    ].map(function (item) {
      return {
        key: item.key,
        label: item.label,
        icon: item.icon,
        go: function () {
          if (item.key === "dashboard") {
            requireAdmin(component, function () {
              component.setState({ screen: item.key });
              window.scrollTo(0, 0);
            });
            return;
          }
          component.setState({ screen: item.key });
          window.scrollTo(0, 0);
        },
        style: {
          display: "inline-flex",
          alignItems: "center",
          gap: "7px",
          padding: "10px 18px",
          borderRadius: "999px",
          border: "none",
          cursor: "pointer",
          fontWeight: 600,
          fontSize: "13px",
          fontFamily: "'Plus Jakarta Sans'",
          transition: ".2s",
          background: component.state.screen === item.key ? "#C9A34D" : "transparent",
          color:
            component.state.screen === item.key
              ? "#1a1408"
              : "rgba(255,255,255,.78)"
        }
      };
    });
  }

  function buildPropertyCards(component, list) {
    return list.slice(0, 4).map(function (item, index) {
      return {
        id: item.id,
        title: item.title,
        address: item.address,
        beds: item.beds,
        baths: item.baths,
        area: item.areaLabel,
        price: item.price,
        bg: item.bg,
        photoLabel: item.photoLabel,
        enter: function () {
          component.setState({ hover: index });
        },
        leave: function () {
          component.setState({ hover: -1 });
        },
        go: function () {
          component.setState({ selectedPropertyId: item.id, screen: "property" });
          window.scrollTo(0, 0);
        },
        cardStyle: {
          cursor: "pointer",
          background: "#fff",
          borderRadius: "16px",
          overflow: "hidden",
          border: "1px solid rgba(18,58,47,.07)",
          transition: ".25s cubic-bezier(.2,.8,.2,1)",
          boxShadow:
            component.state.hover === index
              ? "0 30px 60px -24px rgba(18,58,47,.4)"
              : "0 8px 24px -16px rgba(18,58,47,.3)",
          transform: component.state.hover === index ? "translateY(-6px)" : "none"
        }
      };
    });
  }

  function buildGallery(component, property) {
    return ensureArray(property.images, [{ label: "FOTO · PROPIEDAD" }]).slice(0, 5).map(function (image, index) {
      return {
        label: image.label || "FOTO · PROPIEDAD",
        bg: getBackgroundFromImage(image.url, index),
        span: index === 0 ? "span 2" : "span 1",
        open: function () {
          component.setState({ lightbox: index });
        }
      };
    });
  }

  function buildSimilar(component, selected) {
    return component.state.properties
      .filter(function (item) {
        return item.id !== selected.id;
      })
      .slice(0, 3)
      .map(function (item) {
        return {
          title: item.title,
          address: item.address,
          price: item.price,
          bg: item.bg,
          photoLabel: item.photoLabel,
          open: function () {
            component.setState({ selectedPropertyId: item.id, screen: "property" });
            window.scrollTo(0, 0);
          }
        };
      });
  }

  function buildSidebar(component) {
    return [
      { label: "Dashboard", icon: "dashboard" },
      { label: "Propiedades", icon: "apartment" },
      { label: "Solicitudes", icon: "description" },
      { label: "Inquilinos", icon: "group" },
      { label: "Documentacion", icon: "folder" },
      { label: "Requisitos", icon: "checklist" },
      { label: "Consultas", icon: "forum" },
      { label: "Usuarios", icon: "manage_accounts" },
      { label: "Configuracion", icon: "settings" }
    ].map(function (item) {
      return {
        label: item.label,
        icon: item.icon,
        click: function () {
          component.setState({ tab: item.label });
        },
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
          background:
            component.state.tab === item.label
              ? "rgba(201,163,77,.16)"
              : "transparent",
          color:
            component.state.tab === item.label
              ? "#E7CE92"
              : "rgba(255,255,255,.7)",
          boxShadow:
            component.state.tab === item.label ? "inset 3px 0 0 #C9A34D" : "none"
        }
      };
    });
  }

  function getDashboardSubtitle(tab) {
    var subtitles = {
      Dashboard: "Bienvenido de nuevo, administra tu inmobiliaria",
      Propiedades: "Gestiona tu cartera de propiedades",
      Solicitudes: "Solicitudes de alquiler recibidas",
      Inquilinos: "Inquilinos activos y en proceso",
      Documentacion: "Documentos cargados y su verificacion",
      Requisitos: "Configura los requisitos para alquilar",
      Consultas: "Bandeja de consultas de clientes",
      Usuarios: "Gestion de usuarios y permisos",
      Configuracion: "Preferencias de la cuenta y la inmobiliaria"
    };
    return subtitles[tab] || "";
  }

  function bindValue(component, keyPath) {
    return function (event) {
      var value = event && event.target ? event.target.value : "";
      if (keyPath.indexOf(".") === -1) {
        var next = {};
        next[keyPath] = value;
        component.setState(next);
        return;
      }
      var parts = keyPath.split(".");
      var rootKey = parts[0];
      var childKey = parts[1];
      var root = copy(component.state[rootKey] || {});
      root[childKey] = value;
      var payload = {};
      payload[rootKey] = root;
      component.setState(payload);
    };
  }

  function toggleArrayValue(list, value) {
    if (list.indexOf(value) >= 0) {
      return list.filter(function (item) {
        return item !== value;
      });
    }
    return list.concat(value);
  }

  function readFiles(input) {
    var files = Array.prototype.slice.call((input && input.files) || []);
    return Promise.all(
      files.map(function (file) {
        return new Promise(function (resolve) {
          var reader = new FileReader();
          reader.onload = function (event) {
            resolve({
              file: file,
              url: event && event.target ? event.target.result : "",
              label: "FOTO · " + file.name
            });
          };
          reader.readAsDataURL(file);
        });
      })
    );
  }

  window.RaiesApp = {
    createInitialState: createInitialState,
    componentDidMount: function (component) {
      bootstrap(component);
    },
    componentWillUnmount: function (component) {
      if (component.__raiesAuthUnsub) {
        component.__raiesAuthUnsub();
      }
    },
    renderVals: function (component) {
      var state = component.state;
      var filteredProperties = getFilteredProperties(state);
      var selectedProperty = getSelectedProperty(state);
      var gallery = buildGallery(component, selectedProperty);
      var lightboxImage = gallery[state.lightbox] || gallery[0] || { bg: "", label: "" };
      var propertyCards = buildPropertyCards(
        component,
        filteredProperties.length ? filteredProperties : state.properties
      );
      var consultationPreview = state.consultations.slice(0, 4).map(function (item) {
        return {
          txt: item.propertyTitle + ": " + item.msg,
          time: formatRelativeDate(item.createdAt)
        };
      });
      var requestPreview = state.requests.slice(0, 3).map(function (item) {
        return {
          name: item.name,
          prop: item.propertyTitle,
          status: item.status,
          badgeStyle: badgeStyle(statusKind(item.status))
        };
      });
      var allProperties = state.properties
        .filter(function (item) {
          var term = state.propertySearch.trim().toLowerCase();
          if (!term) {
            return true;
          }
          return [item.title, item.address, item.type].join(" ").toLowerCase().indexOf(term) >= 0;
        })
        .map(function (item) {
          return {
            id: item.id,
            title: item.title,
            tipo: item.type,
            address: item.address,
            price: item.price,
            estado: item.status,
            badge: badgeStyle(statusKind(item.status)),
            bg: item.bg,
            edit: function () {
              component.setState({
                tab: "Propiedades",
                propForm: true,
                propDraft: {
                  id: item.id,
                  title: item.title,
                  type: item.type,
                  address: item.address,
                  price: String(item.priceRaw),
                  beds: String(item.beds),
                  baths: String(item.baths),
                  area: String(item.area),
                  description: item.description,
                  status: item.status,
                  featured: item.featured,
                  services: item.services.slice(),
                  images: item.images.slice()
                },
                propertyUploadPreview: []
              });
            },
            remove: function () {
              requireAdmin(component, function () {
                deleteProperty(component, item.id);
              });
            }
          };
        });
      var tenantRows = state.tenants.filter(function (item) {
        var term = state.tenantSearch.trim().toLowerCase();
        if (!term) {
          return true;
        }
        return [item.name, item.prop, item.dni].join(" ").toLowerCase().indexOf(term) >= 0;
      }).map(function (item) {
        return {
          initial: item.name[0] || "I",
          name: item.name,
          dni: item.dni,
          prop: item.prop,
          desde: item.desde,
          estado: item.estado,
          badge: badgeStyle(statusKind(item.estado))
        };
      });
      var userRows = state.users.filter(function (item) {
        var term = state.userSearch.trim().toLowerCase();
        if (!term) {
          return true;
        }
        return [item.name, item.email, item.rol].join(" ").toLowerCase().indexOf(term) >= 0;
      }).map(function (item) {
        return {
          initial: item.name[0] || "U",
          name: item.name,
          email: item.email,
          rol: item.rol,
          estado: item.estado,
          badge: badgeStyle(statusKind(item.estado))
        };
      });

      return {
        screens: buildScreenHandlers(component),
        nav: ["Inicio", "Propiedades", "Requisitos", "Como alquilar", "Contacto"].map(function (label, index) {
          return {
            label: label,
            style:
              "font:600 14.5px/1 'Plus Jakarta Sans';text-decoration:none;color:" +
              (index === 0 ? "#fff" : "rgba(255,255,255,.78)") +
              ";" +
              (index === 0 ? "border-bottom:2px solid #C9A34D;padding-bottom:5px" : "")
          };
        }),
        heroCards: [
          {
            icon: "verified_user",
            title: "Alquiler seguro",
            body: "Verificamos inquilinos y documentacion."
          },
          {
            icon: "forum",
            title: "Consultas en tiempo real",
            body: "Centraliza formularios, bot y leads en Firestore."
          },
          {
            icon: "home_work",
            title: "Publicaciones administrables",
            body: "Sube propiedades e imagenes a Firebase Storage."
          }
        ],
        properties: propertyCards,
        steps: [
          {
            icon: "badge",
            title: "1. Completa tu informacion",
            body: "Ingresa tus datos personales y laborales."
          },
          {
            icon: "upload_file",
            title: "2. Sube tu documentacion",
            body: "Adjunta los documentos solicitados."
          },
          {
            icon: "manage_search",
            title: "3. Verificacion automatica",
            body: "El equipo revisa tu documentacion desde el dashboard."
          },
          {
            icon: "schedule",
            title: "4. Seguimiento centralizado",
            body: "Todo queda registrado en Firebase y panel de RAIES."
          }
        ],
        quickReplies: ["Departamentos", "Casas", "Zonas", "Consultar requisitos"].map(function (text) {
          return {
            label: text,
            click: function () {
              if (text === "Departamentos" || text === "Casas") {
                component.setState({
                  searchType: text === "Casas" ? "Casa" : "Departamento"
                });
                return;
              }
              if (text === "Consultar requisitos") {
                component.setState({ actionModal: "verification" });
                return;
              }
              component.setState({ searchLocation: "Caseros" });
            }
          };
        }),
        isLanding: state.screen === "landing",
        isProperty: state.screen === "property",
        isDashboard: state.screen === "dashboard",
        chatOpen: state.chatOpen,
        chatIcon: state.chatOpen ? "close" : "chat",
        toggleChat: function () {
          component.setState({ chatOpen: !state.chatOpen });
        },
        chatDraft: state.chatDraft,
        setChatDraft: bindValue(component, "chatDraft"),
        submitChat: function () {
          component.setState({
            actionModal: "chat",
            actionForm: Object.assign({}, state.actionForm, {
              message: state.chatDraft || "Consulta desde el chat"
            })
          });
        },
        goProperty: function () {
          component.setState({ screen: "property" });
          window.scrollTo(0, 0);
        },
        goLanding: function () {
          component.setState({ screen: "landing" });
          window.scrollTo(0, 0);
        },
        goDashboard: function () {
          requireAdmin(component, function () {
            component.setState({ screen: "dashboard" });
          });
        },
        authPrimaryLabel: state.currentUser ? "Dashboard" : "Iniciar sesion",
        authPrimaryAction: function () {
          if (state.currentUser) {
            requireAdmin(component, function () {
              component.setState({ screen: "dashboard" });
            });
            return;
          }
          component.setState({ loginOpen: true });
        },
        searchQuery: state.searchQuery,
        searchLocation: state.searchLocation,
        searchType: state.searchType,
        searchMin: state.searchMin,
        searchMax: state.searchMax,
        setSearchQuery: bindValue(component, "searchQuery"),
        setSearchLocation: bindValue(component, "searchLocation"),
        setSearchType: bindValue(component, "searchType"),
        setSearchMin: bindValue(component, "searchMin"),
        setSearchMax: bindValue(component, "searchMax"),
        applySearch: function () {
          var matches = getFilteredProperties(component.state);
          if (matches.length) {
            component.setState({
              selectedPropertyId: matches[0].id,
              screen: "property"
            });
            window.scrollTo(0, 0);
            return;
          }
          component.setState({ appError: "No encontramos propiedades con esos filtros." });
          closeTransientFeedback(component);
        },
        propertyTitle: selectedProperty.title,
        propertyBreadcrumb: selectedProperty.breadcrumb,
        propertyStatus: selectedProperty.status,
        propertyStatusStyle: badgeStyle(selectedProperty.statusKind),
        propertyAddress: selectedProperty.locationLabel,
        propertyDescription: selectedProperty.description,
        propertyPrice: selectedProperty.price,
        features: selectedProperty.features,
        services: selectedProperty.services,
        docs: selectedProperty.docs,
        gallery: gallery,
        similar: buildSimilar(component, selectedProperty),
        lightboxOpen: state.lightbox >= 0,
        lightboxBg: lightboxImage.bg,
        lightboxLabel: lightboxImage.label,
        closeLightbox: function () {
          component.setState({ lightbox: -1 });
        },
        prevImg: function () {
          component.setState({
            lightbox: (state.lightbox + gallery.length - 1) % gallery.length
          });
        },
        nextImg: function () {
          component.setState({
            lightbox: (state.lightbox + 1) % gallery.length
          });
        },
        months: state.calcMonths,
        total: formatCurrency(selectedProperty.priceRaw * state.calcMonths),
        incM: function () {
          component.setState({ calcMonths: Math.min(36, state.calcMonths + 1) });
        },
        decM: function () {
          component.setState({ calcMonths: Math.max(1, state.calcMonths - 1) });
        },
        openConsultation: function () {
          component.setState({ actionModal: "consult" });
        },
        openRentalRequest: function () {
          component.setState({ actionModal: "request" });
        },
        openVerificationModal: function () {
          component.setState({ actionModal: "verification" });
        },
        openWhatsapp: function () {
          var phone = String(state.settings.whatsapp || "").replace(/\D/g, "");
          var text = encodeURIComponent(
            "Hola, quiero consultar por " + selectedProperty.title + "."
          );
          if (!phone) {
            component.setState({ appError: "Configura el telefono de WhatsApp en la seccion Configuracion." });
            closeTransientFeedback(component);
            return;
          }
          window.open("https://wa.me/" + phone + "?text=" + text, "_blank");
        },
        sidebarItems: buildSidebar(component),
        stats: [
          {
            label: "Total propiedades",
            val: String(state.properties.length),
            delta: state.modeLabel,
            sub: "fuente de datos",
            icon: "apartment"
          },
          {
            label: "Consultas",
            val: String(state.consultations.length),
            delta: "Firestore",
            sub: "leads acumulados",
            icon: "forum"
          },
          {
            label: "Solicitudes",
            val: String(state.requests.length),
            delta: "Storage",
            sub: "imagenes y formularios",
            icon: "description"
          },
          {
            label: "Usuarios",
            val: String(state.users.length),
            delta: state.currentUser ? "Online" : "Sin sesion",
            sub: "Auth activo",
            icon: "verified"
          }
        ],
        consultas: consultationPreview,
        solicitudes: requestPreview,
        dashProps: state.properties.slice(0, 3).map(function (item) {
          return {
            title: item.title,
            address: item.address,
            price: item.price,
            bg: item.bg
          };
        }),
        quickActions: [
          {
            label: "Ver solicitudes",
            icon: "description",
            click: function () {
              component.setState({ tab: "Solicitudes" });
            }
          },
          {
            label: "Ver consultas",
            icon: "forum",
            click: function () {
              component.setState({ tab: "Consultas" });
            }
          },
          {
            label: "Gestionar requisitos",
            icon: "checklist",
            click: function () {
              component.setState({ tab: "Requisitos" });
            }
          }
        ],
        activeTab: state.tab,
        tabSubtitle: getDashboardSubtitle(state.tab),
        tabDashboard: state.tab === "Dashboard",
        tabPropiedades: state.tab === "Propiedades",
        tabSolicitudes: state.tab === "Solicitudes",
        tabInquilinos: state.tab === "Inquilinos",
        tabDocumentacion: state.tab === "Documentacion",
        tabRequisitos: state.tab === "Requisitos",
        tabConsultas: state.tab === "Consultas",
        tabUsuarios: state.tab === "Usuarios",
        tabConfig: state.tab === "Configuracion",
        propForm: state.propForm,
        propFormClosed: !state.propForm,
        openPropForm: function () {
          requireAdmin(component, function () {
            component.setState({
              propForm: true,
              propDraft: createPropertyDraft(),
              propertyUploadPreview: []
            });
          });
        },
        closePropForm: function () {
          component.setState({
            propForm: false,
            propDraft: createPropertyDraft(),
            propertyUploadPreview: []
          });
        },
        propTypes: ["Departamento", "Casa", "PH", "Local", "Terreno"].map(function (type) {
          var selected = state.propDraft.type === type;
          return {
            label: type,
            click: function () {
              component.setState({
                propDraft: Object.assign({}, state.propDraft, { type: type })
              });
            },
            chipStyle: {
              padding: "10px 16px",
              borderRadius: "10px",
              cursor: "pointer",
              fontWeight: 600,
              fontSize: "13px",
              fontFamily: "'Plus Jakarta Sans'",
              transition: ".16s",
              border: "1.5px solid " + (selected ? "#205843" : "#E2E4E6"),
              background: selected ? "rgba(32,88,67,.08)" : "#fff",
              color: selected ? "#205843" : "#5a6460"
            }
          };
        }),
        propDraft: state.propDraft,
        setPropTitle: bindValue(component, "propDraft.title"),
        setPropAddress: bindValue(component, "propDraft.address"),
        setPropPrice: bindValue(component, "propDraft.price"),
        setPropBeds: bindValue(component, "propDraft.beds"),
        setPropBaths: bindValue(component, "propDraft.baths"),
        setPropArea: bindValue(component, "propDraft.area"),
        setPropDescription: bindValue(component, "propDraft.description"),
        triggerPhotoUpload: function () {
          var input = document.getElementById("raies-property-images");
          if (input) {
            input.click();
          }
        },
        receivePhotoUpload: async function (event) {
          var preview = await readFiles(event.target);
          component.setState({ propertyUploadPreview: preview });
        },
        propertyUploadPreview: state.propertyUploadPreview.map(function (item, index) {
          return {
            bg: item.url ? "url(" + item.url + ") center/cover no-repeat" : FALLBACK_GRADIENTS[index],
            label: item.label || "FOTO"
          };
        }),
        toggleServiceChip: function (service) {
          component.setState({
            propDraft: Object.assign({}, state.propDraft, {
              services: toggleArrayValue(state.propDraft.services || [], service)
            })
          });
        },
        editableServices: DEFAULT_SERVICES.map(function (service) {
          var selected = (state.propDraft.services || []).indexOf(service) >= 0;
          return {
            label: service,
            icon: selected ? "check" : "add",
            selected: selected,
            click: function () {
              component.setState({
                propDraft: Object.assign({}, state.propDraft, {
                  services: toggleArrayValue(state.propDraft.services || [], service)
                })
              });
            },
            style:
              "display:inline-flex;align-items:center;gap:7px;padding:9px 14px;border-radius:10px;" +
              "border:1.5px solid " + (selected ? "#205843" : "#E2E4E6") + ";" +
              "background:" + (selected ? "rgba(32,88,67,.08)" : "#fff") + ";" +
              "color:" + (selected ? "#205843" : "#5a6460") + ";font:600 12.5px/1 'Plus Jakarta Sans';cursor:pointer"
          };
        }),
        toggleFeatured: function () {
          component.setState({
            propDraft: Object.assign({}, state.propDraft, {
              featured: !state.propDraft.featured
            })
          });
        },
        propertyFeaturedTrack: {
          width: "44px",
          height: "26px",
          borderRadius: "999px",
          background: state.propDraft.featured ? "#205843" : "#cdd2d3",
          position: "relative",
          flex: "none",
          cursor: "pointer"
        },
        propertyFeaturedKnob: {
          position: "absolute",
          top: "3px",
          left: state.propDraft.featured ? "21px" : "3px",
          width: "20px",
          height: "20px",
          borderRadius: "50%",
          background: "#fff",
          boxShadow: "0 1px 3px rgba(0,0,0,.3)"
        },
        submitProperty: function () {
          requireAdmin(component, function () {
            persistProperty(component);
          });
        },
        submitPropertyLabel: state.savingProperty ? "Guardando..." : "Publicar propiedad",
        allProperties: allProperties,
        propertySearch: state.propertySearch,
        setPropertySearch: bindValue(component, "propertySearch"),
        solicitudesFull: state.requests.map(function (item) {
          return {
            initial: item.name[0] || "S",
            name: item.name,
            prop: item.propertyTitle,
            fecha: item.fecha,
            ingreso: item.ingreso,
            status: item.status,
            badge: badgeStyle(statusKind(item.status))
          };
        }),
        inquilinos: tenantRows,
        tenantSearch: state.tenantSearch,
        setTenantSearch: bindValue(component, "tenantSearch"),
        documentacion: state.documents.map(function (item) {
          return {
            inquilino: item.inquilino,
            doc: item.doc,
            fecha: item.fecha,
            estado: item.estado,
            badge: badgeStyle(statusKind(item.estado)),
            icon: item.icon
          };
        }),
        requisitos: state.requirements.map(function (item, index) {
          return {
            label: item.label,
            desc: item.desc,
            toggle: function () {
              var next = state.requirements.slice();
              next[index] = Object.assign({}, next[index], { on: !next[index].on });
              component.setState({ requirements: next });
            },
            switchStyle: {
              width: "44px",
              height: "26px",
              borderRadius: "999px",
              background: item.on ? "#205843" : "#cdd2d3",
              position: "relative",
              cursor: "pointer",
              flex: "none"
            },
            knobStyle: {
              position: "absolute",
              top: "3px",
              left: item.on ? "21px" : "3px",
              width: "20px",
              height: "20px",
              borderRadius: "50%",
              background: "#fff",
              boxShadow: "0 1px 3px rgba(0,0,0,.3)"
            }
          };
        }),
        saveRequirements: function () {
          requireAdmin(component, function () {
            saveRequirements(component);
          });
        },
        saveRequirementsLabel: state.savingRequirements ? "Guardando..." : "Guardar cambios",
        consultasInbox: state.consultations.map(function (item) {
          return {
            icon: item.canal === "WhatsApp" ? "chat" : item.canal === "Email" ? "mail" : "forum",
            name: item.name,
            canal: item.canal,
            msg: item.msg,
            time: formatRelativeDate(item.createdAt),
            estado: item.estado,
            badge: badgeStyle(statusKind(item.estado))
          };
        }),
        usuarios: userRows,
        userSearch: state.userSearch,
        setUserSearch: bindValue(component, "userSearch"),
        notif: ["Nuevas consultas", "Nuevas solicitudes", "Documentacion verificada", "Resumen semanal"].map(function (label, index) {
          return {
            label: label,
            toggle: function () {
              var next = state.notif.slice();
              next[index] = !next[index];
              component.setState({ notif: next });
            },
            switchStyle: {
              width: "44px",
              height: "26px",
              borderRadius: "999px",
              background: state.notif[index] ? "#205843" : "#cdd2d3",
              position: "relative",
              cursor: "pointer",
              flex: "none"
            },
            knobStyle: {
              position: "absolute",
              top: "3px",
              left: state.notif[index] ? "21px" : "3px",
              width: "20px",
              height: "20px",
              borderRadius: "50%",
              background: "#fff",
              boxShadow: "0 1px 3px rgba(0,0,0,.3)"
            }
          };
        }),
        adminInitial:
          (state.currentUserProfile && state.currentUserProfile.name && state.currentUserProfile.name[0]) ||
          "A",
        adminName:
          (state.currentUserProfile && state.currentUserProfile.name) || "Admin RAIES",
        adminRole:
          (state.currentUserProfile && state.currentUserProfile.rol) || "administrador",
        settingsName: state.settings.name,
        settingsEmail: state.settings.email,
        settingsPhone: state.settings.phone,
        settingsAddress: state.settings.address,
        setSettingsName: bindValue(component, "settings.name"),
        setSettingsEmail: bindValue(component, "settings.email"),
        setSettingsPhone: bindValue(component, "settings.phone"),
        setSettingsAddress: bindValue(component, "settings.address"),
        saveSettings: function () {
          requireAdmin(component, function () {
            saveSettings(component);
          });
        },
        saveSettingsLabel: state.savingSettings ? "Guardando..." : "Guardar cambios",
        loginOpen: state.loginOpen,
        loginEmail: state.loginEmail,
        loginPassword: state.loginPassword,
        setLoginEmail: bindValue(component, "loginEmail"),
        setLoginPassword: bindValue(component, "loginPassword"),
        closeLogin: function () {
          component.setState({ loginOpen: false, loginPassword: "" });
        },
        submitLogin: function () {
          login(component);
        },
        loginLabel: state.loginLoading ? "Ingresando..." : "Ingresar",
        logout: function () {
          logout(component);
        },
        appError: state.appError,
        appNotice: state.appNotice,
        modeLabel: state.modeLabel,
        actionModalOpen: Boolean(state.actionModal),
        actionModalTitle:
          state.actionModal === "request"
            ? "Solicitar alquiler"
            : state.actionModal === "verification"
              ? "Comenzar verificacion"
              : "Enviar consulta",
        actionModalSubtitle:
          state.actionModal === "request"
            ? "Completa tus datos para registrar la solicitud en Firestore."
            : state.actionModal === "verification"
              ? "Registramos tu verificacion para seguimiento del equipo."
              : "La consulta quedara guardada en Firebase.",
        actionForm: state.actionForm,
        setActionName: bindValue(component, "actionForm.name"),
        setActionEmail: bindValue(component, "actionForm.email"),
        setActionPhone: bindValue(component, "actionForm.phone"),
        setActionMessage: bindValue(component, "actionForm.message"),
        setActionMonthlyIncome: bindValue(component, "actionForm.monthlyIncome"),
        closeActionModal: function () {
          component.setState({ actionModal: "" });
        },
        submitAction: function () {
          persistAction(component);
        },
        submitActionLabel: state.actionLoading ? "Enviando..." : "Enviar"
      };
    }
  };
})();
