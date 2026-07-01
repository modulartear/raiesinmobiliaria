import { css } from "../lib/css";
import { logoRaiesUrl } from "../lib/assets";
import MsIcon from "../components/MsIcon";
import type { CSSProperties } from "react";
import Footer from "../components/Footer";
import type { SettingsRecord } from "../data/models";

type NavItem = { label: string; active?: boolean };
type HeroCard = { icon: string; title: string; body: string };
type PropertyCard = {
  id: string;
  title: string;
  address: string;
  beds: string;
  baths: string;
  area: string;
  price: string;
  bg: string;
  photoLabel: string;
  cardStyle: CSSProperties;
  onEnter: () => void;
  onLeave: () => void;
  onOpen: () => void;
};
type StepCard = { icon: string; title: string; body: string };
type QuickReply = { label: string; onClick: () => void };

export default function LandingScreen({
  nav,
  heroCards,
  properties,
  steps,
  quickReplies,
  searchQuery,
  searchLocation,
  searchType,
  searchMin,
  searchMax,
  onSearchQuery,
  onSearchLocation,
  onSearchType,
  onSearchMin,
  onSearchMax,
  onApplySearch,
  onGoProperty,
  onGoDashboard,
  authPrimaryLabel,
  onAuthPrimaryAction,
  onOpenVerification,
  settings,
  onOpenWhatsapp,
  chatOpen,
  chatIcon,
  onToggleChat,
  chatDraft,
  onChatDraft,
  onSubmitChat
}: {
  nav: NavItem[];
  heroCards: HeroCard[];
  properties: PropertyCard[];
  steps: StepCard[];
  quickReplies: QuickReply[];
  searchQuery: string;
  searchLocation: string;
  searchType: string;
  searchMin: string;
  searchMax: string;
  onSearchQuery: (v: string) => void;
  onSearchLocation: (v: string) => void;
  onSearchType: (v: string) => void;
  onSearchMin: (v: string) => void;
  onSearchMax: (v: string) => void;
  onApplySearch: () => void;
  onGoProperty: () => void;
  onGoDashboard: () => void;
  authPrimaryLabel: string;
  onAuthPrimaryAction: () => void;
  onOpenVerification: () => void;
  settings: SettingsRecord;
  onOpenWhatsapp: () => void;
  chatOpen: boolean;
  chatIcon: string;
  onToggleChat: () => void;
  chatDraft: string;
  onChatDraft: (v: string) => void;
  onSubmitChat: () => void;
}) {
  return (
    <div className="landing-screen" data-screen-label="Landing" style={css("background:#EBECEE")}>
      <header
        className="landing-header"
        style={css(
          "position:absolute;top:0;left:0;right:0;z-index:40;display:flex;align-items:center;gap:28px;padding:22px 5vw;flex-wrap:wrap"
        )}
      >
        <div className="landing-brand" style={css("display:flex;align-items:center;gap:12px;width:115px;height:69px")}>
          <span
            style={css(
              "width:115px;height:109px;border-radius:50%;background:#fff;display:flex;align-items:center;justify-content:center;overflow:hidden;box-shadow:0 6px 18px -6px rgba(0,0,0,.4)"
            )}
          >
            <img
              src={logoRaiesUrl}
              alt="RAIES"
              style={css("width:111px;height:103px;object-fit:cover;align-self:center")}
            />
          </span>
        </div>
        <nav className="landing-nav" style={css("display:flex;gap:30px;margin-left:8px;flex-wrap:wrap")}>
          {nav.map((n, i) => (
            <a
              key={n.label}
              href="#"
              onClick={(e) => e.preventDefault()}
              style={css(
                `font:600 14.5px/1 'Plus Jakarta Sans';text-decoration:none;color:${
                  n.active ? "#fff" : "rgba(255,255,255,.78)"
                };${n.active ? "border-bottom:2px solid #C9A34D;padding-bottom:5px" : ""}`
              )}
            >
              {n.label}
            </a>
          ))}
        </nav>
        <div className="landing-header-actions" style={css("margin-left:auto;display:flex;align-items:center;gap:12px")}>
          <button
            onClick={onAuthPrimaryAction}
            style={css(
              "padding:12px 22px;border-radius:11px;border:none;background:linear-gradient(180deg,#D6B25C,#C9A34D);color:#1a1408;font:700 14px/1 'Plus Jakarta Sans';cursor:pointer;box-shadow:0 8px 22px -8px rgba(201,163,77,.8);transition:.18s"
            )}
          >
            {authPrimaryLabel}
          </button>
        </div>
      </header>

      <section
        className="landing-hero"
        style={css(
          "position:relative;min-height:760px;padding:150px 5vw 130px;overflow:hidden"
        )}
      >
        <div style={css("position:absolute;inset:0;background:linear-gradient(125deg,#0d2c23 0%,#123A2F 42%,#1c5040 100%)")} />
        <div
          style={css(
            "position:absolute;inset:0;background:repeating-linear-gradient(115deg,rgba(255,255,255,.025) 0 2px,transparent 2px 26px)"
          )}
        />
        <div
          style={css(
            "position:absolute;top:0;right:0;width:62%;height:100%;background:linear-gradient(90deg,#123A2F 0%,rgba(18,58,47,.1) 30%,transparent 55%),repeating-linear-gradient(38deg,rgba(255,255,255,.05) 0 3px,transparent 3px 30px);opacity:.9"
          )}
        />
        <div
          style={css(
            "position:absolute;top:0;right:0;width:62%;height:100%;display:flex;align-items:center;justify-content:center;color:rgba(255,255,255,.28);font:600 12px/1 ui-monospace,monospace;letter-spacing:.12em"
          )}
        >
          FOTO · FACHADA PROPIEDAD
        </div>
        <div
          style={css(
            "position:absolute;inset:0;background:linear-gradient(180deg,rgba(13,44,35,.35),transparent 30%,rgba(13,44,35,.15))"
          )}
        />

        <div
          className="landing-hero-grid"
          style={css(
            "position:relative;max-width:1340px;margin:0 auto;display:grid;grid-template-columns:1.15fr .85fr;gap:40px;align-items:center"
          )}
        >
          <div className="landing-hero-copy">
            <span
              style={css(
                "display:inline-flex;align-items:center;gap:8px;padding:7px 14px;border-radius:999px;background:rgba(201,163,77,.16);border:1px solid rgba(201,163,77,.4);color:#E7CE92;font:600 12.5px/1 'Plus Jakarta Sans';letter-spacing:.02em;margin-bottom:26px"
              )}
            >
              <span
                style={css(
                  "width:7px;height:7px;border-radius:50%;background:#C9A34D;animation:pulseDot 2s infinite"
                )}
              />
              Alquileres verificados en minutos
            </span>
            <h1
              style={css(
                "margin:0;font-family:'Schibsted Grotesk';font-weight:800;font-size:clamp(40px,4.6vw,68px);line-height:1.02;letter-spacing:-.025em;color:#fff"
              )}
            >
              Encontrá el lugar
              <br />
              donde comienza
              <br />
              <span style={css("color:#D6B25C")}>tu próximo hogar</span>
            </h1>
            <p
              style={css(
                "margin:24px 0 0;font-size:19px;line-height:1.5;color:rgba(255,255,255,.82);max-width:430px"
              )}
            >
              Alquilá fácil, rápido y seguro.
              <br />
              Nos encargamos de todo.
            </p>
            <div className="landing-hero-cta" style={css("display:flex;gap:14px;margin-top:38px;flex-wrap:wrap")}>
              <button
                onClick={onGoProperty}
                style={css(
                  "display:inline-flex;align-items:center;gap:9px;padding:16px 28px;border-radius:13px;border:none;background:linear-gradient(180deg,#D6B25C,#C9A34D);color:#1a1408;font:700 15.5px/1 'Plus Jakarta Sans';cursor:pointer;box-shadow:0 14px 32px -10px rgba(201,163,77,.7);transition:.2s"
                )}
              >
                Ver propiedades <MsIcon name="arrow_forward" style={{ fontSize: 19 }} />
              </button>
            </div>
          </div>

          <div
            className="landing-hero-cards"
            style={css(
              "display:flex;flex-direction:column;gap:16px;justify-self:end;width:100%;max-width:380px"
            )}
          >
            {heroCards.map((c) => (
              <div
                key={c.title}
                style={css(
                  "display:flex;gap:15px;align-items:flex-start;padding:20px 22px;border-radius:18px;background:rgba(255,255,255,.1);backdrop-filter:blur(22px);-webkit-backdrop-filter:blur(22px);border:1px solid rgba(255,255,255,.18);box-shadow:0 22px 50px -22px rgba(0,0,0,.7)"
                )}
              >
                <span
                  style={css(
                    "flex:none;width:46px;height:46px;border-radius:13px;display:flex;align-items:center;justify-content:center;background:linear-gradient(150deg,rgba(201,163,77,.25),rgba(201,163,77,.08));border:1px solid rgba(201,163,77,.35);color:#E7CE92"
                  )}
                >
                  <MsIcon name={c.icon} style={{ fontSize: 24 }} />
                </span>
                <div>
                  <div
                    style={css(
                      "font:700 15px/1.2 'Plus Jakarta Sans';color:#fff;margin-bottom:5px"
                    )}
                  >
                    {c.title}
                  </div>
                  <div
                    style={css(
                      "font-size:13.5px;line-height:1.45;color:rgba(255,255,255,.72)"
                    )}
                  >
                    {c.body}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div
        className="landing-search-wrap"
        style={css(
          "position:relative;z-index:30;max-width:1240px;margin:-66px auto 0;padding:0 5vw"
        )}
      >
        <div
          className="landing-search-card"
          style={css(
            "background:#fff;border-radius:20px;padding:22px 24px;box-shadow:0 30px 70px -28px rgba(18,58,47,.4),0 2px 8px rgba(0,0,0,.04);border:1px solid rgba(18,58,47,.06);display:grid;grid-template-columns:repeat(5,minmax(0,1fr));gap:20px;align-items:end"
          )}
        >
          <div className="landing-search-field landing-search-field--wide">
            <label
              style={css(
                "display:block;font:600 12.5px/1 'Plus Jakarta Sans';color:#123A2F;margin-bottom:9px"
              )}
            >
              ¿Qué estás buscando?
            </label>
            <input
              value={searchQuery}
              onChange={(e) => onSearchQuery(e.target.value)}
              placeholder="Ej. Departamento 2 dormitorios"
              style={css(
                "width:100%;padding:13px 14px;border-radius:11px;border:1.5px solid #E2E4E6;background:#F8F9FA;font:500 14px 'Plus Jakarta Sans';color:#333;outline:none"
              )}
            />
          </div>
          <div className="landing-search-field">
            <label
              style={css(
                "display:block;font:600 12.5px/1 'Plus Jakarta Sans';color:#123A2F;margin-bottom:9px"
              )}
            >
              Ubicación
            </label>
            <div
              style={css(
                "display:flex;align-items:center;gap:8px;padding:13px 14px;border-radius:11px;border:1.5px solid #E2E4E6;background:#F8F9FA"
              )}
            >
              <input
                value={searchLocation}
                onChange={(e) => onSearchLocation(e.target.value)}
                placeholder="Seleccioná una ubicación"
                style={css(
                  "font:500 14px 'Plus Jakarta Sans';color:#333;flex:1;border:none;outline:none;background:transparent"
                )}
              />
              <MsIcon name="location_on" style={{ fontSize: 20, color: "#C9A34D" }} />
            </div>
          </div>
          <div className="landing-search-field">
            <label
              style={css(
                "display:block;font:600 12.5px/1 'Plus Jakarta Sans';color:#123A2F;margin-bottom:9px"
              )}
            >
              Tipo de propiedad
            </label>
            <div
              style={css(
                "display:flex;align-items:center;gap:8px;padding:13px 14px;border-radius:11px;border:1.5px solid #E2E4E6;background:#F8F9FA"
              )}
            >
              <select
                value={searchType}
                onChange={(e) => onSearchType(e.target.value)}
                style={css(
                  "font:500 14px 'Plus Jakarta Sans';color:#666;flex:1;border:none;outline:none;background:transparent"
                )}
              >
                <option>Todos los tipos</option>
                <option>Departamento</option>
                <option>Casa</option>
                <option>PH</option>
                <option>Local</option>
                <option>Terreno</option>
              </select>
              <MsIcon name="expand_more" style={{ fontSize: 20, color: "#9aa0a3" }} />
            </div>
          </div>
          <div className="landing-search-field">
            <label
              style={css(
                "display:block;font:600 12.5px/1 'Plus Jakarta Sans';color:#123A2F;margin-bottom:9px"
              )}
            >
              Precio
            </label>
            <div
              style={css(
                "display:flex;align-items:center;gap:6px;padding:13px 14px;border-radius:11px;border:1.5px solid #E2E4E6;background:#F8F9FA"
              )}
            >
              <input
                value={searchMin}
                onChange={(e) => onSearchMin(e.target.value)}
                placeholder="Min"
                style={css(
                  "width:45%;border:none;outline:none;background:transparent;font:500 14px 'Plus Jakarta Sans';color:#333"
                )}
              />
              <span style={css("color:#cfd3d5")}>—</span>
              <input
                value={searchMax}
                onChange={(e) => onSearchMax(e.target.value)}
                placeholder="Max"
                style={css(
                  "width:45%;border:none;outline:none;background:transparent;font:500 14px 'Plus Jakarta Sans';color:#333"
                )}
              />
            </div>
          </div>
          <button
            className="landing-search-button"
            onClick={onApplySearch}
            style={css(
              "display:inline-flex;align-items:center;gap:9px;padding:14px 26px;border-radius:12px;border:none;background:#123A2F;color:#fff;font:700 14.5px/1 'Plus Jakarta Sans';cursor:pointer;height:48px;box-shadow:0 12px 26px -10px rgba(18,58,47,.6);transition:.2s"
            )}
          >
            <MsIcon name="search" style={{ fontSize: 19 }} />
            Buscar
          </button>
        </div>
      </div>

      <section className="landing-section" style={css("max-width:1240px;margin:64px auto 0;padding:0 5vw")}>
        <div
          className="landing-section-head"
          style={css(
            "display:flex;align-items:flex-end;justify-content:space-between;margin-bottom:28px;gap:16px;flex-wrap:wrap"
          )}
        >
          <div>
            <h2
              style={css(
                "margin:0;font-family:'Schibsted Grotesk';font-weight:700;font-size:30px;letter-spacing:-.02em;color:#123A2F"
              )}
            >
              Propiedades destacadas
            </h2>
            <div
              style={css(
                "width:64px;height:4px;border-radius:3px;background:#C9A34D;margin-top:10px"
              )}
            />
          </div>
          <a
            href="#"
            onClick={(e) => e.preventDefault()}
            style={css(
              "display:inline-flex;align-items:center;gap:7px;font:600 14px 'Plus Jakarta Sans';color:#205843;text-decoration:none"
            )}
          >
            Ver todas <MsIcon name="arrow_forward" style={{ fontSize: 18 }} />
          </a>
        </div>
        <div className="landing-properties-grid" style={css("display:grid;grid-template-columns:repeat(4,1fr);gap:22px")}>
          {properties.map((p) => (
            <div
              key={p.id}
              onClick={p.onOpen}
              onMouseEnter={p.onEnter}
              onMouseLeave={p.onLeave}
              style={p.cardStyle}
            >
              <div style={css(`position:relative;height:185px;background:${p.bg};overflow:hidden`)}>
                <div
                  style={css(
                    "position:absolute;inset:0;background:repeating-linear-gradient(125deg,rgba(255,255,255,.06) 0 2px,transparent 2px 22px)"
                  )}
                />
                <div
                  style={css(
                    "position:absolute;inset:0;display:flex;align-items:center;justify-content:center;color:rgba(255,255,255,.32);font:600 10.5px ui-monospace,monospace;letter-spacing:.1em"
                  )}
                >
                  {p.photoLabel}
                </div>
                <span
                  style={css(
                    "position:absolute;top:12px;left:12px;display:inline-flex;align-items:center;gap:5px;padding:5px 11px;border-radius:7px;background:#205843;color:#fff;font:700 10px/1 'Plus Jakarta Sans';letter-spacing:.06em"
                  )}
                >
                  DESTACADA
                </span>
                <span
                  style={css(
                    "position:absolute;top:12px;right:12px;width:32px;height:32px;border-radius:9px;background:rgba(255,255,255,.92);display:flex;align-items:center;justify-content:center;color:#123A2F"
                  )}
                >
                  <MsIcon name="favorite_border" style={{ fontSize: 18 }} />
                </span>
              </div>
              <div style={css("padding:16px 17px 18px")}>
                <div style={css("font:700 16px/1.2 'Plus Jakarta Sans';color:#1f2a26")}>
                  {p.title}
                </div>
                <div
                  style={css(
                    "display:flex;align-items:center;gap:5px;margin-top:5px;color:#7b8480;font-size:13px"
                  )}
                >
                  <MsIcon name="location_on" style={{ fontSize: 15 }} />
                  {p.address}
                </div>
                <div
                  style={css(
                    "display:flex;gap:14px;margin:13px 0;padding:11px 0;border-top:1px solid #EEF0F0;border-bottom:1px solid #EEF0F0;color:#5a6460;font-size:12.5px"
                  )}
                >
                  <span style={css("display:inline-flex;align-items:center;gap:5px")}>
                    <MsIcon name="bed" style={{ fontSize: 16 }} />
                    {p.beds}
                  </span>
                  <span style={css("display:inline-flex;align-items:center;gap:5px")}>
                    <MsIcon name="bathtub" style={{ fontSize: 16 }} />
                    {p.baths}
                  </span>
                  <span style={css("display:inline-flex;align-items:center;gap:5px")}>
                    <MsIcon name="straighten" style={{ fontSize: 16 }} />
                    {p.area}
                  </span>
                </div>
                <div style={css("display:flex;align-items:baseline;gap:4px")}>
                  <span
                    style={css(
                      "font-family:'Schibsted Grotesk';font-weight:800;font-size:21px;color:#123A2F"
                    )}
                  >
                    {p.price}
                  </span>
                  <span style={css("font-size:12.5px;color:#9aa0a3")}>/mes</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="landing-section" style={css("max-width:1240px;margin:74px auto 90px;padding:0 5vw")}>
        <div
          className="landing-steps-layout"
          style={css(
            "display:grid;grid-template-columns:1.55fr 1fr;gap:40px;align-items:center"
          )}
        >
          <div>
            <h2
              style={css(
                "margin:0 0 8px;font-family:'Schibsted Grotesk';font-weight:700;font-size:28px;letter-spacing:-.02em;color:#123A2F"
              )}
            >
              ¿Qué necesitás para alquilar?
            </h2>
            <p style={css("margin:0 0 34px;color:#6b7570;font-size:15px")}>
              Te ayudamos a verificar si cumplís con los requisitos.
            </p>
            <div className="landing-steps-grid" style={css("display:grid;grid-template-columns:repeat(4,1fr);gap:22px")}>
              {steps.map((st) => (
                <div key={st.title}>
                  <span
                    style={css(
                      "width:58px;height:58px;border-radius:50%;display:flex;align-items:center;justify-content:center;background:#fff;border:1.5px solid rgba(18,58,47,.1);color:#205843;box-shadow:0 10px 22px -12px rgba(18,58,47,.35);margin-bottom:15px"
                    )}
                  >
                    <MsIcon name={st.icon} style={{ fontSize: 26 }} />
                  </span>
                  <div
                    style={css(
                      "font:700 14.5px/1.25 'Plus Jakarta Sans';color:#1f2a26;margin-bottom:7px"
                    )}
                  >
                    {st.title}
                  </div>
                  <div style={css("font-size:13px;line-height:1.45;color:#7b8480")}>
                    {st.body}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div
            className="landing-verify-card"
            style={css(
              "background:#fff;border-radius:20px;padding:34px 32px;box-shadow:0 26px 60px -28px rgba(18,58,47,.34);border:1px solid rgba(18,58,47,.06)"
            )}
          >
            <span
              style={css(
                "width:74px;height:74px;border-radius:50%;display:flex;align-items:center;justify-content:center;background:linear-gradient(150deg,#26795c,#205843);color:#fff;box-shadow:0 14px 30px -12px rgba(32,88,67,.7);margin-bottom:20px"
              )}
            >
              <MsIcon name="verified" fill style={{ fontSize: 38 }} />
            </span>
            <h3
              style={css(
                "margin:0 0 10px;font-family:'Schibsted Grotesk';font-weight:700;font-size:22px;letter-spacing:-.01em;color:#123A2F"
              )}
            >
              Verificá si estás apto para alquilar
            </h3>
            <p style={css("margin:0 0 24px;color:#6b7570;font-size:14.5px;line-height:1.5")}>
              Completá el formulario y obtené una respuesta inmediata.
            </p>
            <button
              onClick={onOpenVerification}
              style={css(
                "display:inline-flex;align-items:center;gap:9px;padding:14px 24px;border-radius:12px;border:none;background:#123A2F;color:#fff;font:700 14.5px/1 'Plus Jakarta Sans';cursor:pointer;box-shadow:0 12px 26px -10px rgba(18,58,47,.55);transition:.2s"
              )}
            >
              Comenzar verificación <MsIcon name="arrow_forward" style={{ fontSize: 18 }} />
            </button>
          </div>
        </div>
      </section>

      {chatOpen && (
        <div
          className="landing-chat-panel"
          style={css(
            "position:fixed;right:26px;bottom:96px;z-index:120;width:330px;border-radius:20px;overflow:hidden;background:#fff;box-shadow:0 34px 80px -24px rgba(0,0,0,.45);border:1px solid rgba(18,58,47,.08);animation:popIn .35s ease both"
          )}
        >
          <div
            style={css(
              "display:flex;align-items:center;gap:11px;padding:16px 18px;background:linear-gradient(120deg,#0d2c23,#205843)"
            )}
          >
            <span
              style={css(
                "width:38px;height:38px;border-radius:50%;background:#fff;display:flex;align-items:center;justify-content:center;overflow:hidden"
              )}
            >
              <img src={logoRaiesUrl} style={css("width:100%;height:100%;object-fit:cover")} />
            </span>
            <div style={css("flex:1")}>
              <div style={css("font:700 14.5px/1 'Plus Jakarta Sans';color:#fff")}>
                RAIES BOT
              </div>
              <div
                style={css(
                  "font-size:11.5px;color:rgba(255,255,255,.7);margin-top:3px;display:flex;align-items:center;gap:5px"
                )}
              >
                <span style={css("width:6px;height:6px;border-radius:50%;background:#7ee0a8")} />
                Asistente Virtual
              </div>
            </div>
            <button
              onClick={onToggleChat}
              style={css(
                "width:30px;height:30px;border-radius:8px;border:none;background:rgba(255,255,255,.14);color:#fff;cursor:pointer;display:flex;align-items:center;justify-content:center"
              )}
            >
              <MsIcon name="close" style={{ fontSize: 18 }} />
            </button>
          </div>
          <div style={css("padding:18px;background:#F7F8F8;max-height:300px;overflow:auto")}>
            <div
              style={css(
                "background:#fff;border-radius:14px;border-top-left-radius:4px;padding:13px 15px;font-size:13.5px;line-height:1.5;color:#3a443f;box-shadow:0 4px 14px -8px rgba(0,0,0,.2)"
              )}
            >
              ¡Hola! Soy RAIES BOT 🏠 Estoy aquí para ayudarte a encontrar tu próxima
              propiedad. ¿Qué estás buscando?
            </div>
            <div style={css("display:flex;flex-wrap:wrap;gap:8px;margin-top:14px")}>
              {quickReplies.map((q) => (
                <button
                  key={q.label}
                  onClick={q.onClick}
                  style={css(
                    "padding:9px 14px;border-radius:10px;border:1.5px solid rgba(18,58,47,.16);background:#fff;color:#205843;font:600 12.5px/1 'Plus Jakarta Sans';cursor:pointer;transition:.16s"
                  )}
                >
                  {q.label}
                </button>
              ))}
            </div>
          </div>
          <div style={css("display:flex;align-items:center;gap:10px;padding:13px 16px;border-top:1px solid #EEF0F0")}>
            <input
              value={chatDraft}
              onChange={(e) => onChatDraft(e.target.value)}
              placeholder="Escribí tu consulta..."
              style={css("flex:1;border:none;outline:none;font:500 13.5px 'Plus Jakarta Sans';color:#333;background:transparent")}
            />
            <button
              onClick={onSubmitChat}
              style={css(
                "width:38px;height:38px;border-radius:50%;border:none;background:#123A2F;color:#fff;cursor:pointer;display:flex;align-items:center;justify-content:center"
              )}
            >
              <MsIcon name="send" style={{ fontSize: 18 }} />
            </button>
          </div>
        </div>
      )}

      <button
        className="floating-chat-button"
        onClick={onToggleChat}
        style={css(
          "position:fixed;right:26px;bottom:30px;z-index:115;width:60px;height:60px;border-radius:50%;border:none;background:linear-gradient(140deg,#205843,#123A2F);color:#fff;cursor:pointer;display:flex;align-items:center;justify-content:center;box-shadow:0 18px 40px -12px rgba(18,58,47,.7);animation:floaty 4s ease-in-out infinite"
        )}
      >
        <MsIcon name={chatIcon} fill style={{ fontSize: 27 }} />
      </button>

      <Footer settings={settings} onOpenWhatsapp={onOpenWhatsapp} />
    </div>
  );
}
