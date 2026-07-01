import { css } from "../lib/css";
import { logoRaiesUrl } from "../lib/assets";
import MsIcon from "../components/MsIcon";
import type { CSSProperties } from "react";
import type { VerificationConfig } from "../data/models";

type SidebarItem = { label: string; icon: string; style: CSSProperties; onClick: () => void };
type StatCard = { label: string; val: string; delta: string; sub: string; icon: string };
type ConsultaPreview = { txt: string; time: string };
type SolicitudPreview = { name: string; prop: string; status: string; badgeStyle: string };
type DashProp = { title: string; address: string; price: string; bg: string };
type QuickAction = { label: string; icon: string; onClick: () => void };
type PropertyRow = {
  id: string;
  title: string;
  tipo: string;
  address: string;
  price: string;
  estado: string;
  badge: string;
  bg: string;
  onEdit: () => void;
  onRemove: () => void;
};
type SolicitudRow = {
  initial: string;
  name: string;
  prop: string;
  fecha: string;
  ingreso: string;
  status: string;
  badge: string;
};
type TenantRow = {
  initial: string;
  name: string;
  dni: string;
  prop: string;
  desde: string;
  estado: string;
  badge: string;
};
type DocumentRow = {
  inquilino: string;
  doc: string;
  fecha: string;
  estado: string;
  badge: string;
  icon: string;
};
type RequirementRow = {
  label: string;
  desc: string;
  switchStyle: CSSProperties;
  knobStyle: CSSProperties;
  onToggle: () => void;
};
type ConsultaInboxRow = {
  icon: string;
  name: string;
  canal: string;
  msg: string;
  time: string;
  estado: string;
  badge: string;
};
type UserRow = {
  initial: string;
  name: string;
  email: string;
  rol: string;
  estado: string;
  badge: string;
};
type NotifRow = {
  label: string;
  switchStyle: CSSProperties;
  knobStyle: CSSProperties;
  onToggle: () => void;
};

