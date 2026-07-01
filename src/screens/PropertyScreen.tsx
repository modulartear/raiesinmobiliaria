import { css } from "../lib/css";
import { logoRaiesUrl } from "../lib/assets";
import MsIcon from "../components/MsIcon";

type NavItem = { label: string; active?: boolean };
type GalleryImage = { label: string; bg: string; span: string; onOpen: () => void };
type Feature = { icon: string; label: string; val: string };
type SimilarCard = { title: string; address: string; price: string; bg: string; photoLabel: string; onOpen: () => void };

export default function PropertyScreen({
  nav,
  onGoLanding,
  breadcrumb,
  title,
  status,
  statusStyle,
  address,
  gallery,
  description,
  features,
  services,
  docs,
  similar,
  price,
  onOpenRequest,
  onOpenConsult,
  onOpenWhatsapp,
  lightboxOpen,
  lightboxBg,
  lightboxLabel,
  onCloseLightbox,
  onPrevImg,
  onNextImg,
  chatOpen,
  chatIcon,
  onToggleChat
}: {
  nav: NavItem[];
  onGoLanding: () => void;
  breadcrumb: string;
  title: string;
  status: string;
  statusStyle: string;
  address: string;
  gallery: GalleryImage[];
  description: string;
  features: Feature[];
  services: string[];
  docs: string[];
  similar: SimilarCard[];
  price: string;
  onOpenRequest: () => void;
  onOpenConsult: () => void;
  onOpenWhatsapp: () => void;
  lightboxOpen: boolean;
  lightboxBg: string;
  lightboxLabel: string;
  onCloseLightbox: () => void;
  onPrevImg: () => void;
  onNextImg: () => void;
  chatOpen: boolean;
  chatIcon: string;
  onToggleChat: () => void;
}) {
  return (
    <div className="property-screen" data-screen-label="Propiedad" style={css("background:#EBECEE;min-height:100vh")}>
      <header
        className="property-header"
        style={css(
          "position:sticky;top:0;z-index:40;display:flex;align-items:center;gap:24px;padding:16px 5vw;background:rgba(18,58,47,.96);backdrop-filter:blur(14px);flex-wrap:wrap"
        )}
      >
        <span
          style={css(
            "width:42px;height:42px;border-radius:50%;background:#fff;display:flex;align-items:center;justify-content:center;overflow:hidden"
          )}
        >
          <img src={logoRaiesUrl} style={css("width:100%;height:100%;object-fit:cover")} />
        </span>
        <nav className="property-nav" style={css("display:flex;gap:26px;flex-wrap:wrap")}>
          {nav.map((n) => (
            <a
              key={n.label}
              href="#"
              onClick={(e) => e.preventDefault()}
              style={css(
                "font:600 14px/1 'Plus Jakarta Sans';text-decoration:none;color:rgba(255,255,255,.8)"
              )}
            >
              {n.label}
            </a>
          ))}
        </nav>
        <button
          onClick={onGoLanding}
          style={css(
            "margin-left:auto;display:inline-flex;align-items:center;gap:7px;padding:10px 18px;border-radius:10px;border:1px solid rgba(255,255,255,.4);background:rgba(255,255,255,.08);color:#fff;font:600 13.5px/1 'Plus Jakarta Sans';cursor:pointer"
          )}
        >
          <MsIcon name="arrow_back" style={{ fontSize: 17 }} />
          Volver
        </button>
      </header>

      <div className="property-content" style={css("max-width:1240px;margin:0 auto;padding:30px 5vw 80px")}>
        <div
          className="property-title-row"
          style={css(
            "display:flex;align-items:flex-start;justify-content:space-between;gap:20px;margin-bottom:22px;flex-wrap:wrap"
          )}
        >
          <div>
            <div style={css("font:500 13px 'Plus Jakarta Sans';color:#7b8480;margin-bottom:10px")}>
              {breadcrumb}
            </div>
            <div style={css("display:flex;align-items:center;gap:14px")}>
              <h1
                style={css(
                  "margin:0;font-family:'Schibsted Grotesk';font-weight:800;font-size:32px;letter-spacing:-.02em;color:#123A2F"
                )}
              >
                {title}
              </h1>
              <span style={css(statusStyle)}>
                <span style={css("width:7px;height:7px;border-radius:50%;background:currentColor")} />
                {status}
              </span>
            </div>
            <div
              style={css(
                "display:flex;align-items:center;gap:5px;margin-top:9px;color:#5a6460;font-size:14.5px"
              )}
            >
              <MsIcon name="location_on" style={{ fontSize: 18, color: "#C9A34D" }} />
              {address}
            </div>
          </div>
          <div className="property-title-actions" style={css("display:flex;gap:10px;flex-wrap:wrap")}>
            <button
              style={css(
                "display:inline-flex;align-items:center;gap:7px;padding:11px 17px;border-radius:11px;border:1.5px solid #DDE0E1;background:#fff;color:#3a443f;font:600 13.5px/1 'Plus Jakarta Sans';cursor:pointer"
              )}
            >
              <MsIcon name="favorite_border" style={{ fontSize: 18 }} />
              Favoritos
            </button>
            <button
              style={css(
                "display:inline-flex;align-items:center;gap:7px;padding:11px 17px;border-radius:11px;border:1.5px solid #DDE0E1;background:#fff;color:#3a443f;font:600 13.5px/1 'Plus Jakarta Sans';cursor:pointer"
              )}
            >
              <MsIcon name="share" style={{ fontSize: 18 }} />
              Compartir
            </button>
          </div>
        </div>

        <div
          className="property-gallery"
          style={css(
            "display:grid;grid-template-columns:2fr 1fr;grid-template-rows:1fr 1fr;gap:10px;height:440px;border-radius:18px;overflow:hidden;margin-bottom:34px"
          )}
        >
          {gallery.slice(0, 5).map((g, idx) => (
            <div
              key={idx}
              onClick={g.onOpen}
              style={css(
                `position:relative;cursor:pointer;background:${g.bg};grid-row:${g.span};overflow:hidden`
              )}
            >
              <div
                style={css(
                  "position:absolute;inset:0;background:repeating-linear-gradient(125deg,rgba(255,255,255,.05) 0 2px,transparent 2px 24px)"
                )}
              />
              <div
                style={css(
                  "position:absolute;inset:0;display:flex;align-items:center;justify-content:center;color:rgba(255,255,255,.34);font:600 11px ui-monospace,monospace;letter-spacing:.1em"
                )}
              >
                {g.label}
              </div>
            </div>
          ))}
        </div>

        <div className="property-main-grid" style={css("display:grid;grid-template-columns:1fr 380px;gap:34px;align-items:start")}>
          <div className="property-main-column">
            <div
              style={css(
                "background:#fff;border-radius:18px;padding:28px 30px;border:1px solid rgba(18,58,47,.07);box-shadow:0 10px 30px -20px rgba(18,58,47,.3);margin-bottom:22px"
              )}
            >
              <h2
                style={css(
                  "margin:0 0 14px;font-family:'Schibsted Grotesk';font-weight:700;font-size:20px;color:#123A2F"
                )}
              >
                Descripción
              </h2>
              <p style={css("margin:0;color:#54605b;font-size:15px;line-height:1.65")}>
                {description}
              </p>
            </div>

            <div
              style={css(
                "background:#fff;border-radius:18px;padding:28px 30px;border:1px solid rgba(18,58,47,.07);box-shadow:0 10px 30px -20px rgba(18,58,47,.3);margin-bottom:22px"
              )}
            >
              <h2
                style={css(
                  "margin:0 0 20px;font-family:'Schibsted Grotesk';font-weight:700;font-size:20px;color:#123A2F"
                )}
              >
                Características
              </h2>
              <div className="property-features-grid" style={css("display:grid;grid-template-columns:repeat(4,1fr);gap:16px")}>
                {features.map((f) => (
                  <div
                    key={f.label}
                    style={css(
                      "display:flex;align-items:center;gap:12px;padding:14px;border-radius:13px;background:#F6F7F7;border:1px solid #EDEFEF"
                    )}
                  >
                    <span
                      style={css(
                        "width:40px;height:40px;border-radius:11px;flex:none;display:flex;align-items:center;justify-content:center;background:#fff;border:1px solid #E6E8E8;color:#205843"
                      )}
                    >
                      <MsIcon name={f.icon} style={{ fontSize: 21 }} />
                    </span>
                    <div>
                      <div style={css("font:500 11.5px/1 'Plus Jakarta Sans';color:#8a928e;margin-bottom:5px")}>
                        {f.label}
                      </div>
                      <div style={css("font:700 14.5px/1 'Plus Jakarta Sans';color:#1f2a26")}>
                        {f.val}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div
              style={css(
                "background:#fff;border-radius:18px;padding:28px 30px;border:1px solid rgba(18,58,47,.07);box-shadow:0 10px 30px -20px rgba(18,58,47,.3);margin-bottom:22px"
              )}
            >
              <h2
                style={css(
                  "margin:0 0 18px;font-family:'Schibsted Grotesk';font-weight:700;font-size:20px;color:#123A2F"
                )}
              >
                Servicios incluidos
              </h2>
              <div style={css("display:flex;flex-wrap:wrap;gap:10px")}>
                {services.map((srv) => (
                  <span
                    key={srv}
                    style={css(
                      "display:inline-flex;align-items:center;gap:7px;padding:9px 15px;border-radius:10px;background:rgba(32,120,77,.08);color:#205843;font:600 13px/1 'Plus Jakarta Sans'"
                    )}
                  >
                    <MsIcon name="check_circle" style={{ fontSize: 16 }} />
                    {srv}
                  </span>
                ))}
              </div>
            </div>

            <div
              style={css(
                "background:#fff;border-radius:18px;padding:28px 30px;border:1px solid rgba(18,58,47,.07);box-shadow:0 10px 30px -20px rgba(18,58,47,.3)"
              )}
            >
              <h2
                style={css(
                  "margin:0 0 18px;font-family:'Schibsted Grotesk';font-weight:700;font-size:20px;color:#123A2F"
                )}
              >
                Ubicación
              </h2>
              <div
                style={css(
                  "position:relative;height:260px;border-radius:14px;overflow:hidden;background:linear-gradient(135deg,#dfe6e2,#cdd8d2)"
                )}
              >
                <div
                  style={css(
                    "position:absolute;inset:0;background:repeating-linear-gradient(0deg,rgba(18,58,47,.06) 0 1px,transparent 1px 42px),repeating-linear-gradient(90deg,rgba(18,58,47,.06) 0 1px,transparent 1px 42px)"
                  )}
                />
                <div style={css("position:absolute;top:50%;left:50%;transform:translate(-50%,-100%)")}>
                  <MsIcon name="location_on" fill style={{ fontSize: 44, color: "#C9A34D", filter: "drop-shadow(0 6px 10px rgba(0,0,0,.3))" as any }} />
                </div>
                <div
                  style={css(
                    "position:absolute;bottom:14px;left:14px;font:600 11px ui-monospace,monospace;color:rgba(18,58,47,.5);letter-spacing:.08em"
                  )}
                >
                  MAPA · {address}
                </div>
              </div>
            </div>

            <h2
              style={css(
                "margin:40px 0 18px;font-family:'Schibsted Grotesk';font-weight:700;font-size:22px;letter-spacing:-.01em;color:#123A2F"
              )}
            >
              Propiedades similares
            </h2>
            <div className="property-similar-grid" style={css("display:grid;grid-template-columns:repeat(3,1fr);gap:18px")}>
              {similar.map((sm) => (
                <div
                  key={sm.title}
                  onClick={sm.onOpen}
                  style={css(
                    "background:#fff;border-radius:15px;overflow:hidden;border:1px solid rgba(18,58,47,.07);box-shadow:0 8px 24px -18px rgba(18,58,47,.3);cursor:pointer"
                  )}
                >
                  <div style={css(`position:relative;height:140px;background:${sm.bg}`)}>
                    <div
                      style={css(
                        "position:absolute;inset:0;display:flex;align-items:center;justify-content:center;color:rgba(255,255,255,.3);font:600 10px ui-monospace,monospace;letter-spacing:.1em"
                      )}
                    >
                      {sm.photoLabel}
                    </div>
                  </div>
                  <div style={css("padding:14px 15px 16px")}>
                    <div style={css("font:700 15px/1.2 'Plus Jakarta Sans';color:#1f2a26")}>
                      {sm.title}
                    </div>
                    <div style={css("font-size:12.5px;color:#7b8480;margin-top:4px")}>{sm.address}</div>
                    <div
                      style={css(
                        "font-family:'Schibsted Grotesk';font-weight:800;font-size:18px;color:#123A2F;margin-top:10px"
                      )}
                    >
                      {sm.price}
                      <span style={css("font:500 12px 'Plus Jakarta Sans';color:#9aa0a3")}> /mes</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <aside className="property-sidebar" style={css("position:sticky;top:90px;display:flex;flex-direction:column;gap:16px")}>
            <div
              style={css(
                "background:#fff;border-radius:18px;padding:26px 24px;border:1px solid rgba(18,58,47,.08);box-shadow:0 20px 50px -26px rgba(18,58,47,.4)"
              )}
            >
              <div style={css("font:500 13px 'Plus Jakarta Sans';color:#8a928e")}>Precio de alquiler</div>
              <div style={css("display:flex;align-items:baseline;gap:6px;margin:6px 0 20px")}>
                <span style={css("font-family:'Schibsted Grotesk';font-weight:800;font-size:34px;color:#123A2F")}>
                  {price}
                </span>
                <span style={css("font-size:14px;color:#9aa0a3")}>/mes</span>
              </div>

              <button
                onClick={onOpenRequest}
                style={css(
                  "width:100%;display:flex;align-items:center;justify-content:center;gap:9px;padding:15px;border-radius:12px;border:none;background:linear-gradient(180deg,#D6B25C,#C9A34D);color:#1a1408;font:700 15px/1 'Plus Jakarta Sans';cursor:pointer;box-shadow:0 12px 28px -10px rgba(201,163,77,.7);margin-bottom:10px"
                )}
              >
                Solicitar alquiler
              </button>
              <div style={css("display:grid;grid-template-columns:1fr 1fr;gap:10px")}>
                <button
                  onClick={onOpenConsult}
                  style={css(
                    "display:flex;align-items:center;justify-content:center;gap:7px;padding:13px;border-radius:11px;border:1.5px solid #DDE0E1;background:#fff;color:#3a443f;font:600 13.5px/1 'Plus Jakarta Sans';cursor:pointer"
                  )}
                >
                  Consultar
                </button>
                <button
                  onClick={onOpenWhatsapp}
                  style={css(
                    "display:flex;align-items:center;justify-content:center;gap:7px;padding:13px;border-radius:11px;border:none;background:#1faf53;color:#fff;font:600 13.5px/1 'Plus Jakarta Sans';cursor:pointer"
                  )}
                >
                  <MsIcon name="chat" style={{ fontSize: 17 }} />
                  WhatsApp
                </button>
              </div>
            </div>

            <div
              style={css(
                "background:#fff;border-radius:18px;padding:22px 24px;border:1px solid rgba(18,58,47,.08);box-shadow:0 12px 34px -24px rgba(18,58,47,.34)"
              )}
            >
              <div style={css("font:700 14.5px 'Plus Jakarta Sans';color:#123A2F;margin-bottom:14px")}>
                Documentación requerida
              </div>
              <div style={css("display:flex;flex-direction:column;gap:11px")}>
                {docs.map((d) => (
                  <div
                    key={d}
                    style={css("display:flex;align-items:center;gap:10px;font-size:13.5px;color:#54605b")}
                  >
                    <MsIcon name="task_alt" style={{ fontSize: 18, color: "#C9A34D" }} />
                    {d}
                  </div>
                ))}
              </div>
            </div>
          </aside>
        </div>
      </div>

      {lightboxOpen && (
        <div
          className="property-lightbox"
          onClick={onCloseLightbox}
          style={css(
            "position:fixed;inset:0;z-index:300;background:rgba(8,20,16,.92);backdrop-filter:blur(8px);display:flex;align-items:center;justify-content:center;animation:popIn .25s ease both"
          )}
        >
          <button
            onClick={(e) => {
              e.stopPropagation();
              onCloseLightbox();
            }}
            style={css(
              "position:absolute;top:24px;right:28px;width:46px;height:46px;border-radius:50%;border:none;background:rgba(255,255,255,.12);color:#fff;cursor:pointer;display:flex;align-items:center;justify-content:center"
            )}
          >
            <MsIcon name="close" style={{ fontSize: 24 }} />
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              onPrevImg();
            }}
            style={css(
              "position:absolute;left:34px;width:52px;height:52px;border-radius:50%;border:none;background:rgba(255,255,255,.12);color:#fff;cursor:pointer;display:flex;align-items:center;justify-content:center"
            )}
          >
            <MsIcon name="chevron_left" style={{ fontSize: 28 }} />
          </button>
          <div
            className="property-lightbox-card"
            onClick={(e) => e.stopPropagation()}
            style={css(
              `width:min(78vw,1000px);height:min(74vh,640px);border-radius:16px;background:${lightboxBg};position:relative;overflow:hidden;box-shadow:0 40px 100px -30px rgba(0,0,0,.8)`
            )}
          >
            <div
              style={css(
                "position:absolute;inset:0;background:repeating-linear-gradient(125deg,rgba(255,255,255,.05) 0 2px,transparent 2px 28px)"
              )}
            />
            <div
              style={css(
                "position:absolute;inset:0;display:flex;align-items:center;justify-content:center;color:rgba(255,255,255,.4);font:600 14px ui-monospace,monospace;letter-spacing:.12em"
              )}
            >
              {lightboxLabel}
            </div>
          </div>
          <button
            onClick={(e) => {
              e.stopPropagation();
              onNextImg();
            }}
            style={css(
              "position:absolute;right:34px;width:52px;height:52px;border-radius:50%;border:none;background:rgba(255,255,255,.12);color:#fff;cursor:pointer;display:flex;align-items:center;justify-content:center"
            )}
          >
            <MsIcon name="chevron_right" style={{ fontSize: 28 }} />
          </button>
        </div>
      )}

      <button
        className="floating-chat-button"
        onClick={onToggleChat}
        style={css(
          "position:fixed;right:26px;bottom:30px;z-index:115;width:60px;height:60px;border-radius:50%;border:none;background:linear-gradient(140deg,#205843,#123A2F);color:#fff;cursor:pointer;display:flex;align-items:center;justify-content:center;box-shadow:0 18px 40px -12px rgba(18,58,47,.7);animation:floaty 4s ease-in-out infinite"
        )}
      >
        <MsIcon name={chatOpen ? "close" : "chat"} fill style={{ fontSize: 27 }} />
      </button>
    </div>
  );
}