export default function DashboardScreen({
  sidebarItems,
  activeTab,
  tabSubtitle,
  adminInitial,
  adminName,
  adminRole,
  onLogout,
  stats,
  consultas,
  solicitudes,
  dashProps,
  quickActions,
  tabDashboard,
  tabPropiedades,
  tabSolicitudes,
  tabInquilinos,
  tabDocumentacion,
  tabRequisitos,
  tabConsultas,
  tabUsuarios,
  tabConfig,
  propertySearch,
  onPropertySearch,
  onOpenPropForm,
  propFormOpen,
  onClosePropForm,
  propTypes,
  propDraft,
  onPropDraft,
  editableServices,
  onToggleService,
  propertyUploadPreview,
  onTriggerUpload,
  onReceiveUpload,
  propertyFeaturedTrack,
  propertyFeaturedKnob,
  onToggleFeatured,
  submitPropertyLabel,
  onSubmitProperty,
  allProperties,
  solicitudesFull,
  tenantSearch,
  onTenantSearch,
  inquilinos,
  documentacion,
  requisitos,
  saveRequirementsLabel,
  onSaveRequirements,
  verificationConfig,
  onVerificationConfig,
  saveVerificationLabel,
  onSaveVerification,
  consultasInbox,
  userSearch,
  onUserSearch,
  usuarios,
  notif,
  settings,
  onSettings,
  saveSettingsLabel,
  onSaveSettings
}: {
  sidebarItems: SidebarItem[];
  activeTab: string;
  tabSubtitle: string;
  adminInitial: string;
  adminName: string;
  adminRole: string;
  onLogout: () => void;
  stats: StatCard[];
  consultas: ConsultaPreview[];
  solicitudes: SolicitudPreview[];
  dashProps: DashProp[];
  quickActions: QuickAction[];
  tabDashboard: boolean;
  tabPropiedades: boolean;
  tabSolicitudes: boolean;
  tabInquilinos: boolean;
  tabDocumentacion: boolean;
  tabRequisitos: boolean;
  tabConsultas: boolean;
  tabUsuarios: boolean;
  tabConfig: boolean;
  propertySearch: string;
  onPropertySearch: (v: string) => void;
  onOpenPropForm: () => void;
  propFormOpen: boolean;
  onClosePropForm: () => void;
  propTypes: { label: string; chipStyle: CSSProperties; onClick: () => void }[];
  propDraft: {
    title: string;
    type: string;
    address: string;
    price: string;
    beds: string;
    baths: string;
    area: string;
    description: string;
    featured: boolean;
  };
  onPropDraft: (patch: Partial<typeof propDraft>) => void;
  editableServices: { label: string; icon: string; style: CSSProperties; onClick: () => void }[];
  onToggleService: (label: string) => void;
  propertyUploadPreview: { bg: string; label: string }[];
  onTriggerUpload: () => void;
  onReceiveUpload: (files: FileList | null) => void;
  propertyFeaturedTrack: CSSProperties;
  propertyFeaturedKnob: CSSProperties;
  onToggleFeatured: () => void;
  submitPropertyLabel: string;
  onSubmitProperty: () => void;
  allProperties: PropertyRow[];
  solicitudesFull: SolicitudRow[];
  tenantSearch: string;
  onTenantSearch: (v: string) => void;
  inquilinos: TenantRow[];
  documentacion: DocumentRow[];
  requisitos: RequirementRow[];
  saveRequirementsLabel: string;
  onSaveRequirements: () => void;
  verificationConfig: VerificationConfig;
  onVerificationConfig: (patch: Partial<VerificationConfig>) => void;
  saveVerificationLabel: string;
  onSaveVerification: () => void;
  consultasInbox: ConsultaInboxRow[];
  userSearch: string;
  onUserSearch: (v: string) => void;
  usuarios: UserRow[];
  notif: NotifRow[];
  settings: { name: string; email: string; phone: string; address: string };
  onSettings: (patch: Partial<typeof settings>) => void;
  saveSettingsLabel: string;
  onSaveSettings: () => void;
}) {
  return (
    <div data-screen-label="Dashboard" style={css("display:flex;min-height:100vh;background:#EBECEE")}>
      <aside
        style={css(
          "width:248px;flex:none;background:linear-gradient(180deg,#0d2c23,#123A2F);display:flex;flex-direction:column;padding:22px 16px;position:sticky;top:0;height:100vh"
        )}
      >
        <div
          style={css(
            "display:flex;align-items:center;gap:11px;padding:4px 8px 22px;border-bottom:1px solid rgba(255,255,255,.1);margin-bottom:18px"
          )}
        >
          <span
            style={css(
              "width:40px;height:40px;border-radius:50%;background:#fff;display:flex;align-items:center;justify-content:center;overflow:hidden"
            )}
          >
            <img src={logoRaiesUrl} style={css("width:100%;height:100%;object-fit:cover")} />
          </span>
          <div>
            <div style={css("font:800 13px/1.1 'Schibsted Grotesk';color:#fff;letter-spacing:.04em")}>
              SERVICIOS
            </div>
            <div style={css("font:600 10px/1.2 'Plus Jakarta Sans';color:#C9A34D;letter-spacing:.18em")}>
              INMOBILIARIOS
            </div>
          </div>
        </div>

        <div style={css("display:flex;flex-direction:column;gap:4px;flex:1")}>
          {sidebarItems.map((it) => (
            <div key={it.label} onClick={it.onClick} style={it.style}>
              <MsIcon name={it.icon} style={{ fontSize: 20 }} /> {it.label}
            </div>
          ))}
        </div>

        <div
          onClick={onLogout}
          style={css(
            "display:flex;align-items:center;gap:13px;padding:12px 16px;border-radius:11px;cursor:pointer;font:600 14px/1 'Plus Jakarta Sans';color:rgba(255,255,255,.6);border-top:1px solid rgba(255,255,255,.1);margin-top:8px;padding-top:18px"
          )}
        >
          <MsIcon name="logout" style={{ fontSize: 20 }} />
          Cerrar sesión
        </div>
      </aside>

      <main style={css("flex:1;min-width:0;display:flex;flex-direction:column")}>
        <header
          style={css(
            "display:flex;align-items:center;justify-content:space-between;padding:22px 34px;background:#fff;border-bottom:1px solid rgba(18,58,47,.07)"
          )}
        >
          <div>
            <h1
              style={css(
                "margin:0;font-family:'Schibsted Grotesk';font-weight:700;font-size:24px;letter-spacing:-.01em;color:#123A2F"
              )}
            >
              {activeTab}
            </h1>
            <div style={css("font-size:13px;color:#8a928e;margin-top:3px")}>{tabSubtitle}</div>
          </div>
          <div style={css("display:flex;align-items:center;gap:14px")}>
            <span
              style={css(
                "width:42px;height:42px;border-radius:11px;background:#F4F5F5;display:flex;align-items:center;justify-content:center;color:#205843;cursor:pointer;position:relative"
              )}
            >
              <MsIcon name="notifications" style={{ fontSize: 21 }} />
              <span
                style={css(
                  "position:absolute;top:9px;right:10px;width:8px;height:8px;border-radius:50%;background:#C9A34D;border:2px solid #fff"
                )}
              />
            </span>
            <div style={css("display:flex;align-items:center;gap:10px;padding:7px 14px 7px 8px;border-radius:11px;background:#F4F5F5")}>
              <span
                style={css(
                  "width:34px;height:34px;border-radius:50%;background:linear-gradient(140deg,#205843,#123A2F);display:flex;align-items:center;justify-content:center;color:#fff;font:700 13px 'Plus Jakarta Sans'"
                )}
              >
                {adminInitial}
              </span>
              <div>
                <div style={css("font:700 13px/1 'Plus Jakarta Sans';color:#1f2a26")}>{adminName}</div>
                <div style={css("font-size:11px;color:#8a928e;margin-top:3px")}>{adminRole}</div>
              </div>
            </div>
          </div>
        </header>

        <div style={css("padding:30px 34px;display:flex;flex-direction:column;gap:24px")}>
          {tabDashboard && (
            <>
              <div style={css("display:grid;grid-template-columns:repeat(4,1fr);gap:20px")}>
                {stats.map((st) => (
                  <div
                    key={st.label}
                    style={css(
                      "background:#fff;border-radius:16px;padding:22px 22px;border:1px solid rgba(18,58,47,.07);box-shadow:0 8px 26px -20px rgba(18,58,47,.3)"
                    )}
                  >
                    <div style={css("display:flex;align-items:center;justify-content:space-between;margin-bottom:14px")}>
                      <span style={css("font:500 13px 'Plus Jakarta Sans';color:#8a928e")}>{st.label}</span>
                      <span
                        style={css(
                          "width:38px;height:38px;border-radius:11px;display:flex;align-items:center;justify-content:center;background:rgba(201,163,77,.14);color:#b08a2f"
                        )}
                      >
                        <MsIcon name={st.icon} style={{ fontSize: 20 }} />
                      </span>
                    </div>
                    <div
                      style={css(
                        "font-family:'Schibsted Grotesk';font-weight:800;font-size:34px;line-height:1;color:#123A2F"
                      )}
                    >
                      {st.val}
                    </div>
                    <div style={css("display:flex;align-items:center;gap:6px;margin-top:11px")}>
                      <span style={css("display:inline-flex;align-items:center;gap:3px;font:700 12px 'Plus Jakarta Sans';color:#1c7a4d")}>
                        <MsIcon name="trending_up" style={{ fontSize: 15 }} />
                        {st.delta}
                      </span>
                      <span style={css("font-size:12px;color:#9aa0a3")}>{st.sub}</span>
                    </div>
                  </div>
                ))}
              </div>

              <div style={css("display:grid;grid-template-columns:1fr 1fr;gap:24px")}>
                <div
                  style={css(
                    "background:#fff;border-radius:16px;padding:24px;border:1px solid rgba(18,58,47,.07);box-shadow:0 8px 26px -20px rgba(18,58,47,.3)"
                  )}
                >
                  <div style={css("display:flex;align-items:center;justify-content:space-between;margin-bottom:18px")}>
                    <h3 style={css("margin:0;font-family:'Schibsted Grotesk';font-weight:700;font-size:17px;color:#123A2F")}>
                      Consultas recientes
                    </h3>
                    <a href="#" onClick={(e) => e.preventDefault()} style={css("font:600 12.5px 'Plus Jakarta Sans';color:#205843;text-decoration:none")}>
                      Ver todas
                    </a>
                  </div>
                  <div style={css("display:flex;flex-direction:column")}>
                    {consultas.map((c, idx) => (
                      <div key={idx} style={css("display:flex;gap:13px;padding:13px 0;border-bottom:1px solid #F0F1F1")}>
                        <span
                          style={css(
                            "width:34px;height:34px;flex:none;border-radius:10px;background:rgba(32,88,67,.1);display:flex;align-items:center;justify-content:center;color:#205843"
                          )}
                        >
                          <MsIcon name="schedule" style={{ fontSize: 18 }} />
                        </span>
                        <div>
                          <div style={css("font:600 14px/1.3 'Plus Jakarta Sans';color:#1f2a26")}>{c.txt}</div>
                          <div style={css("font-size:12px;color:#9aa0a3;margin-top:4px")}>{c.time}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div
                  style={css(
                    "background:#fff;border-radius:16px;padding:24px;border:1px solid rgba(18,58,47,.07);box-shadow:0 8px 26px -20px rgba(18,58,47,.3)"
                  )}
                >
                  <div style={css("display:flex;align-items:center;justify-content:space-between;margin-bottom:18px")}>
                    <h3 style={css("margin:0;font-family:'Schibsted Grotesk';font-weight:700;font-size:17px;color:#123A2F")}>
                      Solicitudes recientes
                    </h3>
                    <a href="#" onClick={(e) => e.preventDefault()} style={css("font:600 12.5px 'Plus Jakarta Sans';color:#205843;text-decoration:none")}>
                      Ver todas
                    </a>
                  </div>
                  <div style={css("display:flex;flex-direction:column")}>
                    {solicitudes.map((sl, idx) => (
                      <div key={idx} style={css("display:flex;align-items:center;gap:13px;padding:13px 0;border-bottom:1px solid #F0F1F1")}>
                        <span
                          style={css(
                            "width:40px;height:40px;flex:none;border-radius:50%;background:linear-gradient(140deg,#d7dedb,#b9c5c0);display:flex;align-items:center;justify-content:center;color:#3a443f"
                          )}
                        >
                          <MsIcon name="person" fill style={{ fontSize: 22 }} />
                        </span>
                        <div style={css("flex:1")}>
                          <div style={css("font:700 14px/1.2 'Plus Jakarta Sans';color:#1f2a26")}>{sl.name}</div>
                          <div style={css("font-size:12.5px;color:#8a928e;margin-top:3px")}>{sl.prop}</div>
                        </div>
                        <span style={css(sl.badgeStyle)}>{sl.status}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div
                  style={css(
                    "background:#fff;border-radius:16px;padding:24px;border:1px solid rgba(18,58,47,.07);box-shadow:0 8px 26px -20px rgba(18,58,47,.3)"
                  )}
                >
                  <div style={css("display:flex;align-items:center;justify-content:space-between;margin-bottom:18px")}>
                    <h3 style={css("margin:0;font-family:'Schibsted Grotesk';font-weight:700;font-size:17px;color:#123A2F")}>
                      Propiedades destacadas
                    </h3>
                    <a href="#" onClick={(e) => e.preventDefault()} style={css("font:600 12.5px 'Plus Jakarta Sans';color:#205843;text-decoration:none")}>
                      Gestionar
                    </a>
                  </div>
                  <div style={css("display:flex;flex-direction:column;gap:14px")}>
                    {dashProps.map((dp) => (
                      <div key={dp.title} style={css("display:flex;align-items:center;gap:13px")}>
                        <span style={css(`width:52px;height:46px;flex:none;border-radius:11px;background:${dp.bg}`)} />
                        <div style={css("flex:1")}>
                          <div style={css("font:700 14px/1.2 'Plus Jakarta Sans';color:#1f2a26")}>{dp.title}</div>
                          <div style={css("font-size:12px;color:#9aa0a3;margin-top:3px")}>{dp.address}</div>
                        </div>
                        <span style={css("font-family:'Schibsted Grotesk';font-weight:800;font-size:15px;color:#205843")}>
                          {dp.price}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                <div
                  style={css(
                    "background:#fff;border-radius:16px;padding:24px;border:1px solid rgba(18,58,47,.07);box-shadow:0 8px 26px -20px rgba(18,58,47,.3)"
                  )}
                >
                  <h3 style={css("margin:0 0 18px;font-family:'Schibsted Grotesk';font-weight:700;font-size:17px;color:#123A2F")}>
                    Acciones rápidas
                  </h3>
                  <button
                    onClick={onOpenPropForm}
                    style={css(
                      "width:100%;display:flex;align-items:center;justify-content:center;gap:9px;padding:14px;border-radius:12px;border:none;background:#123A2F;color:#fff;font:700 14px/1 'Plus Jakarta Sans';cursor:pointer;margin-bottom:12px;box-shadow:0 12px 26px -12px rgba(18,58,47,.55)"
                    )}
                  >
                    <MsIcon name="add" style={{ fontSize: 19 }} />
                    Agregar propiedad
                  </button>
                  <div style={css("display:flex;flex-direction:column;gap:10px")}>
                    {quickActions.map((qa) => (
                      <button
                        key={qa.label}
                        onClick={qa.onClick}
                        style={css(
                          "width:100%;display:flex;align-items:center;gap:11px;padding:13px 15px;border-radius:11px;border:1.5px solid #E2E4E6;background:#fff;color:#3a443f;font:600 13.5px/1 'Plus Jakarta Sans';cursor:pointer;text-align:left"
                        )}
                      >
                        <MsIcon name={qa.icon} style={{ fontSize: 19, color: "#205843" }} />
                        {qa.label}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </>
          )}

          {tabPropiedades && (
            <>
              {!propFormOpen && (
                <>
                  <div style={css("display:flex;align-items:center;justify-content:space-between;gap:16px")}>
                    <div style={css("display:flex;gap:10px;align-items:center")}>
                      <div
                        style={css(
                          "display:flex;align-items:center;gap:8px;padding:11px 15px;border-radius:11px;background:#fff;border:1px solid rgba(18,58,47,.1);min-width:300px"
                        )}
                      >
                        <MsIcon name="search" style={{ fontSize: 19, color: "#9aa0a3" }} />
                        <input
                          value={propertySearch}
                          onChange={(e) => onPropertySearch(e.target.value)}
                          placeholder="Buscar propiedad..."
                          style={css(
                            "border:none;outline:none;background:transparent;font:500 13.5px 'Plus Jakarta Sans';color:#333;flex:1"
                          )}
                        />
                      </div>
                      <button
                        style={css(
                          "display:inline-flex;align-items:center;gap:7px;padding:11px 15px;border-radius:11px;border:1px solid rgba(18,58,47,.1);background:#fff;color:#3a443f;font:600 13px/1 'Plus Jakarta Sans';cursor:pointer"
                        )}
                      >
                        <MsIcon name="filter_list" style={{ fontSize: 18 }} />
                        Filtros
                      </button>
                    </div>
                    <button
                      onClick={onOpenPropForm}
                      style={css(
                        "display:inline-flex;align-items:center;gap:8px;padding:12px 20px;border-radius:11px;border:none;background:#123A2F;color:#fff;font:700 13.5px/1 'Plus Jakarta Sans';cursor:pointer;box-shadow:0 12px 26px -12px rgba(18,58,47,.55)"
                      )}
                    >
                      <MsIcon name="add" style={{ fontSize: 19 }} />
                      Agregar propiedad
                    </button>
                  </div>

                  <div
                    style={css(
                      "background:#fff;border-radius:16px;border:1px solid rgba(18,58,47,.07);box-shadow:0 8px 26px -20px rgba(18,58,47,.3);overflow:hidden"
                    )}
                  >
                    <div
                      style={css(
                        "display:grid;grid-template-columns:2.4fr 1fr 1.1fr 1fr .8fr;gap:16px;padding:15px 22px;background:#F7F8F8;border-bottom:1px solid #EEF0F0;font:700 11px/1 'Plus Jakarta Sans';color:#8a928e;letter-spacing:.04em"
                      )}
                    >
                      <span>PROPIEDAD</span>
                      <span>TIPO</span>
                      <span>PRECIO</span>
                      <span>ESTADO</span>
                      <span style={css("text-align:right")}>ACCIONES</span>
                    </div>
                    {allProperties.map((p) => (
                      <div
                        key={p.id}
                        style={css(
                          "display:grid;grid-template-columns:2.4fr 1fr 1.1fr 1fr .8fr;gap:16px;padding:14px 22px;border-bottom:1px solid #F2F3F3;align-items:center"
                        )}
                      >
                        <div style={css("display:flex;align-items:center;gap:13px")}>
                          <span style={css(`width:50px;height:42px;flex:none;border-radius:10px;background:${p.bg}`)} />
                          <div>
                            <div style={css("font:700 14px/1.2 'Plus Jakarta Sans';color:#1f2a26")}>{p.title}</div>
                            <div style={css("font-size:12px;color:#9aa0a3;margin-top:3px")}>{p.address}</div>
                          </div>
                        </div>
                        <span style={css("font-size:13px;color:#5a6460")}>{p.tipo}</span>
                        <span style={css("font-family:'Schibsted Grotesk';font-weight:800;font-size:15px;color:#123A2F")}>
                          {p.price}
                        </span>
                        <span>
                          <span style={css(p.badge)}>{p.estado}</span>
                        </span>
                        <div style={css("display:flex;gap:6px;justify-content:flex-end")}>
                          <span
                            onClick={p.onEdit}
                            style={css(
                              "width:32px;height:32px;border-radius:8px;background:#F4F5F5;display:flex;align-items:center;justify-content:center;color:#205843;cursor:pointer"
                            )}
                          >
                            <MsIcon name="edit" style={{ fontSize: 17 }} />
                          </span>
                          <span
                            onClick={p.onRemove}
                            style={css(
                              "width:32px;height:32px;border-radius:8px;background:#F4F5F5;display:flex;align-items:center;justify-content:center;color:#b23b3b;cursor:pointer"
                            )}
                          >
                            <MsIcon name="delete" style={{ fontSize: 17 }} />
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </>
              )}

              {propFormOpen && (
                <>
                  <div style={css("display:flex;align-items:center;gap:12px")}>
                    <button
                      onClick={onClosePropForm}
                      style={css(
                        "display:inline-flex;align-items:center;gap:6px;padding:10px 15px;border-radius:10px;border:1px solid rgba(18,58,47,.12);background:#fff;color:#3a443f;font:600 13px/1 'Plus Jakarta Sans';cursor:pointer"
                      )}
                    >
                      <MsIcon name="arrow_back" style={{ fontSize: 17 }} />
                      Volver al listado
                    </button>
                    <h2
                      style={css(
                        "margin:0;font-family:'Schibsted Grotesk';font-weight:700;font-size:19px;color:#123A2F"
                      )}
                    >
                      Nueva propiedad
                    </h2>
                  </div>

                  <div style={css("display:grid;grid-template-columns:1fr 320px;gap:24px;align-items:start")}>
                    <div style={css("display:flex;flex-direction:column;gap:20px")}>
                      <div
                        style={css(
                          "background:#fff;border-radius:16px;padding:26px 28px;border:1px solid rgba(18,58,47,.07);box-shadow:0 8px 26px -20px rgba(18,58,47,.3)"
                        )}
                      >
                        <h3
                          style={css(
                            "margin:0 0 18px;font-family:'Schibsted Grotesk';font-weight:700;font-size:16px;color:#123A2F"
                          )}
                        >
                          Datos de la propiedad
                        </h3>

                        <div style={css("display:flex;flex-direction:column;gap:16px")}>
                          <div>
                            <label style={css("display:block;font:600 12.5px/1 'Plus Jakarta Sans';color:#123A2F;margin-bottom:8px")}>
                              Título
                            </label>
                            <input
                              value={propDraft.title}
                              onChange={(e) => onPropDraft({ title: e.target.value })}
                              placeholder="Ej. Departamento 2 dormitorios en Centro"
                              style={css(
                                "width:100%;padding:12px 13px;border-radius:10px;border:1.5px solid #E2E4E6;background:#F8F9FA;font:500 14px 'Plus Jakarta Sans';color:#333;outline:none"
                              )}
                            />
                          </div>

                          <div>
                            <label style={css("display:block;font:600 12.5px/1 'Plus Jakarta Sans';color:#123A2F;margin-bottom:8px")}>
                              Tipo de propiedad
                            </label>
                            <div style={css("display:flex;flex-wrap:wrap;gap:8px")}>
                              {propTypes.map((pt) => (
                                <div key={pt.label} onClick={pt.onClick} style={pt.chipStyle}>
                                  {pt.label}
                                </div>
                              ))}
                            </div>
                          </div>

                          <div style={css("display:grid;grid-template-columns:1.4fr 1fr;gap:16px")}>
                            <div>
                              <label style={css("display:block;font:600 12.5px/1 'Plus Jakarta Sans';color:#123A2F;margin-bottom:8px")}>
                                Dirección
                              </label>
                              <input
                                value={propDraft.address}
                                onChange={(e) => onPropDraft({ address: e.target.value })}
                                placeholder="Calle, número, barrio"
                                style={css(
                                  "width:100%;padding:12px 13px;border-radius:10px;border:1.5px solid #E2E4E6;background:#F8F9FA;font:500 14px 'Plus Jakarta Sans';color:#333;outline:none"
                                )}
                              />
                            </div>
                            <div>
                              <label style={css("display:block;font:600 12.5px/1 'Plus Jakarta Sans';color:#123A2F;margin-bottom:8px")}>
                                Precio mensual
                              </label>
                              <input
                                value={propDraft.price}
                                onChange={(e) => onPropDraft({ price: e.target.value })}
                                placeholder="$ 0"
                                style={css(
                                  "width:100%;padding:12px 13px;border-radius:10px;border:1.5px solid #E2E4E6;background:#F8F9FA;font:500 14px 'Plus Jakarta Sans';color:#333;outline:none"
                                )}
                              />
                            </div>
                          </div>

                          <div style={css("display:grid;grid-template-columns:1fr 1fr 1fr;gap:16px")}>
                            <div>
                              <label style={css("display:block;font:600 12.5px/1 'Plus Jakarta Sans';color:#123A2F;margin-bottom:8px")}>
                                Ambientes
                              </label>
                              <input
                                value={propDraft.beds}
                                onChange={(e) => onPropDraft({ beds: e.target.value })}
                                placeholder="0"
                                style={css(
                                  "width:100%;padding:12px 13px;border-radius:10px;border:1.5px solid #E2E4E6;background:#F8F9FA;font:500 14px 'Plus Jakarta Sans';color:#333;outline:none"
                                )}
                              />
                            </div>
                            <div>
                              <label style={css("display:block;font:600 12.5px/1 'Plus Jakarta Sans';color:#123A2F;margin-bottom:8px")}>
                                Baños
                              </label>
                              <input
                                value={propDraft.baths}
                                onChange={(e) => onPropDraft({ baths: e.target.value })}
                                placeholder="0"
                                style={css(
                                  "width:100%;padding:12px 13px;border-radius:10px;border:1.5px solid #E2E4E6;background:#F8F9FA;font:500 14px 'Plus Jakarta Sans';color:#333;outline:none"
                                )}
                              />
                            </div>
                            <div>
                              <label style={css("display:block;font:600 12.5px/1 'Plus Jakarta Sans';color:#123A2F;margin-bottom:8px")}>
                                Superficie m²
                              </label>
                              <input
                                value={propDraft.area}
                                onChange={(e) => onPropDraft({ area: e.target.value })}
                                placeholder="0"
                                style={css(
                                  "width:100%;padding:12px 13px;border-radius:10px;border:1.5px solid #E2E4E6;background:#F8F9FA;font:500 14px 'Plus Jakarta Sans';color:#333;outline:none"
                                )}
                              />
                            </div>
                          </div>

                          <div>
                            <label style={css("display:block;font:600 12.5px/1 'Plus Jakarta Sans';color:#123A2F;margin-bottom:8px")}>
                              Descripción
                            </label>
                            <textarea
                              value={propDraft.description}
                              onChange={(e) => onPropDraft({ description: e.target.value })}
                              placeholder="Describí la propiedad..."
                              style={css(
                                "width:100%;min-height:96px;padding:12px 13px;border-radius:10px;border:1.5px solid #E2E4E6;background:#F8F9FA;font:500 14px 'Plus Jakarta Sans';color:#333;outline:none;resize:vertical"
                              )}
                            />
                          </div>
                        </div>
                      </div>

                      <div
                        style={css(
                          "background:#fff;border-radius:16px;padding:26px 28px;border:1px solid rgba(18,58,47,.07);box-shadow:0 8px 26px -20px rgba(18,58,47,.3)"
                        )}
                      >
                        <h3
                          style={css(
                            "margin:0 0 16px;font-family:'Schibsted Grotesk';font-weight:700;font-size:16px;color:#123A2F"
                          )}
                        >
                          Servicios incluidos
                        </h3>
                        <div style={css("display:flex;flex-wrap:wrap;gap:9px")}>
                          {editableServices.map((srv) => (
                            <span key={srv.label} onClick={srv.onClick} style={srv.style}>
                              <MsIcon name={srv.icon} style={{ fontSize: 16 }} />
                              {srv.label}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>

                    <div style={css("display:flex;flex-direction:column;gap:16px")}>
                      <div
                        style={css(
                          "background:#fff;border-radius:16px;padding:22px 22px;border:1px solid rgba(18,58,47,.07);box-shadow:0 8px 26px -20px rgba(18,58,47,.3)"
                        )}
                      >
                        <h3
                          style={css(
                            "margin:0 0 14px;font-family:'Schibsted Grotesk';font-weight:700;font-size:16px;color:#123A2F"
                          )}
                        >
                          Fotos
                        </h3>
                        <input
                          id="raies-property-images-react"
                          type="file"
                          multiple
                          style={{ display: "none" }}
                          onChange={(e) => onReceiveUpload(e.target.files)}
                        />
                        <div
                          onClick={onTriggerUpload}
                          style={css(
                            "border:1.5px dashed #C9D2CE;border-radius:13px;padding:26px;display:flex;flex-direction:column;align-items:center;gap:8px;background:#F8FAF9;cursor:pointer"
                          )}
                        >
                          <span
                            style={css(
                              "width:46px;height:46px;border-radius:12px;background:rgba(32,88,67,.1);display:flex;align-items:center;justify-content:center;color:#205843"
                            )}
                          >
                            <MsIcon name="add_photo_alternate" style={{ fontSize: 24 }} />
                          </span>
                          <div style={css("font:600 13px/1.3 'Plus Jakarta Sans';color:#3a443f;text-align:center")}>
                            Arrastrá o subí fotos
                          </div>
                          <div style={css("font-size:11.5px;color:#9aa0a3;text-align:center")}>
                            JPG o PNG · hasta 10 imágenes
                          </div>
                        </div>
                        <div style={css("display:grid;grid-template-columns:1fr 1fr 1fr;gap:8px;margin-top:12px")}>
                          {propertyUploadPreview.map((img, idx) => (
                            <span key={idx} title={img.label} style={css(`height:48px;border-radius:9px;background:${img.bg}`)} />
                          ))}
                        </div>
                      </div>

                      <div
                        style={css(
                          "background:#fff;border-radius:16px;padding:22px 22px;border:1px solid rgba(18,58,47,.07);box-shadow:0 8px 26px -20px rgba(18,58,47,.3)"
                        )}
                      >
                        <h3
                          style={css(
                            "margin:0 0 14px;font-family:'Schibsted Grotesk';font-weight:700;font-size:16px;color:#123A2F"
                          )}
                        >
                          Publicación
                        </h3>
                        <label style={css("display:block;font:600 12.5px/1 'Plus Jakarta Sans';color:#123A2F;margin-bottom:8px")}>
                          Estado
                        </label>
                        <div
                          style={css(
                            "display:flex;align-items:center;gap:8px;padding:12px 13px;border-radius:10px;border:1.5px solid #E2E4E6;background:#F8F9FA;margin-bottom:16px"
                          )}
                        >
                          <span style={css("font:500 14px 'Plus Jakarta Sans';color:#333;flex:1")}>Disponible</span>
                          <MsIcon name="expand_more" style={{ fontSize: 20, color: "#9aa0a3" }} />
                        </div>
                        <div style={css("display:flex;align-items:center;justify-content:space-between;margin-bottom:18px")}>
                          <div>
                            <div style={css("font:600 13.5px/1 'Plus Jakarta Sans';color:#1f2a26")}>
                              Marcar como destacada
                            </div>
                            <div style={css("font-size:11.5px;color:#9aa0a3;margin-top:4px")}>Aparece en la home</div>
                          </div>
                          <span onClick={onToggleFeatured} style={propertyFeaturedTrack}>
                            <span style={propertyFeaturedKnob} />
                          </span>
                        </div>
                        <button
                          onClick={onSubmitProperty}
                          style={css(
                            "width:100%;display:flex;align-items:center;justify-content:center;gap:8px;padding:14px;border-radius:12px;border:none;background:linear-gradient(180deg,#D6B25C,#C9A34D);color:#1a1408;font:700 14.5px/1 'Plus Jakarta Sans';cursor:pointer;box-shadow:0 12px 28px -10px rgba(201,163,77,.7);margin-bottom:10px"
                          )}
                        >
                          {submitPropertyLabel}
                        </button>
                        <button
                          onClick={onClosePropForm}
                          style={css(
                            "width:100%;padding:12px;border-radius:11px;border:1.5px solid #E2E4E6;background:#fff;color:#5a6460;font:600 13.5px/1 'Plus Jakarta Sans';cursor:pointer"
                          )}
                        >
                          Cancelar
                        </button>
                      </div>
                    </div>
                  </div>
                </>
              )}
            </>
          )}

          {tabSolicitudes && (
            <div
              style={css(
                "background:#fff;border-radius:16px;border:1px solid rgba(18,58,47,.07);box-shadow:0 8px 26px -20px rgba(18,58,47,.3);overflow:hidden"
              )}
            >
              <div
                style={css(
                  "display:grid;grid-template-columns:1.6fr 1.6fr 1fr 1fr 1fr .7fr;gap:16px;padding:15px 22px;background:#F7F8F8;border-bottom:1px solid #EEF0F0;font:700 11px/1 'Plus Jakarta Sans';color:#8a928e;letter-spacing:.04em"
                )}
              >
                <span>SOLICITANTE</span>
                <span>PROPIEDAD</span>
                <span>FECHA</span>
                <span>INGRESO DECL.</span>
                <span>ESTADO</span>
                <span style={css("text-align:right")}>VER</span>
              </div>
              {solicitudesFull.map((r, idx) => (
                <div
                  key={idx}
                  style={css(
                    "display:grid;grid-template-columns:1.6fr 1.6fr 1fr 1fr 1fr .7fr;gap:16px;padding:14px 22px;border-bottom:1px solid #F2F3F3;align-items:center"
                  )}
                >
                  <div style={css("display:flex;align-items:center;gap:11px")}>
                    <span
                      style={css(
                        "width:36px;height:36px;flex:none;border-radius:50%;background:linear-gradient(140deg,#205843,#123A2F);display:flex;align-items:center;justify-content:center;color:#fff;font:700 13px 'Plus Jakarta Sans'"
                      )}
                    >
                      {r.initial}
                    </span>
                    <span style={css("font:700 13.5px/1 'Plus Jakarta Sans';color:#1f2a26")}>{r.name}</span>
                  </div>
                  <span style={css("font-size:13px;color:#5a6460")}>{r.prop}</span>
                  <span style={css("font-size:13px;color:#5a6460")}>{r.fecha}</span>
                  <span style={css("font:700 13.5px 'Plus Jakarta Sans';color:#123A2F")}>{r.ingreso}</span>
                  <span>
                    <span style={css(r.badge)}>{r.status}</span>
                  </span>
                  <div style={css("display:flex;justify-content:flex-end")}>
                    <span
                      style={css(
                        "width:32px;height:32px;border-radius:8px;background:#F4F5F5;display:flex;align-items:center;justify-content:center;color:#205843;cursor:pointer"
                      )}
                    >
                      <MsIcon name="visibility" style={{ fontSize: 18 }} />
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}

          {tabInquilinos && (
            <>
              <div style={css("display:flex;align-items:center;justify-content:space-between;gap:16px")}>
                <div
                  style={css(
                    "display:flex;align-items:center;gap:8px;padding:11px 15px;border-radius:11px;background:#fff;border:1px solid rgba(18,58,47,.1);min-width:300px"
                  )}
                >
                  <MsIcon name="search" style={{ fontSize: 19, color: "#9aa0a3" }} />
                  <input
                    value={tenantSearch}
                    onChange={(e) => onTenantSearch(e.target.value)}
                    placeholder="Buscar inquilino..."
                    style={css(
                      "border:none;outline:none;background:transparent;font:500 13.5px 'Plus Jakarta Sans';color:#333;flex:1"
                    )}
                  />
                </div>
                <button
                  style={css(
                    "display:inline-flex;align-items:center;gap:8px;padding:12px 20px;border-radius:11px;border:none;background:#123A2F;color:#fff;font:700 13.5px/1 'Plus Jakarta Sans';cursor:pointer;box-shadow:0 12px 26px -12px rgba(18,58,47,.55)"
                  )}
                >
                  <MsIcon name="person_add" style={{ fontSize: 19 }} />
                  Nuevo inquilino
                </button>
              </div>
              <div
                style={css(
                  "background:#fff;border-radius:16px;border:1px solid rgba(18,58,47,.07);box-shadow:0 8px 26px -20px rgba(18,58,47,.3);overflow:hidden"
                )}
              >
                <div
                  style={css(
                    "display:grid;grid-template-columns:1.6fr 1fr 1.8fr 1fr 1fr .7fr;gap:16px;padding:15px 22px;background:#F7F8F8;border-bottom:1px solid #EEF0F0;font:700 11px/1 'Plus Jakarta Sans';color:#8a928e;letter-spacing:.04em"
                  )}
                >
                  <span>INQUILINO</span>
                  <span>DNI</span>
                  <span>PROPIEDAD</span>
                  <span>DESDE</span>
                  <span>ESTADO</span>
                  <span style={css("text-align:right")}>VER</span>
                </div>
                {inquilinos.map((t, idx) => (
                  <div
                    key={idx}
                    style={css(
                      "display:grid;grid-template-columns:1.6fr 1fr 1.8fr 1fr 1fr .7fr;gap:16px;padding:14px 22px;border-bottom:1px solid #F2F3F3;align-items:center"
                    )}
                  >
                    <div style={css("display:flex;align-items:center;gap:11px")}>
                      <span
                        style={css(
                          "width:36px;height:36px;flex:none;border-radius:50%;background:linear-gradient(140deg,#d7dedb,#b9c5c0);display:flex;align-items:center;justify-content:center;color:#2f4039;font:700 13px 'Plus Jakarta Sans'"
                        )}
                      >
                        {t.initial}
                      </span>
                      <span style={css("font:700 13.5px/1 'Plus Jakarta Sans';color:#1f2a26")}>{t.name}</span>
                    </div>
                    <span style={css("font-size:13px;color:#5a6460")}>{t.dni}</span>
                    <span style={css("font-size:13px;color:#5a6460")}>{t.prop}</span>
                    <span style={css("font-size:13px;color:#5a6460")}>{t.desde}</span>
                    <span>
                      <span style={css(t.badge)}>{t.estado}</span>
                    </span>
                    <div style={css("display:flex;justify-content:flex-end")}>
                      <span
                        style={css(
                          "width:32px;height:32px;border-radius:8px;background:#F4F5F5;display:flex;align-items:center;justify-content:center;color:#205843;cursor:pointer"
                        )}
                      >
                        <MsIcon name="visibility" style={{ fontSize: 18 }} />
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}

          {tabDocumentacion && (
            <div
              style={css(
                "background:#fff;border-radius:16px;border:1px solid rgba(18,58,47,.07);box-shadow:0 8px 26px -20px rgba(18,58,47,.3);overflow:hidden"
              )}
            >
              <div
                style={css(
                  "display:grid;grid-template-columns:1.6fr 1.8fr 1fr 1fr 1fr;gap:16px;padding:15px 22px;background:#F7F8F8;border-bottom:1px solid #EEF0F0;font:700 11px/1 'Plus Jakarta Sans';color:#8a928e;letter-spacing:.04em"
                )}
              >
                <span>INQUILINO</span>
                <span>DOCUMENTO</span>
                <span>FECHA</span>
                <span>ESTADO</span>
                <span style={css("text-align:right")}>ACCIÓN</span>
              </div>
              {documentacion.map((d, idx) => (
                <div
                  key={idx}
                  style={css(
                    "display:grid;grid-template-columns:1.6fr 1.8fr 1fr 1fr 1fr;gap:16px;padding:14px 22px;border-bottom:1px solid #F2F3F3;align-items:center"
                  )}
                >
                  <span style={css("font:700 13.5px/1 'Plus Jakarta Sans';color:#1f2a26")}>{d.inquilino}</span>
                  <div style={css("display:flex;align-items:center;gap:10px")}>
                    <span
                      style={css(
                        "width:34px;height:34px;flex:none;border-radius:9px;background:rgba(32,88,67,.09);display:flex;align-items:center;justify-content:center;color:#205843"
                      )}
                    >
                      <MsIcon name={d.icon} style={{ fontSize: 18 }} />
                    </span>
                    <span style={css("font-size:13px;color:#5a6460")}>{d.doc}</span>
                  </div>
                  <span style={css("font-size:13px;color:#5a6460")}>{d.fecha}</span>
                  <span>
                    <span style={css(d.badge)}>{d.estado}</span>
                  </span>
                  <div style={css("display:flex;gap:6px;justify-content:flex-end")}>
                    <span
                      style={css(
                        "width:32px;height:32px;border-radius:8px;background:#F4F5F5;display:flex;align-items:center;justify-content:center;color:#205843;cursor:pointer"
                      )}
                    >
                      <MsIcon name="visibility" style={{ fontSize: 18 }} />
                    </span>
                    <span
                      style={css(
                        "width:32px;height:32px;border-radius:8px;background:rgba(32,120,77,.1);display:flex;align-items:center;justify-content:center;color:#1c7a4d;cursor:pointer"
                      )}
                    >
                      <MsIcon name="check" style={{ fontSize: 18 }} />
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}

          {tabRequisitos && (
            <div style={css("display:grid;grid-template-columns:1.5fr 1fr;gap:24px;align-items:start")}>
              <div
                style={css(
                  "background:#fff;border-radius:16px;padding:24px 26px;border:1px solid rgba(18,58,47,.07);box-shadow:0 8px 26px -20px rgba(18,58,47,.3)"
                )}
              >
                <h3
                  style={css(
                    "margin:0 0 4px;font-family:'Schibsted Grotesk';font-weight:700;font-size:17px;color:#123A2F"
                  )}
                >
                  Requisitos para alquilar
                </h3>
                <p style={css("margin:0 0 18px;font-size:13px;color:#8a928e")}>
                  Activá los documentos que el inquilino debe presentar.
                </p>
                <div style={css("display:flex;flex-direction:column")}>
                  {requisitos.map((r) => (
                    <div
                      key={r.label}
                      style={css("display:flex;align-items:center;gap:16px;padding:15px 0;border-bottom:1px solid #F2F3F3")}
                    >
                      <div style={css("flex:1")}>
                        <div style={css("font:700 14px/1.2 'Plus Jakarta Sans';color:#1f2a26")}>{r.label}</div>
                        <div style={css("font-size:12.5px;color:#8a928e;margin-top:4px")}>{r.desc}</div>
                      </div>
                      <span onClick={r.onToggle} style={r.switchStyle}>
                        <span style={r.knobStyle} />
                      </span>
                    </div>
                  ))}
                </div>
              </div>
              <div style={css("display:flex;flex-direction:column;gap:16px")}>
                <div
                  style={css(
                    "background:#fff;border-radius:16px;padding:24px 26px;border:1px solid rgba(18,58,47,.07);box-shadow:0 8px 26px -20px rgba(18,58,47,.3)"
                  )}
                >
                  <h3
                    style={css(
                      "margin:0 0 16px;font-family:'Schibsted Grotesk';font-weight:700;font-size:16px;color:#123A2F"
                    )}
                  >
                    Parámetros
                  </h3>
                  <label style={css("display:block;font:600 12.5px/1 'Plus Jakarta Sans';color:#123A2F;margin-bottom:8px")}>
                    Relación ingreso / alquiler
                  </label>
                  <div style={css("display:flex;align-items:center;gap:8px;padding:12px 13px;border-radius:10px;border:1.5px solid #E2E4E6;background:#F8F9FA;margin-bottom:16px")}>
                    <span style={css("font:500 14px 'Plus Jakarta Sans';color:#333;flex:1")}>3× el valor del alquiler</span>
                    <MsIcon name="expand_more" style={{ fontSize: 20, color: "#9aa0a3" }} />
                  </div>
                  <label style={css("display:block;font:600 12.5px/1 'Plus Jakarta Sans';color:#123A2F;margin-bottom:8px")}>
                    Antigüedad laboral mínima
                  </label>
                  <div style={css("display:flex;align-items:center;gap:8px;padding:12px 13px;border-radius:10px;border:1.5px solid #E2E4E6;background:#F8F9FA")}>
                    <span style={css("font:500 14px 'Plus Jakarta Sans';color:#333;flex:1")}>6 meses</span>
                    <MsIcon name="expand_more" style={{ fontSize: 20, color: "#9aa0a3" }} />
                  </div>
                </div>

                <div
                  style={css(
                    "background:#fff;border-radius:16px;padding:24px 26px;border:1px solid rgba(18,58,47,.07);box-shadow:0 8px 26px -20px rgba(18,58,47,.3)"
                  )}
                >
                  <h3
                    style={css(
                      "margin:0 0 6px;font-family:'Schibsted Grotesk';font-weight:700;font-size:16px;color:#123A2F"
                    )}
                  >
                    Verificación online
                  </h3>
                  <p style={css("margin:0 0 16px;font-size:13px;color:#8a928e")}>
                    Configurá los criterios para que el cliente quede PreAprobado desde la landing.
                  </p>

                  <div style={css("display:flex;flex-direction:column;gap:14px")}>
                    {verificationConfig.options.map((opt, idx) => (
                      <div
                        key={opt.key}
                        style={css(
                          "border:1px solid rgba(18,58,47,.09);border-radius:14px;padding:14px 14px;background:#F7F8F8"
                        )}
                      >
                        <div style={css("display:flex;align-items:center;justify-content:space-between;gap:10px;margin-bottom:12px")}>
                          <div style={css("font:800 13px/1 'Plus Jakarta Sans';color:#123A2F")}>{opt.title}</div>
                          <span style={css("font:700 11px/1 'Plus Jakarta Sans';letter-spacing:.12em;color:#C9A34D")}>
                            {opt.key.toUpperCase()}
                          </span>
                        </div>

                        <div style={css("display:grid;grid-template-columns:1fr 1fr;gap:12px")}>
                          <div>
                            <label style={css("display:block;font:600 12px/1 'Plus Jakarta Sans';color:#123A2F;margin-bottom:7px")}>
                              Recibos garantes (mín.)
                            </label>
                            <input
                              value={String(opt.guarantorPayslipsMin ?? "")}
                              onChange={(e) => {
                                const v = Number(String(e.target.value).replace(/[^\d]/g, "")) || 0;
                                const next = verificationConfig.options.slice();
                                next[idx] = { ...next[idx], guarantorPayslipsMin: v };
                                onVerificationConfig({ options: next });
                              }}
                              style={css(
                                "width:100%;padding:12px 13px;border-radius:10px;border:1.5px solid #E2E4E6;background:#fff;font:500 14px 'Plus Jakarta Sans';color:#333;outline:none"
                              )}
                            />
                          </div>
                          <div>
                            <label style={css("display:block;font:600 12px/1 'Plus Jakarta Sans';color:#123A2F;margin-bottom:7px")}>
                              Antigüedad (años)
                            </label>
                            <input
                              value={String(opt.guarantorSeniorityYearsMin ?? "")}
                              onChange={(e) => {
                                const v = Number(String(e.target.value).replace(/[^\d]/g, "")) || 0;
                                const next = verificationConfig.options.slice();
                                next[idx] = { ...next[idx], guarantorSeniorityYearsMin: v };
                                onVerificationConfig({ options: next });
                              }}
                              style={css(
                                "width:100%;padding:12px 13px;border-radius:10px;border:1.5px solid #E2E4E6;background:#fff;font:500 14px 'Plus Jakarta Sans';color:#333;outline:none"
                              )}
                            />
                          </div>
                        </div>

                        <div style={css("display:flex;align-items:center;justify-content:space-between;gap:12px;margin-top:14px")}>
                          <div>
                            <div style={css("font:700 12.5px/1 'Plus Jakarta Sans';color:#1f2a26")}>
                              Requiere escritura
                            </div>
                            <div style={css("font-size:11.5px;color:#9aa0a3;margin-top:4px")}>
                              Para Opción 2: escritura de inmueble en la ciudad indicada.
                            </div>
                          </div>
                          <button
                            onClick={() => {
                              const next = verificationConfig.options.slice();
                              next[idx] = { ...next[idx], deedRequired: !next[idx].deedRequired };
                              onVerificationConfig({ options: next });
                            }}
                            style={css(
                              "width:44px;height:26px;border-radius:999px;border:none;cursor:pointer;position:relative;background:" +
                                (opt.deedRequired ? "#205843" : "#cdd2d3")
                            )}
                          >
                            <span
                              style={css(
                                "position:absolute;top:3px;left:" +
                                  (opt.deedRequired ? "21px" : "3px") +
                                  ";width:20px;height:20px;border-radius:50%;background:#fff;box-shadow:0 1px 3px rgba(0,0,0,.3)"
                              )}
                            />
                          </button>
                        </div>

                        {opt.deedRequired && (
                          <div style={css("margin-top:12px")}>
                            <label style={css("display:block;font:600 12px/1 'Plus Jakarta Sans';color:#123A2F;margin-bottom:7px")}>
                              Ciudad de la escritura
                            </label>
                            <input
                              value={String(opt.deedLocationLabel ?? "")}
                              onChange={(e) => {
                                const next = verificationConfig.options.slice();
                                next[idx] = { ...next[idx], deedLocationLabel: e.target.value };
                                onVerificationConfig({ options: next });
                              }}
                              placeholder="Venado Tuerto"
                              style={css(
                                "width:100%;padding:12px 13px;border-radius:10px;border:1.5px solid #E2E4E6;background:#fff;font:500 14px 'Plus Jakarta Sans';color:#333;outline:none"
                              )}
                            />
                          </div>
                        )}
                      </div>
                    ))}

                    <div>
                      <label style={css("display:block;font:600 12px/1 'Plus Jakarta Sans';color:#123A2F;margin-bottom:7px")}>
                        Mensaje PreAprobado
                      </label>
                      <textarea
                        value={verificationConfig.preApprovedMessage || ""}
                        onChange={(e) => onVerificationConfig({ preApprovedMessage: e.target.value })}
                        style={css(
                          "width:100%;min-height:92px;padding:12px 13px;border-radius:10px;border:1.5px solid #E2E4E6;background:#fff;font:500 14px 'Plus Jakarta Sans';color:#333;outline:none;resize:vertical"
                        )}
                      />
                    </div>
                  </div>
                </div>

                <button
                  onClick={onSaveVerification}
                  style={css(
                    "width:100%;display:flex;align-items:center;justify-content:center;gap:8px;padding:14px;border-radius:12px;border:none;background:linear-gradient(180deg,#D6B25C,#C9A34D);color:#1a1408;font:800 14px/1 'Plus Jakarta Sans';cursor:pointer;box-shadow:0 12px 28px -10px rgba(201,163,77,.7)"
                  )}
                >
                  <MsIcon name="save" style={{ fontSize: 18 }} />
                  {saveVerificationLabel}
                </button>

                <button
                  onClick={onSaveRequirements}
                  style={css(
                    "width:100%;display:flex;align-items:center;justify-content:center;gap:8px;padding:14px;border-radius:12px;border:none;background:#123A2F;color:#fff;font:700 14px/1 'Plus Jakarta Sans';cursor:pointer;box-shadow:0 12px 26px -12px rgba(18,58,47,.55)"
                  )}
                >
                  <MsIcon name="save" style={{ fontSize: 18 }} />
                  {saveRequirementsLabel}
                </button>
              </div>
            </div>
          )}

          {tabConsultas && (
            <div
              style={css(
                "background:#fff;border-radius:16px;border:1px solid rgba(18,58,47,.07);box-shadow:0 8px 26px -20px rgba(18,58,47,.3);overflow:hidden"
              )}
            >
              {consultasInbox.map((c, idx) => (
                <div key={idx} style={css("display:flex;align-items:center;gap:15px;padding:17px 22px;border-bottom:1px solid #F2F3F3")}>
                  <span
                    style={css(
                      "width:42px;height:42px;flex:none;border-radius:11px;background:rgba(32,88,67,.09);display:flex;align-items:center;justify-content:center;color:#205843"
                    )}
                  >
                    <MsIcon name={c.icon} style={{ fontSize: 21 }} />
                  </span>
                  <div style={css("flex:1;min-width:0")}>
                    <div style={css("display:flex;align-items:center;gap:9px")}>
                      <span style={css("font:700 14px/1 'Plus Jakarta Sans';color:#1f2a26")}>{c.name}</span>
                      <span style={css("font-size:11px;color:#9aa0a3;padding:3px 8px;border-radius:6px;background:#F2F3F3")}>
                        {c.canal}
                      </span>
                    </div>
                    <div style={css("font-size:13px;color:#6b7570;margin-top:5px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap")}>
                      {c.msg}
                    </div>
                  </div>
                  <span style={css("font-size:12px;color:#9aa0a3;flex:none")}>{c.time}</span>
                  <span style={css(c.badge)}>{c.estado}</span>
                  <button
                    style={css(
                      "flex:none;display:inline-flex;align-items:center;gap:6px;padding:9px 15px;border-radius:10px;border:1.5px solid #E2E4E6;background:#fff;color:#205843;font:600 12.5px/1 'Plus Jakarta Sans';cursor:pointer"
                    )}
                  >
                    <MsIcon name="reply" style={{ fontSize: 16 }} />
                    Responder
                  </button>
                </div>
              ))}
            </div>
          )}

          {tabUsuarios && (
            <>
              <div style={css("display:flex;align-items:center;justify-content:space-between;gap:16px")}>
                <div
                  style={css(
                    "display:flex;align-items:center;gap:8px;padding:11px 15px;border-radius:11px;background:#fff;border:1px solid rgba(18,58,47,.1);min-width:300px"
                  )}
                >
                  <MsIcon name="search" style={{ fontSize: 19, color: "#9aa0a3" }} />
                  <input
                    value={userSearch}
                    onChange={(e) => onUserSearch(e.target.value)}
                    placeholder="Buscar usuario..."
                    style={css(
                      "border:none;outline:none;background:transparent;font:500 13.5px 'Plus Jakarta Sans';color:#333;flex:1"
                    )}
                  />
                </div>
                <button
                  style={css(
                    "display:inline-flex;align-items:center;gap:8px;padding:12px 20px;border-radius:11px;border:none;background:#123A2F;color:#fff;font:700 13.5px/1 'Plus Jakarta Sans';cursor:pointer;box-shadow:0 12px 26px -12px rgba(18,58,47,.55)"
                  )}
                >
                  <MsIcon name="person_add" style={{ fontSize: 19 }} />
                  Invitar usuario
                </button>
              </div>
              <div
                style={css(
                  "background:#fff;border-radius:16px;border:1px solid rgba(18,58,47,.07);box-shadow:0 8px 26px -20px rgba(18,58,47,.3);overflow:hidden"
                )}
              >
                <div
                  style={css(
                    "display:grid;grid-template-columns:1.6fr 1.8fr 1fr 1fr .8fr;gap:16px;padding:15px 22px;background:#F7F8F8;border-bottom:1px solid #EEF0F0;font:700 11px/1 'Plus Jakarta Sans';color:#8a928e;letter-spacing:.04em"
                  )}
                >
                  <span>USUARIO</span>
                  <span>EMAIL</span>
                  <span>ROL</span>
                  <span>ESTADO</span>
                  <span style={css("text-align:right")}>ACCIONES</span>
                </div>
                {usuarios.map((u, idx) => (
                  <div
                    key={idx}
                    style={css(
                      "display:grid;grid-template-columns:1.6fr 1.8fr 1fr 1fr .8fr;gap:16px;padding:14px 22px;border-bottom:1px solid #F2F3F3;align-items:center"
                    )}
                  >
                    <div style={css("display:flex;align-items:center;gap:11px")}>
                      <span
                        style={css(
                          "width:36px;height:36px;flex:none;border-radius:50%;background:linear-gradient(140deg,#205843,#123A2F);display:flex;align-items:center;justify-content:center;color:#fff;font:700 13px 'Plus Jakarta Sans'"
                        )}
                      >
                        {u.initial}
                      </span>
                      <span style={css("font:700 13.5px/1 'Plus Jakarta Sans';color:#1f2a26")}>{u.name}</span>
                    </div>
                    <span style={css("font-size:13px;color:#5a6460")}>{u.email}</span>
                    <span style={css("font-size:13px;color:#5a6460")}>{u.rol}</span>
                    <span>
                      <span style={css(u.badge)}>{u.estado}</span>
                    </span>
                    <div style={css("display:flex;gap:6px;justify-content:flex-end")}>
                      <span
                        style={css(
                          "width:32px;height:32px;border-radius:8px;background:#F4F5F5;display:flex;align-items:center;justify-content:center;color:#205843;cursor:pointer"
                        )}
                      >
                        <MsIcon name="edit" style={{ fontSize: 17 }} />
                      </span>
                      <span
                        style={css(
                          "width:32px;height:32px;border-radius:8px;background:#F4F5F5;display:flex;align-items:center;justify-content:center;color:#b23b3b;cursor:pointer"
                        )}
                      >
                        <MsIcon name="block" style={{ fontSize: 17 }} />
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}

          {tabConfig && (
            <div style={css("display:grid;grid-template-columns:1.4fr 1fr;gap:24px;align-items:start")}>
              <div style={css("display:flex;flex-direction:column;gap:20px")}>
                <div
                  style={css(
                    "background:#fff;border-radius:16px;padding:26px 28px;border:1px solid rgba(18,58,47,.07);box-shadow:0 8px 26px -20px rgba(18,58,47,.3)"
                  )}
                >
                  <h3
                    style={css(
                      "margin:0 0 18px;font-family:'Schibsted Grotesk';font-weight:700;font-size:16px;color:#123A2F"
                    )}
                  >
                    Datos de la inmobiliaria
                  </h3>
                  <div style={css("display:flex;align-items:center;gap:16px;margin-bottom:20px")}>
                    <span
                      style={css(
                        "width:64px;height:64px;border-radius:50%;background:#fff;border:1px solid #EDEFEF;display:flex;align-items:center;justify-content:center;overflow:hidden;box-shadow:0 6px 16px -8px rgba(0,0,0,.25)"
                      )}
                    >
                      <img src={logoRaiesUrl} style={css("width:100%;height:100%;object-fit:cover")} />
                    </span>
                    <button
                      style={css(
                        "display:inline-flex;align-items:center;gap:7px;padding:10px 16px;border-radius:10px;border:1.5px solid #E2E4E6;background:#fff;color:#3a443f;font:600 13px/1 'Plus Jakarta Sans';cursor:pointer"
                      )}
                    >
                      <MsIcon name="upload" style={{ fontSize: 17 }} />
                      Cambiar logo
                    </button>
                  </div>
                  <div style={css("display:grid;grid-template-columns:1fr 1fr;gap:16px")}>
                    <div>
                      <label style={css("display:block;font:600 12.5px/1 'Plus Jakarta Sans';color:#123A2F;margin-bottom:8px")}>
                        Nombre
                      </label>
                      <input
                        value={settings.name}
                        onChange={(e) => onSettings({ name: e.target.value })}
                        style={css(
                          "width:100%;padding:12px 13px;border-radius:10px;border:1.5px solid #E2E4E6;background:#F8F9FA;font:500 14px 'Plus Jakarta Sans';color:#333;outline:none"
                        )}
                      />
                    </div>
                    <div>
                      <label style={css("display:block;font:600 12.5px/1 'Plus Jakarta Sans';color:#123A2F;margin-bottom:8px")}>
                        Email
                      </label>
                      <input
                        value={settings.email}
                        onChange={(e) => onSettings({ email: e.target.value })}
                        style={css(
                          "width:100%;padding:12px 13px;border-radius:10px;border:1.5px solid #E2E4E6;background:#F8F9FA;font:500 14px 'Plus Jakarta Sans';color:#333;outline:none"
                        )}
                      />
                    </div>
                    <div>
                      <label style={css("display:block;font:600 12.5px/1 'Plus Jakarta Sans';color:#123A2F;margin-bottom:8px")}>
                        Teléfono
                      </label>
                      <input
                        value={settings.phone}
                        onChange={(e) => onSettings({ phone: e.target.value })}
                        style={css(
                          "width:100%;padding:12px 13px;border-radius:10px;border:1.5px solid #E2E4E6;background:#F8F9FA;font:500 14px 'Plus Jakarta Sans';color:#333;outline:none"
                        )}
                      />
                    </div>
                    <div>
                      <label style={css("display:block;font:600 12.5px/1 'Plus Jakarta Sans';color:#123A2F;margin-bottom:8px")}>
                        Dirección
                      </label>
                      <input
                        value={settings.address}
                        onChange={(e) => onSettings({ address: e.target.value })}
                        style={css(
                          "width:100%;padding:12px 13px;border-radius:10px;border:1.5px solid #E2E4E6;background:#F8F9FA;font:500 14px 'Plus Jakarta Sans';color:#333;outline:none"
                        )}
                      />
                    </div>
                  </div>
                </div>

                <div
                  style={css(
                    "background:#fff;border-radius:16px;padding:26px 28px;border:1px solid rgba(18,58,47,.07);box-shadow:0 8px 26px -20px rgba(18,58,47,.3)"
                  )}
                >
                  <h3
                    style={css(
                      "margin:0 0 8px;font-family:'Schibsted Grotesk';font-weight:700;font-size:16px;color:#123A2F"
                    )}
                  >
                    Notificaciones
                  </h3>
                  <div style={css("display:flex;flex-direction:column")}>
                    {notif.map((n) => (
                      <div
                        key={n.label}
                        style={css(
                          "display:flex;align-items:center;justify-content:space-between;padding:13px 0;border-bottom:1px solid #F2F3F3"
                        )}
                      >
                        <span style={css("font:600 13.5px/1 'Plus Jakarta Sans';color:#1f2a26")}>{n.label}</span>
                        <span onClick={n.onToggle} style={n.switchStyle}>
                          <span style={n.knobStyle} />
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div style={css("display:flex;flex-direction:column;gap:16px")}>
                <div
                  style={css(
                    "background:#fff;border-radius:16px;padding:24px 26px;border:1px solid rgba(18,58,47,.07);box-shadow:0 8px 26px -20px rgba(18,58,47,.3)"
                  )}
                >
                  <h3
                    style={css(
                      "margin:0 0 16px;font-family:'Schibsted Grotesk';font-weight:700;font-size:16px;color:#123A2F"
                    )}
                  >
                    Seguridad
                  </h3>
                  <label style={css("display:block;font:600 12.5px/1 'Plus Jakarta Sans';color:#123A2F;margin-bottom:8px")}>
                    Contraseña actual
                  </label>
                  <input
                    type="password"
                    value="••••••••"
                    readOnly
                    style={css(
                      "width:100%;padding:12px 13px;border-radius:10px;border:1.5px solid #E2E4E6;background:#F8F9FA;font:500 14px 'Plus Jakarta Sans';color:#333;outline:none;margin-bottom:14px"
                    )}
                  />
                  <label style={css("display:block;font:600 12.5px/1 'Plus Jakarta Sans';color:#123A2F;margin-bottom:8px")}>
                    Nueva contraseña
                  </label>
                  <input
                    type="password"
                    placeholder="••••••••"
                    style={css(
                      "width:100%;padding:12px 13px;border-radius:10px;border:1.5px solid #E2E4E6;background:#F8F9FA;font:500 14px 'Plus Jakarta Sans';color:#333;outline:none"
                    )}
                  />
                </div>

                <button
                  onClick={onSaveSettings}
                  style={css(
                    "width:100%;display:flex;align-items:center;justify-content:center;gap:8px;padding:14px;border-radius:12px;border:none;background:#123A2F;color:#fff;font:700 14px/1 'Plus Jakarta Sans';cursor:pointer;box-shadow:0 12px 26px -12px rgba(18,58,47,.55)"
                  )}
                >
                  <MsIcon name="save" style={{ fontSize: 18 }} />
                  {saveSettingsLabel}
                </button>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
